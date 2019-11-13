import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import allocate from "./contracts/allocate.json";
import frame from "./frame"

import "./App.css";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

class App2 extends Component {
  state = {
    storageValue: 0, web3: null, accounts: null, contract: null,
    silo0: null, silo1: null, silo2: null
  };

  componentWillMount = async () => {
    // Get network provider and web3 instance.
    const web3 = await getWeb3();
    // Use web3 to get the user's accounts.
    const accounts = await web3.eth.getAccounts();
    // Get the contract instance.
    const networkId = await web3.eth.net.getId();
    const deployedNetwork = allocate.networks[networkId];
    const instance = new web3.eth.Contract(
      allocate.abi,
      deployedNetwork && deployedNetwork.address,
    );
    this.setState({ web3, account: accounts[0], contract: instance }, this.runExample);
  }

  runExample = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.get().call();
    const balance = await contract.methods.getBalance().call();

    // Update state with the result.
    this.setState({
      storageValue: response[0],
      silo0: response[0], silo1: response[1], silo2: response[2]
    });
    var j;
    const s = this.state.storageValue;

    for (j = 0; j < s.length; j++) {
      this.setState({ silo0: response[0][j] })
      console.log(this.state.silo0);
      this.setState({ silo1: response[1][j] })
      console.log(this.state.silo1);
      this.setState({ silo2: response[2][j] })
      console.log('address: ', this.state.silo2);
    }
    const countVote = await contract.methods.getUpVote(this.state.account).call()
      .then(i => {
        if ((i > 0) & (i % 3 === 0) & (this.state.silo2 === this.state.account)) {
          console.log('vote:', i);
          this.state.contract.methods.grant(this.state.account)
            .send({ from: this.state.account });
          alert('You received ethers(3) \n Confirm your transaction');
        }
      });
    console.log('balance', balance);
  }
  onSubmit = async (event) => {
    event.preventDefault()
    await this.state.contract.methods.upVote(this.state.silo2).send({ from: this.state.account });
    alert('You voted this content');
    console.log('vote process', this.state.silo1)
  }
  componentDidMount() {

  }

  render() {
    return (
      <div className="App" >
        <video width="200" height="150" src={`https://ipfs.io/ipfs/${this.state.silo0}`} type="video/mp4" autoPlay />
        <p>{this.state.silo1}</p>
        <form onSubmit={this.onSubmit}>
          <button class="button" ><span>upvote</span></button>
        </form>
      </div>
    );
  }
}

export default App2;

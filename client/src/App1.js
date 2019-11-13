import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import allocate from "./contracts/allocate.json";
import frame from "./frame"

import "./App.css";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

class App1 extends Component {
  state = { storageValue: 0, web3: null, accounts: null, contract: null, silo0: null, silo1: null };

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
    this.setState({ web3, accounts, contract: instance }, this.runExample);
  }

  runExample = async () => {
    const { accounts, contract } = this.state;
    const response = await contract.methods.get().call();
    // Update state with the result.
    this.setState({ storageValue: response[0], silo0: response[0], silo1: response[1] });
    var i, j;
    const s = this.state.storageValue;
    // let frame = [];
    for (j = 0; j < s.length - 1; j++) {
      this.setState({ silo0: response[0][j] })
      console.log(this.state.silo0);
      this.setState({ silo1: response[1][j] })
      console.log(this.state.silo1);
    } 
  }
  componentDidMount(){

  }

  render() {
    return (
      <div className="App" >
        <video width="200" height="150" src={`https://ipfs.io/ipfs/${this.state.silo0}`} type="video/mp4" autoPlay />
        <p>{this.state.silo1}</p>
        
      </div>
    );
  }
}

export default App1;

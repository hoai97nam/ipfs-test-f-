import React, { Component } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import getWeb3 from "./utils/getWeb3";
import allocate from "./contracts/allocate.json";

import "./App.css";
import { SSL_OP_EPHEMERAL_RSA } from "constants";

export default class frame extends React.Component {


    state = { storageValue: 0, web3: null, accounts: null, contract: null, silo0: null, silo1: null };

    createFrame = async () => {
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

        const response = await instance.methods.get().call();
        // Update state with the result.
        this.setState({ silo0: response[0], silo1: response[1] });
        var i, j;
        const s = response[0];
        let frames = [];
        for (j = 0; j < s.length; j++) {
            // this.setState({ silo0: response[0][j] })
            // console.log(this.state.silo0);
            // this.setState({ silo1: response[1][j] })
            // console.log(this.state.silo1);
            frames.push(
                <video width="320" height="240" src={`https://ipfs.io/ipfs/${this.state.silo0}`} type="video/mp4" autoPlay />
            );
        }
    }
    render() {
        return <div>{this.frames}</div>
    }
}

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Navigation, Footer, Home, Verify, Institute } from ".";
import BlockCred from '../abis/BlockCred.json'
import Web3 from 'web3';

class App extends Component {
  async componentWillMount() {
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    }
    else {
      window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
    }
  }

  async loadBlockchainData() {
    const web3 = window.web3
    // Load account
    const accounts = await web3.eth.getAccounts()
    this.setState({ account: accounts[0] })
    // Network ID
    const networkId = await web3.eth.net.getId()
    const networkData = BlockCred.networks[networkId]
    if(networkData) {
      const blockCred = new web3.eth.Contract(BlockCred.abi, networkData.address)
      this.setState({ blockCred })

      this.setState({ loading: false})

    } else {
      window.alert('BlockCred contract not deployed to detected network.')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      blockCred: null
    }
  }

  render() {
    return (
      <div className="App" style={{height:800}}>
        {/* App NavBar */}
        <Router>
          <Navigation account={this.state.account}/>
          <Switch>
            <Route path="/" exact component={() => <Home />} />
            <Route path="/verify" exact component={() => <Verify />} />
            <Route path="/institute" exact component={() => <Institute />} />
          </Switch>
          <Footer />
        </Router>
      </div>
    );
  }
  
}

export default App;
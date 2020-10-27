import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import BlockCred from '../abis/BlockCred.json'
import Navbar from './Navbar'
import Main from './Main'

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
      
      const certificateCount = await blockCred.methods.certificateCount().call()
      window.alert(certificateCount)
      this.setState({ certificateCount })
      // Load Certificates
      for (var i = 1; i < certificateCount; i++) {
        const cert = await blockCred.methods.certificates(i).call()
        console.log(cert)
        this.setState({
          certificates: [...this.state.certificates, cert]
        })
      }
      // Sort certificates. Show highest tipped posts first
      this.setState({
        posts: this.state.certificates.sort((a,b) => b.certificateCost - a.certificateCost )
      })
      this.setState({ loading: false})
    } else {
      window.alert('BlockCred contract not deployed to detected network.')
    }
  }

  createCertificate(content, value) {
    this.setState({ loading: true })
    window.alert(content)
    window.alert(value)
    this.state.blockCred.methods.newCertificate(content, value).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
  }

  purchaseCertificate(id, cost) {
    this.setState({ loading: true })
    this.state.blockCred.methods.purchaseCertificate(id, cost).send({ from: this.state.account, value: cost })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
    
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      blockCred: null,
      certificateCount: 0,
      certificates: [],
      loading: true
    }

    this.createCertificate = this.createCertificate.bind(this)
    this.purchaseCertificate = this.purchaseCertificate.bind(this)
  }

  render() {
    return (
      <div>
        <Navbar account={this.state.account} />
        { this.state.loading
          ? <div id="loader" className="text-center mt-5"><p>Loading...</p></div>
          : <Main
              certificates={this.state.certificates}
              createCertificate={this.createCertificate}
              purchaseCertificate={this.purchaseCertificate}
            />
        }
      </div>
    );
  }
}

export default App;

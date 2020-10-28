import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import styles from './App.module.css';
import BlockCred from '../abis/BlockCred.json'
import bg from '../BlockCred UI elements/bg.png'
var api = require('etherscan-api').init('AGC1TEVQX85RTXQUF76WJWCV58JFREVMJD', 'ropsten', '3000');

class Institute extends Component {

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
      this.setState({ certificateCount })
      // Load Certificates
      for (var i = 0; i < certificateCount; i++) {
        const cert = await blockCred.methods.certificates(i).call()
        if(cert.author === this.state.account){
            this.setState({
                certificates: [...this.state.certificates, cert]
              })
        }
      }
      // Sort certificates. Show highest tipped posts first
      this.setState({
        posts: this.state.certificates.sort((a,b) => b.certificateCost - a.certificateCost )
      })
      this.setState({ loading: false})

      var balance = api.account.balance(this.state.account);
      balance.then(function(balanceData){
        console.log(balanceData);
      });

    } else {
      window.alert('BlockCred contract not deployed to detected network.')
    }
  }

  createCertificate(content, value) {
    this.setState({ loading: true })
    this.state.blockCred.methods.newCertificate(content, value).send({ from: this.state.account })
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
  }

  render() {
    return (
      <div styles={{ backgroundImage:`url(${bg})`}}>
        { this.state.loading
          ? <div id="loader" className="text-center mt-8"><p>Loading...</p></div>
          : 
          <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.certificateContent.value
                  const value = this.certificateValue.value
                  this.createCertificate(content, window.web3.utils.toWei(value.toString(), 'Ether'))
                }}>
                <div className="form-group">
                  <input
                    id="certificateContent"
                    type="text"
                    ref={(input) => { this.certificateContent = input }}
                    className="form-control"
                    placeholder="Name of the certificate"
                    required />
                </div>
                <div className="form-group">
                  <input
                    id="certificateValue"
                    type="text"
                    ref={(input) => { this.certificateValue = input }}
                    className="form-control"
                    placeholder="Value of the certificate"
                    required />
                </div>
                <button type="submit" className="btn btn btn-outline-primary btn-block">Create Certificate</button>
              </form>
              <p>&nbsp;</p>
              { this.state.certificates.map((certificate, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <small className="text-muted">{certificate.certificateName}</small>
                      <p></p>
                      <small className="text-muted">ID of Certificate: {(certificate.identity.toString())}</small>
                    </div>
                    <ul id="certificateList" className="list-group list-group-flush">
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Certificate ID: {window.web3.utils.fromWei(certificate.certificateCost.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={certificate.identity}
                          onClick={(event) => {
                            let cost = certificate.certificateCost
                            this.state.purchaseCertificate(event.target.name, cost.toString())
                          }}
                        >
                          Claim Certificate
                        </button>
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
        }
      </div>
    );
  }
}

export default Institute;

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
      const requestCount = await blockCred.methods.requestsCount().call()

      this.setState({ certificateCount })
      this.setState({ requestCount })
      // Load Requests
      for (var i = 0; i < requestCount; i++) {
        const req = await blockCred.methods.requests(i).call()
        if(req.certificateOwner === this.state.account){
            console.log(req.studentId)
            this.setState({
                requests: [...this.state.requests, req]
            })
        }
      }
      this.setState({ loading: false})

    } else {
      window.alert('BlockCred contract not deployed to detected network.')
    }
  }

  approveRequest(certId, student, req) {
    this.setState({ loading: true })
    this.state.blockCred.methods.approveRequest(certId, student, req).send({ from: this.state.account })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
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
      requestCount: 0,
      certificates: [],
      requests: [],
      loading: true
    }

    this.createCertificate = this.createCertificate.bind(this)
    this.approveRequest = this.approveRequest.bind(this)
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
              <div style={{textAlign:"center", verticalAlign:"middle"}}>
                <div className={styles.verifyTitle} style={{textAlign:"center"}}>Requests</div>
              </div>
              { this.state.requests.map((request, key) => {
                return(
                    
                  <div className="card mb-4" key={key} >

                    <div className="card-header">
                      <small className="text-muted">Request of ID: {request.id.toString()}</small>
                      <p></p>
                      <small className="text-muted">ID of Certificate: {(request.certificateId.toString())}</small>
                      <p></p>
                      <small className="text-muted">Applicant: {(request.studentId.toString())}</small>
                    </div>
                    <ul id="certificateList" className="list-group list-group-flush">
                      <li key={key} className="list-group-item py-2">
                        
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={request.identity}
                          onClick={(event) => {
                            this.approveRequest(request.certificateId.toString(),
                            request.studentId.toString(), request.id.toString())
                          }}
                        >
                          Approve Request
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

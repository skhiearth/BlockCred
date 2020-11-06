import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import styles from './App.module.css';
// import VerifyComponent from "./VerifyComponent";
import BlockCred from '../abis/BlockCred.json';
import Web3 from 'web3';
import bagde from './Assets/badge.png';
import noRec from './Assets/noRec.png';
import domtoimage from 'dom-to-image';
import { saveAs } from 'file-saver';
import * as qs from 'query-string';

class Verify extends Component {

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
      for (var i = 0; i <= certificateCount; i++) {
        const cert = await blockCred.methods.certificates(i).call()
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

  async verifyCertificate(contractId, address) {
    this.setState({ loading: true });
    if(await this.state.blockCred.methods.checkValidity(contractId, address).call({ from: this.state.account })){
        this.setState({ notverified: false });
        const _temp = await this.state.blockCred.methods.certificates(contractId).call()
        this.setState({ verifiedCertificate: _temp.certificateName.toString() });
        this.setState({ verifiedCertId: _temp.identity.toString() });
    } else {
        this.setState({ notverified: true });
        window.alert('No record found!')
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      notverified: true,
      account: '',
      blockCred: null,
      certificateCount: 0,
      certificates: [],
      loading: true,
      verifiedCertificate: null,
      verifiedCertId: null,
      address: "0x0",
      id: "-1"
    }

    this.verifyCertificate = this.verifyCertificate.bind(this)
  }

  render(){
    return (
      <div>
        {/* No Record found */}
        <div className="about">
        <div class="container">
          <div class="row align-items-center my-5">
            <div class="col-lg-7" style={{ height: 300}}>
            { this.state.notverified ? 
              <div style={{ height: 300, backgroundImage: "url(" + noRec + ")", backgroundPosition: 'center', backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat', resizeMode: 'contain'}}>
                
              </div>
              : 
              <div>
                <div id="certificateDown"style={{ height: 300, backgroundImage: "url(" + bagde + ")", backgroundPosition: 'center', backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat', resizeMode: 'contain'}}>
                  {/* Badge Issued for the Certificate */}
                  <p style={{paddingTop: 90, textAlign: "center"}} className={styles.certificateAddress}>Credential ID: {this.state.verifiedCertId}</p>
                  <p style={{paddingTop: -12, marginTop: -4}} className={styles.certificateName}>{this.state.verifiedCertificate}</p>
                  <p style={{paddingTop: 0, textAlign: "center"}} className={styles.certificateAddress}>Issued to: {this.state.account}</p>
                </div>
                <div style={{textAlign: "center", paddingTop: 15}}>
                <button
                  className="btn btn-info btn-sm pt-1" 
                  onClick={(event) => {
                    domtoimage.toBlob(document.getElementById('certificateDown'))
                    .then(function(blob) {
                      window.saveAs(blob, 'digitalBadge.png');
                    });
                  }}
                >
                Download
                </button>
                </div>
              </div>
              
            }
            </div>
            <div class="col-lg-5">
              {/* 'Verify Credentials' text body */}
              <div className={styles.verifyTitle}>Verify Credentials</div>
              <p></p>
              <p className={styles.verifyBody}>
                Leveraging Smart Contracts on Ethereum blockchain, BlockCred offers certificate validation platforms. 
                All certificates issued here are immutable and every record of issuing and creating certificates is reflected
                on the public blockchain. 
              </p>
              <p className={styles.verifyBody}>
                BlockCred uses decentralised control, immutability, consesus protocol, distributed storage of data and Smart Contracts to 
                achieve a transparent, decentralised and trusted solution.
              </p>
              <div>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const certificateId = this.certificateId.value
                  const studentAdd = this.studentAdd.value
                  this.verifyCertificate(certificateId, studentAdd)
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="certificateId"
                    type="text"
                    ref={(input) => { this.certificateId = input }}
                    className="form-control"
                    placeholder="Id of the certificate"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="studentAdd"
                    type="text"
                    ref={(input) => { this.studentAdd = input }}
                    className="form-control"
                    placeholder="Public address of the recipient"
                    required />
                </div>
                <button type="submit" className={styles.button}>Check Credential Validity</button>
              </form>
              <p>&nbsp;</p>
        </div>
        </div>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Verify;
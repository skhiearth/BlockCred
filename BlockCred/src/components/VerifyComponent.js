import React, { Component } from 'react';
import styles from './App.module.css';
import BlockCred from '../abis/BlockCred.json'
import Web3 from 'web3';

class VerifyComponent extends Component {

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
            this.setState({ verified: true });
            window.alert('Verified')
        } else {
            this.setState({ verified: false });
            window.alert('No record found!')
        }
      }
    
      constructor(props) {
        super(props)
        this.state = {
            verified: false,
          account: '',
          blockCred: null,
          certificateCount: 0,
          certificates: [],
          loading: true
        }
    
        this.verifyCertificate = this.verifyCertificate.bind(this)
      }

  render() {
    return (
        <div>
          {/* Credential Verification */}
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
    )
    }
}

export default VerifyComponent;
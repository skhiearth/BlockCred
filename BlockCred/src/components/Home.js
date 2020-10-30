import React, { Component } from 'react';
import Web3 from 'web3';
import './App.css';
import styles from './App.module.css';
import BlockCred from '../abis/BlockCred.json'
import Main from './Main'
import bg from '../BlockCred UI elements/bg.png'
import FingerprintSpinner from '@bit/bondz.react-epic-spinners.fingerprint-spinner';

const style = {
  content: {
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    color: "white",
    padding: 7,
    borderRadius: 20,
  }
}

class Home extends Component {

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

      // Load Certificates
      for (var i = 0; i < certificateCount; i++) {
        const cert = await blockCred.methods.certificates(i).call()
        this.setState({
          certificates: [...this.state.certificates, cert]
        })
      }
      // Sort certificates. Show most popular certificate first
      this.setState({
        certificates: this.state.certificates.sort((a,b) => b.recipients - a.recipients )
      })
      this.setState({ loading: false})

      for (var j = 0; j < 1000; j++) {
        const req = await blockCred.methods.requests(j).call()
        if(req.studentId === this.state.account){
          this.setState({ loading: false})
            if(req.approved === true){
               this.setState({ notrequest: false })
                this.setState({
                    requests: [...this.state.requests, req]
                })
            }
        }
      }

      this.setState({ loading: false})

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

  purchaseCertificate(name, cost) {
    this.setState({ loading: true })
    this.state.blockCred.methods.purchaseCertificate(name, cost).send({ from: this.state.account, value: cost })
    .once('receipt', (receipt) => {
      this.setState({ loading: false })
      console.log(this.state.loading)
    })
  }

  sortPopularity() {
    this.setState({
      certificates: this.state.certificates.sort((a,b) => b.recipients - a.recipients )
    })
  }

  sortCost() {
    this.setState({
      certificates: this.state.certificates.sort((a,b) => b.certificateCost - a.certificateCost )
    })
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      blockCred: null,
      certificateCount: 0,
      certificates: [],
      requestCount: 0,
      requests: [],
      loading: true,
      notrequest: true
    }

    this.createCertificate = this.createCertificate.bind(this)
    this.purchaseCertificate = this.purchaseCertificate.bind(this)
    this.sortCost = this.sortCost.bind(this)
    this.sortPopularity = this.sortPopularity.bind(this)
  }

  render() {
    return (
      <div styles={{ backgroundImage:`url(${bg})`}}>
        { this.state.loading
          ? 
          <div className="center mt-19">
              <FingerprintSpinner
                style={{width: "100%"}}
                color='#251F82'
                size='200'
	            />
            </div>
          : 
          <div>
          <div className="about">
          <div class="container">
            <div class="row align-items-center my-5">
              <div class="col-lg-8">
              <div style={{padding: 16, fontSize: 12, fontWeight: 600}}>Logged in as: {this.state.account}</div>
                <button onClick={() => this.sortCost()} style={{marginRight: 10}} className="btn btn btn-outline-secondary">Sort by Cost</button>
                <button onClick={() => this.sortPopularity()} className="btn btn btn-outline-secondary">Sort by Popularity</button>
                <Main
                    requests={this.state.requests}
                    certificates={this.state.certificates}
                    createCertificate={this.createCertificate}
                    purchaseCertificate={this.purchaseCertificate}
                  />
              </div>
              
              <div class="col-lg-4" >
                <div style={style.content}>
                  <div className={styles.verifyTitle}>My Certificates</div>
                  <p></p>
                  <div>
                    { this.state.notrequest ? <div>
                          <p className={styles.verifyBody}>
                            No certificates found :(
                          </p>
                        </div> :
                        <div>
                      { this.state.requests.map((request, key) => {
                        return(
                          <div key={key} >
                            <p className={styles.verifyBody}>
                              Certificate named {request.certName.toString()} with ID {request.certificateId.toString()} issued by {request.certificateOwner.toString()}
                            </p>
                          </div>
                        )
                      })}
                      </div>
                    }
                  </div>
                  </div>
                </div>
                
              </div>
          </div>
        </div>
        </div>
        }
      </div>
    );
  }
}

export default Home;

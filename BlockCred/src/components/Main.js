import React, { Component } from 'react';
import Identicon from 'identicon.js';
import styles from './App.module.css';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '800px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
              <p>&nbsp;</p>
              { this.props.certificates.map((certificate, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <small>{certificate.certificateName}</small>
                      <img
                        alt="identicon"
                        className='ml-2 float-right'
                        width='50'
                        height='50'
                        src={`data:image/png;base64,${new Identicon(certificate.author, 50).toString()}`}
                      />
                      <small className="text-muted float-right">Certificate created by: </small>
                      
                      <p></p>
                      <small style={{marginTop: -20}} className="text-muted float-right">{certificate.author.toString()}</small>
                      <small className="text-muted">ID of Certificate: {(certificate.identity.toString())}</small>
                    </div>
                    <ul id="certificateList" className="list-group list-group-flush">
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Certificate Cost: {window.web3.utils.fromWei(certificate.certificateCost.toString(), 'Ether')} ETH
                        </small>

                        {
                          this.props.requests.map((request, key) => {
                            return(
                                <div>
                                  {(() => {
                                    if (request.certificateId.toString() === certificate.identity.toString()) {
                                      return (
                                        <button
                                          className="btn btn-success btn-sm float-right pt-0"
                                          name={certificate.identity}
                                          onClick={(event) => {
                                            window.alert("Yay! You already have this certificate issued.")
                                          }}
                                        >
                                          Certificate Owned
                                        </button>
                                      )
                                    } else {
                                      return (
                                        <button
                                          className="btn btn-outline-success btn-sm float-right pt-0"
                                          name={certificate.identity}
                                          onClick={(event) => {
                                            let cost = certificate.certificateCost
                                            this.props.purchaseCertificate(event.target.name, cost.toString())
                                          }}
                                        >
                                          Claim Certificate
                                        </button>
                                      )
                                    }
                                  })()}
                                </div>
                            )
                        })}

                        
                      </li>
                    </ul>
                  </div>
                )
              })}
            </div>
          </main>
        </div>
      </div>
    );
  }
}

export default Main;
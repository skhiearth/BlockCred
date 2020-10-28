import React, { Component } from 'react';
import bg from '../BlockCred UI elements/bg.png'

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
                            this.props.purchaseCertificate(event.target.name, cost.toString())
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
    );
  }
}

export default Main;
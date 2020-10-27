import React, { Component } from 'react';

class Main extends Component {

  render() {
    return (
      <div className="container-fluid mt-5">
        <div className="row">
          <main role="main" className="col-lg-12 ml-auto mr-auto" style={{ maxWidth: '500px' }}>
            <div className="content mr-auto ml-auto">
              <p>&nbsp;</p>
                <form onSubmit={(event) => {
                  event.preventDefault()
                  const content = this.certificateContent.value
                  const value = this.certificateValue.value
                  this.props.createCertificate(content, window.web3.utils.toWei(value.toString(), 'Ether'))
                }}>
                <div className="form-group mr-sm-2">
                  <input
                    id="certificateContent"
                    type="text"
                    ref={(input) => { this.certificateContent = input }}
                    className="form-control"
                    placeholder="Name of the certificate"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="certificateValue"
                    type="text"
                    ref={(input) => { this.certificateValue = input }}
                    className="form-control"
                    placeholder="Value of the certificate"
                    required />
                </div>
                <button type="submit" className="btn btn-primary btn-block">Create Certificate</button>
              </form>
              <p>&nbsp;</p>
              { this.props.certificates.map((certificate, key) => {
                return(
                  <div className="card mb-4" key={key} >
                    <div className="card-header">
                      <small className="text-muted">{certificate.name}</small>
                    </div>
                    <ul id="certificateList" className="list-group list-group-flush">
                      <li key={key} className="list-group-item py-2">
                        <small className="float-left mt-1 text-muted">
                          Cost of the certificate: {window.web3.utils.fromWei(certificate.certificateCost.toString(), 'Ether')} ETH
                        </small>
                        <button
                          className="btn btn-link btn-sm float-right pt-0"
                          name={certificate.id}
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
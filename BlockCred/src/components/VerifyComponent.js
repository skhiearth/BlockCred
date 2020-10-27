import React, { Component } from 'react';
import bg from '../BlockCred UI elements/bg.png'
import styles from './App.module.css';

class VerifyComponent extends Component {

    constructor(props) {
        super(props)
        this.state = {
          account: '',
          blockCred: null,
          certificateCount: 0,
          certificates: [],
          loading: true
        }
    }

  render() {
    return (
        <div>
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
                    placeholder="Id of the certificate"
                    required />
                </div>
                <div className="form-group mr-sm-2">
                  <input
                    id="certificateValue"
                    type="text"
                    ref={(input) => { this.certificateValue = input }}
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
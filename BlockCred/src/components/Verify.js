import React, { Component } from "react";
import styles from './App.module.css';
import VerifyComponent from "./VerifyComponent";

class Verify extends Component {

  render(){
    return (
      <div>
        <div className="about">
        <div class="container">
          <div class="row align-items-center my-5">
            <div class="col-lg-7">
              <img
                class="img-fluid rounded mb-4 mb-lg-0"
                src="http://placehold.it/900x400"
                alt=""
              />
            </div>
            <div class="col-lg-5">
              <div className={styles.verifyTitle}>Verify Credentials</div>
              <p></p>
              <p className={styles.verifyBody}>
                Leveraging Ethereum blockchain and Smart Contracts, BlockCred offers a certificate validation platforms. 
                All certificates issued here are immutable and every record of issuing and creating certificates is reflected
                on the public blockchain. 
              </p>
              <p className={styles.verifyBody}>
              BlockCred offers decentralised control, transparency and immutability to a transparent, 
                decentralized and trusted solution.
              </p>
              <VerifyComponent/>
              </div>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

export default Verify;
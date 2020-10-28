import React from "react";
import { Link, withRouter } from "react-router-dom";
import styles from './App.module.css';

function Navigation(props) {
  return (
    <div className="navigation">
      <nav class="py-3 navbar navbar-expand-lg">
        <div class="container">

          <div class="navbar-brand" className={styles.navbarheading}>
            BlockCred
          </div>
          <button
            class="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarResponsive"
            aria-controls="navbarResponsive"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarResponsive">
            <ul class="navbar-nav ml-auto">
              <li
                class={`nav-item  ${
                  props.location.pathname === "/" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/" className={styles.navbarlinks}>
                  Home
                  <span class="sr-only">(current)</span>
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/verify" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/verify" className={styles.navbarlinks}>
                  Verify Certificate
                </Link>
              </li>
              <li
                class={`nav-item  ${
                  props.location.pathname === "/verify" ? "active" : ""
                }`}
              >
                <Link class="nav-link" to="/institute" className={styles.navbarlinks}>
                  Institutional Login
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
      </nav>
    </div>
  );
}

export default withRouter(Navigation);
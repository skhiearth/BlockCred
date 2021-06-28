# BlockCred

**Finalists at [Code with GlobalShala 2.0](https://code-with-globalshala-2.hackerearth.com/)**

Code, deployment repo and supporting documentation for the BlockCred project by The Mistfits for Code with GlobalShala 2.0

[![Netlify Status](https://api.netlify.com/api/v1/badges/56ba7552-ab67-4fe2-ac4b-62d6deaeb944/deploy-status)](https://app.netlify.com/sites/blockcred/deploys)

## About BlockCred

### OBJECTIVE

A platform to securely issue and verify digital credential would go a long way to help both the issuing institutions and the receiving individuals. The lack of transparency in the issuing process, a seeming disconnect between the two ends and security loopholes all plague the various existing systems used for such credential issuing and verification.

![App Screenshots](https://github.com/simmsss/BlockCred/blob/main/Screenshots/Home.png?raw=true)

Our platform, BlockCred, is a Blockchain-powered Credential Issuing system that allows for complete transparency and authentication of such digital badges. 
On the part of the institutions, it allows for a platform to fish out authenticated candidates interested in availing their services, and on the part of the candidates, it allows for a seamless process for getting rewarded.

### FEATURES

We cater to the needs of both ends of the spectrum and put forth the following features and functionalities.

#### Scalability:

  *  Faultless verification of credentials issued on the platform
  *	 A suggestion contraption on the end of the issuing authorities to link them up with possible candidates based on their records
  *	 Recommendation Systems for related certificates and credentials

#### Security and Decentralised control 

*	One-touch login using Blockchain wallets like Metamask to ensure for an authenticated bunch of users
*	Secure and hassle-free financial transactions on Ethereum blockchain
*	Hack-proof public ledger for transactions and storing credential requests

#### Transparency

*	Complete transparency in an institution’s issuing record to counter any possible bias
*	Public ledger for credential verification and using credentials as a verified badge of skill on other platforms like LinkedIn

### APP FUNCTIONALITY 
The application straight-up gives three options to the different category of users-

1.	**Institutions**
  -	All users can issue certificates in their name. Institutions can also see certificate requests from different students and can approve/decline requests. After this they can collect the certificate fee in their wallets and in case a request is denied, the fee is refunded. 
  -	Another option at their hand is to issue cashless certificates directly to a set of candidates, i.e., enter the recipient address during the time of creation, directly give them the credentials and not charge any money for these certificates.
  
  ![App Screenshots](https://github.com/simmsss/BlockCred/blob/main/Screenshots/Institution.png?raw=true)

2.	**Students:** Browse, apply and pay for certificates created by institution/organisations on the platform.

3.	**Verifiers:** No login required, completely gas-less transactions that anyone can use. Candidates can share the link and certificate ID with potential employers, academia or add it to their portfolio and viewers can easily verify the existence of the credential on the platform.

 ![App Screenshots](https://github.com/simmsss/BlockCred/blob/main/Screenshots/Validate.png?raw=true)
 
### TECHNICAL ARCHITECTURE 
BlockCred, a secure and transparent system for issuance and verification, makes use of the Ethereum blockchain and connects to it via an Infura node. The front-end MVP/POC is built using React, giving us a responsive and scalable application.
Key frameworks: Ganache, Truffle, Node and Infura. The platform is completely written in JavaScript and Solidity.

<img src="https://img.shields.io/badge/node.js%20-%2343853D.svg?&style=for-the-badge&logo=node.js&logoColor=white"/> <img src="https://img.shields.io/badge/react%20-%2320232a.svg?&style=for-the-badge&logo=react&logoColor=%2361DAFB"/>
<img src="https://img.shields.io/badge/adobe%20illustrator%20-%23FF9A00.svg?&style=for-the-badge&logo=adobe%20illustrator&logoColor=white"/>
<img src="https://img.shields.io/badge/github%20-%23121011.svg?&style=for-the-badge&logo=github&logoColor=white"/>

## Requirements

#### Hardware

* macOS, Windows or Linux
* Atleast 4GB of RAM recommended 

#### Software

* Google Chrome, Brave or any Ethereum-enable browser
* Metamask Extension
* nodeJS
* Ganache Stand-alone application or Ganache CLI
* Truffle Suite
* A code editor (VS Code preffered)

#### Instructions

Clone the GitHub repo on your local machine. Navigate to the project folder in the terminal and run `npm install` to install dependencies. 

For local development on a local blockchain:
Launch Ganache, and quickstart a workspace. In the terminal, enter `truffle migrate --reset` to push the contracts to the local chain, then run `npm run start` to start the Web Application in your browser.

For Ethereum public deployment:
Make sure you have enough ETH in your wallet, or use any Ropsten faucet. In the `truffle-config.js` file in the project root, change the `mnemonic` and `provider` to your wallet's mnemonic and your Infura node. After that, run `truffle migrate --reset --network ropsten` to push the contracts to the Ropsten network. Run `npm run start` to start the Web Application in your browser. For deployment of the application, use Netlify and your GitHub remote. To get the build folder need by Netlify, use `npm run build`.

Made with ❤️ by [Arpit](https://www.behance.net/masiharpit), [Simran](https://simmsss.github.io/) and [Utkarsh](https://skhiearth.github.io/)

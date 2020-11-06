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
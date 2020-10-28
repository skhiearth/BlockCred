require('babel-register');
require('babel-polyfill');
const HDWalletProvider = require("@truffle/hdwallet-provider");
const mnemonic = "urban speed oppose uphold parade unlock swallow tuition traffic guitar mixed blush";

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*" // Match any network id
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/18ff33fefaa842c4bce3da488a244e46"),
      network_id: 3,
      gas: 560133
    }
  },

  contracts_directory: './src/contracts/',
  contracts_build_directory: './src/abis/',
  compilers: {
    solc: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}

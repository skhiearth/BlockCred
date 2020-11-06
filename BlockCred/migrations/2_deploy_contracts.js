const BlockCred = artifacts.require("BlockCred");

// Deploy BlockCred contract
module.exports = function(deployer) {
  deployer.deploy(BlockCred);
};
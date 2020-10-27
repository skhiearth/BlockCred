const BlockCred = artifacts.require("BlockCred");

module.exports = function(deployer) {
  deployer.deploy(BlockCred);
};
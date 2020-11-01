const Migrations = artifacts.require("Migrations");

// Deploy migration contract
module.exports = function(deployer) {
  deployer.deploy(Migrations);
};

var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var allocate = artifacts.require("./allocate.sol");

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(allocate);
};

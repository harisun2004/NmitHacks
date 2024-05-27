const DataValidationReport = artifacts.require("DataValidationReport");

module.exports = function (deployer) {
  deployer.deploy(DataValidationReport);
};

const DiplomaProvider = artifacts.require("DiplomaProvider");

module.exports = (deployer) => {
    deployer.deploy(DiplomaProvider);
};
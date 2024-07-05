const MemeCoin = artifacts.require("MemeCoin");

module.exports = function(deployer) {
    const initialSupply = web3.utils.toBN('1000000000000000000000000'); // 1,000,000 * 10^18
    deployer.deploy(MemeCoin, initialSupply);
};


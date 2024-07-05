const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const path = require('path');

const mnemonic = fs.readFileSync(path.resolve(__dirname, '..', '.secret')).toString().trim();
const infuraKey = fs.readFileSync(path.resolve(__dirname, '..', '.keyId')).toString().trim();

module.exports = async function(callback) {
  try {
    const provider = new HDWalletProvider(mnemonic, `https://sepolia.infura.io/v3/${infuraKey}`);
    const web3 = new Web3(provider);
    
    const accounts = await web3.eth.getAccounts();
    const account = accounts[0];
    const balance = await web3.eth.getBalance(account);
    
    console.log('Account:', account);
    console.log('Balance:', web3.utils.fromWei(balance, 'ether'), 'ETH');

    callback();
  } catch (error) {
    console.error('Error:', error);
    callback(error);
  }
};

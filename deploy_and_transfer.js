const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const MemeCoin = require('./build/contracts/MemeCoin.json');
const infuraKey = fs.readFileSync(path.resolve(__dirname, '..', '.keyId')).toString().trim(); // Votre Infura Project ID
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

const provider = new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
const web3 = new Web3(provider);
const account = provider.getAddress();

const deployAndTransfer = async () => {
  try {
    console.log("Deploying MemeCoin contract...");
    const memeCoinInstance = new web3.eth.Contract(MemeCoin.abi);

    const deployedMemeCoin = await memeCoinInstance
      .deploy({
        data: MemeCoin.bytecode,
        arguments: [web3.utils.toBN('1000000000000000000000000')] // 1,000,000 * 10^18
      })
      .send({ from: account, gas: 5500000 })
      .catch(error => {
        console.error("Error during contract deployment:", error);
        throw error;
      });

    console.log("MemeCoin deployed at:", deployedMemeCoin.options.address);

    const transferTokens = async (from, to, amount) => {
      try {
        console.log(`Transferring ${amount} tokens from ${from} to ${to}...`);
        await deployedMemeCoin.methods.transfer(to, amount).send({ from: from });
        console.log(`Transferred ${amount} tokens from ${from} to ${to}`);
      } catch (error) {
        console.error("Error during transfer:", error);
        if (error.message && error.message.includes('Too Many Requests')) {
          console.log("Waiting for 60 seconds before retrying...");
          await new Promise(resolve => setTimeout(resolve, 60000)); // Attendre 60 secondes
          return transferTokens(from, to, amount);
        } else {
          throw error;
        }
      }
    };

    await transferTokens(account, '0xRecipientAddressOne000000000000000000000000000', web3.utils.toBN('1000000000000000000')) // 1 token
      .catch(error => {
        console.error("Error during token transfer:", error);
        throw error;
      });
    await new Promise(resolve => setTimeout(resolve, 60000)); // Attendre 60 secondes

    await transferTokens(account, '0xRecipientAddressTwo000000000000000000000000000', web3.utils.toBN('2000000000000000000')) // 2 tokens
      .catch(error => {
        console.error("Error during token transfer:", error);
        throw error;
      });
    await new Promise(resolve => setTimeout(resolve, 60000)); // Attendre 60 secondes

    // Ajouter d'autres transferts si nécessaire...
  } catch (error) {
    console.error("Error in deployAndTransfer:", error);
  } finally {
    provider.engine.stop(); // Arrêter le provider
  }
};

deployAndTransfer().then(() => {
  console.log("All transactions completed.");
}).catch(error => {
  console.error("Error in deployAndTransfer:", error);
  provider.engine.stop(); // Arrêter le provider
});

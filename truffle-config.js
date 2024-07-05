const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();
const infuraKey = "82da40ab7145430a89434ec3e252a375";  // Votre clé Infura

console.log("Using mnemonic:", mnemonic);
console.log("Using Infura key:", infuraKey);

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*", // Any network (default: none)
    },
    rinkeby: {
      provider: () => {
        console.log("Connecting to Rinkeby...");
        return new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/${infuraKey}`);
      },
      network_id: 4,       // Rinkeby's id
      gas: 5500000,        // Gas limit
      confirmations: 2,    // # of confs to wait between deployments
      timeoutBlocks: 200,  // # of blocks before a deployment times out
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
    },
    mainnet: {
      provider: () => {
        console.log("Connecting to Mainnet...");
        return new HDWalletProvider(mnemonic, `https://mainnet.infura.io/v3/${infuraKey}`);
      },
      network_id: 1,       // Mainnet's id
      gas: 5500000,        // Gas limit
      confirmations: 2,    // # of confs to wait between deployments
      timeoutBlocks: 200,  // # of blocks before a deployment times out
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets)
    },
    sepolia: {
      provider: () => {
        const provider = new HDWalletProvider(
          mnemonic,
          `https://sepolia.infura.io/v3/${infuraKey}`
        );
        const originalSendAsync = provider.engine.sendAsync.bind(provider.engine);
        provider.engine.sendAsync = (payload, callback) => {
          setTimeout(() => {
            originalSendAsync(payload, callback);
          }, 2000); // Délai de 2 secondes entre les requêtes
        };
        return provider;
      },
      network_id: 11155111,  // ID du réseau Sépolia
      gas: 5500000,          // Limite de gaz
      gasPrice: 20000000000, // 20 gwei (vous pouvez ajuster selon les conditions du réseau)
      confirmations: 2,      // Nombre de confirmations avant de considérer une transaction comme réussie
      timeoutBlocks: 200,    // Nombre maximum de blocs à attendre avant de timeout
      skipDryRun: true,      // Skip dry run avant les migrations réelles
      networkCheckTimeout: 1000000, // Augmenter le timeout du réseau pour éviter les erreurs de timeout
      deploymentPollingInterval: 8000 // Ajouter un délai entre les requêtes pour éviter les limites de taux
    },
  },
  compilers: {
    solc: {
      version: "0.8.19",   // Utilisez la version requise par votre contrat
    },
  },
};

const HDWalletProvider = require('@truffle/hdwallet-provider');

// Replace with your mnemonic phrase and CoinEx testnet RPC URL
const mnemonic = "portion round tape million exile brave glove cake dignity awkward bid domain";
const coinexTestnetRPC = 'https://testnet-rpc.coinex.net';

module.exports = {
  networks: {
    coinexTestnet: {
      provider: () => new HDWalletProvider(mnemonic, coinexTestnetRPC),
      network_id: 53,
      gas: 5500000,
      confirmations: 2,
      timeoutBlocks: 200,
      skipDryRun: true,
      gasPrice: 500000000000 
    }
  },
  compilers: {
    solc: {
      version: "0.8.0"
    }
  }
};

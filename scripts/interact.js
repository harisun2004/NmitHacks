const Web3 = require('web3');
const HDWalletProvider = require('@truffle/hdwallet-provider');
const { abi } = require('../DataValidationReport.json');  // Adjust the path if necessary

const mnemonic = "portion round tape million exile brave glove cake dignity awkward bid domain";
const coinexTestnetRPC = 'https://testnet-rpc.coinex.net';
const contractAddress = '0xEeB263D78E193919027fC218C4A41EBB21D3490F';

async function main() {
  console.log("Initializing provider...");
  const provider = new HDWalletProvider(mnemonic, coinexTestnetRPC);
  const web3 = new Web3(provider);

  console.log("Creating contract instance...");
  const contract = new web3.eth.Contract(abi, contractAddress);
  const accounts = await web3.eth.getAccounts();
  const deployer = accounts[0];
  console.log(`Using deployer account: ${deployer}`);

  // Get arguments from the command line
  const args = process.argv.slice(2);
  if (args.length !== 8) {
    console.error("Invalid number of arguments. Expected 8 arguments.");
    console.log("Usage: node interact.js <reportId> <datasetName> <hashedIpfsCid> <hashedGcsUrl> <version> <owner> <license> <smartChainAddress>");
    process.exit(1);
  }
  const [reportId, datasetName, hashedIpfsCid, hashedGcsUrl, version, owner, license, smartChainAddress] = args;

  console.log("Arguments received:", { reportId, datasetName, hashedIpfsCid, hashedGcsUrl, version, owner, license, smartChainAddress });

  try {
    console.log("Sending transaction...");
    const receipt = await contract.methods.storeReport(
      reportId, datasetName, hashedIpfsCid, hashedGcsUrl, version, owner, license
    ).send({ from: deployer, gas: 5500000 });
    console.log('Transaction receipt:', receipt);
  } catch (error) {
    console.error('Error interacting with contract:', error);
  } finally {
    console.log("Stopping provider...");
    provider.engine.stop();
  }
}

main().catch(error => {
  console.error('Unexpected error:', error);
});

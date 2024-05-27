async function main() {
    const [deployer] = await ethers.getSigners();
  
    console.log("Deploying contracts with the account:", deployer.address);
  
    const DataValidationReport = await ethers.getContractFactory("DataValidationReport");
    const contract = await DataValidationReport.deploy();
  
    console.log("DataValidationReport contract deployed to:", contract.address);
  }
  
  main()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error(error);
      process.exit(1);
    });
  
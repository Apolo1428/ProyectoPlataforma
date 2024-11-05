const hre = require("hardhat");

async function main() {
  const ServiceCompletion = await hre.ethers.getContractFactory("ServiceCompletion");
  const serviceCompletion = await ServiceCompletion.deploy();
  await serviceCompletion.deployed();
  console.log("ServiceCompletion deployed to:", serviceCompletion.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
    //hol
  });
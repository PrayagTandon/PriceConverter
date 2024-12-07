require('dotenv').config();
const { ethers } = require('hardhat');

const main = async () => {
    console.log("Deploying the contract...");

    const contractFactory = await ethers.getContractFactory('MultiPriceDataConsumer');

    // Deploying the contract (Add constructor args here if needed)
    const contract = await contractFactory.deploy();
    await contract.deployed();

    console.log("Contract deployed to:", contract.address);
    console.log("Transaction hash:", contract.deploymentTransaction.hash);
};

const runMain = async () => {
    try {
        await main();
        process.exit(0);
    } catch (error) {
        console.error("Error during deployment:", error);
        process.exit(1);
    }
};

runMain();

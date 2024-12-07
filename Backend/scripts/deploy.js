const hre = require("hardhat");

async function main() {
    const [deployer] = await hre.ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);

    const TaskContract = await hre.ethers.getContractFactory("MultiPriceDataConsumer");
    const taskContract = await TaskContract.deploy();

    console.log("TaskContract deployed to:", taskContract.target);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

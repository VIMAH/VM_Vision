const { ethers } = require("hardhat");

async function main() {
    const [deployer] = await ethers.getSigners();

    console.log("Deploying contracts with the account:", deployer.address);
    console.log("Account balance:", (await deployer.provider.getBalance(deployer.address)).toString());

    // Deploy VM Vision Token
    console.log("\n=== Deploying VM Vision Token ===");
    const VMVisionToken = await ethers.getContractFactory("VMVisionToken");
    const token = await VMVisionToken.deploy();
    await token.waitForDeployment();
    const tokenAddress = await token.getAddress();
    console.log("VM Vision Token deployed to:", tokenAddress);

    // Deploy VM Vision NFT
    console.log("\n=== Deploying VM Vision NFT ===");
    const VMVisionNFT = await ethers.getContractFactory("VMVisionNFT");
    const nft = await VMVisionNFT.deploy(
        "VM Vision Collection",
        "VMVC",
        "https://api.vmvision.com/nft/",
        deployer.address // Royalty recipient
    );
    await nft.waitForDeployment();
    const nftAddress = await nft.getAddress();
    console.log("VM Vision NFT deployed to:", nftAddress);

    // Deploy Timelock Controller for DAO
    console.log("\n=== Deploying Timelock Controller ===");
    const TimelockController = await ethers.getContractFactory("TimelockController");
    const timelock = await TimelockController.deploy(
        2 * 24 * 60 * 60, // 2 days delay
        [deployer.address], // proposers
        [deployer.address], // executors
        deployer.address // admin
    );
    await timelock.waitForDeployment();
    const timelockAddress = await timelock.getAddress();
    console.log("Timelock Controller deployed to:", timelockAddress);

    // Deploy VM Vision DAO
    console.log("\n=== Deploying VM Vision DAO ===");
    const VMVisionDAO = await ethers.getContractFactory("VMVisionDAO");
    const dao = await VMVisionDAO.deploy(
        tokenAddress, // voting token
        timelockAddress, // timelock
        4 // 4% quorum
    );
    await dao.waitForDeployment();
    const daoAddress = await dao.getAddress();
    console.log("VM Vision DAO deployed to:", daoAddress);

    // Transfer ownership of timelock to DAO
    console.log("\n=== Transferring Timelock Ownership ===");
    const transferTx = await timelock.transferOwnership(daoAddress);
    await transferTx.wait();
    console.log("Timelock ownership transferred to DAO");

    // Set up initial configurations
    console.log("\n=== Setting up initial configurations ===");

    // Configure NFT
    await nft.setMintPrice(ethers.parseEther("0.05"));
    await nft.setWhitelistPrice(ethers.parseEther("0.03"));
    console.log("NFT prices configured");

    // Add deployer to whitelist
    await nft.updateWhitelist([deployer.address], true);
    console.log("Deployer added to NFT whitelist");

    // Mint some initial tokens for testing
    console.log("\n=== Minting initial tokens ===");
    const mintTx = await token.mint(deployer.address, ethers.parseEther("1000000"));
    await mintTx.wait();
    console.log("1M tokens minted to deployer");

    // Delegate voting power
    const delegateTx = await token.delegate(deployer.address);
    await delegateTx.wait();
    console.log("Voting power delegated to deployer");

    // Print deployment summary
    console.log("\n=== Deployment Summary ===");
    console.log("Network:", await deployer.provider.getNetwork());
    console.log("Deployer:", deployer.address);
    console.log("VM Vision Token:", tokenAddress);
    console.log("VM Vision NFT:", nftAddress);
    console.log("Timelock Controller:", timelockAddress);
    console.log("VM Vision DAO:", daoAddress);

    // Save deployment info
    const deploymentInfo = {
        network: (await deployer.provider.getNetwork()).name,
        chainId: (await deployer.provider.getNetwork()).chainId,
        deployer: deployer.address,
        contracts: {
            VMVisionToken: tokenAddress,
            VMVisionNFT: nftAddress,
            TimelockController: timelockAddress,
            VMVisionDAO: daoAddress
        },
        timestamp: new Date().toISOString()
    };

    console.log("\n=== Deployment Info (JSON) ===");
    console.log(JSON.stringify(deploymentInfo, null, 2));

    console.log("\n=== Next Steps ===");
    console.log("1. Verify contracts on block explorer");
    console.log("2. Update frontend with contract addresses");
    console.log("3. Configure NFT metadata");
    console.log("4. Set up DAO governance parameters");
    console.log("5. Test all contract functions");
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });

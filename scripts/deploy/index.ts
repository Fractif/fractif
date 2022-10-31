import { ethers, upgrades, network } from "hardhat"
import { FractifV1, TimelockController, Crowdsales, FakeERC20, Frac, Marketplace } from "@typesDir/contracts"

const main = async () => {
    // Both the executor and the proposer must be the Gnosis Safe address.
    // In the near future, we'll set the Governance contract as the executor and the proposer.
    const proposer = process.env.PROPOSER // is allowed to schedule transactions
    const executor = process.env.EXECUTOR // is allowed to execute transactions
    if (!proposer || !executor) {
        console.log(`Please set the EXECUTOR and PROPOSER environment variables`)
        process.exit(-1)
    }
    const [deployer] = await ethers.getSigners();
    console.log(`Deploying contracts with the account '${deployer.address}' on ${network.name} network`);
    console.log("Account balance:", (await deployer.getBalance()).toString());

    // Get contracts factories
    const Crowdsales = await ethers.getContractFactory("Crowdsales")
    const FractifV1 = await ethers.getContractFactory("FractifV1")
    const Marketplace = await ethers.getContractFactory("Marketplace")
    const FakeErc20 = await ethers.getContractFactory("FakeERC20")
    const Timelock = await ethers.getContractFactory("TimelockController")
    const Frac = await ethers.getContractFactory("Frac")

    // Deploy contracts
    console.log("Deploying FractifV1...")
    const fractifV1Instance = await upgrades.deployProxy(FractifV1) as FractifV1
    console.log(`FractifV1 deployed at ${fractifV1Instance.address}`)
    if (["goerli", "localhost", "hardhat"].includes(network.name)) {
        console.log("Deploying the fake ERC20 token...")
        const fakeTokenErc20: FakeERC20 = await FakeErc20.deploy()
        console.log(`Fake ERC20 token deployed at ${fakeTokenErc20.address}`)
    }
    console.log("Deploying the Marketplace...")
    const marketplaceInstance = await upgrades.deployProxy(Marketplace, [fractifV1Instance.address]) as Marketplace
    console.log(`Marketplace deployed at ${marketplaceInstance.address}`)
    console.log("Deploying Crowdsales...")
    const crowdsalesInstance = await upgrades.deployProxy(Crowdsales, [fractifV1Instance.address]) as Crowdsales
    console.log(`Crowdsales deployed at ${crowdsalesInstance.address}`)
    console.log("Deploying Frac...")
    const fracToken: Frac = await Frac.deploy()
    console.log(`Frac deployed at ${fracToken.address}`)
    console.log(`Deploying TimelockController with executor ${executor} and proposer ${proposer}...`)
    const minDelay = 60 * 60 * 24; // 1 day
    const timelockInstance: TimelockController = await Timelock.deploy(minDelay, [proposer], [executor])
    console.log(`TimelockController deployed at ${timelockInstance.address}`)

    // Grant roles to contracts
    console.log("Granting roles to contracts...")
    await fractifV1Instance.grantRole(await fractifV1Instance.MINTER_ROLE(), crowdsalesInstance.address)
    await fractifV1Instance.grantRole(await fractifV1Instance.MINTER_ROLE(), timelockInstance.address)
    await fractifV1Instance.grantRole(await fractifV1Instance.SELLOUT_SETTER_ROLE(), proposer)
    await fractifV1Instance.grantRole(await fractifV1Instance.URI_SETTER_ROLE(), proposer)
    await fractifV1Instance.grantRole(await fractifV1Instance.APPROVER_ROLE(), proposer)
    await fractifV1Instance.grantRole(await fractifV1Instance.MINTER_ROLE(), proposer)
    console.log("Roles granted")

    if (["goerli", "localhost", "hardhat"].includes(network.name)) {
        console.log("Minting some tokens for the deployer...")
        await fractifV1Instance.mint(deployer.address, 0, ethers.utils.parseEther("1000"), "0x00")
        console.log("Tokens minted")
        if (process.env.FRIEND_ADDRESS) {
            console.log("Sending some tokens to a friend...")
            await fractifV1Instance.safeTransferFrom(
                deployer.address,
                process.env.FRIEND_ADDRESS,
                0,
                ethers.utils.parseEther("100"),
                "0x00"
            )
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error);
        process.exit(1);
    });
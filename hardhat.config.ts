import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-chai-matchers'
import "@nomiclabs/hardhat-etherscan";
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import '@openzeppelin/hardhat-upgrades';
import * as dotenv from 'dotenv';

dotenv.config();
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY!;

const config: HardhatUserConfig = {
    solidity: {
        version: '0.8.17',
        settings: {
            optimizer: {
                enabled: true,
                runs: 200
            }  
        },
    },
    typechain: {
        outDir: 'types/contracts'
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true
        },
        localhost: {
            allowUnlimitedContractSize: true
        },
        goerli: {
            url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY],
            allowUnlimitedContractSize: true
        }
    },
    etherscan: {
        apiKey: process.env.ETHERSCAN_API_KEY
    }
}

export default config

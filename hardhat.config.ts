import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomicfoundation/hardhat-chai-matchers'
import "@nomiclabs/hardhat-etherscan"
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import '@openzeppelin/hardhat-upgrades'
import "hardhat-gas-reporter"
import * as dotenv from 'dotenv'

dotenv.config()
const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY
const GOERLI_PRIVATE_KEY = process.env.GOERLI_PRIVATE_KEY!
const ALCHEMY_OPTIMISM_GOERLI_API_KEY = process.env.ALCHEMY_OPTIMISM_GOERLI_API_KEY

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
            allowUnlimitedContractSize: true,
            timeout: 1000000
        },
        optimisticGoerli: {
            url: `https://opt-goerli.g.alchemy.com/v2/${ALCHEMY_OPTIMISM_GOERLI_API_KEY}`,
            accounts: [GOERLI_PRIVATE_KEY],
            allowUnlimitedContractSize: true,
            timeout: 1000000
        }
    },
    etherscan: {
        apiKey: {
            mainnet: process.env.ETHERSCAN_API_KEY!,
            optimisticGoerli: process.env.ETHERSCAN_OPTIMISTIC_API_KEY!
        },
    },
    gasReporter: {
        enabled: (process.env.REPORT_GAS) ? true : false,
        coinmarketcap: process.env.COINMARKETCAP_API_KEY,
        outputFile: 'gas-report.txt',
        noColors: true,
        showTimeSpent: true,
        token: "ETH",
        gasPriceApi: "https://api-optimistic.etherscan.io/api?module=proxy&action=eth_gasPrice"
    }
}

export default config

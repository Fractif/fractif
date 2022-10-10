import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import '@nomiclabs/hardhat-ethers'
import '@typechain/hardhat'
import '@openzeppelin/hardhat-upgrades';

const config: HardhatUserConfig = {
    solidity: '0.8.17',
    typechain: {
        outDir: 'types/contracts'
    },
    networks: {
        hardhat: {
            allowUnlimitedContractSize: true
        },
        localhost: {
            allowUnlimitedContractSize: true
        }
    }
}

export default config

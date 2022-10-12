# Fractif asset token template

## Contracts
- `FractifV1.sol`: the Fractif ERC1155 smart contract
- `Marketplace.sol`: the Fractif marketplace smart contract
- `Crowdsales.sol`: is a smart contract that will enable crowdfunding for unlisted items
- `governance/Frac.sol`: Frac is, our soon to be, ERC20 governance token

## Governance
### For ERC1155 Fractif tokens holders
Fungible token holders are able to vote through snapshot.org to propose the selling of the associated item
### For ERC20 Frac tokens holders
Holders will be able to vote onchain for modifications to Fractif smart contracts

## Development
### Requirements
```sh
npm i
```
### Setup
- Setup env keys
```sh
MNEMONIC=....
ALCHEMY_GOERLI_URL=....
```
### Next.js
```sh
npm run dev
```
### Testing
- Run in shell
```sh
npx hardhat test
```
- Run specific test
```sh
npx hardhat test --grep "<pattern>"
```
### Coverage
- Run in shell
```sh
npx hardhat coverage
```
or
```sh
npm run coverage
```

### Troubleshooting
#### `Error: cannot estimate gas; transaction may fail or may require manual gas limit: Transaction reverted and Hardhat couldn't infer the reason.`
```js
networks: {
    hardhat: {
        allowUnlimitedContractSize: true
    },
    localhost: {
        allowUnlimitedContractSize: true
    }
}
```

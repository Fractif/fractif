# Fractif V1

## Contracts
- `FractifV1.sol`: the Fractif ERC1155 smart contract
- `Marketplace.sol`: the Fractif marketplace smart contract
- `Crowdsales.sol`: is a smart contract that will enable crowdfunding for unlisted items
- `governance/Frac.sol`: Frac is, our soon to be, ERC20 governance token

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
REACT_APP_INFURA_KEY=....
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

### Deploy to Goerli
- Run in shell
```sh
npx hardhat run --network goerli scripts/deploy/prod.ts
```

### Troubleshooting
#### `Error: cannot estimate gas; transaction may fail or may require manual gas limit: Transaction reverted and Hardhat couldn't infer the reason.`
```js
// hardhat.config.ts
networks: {
    hardhat: {
        allowUnlimitedContractSize: true
    },
    localhost: {
        allowUnlimitedContractSize: true
    }
}
```

# Fractif App
## Contracts
- `FractifV1.sol`: the Fractif ERC1155 smart contract
- `Marketplace.sol`: the Fractif Marketplace Smart contract

## Development
### Requirements
```sh
npm i
```
Fill out .env file:
.env.example
```sh
REACT_APP_INFURA_KEY=YOUR INFURA KEY
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


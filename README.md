# Fractif App

## Contracts
can be found in [`./packages/fractif-v1/contracts`](./packages/fractif-v1/contracts)
- `FractifV1.sol`: the Fractif ERC1155 smart contract
- `Marketplace.sol`: the Fractif marketplace smart contract
- `Crowdsales.sol`: is a smart contract that will enable crowdfunding for unlisted items
- `governance/Frac.sol`: Frac is, our soon to be, ERC20 governance token

## Governance
Fractif smart contracts can be governed by onchain with our `Frac` token or offchain through snapshot.org
### For ERC1155 Fractif tokens holders
Fungible token holders are able to vote through snapshot.org to propose the selling of the associated item
### For ERC20 Frac tokens holders
Holders will be able to vote onchain for modifications to Fractif smart contracts

## Development
Fractif is structured as a [monorepo](https://en.wikipedia.org/wiki/Monorepo). Applications (Web, Desktop, etc...) can be found under [`./apps`](./apps), while reusable packages (UI, client, etc...) can be found under [`./packages`](./packages). Smart contracts can be found in [`./packages/fractif-v1/contracts`](./packages/fractif-v1/contracts).

## Troubleshooting

#### `Parsing error: Cannot read file '/monorepo/tsconfig.json'`
In vscode, `settings.json`:
```json
"eslint.workingDirectories": [
    {
        "pattern": "./apps/*/"
    },
    {
        "pattern": "./packages/*/"
    }
]
```

## DISCLAIMER
This project is still in early development

## Licence
Fractif is under the [Business Source License 1.1](./LICENCE)

## Maintainers 💜

<table>
    <tbody>
        <tr>
            <td align="center">
                <a href="https://github.com/azerpas">
                    <img width="150" height="150" src="https://pbs.twimg.com/profile_images/702255176053342209/u9HYjYrf_400x400.jpg">
                    <br />
                    <strong>Azerpas</strong>
                </a>
                <br />
                Author
            </td>
            <td align="center">
                <a href="https://github.com/Tixwell">
                    <img width="150" height="150" src="https://avatars.githubusercontent.com/u/59584617?v=4&s=150">
                    <br />
                    <strong>Téo</strong>
                </a>
                <br />
                Contributor
            </td>
            <td align="center">
                <a href="https://github.com/iam-luci">
                    <img width="150" height="150" src="https://avatars.githubusercontent.com/u/54605893?v=4&size=150">
                    <br />
                    <strong>Luci Dev</strong>
                </a>
                <br />
                Contributor
            </td>
        </tr>
    </tbody>
</table>

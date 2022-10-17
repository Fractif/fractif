import { upgrades, ethers } from "hardhat"

import { BigNumber } from "ethers"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"

import { expect } from "chai"
import { FakeERC20, FractifV1 } from "../types/contracts/"
import { toBnPowed, allowFractifToSpendFakeToken, genItemForSale } from "./utils"

type Item = {
    id: number,
    name: string,
    price: BigNumber,
    quantity: number,
    sellout: {
        ether: string,
        fakeErc20: string
    }
}

const item1: Item = genItemForSale(0, 1000)
const item2: Item = genItemForSale(1, 1000)

describe("FractifV1", () => {
    let fractifInstance: FractifV1
    /** 
     * This fake token is used to test these functions:
     * - `sell`: so we can check if the contract receive approved ERC20 tokens.
     */  
    let fakeToken: FakeERC20
    let owner: SignerWithAddress, buyer1: SignerWithAddress, buyer2: SignerWithAddress, buyer3: SignerWithAddress

    beforeEach(async () => {
        [owner, buyer1, buyer2, buyer3] = await ethers.getSigners()
        const FractifV1 = await ethers.getContractFactory("FractifV1")
        const FakeErc20 = await ethers.getContractFactory("FakeERC20")
        fractifInstance = await upgrades.deployProxy(FractifV1) as FractifV1
        await fractifInstance.mint(owner.address, item1.id, toBnPowed(item1.quantity), "0x00", { from: owner.address })
        await fractifInstance.mint(owner.address, item2.id, toBnPowed(item2.quantity), "0x00", { from: owner.address })
        await fractifInstance.connect(buyer2).setApprovalForAll(owner.address, true)
        fakeToken = await FakeErc20.connect(owner).deploy()
        await fakeToken.transfer(buyer2.address, toBnPowed(1000))
    })

    it("has a total supply of 1000", async () => {
        let supply = await fractifInstance.totalSupply(item1.id)
        expect(supply.toString(), `Total supply should be ${item1.quantity} tokens`).to.be.equal(toBnPowed(item1.quantity).toString())
    })

    it('should transfer the initial supply to the owner.address', async function () {
        let balance = await fractifInstance.balanceOf(owner.address, item1.id)
        expect(balance.toString(), `owner.address should have ${item1.quantity} tokens`).to.be.equal(toBnPowed(item1.quantity).toString())
    })
    
    it('shouldn\'t be possible to burn tokens before the item has sold', async function () {
        expect(fractifInstance.connect(buyer1).burn(buyer1.address, item1.id, toBnPowed(10)))
            .to.be.revertedWithCustomError(fractifInstance, "NotRedeemable")
    })

    it('shouldn\'t be possible to burn someone else tokens if you\'re not an operator', async function () {
        expect(fractifInstance.connect(buyer2).burn(buyer1.address, item1.id, toBnPowed(10)))
            .to.be.revertedWithCustomError(fractifInstance, "NotApproved")
    })

    it('[TODO:] should revert on burnBatch', async function () {
        expect(fractifInstance.connect(buyer1).burnBatch(buyer1.address, [item1.id, item2.id], [toBnPowed(10), toBnPowed(10)]))
            .to.be.reverted
    })

    it('should have an operator set for account 2', async function () {
        expect(await fractifInstance.isApprovedForAll(buyer2.address, owner.address), "Account 0 should be an operator of account 2")
            .to.be.equal(true)
    })

    const canAddApprovedCoin = async () => {
        await fractifInstance.addCoin(fakeToken.address, {from: owner.address})
        const approved = await fractifInstance.isApprovedCoin(fakeToken.address)
        expect(approved, "Fake Token should be approved")
            .to.be.equal(true)
    }

    it('can add coin', async function () {
        await canAddApprovedCoin()
    })

    it('should fail to add coin if not allowed', async function () {
        await expect(fractifInstance.connect(buyer1).addCoin(fakeToken.address))
            .to.be.reverted
    })

    const setTheSelloutPrice = async (price: string, address: string) => {
        await fractifInstance.setSelloutPrice(item1.id, price, address, {from: owner.address})
        const selloutPrice = await fractifInstance.getSelloutPrice(item1.id)
        expect(selloutPrice.toString(), `Sell-out price should be '${price}'`)
            .to.be.equal(price)
    }

    const depositFunds = async (price: string, erc20: boolean) => {
        if (erc20) {
            await fractifInstance.deposit(item1.id)
            const tokenBalance = await fakeToken.balanceOf(fractifInstance.address)
            expect(tokenBalance.toString(), `Token balance should be '${price}'`)
                .to.equal(price)
        } else {
            await fractifInstance.deposit(item1.id, {value: price})
            const tokenBalance = await ethers.provider.getBalance(fractifInstance.address)
            expect(tokenBalance, `Token balance should be '${price}'`)
                .to.be.equal(price)
        }
    }

    it('can set the sell-out price with ethers', async function () {
        const price = item1.sellout.ether
        await setTheSelloutPrice(price, "0x0000000000000000000000000000000000000000")
    })

    it('can deposit ethers once the sell-out price has been set', async () => {
        const price = item1.sellout.ether
        await setTheSelloutPrice(price, "0x0000000000000000000000000000000000000000")
        await depositFunds(price, false)
    })

    it('can set the sell-out price with an ERC20 token - FakeERC20', async function () {
        const price = item1.sellout.fakeErc20 // 1000 FakeERC20 tokens
        await canAddApprovedCoin()
        await allowFractifToSpendFakeToken(fakeToken, fractifInstance, price, owner.address)
        await setTheSelloutPrice(price, fakeToken.address)
        const depositedCoin = await fractifInstance.getDepositedCoin(item1.id)
        expect(depositedCoin, `Deposited coin should be '${fakeToken.address}'`)
            .to.equal(fakeToken.address)
        
    })

    it('can deposit ERC20 tokens once the sell-out price has been set', async () => {
        const price = item1.sellout.fakeErc20 // 1000 FakeERC20 tokens
        await canAddApprovedCoin()
        await allowFractifToSpendFakeToken(fakeToken, fractifInstance, price, owner.address)
        await setTheSelloutPrice(price, fakeToken.address)
        await depositFunds(price, true)
    })

    it('should fail to set the sell-out price if not allowed', async function () {
        const price = item1.sellout.ether
        expect(fractifInstance.connect(buyer1).setSelloutPrice(item1.id, price, "0x0000000000000000000000000000000000000000"))
            .to.be.reverted
    })

    const sendTokensFromOwnerToAccount3 = async (value: number = 100): Promise<BigNumber> => {
        const buyer3Holdings = toBnPowed(value)
        await fractifInstance.safeTransferFrom(owner.address, buyer3.address, item1.id, buyer3Holdings, "0x00", {from: owner.address})
        const balance = await fractifInstance.balanceOf(buyer3.address, item1.id)
        expect(balance.toString(), "Account 3 should have 100 tokens")
            .to.be.equal(buyer3Holdings.toString())
        return balance
    }

    it('returns the owned refund amount', async function () {
        /**
         * - 1 ether is added as a sell-out price for the item.
         * - 1000 tokens are distributed for the item.
         * - 100 tokens are sent to account 3.
         * - The account 3 burns 100 tokens, and is rewarded 10% of the sell-out price, which is 0.1 ether.
         */
        const balance = await sendTokensFromOwnerToAccount3()
        const price = item1.sellout.ether
        const amountToBeRedeemed = ethers.utils.parseEther("0.1")
        await fractifInstance.setSelloutPrice(item1.id, price, "0x0000000000000000000000000000000000000000")
        const ownedAmount = await fractifInstance.getRefundAmount(item1.id, balance)
        expect(ownedAmount.toString(), `Owned amount should be '${amountToBeRedeemed}'`)
            .to.be.equal(amountToBeRedeemed)
    })

    it('burns the tokens and transfer the owed amount to the caller - ether', async function () {
        // Pre-burn
        let gasCost = BigNumber.from(0)
        await sendTokensFromOwnerToAccount3()
        const callerBalanceBeforeBurn = BigNumber.from(await ethers.provider.getBalance(buyer3.address))
        const amount = BigNumber.from(ethers.utils.parseEther("1"))
        const amountToBeRedeemed = BigNumber.from(ethers.utils.parseEther("0.1"))
        const price = item1.sellout.ether
        await setTheSelloutPrice(price, "0x0000000000000000000000000000000000000000")
        await depositFunds(price, false)
        // Burn
        const tx = await fractifInstance.connect(buyer3).burn(buyer3.address, item1.id, toBnPowed(100))
        // const tx = await ethers.provider.getTransaction(receipt.tx)
        const receipt = await tx.wait()
        // Calculating used gas
        const gasUsed = BigNumber.from(receipt.cumulativeGasUsed)
        const gasPrice = BigNumber.from(tx.gasPrice)
        gasCost = gasPrice.mul(gasUsed)
        // Balance check
        const callerBalanceAfterBurn = BigNumber.from(await ethers.provider.getBalance(buyer3.address))
        const tokenBalance = BigNumber.from(await ethers.provider.getBalance(fractifInstance.address))
        const delta = BigNumber.from(ethers.utils.parseEther("0.001"))
        const callerBalanceAfterBurnWithGasCost = callerBalanceAfterBurn.add(gasCost)
        expect(callerBalanceAfterBurnWithGasCost)
            .to.be.closeTo(
                callerBalanceBeforeBurn.add(amountToBeRedeemed), 
                delta, 
                `callerBalanceAfterBurn (${callerBalanceAfterBurn.toString()}) isn't close (delta: ${delta.toString()}) to ${callerBalanceBeforeBurn.add(amountToBeRedeemed).add(gasCost).toString()}`
            )
        expect(tokenBalance.toString(), `Token balance should be '${amount.sub(amountToBeRedeemed).toString()}'`)
            .to.be.equal(amount.sub(amountToBeRedeemed).toString())
        // Supply check
        let supply = await fractifInstance.totalSupply(item1.id)
        expect(supply.toString(), "Total supply should be 900 tokens")
            .to.be.equal(toBnPowed(900).toString())
    })

    it('burns the tokens and transfer the owed amount to the caller - ERC20', async function () {
        /**
         * How much does the holder (buyer2.address) get back
         */
        const holderShares = item1.quantity / 10 // 10% of the total supply
        const holderSharesBn = toBnPowed(holderShares)
        const amountInjected = toBnPowed(10000) // 10000 FakeERC20 tokens
        const amountToBeRedeemed = amountInjected.div(BigNumber.from(10)) // 1000 FakeERC20 tokens
        const price = item1.sellout.fakeErc20

        // Pre-burn
        await canAddApprovedCoin()
        await allowFractifToSpendFakeToken(fakeToken, fractifInstance, toBnPowed(price), owner.address)
        // 10% of the supply is sent to account 2
        await fractifInstance.safeTransferFrom(owner.address, buyer2.address, item1.id, holderSharesBn, "0x00", {from: owner.address})
        const balance = await fractifInstance.balanceOf(buyer2.address, item1.id) // 1000 tokens
        expect(balance.toString(), "Account 2 should have 1000 tokens")
            .to.be.equal(holderSharesBn.toString())
        const callerBalanceBeforeBurn = await fakeToken.balanceOf(buyer2.address) // 1000 FakeERC20 tokens
        await setTheSelloutPrice(amountInjected.toString(), fakeToken.address)
        await depositFunds(amountInjected.toString(), true)

        const ownedAmount = await fractifInstance.getRefundAmount(item1.id, balance)

        // Burn
        await fractifInstance.connect(buyer2).burn(buyer2.address, item1.id, holderSharesBn, {from: buyer2.address})
        // Balance check
        const tokenBalance = await fakeToken.balanceOf(fractifInstance.address)
        const callerBalanceAfterBurn = await fakeToken.balanceOf(buyer2.address)
        expect(tokenBalance)
            .to.be.equal(
                amountInjected.sub(amountToBeRedeemed),
                `Token balance should be '${amountInjected.sub(amountToBeRedeemed)}'`
            )
        expect(callerBalanceAfterBurn)
            .to.be.equal(
                callerBalanceBeforeBurn.add(amountToBeRedeemed), 
                `callerBalanceAfterBurn (${callerBalanceAfterBurn.toString()}) isn't equal to ${callerBalanceBeforeBurn.add(amountToBeRedeemed).toString()}`
            )
        
        // Supply check
        let supply = await fractifInstance.totalSupply(item1.id)
        expect(supply.toString(), "Total supply should be 900 tokens")
            .to.be.equal(toBnPowed(item1.quantity - holderShares).toString())
    })
})
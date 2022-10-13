import { ethers, network, upgrades } from "hardhat"
import { toBnPowed } from "./utils"
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers"
import { FractifV1, Crowdsales, FakeERC20 } from "../types/contracts"
import { expect } from "chai"

describe("Crowdsales", () => {
    let owner: SignerWithAddress, buyer1: SignerWithAddress, buyer2: SignerWithAddress, buyer3: SignerWithAddress
    let fractifInstance: FractifV1
    let crowdsalesInstance: Crowdsales
    let fakeToken: FakeERC20

    beforeEach(async () => {
        [owner, buyer1, buyer2, buyer3] = await ethers.getSigners()
        const Crowdsales = await ethers.getContractFactory("Crowdsales")
        const FractifV1 = await ethers.getContractFactory("FractifV1")
        const FakeErc20 = await ethers.getContractFactory("FakeERC20")
        fakeToken = await FakeErc20.connect(owner).deploy()
        await fakeToken.transfer(buyer2.address, toBnPowed(10000))
        fractifInstance = await upgrades.deployProxy(FractifV1) as FractifV1
        await fractifInstance.mint(owner.address, 0, 1, '0x')
        crowdsalesInstance = await upgrades.deployProxy(Crowdsales, [fractifInstance.address]) as Crowdsales
        await fractifInstance.grantRole(await fractifInstance.MINTER_ROLE(), crowdsalesInstance.address)
        const timestamp = Math.round((new Date()).getTime() / 1000)
        await crowdsalesInstance.listNewCrowdsale(
            0, // token id
            1, // rate
            timestamp + 60, // start time
            timestamp + 1200, // end time
            toBnPowed(10000), // goal
            owner.address, // beneficiary
            fakeToken.address // approved token
        )
    })

    afterEach(async () => {
        // Reset the blockchain
        await network.provider.send("hardhat_reset")
    })

    describe('Crowdsales init checks', () => {
        it('should return the correct rate', async () => {
            expect(await crowdsalesInstance.getRate(0)).to.be.equals(1)
        })
    
        it('should return the goal', async () => {
            expect(await crowdsalesInstance.getGoal(0)).to.be.equals(toBnPowed(10000))
        })

        it('should return the amount raised', async () => {
            expect(await crowdsalesInstance.getAmountOfTokensRaised(0)).to.be.equals(0)
        })
    })

    it('should fail listing on wrong token id', async () => {
        expect(
            crowdsalesInstance
                .listNewCrowdsale(1, 1, 1, 1, 1, owner.address, "0x0000000000000000000000000000000000000000")
        ).to.be.revertedWithCustomError(crowdsalesInstance, "WrongTokenId")
    })

    const buyAllTheShares = async (buyer: SignerWithAddress) => { 
        await network.provider.send("evm_increaseTime", [120])
        // Reach the goal
        await fakeToken.connect(buyer).approve(crowdsalesInstance.address, toBnPowed(10000))
        await crowdsalesInstance.connect(buyer).buyTokens(0, toBnPowed(10000))
    }

    describe('Crowdsale payments', () => {
        it('should accept payments', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(1))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
        })
    
        it('should reject payments on insufficient allowance', async () => {
            await network.provider.send("evm_increaseTime", [120])
            expect(
                crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            ).to.be.revertedWith('ERC20: insufficient allowance')
        })
    
        it('should return the correct current raised amount', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(1))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            expect(
                await crowdsalesInstance.getAmountOfTokensRaised(0)
            ).to.be.equals(toBnPowed(1))
        })
    
        it('should revert if the goal has been reached', async () => {
            await fakeToken.transfer(buyer1.address, toBnPowed(1))
            await buyAllTheShares(buyer2)
            await fakeToken.connect(buyer1).approve(crowdsalesInstance.address, toBnPowed(1))
            expect(
                crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            ).to.be.revertedWithCustomError(crowdsalesInstance, "GoalReached")
        })
    
        it('should revert if the closing time is before the opening time', async () => {
            const timestamp = Math.round((new Date()).getTime() / 1000)
            expect(
                crowdsalesInstance.listNewCrowdsale(
                    0, // token id
                    1, // rate
                    timestamp + 1200, // end time
                    timestamp + 60, // start time
                    toBnPowed(10000), // goal
                    owner.address, // beneficiary
                    fakeToken.address // approved token
                )
            ).to.be.revertedWithCustomError(crowdsalesInstance, "WrongOpeningTime")
        })
    
        it('should revert on contribution if the opening time is not yet reached', async () => {
            expect(
                crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            ).to.be.revertedWithCustomError(crowdsalesInstance, "NotOpenedCrowdsale")
        })
    
        it('should revert on contribution if the closing time has been reached', async () => {
            await network.provider.send("evm_increaseTime", [12000])
            await expect(
                crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            ).to.be.revertedWithCustomError(crowdsalesInstance, "ClosedCrowdsale")
        })
    
        it('should be able to get the user contributions', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(1))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(1))
            expect(await crowdsalesInstance.balanceOf(0, buyer2.address)).to.be.equals(toBnPowed(1))
        })
    })

    describe("Crowdsales refunds", () => {
        it('should refuse to refund the user if the goal has been reached', async () => {
            await buyAllTheShares(buyer2)
            await expect(
                crowdsalesInstance.connect(buyer2).claimRefund(0)
            ).to.be.revertedWithCustomError(crowdsalesInstance, "GoalReached")
        })

        it('should revert the refund if the user has not contributed', async () => {
            await network.provider.send("evm_increaseTime", [1200])
            expect(
                crowdsalesInstance.connect(buyer2).claimRefund(0)
            ).to.be.revertedWithCustomError(crowdsalesInstance, "NotOwningTokens")
        })

        it('should be able to refund the user if the goal has not been reached at the closing time', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(100))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(100))
            let raisedAmount = await crowdsalesInstance.getAmountOfTokensRaised(0)
            expect(raisedAmount).to.be.equals(toBnPowed(100))
            // Forward time to the closing time
            await network.provider.send("evm_increaseTime", [1200])
            const shares = await crowdsalesInstance.balanceOf(0, buyer2.address)
            expect(shares).to.be.equals(toBnPowed(100))
            await crowdsalesInstance.connect(buyer2).claimRefund(0)
            const balance = await fakeToken.balanceOf(buyer2.address)
            expect(balance).to.be.equals(toBnPowed(10000))
            raisedAmount = await crowdsalesInstance.getAmountOfTokensRaised(0)
            expect(raisedAmount).to.be.equals(0)
        })

        it('should refuse to refund the user if the goal has been reached but the user has not contributed', async () => {
            await network.provider.send("evm_increaseTime", [1200])
            const shares = await crowdsalesInstance.balanceOf(0, buyer2.address)
            expect(shares).to.be.equals(0)
            expect(crowdsalesInstance.connect(buyer2).claimRefund(0))
                .to.be.revertedWithCustomError(crowdsalesInstance, "NotOwningTokens")
        })

        it('should refuse to refund if the closing time has not been reached yet', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(100))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(100))
            let raisedAmount = await crowdsalesInstance.getAmountOfTokensRaised(0)
            expect(raisedAmount).to.be.equals(toBnPowed(100))
            // Forward time to before the closing time
            await network.provider.send("evm_increaseTime", [1000])
            const shares = await crowdsalesInstance.balanceOf(0, buyer2.address)
            expect(shares).to.be.equals(toBnPowed(100))
            expect(crowdsalesInstance.connect(buyer2).claimRefund(0))
                .to.be.revertedWithCustomError(crowdsalesInstance, "CrowdsaleHasntEnded")
            raisedAmount = await crowdsalesInstance.getAmountOfTokensRaised(0)
            expect(raisedAmount).to.be.equals(toBnPowed(100))
        })
    })

    describe('Crowdsales withdrawals', () => {
        it('should be able to redeem tokens', async () => {
            await buyAllTheShares(buyer2)
            // Forward time to before the closing time
            await network.provider.send("evm_increaseTime", [1200])
            const shares = await crowdsalesInstance.balanceOf(0, buyer2.address)
            expect(shares).to.be.equals(toBnPowed(10000))
            await crowdsalesInstance.connect(buyer2).withdrawTokens(0)
            const sharesAfterWithdraw = await crowdsalesInstance.balanceOf(0, buyer2.address)
            expect(sharesAfterWithdraw).to.be.equals(0)
            const balance = await fractifInstance.balanceOf(buyer2.address, 0)
            expect(balance).to.be.equals(toBnPowed(10000))
        })

        it('should revert the withdrawal if the user has not contributed', async () => {
            await network.provider.send("evm_increaseTime", [1200])
            expect(
                crowdsalesInstance.connect(buyer2).withdrawFunds(0)
            ).to.be.revertedWithCustomError(crowdsalesInstance, "NotOwningTokens")
        })
    
        it('shouldn\'t be possible to withdraw funds if the goal has not been reached', async () => {
            await network.provider.send("evm_increaseTime", [120])
            await fakeToken.connect(buyer2).approve(crowdsalesInstance.address, toBnPowed(100))
            await crowdsalesInstance.connect(buyer2).buyTokens(0, toBnPowed(100))
            // Forward time to before the closing time
            await network.provider.send("evm_increaseTime", [1200])
            expect(crowdsalesInstance.connect(owner).withdrawFunds(0))
                .to.be.revertedWithCustomError(crowdsalesInstance, "GoalNotReached")
        })
    
        it('should be able to transfer the gains to the beneficiary', async () => {
            let balanceBeforeCrowdsale = await fakeToken.balanceOf(owner.address)
            await buyAllTheShares(buyer2)
            // Forward time to before the closing time
            await network.provider.send("evm_increaseTime", [1200])
            await crowdsalesInstance.connect(owner).withdrawFunds(0)
            let balanceAfterCrowdsale = await fakeToken.balanceOf(owner.address)
            expect(balanceAfterCrowdsale).to.be.equals(balanceBeforeCrowdsale.add(toBnPowed(10000)))
        })
    })
})
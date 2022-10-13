import { ethers, upgrades } from 'hardhat'
import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { Marketplace, FractifV1 } from '../types/contracts'
import { genItemForSale, Item, toBnPowed } from './utils'
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { MarketplaceListingState } from '../utils/marketplace'

describe('Marketplace', () => {

    let marketplaceInstance: Marketplace
    let fractifInstance: FractifV1
    let item: Item
    let owner: SignerWithAddress, buyer1: SignerWithAddress, buyer2: SignerWithAddress, buyer3: SignerWithAddress, buyer4: SignerWithAddress;


    beforeEach(async () => {
        [owner, buyer1, buyer2, buyer3, buyer4] = await ethers.getSigners();
        const FractifV1 = await ethers.getContractFactory('FractifV1')
        fractifInstance = await upgrades.deployProxy(FractifV1) as FractifV1
        const address = '0x0000'
        const Marketplace = await ethers.getContractFactory('Marketplace')
        marketplaceInstance = await upgrades.deployProxy(Marketplace, [fractifInstance.address]) as Marketplace
        item = genItemForSale(0)
        // Mint 10000 tokens as the owner, the only one who can mint at this stage
        await fractifInstance.mint(owner.address, 0, 10000, "0x00")
        // Distribute tokens to different buyers
        await fractifInstance.safeTransferFrom(owner.address, buyer1.address, item.id, 2000, "0x00")
        await fractifInstance.safeTransferFrom(owner.address, buyer2.address, item.id, 3000, "0x00")
        await fractifInstance.safeTransferFrom(owner.address, buyer3.address, item.id, 5000, "0x00")
    })

    describe('Marketplace listing', () => {
        const listItem = async () => {
            await fractifInstance.connect(buyer1).setApprovalForAll(marketplaceInstance.address, true)
            await marketplaceInstance.connect(buyer1).createListing(item.id, BigNumber.from(1), 10)
            const listing = await marketplaceInstance.listings(0)
            expect(listing.seller).to.equal(buyer1.address)
            expect(listing.tokenId).to.equal(item.id)
            expect(listing.price).to.equal(BigNumber.from(1))
            expect(listing.amount).to.equal(10)
            expect(listing.state).to.equal(MarketplaceListingState.Active)
            expect(await fractifInstance.balanceOf(buyer1.address, item.id)).to.equal(2000 - 10)
        }
        
        const deactivateListing = async () => {
            await marketplaceInstance.connect(buyer1).deactivateListing(0)
            const listing = await marketplaceInstance.listings(0)
            expect(listing.state).to.equal(MarketplaceListingState.Deactivated)
        }

        it('should be able to list a new item', async () => {
            await listItem()
        })
        
        it('should be able to deactivate a listing', async () => {
            await listItem()
            await deactivateListing()
        })

        it('should be able to buy a listing', async () => {
            await listItem()
            let listing = await marketplaceInstance.listings(0)
            const price = listing.price.mul(listing.amount)
            await marketplaceInstance.connect(buyer2).buyListing(0, { value: price })
            expect(await fractifInstance.balanceOf(buyer2.address, item.id)).to.equal(3000 + 10)
            listing = await marketplaceInstance.listings(0)
            expect(listing.state).to.equal(MarketplaceListingState.Sold)
        })

        it('should be able to reactivate a listing', async () => {})

        it('should fail to list an item that is not owned by the seller', async () => {
            fractifInstance.connect(buyer4).setApprovalForAll(marketplaceInstance.address, true)
            await expect(marketplaceInstance.connect(buyer4).createListing(item.id, BigNumber.from(1), 10)).to.be.reverted
        })

        it('should fail to deactivate a listing that is not owned by the seller', async () => {})

        it('should fail to reactivate a listing that is not owned by the seller', async () => {})

        it('should fail to buy a listing that is not active', async () => {
            await listItem()
            await deactivateListing()
            const listing = await marketplaceInstance.listings(0)
            const price = listing.price.mul(listing.amount)
            await expect(marketplaceInstance.connect(buyer2).buyListing(0, { value: price })).to.be.reverted;
        })

        it('should fail to buy a listing at a price lower than the listing price', async () => {})
    })
})
import { ethers, upgrades } from 'hardhat'
import { expect } from 'chai'
import { BigNumber } from 'ethers'
import { Marketplace, FractifV1 } from '@typechain-types/contracts'
import { genItemForSale, Item, toBnPowed } from './utils'
import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers'

enum MarketplaceListingState {
    Active = 0,
    Sold = 1,
    Deactivated = 2
}

describe('Marketplace', () => {
	let marketplaceInstance: Marketplace;
	let fractifInstance: FractifV1;
	let item: Item;
	let owner: SignerWithAddress,
		seller: SignerWithAddress,
		buyer2: SignerWithAddress,
		buyer3: SignerWithAddress,
		buyer4: SignerWithAddress;
	let seller1InitialItemBalance: number,
		buyer2InitialItemBalance: number,
		buyer3InitialItemBalance: number;
	let platformFeePercent: number;

	beforeEach(async () => {
		[owner, seller, buyer2, buyer3, buyer4] = await ethers.getSigners();
		const FractifV1 = await ethers.getContractFactory('FractifV1');
		fractifInstance = (await upgrades.deployProxy(FractifV1)) as FractifV1;
		const address = '0x0000';
		const Marketplace = await ethers.getContractFactory('Marketplace');
		marketplaceInstance = (await upgrades.deployProxy(Marketplace, [
			fractifInstance.address
		])) as Marketplace;
		item = genItemForSale(0);
		// Mint 10000 tokens as the owner, the only one who can mint at this stage
		await fractifInstance.mint(owner.address, 0, 10000, '0x00');
		// Distribute tokens to different buyers
		seller1InitialItemBalance = 2000;
		buyer2InitialItemBalance = 3000;
		buyer3InitialItemBalance = 2000;

		await fractifInstance.safeTransferFrom(
			owner.address,
			seller.address,
			item.id,
			seller1InitialItemBalance,
			'0x00'
		);
		await fractifInstance.safeTransferFrom(
			owner.address,
			buyer2.address,
			item.id,
			buyer2InitialItemBalance,
			'0x00'
		);
		await fractifInstance.safeTransferFrom(
			owner.address,
			buyer3.address,
			item.id,
			buyer3InitialItemBalance,
			'0x00'
		);
	});

	describe('Marketplace listing', () => {
		const listItem = async () => {
			await fractifInstance
				.connect(seller)
				.setApprovalForAll(marketplaceInstance.address, true);
			//Create listing of 10 tokens with a price of 1 ETH per token
			await marketplaceInstance
				.connect(seller)
				.createListing(item.id, BigNumber.from(toBnPowed(1)), 10);
			const listing = await marketplaceInstance.listings(0);
			expect(listing.seller).to.equal(seller.address);
			expect(listing.tokenId).to.equal(item.id);
			expect(listing.price).to.equal(BigNumber.from(toBnPowed(1)));
			expect(listing.amount).to.equal(10);
			expect(listing.state).to.equal(MarketplaceListingState.Active);
			expect(
				await fractifInstance.balanceOf(seller.address, item.id)
			).to.equal(seller1InitialItemBalance - 10);
		};

		const deactivateListing = async () => {
			await marketplaceInstance.connect(seller).deactivateListing(0);
			const listing = await marketplaceInstance.listings(0);
			expect(listing.state).to.equal(MarketplaceListingState.Deactivated);
		};

		const reactivateListing = async () => {
			await marketplaceInstance.connect(seller).reactivateListing(0);
			const listing = await marketplaceInstance.listings(0);
			expect(listing.state).to.equal(MarketplaceListingState.Active);
		};

		it('should be able to list a new item', async () => {
			await listItem();
		});

		it('should be able to deactivate a listing', async () => {
			await listItem();
			await deactivateListing();
		});

		it('should be able to buy a listing', async () => {
			await listItem();
			let listing = await marketplaceInstance.listings(0);
			const price = listing.price.mul(listing.amount);
			await marketplaceInstance
				.connect(buyer2)
				.buyListing(0, { value: price });
				expect(await fractifInstance.balanceOf(buyer2.address, item.id))
				.to.equal(buyer2InitialItemBalance + 10);
			listing = await marketplaceInstance.listings(0);
			expect(listing.state).to.equal(MarketplaceListingState.Sold);
		});

		it('should keep fees', async () => {
			await listItem();
			let listing = await marketplaceInstance.listings(0);
			const price = listing.price.mul(listing.amount);
			const platformFee = price.mul(20).div(100);
			await marketplaceInstance
				.connect(buyer2)
				.buyListing(0, { value: price });
				expect(await fractifInstance.balanceOf(buyer2.address, item.id))
				.to.equal(buyer2InitialItemBalance + 10);
			listing = await marketplaceInstance.listings(0);
			expect(listing.state).to.equal(MarketplaceListingState.Sold);
			expect(await ethers.provider.getBalance(marketplaceInstance.address)).to.equal(platformFee);
		});

		it('seller should receive funds minus fees', async () => {
			await listItem();
			let balanceSellerPostListing = await seller.getBalance();
			let listing = await marketplaceInstance.listings(0);
			const price = listing.price.mul(listing.amount);
			await marketplaceInstance
				.connect(buyer2)
				.buyListing(0, { value: price });
				expect(await fractifInstance.balanceOf(buyer2.address, item.id))
				.to.equal(buyer2InitialItemBalance + 10);
			listing = await marketplaceInstance.listings(0);
			expect(listing.state).to.equal(MarketplaceListingState.Sold);
			
			//Calculate fee took by the smartcontract
			const platformFee = price.mul(20).div(100);
			expect(await seller.getBalance()).to.equal(balanceSellerPostListing.add(price.sub(platformFee)));
		});

		it('should be able to reactivate a listing', async () => {
			await listItem();
			await deactivateListing();
			await reactivateListing();
		});

		it('should fail to deactivate a listing that is not owned by the seller', async () => {
			await listItem();
			await expect(
				marketplaceInstance.connect(buyer2).deactivateListing(0)
			).to.be.revertedWithCustomError(
				marketplaceInstance,
				'Unauthorized'
			);
		});

		it('should fail to list an item that is not owned by the seller', async () => {
			await fractifInstance
				.connect(buyer4)
				.setApprovalForAll(marketplaceInstance.address, true);
			await expect(
				marketplaceInstance
					.connect(buyer4)
					.createListing(item.id, BigNumber.from(1), 10)
			).to.be.revertedWith(
				'ERC1155: insufficient balance for transfer'
			);
		});

		it('should fail to deactivate a listing that is not owned by the seller', async () => {
			await listItem();
			await expect(
				marketplaceInstance.connect(buyer4).deactivateListing(0)
			).to.be.revertedWithCustomError(
				marketplaceInstance,
				'Unauthorized'
			);
		});

		it('should fail to reactivate a listing that is not owned by the seller', async () => {
			await listItem();
			await deactivateListing();
			await expect(
				marketplaceInstance.connect(buyer2).reactivateListing(0)
			).to.be.revertedWithCustomError(
				marketplaceInstance,
				'Unauthorized'
			);
		});

		it('should fail to buy a listing that is not active', async () => {
			await listItem();
			await deactivateListing();
			const listing = await marketplaceInstance.listings(0);
			const price = listing.price.mul(listing.amount);
			await expect(
				marketplaceInstance
					.connect(buyer2)
					.buyListing(0, { value: price })
			).to.be.revertedWithCustomError(
				marketplaceInstance,
				'ListingNotActive'
			);
		});

		it('should fail to buy a listing at a price lower than the listing price', async () => {
			await listItem();
			const listing = await marketplaceInstance.listings(0);
			const price = listing.price.mul(listing.amount).sub(1);
			await expect(
				marketplaceInstance
					.connect(buyer2)
					.buyListing(0, { value: price })
			).to.be.revertedWithCustomError(
				marketplaceInstance,
				'InsufficientAmount'
			);
		});
	});
});

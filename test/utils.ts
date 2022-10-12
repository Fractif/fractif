import { BigNumber } from "ethers"
import { ethers } from "hardhat";

export const decimals: BigNumber = BigNumber.from(18);
export const decimalPowed: BigNumber = BigNumber.from(10).pow(decimals);

/**
 * Returns a BigNumber powed by 10^decimals
 */
export const toBnPowed = (value: number | string) => BigNumber.from(value).mul(decimalPowed);

export type Item = {
    id: number,
    name: string,
    price: BigNumber,
    quantity: number,
    sellout: {
        ether: string,
        fakeErc20: string
    }
}

export const genItemForSale = (id: number): Item => {
    return {
        id,
        name: `My great bag #${id}`,
        price: toBnPowed(100),
        quantity: 10000,
        sellout: {
            ether: ethers.utils.parseEther("1").toString(),
            fakeErc20: toBnPowed(1000).toString()
        } 
    }
}
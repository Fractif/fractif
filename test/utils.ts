import { BigNumber, utils } from "ethers"
import { ethers } from "hardhat";
import { FakeERC20, FractifV1 } from "@typesDir/contracts";
import { expect } from "chai"

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

export const genItemForSale = (id: number, quantity?: number): Item => {
    return {
        id,
        name: `My great bag #${id}`,
        price: toBnPowed(100),
        quantity: quantity ? quantity : 10000,
        sellout: {
            ether: ethers.utils.parseEther("1").toString(),
            fakeErc20: toBnPowed(1000).toString()
        } 
    }
}

/**
 * 
 * @param amount of tokens
 * @param account that allows the contract to spend the amount of tokens
 */
 export const allowFractifToSpendFakeToken = async (
    fakeToken: FakeERC20, 
    fractifInstance: FractifV1,
    amount: string | number | BigNumber, 
    account: string
) => {
    await fakeToken.approve(fractifInstance.address, amount, { from: account });
    const allowance = await fakeToken.allowance(account, fractifInstance.address);
    expect(allowance, `FractifV1 should be allowed to spend '${amount}' 'fake-tokens' of account 0`)
        .to.equal(amount);
}

export const getInterfaceID = (contractInterface: utils.Interface) => {
    let interfaceID = ethers.constants.Zero;
    const functions: string[] = Object.keys(contractInterface.functions);
    for (let i = 0; i < functions.length; i++) {
        interfaceID = interfaceID.xor(contractInterface.getSighash(functions[i]));
    }
    return interfaceID;
}  
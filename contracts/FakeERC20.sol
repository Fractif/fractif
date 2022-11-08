// SPDX-License-Identifier: BUSL-1.1
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract FakeERC20 is ERC20 {
    constructor(
    ) ERC20("Fake", "FAK") {
        _mint(msg.sender, 100000 * 10 ** 18);
    }
}
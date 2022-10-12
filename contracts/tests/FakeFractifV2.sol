// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FakeFractifV2 is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable
{
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant APPROVER_ROLE = keccak256("APPROVER_ROLE");
    bytes32 public constant SELLOUT_SETTER_ROLE = keccak256("SELLOUT_SETTER_ROLE");
    bytes32 public constant NEW_SETTER_ROLE = keccak256("NEW_SETTER_ROLE");


    mapping(uint256 => uint256) public tokenInitialSupply;
    mapping(uint256 => uint256) public tokenSelloutPrice;
    mapping(uint256 => address) public tokenDepositedCoin;
    mapping(address => bool) approvedCoins;
    uint256 public burnedTokens;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC1155_init("https://fractif.com/api/metadata/{id}.json");
        __ERC1155Burnable_init();
        __ERC1155Supply_init();
        approvedCoins[address(0x00)] = true;
    }

    error InsufficientBalance(uint balance, uint refundAmount);
    error CoinNotApproved();
    error NotApproved();
    error NotRedeemable();
    error AlreadyDeclaredSold();

    function getNbOfBurnedTokens() public view returns (uint256) {
        return burnedTokens;
    }

    /**
     * @notice Checks if a coin is whitelisted.
     * @param coin The address of the coin to check.
     * @return True if the coin is whitelisted, false otherwise.
     */
    function isApprovedCoin(address coin) public view returns (bool) {
        return approvedCoins[coin];
    }

    /**
     * @notice Whitelists a coin.
     * @param _coin The address of the coin to whitelist.
     */
    function addCoin(address _coin) public {
        approvedCoins[_coin] = true;
    }

    /**
     * @notice Removes a coin from the whitelist.
     * @param _coin The address of the coin to remove.
     */
    function removeCoin(address _coin) public {
        approvedCoins[_coin] = false;
    }

    function getSelloutPrice(uint256 tokenId) public view returns (uint256) {
        return tokenSelloutPrice[tokenId];
    }

    function getDepositedCoin(uint256 tokenId) public view returns (address) {
        return tokenDepositedCoin[tokenId];
    }

    function getInitialSupply(uint256 tokenId) public view returns (uint256) {
        return tokenInitialSupply[tokenId];
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        tokenInitialSupply[id] = amount;
        tokenSelloutPrice[id] = 0;
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155Upgradeable, ERC1155SupplyUpgradeable) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
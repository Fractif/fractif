// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/// @custom:security-contact anthony@fractif.com
contract FractifV1 is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable
{
    /**
     * @notice The role that can set the URI.
     */
    bytes32 public constant URI_SETTER_ROLE = keccak256("URI_SETTER_ROLE");
    /**
     * @notice The role that allows minting new tokens.
     * @dev The role should be granted to the `Crowdsales` contract and to allowed minters like the owner.
     */
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    /**
     * @notice The role that allows approving coins.
     * @dev The role should be granted to the `Governance` contract and to the owner.
     */
    bytes32 public constant APPROVER_ROLE = keccak256("APPROVER_ROLE");
    /**
     * @notice The role that allows setting the sellout price.
     * @dev The role should be granted to the `Governance` contract and to the owner.
     */
    bytes32 public constant SELLOUT_SETTER_ROLE = keccak256("SELLOUT_SETTER_ROLE");

    /**
     * @notice Tokens Initial Supply on minting
     */
    mapping(uint256 => uint256) public tokenInitialSupply;
    /**
     * @notice Price at which the item tied to each token should sold.
     * @dev The used currency can be found at `tokenDepositedCoin`. It is initialize to 0 for all tokens.
     */
    mapping(uint256 => uint256) public tokenSelloutPrice;
    /**
     * @notice Address of the ERC20 coin that is used to pay-back tokens holders.
     * @dev It also supports ether under the address 0x00.
     */
    mapping(uint256 => address) public tokenDepositedCoin;
    /**
     * @notice Whitelisted coins that can be used as pay-back tokens.
     * @dev Initialized with ether under the address 0x00.
     */
    mapping(address => bool) approvedCoins;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() initializer public {
        __ERC1155_init("https://fractif.com/api/metadata/{id}.json");
        __ERC1155Burnable_init();
        __ERC1155Supply_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(APPROVER_ROLE, msg.sender);
        _grantRole(SELLOUT_SETTER_ROLE, msg.sender);

        approvedCoins[address(0x00)] = true;
    }

    error InsufficientBalance(uint balance, uint refundAmount);
    error CoinNotApproved();
    error NotApproved();
    error NotRedeemable();
    error AlreadyDeclaredSold();

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
    function addCoin(address _coin) public onlyRole(APPROVER_ROLE) {
        approvedCoins[_coin] = true;
    }

    /**
     * @notice Removes a coin from the whitelist.
     * @param _coin The address of the coin to remove.
     */
    function removeCoin(address _coin) public onlyRole(APPROVER_ROLE) {
        approvedCoins[_coin] = false;
    }

    function getSelloutPrice(uint256 tokenId) public view returns (uint256) {
        return tokenSelloutPrice[tokenId];
    }

    function setSelloutPrice(
        uint256 tokenId,
        uint256 selloutPrice,
        address depositedCoin
    ) public payable onlyRole(SELLOUT_SETTER_ROLE) returns (bool) {
        if (tokenSelloutPrice[tokenId] > 0) {
            revert AlreadyDeclaredSold(); // "The item tied to this token has already been sold"
        }
        if (!isApprovedCoin(depositedCoin)) {
            revert CoinNotApproved(); // "The deposited coin is not approved"
        }
        if (depositedCoin == address(0x00)) {
            require(
                msg.value >= selloutPrice,
                "The amount of ETH sent should be greater than or equal to the sellout price"
            );
        } else {
            IERC20(depositedCoin).transferFrom(
                msg.sender,
                address(this),
                selloutPrice
            );
        }
        tokenSelloutPrice[tokenId] = selloutPrice;
        tokenDepositedCoin[tokenId] = depositedCoin;
        return true;
    }

    function getDepositedCoin(uint256 tokenId) public view returns (address) {
        return tokenDepositedCoin[tokenId];
    }

    function getInitialSupply(uint256 tokenId) public view returns (uint256) {
        return tokenInitialSupply[tokenId];
    }

    function getRefundAmount(uint256 tokenId, uint256 burnAmount)
        public
        view
        returns (uint256)
    {
        return
            (uint(burnAmount) * uint(tokenSelloutPrice[tokenId])) /
            uint(tokenInitialSupply[tokenId]); // dividing the burnAmount by the initialSupply would result in an error, so we're changing the order of the operations
    }

    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    function burn(
        address account,
        uint256 tokenId,
        uint256 amount
    ) public override {
        if (
            account != _msgSender() && !isApprovedForAll(account, _msgSender())
        ) {
            revert NotApproved();
        }

        if (tokenSelloutPrice[tokenId] <= 0) {
            revert NotRedeemable(); // "The item tied to this token has not been sold yet"
        }
        _burn(account, tokenId, amount);
        // After burning the tokens, we send the corresponding amount of the deposited coin to the caller, avoiding a reentrancy attack.
        uint256 refundAmount = 0;
        refundAmount = getRefundAmount(tokenId, amount);
        // TODO: calculate compensation amount for the burn if the caller isn't the rewarded address, e.g, the caller gives the owner the approval to burn the tokens once the sellout price is set.
        // ether
        if (tokenDepositedCoin[tokenId] == address(0x00)) {
            if (address(this).balance < refundAmount) {
                // TODO: add coverage
                revert InsufficientBalance({
                    balance: address(this).balance,
                    refundAmount: refundAmount
                });
            } else {
                address(account).call{value: refundAmount}("");
            }
        }
        // ERC20
        else {
            uint256 balance = IERC20(tokenDepositedCoin[tokenId]).balanceOf(
                address(this)
            );
            if (balance < refundAmount) {
                revert InsufficientBalance({
                    balance: balance,
                    refundAmount: refundAmount
                });
            } else {
                IERC20(tokenDepositedCoin[tokenId]).transfer(
                    account,
                    refundAmount
                );
            }
        }
    }

    function burnBatch(
        address account,
        uint256[] memory ids,
        uint256[] memory amounts
    ) public override {
        revert(); // TODO: implement this
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
        // TODO: Implement fees
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
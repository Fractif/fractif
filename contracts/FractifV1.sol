// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/ERC1155Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/extensions/ERC1155SupplyUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./ERC2981.sol";

/// @custom:security-contact anthony@fractif.com
contract FractifV1 is
    Initializable,
    ERC1155Upgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable,
    ERC1155BurnableUpgradeable,
    ERC1155SupplyUpgradeable,
    ERC2981
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
    bytes32 public constant SELLOUT_SETTER_ROLE =
        keccak256("SELLOUT_SETTER_ROLE");

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
     * @notice When was the last time the sellout price was updated for a sale
     */
    mapping(uint256 => uint256) public tokenPreviousSaleTimestamp;
    /**
     * @notice Item tied to the token has been sold.
     */
    mapping(uint256 => bool) public sold;
    /**
     * @notice Whitelisted coins that can be used as pay-back tokens.
     * @dev Initialized with ether under the address 0x00.
     */
    mapping(address => bool) approvedCoins;
    /**
     * @notice Delay before the sellout price can be updated again. 
     * This period is used to prevent price manipulation while the item tied to the token is still on sale.
     */
    uint256 public selloutPriceUpdateDelay;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC1155_init("https://fractif.com/api/metadata/{id}.json");
        __ERC1155Burnable_init();
        __ERC1155Supply_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(URI_SETTER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);
        _grantRole(APPROVER_ROLE, msg.sender);
        _grantRole(SELLOUT_SETTER_ROLE, msg.sender);

        approvedCoins[address(0x00)] = true;
        selloutPriceUpdateDelay = 7 days;
    }

    /**
     * @notice Contract does not possess enough funds to pay-back token holders.
     */
    error InsufficientBalance(uint balance, uint refundAmount);
    /**
     * @notice The coin used to pay-back token holders is not approved.
     */
    error CoinNotApproved();
    /**
     * @notice Sender is not allowed to complete the operation.
     */
    error NotApproved();
    /**
     * @notice The pay-back isn't reedemable yet.
     */
    error NotRedeemable();
    /**
     * @notice The token has already been set as sold.
     */
    error AlreadyDeclaredSold();
    /**
     * @notice When two arrays are not the same length.
     */
    error LengthNotMatching(uint length1, uint length2);
    /**
     * @notice The sellout price is not set.
     */
    error SelloutPriceNotSet();
    /**
     * @notice The sellout price can't be updated yet.
     */
    error SelloutPriceUpdateDelayNotReached(uint256 untilTimestamp);

    /**
     * @notice emmited when a token has been sold
     */
    event Sold(uint256 tokenId);
    /**
     * @notice emmited when a token has its sellout price updated
     */
    event SelloutPriceUpdated(uint256 tokenId,  uint256 selloutPrice, address depositedCoin);

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

    /**
     * @notice Get the deposited coin address used to pay-back token holders of a specific tokenId.
     * @param tokenId The id of the token to get the deposited coin of.
     */
    function getDepositedCoin(uint256 tokenId) public view returns (address) {
        return tokenDepositedCoin[tokenId];
    }

    /**
     * @notice Get the initial supply of a token.
     * @param tokenId The id of the token to get the initial supply of.
     */
    function getInitialSupply(uint256 tokenId) public view returns (uint256) {
        return tokenInitialSupply[tokenId];
    }

    /**
     * @notice Set the internal uri of the contract.
     */
    function setURI(string memory newuri) public onlyRole(URI_SETTER_ROLE) {
        _setURI(newuri);
    }

    /**
     * @notice Get the sellout price of a token.
     */
    function getSelloutPrice(uint256 tokenId) public view returns (uint256) {
        return tokenSelloutPrice[tokenId];
    }

    /**
     * @notice Sets the sellout price of a token. Note that this function has a delay (`selloutPriceUpdateDelay`) to prevent price manipulation.
     * @dev This function can only be called by the `SELLOUT_SETTER_ROLE` which is most likely a governor instance.
     * @param tokenId The id of the token to set the sellout price of.
     * @param selloutPrice The price at which the item tied to the token should be sold.
     * @param depositedCoin The address of the ERC20 coin that is used to pay-back tokens holders.
     */
    function setSelloutPrice(
        uint256 tokenId,
        uint256 selloutPrice,
        address depositedCoin
    ) public onlyRole(SELLOUT_SETTER_ROLE) returns (bool) {
        if (sold[tokenId]) {
            revert AlreadyDeclaredSold(); // "The item tied to this token has already been sold"
        }
        // Sellout price is undefined
        if (tokenSelloutPrice[tokenId] == 0) {
            tokenSelloutPrice[tokenId] = selloutPrice;
            tokenDepositedCoin[tokenId] = depositedCoin;
            tokenPreviousSaleTimestamp[tokenId] = block.timestamp;
        } else if (
            // Current timestamp is greater than the previous sale timestamp + the delay
            block.timestamp > tokenPreviousSaleTimestamp[tokenId] + selloutPriceUpdateDelay
        ) {
            tokenSelloutPrice[tokenId] = selloutPrice; // most likely changing to 0 to reset the sellout price
            tokenDepositedCoin[tokenId] = depositedCoin;
            tokenPreviousSaleTimestamp[tokenId] = block.timestamp;
        } else {
            revert SelloutPriceUpdateDelayNotReached(
                tokenPreviousSaleTimestamp[tokenId] + selloutPriceUpdateDelay
            ); // "The sellout price can't be updated yet"
        }
        emit SelloutPriceUpdated(tokenId, selloutPrice, depositedCoin);
        return true;
    }

    /**
     * @notice Deposits the sellout price of a token in the contract.
     * @param tokenId The id of the token to deposit the sellout price of.
     */
    function deposit(uint256 tokenId) public payable {
        if (tokenSelloutPrice[tokenId] == 0) {
            revert SelloutPriceNotSet(); // "The sellout price of this token has not been set yet"
        }
        if (sold[tokenId]) {
            revert AlreadyDeclaredSold(); // "The item tied to this token has already been sold"
        }

        uint256 selloutPrice = tokenSelloutPrice[tokenId];
        address depositedCoin = tokenDepositedCoin[tokenId];

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
        sold[tokenId] = true;
        emit Sold(tokenId);
    }

    /**
     * @notice Get the refund amount of a token for a specific amount of to-be-burned tokens.
     * @param tokenId The id of the token to get the refund amount of.
     * @param burnAmount The amount of tokens the sender want to burn.
     */
    function getRefundAmount(uint256 tokenId, uint256 burnAmount)
        public
        view
        returns (uint256)
    {
        return
            (uint(burnAmount) * uint(tokenSelloutPrice[tokenId])) /
            uint(tokenInitialSupply[tokenId]); // dividing the burnAmount by the initialSupply would result in an error, so we're changing the order of the operations
    }

    /**
     * @notice Burns a specific amount of tokens and pays-back the sender, according to the sellout price.
     * @param account The address of the account to burn tokens from.
     * @param tokenId The id of the token to burn.
     * @param amount The amount of tokens to burn.
     */
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
            revert NotRedeemable(); // "The sellout price has not been defined yet"
        }

        if (sold[tokenId] == false) {
            revert NotRedeemable(); // "The item tied to this token has not been sold"
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

    /**
     * @notice Mint a specific amount of tokens to a specific address.
     * @dev This function is only callable by the minter role, which is an approved operator able to list an item on the marketplace.
     * @param account The address of the account to mint tokens to.
     * @param id The id of the token to mint.
     * @param amount The amount of tokens to mint.
     * @param data The data to pass to the receiver.
     */
    function mint(
        address account,
        uint256 id,
        uint256 amount,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        tokenInitialSupply[id] = amount;
        tokenSelloutPrice[id] = 0;
        tokenPreviousSaleTimestamp[id] = 0;
        sold[id] = false;
        _mint(account, id, amount, data);
    }

    function mintBatch(
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) public onlyRole(MINTER_ROLE) {
        if (ids.length != amounts.length) {
            revert LengthNotMatching(ids.length, amounts.length);
        }
        for (uint i = 0; i < ids.length; i++) {
            tokenInitialSupply[ids[i]] = amounts[i];
            tokenSelloutPrice[ids[i]] = 0;
            tokenPreviousSaleTimestamp[ids[i]] = 0;
            sold[ids[i]] = false;
        }
        _mintBatch(to, ids, amounts, data);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    )
        internal
        override(ERC1155Upgradeable, ERC1155SupplyUpgradeable)
        whenNotPaused
    {
        // TODO: Implement fees
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    /// @notice Allows to set the royalties on the contract
    /// @param recipient the royalties recipient
    /// @param value royalties value (between 0 and 10000)
    function setRoyalties(address recipient, uint256 value)
        public
        onlyRole(DEFAULT_ADMIN_ROLE)
    {
        _setRoyalties(recipient, value);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC1155Upgradeable, AccessControlUpgradeable, ERC2981Base)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}

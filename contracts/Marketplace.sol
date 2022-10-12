// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.9;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155HolderUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC1155/utils/ERC1155ReceiverUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";

contract Marketplace is 
    Initializable, 
    ERC1155HolderUpgradeable,
    AccessControlUpgradeable,
    PausableUpgradeable
{
    using Counters for Counters.Counter;

    /**
     * @notice A listing on the marketplace
     */
    struct Listing {
        /**
         * @notice The Listing ID
         */
        uint256 id;
        /**
         * @notice The token ID
         */
        uint256 tokenId;
        /**
         * @notice Asked price per token
         */
        uint256 price;
        /**
         * @notice The seller
         */
        uint256 amount;
        /**
         * @notice The address of the seller
         */
        address seller;
        /**
         * @notice Sold
         */
        bool sold;
        /**
         * @notice Active
         */
        bool active;
    }

    /**
     * @notice Counter of the listings
     */
    Counters.Counter private listingCounter;
    /**
     * @notice Address of the Fractif ERC1155 contract
     */
    address private fractifApp;
    /**
     * @notice The listings
     */
    mapping(uint256 => Listing) public listings;

    /**
     * @notice Error triggered whenever the price is <= 0
     */
    error WrongPrice();
    /**
     * @notice Error triggered whenever the token id is <= 0
     */
    error WrongTokenId();
    /**
     * @notice Error triggered whenever the amount is <= 0
     */
    error WrongAmount();
    /**
     * @notice Unauthorized error
     */
    error Unauthorized();

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(address _fractifApp) initializer public {
        __ERC1155Holder_init();
        __ERC1155Receiver_init();
        __AccessControl_init();
        __Pausable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);

        fractifApp = _fractifApp;
    }

    /**
     * @notice Create a new listing
     * @param _tokenId The token ID
     * @param _price The price per token
     * @param _amount The amount of tokens
     */
    function createListing(uint256 _tokenId, uint256 _price, uint256 _amount) public {
        if (_price <= 0) {
            revert WrongPrice();
        }
        if (_tokenId <= 0) {
            revert WrongTokenId();
        }
        if (_amount <= 0) {
            revert WrongAmount();
        }

        // First of all we need to transfer the tokens to the marketplace
        IERC1155(fractifApp).safeTransferFrom(msg.sender, address(this), _tokenId, _amount, "");

        // Then we create our listing
        listingCounter.increment();
        uint256 listingId = listingCounter.current();

        listings[listingId] = Listing({
            id: listingId,
            tokenId: _tokenId,
            price: _price,
            seller: msg.sender,
            sold: false,
            amount: _amount,
            active: true
        });

        // TODO: Emit listing created event
    }

    /**
     * @notice Deactivate a listing
     */
    function deactivateListing(uint256 _listingId) public {
        if (listings[_listingId].seller != msg.sender) {
            revert Unauthorized();
        }

        // First of all we need to transfer the tokens back to the seller
        IERC1155(fractifApp).safeTransferFrom(
            address(this), 
            msg.sender, 
            listings[_listingId].tokenId, 
            listings[_listingId].amount, 
            ""
        );

        // Then we remove the listing
        listings[_listingId].active = false;

        // TODO: Emit listing deactivated event
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(AccessControlUpgradeable, ERC1155ReceiverUpgradeable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
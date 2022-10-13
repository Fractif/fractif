// SPDX-License-Identifier: BUSL-1.1
pragma solidity ^0.8.4;

import "./FractifV1.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/access/OwnableUpgradeable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

/**
 * @title Crowdsales for Fractif tokens
 * @author @azerpas
 * @notice This contract is used to manage the crowdsales of Fractif tokens. It is an adaptation of the OpenZeppelin Crowdsale contract for the ERC1155 standard.
 * @dev Only the owner of the contract can list new crowdsales
 */
contract Crowdsales is Initializable, OwnableUpgradeable {
    /**
     * @notice Fractif smart contract address.
     */
    FractifV1 public fractif;
    /**
     * @notice Rate conversion in wei per token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#Crowdsale
     */
    mapping(uint256 => uint256) private rates;
    /**
     * @notice Amount of wei raised in the crowdsale per token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#Crowdsale
     */
    mapping(uint256 => uint256) private tokensRaised;
    /**
     * @notice Opening time of the crowdsale per token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#TimedCrowdsale
     */
    mapping(uint256 => uint256) private openingTimes;
    /**
     * @notice Closing time of the crowdsale per token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#TimedCrowdsale
     */
    mapping(uint256 => uint256) private closingTimes;
    /**
     * @notice Goal amount in wei of the crowdsale per token
     */
    mapping(uint256 => uint256) private goals;
    /**
     * @notice Wallet beneficiary of the crowdsale per token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#Crowdsale
     */
    mapping(uint256 => address) private wallets;
    /**
     * @notice Approved tokens (ERC20 addresses) for the crowdsale per token, e.g DAI, USDC, USDT, etc.
     */
    mapping(uint256 => address) private approvedCoins;
    /**
     * @notice Balance of each user for each token
     * @dev Inspired by https://docs.openzeppelin.com/contracts/2.x/api/crowdsale#PostDeliveryCrowdsale
     */
    mapping(uint256 => mapping(address => uint256)) private _balances;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    /**
     * @notice Initialize the Crowdsales contract
     * @param _fractif Fractif smart contract address
     */
    function initialize(address _fractif) public initializer {
        __Ownable_init();
        fractif = FractifV1(_fractif);
    }

    error WrongTokenId();
    error WrongRate();
    error WrongOpeningTime();
    error WrongClosingTime();
    error WrongGoal();
    error WrongAmount();
    error WrongWallet();
    error WrongDepositedCoin();
    error CrowdsaleHasntEnded();
    error ClosedCrowdsale();
    error NotOpenedCrowdsale();
    error GoalReached();
    error GoalNotReached();
    error NotOwningTokens();

    modifier onlyWhileOpen(uint256 tokenId) {
        if (block.timestamp < openingTimes[tokenId]) {
            revert NotOpenedCrowdsale();
        }
        if (block.timestamp >= closingTimes[tokenId]) {
            revert ClosedCrowdsale();
        }
        _;
    }

    function setFractif(address _fractif) public onlyOwner {
        fractif = FractifV1(_fractif);
    }

    function getRate(uint256 tokenId) public view returns (uint256) {
        return rates[tokenId];
    }

    function getAmountOfTokensRaised(uint256 tokenId) public view returns (uint256) {
        return tokensRaised[tokenId];
    }

    function getOpeningTime(uint256 tokenId) public view returns (uint256) {
        return openingTimes[tokenId];
    }

    function getClosingTime(uint256 tokenId) public view returns (uint256) {
        return closingTimes[tokenId];
    }

    function getGoal(uint256 tokenId) public view returns (uint256) {
        return goals[tokenId];
    }

    /**
     * @notice List a new token for crowdsale
     * @param tokenId The token ID from Fractif smart contract
     * @param rate The rate conversion between wei and the token
     * @param openingTime The opening time of the crowdsale
     * @param closingTime The closing time of the crowdsale
     * @param goal The goal of the crowdsale in wei
     * @param approvedCoin The approved coin (ERC20) address
     */
    function listNewCrowdsale(
        uint256 tokenId,
        uint256 rate,
        uint256 openingTime,
        uint256 closingTime,
        uint256 goal,
        address wallet,
        address approvedCoin
    ) public onlyOwner {
        if (
            tokenId < 0 || 
            fractif.exists(tokenId) == false
        ) {
            revert WrongTokenId();
        }
        if (rate <= 0) {
            revert WrongRate();
        }
        if (openingTime >= closingTime || openingTime < block.timestamp) {
            revert WrongOpeningTime();
        }
        if (closingTime < block.timestamp) {
            revert WrongClosingTime();
        }
        if (goal == 0) {
            revert WrongGoal();
        }
        if (wallet == address(0)) {
            revert WrongWallet();
        }

        rates[tokenId] = rate;
        openingTimes[tokenId] = openingTime;
        closingTimes[tokenId] = closingTime;
        goals[tokenId] = goal;
        tokensRaised[tokenId] = 0;
        approvedCoins[tokenId] = approvedCoin;
        wallets[tokenId] = wallet;
    }

    /**
     * @notice Buy tokens from a crowdsale
     * Requirements:
     * - The user must approve the smart-contract to spend some of his ERC20 tokens
     * @param tokenId The token ID from Fractif smart contract
     * @param amount The amount of wei to buy tokens
     * @dev TODO: convert buying process to ERC20 tokens only
     */
    function buyTokens(uint256 tokenId, uint256 amount)
        external
        payable
        onlyWhileOpen(tokenId)
    {
        if (block.timestamp < openingTimes[tokenId]) {
            revert NotOpenedCrowdsale();
        }

        if (block.timestamp >= closingTimes[tokenId]) {
            revert ClosedCrowdsale();
        }
        
        // Check if the goal has already been reached
        if (tokensRaised[tokenId] >= goals[tokenId]) {
            revert GoalReached();
        }
        uint256 tokens = _getAmountToRedeem(tokenId, amount);

        // Check if the amount of tokens to buy added to the number of tokens raised is greater than the goal
        if (
            tokens <= 0 || 
            tokens + tokensRaised[tokenId] > goals[tokenId]
        ) {
            revert WrongAmount();
        }
        _processPurchase(msg.sender, tokenId, tokens);
    }

    /**
     * @notice Withdraw the tokens
     * @param tokenId The token ID from Fractif smart contract
     */
    function withdrawTokens(uint256 tokenId) external {
        if (tokensRaised[tokenId] < goals[tokenId]) {
            revert GoalNotReached();
        }
        // Canno't claim refund if the crowdsale is still open
        _hasCrowdsaleEnded(tokenId);

        _deliverTokens(msg.sender, tokenId);
    }

    /**
     * @notice Claim a refund
     * Requirements:
     * - The crowdsale must have ended
     * - The message sender must `setApprovalForAll` to this contract
     */
    function claimRefund(uint256 tokenId) external {
        // Canno't claim refund if the crowdsale has ended successfully
        if (tokensRaised[tokenId] >= goals[tokenId]) {
            revert GoalReached();
        }
        // Canno't claim refund if the crowdsale is still open
        _hasCrowdsaleEnded(tokenId);

        // Shares possessed by the sender
        uint256 shares = balanceOf(tokenId, msg.sender);
        if (shares <= 0) {
            revert NotOwningTokens();
        }
        // Amount of ERC20 to refund
        uint256 amount = _getAmountToRefund(tokenId, shares);

        tokensRaised[tokenId] -= amount;

        IERC20 coin = IERC20(approvedCoins[tokenId]);
        coin.transfer(msg.sender, amount);
    }

    /**
     * @notice Withdraw the funds
     */
    function withdrawFunds(uint256 tokenId) external onlyOwner {
        // Canno't withdraw funds if the crowdsale hasn't met the goal
        if (tokensRaised[tokenId] < goals[tokenId]) {
            revert GoalNotReached();
        }

        IERC20 coin = IERC20(approvedCoins[tokenId]);
        coin.transfer(wallets[tokenId], tokensRaised[tokenId]);
    }

    /**
     * @notice Get the amount of tokens to be redeemed
     */
    function _getAmountToRedeem(uint256 _tokenId, uint256 _amount) internal view returns (uint256) {
        return _amount * rates[_tokenId];
    }

    /**
     * @notice Get the amount of tokens to refund
     */
    function _getAmountToRefund(uint256 _tokenId, uint256 _amount) internal view returns (uint256) {
        return _amount / rates[_tokenId];
    }

    /**
     * @notice User balance of a crowdsale token
     */
    function balanceOf(uint256 _tokenId, address _user) public view returns (uint256) {
        return _balances[_tokenId][_user];
    }

    /** 
     * @notice Process the purchase by updating the user balance
     */
    function _processPurchase(address _recipient, uint256 _tokenId, uint256 _amount) internal {
        IERC20(approvedCoins[_tokenId]).transferFrom(
                _recipient,
                address(this),
                _amount
        );
        _balances[_tokenId][_recipient] = _balances[_tokenId][_recipient] + _amount;
        tokensRaised[_tokenId] += _amount;
    }

    /**
     * @notice Deliver the tokens to the user
     */
    function _deliverTokens(address _recipient, uint256 _tokenId) internal {
        uint256 amount = balanceOf(_tokenId, _recipient);
        if (amount == 0) {
            revert NotOwningTokens();
        }
        _balances[_tokenId][_recipient] = 0;
        fractif.mint(_recipient, _tokenId, amount, "");
    }

    function _hasCrowdsaleEnded(uint256 _tokenId) internal view {
        if (block.timestamp < closingTimes[_tokenId]) {
            revert CrowdsaleHasntEnded();
        }
    }
}
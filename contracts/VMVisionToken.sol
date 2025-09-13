// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Burnable.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Pausable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title VMVisionTokeny
 * @dev VM Vision's utility token with staking and governance features
 * @author VM Vision Team
 */
contract VMVisionToken is
    ERC20,
    ERC20Burnable,
    ERC20Pausable,
    Ownable,
    ReentrancyGuard
{
    // Token configuration
    uint256 public constant MAX_SUPPLY = 100_000_000 * 10 ** 18; // 100 million tokens
    uint256 public constant INITIAL_SUPPLY = 10_000_000 * 10 ** 18; // 10 million tokens

    // Staking configuration
    struct StakeInfo {
        uint256 amount;
        uint256 timestamp;
        uint256 lockPeriod;
        uint256 rewardRate;
    }

    mapping(address => StakeInfo[]) public stakes;
    mapping(address => uint256) public totalStaked;

    uint256 public constant MIN_STAKE_AMOUNT = 1000 * 10 ** 18; // 1000 tokens
    uint256 public constant MAX_STAKE_PERIOD = 365 days; // 1 year
    uint256 public constant MIN_STAKE_PERIOD = 30 days; // 30 days

    // Reward rates (basis points: 100 = 1%)
    uint256 public constant REWARD_RATE_30_DAYS = 500; // 5%
    uint256 public constant REWARD_RATE_90_DAYS = 1500; // 15%
    uint256 public constant REWARD_RATE_180_DAYS = 3000; // 30%
    uint256 public constant REWARD_RATE_365_DAYS = 6000; // 60%

    // Events
    event TokensStaked(
        address indexed user,
        uint256 amount,
        uint256 lockPeriod,
        uint256 stakeIndex
    );
    event TokensUnstaked(
        address indexed user,
        uint256 amount,
        uint256 reward,
        uint256 stakeIndex
    );
    event RewardClaimed(address indexed user, uint256 amount);
    event TokensMinted(address indexed to, uint256 amount);
    event TokensBurned(address indexed from, uint256 amount);

    constructor() ERC20("VM Vision Token", "VMV") {
        _mint(msg.sender, INITIAL_SUPPLY);
    }

    /**
     * @dev Stake tokens for a specified period
     * @param amount Amount of tokens to stake
     * @param lockPeriod Lock period in seconds
     */
    function stake(
        uint256 amount,
        uint256 lockPeriod
    ) external nonReentrant whenNotPaused {
        require(amount >= MIN_STAKE_AMOUNT, "Amount below minimum stake");
        require(
            lockPeriod >= MIN_STAKE_PERIOD && lockPeriod <= MAX_STAKE_PERIOD,
            "Invalid lock period"
        );
        require(balanceOf(msg.sender) >= amount, "Insufficient balance");

        // Calculate reward rate based on lock period
        uint256 rewardRate = _calculateRewardRate(lockPeriod);

        // Transfer tokens to contract
        _transfer(msg.sender, address(this), amount);

        // Create stake record
        stakes[msg.sender].push(
            StakeInfo({
                amount: amount,
                timestamp: block.timestamp,
                lockPeriod: lockPeriod,
                rewardRate: rewardRate
            })
        );

        totalStaked[msg.sender] += amount;

        emit TokensStaked(
            msg.sender,
            amount,
            lockPeriod,
            stakes[msg.sender].length - 1
        );
    }

    /**
     * @dev Unstake tokens after lock period
     * @param stakeIndex Index of the stake to unstake
     */
    function unstake(uint256 stakeIndex) external nonReentrant {
        require(stakeIndex < stakes[msg.sender].length, "Invalid stake index");

        StakeInfo storage stakeInfo = stakes[msg.sender][stakeIndex];
        require(
            block.timestamp >= stakeInfo.timestamp + stakeInfo.lockPeriod,
            "Stake still locked"
        );
        require(stakeInfo.amount > 0, "Already unstaked");

        uint256 stakedAmount = stakeInfo.amount;
        uint256 reward = _calculateReward(stakeInfo);

        // Clear the stake
        stakeInfo.amount = 0;
        totalStaked[msg.sender] -= stakedAmount;

        // Transfer staked tokens and rewards
        _transfer(address(this), msg.sender, stakedAmount);
        if (reward > 0) {
            _mint(msg.sender, reward);
        }

        emit TokensUnstaked(msg.sender, stakedAmount, reward, stakeIndex);
    }

    /**
     * @dev Calculate reward for a stake
     * @param stakeInfo Stake information
     * @return reward Calculated reward
     */
    function _calculateReward(
        StakeInfo memory stakeInfo
    ) internal view returns (uint256) {
        if (stakeInfo.amount == 0) return 0;

        uint256 stakingDuration = block.timestamp - stakeInfo.timestamp;
        uint256 actualDuration = stakingDuration > stakeInfo.lockPeriod
            ? stakeInfo.lockPeriod
            : stakingDuration;

        return
            (stakeInfo.amount * stakeInfo.rewardRate * actualDuration) /
            (365 days * 10000);
    }

    /**
     * @dev Calculate reward rate based on lock period
     * @param lockPeriod Lock period in seconds
     * @return rewardRate Reward rate in basis points
     */
    function _calculateRewardRate(
        uint256 lockPeriod
    ) internal pure returns (uint256) {
        if (lockPeriod >= 365 days) return REWARD_RATE_365_DAYS;
        if (lockPeriod >= 180 days) return REWARD_RATE_180_DAYS;
        if (lockPeriod >= 90 days) return REWARD_RATE_90_DAYS;
        return REWARD_RATE_30_DAYS;
    }

    /**
     * @dev Get user's stake information
     * @param user User address
     * @return stakeCount Number of stakes
     * @return totalStakedAmount Total staked amount
     * @return totalRewards Total pending rewards
     */
    function getUserStakeInfo(
        address user
    )
        external
        view
        returns (
            uint256 stakeCount,
            uint256 totalStakedAmount,
            uint256 totalRewards
        )
    {
        stakeCount = stakes[user].length;
        totalStakedAmount = totalStaked[user];

        for (uint256 i = 0; i < stakeCount; i++) {
            if (stakes[user][i].amount > 0) {
                totalRewards += _calculateReward(stakes[user][i]);
            }
        }
    }

    /**
     * @dev Mint new tokens (only owner)
     * @param to Address to mint tokens to
     * @param amount Amount to mint
     */
    function mint(address to, uint256 amount) external onlyOwner {
        require(totalSupply() + amount <= MAX_SUPPLY, "Exceeds max supply");
        _mint(to, amount);
        emit TokensMinted(to, amount);
    }

    /**
     * @dev Burn tokens from caller
     * @param amount Amount to burn
     */
    function burn(uint256 amount) public override {
        super.burn(amount);
        emit TokensBurned(msg.sender, amount);
    }

    /**
     * @dev Pause contract (only owner)
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract (only owner)
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Override required by Solidity
     */
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 amount
    ) internal override(ERC20, ERC20Pausable) {
        super._beforeTokenTransfer(from, to, amount);
    }
}

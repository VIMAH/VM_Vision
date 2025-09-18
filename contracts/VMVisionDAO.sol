// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/governance/Governor.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorSettings.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorCountingSimple.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotes.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorVotesQuorumFraction.sol";
import "@openzeppelin/contracts/governance/extensions/GovernorTimelockControl.sol";
import "@openzeppelin/contracts/governance/TimelockController.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Votes.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

/**
 * @title VMVisionDAO
 * @dev Decentralized Autonomous Organization for VM Vision
 * @author VM Vision Team
 */
contract VMVisionDAO is
    Governor,
    GovernorSettings,
    GovernorCountingSimple,
    GovernorVotes,
    GovernorVotesQuorumFraction,
    GovernorTimelockControl
{
    // Proposal categories
    enum ProposalCategory {
        GENERAL,
        TREASURY,
        TECHNICAL,
        COMMUNITY,
        PARTNERSHIP
    }

    // Proposal structure
    struct ProposalDetails {
        ProposalCategory category;
        string description;
        string externalLink;
        uint256 requestedAmount;
        address recipient;
    }

    mapping(uint256 => ProposalDetails) public proposalDetails;

    // Treasury management
    uint256 public treasuryBalance;
    uint256 public maxTreasuryWithdrawal = 10000 ether; // Max withdrawal per proposal

    // Events
    event ProposalCreated(
        uint256 proposalId,
        ProposalCategory category,
        string description,
        uint256 requestedAmount
    );
    event TreasuryDeposit(address indexed depositor, uint256 amount);
    event TreasuryWithdrawal(address indexed recipient, uint256 amount);
    event MaxWithdrawalUpdated(uint256 newMax);

    constructor(
        ERC20Votes _token,
        TimelockController _timelock,
        uint256 _quorumPercentage
    )
        Governor("VM Vision DAO")
        GovernorSettings(
            1, // voting delay (1 block)
            50400, // voting period (1 week)
            0 // proposal threshold (0 tokens)
        )
        GovernorVotes(_token)
        GovernorVotesQuorumFraction(_quorumPercentage)
        GovernorTimelockControl(_timelock)
    {}

    /**
     * @dev Create a new proposal with additional details
     * @param targets Array of target addresses
     * @param values Array of ETH values
     * @param calldatas Array of calldata
     * @param description Proposal description
     * @param category Proposal category
     * @param externalLink External link for more details
     * @param requestedAmount Amount requested from treasury (if applicable)
     * @param recipient Recipient address (if applicable)
     */
    function proposeWithDetails(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description,
        ProposalCategory category,
        string memory externalLink,
        uint256 requestedAmount,
        address recipient
    ) public returns (uint256) {
        uint256 proposalId = propose(targets, values, calldatas, description);

        proposalDetails[proposalId] = ProposalDetails({
            category: category,
            description: description,
            externalLink: externalLink,
            requestedAmount: requestedAmount,
            recipient: recipient
        });

        emit ProposalCreated(
            proposalId,
            category,
            description,
            requestedAmount
        );

        return proposalId;
    }

    /**
     * @dev Create a treasury withdrawal proposal
     * @param recipient Address to receive funds
     * @param amount Amount to withdraw
     * @param description Description of the withdrawal
     * @param externalLink External link for more details
     */
    function proposeTreasuryWithdrawal(
        address recipient,
        uint256 amount,
        string memory description,
        string memory externalLink
    ) external returns (uint256) {
        require(
            amount <= maxTreasuryWithdrawal,
            "Amount exceeds max withdrawal"
        );
        require(amount <= treasuryBalance, "Insufficient treasury balance");

        address[] memory targets = new address[](1);
        targets[0] = address(this);

        uint256[] memory values = new uint256[](1);
        values[0] = 0;

        bytes[] memory calldatas = new bytes[](1);
        calldatas[0] = abi.encodeWithSignature(
            "executeTreasuryWithdrawal(address,uint256)",
            recipient,
            amount
        );

        return
            proposeWithDetails(
                targets,
                values,
                calldatas,
                description,
                ProposalCategory.TREASURY,
                externalLink,
                amount,
                recipient
            );
    }

    /**
     * @dev Execute treasury withdrawal (called by timelock)
     * @param recipient Address to receive funds
     * @param amount Amount to withdraw
     */
    function executeTreasuryWithdrawal(
        address recipient,
        uint256 amount
    ) external {
        require(msg.sender == address(timelock()), "Only timelock can execute");
        require(amount <= treasuryBalance, "Insufficient treasury balance");

        treasuryBalance -= amount;

        (bool success, ) = payable(recipient).call{value: amount}("");
        require(success, "Transfer failed");

        emit TreasuryWithdrawal(recipient, amount);
    }

    /**
     * @dev Deposit funds to treasury
     */
    function depositToTreasury() external payable {
        require(msg.value > 0, "No funds sent");
        treasuryBalance += msg.value;
        emit TreasuryDeposit(msg.sender, msg.value);
    }

    /**
     * @dev Set maximum treasury withdrawal per proposal
     * @param newMax New maximum withdrawal amount
     */
    function setMaxTreasuryWithdrawal(uint256 newMax) external onlyGovernance {
        maxTreasuryWithdrawal = newMax;
        emit MaxWithdrawalUpdated(newMax);
    }

    /**
     * @dev Get proposal details
     * @param proposalId Proposal ID
     */
    function getProposalDetails(
        uint256 proposalId
    ) external view returns (ProposalDetails memory) {
        return proposalDetails[proposalId];
    }

    /**
     * @dev Get treasury information
     */
    function getTreasuryInfo()
        external
        view
        returns (
            uint256 balance,
            uint256 maxWithdrawal,
            uint256 availableForWithdrawal
        )
    {
        balance = treasuryBalance;
        maxWithdrawal = maxTreasuryWithdrawal;
        availableForWithdrawal = treasuryBalance < maxTreasuryWithdrawal
            ? treasuryBalance
            : maxTreasuryWithdrawal;
    }

    /**
     * @dev Get voting power for an address
     * @param account Address to check
     */
    function getVotingPower(address account) external view returns (uint256) {
        return getVotes(account, block.number - 1);
    }

    /**
     * @dev Get proposal state with additional info
     * @param proposalId Proposal ID
     */
    function getProposalState(
        uint256 proposalId
    )
        external
        view
        returns (
            uint8 proposalState,
            uint256 forVotes,
            uint256 againstVotes,
            uint256 abstainVotes,
            uint256 totalVotes
        )
    {
        (
            uint256 _forVotes,
            uint256 _againstVotes,
            uint256 _abstainVotes
        ) = proposalVotes(proposalId);
        proposalState = uint8(state(proposalId));
        forVotes = _forVotes;
        againstVotes = _againstVotes;
        abstainVotes = _abstainVotes;
        totalVotes = forVotes + againstVotes + abstainVotes;
    }

    // Override required functions
    function votingDelay()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingDelay();
    }

    function votingPeriod()
        public
        view
        override(IGovernor, GovernorSettings)
        returns (uint256)
    {
        return super.votingPeriod();
    }

    function quorum(
        uint256 blockNumber
    )
        public
        view
        override(IGovernor, GovernorVotesQuorumFraction)
        returns (uint256)
    {
        return super.quorum(blockNumber);
    }

    function state(
        uint256 proposalId
    )
        public
        view
        override(Governor, GovernorTimelockControl)
        returns (ProposalState)
    {
        return super.state(proposalId);
    }

    function propose(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        string memory description
    ) public override(Governor, IGovernor) returns (uint256) {
        return super.propose(targets, values, calldatas, description);
    }

    function proposalThreshold()
        public
        view
        override(Governor, GovernorSettings)
        returns (uint256)
    {
        return super.proposalThreshold();
    }

    function _execute(
        uint256 proposalId,
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) {
        super._execute(proposalId, targets, values, calldatas, descriptionHash);
    }

    function _cancel(
        address[] memory targets,
        uint256[] memory values,
        bytes[] memory calldatas,
        bytes32 descriptionHash
    ) internal override(Governor, GovernorTimelockControl) returns (uint256) {
        return super._cancel(targets, values, calldatas, descriptionHash);
    }

    function _executor()
        internal
        view
        override(Governor, GovernorTimelockControl)
        returns (address)
    {
        return super._executor();
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(Governor, GovernorTimelockControl) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}

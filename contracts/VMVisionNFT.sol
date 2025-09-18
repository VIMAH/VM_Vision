// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Burnable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title VMVisionNFT
 * @dev VM Vision's NFT collection with utility features
 * @author VM Vision Team
 */
contract VMVisionNFT is
    ERC721,
    ERC721Enumerable,
    ERC721URIStorage,
    ERC721Burnable,
    Ownable,
    ReentrancyGuard,
    Pausable
{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    // NFT Configuration
    uint256 public constant MAX_SUPPLY = 10000;
    uint256 public constant MAX_MINT_PER_TX = 5;
    uint256 public constant MAX_MINT_PER_WALLET = 20;

    // Pricing
    uint256 public mintPrice = 0.05 ether;
    uint256 public whitelistPrice = 0.03 ether;

    // Minting phases
    enum MintPhase {
        CLOSED,
        WHITELIST,
        PUBLIC
    }

    MintPhase public currentPhase = MintPhase.CLOSED;

    // Whitelist
    mapping(address => bool) public whitelist;
    mapping(address => uint256) public whitelistMinted;
    uint256 public constant MAX_WHITELIST_MINT = 3;

    // Public mint tracking
    mapping(address => uint256) public publicMinted;

    // Base URI
    string private _baseTokenURI;

    // Royalties
    address public royaltyRecipient;
    uint256 public royaltyPercentage = 500; // 5% (in basis points)

    // Events
    event MintPhaseChanged(MintPhase newPhase);
    event WhitelistUpdated(address indexed user, bool status);
    event MintPriceUpdated(uint256 newPrice);
    event RoyaltyUpdated(address recipient, uint256 percentage);
    event NFTMinted(address indexed to, uint256 tokenId, uint256 price);

    constructor(
        string memory name,
        string memory symbol,
        string memory baseURI,
        address _royaltyRecipient
    ) ERC721(name, symbol) {
        _baseTokenURI = baseURI;
        royaltyRecipient = _royaltyRecipient;
    }

    /**
     * @dev Mint NFTs during whitelist phase
     * @param amount Number of NFTs to mint
     */
    function whitelistMint(
        uint256 amount
    ) external payable nonReentrant whenNotPaused {
        require(
            currentPhase == MintPhase.WHITELIST,
            "Whitelist phase not active"
        );
        require(whitelist[msg.sender], "Not whitelisted");
        require(amount > 0 && amount <= MAX_MINT_PER_TX, "Invalid amount");
        require(
            whitelistMinted[msg.sender] + amount <= MAX_WHITELIST_MINT,
            "Exceeds whitelist limit"
        );
        require(msg.value >= whitelistPrice * amount, "Insufficient payment");
        require(
            _tokenIdCounter.current() + amount <= MAX_SUPPLY,
            "Exceeds max supply"
        );

        whitelistMinted[msg.sender] += amount;

        for (uint256 i = 0; i < amount; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }

        emit NFTMinted(
            msg.sender,
            _tokenIdCounter.current() - amount,
            whitelistPrice * amount
        );
    }

    /**
     * @dev Mint NFTs during public phase
     * @param amount Number of NFTs to mint
     */
    function publicMint(
        uint256 amount
    ) external payable nonReentrant whenNotPaused {
        require(currentPhase == MintPhase.PUBLIC, "Public phase not active");
        require(amount > 0 && amount <= MAX_MINT_PER_TX, "Invalid amount");
        require(
            publicMinted[msg.sender] + amount <= MAX_MINT_PER_WALLET,
            "Exceeds wallet limit"
        );
        require(msg.value >= mintPrice * amount, "Insufficient payment");
        require(
            _tokenIdCounter.current() + amount <= MAX_SUPPLY,
            "Exceeds max supply"
        );

        publicMinted[msg.sender] += amount;

        for (uint256 i = 0; i < amount; i++) {
            _safeMint(msg.sender, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }

        emit NFTMinted(
            msg.sender,
            _tokenIdCounter.current() - amount,
            mintPrice * amount
        );
    }

    /**
     * @dev Owner mint (for team, giveaways, etc.)
     * @param to Address to mint to
     * @param amount Number of NFTs to mint
     */
    function ownerMint(address to, uint256 amount) external onlyOwner {
        require(
            _tokenIdCounter.current() + amount <= MAX_SUPPLY,
            "Exceeds max supply"
        );

        for (uint256 i = 0; i < amount; i++) {
            _safeMint(to, _tokenIdCounter.current());
            _tokenIdCounter.increment();
        }
    }

    /**
     * @dev Set minting phase
     * @param phase New minting phase
     */
    function setMintPhase(MintPhase phase) external onlyOwner {
        currentPhase = phase;
        emit MintPhaseChanged(phase);
    }

    /**
     * @dev Add/remove addresses from whitelist
     * @param addresses Array of addresses
     * @param status Status to set
     */
    function updateWhitelist(
        address[] calldata addresses,
        bool status
    ) external onlyOwner {
        for (uint256 i = 0; i < addresses.length; i++) {
            whitelist[addresses[i]] = status;
            emit WhitelistUpdated(addresses[i], status);
        }
    }

    /**
     * @dev Set mint price
     * @param newPrice New mint price
     */
    function setMintPrice(uint256 newPrice) external onlyOwner {
        mintPrice = newPrice;
        emit MintPriceUpdated(newPrice);
    }

    /**
     * @dev Set whitelist price
     * @param newPrice New whitelist price
     */
    function setWhitelistPrice(uint256 newPrice) external onlyOwner {
        whitelistPrice = newPrice;
    }

    /**
     * @dev Set base URI
     * @param newBaseURI New base URI
     */
    function setBaseURI(string memory newBaseURI) external onlyOwner {
        _baseTokenURI = newBaseURI;
    }

    /**
     * @dev Set royalty recipient and percentage
     * @param recipient Royalty recipient
     * @param percentage Royalty percentage (in basis points)
     */
    function setRoyalty(
        address recipient,
        uint256 percentage
    ) external onlyOwner {
        require(percentage <= 1000, "Royalty too high"); // Max 10%
        royaltyRecipient = recipient;
        royaltyPercentage = percentage;
        emit RoyaltyUpdated(recipient, percentage);
    }

    /**
     * @dev Withdraw contract balance
     */
    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");

        (bool success, ) = payable(owner()).call{value: balance}("");
        require(success, "Withdrawal failed");
    }

    /**
     * @dev Pause contract
     */
    function pause() external onlyOwner {
        _pause();
    }

    /**
     * @dev Unpause contract
     */
    function unpause() external onlyOwner {
        _unpause();
    }

    /**
     * @dev Get total supply
     */
    function totalSupply() public view override returns (uint256) {
        return _tokenIdCounter.current();
    }

    /**
     * @dev Get remaining supply
     */
    function remainingSupply() public view returns (uint256) {
        return MAX_SUPPLY - _tokenIdCounter.current();
    }

    /**
     * @dev Check if address is whitelisted
     */
    function isWhitelisted(address user) public view returns (bool) {
        return whitelist[user];
    }

    /**
     * @dev Get minting info for an address
     */
    function getMintInfo(
        address user
    )
        public
        view
        returns (
            bool isWhitelist,
            uint256 whitelistMintedCount,
            uint256 publicMintedCount,
            uint256 totalMinted
        )
    {
        isWhitelist = whitelist[user];
        whitelistMintedCount = whitelistMinted[user];
        publicMintedCount = publicMinted[user];
        totalMinted = whitelistMintedCount + publicMintedCount;
    }

    // Override required functions
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId,
        uint256 batchSize
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId, batchSize);
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function _baseURI() internal view override returns (string memory) {
        return _baseTokenURI;
    }

    // EIP-2981 Royalty Standard
    function royaltyInfo(
        uint256,
        uint256 salePrice
    ) external view returns (address, uint256) {
        return (royaltyRecipient, (salePrice * royaltyPercentage) / 10000);
    }
}

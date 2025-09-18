import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import {
    FaWallet,
    FaCoins,
    FaChartLine,
    FaEthereum,
    FaShieldAlt,
    FaRocket,
    FaSync,
    FaExternalLinkAlt
} from 'react-icons/fa';
import './Web3Dashboard.css';

const Web3Dashboard = () => {
    const { account, isConnected, provider } = useWeb3();
    const [walletData, setWalletData] = useState(null);
    const [nftData, setNftData] = useState(null);
    const [defiData, setDefiData] = useState(null);
    const [gasData, setGasData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchWalletData = async () => {
        if (!account || !provider) return;

        setLoading(true);
        setError(null);

        try {
            // Fetch wallet balance
            const balanceResponse = await fetch(`/api/blockchain/balance/${account}`);
            const balanceData = await balanceResponse.json();

            // Fetch NFT portfolio
            const nftResponse = await fetch(`/api/nft/portfolio/${account}`);
            const nftPortfolio = await nftResponse.json();

            // Fetch DeFi portfolio
            const defiResponse = await fetch(`/api/defi/portfolio/${account}`);
            const defiPortfolio = await defiResponse.json();

            // Fetch gas prices
            const gasResponse = await fetch('/api/blockchain/gas');
            const gasPrices = await gasResponse.json();

            setWalletData(balanceData);
            setNftData(nftPortfolio);
            setDefiData(defiPortfolio);
            setGasData(gasPrices);

        } catch (err) {
            setError('Failed to fetch wallet data. Please check your connection and try again.');
            console.error('Error fetching wallet data:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (isConnected && account) {
            fetchWalletData();
        }
    }, [isConnected, account, fetchWalletData]);

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const formatValue = (value) => {
        return parseFloat(value).toFixed(4);
    };

    if (!isConnected) {
        return (
            <div className="web3-dashboard">
                <div className="dashboard-placeholder">
                    <FaWallet className="placeholder-icon" />
                    <h3>Connect Your Wallet</h3>
                    <p>Connect your Web3 wallet to view your portfolio and blockchain data.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="web3-dashboard">
            <div className="dashboard-header">
                <div className="wallet-info">
                    <FaWallet className="wallet-icon" />
                    <div>
                        <h3>Wallet Dashboard</h3>
                        <p>{formatAddress(account)}</p>
                    </div>
                </div>
                <button
                    className="refresh-btn"
                    onClick={fetchWalletData}
                    disabled={loading}
                >
                    <FaSync className={loading ? 'spinning' : ''} />
                    Refresh
                </button>
            </div>

            {error && (
                <motion.div
                    className="error-message"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    {error}
                </motion.div>
            )}

            <div className="dashboard-grid">
                {/* Wallet Balance */}
                <motion.div
                    className="dashboard-card balance-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div className="card-header">
                        <FaEthereum className="card-icon" />
                        <h4>Wallet Balance</h4>
                    </div>
                    <div className="card-content">
                        {loading ? (
                            <div className="loading-skeleton">Loading...</div>
                        ) : walletData ? (
                            <>
                                <div className="balance-amount">
                                    {formatValue(walletData.balance)} ETH
                                </div>
                                <div className="balance-usd">
                                    ≈ ${(parseFloat(walletData.balance) * 2000).toFixed(2)} USD
                                </div>
                            </>
                        ) : (
                            <div className="no-data">No data available</div>
                        )}
                    </div>
                </motion.div>

                {/* NFT Portfolio */}
                <motion.div
                    className="dashboard-card nft-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="card-header">
                        <FaCoins className="card-icon" />
                        <h4>NFT Portfolio</h4>
                    </div>
                    <div className="card-content">
                        {loading ? (
                            <div className="loading-skeleton">Loading...</div>
                        ) : nftData ? (
                            <>
                                <div className="nft-count">
                                    {nftData.count} NFTs
                                </div>
                                <div className="nft-value">
                                    Total Value: {nftData.totalValue} ETH
                                </div>
                                <div className="nft-preview">
                                    {nftData.nfts.slice(0, 3).map((nft, index) => (
                                        <div key={index} className="nft-item">
                                            <img
                                                src={nft.image}
                                                alt={nft.name}
                                                className="nft-image"
                                                onError={(e) => {
                                                    e.target.src = 'https://via.placeholder.com/50x50/4f46e5/ffffff?text=NFT';
                                                }}
                                            />
                                        </div>
                                    ))}
                                </div>
                            </>
                        ) : (
                            <div className="no-data">No NFTs found</div>
                        )}
                    </div>
                </motion.div>

                {/* DeFi Portfolio */}
                <motion.div
                    className="dashboard-card defi-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="card-header">
                        <FaChartLine className="card-icon" />
                        <h4>DeFi Portfolio</h4>
                    </div>
                    <div className="card-content">
                        {loading ? (
                            <div className="loading-skeleton">Loading...</div>
                        ) : defiData ? (
                            <>
                                <div className="defi-tvl">
                                    TVL: ${defiData.totalValue}
                                </div>
                                <div className="defi-positions">
                                    {defiData.positions.length} Positions
                                </div>
                                <div className="defi-yield">
                                    Daily Yield: ${defiData.yield.daily}
                                </div>
                            </>
                        ) : (
                            <div className="no-data">No DeFi positions</div>
                        )}
                    </div>
                </motion.div>

                {/* Gas Prices */}
                <motion.div
                    className="dashboard-card gas-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <div className="card-header">
                        <FaRocket className="card-icon" />
                        <h4>Gas Prices</h4>
                    </div>
                    <div className="card-content">
                        {loading ? (
                            <div className="loading-skeleton">Loading...</div>
                        ) : gasData ? (
                            <>
                                <div className="gas-tier">
                                    <span className="gas-label">Slow:</span>
                                    <span className="gas-value">{gasData.slow.gwei} gwei</span>
                                </div>
                                <div className="gas-tier">
                                    <span className="gas-label">Standard:</span>
                                    <span className="gas-value">{gasData.standard.gwei} gwei</span>
                                </div>
                                <div className="gas-tier">
                                    <span className="gas-label">Fast:</span>
                                    <span className="gas-value">{gasData.fast.gwei} gwei</span>
                                </div>
                            </>
                        ) : (
                            <div className="no-data">No gas data</div>
                        )}
                    </div>
                </motion.div>

                {/* Security Status */}
                <motion.div
                    className="dashboard-card security-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className="card-header">
                        <FaShieldAlt className="card-icon" />
                        <h4>Security Status</h4>
                    </div>
                    <div className="card-content">
                        <div className="security-item">
                            <span className="security-label">Wallet Connected:</span>
                            <span className="security-status connected">Secure</span>
                        </div>
                        <div className="security-item">
                            <span className="security-label">Network:</span>
                            <span className="security-status">Ethereum Mainnet</span>
                        </div>
                        <div className="security-item">
                            <span className="security-label">Last Activity:</span>
                            <span className="security-status">Active</span>
                        </div>
                    </div>
                </motion.div>

                {/* Quick Actions */}
                <motion.div
                    className="dashboard-card actions-card"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                >
                    <div className="card-header">
                        <h4>Quick Actions</h4>
                    </div>
                    <div className="card-content">
                        <div className="action-buttons">
                            <button className="action-btn">
                                <FaExternalLinkAlt />
                                View on Etherscan
                            </button>
                            <button className="action-btn">
                                <FaCoins />
                                Trade NFTs
                            </button>
                            <button className="action-btn">
                                <FaChartLine />
                                DeFi Dashboard
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Web3Dashboard;

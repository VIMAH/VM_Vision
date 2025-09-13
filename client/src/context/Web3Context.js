import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
    const context = useContext(Web3Context);
    if (!context) {
        throw new Error('useWeb3 must be used within a Web3Provider');
    }
    return context;
};

export const Web3Provider = ({ children }) => {
    const [account, setAccount] = useState(null);
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [isConnected, setIsConnected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [chainId, setChainId] = useState(null);

    const connectWallet = async () => {
        try {
            setIsLoading(true);

            if (typeof window.ethereum !== 'undefined') {
                const accounts = await window.ethereum.request({
                    method: 'eth_requestAccounts',
                });

                if (accounts.length > 0) {
                    const provider = new ethers.BrowserProvider(window.ethereum);
                    const signer = await provider.getSigner();
                    const network = await provider.getNetwork();

                    setAccount(accounts[0]);
                    setProvider(provider);
                    setSigner(signer);
                    setIsConnected(true);
                    setChainId(network.chainId.toString());

                    // Listen for account changes
                    window.ethereum.on('accountsChanged', (accounts) => {
                        if (accounts.length > 0) {
                            setAccount(accounts[0]);
                        } else {
                            disconnectWallet();
                        }
                    });

                    // Listen for chain changes
                    window.ethereum.on('chainChanged', (chainId) => {
                        setChainId(chainId);
                        window.location.reload();
                    });
                }
            } else {
                alert('Please install MetaMask to use this application');
            }
        } catch (error) {
            console.error('Error connecting wallet:', error);
            alert('Failed to connect wallet');
        } finally {
            setIsLoading(false);
        }
    };

    const disconnectWallet = () => {
        setAccount(null);
        setProvider(null);
        setSigner(null);
        setIsConnected(false);
        setChainId(null);
    };

    const switchNetwork = async (chainId) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: `0x${chainId.toString(16)}` }],
            });
        } catch (error) {
            console.error('Error switching network:', error);
        }
    };

    const getBalance = async (address) => {
        if (provider && address) {
            try {
                const balance = await provider.getBalance(address);
                return ethers.formatEther(balance);
            } catch (error) {
                console.error('Error getting balance:', error);
                return '0';
            }
        }
        return '0';
    };

    useEffect(() => {
        // Check if wallet is already connected
        const checkConnection = async () => {
            if (typeof window.ethereum !== 'undefined') {
                try {
                    const accounts = await window.ethereum.request({
                        method: 'eth_accounts',
                    });

                    if (accounts.length > 0) {
                        const provider = new ethers.BrowserProvider(window.ethereum);
                        const signer = await provider.getSigner();
                        const network = await provider.getNetwork();

                        setAccount(accounts[0]);
                        setProvider(provider);
                        setSigner(signer);
                        setIsConnected(true);
                        setChainId(network.chainId.toString());
                    }
                } catch (error) {
                    console.error('Error checking connection:', error);
                }
            }
        };

        checkConnection();
    }, []);

    const value = {
        account,
        provider,
        signer,
        isConnected,
        isLoading,
        chainId,
        connectWallet,
        disconnectWallet,
        switchNetwork,
        getBalance,
    };

    return (
        <Web3Context.Provider value={value}>
            {children}
        </Web3Context.Provider>
    );
};

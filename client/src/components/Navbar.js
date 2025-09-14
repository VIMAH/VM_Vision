import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import { motion } from 'framer-motion';
import './Navbar.css';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const { isConnected, account, connectWallet, disconnectWallet, isLoading } = useWeb3();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const formatAddress = (address) => {
        if (!address) return '';
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    };

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/services', label: 'Services' },
        { path: '/projects', label: 'Projects' },
        { path: '/contact', label: 'Contact' },
    ];

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <span className="logo-text">VM Vision</span>
                    <span className="logo-subtitle">Van visie naar software</span>
                </Link>

                <div className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>

                <div className="nav-actions">
                    {/* Wallet connection functionality - commented out for future development
                    {isConnected ? (
                        <div className="wallet-info">
                            <span className="wallet-address">{formatAddress(account)}</span>
                            <button
                                className="btn-disconnect"
                                onClick={disconnectWallet}
                                title="Disconnect Wallet"
                            >
                                Disconnect
                            </button>
                        </div>
                    ) : (
                        <button
                            className="btn-connect"
                            onClick={connectWallet}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <span className="loading-spinner"></span>
                            ) : (
                                'Connect Wallet'
                            )}
                        </button>
                    )}
                    */}

                    <div
                        className={`hamburger ${isMenuOpen ? 'active' : ''}`}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;

import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import Web3Dashboard from '../components/Web3Dashboard';
import {
    FaRocket,
    FaShieldAlt,
    FaCogs,
    FaChartLine,
    FaEthereum,
    FaBitcoin,
    FaCoins,
    FaArrowRight
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const { isConnected, account } = useWeb3();

    const features = [
        {
            icon: FaRocket,
            title: 'Software Architectuur',
            description: 'Ontwerp schaalbare en betrouwbare software-architecturen die klaar zijn voor de toekomst.',
            color: '#4f46e5'
        },
        {
            icon: FaShieldAlt,
            title: 'Software Ontwikkeling',
            description: 'Bouw moderne en gebruiksvriendelijke applicaties die jouw visie omzetten in werkende oplossingen.',
            color: '#10b981'
        },
        {
            icon: FaCogs,
            title: 'Software Consultant',
            description: 'Krijg deskundig advies en begeleiding om de juiste technologische keuzes te maken.',
            color: '#f59e0b'
        },
        {
            icon: FaChartLine,
            title: 'Software/IT Strategie',
            description: 'Ontwikkel een heldere IT-strategie die aansluit bij de doelen en groei van jouw organisatie.',
            color: '#ef4444'
        },
        {
            icon: FaCogs,
            title: 'Digitale Identiteiten',
            description: 'Implementeer veilige en efficiënte oplossingen voor digitale identiteiten met ontwikkeling en integratie van wallets zoals de EUDI Wallet en NL Wallet.',
            color: '#f59e0b'
        },
        {
            icon: FaCogs,
            title: 'IAM Systemen',
            description: 'Beheer en beveilig toegangsrechten met correcte kennisgeving van Identity & Access Management systemen.',
            color: '#f59e0b'
        }
    ];

    const stats = [
        { label: 'Projecten afgerond', value: '5+', icon: FaRocket },
        { label: 'Codelines', value: '1 mln+', icon: FaCogs },
        { label: 'Tevreden klanten', value: '8+', icon: FaShieldAlt },
        { label: 'Jaren Ervaring', value: '3+', icon: FaChartLine }
    ];

    const cryptocurrencies = [
        { name: 'Ethereum', symbol: 'ETH', icon: FaEthereum, color: '#627eea' },
        { name: 'Bitcoin', symbol: 'BTC', icon: FaBitcoin, color: '#f7931a' },
        { name: 'Polygon', symbol: 'MATIC', icon: FaCoins, color: '#8247e5' },
        { name: 'BNB Chain', symbol: 'BNB', icon: FaCoins, color: '#f3ba2f' }
    ];

    return (
        <div className="home">
            {/* Hero Section */}
            <section className="hero">
                <div className="container">
                    <motion.div
                        className="hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="hero-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Welcome to the Future of
                            <span className="text-gradient"> Software Development</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            VM Vision is de betrouwbare partner in het ontwerpen, ontwikkelen en adviseren van moderne softwareoplossingen.                         </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/services" className="btn-primary">
                                Mijn services
                                <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Neem contact op
                            </Link>
                        </motion.div>

                        {isConnected && (
                            <motion.div
                                className="wallet-status"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <div className="wallet-indicator">
                                    <div className="wallet-dot"></div>
                                    <span>Wallet Connected: {account?.slice(0, 6)}...{account?.slice(-4)}</span>
                                </div>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                        <div className="crypto-grid">
                            {cryptocurrencies.map((crypto, index) => (
                                <motion.div
                                    key={crypto.symbol}
                                    className="crypto-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                >
                                    <crypto.icon style={{ color: crypto.color }} />
                                    <span>{crypto.symbol}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Features Section */}
            <section className="features section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        VM Vision
                    </motion.h2>

                    <div className="grid grid-2">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                className="card feature-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="feature-icon" style={{ color: feature.color }}>
                                    <feature.icon />
                                </div>
                                <h3>{feature.title}</h3>
                                <p>{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="stats section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Impact in nummers
                    </motion.h2>

                    <div className="grid grid-4">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="stat-card"
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div className="stat-icon">
                                    <stat.icon />
                                </div>
                                <div className="stat-value">{stat.value}</div>
                                <div className="stat-label">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Web3 Dashboard Section */}
            {isConnected && (
                <section className="dashboard section">
                    <div className="container">
                        <motion.h2
                            className="section-title"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            Your Web3 Dashboard
                        </motion.h2>
                        <Web3Dashboard />
                    </div>
                </section>
            )}

            {/* CTA Section */}
            <section className="cta section">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2>Van visie naar software</h2>
                        <p>
                            Bij VM Vision vertalen we ideeën naar innovatieve softwareoplossingen.
                            Samen maken we jouw visie werkelijkheid.
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn-primary">
                                Neem contact op
                                <FaArrowRight />
                            </Link>
                            <Link to="/projects" className="btn-secondary">
                                Bekijk projecten
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;

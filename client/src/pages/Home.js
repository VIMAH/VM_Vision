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
    FaArrowRight,
    FaCheckCircle,
    FaCode,
    FaSmile,
    FaClock,
    FaProjectDiagram,
    FaLaptopCode,
    FaUserTie,
    FaIdCard,
    FaKey
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const { isConnected, account } = useWeb3();

    const features = [
        {
            icon: FaProjectDiagram,
            title: 'Software Architectuur',
            description: 'Sterke fundamenten voor jouw digitale toekomst. Wij ontwerpen systemen die schaalbaar, stabiel en klaar voor groei zijn.',
            color: '#4f46e5'
        },
        {
            icon: FaLaptopCode,
            title: 'Software Ontwikkeling',
            description: 'Van idee tot applicatie. We bouwen moderne software die gebruiksvriendelijk is én waarde toevoegt.',
            color: '#10b981'
        },
        {
            icon: FaUserTie,
            title: 'Software Consultant',
            description: 'Een onafhankelijke blik. Praktisch en deskundig advies om de juiste keuzes in technologie te maken.',
            color: '#f59e0b'
        },
        {
            icon: FaChartLine,
            title: 'Software/IT Strategie',
            description: 'Technologie in lijn met je business. Wij vertalen ambities naar een slimme en toekomstgerichte IT-roadmap.',
            color: '#ef4444'
        },
        {
            icon: FaIdCard,
            title: 'Digitale Identiteiten',
            description: 'Van EUDI Wallet tot NL Wallet: veilige, efficiënte en compliant oplossingen voor digitale toegang en identificatie.',
            color: '#8b5cf6'
        },
        {
            icon: FaKey,
            title: 'IAM Systemen',
            description: 'Grip op wie toegang heeft. Wij helpen organisaties met veilige IAM-oplossingen voor een betrouwbare digitale omgeving.',
            color: '#06b6d4'
        }
    ];

    const stats = [
        { label: 'Projecten afgerond', value: '5+', icon: FaCheckCircle, color: '#10b981' },
        { label: 'Codelines', value: '1 mln+', icon: FaCode, color: '#4f46e5' },
        { label: 'Tevreden klanten', value: '8+', icon: FaSmile, color: '#f59e0b' },
        { label: 'Jaren Ervaring', value: '3+', icon: FaClock, color: '#ef4444' }
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

                        {/* Wallet status indicator - commented out for future development
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
                        */}
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
                        Technologie die werkt
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
                                <div className="stat-icon" style={{ color: stat.color }}>
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

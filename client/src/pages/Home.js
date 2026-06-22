import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useWeb3 } from '../context/Web3Context';
import Web3Dashboard from '../components/Web3Dashboard';
import BWEULogo from './BWEU__.png';
import KVKLogo from './KVK__.png';
import ECPLogo from './ECP.png';
import TopographLogo from './Topograph__.png';
import CPLogo from './CP.png';
import RWSLogo from './rijkswaterstaat-logo-impuls-1822x911.jpg';
import EWCLogo from './EWC__.png';
import {
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
    FaKey,
    FaGraduationCap
} from 'react-icons/fa';
import './Home.css';

const Home = () => {
    const { isConnected, account } = useWeb3();
    const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

    // Customer logo slideshow data from Services faqs
    const videoClips = [
        {
            src: BWEULogo,
            title: 'Business Wallet EU CEO',
            description: 'Vinay is a true social developer. He knows how to navigate his network and build meaningful connections. He can take an idea, shape it into the right technical structure for the project, and implement it independently.',
            website: 'https://businesswallet.eu/'
        },
        {
            src: KVKLogo,
            title: 'Kamer van Koophandel Innovatielab',
            description: 'Vinay is assertief, enthousiast en leergierig. Hij pakt uitdagingen met beide handen aan en denkt in mogelijkheden en oplossingen',
            website: 'https://www.kvk.nl/'
        },
        {
            src: ECPLogo,
            title: 'ECP',
            description: 'Customer reference from services section',
            website: 'https://ecp.nl/'
        },
        {
            src: TopographLogo,
            title: 'Topograph',
            description: 'Vinay gave me valuable insights into the opportunity around the European Business Wallet. His deep understanding of the European Commission’s work and the KVK’s position was particularly helpful, and it’s clear that he has strong expertise in this area.',
            website: 'https://www.topograph.co/'
        },
        {
            src: CPLogo,
            title: 'Cheqd Ceo',
            description: 'Yes, we offer comprehensive support packages including bug fixes, updates, monitoring, and maintenance. Support terms are included in all project contracts.',
            website: 'https://www.companypassport.com/'
        },
        {
            src: RWSLogo,
            title: 'Rijkswaterstaat WVL',
            description: 'Vinay is een betrokken, vriendelijke collega die iedereen graag bij staat met jouw deskundige inzet en advies. Mede dankzij jou als het dashboard Veiligheid van Rijkswaterstaat doorontwikkeld naar een professioneel en gewaardeerd dashboard voor het bestuur.',
            website: 'https://www.rijkswaterstaat.nl/'
        },
        {
            src: EWCLogo,
            title: 'EWC (The European Digital Identity Wallet Consortium) Coordinator',
            description: 'Vinay is a social and hard working person who has the ability to understand difficult concepts and create working solutions based on the concepts',
            website: 'https://ec.europa.eu/digital-building-blocks/sites/spaces/EUDIGITALIDENTITYWALLET/pages/694487738/EU+Digital+Identity+Wallet+Home'
        }
    ];

    // Auto-advance slideshow every 5 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentVideoIndex((prevIndex) =>
                (prevIndex + 1) % videoClips.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [videoClips.length]);

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
            icon: FaGraduationCap,
            title: 'IT Kennisoverdracht & Training',
            description: 'Kennis delen en groeien. Wij verzorgen praktische lessen, workshops en trainingen om teams te versterken met actuele IT-expertise.',
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
                            Vertrouwd door <span className="text-gradient">klanten</span>
                        </motion.h1>

                        <motion.p
                            className="hero-description"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            VM Vision is de betrouwbare partner in het ontwerpen, ontwikkelen en adviseren van moderne softwareoplossingen.                        </motion.p>

                        <motion.div
                            className="hero-actions"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            <Link to="/services" className="btn-primary">
                                Mijn Diensten
                                <FaArrowRight />
                            </Link>
                            <Link to="/contact" className="btn-secondary">
                                Neem contact op
                            </Link>
                        </motion.div>

                        {/* Wallet status indicator - commented out for future development
                        {false && (
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
                        <div className="video-slideshow">
                            <motion.div
                                key={currentVideoIndex}
                                className="video-container"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 1.1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <a
                                    href={videoClips[currentVideoIndex].website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="slideshow-link"
                                    aria-label={`Open website van ${videoClips[currentVideoIndex].title}`}
                                >
                                    <img
                                        key={videoClips[currentVideoIndex].src}
                                        className="slideshow-video"
                                        src={videoClips[currentVideoIndex].src}
                                        alt={videoClips[currentVideoIndex].title}
                                        loading="lazy"
                                    />
                                </a>

                                {/* Slideshow text hidden on frontend, kept as comment for future reuse.
                                <div className="video-overlay">
                                    <motion.h3
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        {videoClips[currentVideoIndex].title}
                                    </motion.h3>
                                    <motion.p
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                    >
                                        {videoClips[currentVideoIndex].description}
                                    </motion.p>
                                </div>
                                */}
                            </motion.div>

                            {/* Video indicators */}
                            <div className="video-indicators">
                                {videoClips.map((_, index) => (
                                    <button
                                        key={index}
                                        className={`indicator ${index === currentVideoIndex ? 'active' : ''}`}
                                        onClick={() => setCurrentVideoIndex(index)}
                                        aria-label={`Go to video ${index + 1}`}
                                    />
                                ))}
                            </div>
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
            {false && (
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

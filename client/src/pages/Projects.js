import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
    FaExternalLinkAlt,
    FaGithub,
    FaEthereum,
    FaCoins,
    FaRocket,
    FaShieldAlt,
    FaFilter,
    FaTimes
} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    const filters = [
        { id: 'all', label: 'All Projects' },
        { id: 'defi', label: 'DeFi' },
        { id: 'nft', label: 'NFT' },
        { id: 'dao', label: 'DAO' },
        { id: 'enterprise', label: 'Enterprise' }
    ];

    const projects = [
        {
            id: 1,
            title: 'DeFiSwap Protocol',
            category: 'defi',
            description: 'A decentralized exchange with automated market maker functionality, supporting multiple token pairs and liquidity mining.',
            image: '/api/placeholder/600/400',
            technologies: ['Solidity', 'React', 'Web3.js', 'IPFS'],
            features: [
                'Automated Market Maker',
                'Liquidity Mining',
                'Multi-token Support',
                'Governance Token'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            tvl: '$2.5M',
            icon: FaEthereum,
            color: '#627eea'
        },
        {
            id: 2,
            title: 'NFT Marketplace Pro',
            category: 'nft',
            description: 'A comprehensive NFT marketplace with minting, trading, and royalty management features.',
            image: '/api/placeholder/600/400',
            technologies: ['Solidity', 'Next.js', 'Ethers.js', 'OpenSea API'],
            features: [
                'NFT Minting',
                'Auction System',
                'Royalty Management',
                'Cross-chain Support'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            volume: '$1.2M',
            icon: FaCoins,
            color: '#f7931a'
        },
        {
            id: 3,
            title: 'Governance DAO Platform',
            category: 'dao',
            description: 'A decentralized autonomous organization platform with voting mechanisms and proposal management.',
            image: '/api/placeholder/600/400',
            technologies: ['Solidity', 'React', 'The Graph', 'IPFS'],
            features: [
                'Voting System',
                'Proposal Management',
                'Token Distribution',
                'Multi-signature Wallets'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            members: '500+',
            icon: FaShieldAlt,
            color: '#10b981'
        },
        {
            id: 4,
            title: 'Enterprise Blockchain Suite',
            category: 'enterprise',
            description: 'A comprehensive blockchain solution for enterprise clients with private network deployment.',
            image: '/api/placeholder/600/400',
            technologies: ['Hyperledger', 'Node.js', 'React', 'Docker'],
            features: [
                'Private Network',
                'Smart Contracts',
                'API Integration',
                'Monitoring Dashboard'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            clients: '10+',
            icon: FaRocket,
            color: '#8b5cf6'
        },
        {
            id: 5,
            title: 'Yield Farming Protocol',
            category: 'defi',
            description: 'An advanced yield farming platform with multiple staking pools and reward mechanisms.',
            image: '/api/placeholder/600/400',
            technologies: ['Solidity', 'Vue.js', 'Web3.js', 'Chainlink'],
            features: [
                'Multiple Staking Pools',
                'Dynamic Rewards',
                'Risk Management',
                'Cross-chain Farming'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            apy: '15-25%',
            icon: FaEthereum,
            color: '#627eea'
        },
        {
            id: 6,
            title: 'Gaming NFT Collection',
            category: 'nft',
            description: 'A gaming-focused NFT collection with utility features and play-to-earn mechanics.',
            image: '/api/placeholder/600/400',
            technologies: ['Solidity', 'Unity', 'React', 'Web3.js'],
            features: [
                'Gaming Integration',
                'Play-to-Earn',
                'Rarity System',
                'Marketplace Integration'
            ],
            links: {
                live: '#',
                github: '#'
            },
            status: 'Live',
            holders: '2.5K',
            icon: FaCoins,
            color: '#f7931a'
        }
    ];

    const filteredProjects = activeFilter === 'all'
        ? projects
        : projects.filter(project => project.category === activeFilter);

    const stats = [
        { label: 'Total Projects', value: '50+', icon: FaRocket },
        { label: 'Total TVL', value: '$10M+', icon: FaEthereum },
        { label: 'Active Users', value: '25K+', icon: FaCoins },
        { label: 'Blockchain Networks', value: '8+', icon: FaShieldAlt }
    ];

    return (
        <div className="projects">
            {/* Hero Section */}
            <section className="projects-hero">
                <div className="container">
                    <motion.div
                        className="projects-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="projects-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Our <span className="text-gradient">Projects</span>
                        </motion.h1>

                        <motion.p
                            className="projects-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Showcasing innovative Web3 solutions that drive the future of decentralized technology
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="projects-stats section">
                <div className="container">
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

            {/* Filter Section */}
            <section className="projects-filter section">
                <div className="container">
                    <motion.div
                        className="filter-container"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="filter-buttons">
                            {filters.map((filter) => (
                                <button
                                    key={filter.id}
                                    className={`filter-btn ${activeFilter === filter.id ? 'active' : ''}`}
                                    onClick={() => setActiveFilter(filter.id)}
                                >
                                    {filter.label}
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Projects Grid */}
            <section className="projects-grid section">
                <div className="container">
                    <motion.div
                        className="grid grid-2"
                        layout
                    >
                        {filteredProjects.map((project, index) => (
                            <motion.div
                                key={project.id}
                                className="project-card"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                layout
                                whileHover={{ y: -10 }}
                            >
                                <div className="project-image">
                                    <div className="project-placeholder">
                                        <project.icon style={{ color: project.color }} />
                                    </div>
                                    <div className="project-status">
                                        <span className={`status-badge ${project.status.toLowerCase()}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                </div>

                                <div className="project-content">
                                    <div className="project-header">
                                        <h3>{project.title}</h3>
                                        <div className="project-metric">
                                            {project.tvl && <span>TVL: {project.tvl}</span>}
                                            {project.volume && <span>Volume: {project.volume}</span>}
                                            {project.members && <span>Members: {project.members}</span>}
                                            {project.clients && <span>Clients: {project.clients}</span>}
                                            {project.apy && <span>APY: {project.apy}</span>}
                                            {project.holders && <span>Holders: {project.holders}</span>}
                                        </div>
                                    </div>

                                    <p className="project-description">{project.description}</p>

                                    <div className="project-features">
                                        <h4>Key Features:</h4>
                                        <ul>
                                            {project.features.map((feature, featureIndex) => (
                                                <li key={featureIndex}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>

                                    <div className="project-technologies">
                                        {project.technologies.map((tech, techIndex) => (
                                            <span key={techIndex} className="tech-tag">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="project-links">
                                        <a
                                            href={project.links.live}
                                            className="project-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaExternalLinkAlt />
                                            Live Demo
                                        </a>
                                        <a
                                            href={project.links.github}
                                            className="project-link"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <FaGithub />
                                            Source Code
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="projects-cta section">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2>Have a Project in Mind?</h2>
                        <p>
                            Let's collaborate to bring your Web3 vision to life with cutting-edge blockchain technology.
                        </p>
                        <div className="cta-actions">
                            <a href="/contact" className="btn-primary">
                                Start Your Project
                            </a>
                            <a href="/services" className="btn-secondary">
                                View Our Services
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Projects;

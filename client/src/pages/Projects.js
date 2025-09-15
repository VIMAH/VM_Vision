import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    FaExternalLinkAlt,
    FaGithub,
    FaEthereum,
    FaCoins,
    FaRocket,
    FaShieldAlt,
    FaCode,
    FaPython,
    FaJs,
    FaCss3Alt,
} from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    // Function to get icon based on language
    const getLanguageIcon = (language) => {
        switch (language?.toLowerCase()) {
            case 'javascript':
                return FaJs;
            case 'python':
                return FaPython;
            case 'css':
                return FaCss3Alt;
            case 'solidity':
                return FaEthereum;
            case 'c#':
                return FaCode;
            default:
                return FaCode;
        }
    };

    // Function to get color based on language
    const getLanguageColor = (language) => {
        switch (language?.toLowerCase()) {
            case 'javascript':
                return '#f7df1e';
            case 'python':
                return '#3776ab';
            case 'css':
                return '#1572b6';
            case 'solidity':
                return '#627eea';
            case 'c#':
                return '#239120';
            default:
                return '#4f46e5';
        }
    };

    // Function to get tech stack based on repository
    const getTechStack = (repo) => {
        const techStack = [];

        if (repo.language) {
            techStack.push(repo.language);
        }

        // Add additional technologies based on repository name and description
        if (repo.name.toLowerCase().includes('react') || repo.description?.toLowerCase().includes('react')) {
            techStack.push('React');
        }
        if (repo.name.toLowerCase().includes('vite') || repo.description?.toLowerCase().includes('vite')) {
            techStack.push('Vite');
        }
        if (repo.name.toLowerCase().includes('chainlink') || repo.description?.toLowerCase().includes('chainlink')) {
            techStack.push('Chainlink');
        }
        if (repo.name.toLowerCase().includes('metamask') || repo.description?.toLowerCase().includes('metamask')) {
            techStack.push('MetaMask');
        }
        if (repo.name.toLowerCase().includes('dapp') || repo.description?.toLowerCase().includes('dapp')) {
            techStack.push('Web3.js');
        }
        if (repo.name.toLowerCase().includes('wallet') || repo.description?.toLowerCase().includes('wallet')) {
            techStack.push('Blockchain');
        }
        if (repo.name.toLowerCase().includes('visualizer') || repo.description?.toLowerCase().includes('visualizer')) {
            techStack.push('Data Analysis');
        }

        return techStack.length > 0 ? techStack : ['Web Development'];
    };

    // Function to fetch README content
    const fetchReadme = async (repo) => {
        try {
            const readmeResponse = await fetch(`https://api.github.com/repos/VIMAH/${repo.name}/readme`);
            if (readmeResponse.ok) {
                const readmeData = await readmeResponse.json();
                const content = atob(readmeData.content);
                // Extract first paragraph or description from README
                const lines = content.split('\n');
                let description = '';
                for (let line of lines) {
                    line = line.trim();
                    if (line && !line.startsWith('#') && !line.startsWith('!') && !line.startsWith('[') && line.length > 20) {
                        description = line.replace(/[#*`]/g, '').trim();
                        break;
                    }
                }
                return description || repo.description || 'A software development project showcasing modern technologies and best practices.';
            }
        } catch (error) {
            console.log(`Could not fetch README for ${repo.name}`);
        }
        return repo.description || 'A software development project showcasing modern technologies and best practices.';
    };

    // Function to fetch repository languages
    const fetchLanguages = async (repo) => {
        try {
            const languagesResponse = await fetch(`https://api.github.com/repos/VIMAH/${repo.name}/languages`);
            if (languagesResponse.ok) {
                const languages = await languagesResponse.json();
                return Object.keys(languages);
            }
        } catch (error) {
            console.log(`Could not fetch languages for ${repo.name}`);
        }
        return repo.language ? [repo.language] : ['Unknown'];
    };

    // Fetch GitHub repositories
    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch('https://api.github.com/users/VIMAH/repos?sort=updated&per_page=10');
                const repos = await response.json();

                const formattedProjects = await Promise.all(repos.map(async (repo) => {
                    const [description, languages] = await Promise.all([
                        fetchReadme(repo),
                        fetchLanguages(repo)
                    ]);

                    const primaryLanguage = languages[0] || 'Unknown';

                    return {
                        id: repo.id,
                        title: repo.name.replace(/-/g, ' ').replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
                        category: 'GitHub Repository',
                        description: description,
                        technologies: languages,
                        links: {
                            live: repo.homepage || repo.html_url,
                            github: repo.html_url
                        },
                        status: repo.archived ? 'Archived' : 'Active',
                        icon: FaGithub,
                        color: '#333333',
                        language: primaryLanguage
                    };
                }));

                setProjects(formattedProjects);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching repositories:', error);
                setLoading(false);
            }
        };

        fetchRepositories();
    }, []);

    const staticProjects = [
        {
            id: 1,
            title: 'Data visualizer',
            category: 'Strategie & Advies',
            description: 'A data analysis tool that processes WakaTime statistics for visualization, trend analysis, and reporting.',
            technologies: ['Solidity', 'React', 'Web3.js', 'IPFS'],
            features: [
                'Automated Market Maker',
                'Liquidity Mining',
                'Multi-token Support',
                'Governance Token'
            ],
            links: {
                github: 'https://github.com/VIMAH/Data-Visualizer'
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


    const stats = [
        { label: 'Projecten afgerond', value: '5+', icon: FaRocket },
        { label: 'Tevreden klanten', value: '8+', icon: FaEthereum },
        { label: 'Bedrijven geadviseerd en ondersteund', value: '5+', icon: FaCoins },
        { label: 'Ideeën voor digitale oplossingen en innovaties', value: '∞', icon: FaShieldAlt }
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
                            Onze <span className="text-gradient">Projecten</span>
                        </motion.h1>

                        <motion.p
                            className="projects-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Innovaties die organisaties net dat stapje sneller maken dan de toekomst zelf.
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


            {/* Projects Grid */}
            <section className="projects-grid section">
                <div className="container">
                    {loading ? (
                        <div className="loading-container">
                            <div className="loading-spinner"></div>
                            <p>Loading your GitHub repositories...</p>
                        </div>
                    ) : (
                        <motion.div
                            className="grid grid-2"
                            layout
                        >
                            {projects.map((project, index) => (
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

                                        <div className="project-technologies">
                                            {project.technologies.map((tech, techIndex) => (
                                                <span key={techIndex} className="tech-tag">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div className="project-links">
                                            {project.links.live && project.links.live !== project.links.github && (
                                                <a
                                                    href={project.links.live}
                                                    className="project-link"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                >
                                                    <FaExternalLinkAlt />
                                                    Live Demo
                                                </a>
                                            )}
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
                    )}
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
                        <h2>Een project in gedachten?</h2>
                        <p>
                            Laten we samenwerken om jouw ideeën te vertalen naar moderne softwareoplossingen en digitale strategieën.
                        </p>
                        <div className="cta-actions">
                            <a href="/contact" className="btn-primary">
                                Neem contact op
                            </a>
                            <a href="/services" className="btn-secondary">
                                Bekijk onze diensten
                            </a>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Projects;

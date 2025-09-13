import React from 'react';
import { motion } from 'framer-motion';
import {
    FaCode,
    FaRocket,
    FaShieldAlt,
    FaUsers,
    FaAward,
    FaLightbulb,
    FaGlobe,
    FaHandshake
} from 'react-icons/fa';
import './About.css';

const About = () => {
    const values = [
        {
            icon: FaCode,
            title: 'Innovation',
            description: 'We push the boundaries of what\'s possible in Web3 technology, constantly exploring new solutions and approaches.',
            color: '#4f46e5'
        },
        {
            icon: FaShieldAlt,
            title: 'Security',
            description: 'Security is at the core of everything we build. We implement best practices and conduct thorough audits.',
            color: '#10b981'
        },
        {
            icon: FaUsers,
            title: 'Collaboration',
            description: 'We believe in the power of teamwork and work closely with our clients to achieve their vision.',
            color: '#f59e0b'
        },
        {
            icon: FaRocket,
            title: 'Excellence',
            description: 'We strive for excellence in every project, delivering high-quality solutions that exceed expectations.',
            color: '#ef4444'
        }
    ];
    const team = [
        {
            name: 'Vinay Mahadew',
            role: 'Software Engineer',
            description: `👋 Mijn naam is Vinay Mahadew, ${(() => {
                const birthDate = new Date(2003, 9, 21);
                const today = new Date();
                let age = today.getFullYear() - birthDate.getFullYear();
                if (
                    today.getMonth() < birthDate.getMonth() ||
                    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())
                ) {
                    age--;
                }
                return age;
            })()
                } jaar en woonachtig in Den Haag. 
      
      In 2025 studeerde ik af aan de Haagse Hogeschool (BSc Computer Science), met een specialisatie in Software Engineering en Web3/blockchain-technologie. Tijdens mijn studie en stages deed ik ervaring op bij onder andere de Kamer van Koophandel en Rijkswaterstaat, waar ik werkte aan projecten rond digitale identiteit en data-analyse.  
      
      Ik ben co-founder van BusinessWallet.eu en oprichter van VM Vision. Met VM Vision richt ik me op het ontwerpen, ontwikkelen en adviseren van softwareoplossingen die innovatief, gebruiksvriendelijk en toekomstbestendig zijn. Mijn missie is om technologie toegankelijk te maken en organisaties vooruit te helpen.`,
            image: '/api/placeholder/300/300'
        }
    ];


    const milestones = [
        {
            year: '2025',
            title: 'Bedrijf opgericht',
            description: 'VM Vision is opgericht met de visie om de softwareontwikkeling te revolutioneren.',
            icon: FaHandshake
        },
        {
            year: '2021',
            title: 'First Major Project',
            description: 'Successfully launched our first DeFi protocol with $1M+ TVL.',
            icon: FaRocket
        },
        {
            year: '2022',
            title: 'Team Expansion',
            description: 'Grew our team to 10+ blockchain experts and developers.',
            icon: FaUsers
        },
        {
            year: '2023',
            title: 'Industry Recognition',
            description: 'Received multiple awards for innovation in blockchain technology.',
            icon: FaAward
        },
        {
            year: '2024',
            title: 'Global Expansion',
            description: 'Expanded services globally with clients across 15+ countries.',
            icon: FaGlobe
        }
    ];

    return (
        <div className="about">
            {/* Hero Section */}
            <section className="about-hero">
                <div className="container">
                    <motion.div
                        className="about-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="about-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            About <span className="text-gradient">VM Vision</span>
                        </motion.h1>

                        <motion.p
                            className="about-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Vooroplopen in de toekomst van software met innovatieve en gebruiksvriendelijke oplossingen.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Story Section */}
            <section className="story section">
                <div className="container">
                    <div className="story-content">
                        <motion.div
                            className="story-text"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2>Our Story</h2>
                            <p>
                                VM Vision is ontstaan vanuit één duidelijke gedachte: organisaties helpen hun ideeën om te zetten in gebruiksvriendelijke en toekomstbestendige software.
                                Bij VM Vision combineren we ontwerp, ontwikkeling en advies om oplossingen te creëren die écht waarde toevoegen.
                            </p>
                            <p>
                                Met een brede blik op technologie werken we aan uiteenlopende projecten, van maatwerkapplicaties tot adviestrajecten.
                                Mijn kracht ligt in het vertalen van complexe vraagstukken naar praktische en schaalbare softwareoplossingen.
                            </p>
                            <p>
                                Wat VM Vision onderscheidt, is de focus op samenwerking en betrouwbaarheid.
                                Niet alleen bouwen we technologie, maar we zorgen ervoor dat elke oplossing past bij de doelen en visie van de opdrachtgever.
                            </p>
                        </motion.div>

                        <motion.div
                            className="story-visual"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="story-card">
                                <FaLightbulb className="story-icon" />
                                <h3>Innovation First</h3>
                                <p>We're always exploring the latest technologies and pushing the boundaries of what's possible in Web3.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="values section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our Core Values
                    </motion.h2>

                    <div className="grid grid-2">
                        {values.map((value, index) => (
                            <motion.div
                                key={index}
                                className="card value-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="value-icon" style={{ color: value.color }}>
                                    <value.icon />
                                </div>
                                <h3>{value.title}</h3>
                                <p>{value.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="team section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Founder VM Vision
                    </motion.h2>

                    <div className="grid grid-3">
                        {team.map((member, index) => (
                            <motion.div
                                key={index}
                                className="team-card"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                            >
                                <div className="team-image">
                                    <div className="placeholder-avatar">
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                </div>
                                <h3>{member.name}</h3>
                                <p className="team-role">{member.role}</p>
                                <p className="team-description">{member.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Timeline Section */}
            <section className="timeline section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our Journey
                    </motion.h2>

                    <div className="timeline-container">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="timeline-content">
                                    <div className="timeline-year">{milestone.year}</div>
                                    <div className="timeline-icon">
                                        <milestone.icon />
                                    </div>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="mission section">
                <div className="container">
                    <motion.div
                        className="mission-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                    >
                        <h2>Our Mission</h2>
                        <p>
                            Onze missie is het ontwerpen, ontwikkelen en adviseren van software die organisaties vooruit helpt.
                            Onze visie is om met innovatieve en gebruiksvriendelijke oplossingen technologie toegankelijk en toekomstgericht te maken.
                        </p>
                        <div className="mission-stats">
                            <div className="mission-stat">
                                <span className="stat-number">5+</span>
                                <span className="stat-label">Projecten afgerond</span>
                            </div>
                            <div className="mission-stat">
                                <span className="stat-number">8+</span>
                                <span className="stat-label">Tevreden klanten</span>
                            </div>
                            <div className="mission-stat">
                                <span className="stat-number">3+</span>
                                <span className="stat-label">Jaren ervaring</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default About;

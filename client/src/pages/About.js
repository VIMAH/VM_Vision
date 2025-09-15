import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaGraduationCap } from 'react-icons/fa';
import vinayFoto from './Vinay PF foto.jpeg';
import {
    FaCode,
    FaRocket,
    FaShieldAlt,
    FaUsers,
    FaLightbulb,
    FaHandshake,
} from 'react-icons/fa';
import './About.css';

const About = () => {
    const values = [
        {
            icon: FaCode,
            title: 'Visie',
            description: 'Wij kijken vooruit en vertalen complexe uitdagingen naar heldere, toekomstgerichte softwareoplossingen.',
            color: '#4f46e5'
        },
        {
            icon: FaShieldAlt,
            title: 'Missie',
            description: 'Wij helpen organisaties hun digitale ambities te realiseren met betrouwbare strategie, architectuur en ontwikkeling.',
            color: '#10b981'
        },
        {
            icon: FaUsers,
            title: 'Innovatie',
            description: 'Wij benutten de nieuwste technologieën en zetten ze om in praktische, waardevolle oplossingen voor onze klanten.',
            color: '#f59e0b'
        },
        {
            icon: FaRocket,
            title: 'Samenwerking',
            description: 'Wij geloven in co-creatie en bouwen duurzame relaties door open communicatie en gedeelde verantwoordelijkheid.',
            color: '#ef4444'
        },
        {
            icon: FaUsers,
            title: 'Betrouwbaarheid',
            description: 'Wij staan voor consistentie, transparantie en kwaliteit, zodat klanten altijd op ons kunnen rekenen.',
            color: '#f59e0b'
        },
        {
            icon: FaUsers,
            title: 'Leiderschap',
            description: 'Wij nemen initiatief, tonen verantwoordelijkheid en geven richting in de snel veranderende digitale wereld.',
            color: '#f59e0b'
        },
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
            image: vinayFoto
        }
    ];


    const milestones = [
        {
            year: '2021 - 2025',
            title: 'Ervaring en kennis',
            description: 'Door studie, onderzoek en interne projecten is een sterke basis opgebouwd in software architectuur, strategie en ontwikkeling.',
            icon: FaGraduationCap
        },
        {
            year: 'Juli 2025',
            title: 'Het idee voor VM Vision',
            description: 'Het concept voor VM Vision ontstaat: organisaties ondersteunen met moderne softwareoplossingen en digitale strategie.',
            icon: FaLightbulb
        },
        {
            year: '17 september 2025',
            title: 'Officiële oprichting',
            description: 'VM Vision wordt officieel opgericht met een duidelijke missie en visie om organisaties vooruit te helpen.',
            icon: FaHandshake
        },
        {
            year: 'Heden',
            title: 'Klaar om jouw bedrijf te helpen',
            description: 'Met veel kennis en ervaring staat VM Vision klaar om samen met jou digitale oplossingen te realiseren.',
            icon: FaRocket,
            cta: {
                label: 'Neem contact op',
                link: '/contact'
            }
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
                                Onze kracht ligt in het vertalen van complexe vraagstukken naar praktische en schaalbare softwareoplossingen.
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
                                <p>Wij verkennen steeds de nieuwste technologieën en verleggen de grenzen van moderne software.</p>
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
                        Core Values
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
                                    <img src={member.image} alt={member.name} className="team-photo" />
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
                                    <div className="timeline-icon">
                                        <milestone.icon />
                                    </div>
                                    <div className="timeline-year">{milestone.year}</div>
                                    <h3>{milestone.title}</h3>
                                    <p>{milestone.description}</p>
                                    {milestone.cta && (
                                        <Link to={milestone.cta.link} className="btn-secondary timeline-cta">
                                            {milestone.cta.label}
                                        </Link>
                                    )}
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

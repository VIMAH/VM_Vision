import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaCode,
    FaShieldAlt,
    FaRocket,
    FaCoins,
    FaChartLine,
    FaMobile,
    FaDatabase,
    FaCogs,
    FaArrowRight,
    FaCheck,
    FaTimes,
    FaProjectDiagram,
    FaChalkboardTeacher,
    FaIdCard,
    FaUsersCog
} from 'react-icons/fa';
import './Services.css';

const Services = () => {
    const [activeService, setActiveService] = useState(0);

    // Handle URL hash changes to scroll to specific services
    useEffect(() => {
        const handleHashChange = () => {
            const hash = window.location.hash.substring(1); // Remove the # symbol
            if (hash) {
                const serviceIndex = services.findIndex(service => service.id === hash);
                if (serviceIndex !== -1) {
                    setActiveService(serviceIndex);
                    // Scroll to the service after a short delay to ensure the page is rendered
                    setTimeout(() => {
                        const element = document.getElementById(hash);
                        if (element) {
                            element.scrollIntoView({
                                behavior: 'smooth',
                                block: 'center'
                            });
                        }
                    }, 100);
                }
            }
        };

        // Handle initial load
        handleHashChange();

        // Listen for hash changes
        window.addEventListener('hashchange', handleHashChange);

        return () => {
            window.removeEventListener('hashchange', handleHashChange);
        };
    }, []);

    const services = [
        {
            icon: FaProjectDiagram,
            title: 'Software Architectuur',
            id: 'software-architectuur',
            description: 'Ontwerp en realiseer schaalbare, veilige en toekomstbestendige software-architecturen.',
            features: [
                'Schaalbare en modulaire architectuur',
                'Cloud-native oplossingen',
                'Integratie van bestaande systemen',
                'Security by design',
                'API & microservices architectuur',
                'Documentatie & best practices'
            ],
            price: 'Op maat',
            color: '#4f46e5'
        },
        {
            icon: FaCode,
            title: 'Software Ontwikkeling',
            id: 'software-ontwikkeling',
            description: 'End-to-end softwareontwikkeling met moderne frameworks en agile werkwijze.',
            features: [
                'Full-stack ontwikkeling',
                'Web & mobiele applicaties',
                'Koppelingen & API-ontwikkeling',
                'Test-driven development',
                'CI/CD pipelines',
                'Onderhoud & support'
            ],
            price: 'Op maat',
            color: '#10b981'
        },
        {
            icon: FaChalkboardTeacher,
            title: 'Software Consultant',
            id: 'software-consultant',
            description: 'Advies en begeleiding bij het kiezen, ontwerpen en implementeren van softwareoplossingen.',
            features: [
                'Strategisch advies',
                'Proof-of-Concepts',
                'Technologie selectie',
                'Workshops & kennisoverdracht',
                'Roadmap ontwikkeling',
                'Begeleiding implementatie'
            ],
            price: 'Vanaf €2.000',
            color: '#f59e0b'
        },
        {
            icon: FaChartLine,
            title: 'Software/IT Strategie',
            id: 'software-it-strategie',
            description: 'Helpt organisaties bij het ontwikkelen van een toekomstgerichte IT- en softwarestrategie.',
            features: [
                'Digitale transformatie',
                'Enterprise IT strategie',
                'Cloud strategie',
                'Architectuurkeuzes',
                'Innovatie & technologie trends',
                'Business alignment'
            ],
            price: 'Op maat',
            color: '#ef4444'
        },
        {
            icon: FaIdCard,
            title: 'Digitale Identiteiten',
            id: 'digitale-identiteiten',
            description: 'Expertise in identiteitsbeheer en implementatie van moderne IAM-oplossingen.',
            features: [
                'IAM systemen',
                'Single Sign-On (SSO)',
                'Self-Sovereign Identity (SSI)',
                'EUDI Wallet & NL Wallet integratie',
                'Authenticatie & autorisatie',
                'Compliance & security'
            ],
            price: 'Op maat',
            color: '#8b5cf6'
        },
        {
            icon: FaUsersCog,
            title: 'PO / Scrum Master',
            id: 'po-scrum-master',
            description: 'Begeleiding van agile teams om maximale waarde te leveren met Scrum en DevOps.',
            features: [
                'Agile coaching',
                'Scrum implementatie',
                'Product backlog management',
                'Stakeholder management',
                'Team coaching',
                'Procesverbetering'
            ],
            price: 'Op maat',
            color: '#06b6d4'
        }
    ];

    const process = [
        {
            step: '01',
            title: 'Discovery & Planning',
            description: 'We analyze your requirements and create a detailed project roadmap.',
            icon: FaChartLine
        },
        {
            step: '02',
            title: 'Design & Architecture',
            description: 'Our team designs the technical architecture and user experience.',
            icon: FaCode
        },
        {
            step: '03',
            title: 'Development & Testing',
            description: 'We build your solution with rigorous testing and security audits.',
            icon: FaCogs
        },
        {
            step: '04',
            title: 'Deployment & Launch',
            description: 'We deploy your solution and provide ongoing support and maintenance.',
            icon: FaRocket
        }
    ];

    const faqs = [
        {
            question: 'What blockchain networks do you support?',
            answer: 'We support Ethereum, Polygon, BSC, Arbitrum, Optimism, and other EVM-compatible chains. We can also work with Solana, Cosmos, and other non-EVM chains based on your requirements.'
        },
        {
            question: 'How long does a typical project take?',
            answer: 'Project timelines vary based on complexity. Simple smart contracts take 2-4 weeks, while full DeFi protocols can take 3-6 months. We provide detailed timelines during the planning phase.'
        },
        {
            question: 'Do you provide security audits?',
            answer: 'Yes, all our smart contracts undergo thorough security audits. We also work with third-party audit firms for additional verification when required.'
        },
        {
            question: 'What is your pricing model?',
            answer: 'We offer both fixed-price and hourly billing options. Fixed-price projects include detailed specifications and milestones. Hourly rates are available for ongoing development and consulting.'
        },
        {
            question: 'Do you provide ongoing support?',
            answer: 'Yes, we offer comprehensive support packages including bug fixes, updates, monitoring, and maintenance. Support terms are included in all project contracts.'
        }
    ];

    return (
        <div className="services">
            {/* Hero Section */}
            <section className="services-hero">
                <div className="container">
                    <motion.div
                        className="services-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="services-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Our <span className="text-gradient">Web3 Services</span>
                        </motion.h1>

                        <motion.p
                            className="services-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Comprehensive blockchain solutions tailored to your business needs
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid */}
            <section className="services-grid section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        What We Offer
                    </motion.h2>

                    <div className="grid grid-2">
                        {services.map((service, index) => (
                            <motion.div
                                key={index}
                                id={service.id}
                                className={`card service-card ${activeService === index ? 'active' : ''}`}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10 }}
                                onClick={() => setActiveService(index)}
                            >
                                <div className="service-header">
                                    <div className="service-icon" style={{ color: service.color }}>
                                        <service.icon />
                                    </div>
                                    <div className="service-info">
                                        <h3>{service.title}</h3>
                                        <p className="service-price">{service.price}</p>
                                    </div>
                                </div>

                                <p className="service-description">{service.description}</p>

                                <div className="service-features">
                                    <h4>Key Features:</h4>
                                    <ul>
                                        {service.features.map((feature, featureIndex) => (
                                            <li key={featureIndex}>
                                                <FaCheck className="feature-check" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <Link to="/contact" className="btn-primary service-btn">
                                    Get Quote
                                    <FaArrowRight />
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Process Section */}
            <section className="process section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Our Development Process
                    </motion.h2>

                    <div className="process-timeline">
                        {process.map((step, index) => (
                            <motion.div
                                key={index}
                                className="process-step"
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="step-number">{step.step}</div>
                                <div className="step-content">
                                    <div className="step-icon">
                                        <step.icon />
                                    </div>
                                    <h3>{step.title}</h3>
                                    <p>{step.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="faq section">
                <div className="container">
                    <motion.h2
                        className="section-title"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        Frequently Asked Questions
                    </motion.h2>

                    <div className="faq-container">
                        {faqs.map((faq, index) => (
                            <motion.div
                                key={index}
                                className="faq-item"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="faq-question">
                                    <h3>{faq.question}</h3>
                                </div>
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="services-cta section">
                <div className="container">
                    <motion.div
                        className="cta-content"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <h2>Ready to Start Your Web3 Project?</h2>
                        <p>
                            Let's discuss your requirements and create a custom solution that drives your business forward.
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn-primary">
                                Start Your Project
                                <FaArrowRight />
                            </Link>
                            <Link to="/projects" className="btn-secondary">
                                View Our Work
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;

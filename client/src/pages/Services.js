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
            icon: FaChartLine,
            title: 'Strategie & Advies',
            id: 'strategie-advies',
            description:
                'Wij helpen organisaties richting te geven aan hun digitale toekomst. Van IT-strategie tot consultancy en leiderschap: we zorgen dat technologie en business elkaar versterken.',
            features: [
                'Strategisch advies & roadmap',
                'Software/IT strategie',
                'Workshops & kennisoverdracht',
                'Proof-of-Concepts',
                'Stakeholder- en teambegeleiding'
            ],
            price: 'Op maat',
            color: '#f59e0b'
        },
        {
            icon: FaProjectDiagram,
            title: 'Ontwerp & Ontwikkeling',
            id: 'ontwerp-ontwikkeling',
            description:
                'Wij ontwerpen en realiseren schaalbare en toekomstbestendige software. Van architectuur tot development zorgen we voor oplossingen die écht werken.',
            features: [
                'Software architectuur',
                'Enterprise architectuur',
                'Business architectuur',
                'Full-stack ontwikkeling',
                'API-ontwikkeling & integraties',
                'DevOps'
            ],
            price: 'Op maat',
            color: '#10b981'
        },
        {
            icon: FaIdCard,
            title: 'Identiteit & Veiligheid',
            id: 'identiteit-veiligheid',
            description:
                'Veiligheid en vertrouwen zijn cruciaal in de digitale wereld. Wij bieden expertise in IAM, digitale identiteiten en moderne wallet-oplossingen.',
            features: [
                'IAM systemen',
                'Digitale identiteiten',
                'EUDI Wallet & NL Wallet',
                'Authenticatie & autorisatie',
                'Compliance & security'
            ],
            price: 'Op maat',
            color: '#8b5cf6'
        }
    ];


    const process = [
        {
            step: '01',
            title: 'Verkennen & Begrijpen',
            description:
                'We starten met gesprekken om jouw organisatie, doelen en uitdagingen écht te begrijpen.',
            icon: FaUsersCog
        },
        {
            step: '02',
            title: 'Analyseren & Inzicht',
            description:
                'We onderzoeken de huidige situatie en brengen kansen, risico’s en mogelijkheden in kaart.',
            icon: FaChartLine
        },
        {
            step: '03',
            title: 'Strategie & Richting',
            description:
                'Samen bepalen we de koers: een duidelijke roadmap die aansluit bij jouw ambities.',
            icon: FaChalkboardTeacher
        },
        {
            step: '04',
            title: 'Ontwerpen & Adviseren',
            description:
                'We vertalen strategie naar concrete architectuur, concepten of oplossingen.',
            icon: FaProjectDiagram
        },
        {
            step: '05',
            title: 'Realiseren & Begeleiden',
            description:
                'Van implementatie tot teamcoaching: we zorgen dat plannen ook echt resultaat opleveren.',
            icon: FaCode
        },
        {
            step: '06',
            title: 'Evalueren & Verbeteren',
            description:
                'We meten de impact, leren van de resultaten en optimaliseren waar nodig.',
            icon: FaRocket
        }
    ];


    const faqs = [
        {
            question: 'Business Wallet EU CEO',
            answer: 'We support Ethereum, Polygon, BSC, Arbitrum, Optimism, and other EVM-compatible chains. We can also work with Solana, Cosmos, and other non-EVM chains based on your requirements.'
        },
        {
            question: 'Rijkswaterstaat WVL/CIV',
            answer: 'Project timelines vary based on complexity. Simple smart contracts take 2-4 weeks, while full DeFi protocols can take 3-6 months. We provide detailed timelines during the planning phase.'
        },
        {
            question: 'Kamer van Koophandel Innovatielab',
            answer: 'Yes, all our smart contracts undergo thorough security audits. We also work with third-party audit firms for additional verification when required.'
        },
        {
            question: 'WEBUILD Consortium managers',
            answer: 'We offer both fixed-price and hourly billing options. Fixed-price projects include detailed specifications and milestones. Hourly rates are available for ongoing development and consulting.'
        },
        {
            question: 'De Haagse Hogeschool Docenten',
            answer: 'Communicatief zijn ze heel sterk, ze kunnen complexe technologiën goed toelichten en overbrengen. Daarnaast hebben ze veel kennis en ervaring.'
        },
        {
            question: 'Cheqd Ceo',
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
                            Onze <span className="text-gradient">Software diensten</span>
                        </motion.h1>

                        <motion.p
                            className="services-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Moderne softwareoplossingen afgestemd op de doelen van jouw organisatie
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
                        Onze <span className="text-white">diensten</span>
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
                                    Neem contact op
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
                        Onze <span className="text-white">aanpak</span>
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
                        Verhalen van <span className="text-white">klanten</span>
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
                        <h2>Klaar om te starten met jouw digitale toekomst?</h2>
                        <p>
                            Laten we jouw doelen bespreken en samen een oplossing creëren die je organisatie vooruit helpt.
                        </p>
                        <div className="cta-actions">
                            <Link to="/contact" className="btn-primary">
                                kom in contact
                                <FaArrowRight />
                            </Link>
                            <Link to="/projects" className="btn-secondary">
                                Bekijk onze projecten
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Services;

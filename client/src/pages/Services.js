import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    FaCode,
    FaRocket,
    FaChartLine,
    FaArrowRight,
    FaCheck,
    FaProjectDiagram,
    FaChalkboardTeacher,
    FaIdCard,
    FaUsersCog
} from 'react-icons/fa';
import './Services.css';

// Import company logos
import BWEULogo from './BWEU.png';
import RWSLogo from './RWS_logo.jpg';
import KVKLogo from './KVK_logo.jpg';
import HHSLogo from './HHS_GLogo.png';
import CheqdLogo from './cheqd_logo.jpeg';
import EWCLogo from './EWC_Logo.webp';

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
                'Veiligheid en vertrouwen zijn cruciaal in de digitale wereld. Wij bieden expertise in digitale identiteiten en moderne wallet-oplossingen.',
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
            answer: 'Vinay is a true social developer. He knows how to navigate his network and build meaningful connections. He can take an idea, shape it into the right technical structure for the project, and implement it independently.',
            logo: BWEULogo,
            website: 'https://businesswallet.eu/'
        },
        {
            question: 'Rijkswaterstaat WVL',
            answer: 'Vinay is een betrokken, vriendelijke collega die iedereen graag bij staat met jouw deskundige inzet en advies. Mede dankzij jou als het dashboard Veiligheid van Rijkswaterstaat doorontwikkeld naar een professioneel en gewaardeerd dashboard voor het bestuur.',
            logo: RWSLogo,
            website: 'https://www.rijkswaterstaat.nl/over-ons/onze-organisatie/organisatiestructuur/water-verkeer-en-leefomgeving'
        },
        {
            question: 'Kamer van Koophandel Innovatielab',
            answer: 'Vinay is assertief, enthousiast en leergierig. Hij pakt uitdagingen met beide handen aan en denkt in mogelijkheden en oplossingen',
            logo: KVKLogo,
            website: 'https://www.kvk.nl/runnen-en-groeien/kvk-innovatielab/'
        },
        {
            question: 'EWC (The European Digital Identity Wallet Consortium) Coordinator',
            answer: 'Vinay is a social and hard working person who has the ability to understand difficult concepts and create working solutions based on the concepts',
            logo: EWCLogo,
            website: 'https://eudiwalletconsortium.org/'
        },
        {
            question: 'De Haagse Hogeschool Docenten',
            answer: 'Communicatief is Vinay heel sterk, hij kan complexe technologiën goed toelichten en overbrengen. Daarnaast beschikt hij over veel kennis en ervaring.',
            logo: HHSLogo,
            website: 'https://www.dehaagsehogeschool.nl/'
        }
        // {
        //     question: 'Cheqd Ceo',
        //     answer: 'Yes, we offer comprehensive support packages including bug fixes, updates, monitoring, and maintenance. Support terms are included in all project contracts.',
        //     logo: CheqdLogo,
        //     website: 'https://cheqd.io/'
        // }
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
                                    <span>Neem contact op</span>
                                    <span style={{ marginLeft: 12, display: 'inline-flex', alignItems: 'center' }}>
                                        <FaArrowRight />
                                    </span>
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
                                    <div className="faq-company-logo">
                                        {faq.logo ? (
                                            <a
                                                href={faq.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="company-logo-link"
                                            >
                                                <img
                                                    src={faq.logo}
                                                    alt={`${faq.question} logo`}
                                                    className="company-logo"
                                                />
                                            </a>
                                        ) : (
                                            <a
                                                href={faq.website}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="company-logo-link company-text-link"
                                            >
                                                Visit Website
                                            </a>
                                        )}
                                    </div>
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

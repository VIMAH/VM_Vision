import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaDiscord } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const socialLinks = [
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/vinay-mh/', label: 'LinkedIn' },
        { icon: FaGithub, url: 'https://github.com/VIMAH', label: 'GitHub' },
        { icon: FaDiscord, url: 'https://discord.com/users/882989507358654494', label: 'Discord' },
    ];

    const quickLinks = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'Over ons' },
        { path: '/services', label: 'Diensten' },
        { path: '/projects', label: 'Projecten' },
        { path: '/contact', label: 'contact' },
    ];

    const services = [
        { name: 'Strategie & Advies', id: 'strategie-advies' },
        { name: 'Ontwerp & Ontwikkeling', id: 'ontwerp-ontwikkeling' },
        { name: 'Identiteit & Veiligheid', id: 'identiteit-veiligheid' },
    ];

    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-content">
                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="footer-logo">
                            <h3>VM Vision</h3>
                            <p className="logo-subtitle">Van visie naar software</p>
                        </div>
                        <p className="footer-description">
                            Wij ontwerpen, ontwikkelen en adviseren over software die organisaties vooruit helpt.
                            Met innovatieve oplossingen bouwen we samen aan de toekomst.
                        </p>
                        <div className="social-links">
                            {socialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.url}
                                    className="social-link"
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={social.label}
                                >
                                    <social.icon />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                    >
                        <h4>Quick Links</h4>
                        <ul className="footer-links">
                            {quickLinks.map((link, index) => (
                                <li key={index}>
                                    <Link to={link.path}>{link.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <h4>Onze Diensten</h4>
                        <ul className="footer-links">
                            {services.map((service, index) => (
                                <li key={index}>
                                    <Link to={`/services#${service.id}`}>{service.name}</Link>
                                </li>
                            ))}
                        </ul>
                    </motion.div>

                    <motion.div
                        className="footer-section"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                    >
                        <h4>Contact Info</h4>
                        <div className="contact-info">
                            <p>
                                <strong>Email:</strong> contact@vmvision.com
                            </p>
                        </div>

                        <div className="company-info-card">
                            <div className="company-info-item">
                                <span className="company-info-label">KvK Nr:</span>
                                <span className="company-info-value">9810208</span>
                            </div>
                            <div className="company-info-item">
                                <span className="company-info-label">BTW Nr:</span>
                                <span className="company-info-value">NL 123456789 B 01</span>
                            </div>
                            <div className="company-info-item">
                                <span className="company-info-label">IBAN:</span>
                                <span className="company-info-value">NL20 INGB 0001234567</span>
                            </div>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="footer-bottom-content">
                        <p>&copy; {currentYear} VM Vision. All rights reserved.</p>
                        <div className="footer-bottom-links">
                            <Link to="/privacy">Privacy Policy </Link>
                            <Link to="/terms">Terms of Service</Link>
                        </div>
                    </div>
                </motion.div>
            </div>
        </footer>
    );
};

export default Footer;

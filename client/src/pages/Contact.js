import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaDiscord,
    FaLinkedin,
    FaGithub,
    FaPaperPlane,
    FaCheck,
    FaTimes
} from 'react-icons/fa';
import './Contact.css';
const Contact = () => {

    const { isConnected, account } = useWeb3();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        company: '',
        message: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const calendlyRef = useRef(null);

    useEffect(() => {
        // Prevent duplicate initialization
        if (calendlyRef.current && calendlyRef.current.dataset.initialized === 'true') {
            return;
        }
        const init = () => {
            if (window.Calendly && calendlyRef.current) {
                window.Calendly.initInlineWidget({
                    url: process.env.REACT_APP_CALENDLY_URL || 'https://calendly.com/vinaymahadew-01?hide_gdpr_banner=1&text_color=000000&primary_color=10b981',
                    parentElement: calendlyRef.current,
                });
                calendlyRef.current.dataset.initialized = 'true';
                return true;
            }
            return false;
        };

        if (!init()) {
            const onLoad = () => init();
            const script = document.querySelector('script[src*="assets.calendly.com/assets/external/widget.js"]');
            if (script) script.addEventListener('load', onLoad);
            const id = setInterval(() => { if (init()) clearInterval(id); }, 100);
            return () => {
                clearInterval(id);
                if (script) script.removeEventListener('load', onLoad);
            };
        }
    }, []);

    // const projectTypes = [
    //     'Smart Contract Development',
    //     'DeFi Protocol',
    //     'NFT Marketplace',
    //     'Web3 Frontend',
    //     'Blockchain Consulting',
    //     'Custom Solution',
    //     'Other'
    // ];

    // const budgetRanges = [
    //     'Under $10,000',
    //     '$10,000 - $25,000',
    //     '$25,000 - $50,000',
    //     '$50,000 - $100,000',
    //     'Over $100,000'
    // ];

    // const timelineOptions = [
    //     'ASAP',
    //     '1-2 months',
    //     '3-6 months',
    //     '6+ months',
    //     'Flexible'
    // ];

    const contactInfo = [
        {
            icon: FaEnvelope,
            title: 'Email',
            value: 'contact@vmvision.com',
            link: 'mailto:contact@vmvision.com'
        },
        {
            icon: FaPhone,
            title: 'Phone',
            value: '+31 6 83 211 888',
            link: 'tel:+31683211888'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Locatie',
            value: 'Den Haag',
            link: 'https://maps.app.goo.gl/yV5vLT7foLwBgWDj8'
        }
    ];

    const socialLinks = [
        { icon: FaLinkedin, url: 'https://www.linkedin.com/in/vinay-mh/', label: 'LinkedIn' },
        { icon: FaGithub, url: 'https://github.com/VIMAH', label: 'GitHub' },
        { icon: FaDiscord, url: 'https://discord.com/users/882989507358654494', label: 'Discord' },
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Create subject with name and company
            const subject = `Contact from ${formData.name}${formData.company ? ` (${formData.company})` : ''}`;

            // Create email body with the message
            const body = formData.message;

            // Create mailto URL
            const mailtoUrl = `mailto:contact@vmvision.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

            // Open the default email client
            window.location.href = mailtoUrl;

            // Show success message
            setSubmitStatus('success');

            // Clear form after a short delay
            setTimeout(() => {
                setFormData({
                    name: '',
                    email: '',
                    company: '',
                    message: '',
                });
                setSubmitStatus(null);
            }, 2000);

        } catch (error) {
            console.error('Contact form error:', error);
            setSubmitStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="contact">
            {/* Hero Section */}
            <section className="contact-hero">
                <div className="container">
                    <motion.div
                        className="contact-hero-content"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <motion.h1
                            className="contact-title"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            Kom in <span className="text-gradient">contact</span>
                        </motion.h1>

                        <motion.p
                            className="contact-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Klaar om jouw digitale project te starten? Laten we bespreken hoe we jouw visie tot leven kunnen brengen.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Contact Form & Info */}
            <section className="contact-main section">
                <div className="container">
                    <div className="contact-grid">
                        {/* Contact Form */}
                        <motion.div
                            className="contact-form-container"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="form-header">
                                <h2>Laten we samen aan de slag gaan</h2>
                                <p>Vul het formulier in en we nemen snel contact met je op om jouw wensen te bespreken.</p>
                            </div>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaCheck />
                                    <span>Perfect! Je email client is geopend. Bevestig het verzenden van je bericht.</span>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    className="error-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaTimes />
                                    <span>Sorry, er is een probleem opgetreden bij het openen van je email client. Probeer het opnieuw.</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Volledige naam *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Voornaam + Achternaam"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="company">Bedrijf</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Bedrijfsnaam"
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="projectType">Project Type *</label>
                                        <select
                                            id="projectType"
                                            name="projectType"
                                            value={formData.projectType}
                                            onChange={handleInputChange}
                                            required
                                        >
                                            <option value="">Select project type</option>
                                            {projectTypes.map((type, index) => (
                                                <option key={index} value={type}>{type}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                </div>

                                <div className="form-row">
                                    {/* <div className="form-group">
                                        <label htmlFor="budget">Budget Range</label>
                                        <select
                                            id="budget"
                                            name="budget"
                                            value={formData.budget}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select budget range</option>
                                            {budgetRanges.map((range, index) => (
                                                <option key={index} value={range}>{range}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                    <div className="form-group">
                                        <label htmlFor="email">Email Addres *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Jouw@gmail.com"
                                        />
                                    </div>
                                    {/* <div className="form-group">
                                        <label htmlFor="timeline">Timeline</label>
                                        <select
                                            id="timeline"
                                            name="timeline"
                                            value={formData.timeline}
                                            onChange={handleInputChange}
                                        >
                                            <option value="">Select timeline</option>
                                            {timelineOptions.map((option, index) => (
                                                <option key={index} value={option}>{option}</option>
                                            ))}
                                        </select>
                                    </div> */}
                                </div>

                                {false && (
                                    <div className="form-group">
                                        <label htmlFor="walletAddress">Wallet Address</label>
                                        <input
                                            type="text"
                                            id="walletAddress"
                                            name="walletAddress"
                                            value={formData.walletAddress}
                                            onChange={handleInputChange}
                                            placeholder="Your wallet address"
                                            readOnly
                                        />
                                        <small>Connected wallet address (auto-filled)</small>
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="message">jouw bericht *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        placeholder="Stel je vraag, vertel ons over jouw project of wat je nodig heb...."
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="btn-primary submit-btn"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="loading-spinner"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <span>Verstuur Bericht</span>
                                            <span style={{ marginLeft: 8, display: 'inline-flex' }}>
                                                <FaPaperPlane />
                                            </span>
                                        </>
                                    )}
                                </button>
                            </form>
                        </motion.div>

                        {/* Contact Info */}
                        <motion.div
                            className="contact-info-container"
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="contact-info-header">
                                <h2>Contact Informatie</h2>
                                <p>Bereik ons eenvoudig via onderstaande
                                    kanalen</p>
                            </div>

                            <div className="contact-info-list">
                                {contactInfo.map((info, index) => (
                                    <motion.a
                                        key={index}
                                        href={info.link}
                                        className="contact-info-item"
                                        whileHover={{ scale: 1.05, x: 10 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <div className="contact-info-icon">
                                            <info.icon />
                                        </div>
                                        <div className="contact-info-content">
                                            <h3>{info.title}</h3>
                                            <p>{info.value}</p>
                                        </div>
                                    </motion.a>
                                ))}
                            </div>

                            <div className="social-section">
                                <h3>Follow Us</h3>
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
                            </div>

                            <div className="response-time">
                                <h3>Reactietijd</h3>
                                <p>Wij reageren doorgaans op alle vragen binnen 24 uur op werkdagen.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Contact Form & Info 1*/}
            <section className="contact-main section meeting-section">
                <div className="container">
                    <div className="contact-grid meeting-grid">
                        {/* Contact Form */}
                        <motion.div
                            className="contact-form-container meeting-card"
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <div className="form-header">
                                <h2>Plan een meeting</h2>
                                <p>Plan een call om kennis te maken en samen jouw wensen en mogelijkheden te bespreken.</p>
                            </div>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaCheck />
                                    <span>Bedankt! Je email client is geopend. Bevestig het verzenden van je bericht.</span>
                                </motion.div>
                            )}

                            {submitStatus === 'error' && (
                                <motion.div
                                    className="error-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaTimes />
                                    <span>Sorry, er is een probleem opgetreden bij het openen van je email client. Probeer het opnieuw.</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form meeting-form">
                                {/* Calendly inline widget */}
                                <div
                                    ref={calendlyRef}
                                    className="meeting-widget"
                                    style={{ width: '100%', minWidth: '320px', height: '760px' }}
                                />

                                {false && (
                                    <div className="form-group">
                                        <label htmlFor="walletAddress">Wallet Address</label>
                                        <input
                                            type="text"
                                            id="walletAddress"
                                            name="walletAddress"
                                            value={formData.walletAddress}
                                            onChange={handleInputChange}
                                            placeholder="Your wallet address"
                                            readOnly
                                        />
                                        <small>Connected wallet address (auto-filled)</small>
                                    </div>
                                )}
                            </form>
                        </motion.div>
                    </div>
                </div>
            </section >
        </div >
    );
};

export default Contact;

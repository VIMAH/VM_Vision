import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../context/Web3Context';
import {
    FaEnvelope,
    FaPhone,
    FaMapMarkerAlt,
    FaTelegram,
    FaDiscord,
    FaTwitter,
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
        projectType: '',
        budget: '',
        timeline: '',
        message: '',
        walletAddress: account || ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);

    const projectTypes = [
        'Smart Contract Development',
        'DeFi Protocol',
        'NFT Marketplace',
        'Web3 Frontend',
        'Blockchain Consulting',
        'Custom Solution',
        'Other'
    ];

    const budgetRanges = [
        'Under $10,000',
        '$10,000 - $25,000',
        '$25,000 - $50,000',
        '$50,000 - $100,000',
        'Over $100,000'
    ];

    const timelineOptions = [
        'ASAP',
        '1-2 months',
        '3-6 months',
        '6+ months',
        'Flexible'
    ];

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
            value: '+1 (555) 123-4567',
            link: 'tel:+15551234567'
        },
        {
            icon: FaMapMarkerAlt,
            title: 'Location',
            value: 'Web3 District, Blockchain City',
            link: '#'
        }
    ];

    const socialLinks = [
        { icon: FaTwitter, url: '#', label: 'Twitter' },
        { icon: FaLinkedin, url: '#', label: 'LinkedIn' },
        { icon: FaGithub, url: '#', label: 'GitHub' },
        { icon: FaDiscord, url: '#', label: 'Discord' },
        { icon: FaTelegram, url: '#', label: 'Telegram' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Here you would typically send the data to your backend
            console.log('Form submitted:', formData);

            setSubmitStatus('success');
            setFormData({
                name: '',
                email: '',
                company: '',
                projectType: '',
                budget: '',
                timeline: '',
                message: '',
                walletAddress: account || ''
            });
        } catch (error) {
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
                            Get In <span className="text-gradient">Touch</span>
                        </motion.h1>

                        <motion.p
                            className="contact-subtitle"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            Ready to start your Web3 project? Let's discuss how we can bring your vision to life.
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
                                <h2>Start Your Project</h2>
                                <p>Fill out the form below and we'll get back to you within 24 hours.</p>
                            </div>

                            {submitStatus === 'success' && (
                                <motion.div
                                    className="success-message"
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <FaCheck />
                                    <span>Thank you! Your message has been sent successfully.</span>
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
                                    <span>Sorry, there was an error sending your message. Please try again.</span>
                                </motion.div>
                            )}

                            <form onSubmit={handleSubmit} className="contact-form">
                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="name">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="Your full name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            required
                                            placeholder="your@email.com"
                                        />
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
                                        <label htmlFor="company">Company</label>
                                        <input
                                            type="text"
                                            id="company"
                                            name="company"
                                            value={formData.company}
                                            onChange={handleInputChange}
                                            placeholder="Your company name"
                                        />
                                    </div>
                                    <div className="form-group">
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
                                    </div>
                                </div>

                                <div className="form-row">
                                    <div className="form-group">
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
                                    </div>
                                    <div className="form-group">
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
                                    </div>
                                </div>

                                {isConnected && (
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
                                    <label htmlFor="message">Project Description *</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                        rows="6"
                                        placeholder="Tell us about your project, requirements, and goals..."
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
                                            Send Message
                                            <FaPaperPlane />
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
                                <h2>Contact Information</h2>
                                <p>Get in touch with us through any of these channels.</p>
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
                                <h3>Response Time</h3>
                                <p>We typically respond to all inquiries within 24 hours during business days.</p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

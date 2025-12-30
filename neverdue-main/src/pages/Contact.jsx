import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import './Contact.css';

const Contact = () => {
    const [isSubmitted, setIsSubmitted] = useState(false);

    // 1. STATE TO HOLD USER INPUT
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    // 2. HANDLE TYPING
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // 3. SUBMIT TO SUPABASE
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get current user session if logged in
            const { data: { session } } = await supabase.auth.getSession();
            
            const messageData = {
                ...formData,
                user_id: session?.user?.id || null
            };

            const { error } = await supabase
                .from('messages')
                .insert([messageData]);

            if (error) {
                alert("Error sending message: " + error.message);
                return;
            }

            setIsSubmitted(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error("Error:", error);
            alert("Could not connect to the server.");
        }
    };

    return (
        <div className="contact-page-container">

            {/* Hero Section */}
            <div className="contact-hero">
                <div className="contact-hero-content">
                    <h1>Get in Touch</h1>
                    <p>Have a question or feedback? We're here to listen.</p>
                </div>
            </div>

            <div className="contact-content-wrapper fade-in">
                <div className="contact-grid">

                    {/* --- LEFT COLUMN: Dark Info & Socials Panel --- */}
                    <div className="info-details item-card dark-panel">

                        <h3>Contact Information</h3>
                        <p className="panel-subtitle">Reach out to the NeverDue team directly.</p>

                        <div className="info-row">
                            <div className="icon-box">📍</div>
                            <div>
                                <strong>HQ Address</strong>
                                <p>123 NeverDue HQ, George Town, Penang</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="icon-box">📞</div>
                            <div>
                                <strong>Phone Number</strong>
                                <p>+60 12-345 6789</p>
                            </div>
                        </div>

                        <div className="info-row">
                            <div className="icon-box">📧</div>
                            <div>
                                <strong>Email Support</strong>
                                <p>support@neverdue.com</p>
                            </div>
                        </div>

                        {/* Divider */}
                        <hr className="divider dark-divider" />

                        {/* Social Media Section */}
                        <div className="social-links-section">
                            <h3>Follow Us</h3>
                            <div className="social-grid">

                                {/* Instagram */}
                                <a href="#" className="social-card instagram">
                                    <div className="social-icon">📷</div>
                                    <div className="social-text">
                                        <span className="platform">Instagram</span>
                                        <span className="username">@NeverDue_MY</span>
                                    </div>
                                </a>

                                {/* Twitter / X */}
                                <a href="#" className="social-card twitter">
                                    <div className="social-icon">🐦</div>
                                    <div className="social-text">
                                        <span className="platform">Twitter</span>
                                        <span className="username">@NeverDueTweets</span>
                                    </div>
                                </a>

                                {/* Facebook */}
                                <a href="#" className="social-card facebook">
                                    <div className="social-icon">📘</div>
                                    <div className="social-text">
                                        <span className="platform">Facebook</span>
                                        <span className="username">NeverDue Official</span>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Clean White Form --- */}
                    <div className="form-container item-card">
                        {isSubmitted ? (
                            <div className="success-message">
                                <div className="success-icon-box">🎉</div>
                                <h3>Message Sent!</h3>
                                <p>Thanks for reaching out to NeverDue. Our team will get back to you shortly.</p>
                                <button className="btn-reset" onClick={() => setIsSubmitted(false)}>
                                    Send another message
                                </button>
                            </div>
                        ) : (
                            <>
                                <h3 className="section-header">Send us a Message</h3>
                                <p className="form-subtitle">Fill up the form and our team will get back to you within 24 hours.</p>
                                <form onSubmit={handleSubmit}>

                                    <div className="form-group">
                                        <label>Full Name</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">👤</span>
                                            {/* ADDED: name, value, onChange */}
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                placeholder="e.g. John Doe"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Email Address</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">✉️</span>
                                            {/* ADDED: name, value, onChange */}
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                placeholder="e.g. john@example.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Subject</label>
                                        <div className="input-wrapper">
                                            <span className="input-icon">📝</span>
                                            <input
                                                type="text"
                                                name="subject"
                                                value={formData.subject}
                                                onChange={handleChange}
                                                placeholder="e.g. Product Inquiry"
                                            />
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label>Message</label>
                                        {/* ADDED: name, value, onChange */}
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            placeholder="How can we help you?"
                                            required
                                        ></textarea>
                                    </div>
                                    <button type="submit" className="btn-submit">Send Message &rarr;</button>
                                </form>
                            </>
                        )}
                    </div>

                </div>
            </div>
        </div>
    );
};

export default Contact;
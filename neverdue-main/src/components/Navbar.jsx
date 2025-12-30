import React, { useState, useEffect } from 'react';
import { User, ChevronDown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabaseClient';

const Navbar = ({ setActiveMenu, activeMenu }) => {
    const navigate = useNavigate();
    
    const linkStyle = {
        cursor: 'pointer',
        fontWeight: '600',
        fontSize: '15px',
        color: '#fff',
        padding: '12px 16px',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        transition: 'all 0.3s ease',
        borderRadius: '6px',
        position: 'relative',
        textDecoration: 'none'
    };

    // Helper function to handle clicking a link
    const handleLinkClick = () => {
        setActiveMenu(null); // Closes the MegaMenu when a page is selected
        window.scrollTo(0, 0); // Ensures the new page starts at the top
    };

    // Handle user icon click
    const handleUserIconClick = async () => {
        setActiveMenu(null);
        
        try {
            const { data: { session } } = await supabase.auth.getSession();
            
            if (session) {
                navigate('/profile');
            } else {
                navigate('/login');
            }
        } catch (error) {
            console.log('Session check error, going to login');
            navigate('/login');
        }
        
        window.scrollTo(0, 0);
    };

    return (
        <nav
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '80px',
                zIndex: 9999,
                backgroundColor: 'rgba(10, 10, 10, 0.8)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                transition: 'background 0.3s ease',
                color: '#fff',
                boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
            }}
        >
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0 6%',
                height: '100%',
                maxWidth: '1400px',
                margin: '0 auto'
            }}>
                {/* Left: Logo and Navigation Items */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
                    <Link to="/" style={{ textDecoration: 'none' }} onClick={handleLinkClick}>
                        <h1 style={{
                            fontSize: '28px',
                            margin: 0,
                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            fontWeight: '800',
                            letterSpacing: '-0.5px'
                        }}>
                            NeverDue
                        </h1>
                    </Link>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>

                        {/* 1. Products */}
                        <Link
                            to="/products"
                            style={{...linkStyle, backgroundColor: activeMenu === 'products' ? 'rgba(255,255,255,0.1)' : 'transparent'}}
                            onMouseEnter={() => setActiveMenu('products')}
                            onClick={handleLinkClick}
                        >
                            Products <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: activeMenu === 'products' ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </Link>

                        {/* 2. Services */}
                        <Link
                            to="/services"
                            style={{...linkStyle, backgroundColor: activeMenu === 'services' ? 'rgba(255,255,255,0.1)' : 'transparent'}}
                            onMouseEnter={() => setActiveMenu('services')}
                            onClick={handleLinkClick}
                        >
                            Services <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: activeMenu === 'services' ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </Link>

                        {/* 3. About Us */}
                        <Link
                            to="/about"
                            style={{...linkStyle, backgroundColor: activeMenu === 'about' ? 'rgba(255,255,255,0.1)' : 'transparent'}}
                            onMouseEnter={() => setActiveMenu('about')}
                            onClick={handleLinkClick}
                        >
                            About Us <ChevronDown size={16} style={{ transition: 'transform 0.3s', transform: activeMenu === 'about' ? 'rotate(180deg)' : 'rotate(0)' }} />
                        </Link>

                        {/* 4. Contact Us (UPDATED: No Dropdown) */}
                        <Link
                            to="/contact"
                            style={linkStyle}
                            onMouseEnter={() => setActiveMenu(null)} // Force close menu if hovering contact
                            onClick={handleLinkClick}
                        >
                            Contact Us
                        </Link>

                    </div>
                </div>

                {/* Right: Account Icon */}
                <div 
                    onClick={handleUserIconClick}
                    style={{
                        cursor: 'pointer',
                        padding: '10px',
                        borderRadius: '50%',
                        transition: 'all 0.3s ease',
                        backgroundColor: 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
                >
                    <User size={24} color="#fff" />
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
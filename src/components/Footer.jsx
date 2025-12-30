import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer style={{ 
      padding: '30px 5%', 
      background: '#1a1a1a', 
      color: 'white', 
      marginTop: 'auto',
      textAlign: 'center',
      borderTop: '1px solid #333'
    }}>
      <div style={{ marginBottom: '20px' }}>
        <Link to="/terms" 
           style={{ 
             color: '#aaa', 
             textDecoration: 'none', 
             margin: '0 15px', 
             fontSize: '0.9rem',
             transition: 'color 0.3s'
           }}>
          Terms and Conditions
        </Link>
        <span style={{ color: '#555', margin: '0 5px' }}>|</span>
        <Link to="/privacy" 
           style={{ 
             color: '#aaa', 
             textDecoration: 'none', 
             margin: '0 15px', 
             fontSize: '0.9rem',
             transition: 'color 0.3s'
           }}>
          Privacy Policy
        </Link>
      </div>
      <p style={{ margin: '10px 0', fontSize: '0.95rem' }}>&copy; 2025 NeverDue Software House. All rights reserved.</p>
      <p style={{ fontSize: '0.8rem', color: '#888', margin: '5px 0' }}>
        Designed for CAT201 Assignment 2
      </p>
    </footer>
  );
};

export default Footer; // This line fixes the "export named default" error!
import React, { useEffect } from 'react';
import { Target, Award, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const MissionVision = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="about-page">
      <button 
        onClick={() => navigate(-1)}
        style={{
          position: 'fixed',
          top: '100px',
          left: '20px',
          zIndex: 1000,
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid #ddd',
          borderRadius: '50%',
          width: '48px',
          height: '48px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
      >
        <ArrowLeft size={24} color="#333" />
      </button>
      <section className="about-hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="about-hero-content">
          <Target size={64} color="#fff" />
          <h1>Mission & Vision</h1>
          <p>Leading the digital frontier by creating software that thinks ahead, scales globally, and empowers every user.</p>
        </div>
      </section>

      <main className="about-content">
        <section className="about-section">
          <div className="mission-vision-grid">
            <div className="mv-card mission">
              <Target size={48} color="#db2777" />
              <h2>Our Mission</h2>
              <p className="lead">To deliver excellence on time, every time</p>
              <ul className="values-list">
                <li><Award size={20} /> <span>Build innovative software solutions that exceed expectations</span></li>
                <li><Award size={20} /> <span>Empower businesses through cutting-edge technology</span></li>
                <li><Award size={20} /> <span>Maintain the highest standards of code quality and security</span></li>
                <li><Award size={20} /> <span>Foster continuous learning and technical excellence</span></li>
                <li><Award size={20} /> <span>Create sustainable, scalable systems for the future</span></li>
              </ul>
            </div>

            <div className="mv-card vision">
              <Heart size={48} color="#db2777" />
              <h2>Our Vision</h2>
              <p className="lead">To be the global leader in innovative software solutions</p>
              <ul className="values-list">
                <li><Award size={20} /> <span>Set the standard for modern software development</span></li>
                <li><Award size={20} /> <span>Expand our impact across all continents and industries</span></li>
                <li><Award size={20} /> <span>Pioneer new technologies and development methodologies</span></li>
                <li><Award size={20} /> <span>Build a community of world-class engineers</span></li>
                <li><Award size={20} /> <span>Drive digital transformation at a global scale</span></li>
              </ul>
            </div>
          </div>
        </section>

        <section className="values-section">
          <h2>Our Core Values</h2>
          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">💡</div>
              <h3>Innovation</h3>
              <p>We constantly explore new technologies and methodologies to stay ahead of the curve.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">✨</div>
              <h3>Quality</h3>
              <p>Every line of code we write meets the highest standards of excellence and maintainability.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🤝</div>
              <h3>Integrity</h3>
              <p>We build trust through transparency, honesty, and ethical business practices.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">👥</div>
              <h3>Collaboration</h3>
              <p>We believe in the power of teamwork and open communication with clients and partners.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🚀</div>
              <h3>Growth</h3>
              <p>We invest in our team's development and encourage continuous learning and improvement.</p>
            </div>
            <div className="value-card">
              <div className="value-icon">🌍</div>
              <h3>Sustainability</h3>
              <p>We're committed to building a greener future through our Digital Forest initiative.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MissionVision;

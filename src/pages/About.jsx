// src/pages/About.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './About.css';

const About = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeCard, setActiveCard] = useState(null);
  const [isVisible, setIsVisible] = useState({});

  // Handle scroll to hash on load and when hash changes
  useEffect(() => {
    const hash = location.hash;
    
    if (hash) {
      // Wait for DOM to be ready
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          const yOffset = -100; // Offset for navbar
          const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
      }, 300);
    } else {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [location]);

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible((prev) => ({ ...prev, [entry.target.id]: true }));
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.about-card, .section-title');
    elements.forEach((el, index) => {
      el.id = el.id || `element-${index}`;
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Handle partner button click
  const handlePartnerClick = () => {
    navigate('/about/become-partner');
  };

  // Handle card click for more details
  const handleCardClick = (cardType) => {
    setActiveCard(activeCard === cardType ? null : cardType);
  };

  const images = {
    hero: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
    about: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80",
    mission: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=800&q=80",
    director: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=800&q=80",
    culture: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    university: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80",
    partner: "https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="about-container">
      
      {/* Hero Header */}
      <section 
        className="about-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(0,0,0,0.6), rgba(0,0,0,0.6)), url(${images.hero})` }}
      >
        <div className="about-hero-content">
          <h1>About Us</h1>
          <p>We are NeverDue—transforming complexity into seamless digital experiences.</p>
        </div>
      </section>

      <main className="about-content-wrapper">
        
        {/* Company Section */}
        <h2 id="company" className="section-title company-border">Company</h2>
        <div className="about-grid">
          <article className="about-card" onClick={() => handleCardClick('about')}>
            <img src={images.about} className="card-img" alt="NeverDue Office" />
            <div className="card-body">
              <h3>About NeverDue</h3>
              <p>A software house founded on the principle that excellence should never be overdue. We deliver high-end cloud and AI solutions.</p>
              {activeCard === 'about' && (
                <div className="card-expanded">
                  <p><strong>Founded:</strong> 2020</p>
                  <p><strong>Headquarters:</strong> Global Remote</p>
                  <p><strong>Team Size:</strong> 50+ Engineers</p>
                  <p><strong>Specialties:</strong> Cloud Architecture, AI/ML, DevOps</p>
                </div>
              )}
            </div>
          </article>

          <article className="about-card" onClick={() => navigate('/about/mission-vision')} style={{ cursor: 'pointer' }}>
            <img src={images.mission} className="card-img" alt="Mission" />
            <div className="card-body">
              <h3>Mission & Vision</h3>
              <p>To lead the digital frontier by creating software that thinks ahead, scales globally, and empowers every user.</p>
              <div className="card-expanded">
                <p><strong>Mission:</strong> Deliver excellence on time, every time</p>
                <p><strong>Vision:</strong> Global leader in innovative software solutions</p>
                <p><strong>Values:</strong> Innovation, Quality, Integrity, Collaboration</p>
                <p style={{ marginTop: '15px', color: '#db2777', fontWeight: '600' }}>Click to learn more →</p>
              </div>
            </div>
          </article>

          <article className="about-card" onClick={() => navigate('/about/our-director')} style={{ cursor: 'pointer' }}>
            <img src={images.director} className="card-img" alt="Director" />
            <div className="card-body">
              <h3>Our Director</h3>
              <p>Led by industry veterans committed to architectural integrity and developer growth across global markets.</p>
              <div className="card-expanded">
                <p><strong>Leadership Team:</strong> 15+ years combined experience</p>
                <p><strong>Background:</strong> Tech giants & successful startups</p>
                <p><strong>Focus:</strong> Technical excellence & team development</p>
                <p style={{ marginTop: '15px', color: '#db2777', fontWeight: '600' }}>Click to learn more →</p>
              </div>
            </div>
          </article>
        </div>

        {/* Join Us Section */}
        <h2 id="join" className="section-title join-border" style={{ marginTop: '100px' }}>How to Join Us</h2>
        <div className="about-row-grid">
          <div className="about-card row-card" onClick={() => navigate('/about/life-at-neverdue')} style={{ cursor: 'pointer' }}>
            <img src={images.culture} className="row-card-img" alt="Office Culture" />
            <div className="card-body">
              <h3>Life at NeverDue</h3>
              <p>Flexible hours, a focus on deep work, and a culture of continuous technical learning.</p>
              <div className="card-expanded">
                <p><strong>Benefits:</strong> Remote work, flexible hours, learning budget</p>
                <p><strong>Perks:</strong> Latest tech stack, conference passes, team events</p>
                <p><strong>Growth:</strong> Mentorship programs, skill development</p>
                <p style={{ marginTop: '15px', color: '#db2777', fontWeight: '600' }}>Click to learn more →</p>
              </div>
            </div>
          </div>

          <div className="about-card row-card" onClick={() => handleCardClick('university')}>
            <img src={images.university} className="row-card-img" alt="University Program" />
            <div className="card-body">
              <h3>University Program</h3>
              <p>We scout top talents for our elite internship cohorts every semester from global universities.</p>
              {activeCard === 'university' && (
                <div className="card-expanded">
                  <p><strong>Duration:</strong> 3-6 months internship programs</p>
                  <p><strong>Opportunities:</strong> Real projects, mentorship, full-time offers</p>
                  <p><strong>Apply:</strong> careers@neverdue.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Partner Section */}
        <h2 id="partner" className="section-title partner-border" style={{ marginTop: '100px' }}>Partner</h2>
        <div className="about-card partner-feature">
          <img src={images.partner} className="partner-img" alt="Partnerships" />
          <div className="partner-text">
            <h3>Collaborate With Us</h3>
            <p>
              We partner with global technology leaders to integrate the best stacks. 
              Whether you are a startup or a tech giant, let's build the future together.
            </p>
            <button className="btn-partner" onClick={handlePartnerClick}>Become a Partner</button>
          </div>
        </div>

      </main>
    </div>
  );
};

export default About;
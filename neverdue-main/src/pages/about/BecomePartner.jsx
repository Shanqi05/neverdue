import React, { useEffect } from 'react';
import { Handshake, CheckCircle, Globe, Zap, Users, TrendingUp, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const BecomePartner = () => {
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
        backgroundImage: `url(https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="about-hero-content">
          <Handshake size={64} color="#fff" />
          <h1>Become a Partner</h1>
          <p>Join our global partner network and build the future of technology together.</p>
        </div>
      </section>

      <main className="about-content">
        <section className="intro-section">
          <h2>Partnership Opportunities</h2>
          <p className="intro-text">
            At NeverDue, we believe in the power of collaboration. We're looking for strategic partners 
            who share our vision for innovation and excellence in software development.
          </p>
        </section>

        <section className="about-section">
          <h2>Partnership Benefits</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <Globe size={40} color="#db2777" />
              <h3>Global Reach</h3>
              <p>Access to our worldwide network of clients and technology experts across multiple industries.</p>
            </div>
            <div className="overview-card">
              <Zap size={40} color="#db2777" />
              <h3>Innovation Access</h3>
              <p>Early access to our latest technologies, tools, and cutting-edge development practices.</p>
            </div>
            <div className="overview-card">
              <Users size={40} color="#db2777" />
              <h3>Co-Development</h3>
              <p>Collaborate on joint projects and share technical expertise to create innovative solutions.</p>
            </div>
            <div className="overview-card">
              <TrendingUp size={40} color="#db2777" />
              <h3>Revenue Growth</h3>
              <p>Unlock new revenue streams through co-marketing and joint go-to-market strategies.</p>
            </div>
          </div>
        </section>

        <section className="partnership-types">
          <h2>Partnership Types</h2>
          <div className="partnership-grid">
            <div className="partnership-card">
              <h3>Technology Partners</h3>
              <p className="partnership-desc">Integrate your technology with our platform and solutions.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> API and SDK integration</li>
                <li><CheckCircle size={18} color="#10b981" /> Joint technical documentation</li>
                <li><CheckCircle size={18} color="#10b981" /> Co-branded solutions</li>
                <li><CheckCircle size={18} color="#10b981" /> Technical support collaboration</li>
              </ul>
            </div>

            <div className="partnership-card">
              <h3>Solution Partners</h3>
              <p className="partnership-desc">Deliver comprehensive solutions to clients together.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> Joint project delivery</li>
                <li><CheckCircle size={18} color="#10b981" /> Shared client engagements</li>
                <li><CheckCircle size={18} color="#10b981" /> Co-marketing opportunities</li>
                <li><CheckCircle size={18} color="#10b981" /> Revenue sharing models</li>
              </ul>
            </div>

            <div className="partnership-card">
              <h3>Referral Partners</h3>
              <p className="partnership-desc">Refer clients and earn attractive commissions.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> Generous referral fees</li>
                <li><CheckCircle size={18} color="#10b981" /> Sales enablement materials</li>
                <li><CheckCircle size={18} color="#10b981" /> Dedicated partner support</li>
                <li><CheckCircle size={18} color="#10b981" /> Ongoing commission tracking</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="partner-requirements">
          <h2>Partner Requirements</h2>
          <div className="requirements-grid">
            <div className="requirement-item">
              <div className="requirement-icon">✓</div>
              <div>
                <h4>Proven Track Record</h4>
                <p>Demonstrated success in your industry with a portfolio of successful projects.</p>
              </div>
            </div>
            <div className="requirement-item">
              <div className="requirement-icon">✓</div>
              <div>
                <h4>Shared Values</h4>
                <p>Commitment to quality, innovation, and customer success that aligns with ours.</p>
              </div>
            </div>
            <div className="requirement-item">
              <div className="requirement-icon">✓</div>
              <div>
                <h4>Technical Excellence</h4>
                <p>Strong technical capabilities and expertise in modern software development.</p>
              </div>
            </div>
            <div className="requirement-item">
              <div className="requirement-icon">✓</div>
              <div>
                <h4>Growth Mindset</h4>
                <p>Eagerness to grow together and explore new opportunities in the market.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="partner-contact">
          <h2>Start Your Partnership Journey</h2>
          <p>Interested in partnering with NeverDue? We'd love to hear from you.</p>
          <div className="contact-info">
            <div className="contact-item">
              <h4>Email Us</h4>
              <a href="mailto:partners@neverdue.com">partners@neverdue.com</a>
            </div>
            <div className="contact-item">
              <h4>Partnership Team</h4>
              <p>Our dedicated team will respond within 24 hours</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BecomePartner;

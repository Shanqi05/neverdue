import React, { useEffect } from 'react';
import { Users, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';
import m1 from "../../assets/m1_cx.jpeg";
import m2 from "../../assets/m2_sq.jpeg";
import m3 from "../../assets/m3_st.jpeg";
import m4 from "../../assets/m4_xy.jpeg";



const OurDirector = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const directors = [
    {
      name: 'Choo Xuan',
      title: 'Chief Executive Officer',
      image: m1,
      bio: '15+ years leading engineering teams at Fortune 500 companies. Expert in cloud architecture and AI/ML systems.',
      expertise: ['Cloud Architecture', 'AI/ML Strategy', 'Enterprise Systems'],
      linkedin: 'http://linkedin.com/in/chxuan'
    },
    {
      name: 'Tan Xiang Huey',
      title: 'Chief Technology Officer',
      image: m3,
      bio: 'Former Principal Engineer at tech giants. Passionate about scalable systems and developer productivity.',
      expertise: ['System Architecture', 'DevOps', 'Microservices'],
      linkedin: 'http://linkedin.com/in/xianghuey'
    },
    {
      name: 'Tan Shan Qi',
      title: 'Chief Financial Officer',
      image: m2,
      bio: 'Strategic financial leader with expertise in scaling tech companies from startup to IPO. MBA from Harvard Business School.',
      expertise: ['Financial Strategy', 'M&A', 'Investor Relations'],
      linkedin: 'http://linkedin.com/in/tanshanqi'
    },
    {
      name: 'Ng Xin Yuan',
      title: 'Chief Commercial Officer',
      image: m4,
      bio: 'Led commercial strategy and business growth initiatives, driving revenue expansion through partnerships, sales optimization, and market development.',
      expertise: ['Business Strategy', 'Revenue Growth', 'Partnership Development', 'Market Expansion'],
      linkedin: 'http://linkedin.com/in/ng-xin-yuan-234ab8399'
    }
  ];

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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="about-hero-content">
          <Users size={64} color="#fff" />
          <h1>Our Leadership</h1>
          <p>Industry veterans committed to architectural integrity and developer growth across global markets.</p>
        </div>
      </section>

      <main className="about-content">
        <section className="intro-section">
          <h2>Meet Our Leadership Team</h2>
          <p className="intro-text">
            Our directors bring decades of combined experience from leading tech companies worldwide. 
            They've built products used by millions, led engineering teams through complex transformations, 
            and are deeply committed to technical excellence and innovation.
          </p>
        </section>

        <section className="directors-section">
          {directors.map((director, index) => (
            <div key={index} className="director-card">
              <div className="director-image">
                <img src={director.image} alt={director.name} />
              </div>
              <div className="director-info">
                <h3>{director.name}</h3>
                <p className="director-title">{director.title}</p>
                <p className="director-bio">{director.bio}</p>
                <div className="director-expertise">
                  <strong>Expertise:</strong>
                  <div className="expertise-tags">
                    {director.expertise.map((skill, i) => (
                      <span key={i} className="expertise-tag">{skill}</span>
                    ))}
                  </div>
                </div>
                <div className="director-linkedin">
                  <strong>LinkedIn:</strong> <a href={director.linkedin} target="_blank" rel="noopener noreferrer">{director.linkedin}</a>
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="leadership-stats">
          <h2>Leadership by Numbers</h2>
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-number">60+</div>
              <div className="stat-label">Years Combined Experience</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">15+</div>
              <div className="stat-label">Countries Worked In</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500M+</div>
              <div className="stat-label">Users Impacted</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">100+</div>
              <div className="stat-label">Team Members Led</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OurDirector;

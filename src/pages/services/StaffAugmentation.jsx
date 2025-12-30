import React, { useEffect } from 'react';
import { Users, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';

const StaffAugmentation = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="service-page">
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
      <section className="service-hero" style={{ 
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="service-hero-content">
          <Users size={64} color="#fff" />
          <h1>Staff Augmentation</h1>
          <p>Scale your internal team with our elite senior developers to accelerate your product roadmap.</p>
        </div>
      </section>

      <main className="service-content">
        <section className="service-overview">
          <h2>Why Choose Our Developers</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Senior-Level Expertise</h3>
              <p>All developers have 5+ years of experience in modern tech stacks and enterprise systems.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Flexible Engagement</h3>
              <p>Full-time, part-time, or project-based arrangements tailored to your needs.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Quick Onboarding</h3>
              <p>Developers are ready to contribute within 1-2 weeks with minimal ramp-up time.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Seamless Integration</h3>
              <p>Work directly with your existing teams using your tools, workflows, and processes.</p>
            </div>
          </div>
        </section>

        <section className="service-process">
          <h2>Technical Expertise</h2>
          <div className="tech-grid">
            <div className="tech-category">
              <h3>Frontend</h3>
              <ul>
                <li>React, Vue.js, Angular</li>
                <li>TypeScript, JavaScript</li>
                <li>Next.js, Nuxt.js</li>
                <li>React Native, Flutter</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Backend</h3>
              <ul>
                <li>Node.js, Python, Java</li>
                <li>Go, Rust, .NET</li>
                <li>GraphQL, REST APIs</li>
                <li>Microservices</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Cloud & DevOps</h3>
              <ul>
                <li>AWS, Azure, GCP</li>
                <li>Docker, Kubernetes</li>
                <li>CI/CD Pipelines</li>
                <li>Infrastructure as Code</li>
              </ul>
            </div>
            <div className="tech-category">
              <h3>Data & AI</h3>
              <ul>
                <li>PostgreSQL, MongoDB</li>
                <li>Machine Learning</li>
                <li>Data Engineering</li>
                <li>Analytics Platforms</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default StaffAugmentation;

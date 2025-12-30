import React, { useEffect } from 'react';
import { Code, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';

const CustomEngineering = () => {
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="service-hero-content">
          <Code size={64} color="#fff" />
          <h1>Custom Engineering</h1>
          <p>Tailor-made software solutions designed from the ground up to solve your unique business challenges.</p>
        </div>
      </section>

      <main className="service-content">
        <section className="service-overview">
          <h2>What We Deliver</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Full-Stack Development</h3>
              <p>End-to-end web and mobile applications built with modern frameworks like React, Node.js, Python, and Flutter.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Cloud-Native Architecture</h3>
              <p>Scalable microservices designed for AWS, Azure, and GCP with containerization and orchestration.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>AI/ML Integration</h3>
              <p>Intelligent automation, predictive analytics, and machine learning models integrated into your workflows.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Real-Time Systems</h3>
              <p>WebSocket-based applications, live dashboards, and event-driven architectures for instant data processing.</p>
            </div>
          </div>
        </section>

        <section className="service-process">
          <h2>Our Process</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>Discovery & Planning</h3>
              <p>We dive deep into your business needs, technical requirements, and user expectations.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Architecture Design</h3>
              <p>Our engineers design scalable, secure, and maintainable system architectures.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Agile Development</h3>
              <p>Iterative sprints with continuous delivery and regular stakeholder feedback.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Quality Assurance</h3>
              <p>Comprehensive testing including unit, integration, and end-to-end automated tests.</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Deployment & Support</h3>
              <p>Seamless production deployment with 90-day warranty and ongoing maintenance options.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default CustomEngineering;

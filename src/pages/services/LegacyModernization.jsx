import React, { useEffect } from 'react';
import { Wrench, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './ServicePage.css';

const LegacyModernization = () => {
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="service-hero-content">
          <Wrench size={64} color="#fff" />
          <h1>Legacy Modernization</h1>
          <p>Transform your aging systems into high-performance, cloud-native applications for the modern era.</p>
        </div>
      </section>

      <main className="service-content">
        <section className="service-overview">
          <h2>Modernization Services</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Monolith to Microservices</h3>
              <p>Break down legacy monolithic applications into scalable, independent microservices architecture.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Database Modernization</h3>
              <p>Migrate from outdated databases to modern solutions like PostgreSQL, MongoDB, or cloud-native options.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Cloud Migration</h3>
              <p>Lift-and-shift or re-architect your applications for AWS, Azure, or Google Cloud Platform.</p>
            </div>
            <div className="overview-card">
              <CheckCircle size={32} color="#7c3aed" />
              <h3>Code Refactoring</h3>
              <p>Eliminate technical debt, improve code quality, and implement modern development practices.</p>
            </div>
          </div>
        </section>

        <section className="service-process">
          <h2>Modernization Approach</h2>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">1</div>
              <h3>System Assessment</h3>
              <p>Comprehensive audit of your current infrastructure, codebase, and dependencies.</p>
            </div>
            <div className="process-step">
              <div className="step-number">2</div>
              <h3>Migration Strategy</h3>
              <p>Create a detailed roadmap balancing risk, cost, and business continuity.</p>
            </div>
            <div className="process-step">
              <div className="step-number">3</div>
              <h3>Incremental Migration</h3>
              <p>Phased approach ensuring zero downtime and continuous system availability.</p>
            </div>
            <div className="process-step">
              <div className="step-number">4</div>
              <h3>Testing & Validation</h3>
              <p>Rigorous testing to ensure feature parity and performance improvements.</p>
            </div>
            <div className="process-step">
              <div className="step-number">5</div>
              <h3>Cutover & Optimization</h3>
              <p>Smooth transition to modern systems with performance tuning and monitoring.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LegacyModernization;

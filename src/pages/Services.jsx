// src/pages/Services.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Code, Wrench, Users, Shield, Server, Globe } from 'lucide-react';
import './Services.css';

const Services = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeService, setActiveService] = useState(null);
  const [treesPlanted, setTreesPlanted] = useState(0);
  const [showImpactModal, setShowImpactModal] = useState(false);

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

  // Animate tree counter
  useEffect(() => {
    const targetTrees = 15000; // Total trees planted
    const duration = 2000; // 2 seconds
    const steps = 50;
    const increment = targetTrees / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= targetTrees) {
        setTreesPlanted(targetTrees);
        clearInterval(timer);
      } else {
        setTreesPlanted(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // Handle service card click
  const handleServiceClick = (serviceName) => {
    setActiveService(activeService === serviceName ? null : serviceName);
  };

  // Handle Track Impact button
  const handleTrackImpact = () => {
    setShowImpactModal(true);
    setTimeout(() => setShowImpactModal(false), 5000);
  };

  const images = {
    // High-quality professional tech and nature imagery
    hero: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
    engineering: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80",
    modern: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=800&q=80",
    staff: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80",
    forest: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=800&q=80",
    warranty: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=800&q=80"
  };

  return (
    <div className="services-container">
      {/* --- HERO SECTION --- */}
      <section 
        className="services-hero" 
        style={{ backgroundImage: `linear-gradient(rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.8)), url(${images.hero})` }}
      >
        <div className="services-hero-content">
          <h1>Services & Impact</h1>
          <p>Expert software engineering paired with a commitment to a greener planet.</p>
        </div>
      </section>

      <main className="services-wrapper">
        
        {/* --- SECTION 1: EXPERT SERVICES --- */}
        <h2 id="expert-services" className="service-section-title core-border">Expert Services</h2>
        <div className="services-grid">
          <div 
            className="service-visual-card" 
            onClick={() => navigate('/services/custom-engineering')}
            style={{ cursor: 'pointer' }}
          >
            <img src={images.engineering} className="service-img" alt="Custom Engineering" />
            <div className="service-body">
              <h3><Code size={20} color="#7c3aed"/> Custom Engineering</h3>
              <p>Tailor-made software solutions designed from the ground up to solve your unique business challenges.</p>
              <div className="service-details">
                <ul>
                  <li>Full-stack web & mobile development</li>
                  <li>Cloud-native architecture design</li>
                  <li>AI/ML integration & automation</li>
                  <li>Real-time systems & APIs</li>
                </ul>
                <p style={{ marginTop: '15px', color: '#7c3aed', fontWeight: '600', fontSize: '0.9rem' }}>Click to learn more →</p>
              </div>
            </div>
          </div>

          <div 
            className="service-visual-card" 
            onClick={() => navigate('/services/legacy-modernization')}
            style={{ cursor: 'pointer' }}
          >
            <img src={images.modern} className="service-img" alt="Modernization" />
            <div className="service-body">
              <h3><Wrench size={20} color="#7c3aed"/> Legacy Modernization</h3>
              <p>We transform your aging systems into high-performance, cloud-native applications for the modern era.</p>
              <div className="service-details">
                <ul>
                  <li>Monolith to microservices migration</li>
                  <li>Database modernization & optimization</li>
                  <li>Cloud migration (AWS, Azure, GCP)</li>
                  <li>Code refactoring & technical debt reduction</li>
                </ul>
                <p style={{ marginTop: '15px', color: '#7c3aed', fontWeight: '600', fontSize: '0.9rem' }}>Click to learn more →</p>
              </div>
            </div>
          </div>

          <div 
            className="service-visual-card" 
            onClick={() => navigate('/services/staff-augmentation')}
            style={{ cursor: 'pointer' }}
          >
            <img src={images.staff} className="service-img" alt="Staff Augmentation" />
            <div className="service-body">
              <h3><Users size={20} color="#7c3aed"/> Staff Augmentation</h3>
              <p>Scale your internal team with our elite senior developers to accelerate your product roadmap.</p>
              <div className="service-details">
                <ul>
                  <li>Senior developers (5+ years experience)</li>
                  <li>Flexible engagement models</li>
                  <li>Quick onboarding (1-2 weeks)</li>
                  <li>Full-time or part-time availability</li>
                </ul>
                <p style={{ marginTop: '15px', color: '#7c3aed', fontWeight: '600', fontSize: '0.9rem' }}>Click to learn more →</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- SECTION 2: GREEN INITIATIVE (The Unrelated Attraction) --- */}
        <h2 id="green" className="service-section-title green-border" style={{ marginTop: '100px' }}>Green Initiative</h2>
        <div className="impact-feature">
          <img src={images.forest} className="impact-img" alt="NeverDue Digital Forest" />
          <div className="impact-content">
            <h3 style={{ fontSize: '2.2rem', color: '#065f46', marginBottom: '20px' }}>The Digital Forest</h3>
            <p style={{ color: '#047857', lineHeight: '1.8', fontSize: '1.1rem', marginBottom: '20px' }}>
              We believe in leaving a footprint in the digital world, not the physical one. For every project milestone we hit, 
              NeverDue plants 100 trees in reforestation zones across the globe. 
              <br /><br />
              When you build your software with us, you aren't just scaling your business—you're helping us scale the planet's lungs.
            </p>
            <div style={{ padding: '20px', backgroundColor: '#d1fae5', borderRadius: '12px', marginBottom: '20px' }}>
              <h4 style={{ color: '#065f46', marginBottom: '10px' }}>🌳 Trees Planted: {treesPlanted.toLocaleString()}</h4>
              <p style={{ color: '#047857', fontSize: '0.95rem' }}>Across 12 countries | 500+ hectares reforested</p>
            </div>
            <button 
              onClick={handleTrackImpact}
              style={{ padding: '14px 28px', backgroundColor: '#059669', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '700', cursor: 'pointer', transition: 'all 0.3s' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#047857'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#059669'}
            >
              Track Our Impact
            </button>
            {showImpactModal && (
              <div style={{ marginTop: '20px', padding: '20px', backgroundColor: '#fff', border: '2px solid #059669', borderRadius: '12px', animation: 'fadeIn 0.3s' }}>
                <h4 style={{ color: '#065f46', marginBottom: '15px' }}>🌍 Global Impact Dashboard</h4>
                <p style={{ color: '#047857', marginBottom: '10px' }}>✓ Active Projects: 25</p>
                <p style={{ color: '#047857', marginBottom: '10px' }}>✓ Carbon Offset: 3,500 tons/year</p>
                <p style={{ color: '#047857', marginBottom: '10px' }}>✓ Wildlife Habitats Restored: 8</p>
                <p style={{ color: '#047857', fontSize: '0.9rem', marginTop: '15px' }}>Next milestone: 20,000 trees by Q1 2026</p>
              </div>
            )}
          </div>
        </div>

        {/* --- SECTION 3: SERVICE WARRANTY --- */}
        <h2 id="warranty" className="service-section-title warranty-border">Service Warranty</h2>
        <div className="warranty-box" style={{ alignItems: 'center' }}>
          <img src={images.warranty} style={{ width: '100%', maxWidth: '300px', borderRadius: '12px', display: 'block' }} alt="Security" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '30px', flex: 1 }}>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', marginBottom: '15px' }}>
                <Shield size={24} color="#10b981" /> 90-Day Assurance
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                Every line of custom code we deliver is covered by a 90-day comprehensive bug-fix guarantee. If it breaks, we fix it at zero cost.
              </p>
            </div>
            <div>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#1e293b', marginBottom: '15px' }}>
                <Server size={24} color="#10b981" /> Performance SLA
              </h3>
              <p style={{ color: '#64748b', lineHeight: '1.6' }}>
                We guarantee 99.9% uptime and enterprise-grade performance for all cloud infrastructures managed by our engineering teams.
              </p>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
};

export default Services;
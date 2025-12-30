import React, { useEffect } from 'react';
import { Rocket, Coffee, BookOpen, Globe, Heart, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const LifeAtNeverDue = () => {
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
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="about-hero-content">
          <Rocket size={64} color="#fff" />
          <h1>Life at NeverDue</h1>
          <p>Flexible hours, a focus on deep work, and a culture of continuous technical learning.</p>
        </div>
      </section>

      <main className="about-content">
        <section className="culture-section">
          <h2>Our Culture</h2>
          <div className="culture-grid">
            <div className="culture-card">
              <Globe size={40} color="#db2777" />
              <h3>Remote-First</h3>
              <p>Work from anywhere in the world. We believe great talent isn't limited by geography.</p>
            </div>
            <div className="culture-card">
              <Coffee size={40} color="#db2777" />
              <h3>Flexible Hours</h3>
              <p>Choose your own schedule. We focus on output and impact, not time at desk.</p>
            </div>
            <div className="culture-card">
              <BookOpen size={40} color="#db2777" />
              <h3>Continuous Learning</h3>
              <p>Annual learning budget, conference passes, and dedicated study time every week.</p>
            </div>
            <div className="culture-card">
              <Heart size={40} color="#db2777" />
              <h3>Work-Life Balance</h3>
              <p>Generous PTO, mental health days, and a culture that respects personal time.</p>
            </div>
          </div>
        </section>

        <section className="benefits-section">
          <h2>Benefits & Perks</h2>
          <div className="benefits-two-col">
            <div className="benefits-col">
              <h3>💰 Compensation</h3>
              <ul>
                <li>Competitive salary packages</li>
                <li>Performance bonuses</li>
                <li>Stock options for senior roles</li>
                <li>Annual salary reviews</li>
              </ul>

              <h3>🏥 Health & Wellness</h3>
              <ul>
                <li>Comprehensive health insurance</li>
                <li>Mental health support</li>
                <li>Gym membership reimbursement</li>
                <li>Wellness stipend</li>
              </ul>

              <h3>📚 Growth & Development</h3>
              <ul>
                <li>$2,000 annual learning budget</li>
                <li>Conference and event passes</li>
                <li>Internal training programs</li>
                <li>Mentorship opportunities</li>
              </ul>
            </div>

            <div className="benefits-col">
              <h3>💻 Equipment & Tools</h3>
              <ul>
                <li>Latest MacBook Pro or equivalent</li>
                <li>Monitor and accessories</li>
                <li>Premium software licenses</li>
                <li>Home office setup stipend</li>
              </ul>

              <h3>🌴 Time Off</h3>
              <ul>
                <li>25 days paid vacation</li>
                <li>10 public holidays</li>
                <li>5 mental health days</li>
                <li>Parental leave</li>
              </ul>

              <h3>🎉 Team Culture</h3>
              <ul>
                <li>Annual team retreats</li>
                <li>Virtual social events</li>
                <li>Hackathons and innovation days</li>
                <li>Recognition and awards programs</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="testimonials-section">
          <h2>What Our Team Says</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Best engineering culture I've ever experienced. The focus on quality and learning is unmatched."
              </p>
              <div className="testimonial-author">
                <strong>Alex Kumar</strong>
                <span>Senior Full-Stack Engineer</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "The flexibility and trust given to us allows me to do my best work while maintaining a healthy life balance."
              </p>
              <div className="testimonial-author">
                <strong>Maria Santos</strong>
                <span>DevOps Lead</span>
              </div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">
                "Working on cutting-edge projects with brilliant people. Every day is a learning opportunity."
              </p>
              <div className="testimonial-author">
                <strong>James Park</strong>
                <span>ML Engineer</span>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default LifeAtNeverDue;

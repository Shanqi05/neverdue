import React, { useEffect } from 'react';
import { GraduationCap, CheckCircle, BookOpen, Users, Award, Lightbulb, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './AboutPage.css';

const UniversityProgram = () => {
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
        backgroundImage: `url(https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1600&q=80)` 
      }}>
        <div className="about-hero-content">
          <GraduationCap size={64} color="#fff" />
          <h1>University Program</h1>
          <p>Empowering the next generation of tech innovators through education and real-world experience.</p>
        </div>
      </section>

      <main className="about-content">
        <section className="intro-section">
          <h2>Building Tomorrow's Talent Today</h2>
          <p className="intro-text">
            Our University Program bridges the gap between academic learning and industry practice. 
            We partner with leading universities worldwide to provide students with hands-on experience, 
            mentorship, and opportunities to work on cutting-edge technology projects.
          </p>
        </section>

        <section className="about-section">
          <h2>Program Benefits</h2>
          <div className="overview-grid">
            <div className="overview-card">
              <BookOpen size={40} color="#db2777" />
              <h3>Real-World Projects</h3>
              <p>Work on actual client projects and gain practical experience with modern development practices.</p>
            </div>
            <div className="overview-card">
              <Users size={40} color="#db2777" />
              <h3>Industry Mentorship</h3>
              <p>Learn directly from experienced professionals and receive personalized career guidance.</p>
            </div>
            <div className="overview-card">
              <Lightbulb size={40} color="#db2777" />
              <h3>Innovation Labs</h3>
              <p>Access to our technology labs and resources to experiment with emerging technologies.</p>
            </div>
            <div className="overview-card">
              <Award size={40} color="#db2777" />
              <h3>Career Opportunities</h3>
              <p>Outstanding students receive internship and full-time employment opportunities.</p>
            </div>
          </div>
        </section>

        <section className="partnership-types">
          <h2>Program Tracks</h2>
          <div className="partnership-grid">
            <div className="partnership-card">
              <h3>Internship Program</h3>
              <p className="partnership-desc">Summer and semester-long internships with our development teams.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> 3-6 month placements</li>
                <li><CheckCircle size={18} color="#10b981" /> Competitive stipend</li>
                <li><CheckCircle size={18} color="#10b981" /> Full-stack development experience</li>
                <li><CheckCircle size={18} color="#10b981" /> Professional certification upon completion</li>
              </ul>
            </div>

            <div className="partnership-card">
              <h3>Research Collaboration</h3>
              <p className="partnership-desc">Partner with us on cutting-edge research projects.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> Access to industry datasets</li>
                <li><CheckCircle size={18} color="#10b981" /> Co-authorship opportunities</li>
                <li><CheckCircle size={18} color="#10b981" /> Conference sponsorship</li>
                <li><CheckCircle size={18} color="#10b981" /> Research funding support</li>
              </ul>
            </div>

            <div className="partnership-card">
              <h3>Capstone Projects</h3>
              <p className="partnership-desc">Final year students work on real company challenges.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> Industry-relevant problem statements</li>
                <li><CheckCircle size={18} color="#10b981" /> Technical guidance from experts</li>
                <li><CheckCircle size={18} color="#10b981" /> Showcase at tech conferences</li>
                <li><CheckCircle size={18} color="#10b981" /> Project deployment opportunities</li>
              </ul>
            </div>

            <div className="partnership-card">
              <h3>Campus Ambassador</h3>
              <p className="partnership-desc">Become the face of NeverDue at your university.</p>
              <ul className="partnership-list">
                <li><CheckCircle size={18} color="#10b981" /> Organize tech workshops and events</li>
                <li><CheckCircle size={18} color="#10b981" /> Exclusive networking opportunities</li>
                <li><CheckCircle size={18} color="#10b981" /> Leadership development</li>
                <li><CheckCircle size={18} color="#10b981" /> Resume building experience</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Eligibility & Requirements</h2>
          <p className="intro-text" style={{ marginBottom: '2.5rem' }}>
            We're looking for passionate students who are ready to take their skills to the next level and make an impact in the tech industry.
          </p>
          <div className="overview-grid">
            <div className="overview-card">
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  1
                </div>
              </div>
              <h3>Academic Standing</h3>
              <p>Currently enrolled in a bachelor's or master's program in Computer Science, Software Engineering, or related field with a strong academic record.</p>
            </div>
            <div className="overview-card">
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  2
                </div>
              </div>
              <h3>Technical Skills</h3>
              <p>Proficiency in programming languages like Java, Python, or JavaScript, along with understanding of data structures, algorithms, and software development principles.</p>
            </div>
            <div className="overview-card">
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  3
                </div>
              </div>
              <h3>Passion for Learning</h3>
              <p>Demonstrated curiosity and enthusiasm for emerging technologies, with a proven track record of self-learning and personal projects.</p>
            </div>
            <div className="overview-card">
              <div style={{ marginBottom: '1rem' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '12px', 
                  background: 'linear-gradient(135deg, #db2777 0%, #ec4899 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: 'white'
                }}>
                  4
                </div>
              </div>
              <h3>Time Commitment</h3>
              <p>Ability to dedicate minimum 20-40 hours per week for internships and complete the full program duration with consistent engagement.</p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>Partner Universities</h2>
          <p className="intro-text">
            We collaborate with top universities globally to provide students with world-class learning opportunities. 
            If your university is interested in partnering with us, we'd love to hear from you.
          </p>
          <div className="stats-grid" style={{ marginTop: '3rem' }}>
            <div className="stat-card">
              <div className="stat-number">50+</div>
              <div className="stat-label">Partner Universities</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">500+</div>
              <div className="stat-label">Students Trained</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">85%</div>
              <div className="stat-label">Placement Rate</div>
            </div>
            <div className="stat-card">
              <div className="stat-number">30+</div>
              <div className="stat-label">Countries Represented</div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default UniversityProgram;

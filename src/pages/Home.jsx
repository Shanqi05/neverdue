import React, { useRef, useEffect, useState } from 'react';
import SliderImport from "react-slick";
import { Link } from 'react-router-dom';
import { Play, ChevronDown } from 'lucide-react';
import WorldGlobe from '../components/WorldGlobe';
import neverDueVideo from '../assets/NeverDue.mp4';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './Home.css';

const Home = () => {
  const Slider = SliderImport.default ? SliderImport.default : SliderImport;
  const sliderRef = useRef(null);
  const videoRef = useRef(null);

  // --- STATE ---
  const [currentSlide, setCurrentSlide] = useState(0);

  // ==========================================
  // SMOOTH SCROLL LOGIC
  // ==========================================
  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;

      let targetSlide = 0;

      if (scrollY < vh * 0.8) {
        targetSlide = 0;
      } else if (scrollY >= vh * 0.8 && scrollY < vh * 1.8) {
        targetSlide = 1;
      } else {
        targetSlide = 2;
      }

      if (targetSlide !== currentSlide && targetSlide <= 2) {
        setCurrentSlide(targetSlide);
        if (sliderRef.current) {
          sliderRef.current.slickGoTo(targetSlide);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentSlide]);

  // ==========================================
  //  VIDEO COVER LOGIC
  // ==========================================
  useEffect(() => {
    const videoElement = videoRef.current;

    const handleLoadedMetadata = () => {
      if (videoElement && videoElement.paused) {
        videoElement.currentTime = 0.1;
      }
    };

    if (videoElement) {
      videoElement.addEventListener('loadedmetadata', handleLoadedMetadata);
    }

    // 清理监听器
    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadedmetadata', handleLoadedMetadata);
      }
    };
  }, []);


  // --- HANDLERS (保持不变) ---
  const handleDotClick = (index) => {
    const vh = window.innerHeight;
    let targetScrollY = 0;
    if (index === 1) targetScrollY = vh;
    if (index === 2) targetScrollY = vh * 2;

    window.scrollTo({ top: targetScrollY, behavior: 'smooth' });
  };

  const handleArrowClick = () => {
    window.scrollBy({ top: window.innerHeight, behavior: 'smooth' });
  };


  // ==========================================
  // DATA
  // ==========================================
  const heroProducts = [
    {
      id: 1,
      title: "CloudStack Pro",
      subtitle: "Cloud Infrastructure",
      description: "All-in-one cloud infrastructure management platform.",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1920&q=80",
      link: "/products/1"
    },
    {
      id: 4,
      title: "SecureShield Suite",
      subtitle: "Cybersecurity",
      description: "Comprehensive cybersecurity against malware and phishing.",
      image: "https://images.unsplash.com/photo-1558346490-a72e53ae2d4f?auto=format&fit=crop&w=1920&q=80",
      link: "/products/4"
    },
    {
      id: 7,
      title: "InsightAI Analytics",
      subtitle: "AI & Data",
      description: "Transform raw data into actionable business insights.",
      image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&w=1920&q=80",
      link: "/products/7"
    }
  ];

  const settings = {
    dots: false, infinite: false, speed: 800, slidesToShow: 1, slidesToScroll: 1, autoplay: false, fade: true, arrows: false, draggable: false, waitForAnimate: false
  };

  return (
    <div className="home-page">

      {/* 1. HERO SCROLL WRAPPER (保持不变) */}
      <div className="hero-scroll-wrapper">
        <div className="sticky-slider-container">
          <div className="left-navigation-sidebar">
            <div className="scroll-indicators">
              {heroProducts.map((_, index) => (
                <div
                  key={index}
                  className={`indicator-dot ${currentSlide === index ? 'active' : ''}`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
            </div>
            <div className="scroll-arrow-container" onClick={handleArrowClick}>
               <ChevronDown size={24} strokeWidth={3} />
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {heroProducts.map((p) => (
              <div key={p.id} className="hero-slide">
                <div className="slide-bg" style={{ backgroundImage: `url(${p.image})` }}></div>
                <div className="slide-content-overlay">
                  <div className="slide-content">
                    <h2>{p.subtitle}</h2>
                    <h1 className="gradient-text">{p.title}</h1>
                    <p>{p.description}</p>
                    <Link to={p.link}>
                      <button className="hero-cta-btn">Learn More</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* 3. CONTENT BELOW */}
      <div className="content-below-hero">
        <section className="globe-section">
          <div className="section-header-dark">
            <h2>Global Connectivity</h2>
            <p>Our infrastructure connects major hubs worldwide with zero packet loss.</p>
          </div>
          <WorldGlobe />
          <div className="stats-row">
             <div className="stat-item"><h3>7</h3><p>Continents</p></div>
             <div className="stat-item"><h3>50ms</h3><p>Avg Latency</p></div>
             <div className="stat-item"><h3>99.9%</h3><p>Uptime</p></div>
          </div>
        </section>

        {/* VIDEO SECTION  */}
        <section className="video-section">
          <div className="video-container">
            <video
              ref={videoRef}
              width="100%"
              height="100%"
              controls
              preload="metadata"
              style={{
                borderRadius: '20px',
                objectFit: 'cover',
                backgroundColor: '#000'
              }}
            >
              <source src={neverDueVideo} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
        {/*  VIDEO SECTION  */}

      </div>

    </div>
  );
};

export default Home;
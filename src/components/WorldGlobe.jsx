import React, { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

const WorldGlobe = () => {
  const globeEl = useRef();
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // 1. Define major city coordinates (Hubs)
  const hubs = [
    { name: "San Francisco", lat: 37.77, lng: -122.41 },
    { name: "New York", lat: 40.71, lng: -74.00 },
    { name: "London", lat: 51.50, lng: -0.12 },
    { name: "Singapore", lat: 1.35, lng: 103.81 },
    { name: "Tokyo", lat: 35.67, lng: 139.65 },
    { name: "Sydney", lat: -33.86, lng: 151.20 },
    { name: "Sao Paulo", lat: -23.55, lng: -46.63 }
  ];

  // 2. Generate Arcs - Connect only between these cities
  const arcsData = [
    { start: "San Francisco", end: "New York" },
    { start: "New York", end: "London" },
    { start: "London", end: "Singapore" },
    { start: "Singapore", end: "Tokyo" },
    { start: "Tokyo", end: "San Francisco" },
    { start: "Sydney", end: "Singapore" },
    { start: "Sao Paulo", end: "New York" }
  ].map(link => {
    const src = hubs.find(h => h.name === link.start);
    const dst = hubs.find(h => h.name === link.end);
    return {
      startLat: src.lat, startLng: src.lng,
      endLat: dst.lat, endLng: dst.lng,
      color: [['#ffaa00', '#aa00ff'][Math.round(Math.random())], '#00c7fd'] // Gradient color
    };
  });

  // 3. Landing Effect (Rings) - Generate ripple effects at each city location
  const ringsData = hubs.map(hub => ({
    lat: hub.lat,
    lng: hub.lng,
    maxR: 8, // Maximum ripple radius
    propagationSpeed: 2, // Propagation speed
    repeatPeriod: 800 // Repetition period
  }));

  useEffect(() => {
    if (globeEl.current) {
      globeEl.current.controls().autoRotate = true;
      globeEl.current.controls().autoRotateSpeed = 0.6;
      globeEl.current.pointOfView({ lat: 20, lng: 0, altitude: 2.5 });
    }
    // Listen for window resize to adjust globe size
    window.addEventListener('resize', () => setWindowWidth(window.innerWidth));
  }, []);

  return (
    <div style={{ width: '100%', height: '600px', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#020617' }}>
      <Globe
        ref={globeEl}
        width={windowWidth > 1200 ? 1000 : windowWidth} // Responsive width
        height={600}
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
        bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
        backgroundColor="rgba(0,0,0,0)" // Transparent background

        // Atmosphere effect (Deep Blue)
        atmosphereColor="#3a86ff"
        atmosphereAltitude={0.2}

        // Arcs configuration
        arcsData={arcsData}
        arcColor={'color'}
        arcDashLength={0.4}
        arcDashGap={0.2}
        arcDashAnimateTime={2000} // Moderate speed
        arcStroke={0.5}

        // Rings configuration (Mimicking the visual effect you provided)
        ringsData={ringsData}
        ringColor={() => (t) => `rgba(255, 160, 0, ${1 - t})`} // Orange (#ffa000) fading out
        ringMaxRadius="maxR"
        ringPropagationSpeed="propagationSpeed"
        ringRepeatPeriod="repeatPeriod"
      />
    </div>
  );
};

export default WorldGlobe;
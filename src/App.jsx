import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import PropertyCarousel from './components/PropertyCarousel';
import Footer from './components/Footer';
import Project from './components/Project';
import DivineLogo from './assets/images/Divine.png';

// ── Splash Screen Component ──────────────────────────────────────────────────
function SplashScreen({ onFinish }) {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 4200);
    const doneTimer = setTimeout(() => onFinish(), 5000);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [onFinish]);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1208 50%, #0a0a0a 100%)',
        transition: 'opacity 0.8s ease',
        opacity: fadeOut ? 0 : 1,
        pointerEvents: fadeOut ? 'none' : 'all',
      }}
    >
      <div style={{
        position: 'absolute', width: '400px', height: '400px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(212,175,55,0.18) 0%, transparent 70%)',
        animation: 'pulse 2s ease-in-out infinite',
      }} />

      <img src={DivineLogo} alt="Divine Dwellings" style={{
        width: '50vw', maxWidth: '480px', minWidth: '200px',
        position: 'relative', zIndex: 1,
        animation: 'logoReveal 0.9s cubic-bezier(0.22,1,0.36,1) forwards',
        opacity: 0,
        filter: 'drop-shadow(0 8px 32px rgba(212,175,55,0.35))',
      }} />

      <div style={{
        marginTop: '48px', width: '220px', height: '3px', borderRadius: '99px',
        background: 'rgba(255,255,255,0.08)', overflow: 'hidden',
        position: 'relative', zIndex: 1,
      }}>
        <div style={{
          height: '100%', borderRadius: '99px',
          background: 'linear-gradient(90deg, #c8a84b, #f0d080, #c8a84b)',
          backgroundSize: '200% 100%',
          animation: 'loaderFill 4.2s cubic-bezier(0.4,0,0.2,1) forwards, shimmer 1.4s linear infinite',
        }} />
      </div>

      <p style={{
        marginTop: '20px', color: 'rgba(212,175,55,0.7)', fontSize: '13px',
        letterSpacing: '0.25em', textTransform: 'uppercase', fontFamily: 'Georgia, serif',
        position: 'relative', zIndex: 1,
        animation: 'fadeUp 1s 0.6s forwards', opacity: 0,
      }}>
        Luxury Living Redefined
      </p>

      <style>{`
        @keyframes logoReveal {
          from { opacity: 0; transform: scale(0.88) translateY(16px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loaderFill {
          from { width: 0%; }
          to   { width: 100%; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50%       { transform: scale(1.12); opacity: 1; }
        }
      `}</style>
    </div>
  );
}

// ── App ──────────────────────────────────────────────────────────────────────
function App() {
  const [showSplash, setShowSplash] = useState(true);

  // Navigate to Project page in the same window
  const openProject = () => {
    window.location.href = `${window.location.origin}${window.location.pathname}?page=project`;
  };

  // Check if this page was opened as the Project page
  const params = new URLSearchParams(window.location.search);
  const isProjectPage = params.get('page') === 'project';

  // If on project page, render only the Project component
  if (isProjectPage) {
    return <Project />;
  }

  return (
    <div className="App">
      {showSplash && <SplashScreen onFinish={() => setShowSplash(false)} />}

      <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        {/* Pass openProject handler to Navbar */}
        <Navbar onOpenProject={openProject} />

        <section id="home" className="relative">
          <Hero />
        </section>

        <section id="about" className="relative">
          <About />
        </section>

        {/* PropertyCarousel after About */}
        <section id="gallery" className="relative">
          <PropertyCarousel />
        </section>

        <section id="contact" className="relative">
          <Contact />
        </section>

        <Footer />
      </div>
    </div>
  );
}

export default App;
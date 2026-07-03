import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Contact from './components/Contact';
import PropertyCarousel from './components/PropertyCarousel';
import Footer from './components/Footer';
import Project from './components/Project';
import ScrollToTop from './components/ScrollToTop';
import SEO from './components/SEO';
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
  const [showSplash, setShowSplash] = useState(() => {
    // Only show splash screen on home page and only once per session
    const isHomePage = window.location.pathname === '/';
    const splashShown = sessionStorage.getItem('divine_dwellings_splash_shown');
    return isHomePage && !splashShown;
  });

  const handleSplashFinish = () => {
    setShowSplash(false);
    sessionStorage.setItem('divine_dwellings_splash_shown', 'true');
  };

  return (
    <div className="App">
      <ScrollToTop />
      {showSplash && <SplashScreen onFinish={handleSplashFinish} />}

      <div style={{ opacity: showSplash ? 0 : 1, transition: 'opacity 0.6s ease' }}>
        <Navbar />

        <Routes>
          <Route
            path="/"
            element={
              <>
                <SEO
                  title="Luxury Living Redefined"
                  description="Divine Dwellings offers premium luxury living residences, villas, and apartments in prime locations like Barog, Himachal Pradesh. Redefine luxury living with SRS Group."
                  keywords="Divine Dwellings, luxury living, luxury villas Barog, premium residences Himachal Pradesh, SRS Group"
                />
                <section id="home" className="relative">
                  <Hero />
                </section>
                <section id="about" className="relative">
                  <About />
                </section>
                <section id="gallery" className="relative">
                  <PropertyCarousel />
                </section>
                <section id="contact" className="relative">
                  <Contact />
                </section>
              </>
            }
          />
          <Route
            path="/about"
            element={
              <div className="pt-20 sm:pt-24">
                <SEO
                  title="About Us | Luxury Real Estate Developer"
                  description="Redefine your lifestyle with Divine Dwellings. Learn about our 15+ years of experience, 500+ happy families, and high quality building standards."
                  keywords="Divine Dwellings about, luxury developers, real estate experience, happy families real estate"
                />
                <section id="about" className="relative">
                  <About />
                </section>
              </div>
            }
          />
          <Route
            path="/projects"
            element={
              <div className="pt-20 sm:pt-24">
                <SEO
                  title="Our Projects | Premium Developments"
                  description="Discover handpicked luxury properties across prime locations by Divine Dwellings, crafted for premium living."
                  keywords="Divine Dwellings projects, luxury housing projects, premium residential properties"
                />
                <Project />
              </div>
            }
          />
          <Route
            path="/projects/:projectId"
            element={
              <div className="pt-20 sm:pt-24">
                <SEO
                  title="Aashiana Hills | Premium 3 BHK Hill Residences"
                  description="Detailed specifications and layouts for Aashiana Hills in Barog, Himachal Pradesh. 3 BHK stilt + 4 configurations starting at ₹1.6 Cr."
                  keywords="Aashiana Hills Barog, luxury villas Barog, 3 BHK villas Himachal Pradesh"
                />
                <Project />
              </div>
            }
          />
          <Route
            path="/contact"
            element={
              <div className="pt-20 sm:pt-24">
                <SEO
                  title="Contact Us | Book Your Dream Home"
                  description="Inquire about layouts, pricing, and site visits for Divine Dwellings properties. Submit your budget and preferred location today."
                  keywords="contact Divine Dwellings, book luxury home, property inquiry, site visit"
                />
                <section id="contact" className="relative">
                  <Contact />
                </section>
              </div>
            }
          />
        </Routes>

        <Footer />
      </div>
    </div>
  );
}

export default App;
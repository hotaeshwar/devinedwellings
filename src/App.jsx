import React from 'react';
import { Home } from 'lucide-react'; // Import Home icon for footer
import Navbar from './components/Navbar';
import Hero from './components/Hero'; // Hero component active
import About from './components/About'; // About component active
import Contact from './components/Contact'; // Contact component now active
import PropertyCarousel from './components/PropertyCarousel'; // Property carousel component
import Footer from './components/Footer'; // Footer component

function App() {
  return (
    <div className="App">
      {/* Navbar Component */}
      <Navbar />
      
      {/* Hero Section - ACTIVE */}
      <section id="home" className="relative">
        <Hero />
      </section>

      {/* About Section - ACTIVE */}
      <section id="about" className="relative">
        <About />
      </section>

      {/* Contact Section - NOW ACTIVE */}
      <section id="contact" className="relative">
        <Contact />
      </section>

      {/* Property Gallery Section - NEW */}
      <section id="gallery" className="relative">
        <PropertyCarousel />
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import './Hero.css';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    '/Gemini_Generated_Image_6eiau96eiau96eia.png',
    '/Gemini_Generated_Image_hvu5aohvu5aohvu5.png',
    '/image.webp'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 7000);

    return () => clearInterval(interval);
  }, []);

  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="hero">
      <div className="hero-background">
        {images.map((image, index) => (
          <div
            key={index}
            className={`hero-background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
          />
        ))}
      </div>
      <div className="hero-overlay"></div>
      <div className="container hero-container">
        <div className="hero-content">
          <h1 className="hero-title">
            Protecting Your Interests<br />in Every Build
          </h1>
          <p className="hero-subtitle">
            We are a professional project management firm. We do not build.<br />
            We manage, coordinate, supervise, and control to protect your money and time.
          </p>
          <button className="hero-cta" onClick={scrollToServices}>
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

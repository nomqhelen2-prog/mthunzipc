import React, { useEffect, useState } from 'react';
import './Showcase.css';

const SHOWCASE_IMAGES = [
  `${process.env.PUBLIC_URL}/Gemini_Generated_Image_6eiau96eiau96eia.png`,
  `${process.env.PUBLIC_URL}/Gemini_Generated_Image_hvu5aohvu5aohvu5.png`,
  `${process.env.PUBLIC_URL}/image.webp`
];

/**
 * Primary landing section that cycles through branded project imagery.
 */
const Showcase = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentImageIndex((previousIndex) => (previousIndex + 1) % SHOWCASE_IMAGES.length);
    }, 7000);

    return () => window.clearInterval(intervalId);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="showcase">
      <div className="showcase-background">
        {SHOWCASE_IMAGES.map((image, index) => (
          <div
            key={image}
            className={`showcase-background-image ${index === currentImageIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${image})` }}
            role="img"
            aria-label={`Mthunzi Project Consultants - Site Supervision and Project Management in Bulawayo, Zimbabwe. Image ${index + 1} of ${SHOWCASE_IMAGES.length}`}
          />
        ))}
      </div>
      <div className="showcase-overlay" />
      <div className="container showcase-container">
        <div className="showcase-content">
          <h1 className="showcase-title">
            Protecting Your Interests
            <br />
            in Every Build
          </h1>
          <p className="showcase-subtitle">
            Expert oversight, cost control, and trusted representation for property owners in Zimbabwe and abroad.
          </p>
          <div className="showcase-cta-group">
            <button className="showcase-cta" onClick={() => scrollToSection('services')}>
              Our Services
            </button>
            <button className="showcase-cta-outline" onClick={() => scrollToSection('contact')}>
              Request a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
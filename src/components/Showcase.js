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

  const scrollToServices = () => {
    const element = document.getElementById('services');
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
            We are a professional project management firm. We do not build.
            <br />
            We manage, coordinate, supervise, and control to protect your money and time.
          </p>
          <button className="showcase-cta" onClick={scrollToServices}>
            View Our Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
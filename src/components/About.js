import React, { useState } from 'react';
import './About.css';

const About = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      heading: 'Get to Know Us',
      content: (
        <>
          <p className="about-intro">
            Founded in 2025, Mthunzi Project Consultants was established with the vision of becoming 
            Zimbabwe's leading provider of cost and project management services. Guided by integrity 
            and driven by accuracy, we uphold these core values as the foundation of our commitment 
            to delivering excellence to every client.
          </p>
        </>
      )
    },
    {
      heading: 'Our Core Values',
      content: (
        <>
          <p className="about-intro">
            It was important to us to build a value driven business. At its core, we believe in: 
            Simplicity, Affordability, Authenticity, Quality, Transparency.
          </p>
          <div className="values-list">
            <div className="value-item">
              <h4 className="value-name">Integrity</h4>
              <p className="value-description">We operate with honesty and transparency in every interaction, ensuring trust is at the core of our relationships.</p>
            </div>
            <div className="value-item">
              <h4 className="value-name">Accountability</h4>
              <p className="value-description">We take full responsibility for our commitments and hold all stakeholders to the highest standards of performance.</p>
            </div>
            <div className="value-item">
              <h4 className="value-name">Transparency</h4>
              <p className="value-description">Clear communication and detailed documentation ensure you always know exactly what is happening with your project.</p>
            </div>
          </div>
        </>
      )
    },
    {
      heading: 'Our Purpose',
      content: (
        <>
          <p className="about-intro">
            Our purpose is to solve the lack of accountability, poor cost control, delays, and stress 
            experienced by property owners when projects are unmanaged. We act in our clients' best 
            interests at all times, challenging poor workmanship and inflated costs while focusing on 
            prevention rather than damage control.
          </p>
        </>
      )
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section id="about" className="about">
      <div className="about-container-split">
        <div className="about-left" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/Gemini_Generated_Image_j19pi1j19pi1j19p.png)`}}>
          <div className="about-left-content">
            <h3 className="about-left-heading">What Makes Us Different</h3>
            <ul className="about-left-list">
              <li>We prioritize accountability and documentation</li>
              <li>We act in the client's best interests at all times</li>
              <li>We challenge poor workmanship and inflated costs</li>
              <li>We operate with professionalism, not informality</li>
              <li>We focus on prevention of problems, not damage control</li>
            </ul>
          </div>
        </div>

        <div className="about-right">
          <div className="about-carousel">
            <div 
              className="about-slides" 
              style={{ transform: `translateY(-${currentSlide * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div key={index} className="about-slide">
                  <div className="about-slide-content">
                    <h3 className="about-heading">{slide.heading}</h3>
                    {slide.content}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="about-navigation">
            <div className="about-dots">
              {slides.map((_, index) => (
                <span 
                  key={index} 
                  className={`about-dot ${index === currentSlide ? 'active' : ''}`}
                  onMouseEnter={() => setCurrentSlide(index)}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

import React from 'react';
import './About.css';

const ABOUT_BACKDROP = `${process.env.PUBLIC_URL}/Gemini_Generated_Image_j19pi1j19pi1j19p.png`;

const DIFFERENTIATORS = [
  {
    title: 'Accountability',
    description: 'We document every decision and keep a clear paper trail, so nothing is left to memory or assumption.'
  },
  {
    title: 'Client-First',
    description: "We act in your best interests at all times — not the contractor's, not the supplier's."
  },
  {
    title: 'Cost Integrity',
    description: 'We challenge poor workmanship and inflated costs before they become your problem.'
  },
  {
    title: 'Professionalism',
    description: 'We operate with structure and discipline, not informal arrangements and guesswork.'
  },
  {
    title: 'Prevention',
    description: 'We focus on preventing problems before they happen, not managing damage after the fact.'
  }
];

const About = () => {
  return (
    <>
      <section id="about" className="about">
        <div className="about-container-split">
          <div 
            className="about-left" 
            style={{ backgroundImage: `linear-gradient(rgba(74, 49, 33, 0.28), rgba(74, 49, 33, 0.72)), url(${ABOUT_BACKDROP})` }}
            role="img"
            aria-label="Mthunzi Project Consultants - Professional project management and oversight services in Bulawayo"
          />

          <div className="about-right">
            <div className="about-list-section">
              <div className="about-list-item">
                <h3 className="about-heading">Our Mission</h3>
                <p className="about-intro">
                  Deliver reliable, efficient and professional construction and project management services that protect investment, improve outcomes, and provide clarity for every client.
                </p>
              </div>

              <div className="about-list-item">
                <h3 className="about-heading">Our Vision</h3>
                <p className="about-intro">
                  To become the trusted oversight partner for property owners and Diaspora clients, known for transparent delivery, strong cost control, and high-quality project performance.
                </p>
              </div>

              <div className="about-list-item">
                <h3 className="about-heading">Core Values</h3>
                <ul className="core-values-list">
                  <li><strong>Integrity</strong> — We act honestly and transparently in every decision.</li>
                  <li><strong>Accountability</strong> — We take responsibility for commitments and outcomes.</li>
                  <li><strong>Transparency</strong> — We keep clients informed with clear reporting and open communication.</li>
                  <li><strong>Quality</strong> — We insist on strong workmanship, accurate oversight, and measurable results.</li>
                  <li><strong>Professionalism</strong> — We maintain high standards in every interaction.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="about-values">
        <div className="container">
          <h3 className="about-values-title">What Makes Us Different</h3>
          <div className="values-list">
            {DIFFERENTIATORS.map((item, index) => (
              <div className="value-item" key={item.title}>
                <span className="value-index">{index + 1}</span>
                <h4 className="value-title">{item.title}</h4>
                <p className="value-description">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;

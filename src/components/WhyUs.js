import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './WhyUs.css';

/**
 * USP-focused section highlighting the difference between Mthunzi's approach and traditional construction.
 * Emphasizes: 'We don't build; we manage.'
 */
const WhyUs = () => {
  const reasons = [
    {
      icon: <FaCheckCircle />,
      title: 'We Don\'t Build — We Manage',
      description:
        'Our focus is pure project management. We bring expertise in oversight, coordination, and control without the conflicting interests of builders or contractors.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Accountability at Every Step',
      description:
        'We solve the accountability gap. Clear documentation, transparent reporting, and regular communication ensure you know exactly what\'s happening with your project.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Cost Control & Fraud Prevention',
      description:
        'We prevent inflated costs and poor financial control. Our scrutiny challenges unnecessary expenses and protects your investment from waste and fraud.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Prevent Problems, Not Damage Control',
      description:
        'Prevention is our core strategy. Through proactive oversight and early identification of issues, we stop problems before they become costly failures.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Expert Contractor Supervision',
      description:
        'We hold all parties — contractors, suppliers, architects — accountable to specifications, timelines, and quality standards. No excuses, no delays.'
    },
    {
      icon: <FaCheckCircle />,
      title: 'Trusted Representation for the Diaspora',
      description:
        'For overseas property owners, we are your eyes and ears in Bulawayo. We advocate for your interests and ensure your project succeeds whether you\'re present or abroad.'
    }
  ];

  return (
    <section id="why-us" className="why-us">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Why Choose Mthunzi?</h2>
          <p className="section-subtitle">
            We solve the core problems property owners face: lack of accountability, poor cost control, and endless delays. 
            Our approach is simple: <strong>we don't build; we manage.</strong>
          </p>
        </div>

        <div className="reasons-grid">
          {reasons.map((reason, index) => (
            <div key={index} className="reason-card">
              <div className="reason-icon">{reason.icon}</div>
              <h3 className="reason-title">{reason.title}</h3>
              <p className="reason-description">{reason.description}</p>
            </div>
          ))}
        </div>

        <div className="why-us-cta">
          <h3 className="cta-heading">Our Commitment to You</h3>
          <p className="cta-text">
            At Mthunzi Project Consultants, we place your interests above all else. We operate with integrity, 
            maintain transparency, and deliver accountability in every aspect of your project. 
            Your investment deserves expert management — not just a builder.
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhyUs;

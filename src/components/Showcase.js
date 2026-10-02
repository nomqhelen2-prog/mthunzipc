import React from 'react';
import { useNavigate } from 'react-router-dom';
import usePageMeta from '../hooks/usePageMeta';
import WhatMakesUsDifferent from './WhatMakesUsDifferent';
import ServicesSummary from './ServicesSummary';
import './Showcase.css';

const HOUSE_IMAGE = `${process.env.PUBLIC_URL}/image.webp`;

const CLIENT_TYPES = [
  'Busy professionals',
  'Property owners',
  'Small developers',
  'Diaspora clients'
];

/**
 * Home page hero. Content is drawn directly from the company's vision and
 * overview: we manage, coordinate, supervise, and control construction and
 * property-improvement projects on our clients' behalf.
 */
const Showcase = () => {
  const navigate = useNavigate();

  usePageMeta(
    null,
    'A professional project management firm protecting clients\' money, time and interests during construction, renovation and property improvement projects.'
  );

  return (
    <>
      <section id="home" className="hero">
        <div className="container hero-container">
          <div className="hero-copy">
            <h1 className="hero-title">
              We manage, coordinate, supervise and control.
            </h1>
            <p className="hero-subtitle">
              We protect your money, time and interests during construction, renovation,
              extension and property improvement projects, ensuring quality output from
              start to finish. We do not build. We oversee.
            </p>

            <div className="hero-cta-group">
              <button className="btn btn-accent btn-lg" onClick={() => navigate('/contact')}>
                Request a Consultation
              </button>
              <button className="btn btn-outline btn-lg" onClick={() => navigate('/services')}>
                View Services
              </button>
            </div>

            <div className="hero-client-list">
              <span className="hero-client-label">Built for</span>
              <ul>
                {CLIENT_TYPES.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="hero-visual">
            <div className="media-frame hero-visual-frame">
              <img src={HOUSE_IMAGE} alt="Residential construction project managed by Mthunzi Project Consultants" />
            </div>
          </div>
        </div>
      </section>

      <ServicesSummary />
      <WhatMakesUsDifferent />
    </>
  );
};

export default Showcase;

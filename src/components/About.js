import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import WhatMakesUsDifferent from './WhatMakesUsDifferent';
import './About.css';

const OVERVIEW_IMAGE = `${process.env.PUBLIC_URL}/Gemini_Generated_Image_j19pi1j19pi1j19p.png`;

const CORE_VALUES = ['Integrity', 'Accountability', 'Professionalism', 'Transparency', 'Discipline', 'Ethical conduct'];

const CLIENT_TYPES = [
  'Busy professionals',
  'Property owners',
  'Small developers',
  'Diaspora clients who need trusted representation on the ground'
];

const STANDARDS = [
  'Documentation is mandatory.',
  'Clear roles and responsibilities are respected.',
  'Conflicts are handled professionally.'
];

const About = () => {
  usePageMeta(
    'About Us',
    'Mthunzi Project Consultants is a professional project management firm protecting clients\' money, time and interests in every construction, renovation and property improvement project.'
  );

  return (
    <>
      <header className="page-intro section">
        <div className="container">
          <h1 className="page-intro-title">A trusted, ethical and professional firm</h1>
          <p className="page-intro-subtitle">
            To become a trusted, ethical and professional project management firm known for
            accountability, transparency and delivery of quality outcomes.
          </p>
        </div>
      </header>

      <section className="section overview-section">
        <div className="container overview-grid">
          <div className="overview-text-col">
            <div className="overview-block">
              <h3 className="overview-heading">Company Overview</h3>
              <p className="overview-text">
                We are a professional project management firm. Our core function is to protect
                clients' money, time and interests during the entire project lifecycle. From construction, renovation, extension and
                property improvement projects we ensure high quality output from every project.
              </p>
              <p className="overview-text overview-text-strong">
                We do not build. We manage, coordinate, supervise and control.
              </p>
            </div>

            <div className="overview-block">
              <h3 className="overview-heading">Who We Serve</h3>
              <ul className="overview-list">
                {CLIENT_TYPES.map((type) => (
                  <li key={type}>{type}</li>
                ))}
              </ul>
            </div>
          </div>

          <div className="media-frame overview-media">
            <img src={OVERVIEW_IMAGE} alt="Mthunzi Project Consultants reviewing plans with a client at an active site" />
          </div>
        </div>
      </section>

      <section className="section values-section">
        <div className="container">
          <div className="section-heading">
            <h2 className="section-title">Core values</h2>
          </div>

          <div className="values-grid">
            {CORE_VALUES.map((value) => (
              <div className="value-chip card" key={value}>
                {value}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section standards-section">
        <div className="container standards-container">
          <div>
            <h2 className="section-title">Non-negotiable standards</h2>
          </div>
          <ul className="standards-list">
            {STANDARDS.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      </section>

      <WhatMakesUsDifferent />
    </>
  );
};

export default About;

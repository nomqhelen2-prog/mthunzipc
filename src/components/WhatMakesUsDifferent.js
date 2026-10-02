import React from 'react';
import { FaCheckCircle } from 'react-icons/fa';
import './WhatMakesUsDifferent.css';

const DIFFERENTIATORS = [
  {
    title: 'Accountability & documentation',
    description: 'We prioritize accountability and keep clear documentation on every decision.'
  },
  {
    title: "Your interests, first",
    description: "We act in the client's best interests at all times."
  },
  {
    title: 'Cost integrity',
    description: 'We challenge poor workmanship and inflated costs before they become your problem.'
  },
  {
    title: 'Professionalism',
    description: 'We operate with professionalism and structure, not informality.'
  },
  {
    title: 'Prevention over damage control',
    description: 'We focus on preventing problems, not managing the fallout after the fact.'
  }
];

/**
 * "What Makes Us Different" — straight from the company's strategic
 * direction document, shared between the Home and About pages.
 */
const WhatMakesUsDifferent = () => (
  <section className="differentiators section">
    <div className="container">
      <div className="section-heading center">
        <h2 className="section-title">What makes us different</h2>
      </div>

      <div className="differentiators-grid">
        {DIFFERENTIATORS.map((item) => (
          <div className="differentiator-item" key={item.title}>
            <FaCheckCircle className="differentiator-icon" />
            <div>
              <h3 className="differentiator-title">{item.title}</h3>
              <p className="differentiator-description">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default WhatMakesUsDifferent;

import React, { useEffect, useRef } from 'react';
import { FaUsers, FaFileInvoiceDollar, FaClipboardCheck, FaGlobeAmericas } from 'react-icons/fa';
import './WhatWeDo.css';

const SECTION_BACKDROP = `${process.env.PUBLIC_URL}/Gemini_Generated_Image_j19pi1j19pi1j19p.png`;

/**
 * Services section that highlights the firm's core consulting offering.
 */

const WhatWeDo = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return undefined;
    }

    const serviceCards = sectionElement.querySelectorAll('.service-card');
    if (!serviceCards.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-near', entry.isIntersecting);
        });
      },
      {
        threshold: 0.25,
        rootMargin: '0px 0px -8% 0px'
      }
    );

    serviceCards.forEach((card) => observer.observe(card));

    return () => {
      observer.disconnect();
    };
  }, []);

  const services = [
    {
      icon: <FaUsers />,
      title: 'Project Management',
      description: 'Coordination and site supervision to ensure your project progresses smoothly. We oversee every phase to deliver on time and within scope.'
    },
    {
      icon: <FaFileInvoiceDollar />,
      title: 'Financial Control',
      description: 'Budget tracking, cost control, and challenging inflated costs. We protect your investment by scrutinizing every expense and preventing waste.'
    },
    {
      icon: <FaClipboardCheck />,
      title: 'Quality Assurance',
      description: 'Preventing problems through documentation and accountability. We ensure high standards are maintained from foundation to finishing.'
    },
    {
      icon: <FaGlobeAmericas />,
      title: 'Diaspora Services',
      description: 'Trusted \'eyes-on-the-ground\' representation for clients abroad. We give you peace of mind when you can\'t be there in person.'
    }
  ];

  return (
    <section
      id="services"
      className="what-we-do"
      ref={sectionRef}
      style={{ backgroundImage: `linear-gradient(rgba(74, 49, 33, 0.84), rgba(74, 49, 33, 0.84)), url(${SECTION_BACKDROP})` }}
    >
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">WHAT WE DO</h2>
          <p className="section-subtitle">
            Our team is dedicated to ensuring that every phase of your construction runs smoothly and efficiently.
          </p>
        </div>

        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                {service.icon}
              </div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;

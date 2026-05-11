import React, { useEffect, useRef, useState } from 'react';
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaGlobeAmericas,
  FaChartLine,
  FaSearch
} from 'react-icons/fa';
import './Services.css';

/**
 * SEO-optimized searchable services component featuring core project management offerings.
 * Targets keywords: 'Construction Cost Control', 'Contractor Accountability', 'Diaspora Property Oversight Zimbabwe'
 */
const Services = () => {
  const sectionRef = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);

  const services = [
    {
      id: 'construction-management',
      icon: <FaUsers />,
      title: 'Construction & Renovation Management',
      description:
        'End-to-end project oversight ensuring your build stays on scope, timeline, and quality.',
      keywords: ['construction', 'management', 'supervision', 'oversight', 'coordination']
    },
    {
      id: 'cost-control',
      icon: <FaFileInvoiceDollar />,
      title: 'Cost Control & Budget Tracking',
      description:
        'Budget protection through detailed expense tracking and cost scrutiny.',
      keywords: ['budget', 'cost', 'control', 'financial', 'tracking', 'expenses']
    },
    {
      id: 'contractor-accountability',
      icon: <FaClipboardCheck />,
      title: 'Contractor Accountability & Supervision',
      description:
        'Detailed contractor tracking with accountability, quality verification, and transparent reporting.',
      keywords: ['contractor', 'accountability', 'supervision', 'quality', 'assurance', 'documentation']
    },
    {
      id: 'diaspora-services',
      icon: <FaGlobeAmericas />,
      title: 'Diaspora \'Eyes-on-the-Ground\' Services',
      description:
        'Your trusted eyes-on-the-ground in Bulawayo providing site visits, updates, and advocacy for overseas owners.',
      keywords: ['diaspora', 'representation', 'overseas', 'property', 'eyes-on-ground', 'zimbabwe']
    },
    {
      id: 'feasibility-studies',
      icon: <FaChartLine />,
      title: 'Feasibility Studies & Advisory',
      description:
        'Viability analysis, cost projections, and risk assessment before you invest.',
      keywords: ['feasibility', 'advisory', 'analysis', 'assessment', 'guidance']
    }
  ];

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') {
      setFilteredServices(services);
    } else {
      const filtered = services.filter((service) =>
        service.keywords.some((keyword) => keyword.includes(query)) ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
      );
      setFilteredServices(filtered);
    }
  }, [searchQuery, services]);

  useEffect(() => {
    setFilteredServices(services);
  }, [services]);

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

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Project Management Services in Bulawayo</h2>
          <p className="section-subtitle">
            Our comprehensive services solve accountability gaps, poor cost control, and project delays for property owners and Diaspora clients.
          </p>
        </div>

        <div className="services-search-container">
          <div className="services-search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="services-search-input"
              placeholder="Search services (e.g., 'Diaspora', 'Budget', 'Construction')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search services"
            />
            {searchQuery && (
              <button
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                ✕
              </button>
            )}
          </div>
          {searchQuery && (
            <p className="search-results-count">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        <div className="services-grid">
          {filteredServices.length > 0 ? (
            filteredServices.map((service) => (
              <div key={service.id} className="service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <div className="service-keywords">
                  {service.keywords.slice(0, 3).map((keyword) => (
                    <span key={keyword} className="keyword-tag">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
            ))
          ) : (
            <div className="no-results">
              <p>No services match your search. Try searching for 'Diaspora', 'Budget', or 'Construction'.</p>
            </div>
          )}
        </div>

        <div className="services-commitment">
          <h3 className="commitment-heading">Our Commitment to You</h3>
          <p className="commitment-text">
            We place your interests first — integrity, transparency, and accountability in every project decision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

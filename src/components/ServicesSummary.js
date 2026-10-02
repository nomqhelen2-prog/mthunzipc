import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FaHardHat,
  FaFileInvoiceDollar,
  FaHandshake,
  FaClipboardCheck,
  FaFileAlt,
  FaGlobeAmericas,
  FaChartLine
} from 'react-icons/fa';
import './ServicesSummary.css';

const SERVICES = [
  {
    id: 'construction-management',
    icon: <FaHardHat />,
    title: 'Construction & Renovation Management',
    summary: "End-to-end oversight of your build, protecting your money, time and interests."
  },
  {
    id: 'cost-control',
    icon: <FaFileInvoiceDollar />,
    title: 'Cost Control & Budget Tracking',
    summary: 'Budget tracking and schedule management to prevent overruns and delays.'
  },
  {
    id: 'contractor-accountability',
    icon: <FaHandshake />,
    title: 'Contractor Coordination & Accountability',
    summary: 'Coordinating contractors and holding them accountable for quality and cost.'
  },
  {
    id: 'quality-control',
    icon: <FaClipboardCheck />,
    title: 'Quality Control & Site Supervision',
    summary: 'On-site supervision that challenges poor workmanship before it becomes your problem.'
  },
  {
    id: 'progress-reporting',
    icon: <FaFileAlt />,
    title: 'Progress Reporting & Documentation',
    summary: 'Documented and transparent reporting throughout your project.'
  },
  {
    id: 'diaspora-services',
    icon: <FaGlobeAmericas />,
    title: 'Diaspora Eyes-on-the-Ground',
    summary: 'Trusted, on-site representation for clients who cannot be there themselves.'
  },
  {
    id: 'feasibility-studies',
    icon: <FaChartLine />,
    title: 'Feasibility Studies & Advisory',
    summary: 'Feasibility studies and advisory support before you commit to a project.'
  }
];

const ServicesSummary = () => {
  const navigate = useNavigate();

  return (
    <section className="services-summary section">
      <div className="container">
        <div className="section-heading">
          <h2 className="section-title">What we do</h2>
          <p className="section-subtitle">
            We manage, coordinate, supervise and control. Here is where we focus.
          </p>
        </div>

        <div className="services-summary-grid">
          {SERVICES.map((service) => (
            <div key={service.id} className="card services-summary-card">
              <div className="services-summary-icon">{service.icon}</div>
              <h3 className="services-summary-title">{service.title}</h3>
              <p className="services-summary-text">{service.summary}</p>
            </div>
          ))}
        </div>

        <div className="services-summary-cta">
          <button className="btn btn-outline" onClick={() => navigate('/services')}>
            View All Services
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSummary;

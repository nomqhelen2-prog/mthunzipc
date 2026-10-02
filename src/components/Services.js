import React, { useMemo } from 'react';
import {
  FaHardHat,
  FaFileInvoiceDollar,
  FaHandshake,
  FaClipboardCheck,
  FaFileAlt,
  FaGlobeAmericas,
  FaChartLine
} from 'react-icons/fa';
import usePageMeta from '../hooks/usePageMeta';
import './Services.css';

const SITE_IMAGE = `${process.env.PUBLIC_URL}/Gemini_Generated_Image_6eiau96eiau96eia.png`;

const Services = () => {
  usePageMeta(
    'Services',
    'Construction and renovation project management, cost control, contractor accountability, quality supervision, diaspora representation and feasibility studies from Mthunzi Project Consultants.'
  );

  const services = useMemo(
    () => [
      {
        id: 'construction-management',
        icon: <FaHardHat />,
        title: 'Construction & Renovation Project Management',
        description:
          "End-to-end oversight of construction, renovation, extension and property improvement projects. WE protect your money, time and interests from start to finish."
      },
      {
        id: 'cost-control',
        icon: <FaFileInvoiceDollar />,
        title: 'Cost Control, Budget Tracking & Schedule Management',
        description:
          'Detailed budget tracking and schedule management that identifies overruns and delays early, before they become your problem.'
      },
      {
        id: 'contractor-accountability',
        icon: <FaHandshake />,
        title: 'Contractor Coordination & Accountability',
        description:
          'We coordinate contractors and hold them accountable for cost, quality, and timeline so nothing is left to chance.'
      },
      {
        id: 'quality-control',
        icon: <FaClipboardCheck />,
        title: 'Quality Control & Site Supervision',
        description:
          'On-site supervision and quality control that challenges poor workmanship and inflated costs before they are signed off.'
      },
      {
        id: 'progress-reporting',
        icon: <FaFileAlt />,
        title: 'Progress Reporting & Documentation',
        description:
          'Clear, documented progress reporting throughout your project because documentation is mandatory, not optional.'
      },
      {
        id: 'diaspora-services',
        icon: <FaGlobeAmericas />,
        title: 'Diaspora Eyes-on-the-Ground Services',
        description:
          'Trusted representation on the ground for diaspora clients who need someone they can rely on to watch over their project.'
      },
      {
        id: 'feasibility-studies',
        icon: <FaChartLine />,
        title: 'Feasibility Studies & Advisory Services',
        description:
          'Feasibility studies and advisory support to guide your decisions before you commit time and money to a project.'
      }
    ],
    []
  );

  return (
    <>
      <header className="page-intro section">
        <div className="container page-intro-grid">
          <div>
            <h1 className="page-intro-title">Core services</h1>
            <p className="page-intro-subtitle">
              We do not build. We manage, coordinate, supervise and control every stage of your project.
            </p>
          </div>
          <div className="media-frame page-intro-media">
            <img src={SITE_IMAGE} alt="Active construction site managed by Mthunzi Project Consultants" />
          </div>
        </div>
      </header>

      <section className="services-list section">
        <div className="container">
          <div className="services-grid">
            {services.map((service) => (
              <div key={service.id} className="card service-card">
                <div className="service-icon">{service.icon}</div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;

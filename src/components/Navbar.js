import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import EnquiryModal from './EnquiryModal';
import './Navbar.css';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen((current) => !current);
  const closeMenu = () => setIsMenuOpen(false);

  const openEnquiry = () => {
    closeMenu();
    setIsEnquiryOpen(true);
  };

  const closeEnquiry = () => setIsEnquiryOpen(false);

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-brand" onClick={closeMenu}>
          <span className="navbar-logo-badge">
            <img
              src={`${process.env.PUBLIC_URL}/logo.png`}
              alt="Mthunzi Project Consultants"
              className="navbar-logo"
              loading="lazy"
            />
          </span>
          <span className="navbar-brand-name">Mthunzi Project Consultants</span>
        </Link>

        <ul className={`navbar-menu ${isMenuOpen ? 'is-open' : ''}`}>
          {NAV_LINKS.map((link) => (
            <li key={link.to}>
              <NavLink
                to={link.to}
                end={link.end}
                onClick={closeMenu}
                className={({ isActive }) => (isActive ? 'is-active' : '')}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
          <li className="navbar-menu-cta">
            <button className="btn btn-accent btn-sm" onClick={openEnquiry}>
              Enquire
            </button>
          </li>
        </ul>

        <div className="navbar-actions">
          <button className="btn btn-accent btn-sm navbar-enquiry-desktop" onClick={openEnquiry}>
            Enquire
          </button>
          <button
            className={`navbar-toggle ${isMenuOpen ? 'is-open' : ''}`}
            onClick={toggleMenu}
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <EnquiryModal isOpen={isEnquiryOpen} onClose={closeEnquiry} />
    </nav>
  );
};

export default Navbar;

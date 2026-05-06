import React, { useState } from 'react';
import './Navbar.css';

/**
 * Top navigation for the single-page site.
 */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-brand">
          <div className="navbar-logo">
            <img src={`${process.env.PUBLIC_URL}/logo.png`} alt="Mthunzi Project Consultants logo" className="logo-image" />
          </div>
          <span className="brand-name">Mthunzi Project Consultants</span>
        </div>

        <div className="navbar-actions">
          <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
            <li><a href="#!" onClick={() => scrollToSection('home')}>Home</a></li>
            <li><a href="#!" onClick={() => scrollToSection('services')}>What We Do</a></li>
            <li><a href="#!" onClick={() => scrollToSection('about')}>Who We Are</a></li>
            <li><a href="#!" onClick={() => scrollToSection('contact')}>Contact</a></li>
          </ul>

          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

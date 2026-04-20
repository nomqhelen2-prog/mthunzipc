import React, { useState, useEffect } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Hide navbar when scrolling down past 100px
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY) {
        // Show navbar when scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    const handleMouseMove = (e) => {
      // Show navbar when cursor is at the very top (within 50px)
      if (e.clientY < 50) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [lastScrollY]);

  return (
    <nav className={`navbar ${isVisible ? 'navbar-visible' : 'navbar-hidden'}`}>
      <div className="container navbar-container">
        <div className="navbar-top">
          <div className="navbar-brand">
            <div className="navbar-logo">
              <img src="/logo.png" alt="MPC Logo" className="logo-image" />
            </div>
            <span className="brand-name">Mthunzi Project Consultants</span>
          </div>

          <button className="navbar-toggle" onClick={toggleMenu} aria-label="Toggle navigation menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>

        <ul className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <li><a href="#!" onClick={() => scrollToSection('home')}>HOME</a></li>
          <li><a href="#!" onClick={() => scrollToSection('services')}>WHAT WE DO</a></li>
          <li><a href="#!" onClick={() => scrollToSection('about')}>WHO WE ARE</a></li>
          <li><a href="#!" onClick={() => scrollToSection('contact')}>CONTACT</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

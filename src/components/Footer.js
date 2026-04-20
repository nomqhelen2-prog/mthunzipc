import React from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-tagline">
              Look for the → <span className="footer-brand-name">Mthunzi</span>
            </h2>
          </div>

          <div className="footer-info">
            <div className="footer-column">
              <h3 className="footer-column-title">Speak to Us</h3>
              <div className="footer-links">
                <a href="mailto:info@mthunzi.co.zw" className="footer-email">info@mthunzi.co.zw</a>
                <a href="mailto:projects@mthunzi.co.zw" className="footer-email">projects@mthunzi.co.zw</a>
                <a href="mailto:admin@mthunzi.co.zw" className="footer-email">admin@mthunzi.co.zw</a>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Call Us</h3>
              <div className="footer-links">
                <div className="footer-phone">
                  <span className="phone-flag">🇿🇼</span>
                  <a href="tel:+263242123456">+263 242 123456</a>
                </div>
                <div className="footer-phone">
                  <span className="phone-flag">🇿🇼</span>
                  <a href="tel:+263712345678">+263 71 234 5678</a>
                </div>
              </div>
            </div>

            <div className="footer-column">
              <h3 className="footer-column-title">Located at</h3>
              <div className="footer-links">
                <div className="footer-location">
                  <p>Bulawayo, Zimbabwe</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <nav className="footer-nav">
            <a href="#!" onClick={(e) => { e.preventDefault(); scrollToSection('home'); }}>Home</a>
            <a href="#!" onClick={(e) => { e.preventDefault(); scrollToSection('services'); }}>Services</a>
            <a href="#!" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>About</a>
            <a href="#!" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>Contact</a>
          </nav>

          <div className="footer-legal">
            <p className="footer-copyright">
              © {new Date().getFullYear()} <strong>Mthunzi Project Consultants.</strong> All rights reserved.
            </p>
            <div className="footer-legal-links">
              <a href="#!">Privacy Policy</a>
              <span>|</span>
              <a href="#!">Terms and Conditions</a>
              <span>|</span>
              <a href="#!">Disclaimer</a>
            </div>
          </div>

          <div className="footer-social">
            <a href="#!" aria-label="LinkedIn"><FaLinkedinIn /> Linked In</a>
            <a href="#!" aria-label="Instagram"><FaInstagram /> Instagram</a>
            <a href="#!" aria-label="Facebook"><FaFacebookF /> Facebook</a>
            <a href="#!" aria-label="Twitter"><FaTwitter /> Twitter</a>
          </div>
        </div>

        <div className="footer-designer">
          <p>Designed by Nomqhele Moyo</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

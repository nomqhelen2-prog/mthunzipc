import React from 'react';
import { FaFacebook, FaTiktok, FaLinkedin } from 'react-icons/fa';
import './Footer.css';

/**
 * Site footer with links and social media.
 */
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-links">
            <a href="/terms" className="footer-link">Term of use</a>
            <a href="/privacy" className="footer-link">Privacy Policy</a>
            <a href="/accessibility" className="footer-link">Accessibility assessment</a>
          </div>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="Facebook">
              <FaFacebook />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="TikTok">
              <FaTiktok />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-icon" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
          <div className="footer-creator">
            <p>created by Nomqhele N Moyo</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

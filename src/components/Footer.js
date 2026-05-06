import React from 'react';
import { FaLinkedinIn, FaInstagram, FaFacebookF, FaWhatsapp } from 'react-icons/fa';
import { FaTiktok } from 'react-icons/fa6';
import './Footer.css';

const CONTACT_EMAIL = 'info@mthunzipc.co.zw';

/**
 * Site footer with contact details and social links.
 */

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-main">
          <div className="footer-brand">
            <h2 className="footer-tagline">
              Look for the → <span className="footer-brand-name">EXPERTS</span>
            </h2>
          </div>

          <div className="footer-info">
            <div className="footer-column">
              <h3 className="footer-column-title">Speak to Us</h3>
              <div className="footer-links">
                <a href={`mailto:${CONTACT_EMAIL}`} className="footer-email">{CONTACT_EMAIL}</a>
                
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
          <div className="footer-legal-links">
            <a href="#!">Term of use</a>
            <a href="#!">Privacy Policy</a>
            <span>|</span>
            <a href="#!">Accessibility assessment</a>
          </div>

          <div className="footer-social">
            <a href="#!" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#!" aria-label="TikTok"><FaTiktok /></a>
            <a href="#!" aria-label="Instagram"><FaInstagram /></a>
            <a href="#!" aria-label="LinkedIn"><FaLinkedinIn /></a>
            <a href="#!" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

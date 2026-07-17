import React from 'react';
import { FaEnvelope, FaWhatsapp } from 'react-icons/fa';
import { handleMailtoClick } from '../utils/email';
import './Footer.css';

const CONTACT_CHANNELS = [
  {
    icon: FaWhatsapp,
    label: 'WhatsApp',
    value: '+263 78 439 3141',
    href: 'https://wa.me/263784393141'
  },
  {
    icon: FaEnvelope,
    label: 'Email',
    value: 'mthunziprojectconsultants@gmail.com',
    href: 'mailto:mthunziprojectconsultants@gmail.com'
  }
];

const Footer = () => {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">

          {/* Column 1: About */}
          <div className="footer-col">
            <h4 className="footer-col-heading">ABOUT</h4>
            <p className="footer-about-text">
              Mthunzi Project Consultants provides professional project management and cost
              oversight for property owners and diaspora clients in Zimbabwe.
            </p>
            {/* social links removed per request */}
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-col-heading">QUICK LINKS</h4>
            <ul className="footer-links-list">
              <li><button onClick={() => scrollToSection('home')}>Home</button></li>
              <li><button onClick={() => scrollToSection('services')}>Our Services</button></li>
              <li><button onClick={() => scrollToSection('about')}>Who We Are</button></li>
              <li><button onClick={() => scrollToSection('contact')}>Contact Us</button></li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="footer-col">
            <h4 className="footer-col-heading">CONTACT</h4>
            <ul className="footer-contact-list">
              {CONTACT_CHANNELS.map((channel) => {
                const Icon = channel.icon;
                const isMailLink = channel.href.startsWith('mailto:');
                return (
                  <li key={channel.label}>
                    <Icon className="footer-contact-icon" />
                    <a
                      href={channel.href}
                      // mailto: links hand off to the OS mail client rather than
                      // navigating, so target="_blank" only leaves a blank tab open.
                      // A Gmail web-compose fallback is wired up via onClick instead.
                      {...(!isMailLink && { target: '_blank', rel: 'noopener noreferrer' })}
                      {...(isMailLink && { onClick: handleMailtoClick() })}
                      aria-label={`${channel.label} link`}
                      className="footer-contact-link-text"
                    >
                      {channel.label}: {channel.value}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} Mthunzi Project Consultants. Built by{' '}
          <a
            href="https://wa.me/263775047789"
            target="_blank"
            rel="noopener noreferrer"
            className="developer-link"
            aria-label="Contact developer on WhatsApp"
          >
            Nomqhele N Moyo
          </a>
          .
        </p>
      </div>
    </footer>
  );
};

export default Footer;

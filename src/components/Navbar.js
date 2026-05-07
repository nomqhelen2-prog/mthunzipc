import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import './Navbar.css';

/**
 * Top navigation for the single-page site.
 */

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Page sections with keyword aliases
  const pageKeywords = [
    { label: 'HOME', id: 'home', keywords: ['home', 'homepage', 'start'] },
    { label: 'WHAT WE DO', id: 'services', keywords: ['what we do', 'services', 'offerings', 'expertise', 'consulting'] },
    { label: 'WHO WE ARE', id: 'about', keywords: ['who we are', 'about', 'history', 'team', 'team members', 'background', 'company'] },
    { label: 'CONTACT', id: 'contact', keywords: ['contact', 'location', 'address', 'call', 'phone', 'email', 'contact us', 'get in touch'] },
  ];

  // Filter results based on search query
  const searchResults = pageKeywords.filter((item) => {
    const query = searchQuery.toLowerCase().trim();
    return item.keywords.some(keyword => keyword.includes(query)) || item.label.includes(searchQuery.toUpperCase());
  });

  const toggleMenu = () => {
    setIsOpen((current) => !current);
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
      setSearchOpen(false);
      setSearchQuery('');
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
            <li className="navbar-separator">|</li>
            <li className="navbar-search-item">
              <button
                className="navbar-search-btn"
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
              >
                <FaSearch />
              </button>
              {searchOpen && (
                <div className="navbar-search-dropdown">
                  <input
                    type="text"
                    className="navbar-search-input"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    autoFocus
                  />
                  <div className="navbar-search-results">
                    {searchResults.length > 0 ? (
                      searchResults.map((result) => (
                        <button
                          key={result.id}
                          className="navbar-search-result-item"
                          onClick={() => scrollToSection(result.id)}
                        >
                          {result.label}
                        </button>
                      ))
                    ) : (
                      <div className="navbar-search-no-results">No results found</div>
                    )}
                  </div>
                </div>
              )}
            </li>
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

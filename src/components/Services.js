import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  FaUsers,
  FaFileInvoiceDollar,
  FaClipboardCheck,
  FaGlobeAmericas,
  FaChartLine,
  FaSearch,
  FaChevronLeft,
  FaChevronRight,
  FaPause,
  FaPlay
} from 'react-icons/fa';
import './Services.css';

// How many times the service list is repeated in the DOM so the auto-scroll
// track always has enough width to loop seamlessly, even on wide viewports.
const TRACK_REPEAT_COUNT = 3;
// Base auto-scroll speed in pixels per animation frame (~60fps).
const AUTO_SCROLL_SPEED = 0.6;
// How long a manual prev/next click pauses autoplay before it resumes, in ms.
const RESUME_DELAY_MS = 3000;

/**
 * SEO-optimized searchable services carousel featuring core project management offerings.
 * Targets keywords: 'Construction Cost Control', 'Contractor Accountability', 'Diaspora Property Oversight Zimbabwe'
 *
 * When no search filter is active, the cards auto-scroll continuously left-to-right in a seamless
 * loop; the card nearest the horizontal center of the viewport scales up, and cards scale back down
 * as they move away from center. Autoplay pauses on hover/focus, respects prefers-reduced-motion,
 * and exposes a play/pause control so users can stop the motion (WCAG 2.2.2).
 */
const Services = () => {
  const sectionRef = useRef(null);
  const wrapperRef = useRef(null);
  const trackRef = useRef(null);
  const positionRef = useRef(0);
  const isPausedRef = useRef(false);
  const resumeTimeoutRef = useRef(null);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredServices, setFilteredServices] = useState([]);
  const [isPlaying, setIsPlaying] = useState(true);

  const services = useMemo(
    () => [
      {
        id: 'construction-management',
        icon: <FaUsers />,
        title: 'Construction & Renovation Management',
        description:
          'End-to-end project oversight ensuring your build stays on scope, timeline, and quality. We manage contractors, inspections, and communication so every stage of your renovation delivers the desired result.',
        keywords: ['construction', 'management', 'supervision', 'oversight', 'coordination']
      },
      {
        id: 'cost-control',
        icon: <FaFileInvoiceDollar />,
        title: 'Cost Control & Budget Tracking',
        description:
          'Budget protection through detailed expense tracking and cost scrutiny. We identify savings early, prevent overruns, and keep financial decisions transparent for your peace of mind.',
        keywords: ['budget', 'cost', 'control', 'financial', 'tracking', 'expenses']
      },
      {
        id: 'contractor-accountability',
        icon: <FaClipboardCheck />,
        title: 'Contractor Accountability & Supervision',
        description:
          'Detailed contractor tracking with accountability, quality verification, and transparent reporting. We monitor progress, enforce standards, and resolve issues before they become costly delays.',
        keywords: ['contractor', 'accountability', 'supervision', 'quality', 'assurance', 'documentation']
      },
      {
        id: 'diaspora-services',
        icon: <FaGlobeAmericas />,
        title: 'Diaspora \'Eyes-on-the-Ground\' Services',
        description:
          'Your trusted eyes-on-the-ground in Bulawayo providing site visits, updates, and advocacy for overseas owners. We deliver local representation, verified progress reports, and real-time support for remote property decisions.',
        keywords: ['diaspora', 'representation', 'overseas', 'property', 'eyes-on-ground', 'zimbabwe']
      },
      {
        id: 'feasibility-studies',
        icon: <FaChartLine />,
        title: 'Feasibility Studies & Advisory',
        description:
          'Viability analysis, cost projections, and risk assessment before you invest. Our advisory service clarifies project demands, uncovers hidden risks, and helps you plan with confidence.',
        keywords: ['feasibility', 'advisory', 'analysis', 'assessment', 'guidance']
      }
    ],
    []
  );

  const isSearching = searchQuery.trim() !== '';

  useEffect(() => {
    const query = searchQuery.toLowerCase().trim();
    if (query === '') {
      setFilteredServices(services);
      return;
    }

    const filtered = services.filter(
      (service) =>
        service.keywords.some((keyword) => keyword.includes(query)) ||
        service.title.toLowerCase().includes(query) ||
        service.description.toLowerCase().includes(query)
    );
    setFilteredServices(filtered);
  }, [searchQuery, services]);

  // Continuous auto-scroll + distance-from-center scaling. Only runs while the
  // carousel (not the static search-results grid) is showing.
  useEffect(() => {
    if (isSearching) {
      return undefined;
    }

    const track = trackRef.current;
    const wrapper = wrapperRef.current;
    if (!track || !wrapper) {
      return undefined;
    }

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    positionRef.current = 0;
    track.style.transform = 'translate3d(0, 0, 0)';

    let animationFrameId;

    const step = () => {
      const loopWidth = track.scrollWidth / TRACK_REPEAT_COUNT;

      if (!isPausedRef.current && !prefersReducedMotion && loopWidth > 0) {
        positionRef.current -= AUTO_SCROLL_SPEED;
        if (positionRef.current <= -loopWidth) {
          positionRef.current += loopWidth;
        }
        track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
      }

      const wrapperRect = wrapper.getBoundingClientRect();
      const centerX = wrapperRect.left + wrapperRect.width / 2;

      Array.from(track.children).forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const distance = Math.abs(cardCenterX - centerX);
        const maxDistance = wrapperRect.width / 2 + rect.width / 2;
        const proximity = 1 - Math.min(distance / maxDistance, 1);
        const scale = 0.85 + proximity * 0.23;
        const opacity = 0.55 + proximity * 0.45;
        card.style.setProperty('--card-scale', scale.toFixed(3));
        card.style.setProperty('--card-opacity', opacity.toFixed(3));
      });

      animationFrameId = window.requestAnimationFrame(step);
    };

    animationFrameId = window.requestAnimationFrame(step);

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  }, [isSearching, filteredServices.length]);

  useEffect(() => {
    return () => {
      window.clearTimeout(resumeTimeoutRef.current);
    };
  }, []);

  const pauseThenResume = () => {
    isPausedRef.current = true;
    window.clearTimeout(resumeTimeoutRef.current);
    resumeTimeoutRef.current = window.setTimeout(() => {
      if (isPlaying) {
        isPausedRef.current = false;
      }
    }, RESUME_DELAY_MS);
  };

  const nudge = (direction) => {
    const track = trackRef.current;
    if (!track || !track.children.length) return;

    const firstCard = track.children[0];
    const cardRect = firstCard.getBoundingClientRect();
    const trackStyles = window.getComputedStyle(track);
    const gap = parseFloat(trackStyles.columnGap || trackStyles.gap || '0') || 0;
    const step = cardRect.width + gap;

    positionRef.current += direction === 'next' ? -step : step;
    track.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;
    pauseThenResume();
  };

  const togglePlay = () => {
    setIsPlaying((playing) => {
      const nextPlaying = !playing;
      isPausedRef.current = !nextPlaying;
      window.clearTimeout(resumeTimeoutRef.current);
      return nextPlaying;
    });
  };

  const handleInteractionStart = () => {
    window.clearTimeout(resumeTimeoutRef.current);
    isPausedRef.current = true;
  };

  const handleInteractionEnd = () => {
    if (isPlaying) {
      isPausedRef.current = false;
    }
  };

  const trackServices = useMemo(
    () => Array.from({ length: TRACK_REPEAT_COUNT }, () => filteredServices).flat(),
    [filteredServices]
  );

  const renderCard = (service, key, isAccessible) => (
    <div
      key={key}
      className="service-card"
      aria-hidden={isAccessible ? undefined : true}
    >
      <div className="service-icon">{service.icon}</div>
      <h3 className="service-title">{service.title}</h3>
      <p className="service-description">{service.description}</p>
      <div className="service-keywords">
        {service.keywords.slice(0, 3).map((keyword) => (
          <span key={keyword} className="keyword-tag">
            {keyword}
          </span>
        ))}
      </div>
    </div>
  );

  return (
    <section id="services" className="services" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Project Management Services in Bulawayo</h2>
          <p className="section-subtitle">
            Our comprehensive services solve accountability gaps, poor cost control, and project delays for property owners and Diaspora clients.
          </p>
        </div>

        <div className="services-search-container">
          <div className="services-search-box">
            <FaSearch className="search-icon" />
            <input
              type="text"
              className="services-search-input"
              placeholder="Search services (e.g., 'Diaspora', 'Budget', 'Construction')..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search services"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                &times;
              </button>
            )}
          </div>
          {isSearching && (
            <p className="search-results-count">
              {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} found
            </p>
          )}
        </div>

        {isSearching ? (
          <div className="services-search-results">
            {filteredServices.length > 0 ? (
              filteredServices.map((service) => (
                <div key={service.id} className="service-card">
                  <div className="service-icon">{service.icon}</div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                  <div className="service-keywords">
                    {service.keywords.slice(0, 3).map((keyword) => (
                      <span key={keyword} className="keyword-tag">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>No services match your search. Try searching for 'Diaspora', 'Budget', or 'Construction'.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="services-carousel-area">
            <div
              className="services-carousel-wrapper"
              ref={wrapperRef}
              onMouseEnter={handleInteractionStart}
              onMouseLeave={handleInteractionEnd}
              onFocus={handleInteractionStart}
              onBlur={handleInteractionEnd}
              onTouchStart={handleInteractionStart}
              onTouchEnd={handleInteractionEnd}
            >
              <div className="services-carousel-controls">
                <button
                  type="button"
                  className="carousel-control carousel-control-prev"
                  onClick={() => nudge('prev')}
                  aria-label="Scroll to previous service"
                >
                  <FaChevronLeft /> Back
                </button>
                <button
                  type="button"
                  className="carousel-control carousel-control-play"
                  onClick={togglePlay}
                  aria-label={isPlaying ? 'Pause automatic scrolling' : 'Resume automatic scrolling'}
                  aria-pressed={!isPlaying}
                >
                  {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button
                  type="button"
                  className="carousel-control carousel-control-next"
                  onClick={() => nudge('next')}
                  aria-label="Scroll to next service"
                >
                  Next <FaChevronRight />
                </button>
              </div>

              <div className="services-carousel-viewport">
                <div className="services-grid" ref={trackRef} role="list" aria-label="Our services">
                  {trackServices.map((service, index) =>
                    renderCard(service, `${service.id}-${index}`, index < filteredServices.length)
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="services-commitment">
          <h3 className="commitment-heading">Our Commitment to You</h3>
          <p className="commitment-text">
            We place your interests first — integrity, transparency, and accountability in every project decision.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;

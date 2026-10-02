import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaCalendarAlt } from 'react-icons/fa';
import { handleMailtoClick } from '../utils/email';
import usePageMeta from '../hooks/usePageMeta';
import {
  EMAILJS_SERVICE_ID,
  EMAILJS_TEMPLATE_ID,
  EMAILJS_PUBLIC_KEY,
  IS_EMAILJS_CONFIGURED,
  NAME_REGEX,
  EMAIL_REGEX,
  PHONE_REGEX,
  MAX_MESSAGE_LENGTH,
  MIN_SUBMIT_DELAY_MS,
  DEFAULT_SUBMISSION_ERROR_MESSAGE,
  NOT_CONFIGURED_ERROR_MESSAGE,
  SERVICE_OPTIONS
} from '../utils/contactConfig';
import './Contact.css';

const HEADER_IMAGE = `${process.env.PUBLIC_URL}/Gemini_Generated_Image_hvu5aohvu5aohvu5.png`;
const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=Bulawayo%2C%20Zimbabwe&t=&z=12&ie=UTF8&iwloc=&output=embed';

// TODO: swap in the real scheduling link once provided (e.g. a Calendly URL).
const CALL_BOOKING_URL = 'https://calendly.com/your-link-here';

const MAX_LOCATION_LENGTH = 150;

const getInitialFormData = (presetServiceNeeded = '') => ({
  firstName: '',
  surname: '',
  email: '',
  phone: '',
  location: '',
  serviceNeeded: presetServiceNeeded,
  message: '',
  website: '',
  submittedAt: new Date().toISOString()
});

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ');

const normalizeFormData = (data) => ({
  firstName: normalizeText(data.firstName),
  surname: normalizeText(data.surname),
  email: data.email.trim().toLowerCase(),
  phone: data.phone.trim(),
  location: normalizeText(data.location),
  serviceNeeded: data.serviceNeeded,
  message: data.message.trim(),
  website: data.website.trim(),
  submittedAt: data.submittedAt
});

const validateFormData = (data) => {
  if (!NAME_REGEX.test(data.firstName)) {
    return 'Please enter a valid first name.';
  }

  if (!NAME_REGEX.test(data.surname)) {
    return 'Please enter a valid surname.';
  }

  if (!EMAIL_REGEX.test(data.email) || data.email.length > 254) {
    return 'Please enter a valid email address.';
  }

  if (!PHONE_REGEX.test(data.phone)) {
    return 'Please enter a valid phone or WhatsApp number.';
  }

  if (!data.location || data.location.length > MAX_LOCATION_LENGTH) {
    return 'Please enter your location.';
  }

  if (!data.serviceNeeded) {
    return 'Please select the service you need.';
  }

  if (!data.message) {
    return 'Please tell us a little about your project.';
  }

  if (data.message.length > MAX_MESSAGE_LENGTH) {
    return `Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`;
  }

  return null;
};

const Contact = () => {
  usePageMeta(
    'Contact Us',
    'Get in touch with Mthunzi Project Consultants in Bulawayo, Zimbabwe. Request a consultation for construction management, cost control or Diaspora property representation.'
  );

  const location = useLocation();
  const presetServiceNeeded = location.state?.serviceNeeded || '';

  const [formData, setFormData] = useState(() => getInitialFormData(presetServiceNeeded));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const formStartedAtRef = useRef(Date.now());

  useEffect(() => {
    if (!IS_EMAILJS_CONFIGURED) {
      // eslint-disable-next-line no-console
      console.warn(
        'EmailJS is not configured. Set REACT_APP_EMAILJS_SERVICE_ID, REACT_APP_EMAILJS_TEMPLATE_ID, ' +
          'and REACT_APP_EMAILJS_PUBLIC_KEY in your .env file.'
      );
      return;
    }

    try {
      emailjs.init(EMAILJS_PUBLIC_KEY);
    } catch (e) {
      // init may already be called or fail in some environments;
      // send() still receives the public key directly as a fallback.
      // eslint-disable-next-line no-console
      console.info('EmailJS init skipped or failed', e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((currentFormData) => ({
      ...currentFormData,
      [name]: value
    }));

    if (submitStatus) {
      setSubmitStatus(null);
      setSubmitMessage('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setSubmitStatus(null);
    setSubmitMessage('');

    const sanitizedData = normalizeFormData(formData);

    // Honeypot field: if filled, treat as spam and abort submission.
    if (sanitizedData.website) {
      setSubmitStatus('error');
      setSubmitMessage('Submission blocked.');
      return;
    }

    if (Date.now() - formStartedAtRef.current < MIN_SUBMIT_DELAY_MS) {
      setSubmitStatus('error');
      setSubmitMessage('Please take a moment to review your details before submitting.');
      return;
    }

    const validationError = validateFormData(sanitizedData);
    if (validationError) {
      setSubmitStatus('error');
      setSubmitMessage(validationError);
      return;
    }

    if (!IS_EMAILJS_CONFIGURED) {
      setSubmitStatus('error');
      setSubmitMessage(NOT_CONFIGURED_ERROR_MESSAGE);
      return;
    }

    setIsSubmitting(true);

    const serviceLabel =
      SERVICE_OPTIONS.find((option) => option.value === sanitizedData.serviceNeeded)?.label ||
      sanitizedData.serviceNeeded;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          firstName: sanitizedData.firstName,
          surname: sanitizedData.surname,
          fullName: `${sanitizedData.firstName} ${sanitizedData.surname}`.trim(),
          email: sanitizedData.email,
          phone: sanitizedData.phone,
          location: sanitizedData.location,
          serviceNeeded: serviceLabel,
          message: sanitizedData.message,
          submittedAt: sanitizedData.submittedAt
        },
        EMAILJS_PUBLIC_KEY
      );

      setSubmitStatus('success');
      setSubmitMessage("Thank you! We'll be in touch within 24 hours.");
      setFormData(getInitialFormData());
      formStartedAtRef.current = Date.now();
    } catch (error) {
      console.error('Error submitting consultation request.', error);
      setSubmitStatus('error');
      setSubmitMessage(DEFAULT_SUBMISSION_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <header className="page-intro section">
        <div className="container page-intro-grid">
          <div>
            <h1 className="page-intro-title">Let's talk about your project</h1>
            <p className="page-intro-subtitle">
              Share a few details and we'll follow up with a consultation.
            </p>
          </div>
          <div className="media-frame page-intro-media">
            <img src={HEADER_IMAGE} alt="Mthunzi Project Consultants shaking hands with a client on site" />
          </div>
        </div>
      </header>

      <section id="contact" className="contact section">
        <div className="container">
          <div className="contact-content">
            <div className="contact-info">
              <h3 className="contact-info-title">Contact details</h3>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaMapMarkerAlt />
                </div>
                <div className="contact-details">
                  <h4>Office Address</h4>
                  <p>Bulawayo, Zimbabwe</p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaWhatsapp />
                </div>
                <div className="contact-details">
                  <h4>WhatsApp</h4>
                  <p><a href="https://wa.me/263788756305" target="_blank" rel="noopener noreferrer" className="contact-link">+263 78 875 6305</a></p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaEnvelope />
                </div>
                <div className="contact-details">
                  <h4>Email</h4>
                  <p>
                    <a
                      href="mailto:mthunziprojectconsultants@gmail.com?subject=Project%20Consultation"
                      className="contact-link"
                      onClick={handleMailtoClick('Project Consultation')}
                    >
                      mthunziprojectconsultants@gmail.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="contact-info-item">
                <div className="contact-icon">
                  <FaCalendarAlt />
                </div>
                <div className="contact-details">
                  <h4>Prefer to Talk?</h4>
                  <p>
                    <a
                      href={CALL_BOOKING_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-link"
                    >
                      Book a 15-minute call
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="contact-form-wrapper card">
              <form onSubmit={handleSubmit} className="contact-form">
                <div className="form-honeypot" aria-hidden="true">
                  <label htmlFor="website">Company website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex="-1"
                    autoComplete="off"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="firstName">First Name *</label>
                    <input
                      id="firstName"
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      autoComplete="given-name"
                      maxLength="50"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,50}"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="surname">Surname *</label>
                    <input
                      id="surname"
                      type="text"
                      name="surname"
                      value={formData.surname}
                      onChange={handleChange}
                      placeholder="Surname"
                      autoComplete="family-name"
                      maxLength="50"
                      pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,50}"
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      maxLength="254"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="phone">Phone / WhatsApp *</label>
                    <input
                      id="phone"
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+263 ..."
                      autoComplete="tel"
                      maxLength="20"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="location">Location *</label>
                  <input
                    id="location"
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Suburb, City"
                    autoComplete="address-level2"
                    maxLength={MAX_LOCATION_LENGTH}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="serviceNeeded">Service Needed *</label>
                  <select
                    id="serviceNeeded"
                    name="serviceNeeded"
                    value={formData.serviceNeeded}
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled>
                      Select a service
                    </option>
                    {SERVICE_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us about your project..."
                    rows="5"
                    maxLength={MAX_MESSAGE_LENGTH}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-accent btn-lg submit-btn" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Request Consultation'}
                </button>

                {submitStatus && (
                  <div
                    className={`status-message ${submitStatus}`}
                    role={submitStatus === 'error' ? 'alert' : 'status'}
                    aria-live="polite"
                  >
                    {submitMessage}
                  </div>
                )}
              </form>
            </div>
          </div>

          <div className="contact-map-section card">
            <h3 className="contact-map-heading">Our Location</h3>
            <p className="contact-map-text">
              We're based in Bulawayo, Zimbabwe, and represent property owners on site here while
              keeping Diaspora clients updated wherever they are.
            </p>
            <div className="contact-map-embed">
              <iframe
                title="Mthunzi Project Consultants location - Bulawayo, Zimbabwe"
                src={MAP_EMBED_SRC}
                width="100%"
                height="320"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;

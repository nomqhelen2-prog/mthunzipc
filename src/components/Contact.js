import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt } from 'react-icons/fa';
import { handleMailtoClick } from '../utils/email';
import './Contact.css';

const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
const IS_EMAILJS_CONFIGURED = Boolean(EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY);

const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\-\s]{7,20}$/;
const MAX_LOCATION_LENGTH = 150;
const MAX_MESSAGE_LENGTH = 2000;
const MIN_SUBMIT_DELAY_MS = 2000;
const DEFAULT_SUBMISSION_ERROR_MESSAGE =
  "We're having a small connection hiccup right now. Please try again in a few minutes, or contact us directly.";
const NOT_CONFIGURED_ERROR_MESSAGE =
  'This form is temporarily unavailable. Please reach us directly using the contact details alongside the form.';

const SERVICE_OPTIONS = [
  { value: 'construction-management', label: 'Construction & Renovation Management' },
  { value: 'cost-control', label: 'Cost Control & Budget Tracking' },
  { value: 'contractor-accountability', label: 'Contractor Accountability & Supervision' },
  { value: 'diaspora-services', label: "Diaspora 'Eyes-on-the-Ground' Services" },
  { value: 'feasibility-studies', label: 'Feasibility Studies & Advisory' },
  { value: 'other', label: 'Other / Not Sure Yet' }
];

const getInitialFormData = () => ({
  firstName: '',
  surname: '',
  email: '',
  phone: '',
  location: '',
  serviceNeeded: '',
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

/**
 * Consultation request form and contact details for the site.
 */

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState(getInitialFormData);
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

  useEffect(() => {
    const sectionElement = sectionRef.current;
    if (!sectionElement) {
      return undefined;
    }

    const formGroups = sectionElement.querySelectorAll('.form-group');
    if (!formGroups.length) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle('is-near', entry.isIntersecting);
        });
      },
      {
        threshold: 0.35,
        rootMargin: '0px 0px -10% 0px'
      }
    );

    formGroups.forEach((group) => observer.observe(group));

    return () => {
      observer.disconnect();
    };
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
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">REQUEST A CONSULTATION</h2>
          <p className="section-subtitle">
            Share a few details and we will follow up with a consultation.
          </p>
        </div>

        <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">CONTACT US:</h3>

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
                <p><a href="https://wa.me/263784393141" target="_blank" rel="noopener noreferrer" className="contact-link">+263 78 439 3141</a></p>
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

            <div className="contact-info-description">
              <p>
                Whether you're a busy professional, property owner, small developer, or diaspora
                client needing trusted representation, we're here to ensure your project succeeds.
              </p>
            </div>
          </div>

          <div className="contact-form-wrapper">
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
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    placeholder="First Name *"
                    autoComplete="given-name"
                    maxLength="50"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,50}"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    placeholder="Surname *"
                    autoComplete="family-name"
                    maxLength="50"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ\s'\-]{2,50}"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    autoComplete="email"
                    maxLength="254"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone / WhatsApp Number *"
                    autoComplete="tel"
                    maxLength="20"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Location (Suburb, City) *"
                  autoComplete="address-level2"
                  maxLength={MAX_LOCATION_LENGTH}
                  required
                />
              </div>

              <div className="form-group">
                <select
                  name="serviceNeeded"
                  value={formData.serviceNeeded}
                  onChange={handleChange}
                  required
                  aria-label="Service needed"
                >
                  <option value="" disabled>
                    Service Needed *
                  </option>
                  {SERVICE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows="5"
                  maxLength={MAX_MESSAGE_LENGTH}
                  required
                ></textarea>
              </div>

              <button type="submit" className="submit-btn" disabled={isSubmitting}>
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
      </div>
    </section>
  );
};

export default Contact;

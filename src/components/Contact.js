import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const VISIT_REQUEST_ENDPOINT =
  process.env.REACT_APP_VISIT_REQUEST_API_URL || '/api/visit-request';
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,100}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NOTES_LENGTH = 2000;
const MIN_SUBMIT_DELAY_MS = 2000;
const DEFAULT_SUBMISSION_ERROR_MESSAGE =
  'Unable to send your request right now. Please try again or contact us directly.';

const getInitialFormData = () => ({
  visitorName: '',
  visitorEmail: '',
  visitDate: '',
  notes: '',
  website: '',
  submittedAt: new Date().toISOString()
});

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ');

const normalizeFormData = (data) => ({
  visitorName: normalizeText(data.visitorName),
  visitorEmail: data.visitorEmail.trim().toLowerCase(),
  visitDate: data.visitDate.trim(),
  notes: data.notes.trim(),
  website: data.website.trim(),
  submittedAt: data.submittedAt
});

const validateFormData = (data) => {
  if (!NAME_REGEX.test(data.visitorName)) {
    return 'Please enter a valid name.';
  }

  if (!EMAIL_REGEX.test(data.visitorEmail) || data.visitorEmail.length > 254) {
    return 'Please enter a valid email address.';
  }

  if (!data.visitDate || Number.isNaN(new Date(data.visitDate).getTime())) {
    return 'Please choose a valid visit date.';
  }

  if (data.notes.length > MAX_NOTES_LENGTH) {
    return `Notes must be ${MAX_NOTES_LENGTH} characters or fewer.`;
  }

  return null;
};

/**
 * Visit request form and contact details for the site.
 */

const Contact = () => {
  const sectionRef = useRef(null);
  const [formData, setFormData] = useState(getInitialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [submitMessage, setSubmitMessage] = useState('');
  const formStartedAtRef = useRef(Date.now());

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

    if (sanitizedData.website) {
      setSubmitStatus('success');
      setSubmitMessage("Thank you! We'll be in touch within 24 hours.");
      setFormData(getInitialFormData());
      formStartedAtRef.current = Date.now();
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

    setIsSubmitting(true);

    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 10000);

    try {
      const response = await fetch(VISIT_REQUEST_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        signal: controller.signal,
        body: JSON.stringify(sanitizedData)
      });

      const responseData = await response.json().catch(() => null);
      const wasSuccessful = response.ok && responseData?.status === 'Success';

      if (!wasSuccessful) {
        setSubmitStatus('error');
        setSubmitMessage(responseData?.message || DEFAULT_SUBMISSION_ERROR_MESSAGE);
        return;
      }

      setSubmitStatus('success');
      setSubmitMessage("Thank you! We'll be in touch within 24 hours.");
      setFormData(getInitialFormData());
      formStartedAtRef.current = Date.now();
    } catch (error) {
      console.error('Error submitting visit request.', error);
      setSubmitStatus('error');
      setSubmitMessage(
        error.name === 'AbortError'
          ? 'The request timed out. Please try again.'
          : DEFAULT_SUBMISSION_ERROR_MESSAGE
      );
    } finally {
      window.clearTimeout(timeoutId);
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="contact" ref={sectionRef}>
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">REQUEST A VISIT</h2>
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
                <FaPhone />
              </div>
              <div className="contact-details">
                <h4>Phone</h4>
                <p>+263 78 439 3141</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>mthunziprojectconsultants@gmail.com</p>
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
                    name="visitorName"
                    value={formData.visitorName}
                    onChange={handleChange}
                    placeholder="Full Name *"
                    autoComplete="name"
                    maxLength="100"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,100}"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="email"
                    name="visitorEmail"
                    value={formData.visitorEmail}
                    onChange={handleChange}
                    placeholder="Email Address *"
                    autoComplete="email"
                    maxLength="254"
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <input
                  type="date"
                  name="visitDate"
                  value={formData.visitDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows="5"
                  maxLength={MAX_NOTES_LENGTH}
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

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import emailjs from '@emailjs/browser';
import { FaTimes, FaPaperPlane, FaCommentDots } from 'react-icons/fa';
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
import './EnquiryModal.css';

const getInitialFormData = () => ({
  fullName: '',
  phone: '',
  email: '',
  serviceNeeded: '',
  message: '',
  website: '', // honeypot
  submittedAt: new Date().toISOString()
});

/**
 * Quick "Make an Enquiry" modal, reachable from the navbar on every page —
 * a lighter-weight alternative to the full Contact page form, using the same
 * EmailJS setup and validation rules (see utils/contactConfig.js).
 */
const EnquiryModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState(getInitialFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [statusMessage, setStatusMessage] = useState('');
  const openedAtRef = useRef(Date.now());

  // Reset the form each time the modal is (re)opened, and remember when it
  // opened for the same bot-delay check the Contact page form uses.
  useEffect(() => {
    if (isOpen) {
      setFormData(getInitialFormData());
      setStatus(null);
      setStatusMessage('');
      openedAtRef.current = Date.now();
    }
  }, [isOpen]);

  // Close on Escape, and stop the page behind the modal from scrolling.
  useEffect(() => {
    if (!isOpen) return undefined;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (status) {
      setStatus(null);
      setStatusMessage('');
    }
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;

    setStatus(null);
    setStatusMessage('');

    const fullName = formData.fullName.trim().replace(/\s+/g, ' ');
    const email = formData.email.trim().toLowerCase();
    const phone = formData.phone.trim();
    const message = formData.message.trim();

    // Honeypot: if this hidden field got filled in, it's a bot.
    if (formData.website.trim()) {
      setStatus('error');
      setStatusMessage('Submission blocked.');
      return;
    }

    if (Date.now() - openedAtRef.current < MIN_SUBMIT_DELAY_MS) {
      setStatus('error');
      setStatusMessage('Please take a moment to review your details before submitting.');
      return;
    }

    if (!NAME_REGEX.test(fullName)) {
      setStatus('error');
      setStatusMessage('Please enter your full name.');
      return;
    }

    if (!EMAIL_REGEX.test(email) || email.length > 254) {
      setStatus('error');
      setStatusMessage('Please enter a valid email address.');
      return;
    }

    if (!PHONE_REGEX.test(phone)) {
      setStatus('error');
      setStatusMessage('Please enter a valid mobile number.');
      return;
    }

    if (!formData.serviceNeeded) {
      setStatus('error');
      setStatusMessage('Please select the service you need.');
      return;
    }

    if (message.length > MAX_MESSAGE_LENGTH) {
      setStatus('error');
      setStatusMessage(`Message must be ${MAX_MESSAGE_LENGTH} characters or fewer.`);
      return;
    }

    if (!IS_EMAILJS_CONFIGURED) {
      setStatus('error');
      setStatusMessage(NOT_CONFIGURED_ERROR_MESSAGE);
      return;
    }

    setIsSubmitting(true);

    const serviceLabel =
      SERVICE_OPTIONS.find((option) => option.value === formData.serviceNeeded)?.label ||
      formData.serviceNeeded;

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          firstName: fullName,
          surname: '',
          fullName,
          email,
          phone,
          location: 'Not provided (quick enquiry)',
          serviceNeeded: serviceLabel,
          message: message || 'No additional details provided.',
          submittedAt: formData.submittedAt
        },
        EMAILJS_PUBLIC_KEY
      );

      setStatus('success');
      setStatusMessage("Thank you! We'll be in touch within 24 hours.");
      setFormData(getInitialFormData());
    } catch (error) {
      console.error('Error submitting enquiry.', error);
      setStatus('error');
      setStatusMessage(DEFAULT_SUBMISSION_ERROR_MESSAGE);
    } finally {
      setIsSubmitting(false);
    }
  };

  return createPortal(
    <div className="enquiry-backdrop" onClick={handleBackdropClick}>
      <div className="enquiry-modal" role="dialog" aria-modal="true" aria-labelledby="enquiry-modal-title">
        <button className="enquiry-close" onClick={onClose} aria-label="Close enquiry form">
          <FaTimes />
        </button>

        <div className="enquiry-header">
          <div className="enquiry-icon">
            <FaCommentDots />
          </div>
          <div>
            <h2 className="enquiry-title" id="enquiry-modal-title">Make an Enquiry</h2>
            <p className="enquiry-subtitle">
              Tell us what you need and we'll get back to you, usually within 24 hours.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="enquiry-form">
          <div className="enquiry-honeypot" aria-hidden="true">
            <label htmlFor="enquiry-website">Company website</label>
            <input
              id="enquiry-website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
              tabIndex="-1"
              autoComplete="off"
            />
          </div>

          <div className="enquiry-field">
            <label htmlFor="enquiry-fullName">Full Name *</label>
            <input
              id="enquiry-fullName"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              autoComplete="name"
              maxLength="80"
              required
            />
          </div>

          <div className="enquiry-row">
            <div className="enquiry-field">
              <label htmlFor="enquiry-phone">Mobile Number *</label>
              <input
                id="enquiry-phone"
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
            <div className="enquiry-field">
              <label htmlFor="enquiry-email">Email Address *</label>
              <input
                id="enquiry-email"
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
          </div>

          <div className="enquiry-field">
            <label htmlFor="enquiry-service">Service Needed *</label>
            <select
              id="enquiry-service"
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

          <div className="enquiry-field">
            <label htmlFor="enquiry-message">Message</label>
            <textarea
              id="enquiry-message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell us a bit more about what you need"
              rows="4"
              maxLength={MAX_MESSAGE_LENGTH}
            />
          </div>

          <button type="submit" className="enquiry-submit" disabled={isSubmitting}>
            <FaPaperPlane />
            {isSubmitting ? 'Sending...' : 'Send Enquiry'}
          </button>

          {status && (
            <div
              className={`enquiry-status ${status}`}
              role={status === 'error' ? 'alert' : 'status'}
              aria-live="polite"
            >
              {statusMessage}
            </div>
          )}
        </form>
      </div>
    </div>,
    document.body
  );
};

export default EnquiryModal;

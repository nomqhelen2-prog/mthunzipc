import React, { useEffect, useRef, useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Contact.css';

const CONSULTATION_EMAIL_ENDPOINT = 'https://formsubmit.co/ajax/mthunziprojectconsultants@gmail.com';
const ALLOWED_CLIENT_TYPES = new Set([
  'Busy Professional',
  'Property Owner',
  'Small Developer',
  'Diaspora Client',
  'Other'
]);
const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9+()\-\s]{7,20}$/;
const MAX_EMAIL_LENGTH = 254;
const MAX_PHONE_LENGTH = 20;
const MIN_MESSAGE_LENGTH = 20;
const MAX_MESSAGE_LENGTH = 2000;
const MIN_SUBMIT_DELAY_MS = 2000;
const REQUEST_TIMEOUT_MS = 10000;
const SQLI_PATTERN = /(\bunion\b\s+\bselect\b|\bselect\b\s+.+\bfrom\b|\binsert\b\s+\binto\b|\bupdate\b\s+.+\bset\b|\bdelete\b\s+\bfrom\b|\bdrop\b\s+\btable\b|\bor\b\s+['"]?1['"]?\s*=\s*['"]?1['"]?|--|\/\*|\*\/|;)/i;
const DEFAULT_SUBMISSION_ERROR_MESSAGE =
  'Unable to send your request right now. Please try again or contact us directly.';
const FILE_PROTOCOL_ERROR_MESSAGE =
  'Please open this website through a web server (for example, npm start or your live domain). Form submissions do not work from local HTML files.';

const getInitialFormData = () => ({
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  clientType: '',
  message: '',
  companyWebsite: ''
});

const normalizeText = (value) => value.trim().replace(/\s+/g, ' ');

const normalizeFormData = (data) => ({
  firstName: normalizeText(data.firstName),
  lastName: normalizeText(data.lastName),
  email: data.email.trim().toLowerCase(),
  phone: data.phone.trim(),
  clientType: data.clientType.trim(),
  message: data.message.trim(),
  companyWebsite: data.companyWebsite.trim()
});

const validateFormData = (data) => {
  if (!NAME_REGEX.test(data.firstName)) {
    return 'Please enter a valid first name.';
  }

  if (!NAME_REGEX.test(data.lastName)) {
    return 'Please enter a valid last name.';
  }

  if (data.email.length > MAX_EMAIL_LENGTH || !EMAIL_REGEX.test(data.email)) {
    return 'Please enter a valid email address.';
  }

  if (data.phone && !PHONE_REGEX.test(data.phone)) {
    return 'Please enter a valid phone number.';
  }

  if (!ALLOWED_CLIENT_TYPES.has(data.clientType)) {
    return 'Please select a valid client type.';
  }

  if (data.message.length < MIN_MESSAGE_LENGTH || data.message.length > MAX_MESSAGE_LENGTH) {
    return `Please enter a message between ${MIN_MESSAGE_LENGTH} and ${MAX_MESSAGE_LENGTH} characters.`;
  }

  const combinedInput = [
    data.firstName,
    data.lastName,
    data.email,
    data.phone,
    data.clientType,
    data.message
  ].join(' ');

  if (SQLI_PATTERN.test(combinedInput)) {
    return 'Your submission contains invalid characters or keywords. Please revise and try again.';
  }

  return null;
};

const isSuccessfulSubmission = (responseData) => (
  responseData == null ||
  responseData.success === 'true' ||
  responseData.success === true
);

const getProviderMessage = (responseData) => {
  if (!responseData || typeof responseData !== 'object') {
    return '';
  }

  return typeof responseData.message === 'string' ? responseData.message.trim() : '';
};

const mapProviderMessageToUserMessage = (providerMessage) => {
  if (!providerMessage) {
    return '';
  }

  const normalizedMessage = providerMessage.toLowerCase();

  if (normalizedMessage.includes('needs activation')) {
    return "Email delivery is not activated yet. Open the FormSubmit 'Activate Form' email for this inbox, then submit again.";
  }

  if (normalizedMessage.includes('open this page through a web server')) {
    return FILE_PROTOCOL_ERROR_MESSAGE;
  }

  if (normalizedMessage.includes('captcha')) {
    return 'Form verification failed. Please refresh the page and try again.';
  }

  return providerMessage;
};

const getSubmissionFailureMessage = (responseData) => {
  const providerMessage = getProviderMessage(responseData);
  return mapProviderMessageToUserMessage(providerMessage) || DEFAULT_SUBMISSION_ERROR_MESSAGE;
};

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

    if (sanitizedData.companyWebsite) {
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

    if (window.location.protocol === 'file:') {
      setSubmitStatus('error');
      setSubmitMessage(FILE_PROTOCOL_ERROR_MESSAGE);
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
    const timeoutId = window.setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(CONSULTATION_EMAIL_ENDPOINT, {
        method: 'POST',
        mode: 'cors',
        credentials: 'omit',
        cache: 'no-store',
        referrerPolicy: 'no-referrer',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          _subject: 'New Consultation Request - Mthunzi Project Consultants',
          _template: 'table',
          _captcha: 'true',
          _replyto: sanitizedData.email,
          firstName: sanitizedData.firstName,
          lastName: sanitizedData.lastName,
          email: sanitizedData.email,
          phone: sanitizedData.phone || 'Not provided',
          clientType: sanitizedData.clientType,
          message: sanitizedData.message,
          submittedAt: new Date().toISOString()
        })
      });

      const responseData = await response.json().catch(() => null);

      const wasSuccessful = response.ok && isSuccessfulSubmission(responseData);

      if (!wasSuccessful) {
        setSubmitStatus('error');
        setSubmitMessage(getSubmissionFailureMessage(responseData));
        return;
      }

      setSubmitStatus('success');
      setSubmitMessage("Thank you! We'll be in touch within 24 hours.");
      setFormData(getInitialFormData());
      formStartedAtRef.current = Date.now();
    } catch (error) {
      console.error('Error submitting consultation request.', error);
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
          <h2 className="section-title">GET IN TOUCH</h2>
          <p className="section-subtitle">
            Ready to protect your investment? Request a consultation today.
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
                <p>+263 XX XXX XXXX</p>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-icon">
                <FaEnvelope />
              </div>
              <div className="contact-details">
                <h4>Email</h4>
                <p>info@mthunzipc.co.zw</p>
              </div>
            </div>

            <div className="contact-info-description">
              <p>
                Whether you're a busy professional, property owner, small developer, 
                or diaspora client needing trusted representation, we're here to ensure 
                your project succeeds.
              </p>
            </div>
          </div>

          <div className="contact-form-wrapper">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-honeypot" aria-hidden="true">
                <label htmlFor="companyWebsite">Company website</label>
                <input
                  id="companyWebsite"
                  type="text"
                  name="companyWebsite"
                  value={formData.companyWebsite}
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
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}"
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    placeholder="Last Name *"
                    autoComplete="family-name"
                    maxLength="50"
                    pattern="[A-Za-zÀ-ÖØ-öø-ÿ' -]{2,50}"
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
                    maxLength={MAX_EMAIL_LENGTH}
                    required
                  />
                </div>
                <div className="form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    autoComplete="tel"
                    inputMode="tel"
                    maxLength={MAX_PHONE_LENGTH}
                  />
                </div>
              </div>

              <div className="form-group">
                <select
                  name="clientType"
                  value={formData.clientType}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Client Type *</option>
                  <option value="Busy Professional">Busy Professional</option>
                  <option value="Property Owner">Property Owner</option>
                  <option value="Small Developer">Small Developer</option>
                  <option value="Diaspora Client">Diaspora Client</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div className="form-group">
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  rows="5"
                  minLength={MIN_MESSAGE_LENGTH}
                  maxLength={MAX_MESSAGE_LENGTH}
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="submit-btn"
                disabled={isSubmitting}
              >
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

// Shared EmailJS configuration, validation patterns, and service list used by
// both the full Contact page form and the quick "Make an Enquiry" modal, so
// the two stay in sync instead of drifting apart as separate copies.

export const EMAILJS_SERVICE_ID = process.env.REACT_APP_EMAILJS_SERVICE_ID;
export const EMAILJS_TEMPLATE_ID = process.env.REACT_APP_EMAILJS_TEMPLATE_ID;
export const EMAILJS_PUBLIC_KEY = process.env.REACT_APP_EMAILJS_PUBLIC_KEY;
export const IS_EMAILJS_CONFIGURED = Boolean(
  EMAILJS_SERVICE_ID && EMAILJS_TEMPLATE_ID && EMAILJS_PUBLIC_KEY
);

export const NAME_REGEX = /^[A-Za-zÀ-ÖØ-öø-ÿ\s'-]{2,50}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const PHONE_REGEX = /^[0-9+()\-\s]{7,20}$/;
export const MAX_MESSAGE_LENGTH = 2000;
export const MIN_SUBMIT_DELAY_MS = 2000;

export const DEFAULT_SUBMISSION_ERROR_MESSAGE =
  "We're having a small connection hiccup right now. Please try again in a few minutes, or contact us directly.";
export const NOT_CONFIGURED_ERROR_MESSAGE =
  'This form is temporarily unavailable. Please reach us directly using the contact details alongside the form.';

export const SERVICE_OPTIONS = [
  { value: 'construction-management', label: 'Construction & Renovation Management' },
  { value: 'cost-control', label: 'Cost Control & Budget Tracking' },
  { value: 'contractor-accountability', label: 'Contractor Accountability & Supervision' },
  { value: 'diaspora-services', label: "Diaspora 'Eyes-on-the-Ground' Services" },
  { value: 'feasibility-studies', label: 'Feasibility Studies & Advisory' },
  { value: 'project-health-check', label: 'Project Health Check (Existing Project Review)' },
  { value: 'other', label: 'Other / Not Sure Yet' }
];

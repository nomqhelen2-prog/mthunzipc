const { createClient } = require('@supabase/supabase-js');
const { Resend } = require('resend');
const sanitizeHtml = require('sanitize-html');
const validator = require('validator');

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;
const RESEND_API_KEY = process.env.RESEND_API_KEY;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

const supabase =
  SUPABASE_URL && (SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY)
    ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY || SUPABASE_ANON_KEY)
    : null;

const resend = RESEND_API_KEY ? new Resend(RESEND_API_KEY) : null;

const MAX_NAME_LENGTH = 100;
const MAX_NOTES_LENGTH = 2000;
const MIN_SUBMIT_DELAY_MS = 2000;
const MAX_SUBMISSION_AGE_MS = 30 * 60 * 1000;
const recentSubmissionsByIp = new Map();

const cleanText = (value) => sanitizeHtml(String(value ?? ''), { allowedTags: [], allowedAttributes: {} }).trim();

const validatePayload = (payload) => {
  const visitorName = cleanText(payload.visitorName);
  const visitorEmail = cleanText(payload.visitorEmail).toLowerCase();
  const visitDate = cleanText(payload.visitDate);
  const notes = cleanText(payload.notes);
  const submittedAt = cleanText(payload.submittedAt);
  const honeypot = cleanText(payload.website);

  if (honeypot) {
    return { error: 'Error', status: 400, message: 'Submission blocked.' };
  }

  if (typeof visitorName !== 'string' || !visitorName || visitorName.length > MAX_NAME_LENGTH) {
    return { error: 'Error', status: 400, message: 'Please enter a valid name.' };
  }

  if (!validator.isEmail(visitorEmail) || visitorEmail.length > 254) {
    return { error: 'Error', status: 400, message: 'Please enter a valid email address.' };
  }

  if (!validator.isISO8601(visitDate, { strict: true, strictSeparator: true })) {
    return { error: 'Error', status: 400, message: 'Please choose a valid visit date.' };
  }

  const parsedVisitDate = new Date(visitDate);
  if (Number.isNaN(parsedVisitDate.getTime())) {
    return { error: 'Error', status: 400, message: 'Please choose a valid visit date.' };
  }

  if (notes.length > MAX_NOTES_LENGTH) {
    return { error: 'Error', status: 400, message: `Notes must be ${MAX_NOTES_LENGTH} characters or fewer.` };
  }

  const clientSubmittedAt = new Date(submittedAt);
  if (Number.isNaN(clientSubmittedAt.getTime())) {
    return { error: 'Error', status: 400, message: 'Invalid submission timestamp.' };
  }

  const elapsed = Date.now() - clientSubmittedAt.getTime();
  if (elapsed < MIN_SUBMIT_DELAY_MS) {
    return { error: 'Error', status: 429, message: 'Please wait a moment before submitting.' };
  }

  if (elapsed > MAX_SUBMISSION_AGE_MS) {
    return { error: 'Error', status: 400, message: 'Submission expired. Please refresh and try again.' };
  }

  return {
    visitorName,
    visitorEmail,
    visitDate: parsedVisitDate.toISOString(),
    notes,
    submittedAt: clientSubmittedAt.toISOString()
  };
};

const ensureDependencies = () => {
  if (!supabase) {
    throw new Error('Supabase environment variables are not configured.');
  }

  if (!resend || !ADMIN_EMAIL || !RESEND_FROM_EMAIL) {
    throw new Error('Email delivery environment variables are not configured.');
  }
};

const getSafeErrorMessage = (error) => {
  if (error && typeof error.message === 'string' && error.message.trim()) {
    return error.message.trim();
  }

  return 'Error';
};

const rateLimitVisitRequest = (ip) => {
  const now = Date.now();
  const lastSubmissionAt = recentSubmissionsByIp.get(ip);

  if (lastSubmissionAt && now - lastSubmissionAt < MIN_SUBMIT_DELAY_MS) {
    return false;
  }

  recentSubmissionsByIp.set(ip, now);

  for (const [cachedIp, cachedAt] of recentSubmissionsByIp.entries()) {
    if (now - cachedAt > MAX_SUBMISSION_AGE_MS) {
      recentSubmissionsByIp.delete(cachedIp);
    }
  }

  return true;
};

const submitVisitRequest = async (payload, requestMeta = {}) => {
  ensureDependencies();

  const normalized = validatePayload(payload);
  if (normalized.error) {
    return normalized;
  }

  const requestIp = requestMeta.ip || 'unknown';
  if (!rateLimitVisitRequest(requestIp)) {
    return { error: 'Error', status: 429, message: 'Please wait before submitting another request.' };
  }

  // Validate first so we only ever write clean, expected data into the database.
  // This reduces the chance of bad records and keeps malicious input away from storage.
  const { data: insertedRow, error: insertError } = await supabase
    .from('visit_requests')
    .insert([
      {
        visitor_name: normalized.visitorName,
        visitor_email: normalized.visitorEmail,
        visit_date: normalized.visitDate,
        notes: normalized.notes
      }
    ])
    .select('visitor_name, visitor_email, visit_date, notes')
    .single();

  if (insertError) {
    throw insertError;
  }

  // Only after a successful database insert do we notify the admin mailbox.
  // That keeps the email aligned with the persisted record and avoids false alerts.
  await resend.emails.send({
    from: RESEND_FROM_EMAIL,
    to: [ADMIN_EMAIL],
    replyTo: normalized.visitorEmail,
    subject: 'New Visit Request',
    text: [
      'A new visit request was submitted.',
      '',
      `Name: ${insertedRow.visitor_name}`,
      `Email: ${insertedRow.visitor_email}`,
      `Visit date: ${insertedRow.visit_date}`,
      `Notes: ${insertedRow.notes || 'No notes provided'}`,
      `Submitted at: ${normalized.submittedAt}`
    ].join('\n')
  });

  return { success: true, message: 'Success' };
};

module.exports = {
  submitVisitRequest,
  getSafeErrorMessage
};

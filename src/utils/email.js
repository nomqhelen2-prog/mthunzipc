const ADMIN_EMAIL = 'mthunziprojectconsultants@gmail.com';

/**
 * Builds a Gmail web-compose URL. Used as a fallback for mailto: links so email
 * still works in browsers/devices that don't have a default mail client configured
 * (mailto: still works fine on its own for the majority of real visitors, but this
 * covers the rest without any extra setup, since the business inbox is Gmail).
 */
export const buildGmailComposeUrl = (subject = '') => {
  const params = new URLSearchParams({ view: 'cm', fs: '1', to: ADMIN_EMAIL });
  if (subject) {
    params.set('su', subject);
  }
  return `https://mail.google.com/mail/?${params.toString()}`;
};

/**
 * Click handler for an <a href="mailto:..."> link. Plain left-clicks are redirected
 * to the Gmail web-compose fallback by navigating the current tab there directly
 * (window.open() was tried first, but pop-up blockers silently swallow it in a lot
 * of browsers even on a genuine click, so a direct navigation is used instead since
 * it can't be blocked that way). Middle-click / ctrl-click / cmd-click are left
 * alone so they still open the plain mailto: link in a new tab as the browser
 * normally would.
 */
export const handleMailtoClick = (subject = '') => (event) => {
  const isModifiedClick = event.metaKey || event.ctrlKey || event.shiftKey || event.button === 1;
  if (isModifiedClick) {
    return;
  }

  event.preventDefault();
  window.location.href = buildGmailComposeUrl(subject);
};

export default ADMIN_EMAIL;

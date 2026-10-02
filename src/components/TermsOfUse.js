import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

const LAST_UPDATED = 'September 2026';

/**
 * Terms of Use for this website (as distinct from a services engagement
 * contract, which would be a separate document signed once a client
 * proceeds). Framed around Zimbabwean law, including the Consumer
 * Protection Act [Chapter 14:44] (Act No. 5 of 2019).
 */
const TermsOfUse = () => {
  usePageMeta(
    'Terms of Use',
    'Terms and conditions for using the Mthunzi Project Consultants website, governed by the laws of Zimbabwe.'
  );

  return (
    <section className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Terms of Use</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <p className="legal-intro">
          These Terms of Use govern your access to and use of this website, operated by Mthunzi
          Project Consultants ("we", "us", "our"), based in Bulawayo, Zimbabwe. By browsing this
          website or submitting the consultation request form, you agree to these terms. If you do
          not agree, please do not use the site.
        </p>

        <div className="legal-section">
          <h2 className="legal-section-title">1. Purpose of this website</h2>
          <p>
            This website is provided to introduce our project management, cost control, and
            contractor-oversight services and to let visitors request a consultation. It does not
            process payments, sell goods, or allow online purchases. No e-commerce or payment
            functionality exists on this site.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">2. Not a substitute for a services agreement</h2>
          <p>
            Content on this website, including service descriptions and indicative pricing, is
            provided for general information only and does not constitute a binding offer, quote, or
            contract. Submitting the consultation request form, WhatsApp message, or email starts a
            conversation. It does not, by itself, create a contract between you and Mthunzi Project
            Consultants. Any engagement for services will be confirmed separately, in writing, once
            scope, timeline, and fees have been agreed.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">3. Accuracy of information</h2>
          <p>
            We take reasonable care to keep the information on this website accurate and current, in
            line with the disclosure obligations set out in the Consumer Protection Act [Chapter
            14:44] (Act No. 5 of 2019). However, we do not guarantee that every detail, including
            indicative pricing, is free of error or applies to your specific circumstances. Always
            confirm project-specific scope and pricing with us directly before relying on it.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">4. Acceptable use</h2>
          <p>When using this website, you agree not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent information through the contact form;</li>
            <li>Attempt to interfere with, disrupt, or gain unauthorised access to the website or its underlying systems;</li>
            <li>Use the website to transmit spam, malware, or unlawful content; or</li>
            <li>Scrape, copy, or republish the website's content for commercial use without our permission.</li>
          </ul>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">5. Intellectual property</h2>
          <p>
            The text, layout, graphics, and branding on this website belong to Mthunzi Project
            Consultants, unless otherwise credited, and are protected under Zimbabwean copyright law.
            You may view and share pages of this website for personal, non-commercial reference, but
            may not reproduce, modify, or redistribute our content for commercial purposes without
            our prior written consent.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">6. Third-party links and services</h2>
          <p>
            This website links to third-party services, including WhatsApp, email, a call-booking
            provider, and the EmailJS service that delivers our contact form, to make it easier to
            reach us. We are not responsible for the content, availability, or privacy practices of
            those third-party services once you leave our website or use them to contact us.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">7. Limitation of liability</h2>
          <p>
            To the fullest extent permitted under the laws of Zimbabwe, Mthunzi Project Consultants
            will not be liable for any indirect, incidental, or consequential loss arising from your
            use of, or inability to use, this website. Nothing in these terms excludes or limits any
            liability that cannot lawfully be excluded or limited under Zimbabwean law, including
            rights available to you under the Consumer Protection Act [Chapter 14:44].
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">8. Changes to these terms</h2>
          <p>
            We may update these Terms of Use from time to time to reflect changes in our website,
            services, or Zimbabwean law. The "Last updated" date at the top of this page shows when
            it was last revised. Continued use of the website after a change means you accept the
            updated terms.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">9. Governing law</h2>
          <p>
            These Terms of Use are governed by, and construed in accordance with, the laws of
            Zimbabwe. Any dispute arising from your use of this website will be subject to the
            exclusive jurisdiction of the courts of Zimbabwe.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">10. Contact us</h2>
          <p>
            Questions about these Terms of Use can be sent to{' '}
            <a href="mailto:mthunziprojectconsultants@gmail.com">
              mthunziprojectconsultants@gmail.com
            </a>{' '}
            or via WhatsApp at +263 78 875 6305. We are based in Bulawayo, Zimbabwe.
          </p>
        </div>

        <div className="legal-note">
          <p>
            These terms are provided as a general description of how this website may be used and are
            not a substitute for independent legal advice. If you need these terms reviewed or
            tailored for a specific legal purpose, we recommend consulting a Zimbabwean lawyer.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TermsOfUse;

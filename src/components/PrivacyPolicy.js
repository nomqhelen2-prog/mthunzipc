import React from 'react';
import usePageMeta from '../hooks/usePageMeta';
import './LegalPage.css';

const LAST_UPDATED = 'September 2026';

/**
 * Privacy Policy, written for this site's actual data practices and framed
 * around Zimbabwe's data protection framework — principally the Cyber and
 * Data Protection Act [Chapter 12:07] (Act No. 5 of 2021), which designates
 * POTRAZ (the Postal and Telecommunications Regulatory Authority of
 * Zimbabwe) as the Data Protection Authority. This is not a substitute for
 * legal advice; see the closing note.
 */
const PrivacyPolicy = () => {
  usePageMeta(
    'Privacy Policy',
    'How Mthunzi Project Consultants collects, uses, and protects personal information submitted through this website, in line with Zimbabwe\'s Cyber and Data Protection Act [Chapter 12:07].'
  );

  return (
    <section className="legal-page">
      <div className="container">
        <div className="legal-header">
          <h1 className="legal-title">Privacy Policy</h1>
          <p className="legal-updated">Last updated: {LAST_UPDATED}</p>
        </div>

        <p className="legal-intro">
          Mthunzi Project Consultants ("we", "us", "our") operates this website to introduce our
          project management services and to let visitors request a consultation. This policy
          explains what personal information we collect through the site, how we use it, and the
          rights you have over it under Zimbabwean law, principally the Cyber and Data Protection
          Act [Chapter 12:07] (Act No. 5 of 2021).
        </p>

        <div className="legal-section">
          <h2 className="legal-section-title">1. Who we are</h2>
          <p>
            Mthunzi Project Consultants is a project management consultancy based in Bulawayo,
            Zimbabwe. For the purposes of this policy, and of the Cyber and Data Protection Act, we
            act as the "data controller" for personal information submitted through this website.
            You can reach us using the details in Section 9 below.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">2. Information we collect</h2>
          <p>We collect information in two ways:</p>
          <ul>
            <li>
              <strong>Information you give us directly.</strong> When you submit the consultation
              request form on our Contact page, we collect your first name, surname, email address,
              phone/WhatsApp number, location, the service you're interested in, and any message you
              choose to write. If you instead contact us via WhatsApp, email, or a call-booking link,
              we receive whatever information you share through those channels.
            </li>
            <li>
              <strong>Information collected automatically.</strong> This website does not use
              analytics or advertising cookies. Our hosting provider may automatically log basic
              technical information (such as IP address and browser type) for security and
              performance purposes, in the ordinary course of serving the site.
            </li>
          </ul>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">3. How we use your information</h2>
          <p>We use the information you submit to:</p>
          <ul>
            <li>Respond to your consultation request and communicate with you about your project;</li>
            <li>Assess the scope of work and prepare quotes or proposals;</li>
            <li>Keep records of client and prospective client communications; and</li>
            <li>Meet legal, accounting, or regulatory obligations where applicable.</li>
          </ul>
          <p>We do not sell or rent your personal information to third parties.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">4. Legal basis for processing</h2>
          <p>
            We process your personal information on the basis of your consent (given by submitting
            the form or messaging us), and where necessary to take steps at your request before
            entering into a service agreement with you, consistent with the data processing
            principles set out in the Cyber and Data Protection Act [Chapter 12:07].
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">5. Sharing your information</h2>
          <p>
            We do not sell your personal information. We share it only with the following categories
            of third parties, strictly to operate this website and deliver our services:
          </p>
          <ul>
            <li>
              <strong>EmailJS:</strong> the service that delivers consultation request form
              submissions from this website to our inbox. Form data passes through EmailJS's
              infrastructure to reach us.
            </li>
            <li>
              <strong>WhatsApp (Meta) and email providers:</strong> if you choose to contact us via
              WhatsApp or email, that conversation is subject to the relevant provider's own privacy
              practices.
            </li>
            <li>
              <strong>Call-booking provider:</strong> if you book a call through the scheduling link
              on our Contact page, the scheduling provider processes the details you enter there.
            </li>
          </ul>
          <p>
            We may also disclose personal information if required to do so by Zimbabwean law or by a
            competent authority.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">6. Cross-border data transfer</h2>
          <p>
            Some of the third-party services listed above may store or process data on servers
            located outside Zimbabwe. Where this happens, we rely on those providers' own security
            and data protection safeguards, consistent with the transborder data flow provisions of
            the Cyber and Data Protection Act [Chapter 12:07].
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">7. Data retention</h2>
          <p>
            We keep consultation request details and related correspondence for as long as needed to
            respond to your enquiry, deliver any engagement that follows from it, and meet our
            record-keeping obligations, after which we delete or anonymise it, unless a longer
            retention period is required by law.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">8. Your rights</h2>
          <p>Under the Cyber and Data Protection Act [Chapter 12:07], you have the right to:</p>
          <ul>
            <li>Ask us what personal information we hold about you and why;</li>
            <li>Request that we correct inaccurate or incomplete information;</li>
            <li>Request that we delete personal information we no longer have a valid reason to keep;</li>
            <li>Withdraw consent to processing, where consent is our basis for holding your information; and</li>
            <li>
              Lodge a complaint with the Postal and Telecommunications Regulatory Authority of
              Zimbabwe (POTRAZ), Zimbabwe's designated Data Protection Authority, if you believe we
              have mishandled your information.
            </li>
          </ul>
          <p>To exercise any of these rights, contact us using the details in Section 9.</p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">9. Security</h2>
          <p>
            We take reasonable technical and organisational measures to protect the personal
            information you share with us against loss, misuse, or unauthorised access. No method of
            transmission over the internet is completely secure, so we cannot guarantee absolute
            security.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">10. Children's privacy</h2>
          <p>
            This website and our services are directed at adults seeking project management
            services. We do not knowingly collect personal information from children.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">11. Changes to this policy</h2>
          <p>
            We may update this policy from time to time to reflect changes in our practices or in
            Zimbabwean law. The "Last updated" date at the top of this page shows when it was last
            revised.
          </p>
        </div>

        <div className="legal-section">
          <h2 className="legal-section-title">12. Contact us</h2>
          <p>
            For any question about this policy or how we handle your personal information, contact
            us at{' '}
            <a href="mailto:mthunziprojectconsultants@gmail.com">
              mthunziprojectconsultants@gmail.com
            </a>{' '}
            or via WhatsApp at +263 78 875 6305. We are based in Bulawayo, Zimbabwe.
          </p>
        </div>

        <div className="legal-note">
          <p>
            This policy is provided as a general description of our data practices and is not a
            substitute for independent legal advice. If you need this policy reviewed or tailored for
            a specific legal or regulatory purpose, we recommend consulting a Zimbabwean lawyer
            qualified in data protection law.
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacyPolicy;

# Mthunzi Project Consultants - Professional Portfolio Website

A modern, professional React web application for Mthunzi Project Consultants (MPC), a project management firm committed to protecting client interests through expert construction oversight and cost control.

## 🎯 About MPC

Mthunzi Project Consultants is a professional project management firm established in 2000. We specialize in:
- Construction and renovation project management
- Financial control and cost tracking
- Quality assurance and site supervision
- Diaspora representation services

**We do not build. We manage, coordinate, supervise, and control.**

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **FormSubmit** - Contact form email delivery
- **React Icons** - Professional iconography
- **CSS3** - Custom styling with CSS variables

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn
- Access to the destination mailbox for FormSubmit activation/verification

## 🔧 Installation

1. Clone or navigate to the project directory:
```bash
cd "c:\Mthunzi Project Consultants"
```

2. Install dependencies:
```bash
npm install
```

3. Activate FormSubmit for the destination mailbox:
   - Submit the form once from the deployed site or local test instance
   - Open the activation email sent by FormSubmit
   - Confirm the destination mailbox before expecting production delivery

## 🏃‍♂️ Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## 📦 Building for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files.

## 🎨 Design Features

### Color Palette
- **Deep Cocoa Brown** (#4A3121) - Text and headers
- **Golden Tan** (#B4926A) - Icons, buttons, and accents
- **Soft Cream** (#F2EADC) - Background

### Typography
- **Playfair Display** - Elegant serif for headings
- **Inter** - Clean sans-serif for body text

### Professional Aesthetic
- Sharp edges and clean lines
- Executive/consultant vibe (not construction worker)
- Ample white space
- Sophisticated color scheme

## 📱 Sections

1. **Hero** - Powerful headline with clear value proposition
2. **What We Do** - 4-card service grid highlighting core offerings
3. **About** - Company story emphasizing integrity and accountability
4. **Contact** - Professional form for consultation requests

## 🔐 Contact Form Security

The consultation form currently includes these client-side safeguards:

- Strict input validation and length limits
- Hidden honeypot field to reduce bot submissions
- Minimum form completion time check
- Request timeout handling
- Provider captcha left enabled
- Browser `Content-Security-Policy` and referrer restrictions

Important: a frontend-only form can be hardened, but it cannot provide full server-side protections on its own. For stronger production security, move email delivery behind a backend or serverless endpoint with:

- Server-side validation and sanitization
- Rate limiting and IP/device abuse controls
- Bot protection such as CAPTCHA or Turnstile verification
- Secret management outside the browser
- Centralized audit logging and monitoring
- Domain email authentication with SPF, DKIM, and DMARC

## 📞 Contact Information

For inquiries about this application or MPC services:
- **Email**: info@mthunzipc.co.zw
- **Location**: Harare, Zimbabwe

## 🌟 Core Values

- **Integrity** - Honesty and transparency in every interaction
- **Accountability** - Full responsibility for commitments
- **Transparency** - Clear communication and documentation

## 📄 License

© 2026 Mthunzi Project Consultants. All rights reserved.

---

Built with precision and professionalism for MPC's digital presence.

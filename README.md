# Mthunzi Project Consultants - Professional Portfolio Website

A modern, professional React web application for Mthunzi Project Consultants (MPC), a project management firm committed to protecting client interests through expert construction oversight and cost control.

## About MPC

Mthunzi Project Consultants is a professional project management firm established in 2025. We specialize in:
- Construction and renovation project management
- Financial control and cost tracking
- Quality assurance and site supervision
- Diaspora representation services

**We do not build. We manage, coordinate, supervise, and control.**

## Tech Stack

- **React 18** - Modern UI library
- **EmailJS** - Client-side contact form email delivery (no backend required)
- **React Icons** - Professional iconography
- **CSS3** - Custom styling with CSS variables

## Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn
- An [EmailJS](https://www.emailjs.com/) account with a service and template configured

## Installation

1. Clone or navigate to the project directory:
```bash
cd "c:\Mthunzi Project Consultants"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example` and set these values from your EmailJS dashboard:
   - `REACT_APP_EMAILJS_SERVICE_ID`
   - `REACT_APP_EMAILJS_TEMPLATE_ID`
   - `REACT_APP_EMAILJS_PUBLIC_KEY`

   Your EmailJS template must accept these variables: `visitorName`, `visitorEmail`, `visitDate`, `notes`, `submittedAt`.

## Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

## Building for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files.

## Deploying to Vercel

This project is a static React app. Connect the repository to Vercel and use the default build settings (`npm run build`, output directory `build`). Set the three `REACT_APP_EMAILJS_*` environment variables in the Vercel project settings.

## Design Features

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

## Sections

1. **Showcase** - Powerful headline with clear value proposition
2. **Services** - Auto-scrolling carousel highlighting core service offerings
3. **About** - Company story, mission/vision/values, and what makes MPC different
4. **Contact** - Professional form for consultation requests

## Contact Form Security

The visit request form includes basic client-side abuse protection:

- Input validation (name, email, date, notes length) before submission
- Hidden honeypot field to catch simple bots
- Minimum time-on-form delay before allowing submission

Because this is a client-side-only integration, treat it as a spam deterrent rather than a hard security boundary. For stronger protection, consider adding a CAPTCHA to the EmailJS template flow.

## Contact Information

For inquiries about this application or MPC services:
- **Email**: mthunziprojectconsultants@gmail.com
- **Location**: Bulawayo, Zimbabwe

## Core Values

- **Integrity** - Honesty and transparency in every interaction
- **Accountability** - Full responsibility for commitments
- **Transparency** - Clear communication and documentation

## License

© 2026 Mthunzi Project Consultants. All rights reserved.

---

Built with precision and professionalism for MPC's digital presence.

# Mthunzi Project Consultants - Professional Portfolio Website

A modern, professional React web application for Mthunzi Project Consultants (MPC), a project management firm committed to protecting client interests through expert construction oversight and cost control.

## 🎯 About MPC

Mthunzi Project Consultants is a professional project management firm established in 2025. We specialize in:
- Construction and renovation project management
- Financial control and cost tracking
- Quality assurance and site supervision
- Diaspora representation services

**We do not build. We manage, coordinate, supervise, and control.**

## 🚀 Tech Stack

- **React 18** - Modern UI library
- **Express** - Server-side request handler for the visit form
- **Supabase** - Database storage for visit requests
- **Resend** - Admin notification email delivery
- **React Icons** - Professional iconography
- **CSS3** - Custom styling with CSS variables

## 📋 Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn
- A Supabase project with a `visit_requests` table
- A Resend account with a verified sending domain or inbox
- Access to the admin mailbox that should receive visit request alerts

## 🔧 Installation

1. Clone or navigate to the project directory:
```bash
cd "c:\Mthunzi Project Consultants"
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from `.env.example` and set these values:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `CLIENT_ORIGIN`
   - `REACT_APP_VISIT_REQUEST_API_URL`

4. Create the `visit_requests` table in Supabase with these columns:
   - `visitor_name`
   - `visitor_email`
   - `visit_date`
   - `notes`

## 🏃‍♂️ Running the Application

Start the development server:
```bash
npm start
```

The application will open at [http://localhost:3000](http://localhost:3000)

Start the secure backend in a second terminal:
```bash
npm run server
```

The API listens on [http://localhost:4000](http://localhost:4000) and the React app proxies `/api/visit-request` there during development.

## 📦 Building for Production

Create an optimized production build:
```bash
npm run build
```

The build folder will contain the production-ready files.

## 🌐 Deploying to GitHub Pages

This project is configured for GitHub Pages deployment.

Publish the site with:

```bash
npm run deploy
```

After deployment, your site will be available at:
https://nomqhelen2-prog.github.io/mthunzipc

Important: GitHub Pages can host the frontend, but it cannot run the secure server-side visit request handler. The React app must call a separately hosted backend or serverless function for the form to insert into Supabase and send the admin email.

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

1. **Showcase** - Powerful headline with clear value proposition
2. **What We Do** - 4-card service grid highlighting core offerings
3. **About** - Company story emphasizing integrity and accountability
4. **Contact** - Professional form for consultation requests

## 🔐 Visit Request Security

The visit request form now uses a server-side handler with these protections:

- Input validation before any database write
- Sanitization of text fields before insertion
- Supabase parameterized inserts into `visit_requests`
- Admin email notification only after a successful insert
- Hidden honeypot field and timestamp checks for basic abuse reduction
- Server-side secret management through environment variables

The browser only sends the request payload. Supabase and Resend credentials stay on the server.

## 📞 Contact Information

For inquiries about this application or MPC services:
- **Email**: info@mthunzipc.co.zw
- **Location**: Bulawayo, Zimbabwe

## 🔁 Form Submission Flow

The consultation form posts JSON to `POST /api/visit-request`. The server validates the request, stores it in Supabase, and then sends a notification email to the admin address using Resend.

## 🌟 Core Values

- **Integrity** - Honesty and transparency in every interaction
- **Accountability** - Full responsibility for commitments
- **Transparency** - Clear communication and documentation

## 📄 License

© 2026 Mthunzi Project Consultants. All rights reserved.

---

Built with precision and professionalism for MPC's digital presence.

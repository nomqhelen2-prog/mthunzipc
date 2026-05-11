import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import Services from './components/Services';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  // Inject Local Business Schema (JSON-LD) for SEO
  useEffect(() => {
    const schemaScript = document.createElement('script');
    schemaScript.type = 'application/ld+json';
    schemaScript.innerHTML = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfessionalService',
      name: 'Mthunzi Project Consultants',
      description: 'Professional project management firm providing oversight, cost control, and accountability for property owners and Diaspora clients in Bulawayo, Zimbabwe.',
      url: 'https://www.mthunzipc.co.zw',
      telephone: '+263 XX XXX XXXX',
      email: 'info@mthunzipc.co.zw',
      address: {
        '@type': 'PostalAddress',
        addressStreet: 'Bulawayo',
        addressRegion: 'Bulawayo',
        addressCountry: 'Zimbabwe',
        addressLocality: 'Bulawayo'
      },
      areaServed: {
        '@type': 'City',
        name: 'Bulawayo',
        containedIn: {
          '@type': 'Country',
          name: 'Zimbabwe'
        }
      },
      serviceType: [
        'Project Management',
        'Construction Oversight',
        'Cost Control & Budget Tracking',
        'Contractor Accountability',
        'Diaspora Property Representation',
        'Feasibility Studies'
      ],
      potentialAction: {
        '@type': 'RequestAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: 'https://www.mthunzipc.co.zw/#contact'
        }
      },
      sameAs: [],
      image: '%PUBLIC_URL%/logo.png',
      priceRange: '$$$'
    });
    document.head.appendChild(schemaScript);

    return () => {
      document.head.removeChild(schemaScript);
    };
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Showcase />
      <Services />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

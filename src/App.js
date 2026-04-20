import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhatWeDo from './components/WhatWeDo';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <WhatWeDo />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

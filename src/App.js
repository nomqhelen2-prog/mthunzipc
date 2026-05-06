import React from 'react';
import Navbar from './components/Navbar';
import Showcase from './components/Showcase';
import WhatWeDo from './components/WhatWeDo';
import About from './components/About';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <div className="App">
      <Navbar />
      <Showcase />
      <WhatWeDo />
      <About />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;

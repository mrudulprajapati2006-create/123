
import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { NexPOSSection } from './components/NexPOSSection';
import { KhaoJiSection } from './components/KhaoJiSection';
import { NexPOSPage } from './components/NexPOSPage';
import { KhaoJiTeaser } from './components/KhaoJiTeaser';
import { FoundersSection } from './components/FoundersSection';
import { ContactSection } from './components/ContactSection';
import { ContactPage } from './components/ContactPage';
import { Footer } from './components/Footer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [initialContactMessage, setInitialContactMessage] = useState('');

  const handleNavigate = (page: string, sectionId?: string, initialMessage?: string) => {
    setCurrentPage(page);
    if (initialMessage !== undefined) {
      setInitialContactMessage(initialMessage);
    }
    
    // Handle scrolling after view update
    if (sectionId) {
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 selection:bg-black selection:text-white">
      <Navbar onNavigate={handleNavigate} currentPage={currentPage} />
      <main>
        {currentPage === 'home' && (
          <>
            <Hero onNavigate={handleNavigate} />
            <NexPOSSection onNavigate={handleNavigate} />
            <KhaoJiTeaser onNavigate={handleNavigate} />
            <FoundersSection />
            <ContactSection initialMessage={initialContactMessage} />
          </>
        )}
        {currentPage === 'khaoji' && (
          <KhaoJiSection onNavigate={handleNavigate} />
        )}
        {currentPage === 'nexpos' && (
          <NexPOSPage onNavigate={handleNavigate} />
        )}
        {currentPage === 'contact' && (
          <ContactPage onNavigate={handleNavigate} initialMessage={initialContactMessage} />
        )}
      </main>
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export default App;

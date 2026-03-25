import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NavItem } from '../types';

interface NavbarProps {
  onNavigate: (page: string, sectionId?: string, message?: string) => void;
  currentPage: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: 'home' },
  { label: 'NexPOS', href: 'nexpos' },
  { label: 'KhaoJi', href: 'khaoji' },
  { label: 'Contact', href: 'contact' },
];

export const Navbar: React.FC<NavbarProps> = ({ onNavigate, currentPage }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: string, sectionId?: string, message: string = '') => {
    onNavigate(page, sectionId, message);
    setIsOpen(false);
  };

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('home')} className="flex items-center gap-4 group focus:outline-none">
          <div className="relative h-16 w-56 overflow-hidden bg-white/50 rounded-lg backdrop-blur-sm border border-transparent hover:border-gray-200 transition-colors">
            <img 
              src="https://res.cloudinary.com/deic5ha4h/image/upload/v1774445653/ENVISION_bharat_logo_2_qsqh2o.png" 
              alt="Envision Bharat Logo" 
              className="h-full w-full object-contain object-center transform scale-125 group-hover:scale-135 transition-transform duration-500"
            />
          </div>
        </button>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href, item.sectionId, '')}
              className={`text-sm font-medium transition-colors hover:text-blue-600 ${
                (currentPage === item.href && !item.sectionId) ? 'text-blue-600 font-semibold' : 'text-gray-800'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('contact', undefined, 'Inquiry for starting a new project with ENVISION BHARAT')}
            className="px-5 py-2.5 text-sm font-semibold text-white bg-black rounded-full hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-gray-800"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-white shadow-xl transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col p-6 space-y-4">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item.href, item.sectionId, '')}
              className="text-left text-lg font-medium text-gray-800 hover:text-blue-600"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

import React, { useState } from 'react';
import { Mail, MapPin, Phone, Github, Twitter, Linkedin, Check, Loader2 } from 'lucide-react';

interface FooterProps {
  onNavigate: (page: string, sectionId?: string, message?: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    
    setLoading(true);
    try {
      // For now, just simulate a subscription since Firebase is removed
      // and user didn't specify EmailJS for subscription specifically, 
      // but we could use it if needed.
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setSubscribed(true);
      setEmail('');
      
      // Reset the success state after a delay
      setTimeout(() => setSubscribed(false), 5000);
    } catch (err) {
      console.error("Subscription Error:", err);
      alert("Something went wrong with the subscription. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer id="contact" className="bg-gray-900 text-white pt-20 pb-10">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <button onClick={() => onNavigate('home')} className="flex items-center group focus:outline-none text-left">
              <div className="relative h-16 w-56 overflow-hidden bg-white/10 rounded-lg backdrop-blur-sm border border-white/10 group-hover:border-white/20 transition-colors">
                <img 
                  src="https://res.cloudinary.com/deic5ha4h/image/upload/v1774445653/ENVISION_bharat_logo_2_qsqh2o.png" 
                  alt="Envision Bharat Logo" 
                  className="h-full w-full object-contain object-center transform scale-125 group-hover:scale-135 transition-transform duration-500"
                />
              </div>
            </button>
            <p className="text-gray-400 leading-relaxed">
              Empowering businesses with intelligent technology. ENVISION BHARAT builds innovative products that make a difference.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Products</h4>
            <ul className="space-y-4 text-gray-400">
              <li>
                <button 
                  onClick={() => onNavigate('nexpos')} 
                  className="hover:text-white transition-colors"
                >
                  NexPOS
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('khaoji')} 
                  className="hover:text-white transition-colors"
                >
                  KhaoJi
                </button>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-gray-400">
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-blue-400" />
                <button 
                  onClick={() => onNavigate('contact')} 
                  className="hover:text-white transition-colors text-left"
                >
                  admin@envisionbharat.com
                </button>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-blue-400" />
                <span>+91 9313163984</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin size={18} className="text-blue-400" />
                <span>Ahmedabad, India</span>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-6">Social</h4>
            <div className="flex gap-6 text-gray-400">
              <a 
                href="https://www.linkedin.com/company/envision-bharat/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="hover:text-white transition-colors"
                title="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex justify-center items-center">
          <p className="text-gray-500 text-sm text-center">
            © {new Date().getFullYear()} ENVISION BHARAT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

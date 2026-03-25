import React from 'react';
import { Store, ArrowRight, CheckCircle2 } from 'lucide-react';

interface KhaoJiTeaserProps {
  onNavigate: (page: string, sectionId?: string, message?: string) => void;
}

export const KhaoJiTeaser: React.FC<KhaoJiTeaserProps> = ({ onNavigate }) => {
  return (
    <section className="py-16 bg-blue-50/30 overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          <div className="w-full lg:w-1/2 flex justify-center lg:justify-start relative mb-8 lg:mb-0">
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-blue-200/40 blur-3xl rounded-full -z-10"></div>
              <div className="relative group perspective-1000">
                <div className="relative z-10 w-full max-w-[280px] sm:max-w-[340px] md:max-w-[42rem] lg:max-w-[34rem] rounded-[2rem] border-8 border-gray-900 bg-gray-900 shadow-2xl overflow-hidden transform transition-transform duration-500 hover:rotate-y-6 hover:scale-105">
                    <img 
                        src="https://res.cloudinary.com/deic5ha4h/image/upload/v1765133183/Screenshot_2025-12-06_232917_dvdolb.png" 
                        alt="KhaoJi App Interface" 
                        className="w-full h-auto object-cover"
                    />
                </div>
             </div>
          </div>
          <div className="w-full lg:w-1/2 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-bold tracking-wide uppercase">
              <Store size={14} /> Business Solutions
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              KhaoJi
            </h2>
            <h3 className="text-2xl text-blue-600 font-medium">
              Simplified Solutions for Modern Enterprises
            </h3>
            <p className="text-gray-600 text-lg leading-relaxed">
              The ultimate solution designed specifically for businesses looking to scale. Manage inventory, orders, and customer engagement seamlessly with our specialized tools.
            </p>
            <ul className="space-y-3 pt-2">
                {['Live Analytics Dashboard', 'Smart Table Management', 'Comprehensive Inventory Control'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-gray-700 font-medium">
                         <div className="text-blue-600"><CheckCircle2 size={18} /></div>
                        {item}
                    </li>
                ))}
            </ul>
            <div className="pt-8">
              <button 
                onClick={() => onNavigate('khaoji')}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold shadow-lg hover:bg-blue-600 transition-all duration-300 group"
              >
                View Full Features
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  onNavigate: (page: string, sectionId?: string, message?: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white pt-28 pb-12 md:pt-32 md:pb-20">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-blue-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] bg-purple-50 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 border border-gray-200 text-xs sm:text-sm font-medium text-gray-600 mb-6 md:mb-8 animate-[fadeInUp_0.6s_ease-out_forwards]">
          <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
          Empowering BHARAT Through Innovation
        </div>
        
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-gray-900 mb-6 leading-[1.1] md:leading-tight animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] opacity-0">
          Future of <span className="bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 gradient-text text-transparent">Innovation</span>
          <br />
          Start Here.
        </h1>
        
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.2s_forwards] opacity-0 px-4 sm:px-0">
          Envision Bharat is a software IT company which develops new tech innovative products. We build solutions that make a real difference, empowering businesses with cutting-edge technology and seamless digital experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards] opacity-0 w-full sm:w-auto">
          <button 
            onClick={() => onNavigate('home', 'nexpos')}
            className="group w-full sm:w-auto px-8 py-4 bg-black text-white rounded-full font-semibold text-base md:text-lg transition-all hover:bg-gray-800 hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-3"
          >
            <span>Explore Products</span>
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform shrink-0" />
          </button>
        </div>
      </div>
    </section>
  );
};
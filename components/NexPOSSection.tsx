import React, { useState, useEffect } from 'react';
import { Scan, CreditCard, Zap, CheckCircle2, QrCode } from 'lucide-react';

interface NexPOSSectionProps {
  onNavigate: (page: string, sectionId?: string, message?: string) => void;
}

export const NexPOSSection: React.FC<NexPOSSectionProps> = ({ onNavigate }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  useEffect(() => {
    let interval: any;
    if (isHovered) {
      interval = setInterval(() => {
        setScanProgress(prev => {
          const next = prev + 1.5;
          if (next >= 100) {
            clearInterval(interval);
            onNavigate('nexpos');
            return 100;
          }
          return next;
        });
      }, 20);
    } else {
      setScanProgress(0);
    }
    return () => clearInterval(interval);
  }, [isHovered, onNavigate]);

  return (
    <section id="nexpos" className="bg-black text-white py-16 md:py-20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="w-full lg:w-1/2 space-y-8">
            <div className="inline-block px-3 py-1 border border-white/20 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
              The Flagship Product
            </div>
            
            <img 
              src="https://res.cloudinary.com/deic5ha4h/image/upload/v1765910365/Screenshot_2025-12-15_012655_x1a0st.png" 
              alt="NexPOS Logo"
              className="h-20 md:h-24 w-auto object-contain bg-white/10 p-2 rounded-3xl backdrop-blur-sm border border-white/10" 
            />

            <h2 className="text-4xl md:text-6xl font-bold tracking-tighter leading-tight">
              Queue-less Transactions.<br />
              <span className="text-gray-500">Just Scan. Pay. Go.</span>
            </h2>
            
            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
              NexPOS is a revolutionary transaction management system designed to eliminate waiting lines. Empower your customers to shop and checkout instantly using our advanced mobile-first technology.
            </p>

            <div className="space-y-4 pt-4">
              {[
                { icon: <Scan size={24} />, title: "Instant Scan", desc: "Lightning fast barcode scanning." },
                { icon: <CreditCard size={24} />, title: "Seamless Payments", desc: "Integrated digital payment gateways." },
                { icon: <Zap size={24} />, title: "Zero Queues", desc: "No more standing in line." },
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                  <div className="text-white mt-1">{feature.icon}</div>
                  <div>
                    <h4 className="font-bold text-lg">{feature.title}</h4>
                    <p className="text-gray-400 text-sm">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-6">
              <button 
                onClick={() => onNavigate('nexpos')}
                className="bg-white text-black px-8 py-4 rounded-lg font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                Learn More <CheckCircle2 size={20} />
              </button>
            </div>
          </div>

          <div className="w-full lg:w-1/2 flex justify-center lg:justify-end relative">
            <div 
                className="relative cursor-pointer group w-full max-w-[280px] md:max-w-md aspect-[4/5] flex items-center justify-center"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => onNavigate('nexpos')}
            >
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full"></div>
                <div className="relative z-10 bg-white p-4 md:p-6 rounded-3xl shadow-2xl transform transition-transform duration-500 group-hover:scale-95">
                    <QrCode size={140} className="md:w-[200px] md:h-[200px] text-black" />
                    <div className="absolute inset-0 border-4 border-dashed border-gray-300 rounded-3xl opacity-50"></div>
                </div>
                <div className={`absolute z-20 transition-all duration-700 ease-in-out ${
                    isHovered 
                        ? 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-110' 
                        : 'top-[60%] left-[60%] -translate-x-1/2 -translate-y-1/2 rotate-12 scale-90 opacity-80'
                }`}>
                    <div className="w-48 h-[380px] md:w-64 md:h-[500px] bg-gray-900 border-[8px] md:border-[12px] border-gray-800 rounded-[2rem] md:rounded-[3rem] shadow-2xl overflow-hidden relative">
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 h-4 md:h-6 w-16 md:w-24 bg-black rounded-b-xl z-20"></div>
                        <div className="absolute inset-0 bg-black flex flex-col items-center justify-center">
                            <div className="w-32 h-32 md:w-48 md:h-48 border-2 border-white/50 rounded-2xl relative overflow-hidden mb-6 md:mb-8">
                                <div className="absolute top-0 left-0 w-6 h-6 md:w-8 md:h-8 border-t-4 border-l-4 border-blue-500 rounded-tl-xl"></div>
                                <div className="absolute top-0 right-0 w-6 h-6 md:w-8 md:h-8 border-t-4 border-r-4 border-blue-500 rounded-tr-xl"></div>
                                <div className="absolute bottom-0 left-0 w-6 h-6 md:w-8 md:h-8 border-b-4 border-l-4 border-blue-500 rounded-bl-xl"></div>
                                <div className="absolute bottom-0 right-0 w-6 h-6 md:w-8 md:h-8 border-b-4 border-r-4 border-blue-500 rounded-br-xl"></div>
                                <div className={`absolute left-0 w-full h-0.5 bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,1)] ${isHovered ? 'animate-[scan_1.5s_ease-in-out_infinite]' : ''} top-0`}></div>
                            </div>
                            <p className="text-white/80 font-mono tracking-widest text-[10px] md:text-sm mb-3 md:mb-4">
                                {isHovered ? (scanProgress === 100 ? 'SCANNED!' : 'SCANNING...') : 'MOVE TO SCAN'}
                            </p>
                            <div className="w-32 md:w-40 h-1 md:h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-blue-500 transition-all duration-75 ease-linear"
                                    style={{ width: `${scanProgress}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-16 text-center transition-opacity duration-300 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
                    <p className="text-gray-400 text-sm animate-bounce">Hover to Scan Code</p>
                </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @keyframes scan {
          0%, 100% { top: 0%; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          50% { top: 100%; }
        }
      `}</style>
    </section>
  );
};
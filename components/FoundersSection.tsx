
import React from 'react';
import { Linkedin } from 'lucide-react';

export const FoundersSection: React.FC = () => {
  const founders = [
    {
      name: "Nishit Patel",
      role: "Co-founder",
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/c_crop,w_700,h_1200/v1768071401/WhatsApp_Image_2026-01-11_at_12.25.23_AM_algixw.jpg",
      bio: "Technological pioneer architecting the next generation of innovative software and business intelligence.",
      linkedin: "https://www.linkedin.com/in/nishit-patel-b1689334b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
      imgPos: "object-bottom"
    },
    {
      name: "Mrudul Prajapati",
      role: "Co-founder",
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1768071830/shared_image_16_evzvuo.jpg",
      bio: "Visionary leader driving the strategic direction of ENVISION BHARAT's technological ecosystem.",
      linkedin: "https://www.linkedin.com/in/mrudul-prajapati-916037375",
      imgPos: "object-[center_75%]"
    },
    {
      name: "Sumit Bharodiya",
      role: "Co-founder",
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1774455351/Gemini_Generated_Image_k1jzp5k1jzp5k1jz_cqxzic.png",
      bio: "Sumit Bharodiya is a forward-thinking entrepreneur committed to building impactful ventures. As our mentor, he brings strategic clarity, helping shape our vision and execution.",
      linkedin: "https://www.linkedin.com/in/sumit-bharodiya-417126110/",
      imgPos: "object-center"
    }
  ];

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-24 md:mb-32">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-6 tracking-tight">
            The Minds Behind <br /><span className="text-blue-600">ENVISION BHARAT</span>
          </h2>
          <p className="text-gray-500 text-lg">
            Dedicated to transforming the global technological landscape through innovation and persistent engineering.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 max-w-6xl mx-auto">
          {founders.map((founder, idx) => (
            <div key={idx} className="group relative">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-gray-100 aspect-[5/6] shadow-xl transition-all duration-500 group-hover:shadow-blue-500/20">
                <img 
                  src={founder.image} 
                  alt={founder.name}
                  className={`w-full h-full object-cover ${founder.imgPos} grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500"></div>
                
                <div className="absolute inset-0 p-5 flex flex-col justify-end text-white">
                  <div className="transform transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <div className="overflow-hidden">
                      <p className="text-gray-300 text-[13px] leading-relaxed mb-3 opacity-0 group-hover:opacity-100 transition-all duration-500 max-h-0 group-hover:max-h-40">
                        {founder.bio}
                      </p>
                    </div>
                    
                    <h3 className="text-xl font-black mb-0.5">{founder.name}</h3>
                    <p className="text-blue-400 font-black uppercase tracking-[0.2em] text-[9px] mb-3">{founder.role}</p>
                    
                    <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                      <a 
                        href={founder.linkedin} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="p-1.5 bg-white/10 backdrop-blur-md rounded-full hover:bg-blue-600 transition-colors"
                        title="LinkedIn"
                      >
                        <Linkedin size={14} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};


import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowLeft, ArrowRight, Scan, Zap, Cpu, CircleDollarSign, Globe, CreditCard, 
  ShieldCheck, LayoutDashboard, ShoppingCart, Package, Truck, 
  FileBarChart, Wallet, Tag, Users, Settings, FileText, Download, 
  History, Mail, ChevronRight, BarChart3, Receipt, UserCheck, Lock,
  PlusCircle, RefreshCw, Layers, PieChart, Percent, HardDrive, 
  Key, Database, ExternalLink, QrCode, X, FileSpreadsheet, ShieldAlert,
  Info, AlertCircle, Banknote, Clock, HardDriveDownload, CheckCircle2,
  Smartphone
} from 'lucide-react';

interface NexPOSPageProps {
  onNavigate: (page: string, sectionId?: string, initialMessage?: string) => void;
}

type AnimationStage = 'entering' | 'waiting' | 'scanning' | 'revealed';

interface SmartFeature {
  id: string;
  title: string;
  icon: React.ReactNode;
  description: string;
  details: string[];
  image: string;
}

const getEntranceClass = (dir: string) => {
  switch (dir) {
    case 'from-left': return '-translate-x-[200px] opacity-0';
    case 'from-right': return 'translate-x-[200px] opacity-0';
    case 'from-top': return '-translate-y-[200px] opacity-0';
    case 'from-bottom': return 'translate-y-[200px] opacity-0';
    default: return 'opacity-0 scale-50';
  }
};

export const NexPOSPage: React.FC<NexPOSPageProps> = ({ onNavigate }) => {
  const [stage, setStage] = useState<AnimationStage>('entering');
  const [selectedFeature, setSelectedFeature] = useState<SmartFeature | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  
  const [customerImageIndex, setCustomerImageIndex] = useState(0);
  const customerImages = [
    "https://res.cloudinary.com/deic5ha4h/image/upload/v1767374743/Media_24_faf1u4.jpg",
    "https://res.cloudinary.com/deic5ha4h/image/upload/v1767374744/Media_23_w1jy6u.jpg"
  ];

  const nextCustomerImage = () => setCustomerImageIndex((prev) => (prev + 1) % customerImages.length);
  const prevCustomerImage = () => setCustomerImageIndex((prev) => (prev - 1 + customerImages.length) % customerImages.length);

  const [isCustomerScanning, setIsCustomerScanning] = useState(false);
  const [customerScanProgress, setCustomerScanProgress] = useState(0);
  
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  
  const scanTimerRef = useRef<any>(null);
  const customerScanTimerRef = useRef<any>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    setStage('revealed');
  }, []);

  useEffect(() => {
    if (isCustomerScanning) {
      customerScanTimerRef.current = setInterval(() => {
        setCustomerScanProgress(prev => {
          if (prev >= 100) {
            clearInterval(customerScanTimerRef.current);
            return 100;
          }
          return prev + 1.5;
        });
      }, 20);
    } else {
      if (customerScanTimerRef.current) clearInterval(customerScanTimerRef.current);
      setCustomerScanProgress(0);
    }
    return () => {
      if (customerScanTimerRef.current) clearInterval(customerScanTimerRef.current);
    };
  }, [isCustomerScanning]);

  const smartFeatures: SmartFeature[] = [
    {
      id: 'dashboard',
      title: "NexPOS Dashboard",
      icon: <LayoutDashboard className="text-blue-400" />,
      description: "Your centralized command center for high-level business intelligence and real-time operations.",
      details: ["Real-time sales monitoring", "Interactive growth KPIs", "Staff activity logs", "Live performance feed"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997206/Screenshot_2025-12-18_001310_uj8poq.png"
    },
    {
      id: 'cart',
      title: "Live Cart Intelligence",
      icon: <ShoppingCart className="text-cyan-400" />,
      description: "Complete visibility into active shopping sessions and historical billing data.",
      details: ["Live status of every cart", "History of paid bills", "Cart abandonment alerts", "Instant bill verification"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1766001400/Screenshot_2025-12-18_012610_mnbbuh.png"
    },
    {
      id: 'inventory',
      title: "Inventory Master",
      icon: <Package className="text-purple-400" />,
      description: "Enterprise-grade stock control with deep movement analytics and bulk operations.",
      details: ["Single & Bulk adding", "Stock movement history", "Inventory audit trails", "Real-time stock sync"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997206/Screenshot_2025-12-18_001347_pve2b3.png"
    },
    {
      id: 'supply',
      title: "Supply Chain & PO",
      icon: <Truck className="text-indigo-400" />,
      description: "Streamlined supplier management with automated Purchase Order generation and tracking.",
      details: ["Supplier management", "Integrated Email POs", "PO status tracking", "Direct vendor comms"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1766001512/Screenshot_2025-12-18_012820_xreohl.png"
    },
    {
      id: 'finance',
      title: "Exportable Tax Hub",
      icon: <FileSpreadsheet className="text-blue-500" />,
      description: "Professional grade reporting with one-click exports for tax compliance and business audits.",
      details: ["Excel & PDF Data Export", "Month-wise Tax liability", "Net taxable amount calc", "Top-selling analytics"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997207/Screenshot_2025-12-18_001438_uqrn3s.png"
    },
    {
      id: 'cash',
      title: "Cash Flow Hub",
      icon: <Wallet className="text-green-400" />,
      description: "Comprehensive financial tracking including online revenue and expense management.",
      details: ["Cash in & Cash out logs", "Online revenue tracking", "Net cash flow monitoring", "Built-in expense tracker"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997207/Screenshot_2025-12-18_001456_j9nr8u.png"
    },
    {
      id: 'promo',
      title: "Promotions Engine",
      icon: <Tag className="text-orange-400" />,
      description: "Dynamic offer and coupon management to drive store-wide or product-specific growth.",
      details: ["Store & Category offers", "Product-wise coupons", "Discount applier tracking", "Campaign analytics"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997206/Screenshot_2025-12-18_001409_fgdlwf.png"
    },
    {
      id: 'crm',
      title: "Configurable Loyalty",
      icon: <UserCheck className="text-pink-400" />,
      description: "Admin-configurable loyalty points system to reward and retain your best customers.",
      details: ["Customizable Reward Tiers", "Points Redemption Ledger", "Admin Rules Engine", "Lifetime Spend Tracking"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997207/Screenshot_2025-12-18_001522_tnbqvp.png"
    },
    {
      id: 'enterprise',
      title: "Secure Role Access",
      icon: <ShieldAlert className="text-gray-400" />,
      description: "Secure role-based login system with admin-driven role provisioning and permission controls.",
      details: ["Secure Role Assignment", "Granular Access Rights", "Admin Configuration Console", "Role Activity Audits"],
      image: "https://res.cloudinary.com/deic5ha4h/image/upload/v1765997207/Screenshot_2025-12-18_001555_n2ie1i.png"
    }
  ];

  const handleFeatureClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    const feat = smartFeatures.find(f => f.id === id);
    if (feat) {
      setSelectedFeature(feat);
    }
  };

  const whyNexPOS = [
    { icon: <Cpu size={32} />, title: "Nex Technology", desc: "The next generation of POS systems built with a cutting-edge stack for unmatched speed.", entrance: 'from-left' },
    { icon: <Zap size={32} />, title: "Instant Checkout", desc: "Reduce checkout time by 90%. Scan, Pay, Leave without ever waiting in a queue.", entrance: 'from-top' },
    { icon: <Globe size={32} />, title: "Cloud Native", desc: "Real-time inventory sync across all your locations. Access data from anywhere.", entrance: 'from-right' },
    { icon: <CreditCard size={32} />, title: "Universal Payments", desc: "Support for all major cards, digital wallets, and UPI for a frictionless experience.", entrance: 'from-left' },
    { icon: <ShieldCheck size={32} />, title: "Enterprise Security", desc: "Bank-grade encryption for every transaction and customer data point.", entrance: 'from-bottom' },
    { icon: <Scan size={32} />, title: "Smart Barcodes", desc: "AI-powered scanner that reads damaged or low-light codes with zero latency.", entrance: 'from-right' }
  ];

  const handleConsultationClick = () => {
    const message = selectedPlan 
      ? `Inquiry for starting NexPOS subscription with ${selectedPlan}` 
      : 'Inquiry for starting NexPOS subscription (No specific plan selected)';
    onNavigate('contact', undefined, message);
  };

  return (
    <div className="min-h-screen bg-black text-white pt-20 overflow-x-hidden">
      {/* Laptop Modal */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 lg:p-12 animate-fade-in overflow-y-auto">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-2xl" onClick={() => setSelectedFeature(null)}></div>
          
          <div className="relative w-full max-w-6xl group flex flex-col items-center my-auto">
             <div className="relative bg-gray-900 rounded-t-3xl border-[8px] md:border-[16px] border-gray-900 w-full aspect-video shadow-[0_0_100px_rgba(59,130,246,0.2)] overflow-hidden animate-[laptopOpen_0.8s_ease-out]">
                <button 
                  onClick={() => setSelectedFeature(null)}
                  className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-red-500 rounded-full text-white transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="w-full h-full bg-gray-950 relative flex items-center justify-center">
                  <img 
                    src={selectedFeature.image} 
                    alt={selectedFeature.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="hidden lg:block absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-2xl border border-white/10 max-w-sm">
                    <h3 className="text-xl font-bold mb-1 text-blue-400">{selectedFeature.title}</h3>
                    <p className="text-gray-400 text-xs leading-relaxed">{selectedFeature.description}</p>
                  </div>
                </div>
             </div>
             <div className="relative mx-auto bg-gray-800 h-4 md:h-6 w-[104%] -left-[2%] rounded-b-2xl shadow-2xl flex justify-center items-start animate-[laptopBase_0.8s_ease-out]">
                <div className="w-32 md:w-48 h-1 md:h-2 bg-gray-700 rounded-b-md"></div>
             </div>
             
             {/* Mobile/Tablet Text - Below Laptop */}
             <div className="lg:hidden mt-8 p-6 bg-gray-900/50 backdrop-blur-md rounded-3xl border border-white/10 w-full text-center">
                <h3 className="text-2xl font-bold mb-2 text-blue-400">{selectedFeature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{selectedFeature.description}</p>
                <div className="mt-6 flex flex-wrap justify-center gap-4">
                  {selectedFeature.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-gray-300">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      {detail}
                    </div>
                  ))}
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Navigation Back */}
      <div className="container mx-auto px-6 py-8">
        <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group">
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 mb-24 animate-fade-in-up">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-sm font-medium text-blue-300">
             <Scan size={16} /> The Future of Checkout
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tight">
            Nex<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">POS</span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Eliminate queues forever. Our scan-and-go technology empowers your customers to checkout in seconds using their own smartphones.
          </p>
        </div>

        <div className="mt-16 relative rounded-[2.5rem] overflow-hidden border border-white/10 shadow-[0_0_100px_rgba(59,130,246,0.1)] aspect-[4/5] md:aspect-video bg-gray-900 flex items-center justify-center group max-w-5xl mx-auto transition-transform duration-700 hover:scale-[1.01]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 z-10"></div>
            <img 
                src="https://res.cloudinary.com/deic5ha4h/image/upload/v1765997206/Screenshot_2025-12-18_001310_uj8poq.png" 
                alt="NexPOS Dashboard"
                className="w-full h-full object-cover object-left opacity-80 group-hover:scale-105 transition-transform duration-[1.5s]"
            />
            <div className="absolute bottom-6 left-6 md:bottom-16 md:left-16 text-left z-20">
                <div className="flex items-center gap-2 md:gap-3 mb-2 md:mb-3">
                   <div className="w-8 md:w-10 h-0.5 md:h-1 bg-blue-500 rounded-full"></div>
                   <span className="text-blue-400 font-mono text-[10px] md:text-xs uppercase tracking-widest">Enterprise UI</span>
                </div>
                <h3 className="text-2xl md:text-4xl font-black mb-2 md:mb-2 text-white">Simplicity First</h3>
                <p className="text-gray-400 text-xs md:text-base max-w-[240px] md:max-w-sm">Crafted for humans, built for speed. An interface so intuitive, it needs zero training.</p>
            </div>
        </div>
      </div>

      {/* Why NexPOS? Interactive Grid */}
      <div className="bg-gray-950 py-20 relative">
        <div className="container mx-auto px-6 relative">
            <div className="text-center mb-20">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">Why Nex<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">POS</span>?</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto relative min-h-[600px]">
                {whyNexPOS.map((feature, i) => (
                    <div key={i} className={`p-10 rounded-[2.5rem] bg-black border border-blue-500/30 ring-1 ring-blue-500/10 shadow-[0_0_40px_rgba(59,130,246,0.05)] relative overflow-hidden group`}>
                        <div className="opacity-100 translate-y-0 scale-100">
                            <div className="mb-6 text-blue-400 group-hover:scale-110 transition-transform duration-500">{feature.icon}</div>
                            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                            <p className="text-gray-400 leading-relaxed text-sm">{feature.desc}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>

      {/* Experience the Customer App UI */}
      <div className="py-20 bg-black relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #3b82f6 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
        
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
            <div className="w-full lg:w-1/2 space-y-8 order-2 lg:order-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-black tracking-widest uppercase text-blue-400">
                <Smartphone size={14} /> Mobile Customer Interface
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-tight">
                Empower Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Customer's Device.</span>
              </h2>
              <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                NexPOS isn't just a merchant tool. It's a complete ecosystem that puts the checkout power in the customer's pocket. No app download required—just scan the store QR and start shopping.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-blue-500/20 text-blue-400 rounded-xl flex items-center justify-center mb-4">
                    <Zap size={20} />
                  </div>
                  <h4 className="font-bold text-lg mb-1">Zero Friction</h4>
                  <p className="text-gray-500 text-xs">PWA technology means instant access via browser.</p>
                </div>
                <div className="p-6 bg-white/5 border border-white/10 rounded-3xl hover:bg-white/10 transition-colors">
                  <div className="w-10 h-10 bg-cyan-500/20 text-cyan-400 rounded-xl flex items-center justify-center mb-4">
                    <Receipt size={20} />
                  </div>
                  <h4 className="font-bold text-lg mb-1">Instant Bills</h4>
                  <p className="text-gray-500 text-xs">Digital receipts delivered instantly via WhatsApp or Email.</p>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 flex justify-center order-1 lg:order-2">
              <div className="relative w-full max-w-[320px] aspect-[9/19] flex items-center justify-center group/phone">
                <div className="absolute inset-0 bg-blue-500/20 blur-[100px] rounded-full opacity-40"></div>
                
                {/* Navigation Arrows - Positioned on the edges */}
                <button 
                  onClick={(e) => { e.stopPropagation(); prevCustomerImage(); }}
                  className="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-black/60 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-all border border-white/10 shadow-xl"
                >
                  <ArrowLeft size={windowWidth < 768 ? 16 : 24} />
                </button>
                <button 
                  onClick={(e) => { e.stopPropagation(); nextCustomerImage(); }}
                  className="absolute -right-4 md:-right-12 top-1/2 -translate-y-1/2 z-50 p-2 md:p-3 bg-black/60 hover:bg-blue-600 rounded-full text-white backdrop-blur-sm transition-all border border-white/10 shadow-xl"
                >
                  <ArrowRight size={windowWidth < 768 ? 16 : 24} />
                </button>

                <div className="relative z-40 w-full h-full bg-gray-900 border-[10px] border-gray-800 rounded-[3rem] shadow-[0_0_80px_rgba(59,130,246,0.2)] overflow-hidden">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-20"></div>
                  
                  <div className="w-full h-full bg-white relative overflow-hidden">
                    <img 
                      src={customerImages[customerImageIndex]} 
                      alt={`Customer UI ${customerImageIndex + 1}`} 
                      className="w-full h-full object-cover transition-opacity duration-500"
                    />
                  </div>

                  {/* Indicators */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50 flex gap-2">
                    {customerImages.map((_, i) => (
                      <div 
                        key={i} 
                        className={`w-1.5 h-1.5 rounded-full transition-all ${i === customerImageIndex ? 'bg-blue-500 w-4' : 'bg-gray-400'}`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Smart Features Section Container */}
      <div ref={containerRef} className={`py-20 bg-black border-t border-white/5 relative overflow-hidden transition-all duration-1000 delay-300 opacity-100 translate-y-0`}>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-24">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-full text-[10px] font-bold tracking-widest uppercase mb-4">
               The Enterprise OS
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">NexPOS Smart Features</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Experience the future. Click on a card's <span className="text-white font-bold">QR code</span> to unlock the high-fidelity enterprise interface instantly.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-7xl mx-auto relative">
            {smartFeatures.map((feature) => (
              <div 
                key={feature.id} 
                className={`group relative p-10 rounded-[2.5rem] bg-gray-900/30 backdrop-blur-md border border-white/5 transition-all duration-500 flex flex-col h-full overflow-hidden hover:bg-gray-900/40`}
              >
                  <div 
                    onClick={(e) => handleFeatureClick(e, feature.id)}
                    className={`absolute top-6 right-6 md:top-8 md:right-8 p-1.5 md:p-2 bg-white rounded-lg md:rounded-xl shadow-xl transition-all duration-500 cursor-pointer z-20 opacity-80 hover:opacity-100 hover:scale-110`}
                  >
                     <QrCode size={windowWidth < 768 ? 32 : 40} className="text-black" />
                  </div>

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-blue-500/20 transition-all duration-500 shadow-inner">
                    {React.cloneElement(feature.icon as React.ReactElement<any>, { size: 28 })}
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors">
                    {feature.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed mb-10 min-h-[40px] group-hover:text-gray-300 transition-colors pr-14">
                    {feature.description}
                  </p>
                  <div className="space-y-4 pt-8 border-t border-white/5">
                    {feature.details.map((detail, dIdx) => (
                      <div key={dIdx} className="flex items-center gap-3 text-xs font-medium text-gray-500 group-hover:text-gray-200 transition-colors">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-500 transition-colors" />
                        {detail}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-10 text-[10px] font-mono text-blue-500/40 group-hover:text-blue-400 transition-colors flex items-center gap-2 uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse"></div>
                  Ready for UI Scan
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing & T&C Section */}
      <div className={`py-20 transition-all duration-1000 delay-500 bg-gradient-to-b from-black to-gray-950 ${stage === 'revealed' ? 'opacity-100' : 'opacity-0'}`}>
        <div className="container mx-auto px-6">
            <div className="max-w-4xl mx-auto text-center mb-16">
                <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">Ready to modernize <br/> your retail experience?</h2>
                <p className="text-gray-400 text-lg">Select a plan variant below to proceed with your consultation.</p>
            </div>

            <div className="max-w-7xl mx-auto mb-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
                    <div className="bg-gray-900/50 rounded-[3rem] border border-white/10 p-10 flex flex-col hover:border-blue-500/30 transition-all h-full">
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2">Professional Plan</h3>
                                <p className="text-blue-400 text-sm font-bold uppercase tracking-widest">5 to 10 Devices</p>
                            </div>
                            <div className="p-3 bg-blue-500/10 text-blue-400 rounded-2xl border border-blue-500/20">
                                <Users size={24} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                            <button onClick={() => setSelectedPlan('Professional Plan (Upto 5 Devices)')} className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between h-full ${selectedPlan === 'Professional Plan (Upto 5 Devices)' ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Upto 5 Devices</p>
                                    <p className="text-3xl font-black">₹5,500<span className="text-sm font-normal text-gray-500">/mo</span></p>
                                </div>
                                <div className={`mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${selectedPlan === 'Professional Plan (Upto 5 Devices)' ? 'text-blue-400' : 'text-gray-600'}`}>
                                    {selectedPlan === 'Professional Plan (Upto 5 Devices)' ? <><CheckCircle2 size={12}/> Selected</> : ''}
                                </div>
                            </button>
                            <button onClick={() => setSelectedPlan('Professional Plan (Upto 10 Devices)')} className={`p-6 rounded-3xl border transition-all text-left flex flex-col justify-between h-full ${selectedPlan === 'Professional Plan (Upto 10 Devices)' ? 'bg-blue-500/20 border-blue-500 shadow-[0_0_30px_rgba(59,130,246,0.2)]' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                <div>
                                    <p className="text-xs text-gray-500 font-bold uppercase mb-2">Upto 10 Devices</p>
                                    <p className="text-3xl font-black">₹8,000<span className="text-sm font-normal text-gray-500">/mo</span></p>
                                </div>
                                <div className={`mt-3 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest ${selectedPlan === 'Professional Plan (Upto 10 Devices)' ? 'text-blue-400' : 'text-gray-600'}`}>
                                    {selectedPlan === 'Professional Plan (Upto 10 Devices)' ? <><CheckCircle2 size={12}/> Selected</> : ''}
                                </div>
                            </button>
                        </div>
                        <div className="space-y-4 mb-10 flex-grow">
                            <p className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2"><CheckCircle2 size={16} className="text-blue-500" /> Professional Features Included:</p>
                            {["NexPOS Dashboard & Live Cart Tracking", "Inventory Manager (Bulk Product Imports)", "Stock Movement Tracking & Low Stock Alerts", "Supplier Management Suite", "Purchase Order Management (Email Integrated)", "Financial & Tax Intel (Exportable Analytics)", "Cash Flow Hub & Expense Tracking", "Enterprise Controls (Role-Based Login)", "User-friendly & modern customer-side web app (Multi-payment method integrated)", "Complete Store Setup by Our Team", "Unlimited Storage Capacity"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-400"><div className="w-1.5 h-1.5 bg-blue-500/50 rounded-full" />{feat}</div>
                            ))}
                        </div>
                    </div>

                    <div className="bg-gray-900/50 rounded-[3rem] border border-white/10 p-10 flex flex-col hover:border-purple-500/30 transition-all h-full relative overflow-hidden group">
                        <div className="absolute top-0 right-0 w-48 h-48 bg-purple-500/5 blur-[80px] -z-10 group-hover:bg-purple-500/10 transition-all"></div>
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h3 className="text-3xl font-black mb-2">Enterprise Plan</h3>
                                <p className="text-purple-400 text-sm font-bold uppercase tracking-widest">11+ Devices</p>
                            </div>
                            <div className="p-3 bg-purple-500/10 text-purple-400 rounded-2xl border border-purple-500/20">
                                <Globe size={24} />
                            </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
                            <button onClick={() => setSelectedPlan('Enterprise Plan (Upto 20 Devices)')} className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full ${selectedPlan === 'Enterprise Plan (Upto 20 Devices)' ? 'bg-purple-500/20 border-purple-500' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                <div>
                                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Upto 20</p>
                                  <p className="text-xl font-black">₹13,000<span className="text-[10px] font-normal text-gray-500">/mo</span></p>
                                  <p className="text-[8px] text-purple-300/70 mt-1 font-bold">Reduced to ₹9,999/mo after 1.5 yr</p>
                                </div>
                                <div className={`mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${selectedPlan === 'Enterprise Plan (Upto 20 Devices)' ? 'text-purple-400' : 'text-gray-600'}`}>{selectedPlan === 'Enterprise Plan (Upto 20 Devices)' ? <CheckCircle2 size={10}/> : ''}</div>
                            </button>
                            <button onClick={() => setSelectedPlan('Enterprise Plan (Upto 30 Devices)')} className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full ${selectedPlan === 'Enterprise Plan (Upto 30 Devices)' ? 'bg-purple-500/20 border-purple-500' : 'bg-black/40 border-white/5 hover:border-white/20'}`}>
                                <div>
                                  <p className="text-[10px] text-gray-500 font-bold uppercase mb-1">Upto 30</p>
                                  <p className="text-xl font-black">₹18,000<span className="text-[10px] font-normal text-gray-500">/mo</span></p>
                                  <p className="text-[8px] text-purple-300/70 mt-1 font-bold">Reduced to ₹13,999/mo after 1.5 yr</p>
                                </div>
                                <div className={`mt-3 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${selectedPlan === 'Enterprise Plan (Upto 30 Devices)' ? 'text-purple-400' : 'text-gray-600'}`}>{selectedPlan === 'Enterprise Plan (Upto 30 Devices)' ? <CheckCircle2 size={10}/> : ''}</div>
                            </button>
                            <button onClick={() => setSelectedPlan('Enterprise Plan (Upto 100 Devices)')} className={`p-4 rounded-2xl border transition-all text-left flex flex-col justify-between h-full ${selectedPlan === 'Enterprise Plan (Upto 100 Devices)' ? 'bg-blue-500/20 border-blue-500' : 'bg-blue-500/10 border-blue-500/20 hover:border-blue-500/40'}`}>
                                <div>
                                  <p className="text-[10px] text-blue-400 font-bold uppercase mb-1">Upto 100</p>
                                  <p className="text-xl font-black">₹47,000<span className="text-[10px] font-normal text-blue-400">/mo</span></p>
                                  <p className="text-[8px] text-blue-300/70 mt-1 font-bold">Reduced to ₹29,999/mo after 1.5 yr</p>
                                </div>
                                <div className={`mt-2 flex items-center gap-2 text-[9px] font-bold uppercase tracking-widest ${selectedPlan === 'Enterprise Plan (Upto 100 Devices)' ? 'text-blue-400' : 'text-gray-600'}`}>{selectedPlan === 'Enterprise Plan (Upto 100 Devices)' ? <CheckCircle2 size={10}/> : ''}</div>
                            </button>
                        </div>
                        <div className="space-y-4 mb-10 flex-grow">
                            <p className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2"><Zap size={16} className="text-purple-500" /> All Professional Features + Enterprise Suite:</p>
                            {["Promotions Engine", "Category wise and product wise offer creation", "Product sales analytics", "Top selling product analytics", "Offer coupon analytics", "Customer CRM 360", "Loyalty Journey", "Enterprise Controls (Loyalty Point Configurations)", "Unlimited Storage & Priority Cloud", "Full Store Setup execution by Experts"].map((feat, i) => (
                                <div key={i} className="flex items-center gap-3 text-sm text-gray-400"><div className="w-1.5 h-1.5 bg-purple-500/50 rounded-full" />{feat}</div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto mb-32 text-center">
                <p className="text-gray-500 text-sm font-medium italic px-6">
                    Note: Subscription pricing is flexible and adapts to your specific hardware needs. Plan costs vary based on the precise number of devices selected within a tier.
                </p>
            </div>

            {/* Hardware Addon - Price on Left, Info on Right */}
            <div className="max-w-7xl mx-auto mb-40 px-6 relative flex flex-col items-center">
                <div className="flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-16 w-full max-w-7xl">
                    {/* Price Display - Left Side */}
                    <div className="flex flex-col items-center lg:items-start justify-center w-full lg:w-1/2 text-center lg:text-left">
                        <div className="animate-fade-in-up">
                            <p className="text-6xl md:text-8xl font-black text-white tracking-tighter mb-2">₹7,999</p>
                            <p className="text-sm md:text-base font-bold text-gray-500 uppercase tracking-[0.4em]">per device (Inc. GST)</p>
                            <div className="mt-6 inline-flex items-center gap-2 px-6 py-2 bg-blue-500/10 text-blue-400 rounded-full text-xs font-black uppercase tracking-widest border border-blue-500/20 shadow-[0_0_20px_rgba(59,130,246,0.15)]">
                                <AlertCircle size={16} /> Plan Member Exclusive
                            </div>
                        </div>
                    </div>

                    {/* Info Card - Right Side */}
                    <div className="w-full lg:w-1/2 p-8 md:p-10 rounded-[3rem] bg-gray-900/40 border border-white/10 backdrop-blur-md relative group overflow-hidden">
                        <div className="absolute inset-0 bg-blue-500/5 blur-[100px] rounded-full group-hover:bg-blue-500/10 transition-all duration-700"></div>
                        <div className="flex flex-col items-center lg:items-start text-center lg:text-left relative z-10">
                            <div className="p-4 bg-white/5 rounded-[2rem] text-blue-400 border border-white/5 shadow-inner mb-6 group-hover:scale-110 transition-transform duration-500">
                                <HardDrive size={40} />
                            </div>
                            <h4 className="text-2xl md:text-4xl font-black mb-4 tracking-tight">Hardware Purchase Option</h4>
                            <p className="text-gray-400 text-base md:text-lg leading-relaxed max-w-2xl">
                                POS device purchase is exclusively available for active ENVISION BHARAT plan members. Precision-engineered for high-volume retail, our devices offer lifetime compatibility with the NexPOS ecosystem.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto">
                <div className="flex items-center gap-3 mb-12 justify-center px-6">
                    <div className="w-12 h-[1px] bg-gray-800" />
                    <h3 className="text-2xl font-bold uppercase tracking-widest text-gray-500">Terms & Conditions</h3>
                    <div className="w-12 h-[1px] bg-gray-800" />
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
                    <div className="space-y-8 bg-gray-900/20 rounded-[3rem] p-10 border border-white/5">
                        <h4 className="text-xl font-black flex items-center gap-3 text-blue-400"><ShieldCheck size={24} /> SERVICE TERMS</h4>
                        <div className="space-y-6">
                           {[{ title: "Minimum Usage Period", desc: "Customer must use the subscribed plan for a minimum of 6 months." }, { title: "Hardware & Setup Timeline", desc: "15–20 business days required for manufacturing and installation." }, { title: "Hardware Damage Policy", desc: "Damage due to negligence is fully chargeable for repair or replacement." }, { title: "Service Activation", desc: "Begins only after hardware delivery and software handover." }].map((item, idx) => (
                             <div key={idx} className="group">
                                <h5 className="font-bold text-gray-200 mb-1 flex items-center gap-2"><div className="w-1 h-4 bg-blue-500 rounded-full group-hover:h-6 transition-all" />{item.title}</h5>
                                <p className="text-sm text-gray-500 leading-relaxed ml-3">{item.desc}</p>
                             </div>
                           ))}
                        </div>
                    </div>
                    <div className="space-y-8 bg-gray-900/20 rounded-[3rem] p-10 border border-white/5">
                        <h4 className="text-xl font-black flex items-center gap-3 text-emerald-400"><Banknote size={24} /> PAYMENT TERMS</h4>
                        <div className="space-y-6">
                           {[{ title: "Advance Requirement", desc: "First month's SaaS charges must be paid on the day of signing the agreement." }, { title: "Billing Cycle", desc: "Begins next day after handover. Monthly charges due within 3–4 days." }, { title: "Early Exit Penalty", desc: "Remaining charges for 6-month commitment must be paid if discontinued." }, { title: "Refund Policy", desc: "All payments are strictly non-refundable." }].map((item, idx) => (
                             <div key={idx} className="group">
                                <h5 className="font-bold text-gray-200 mb-1 flex items-center gap-2"><div className="w-1 h-4 bg-emerald-500 rounded-full group-hover:h-6 transition-all" />{item.title}</h5>
                                <p className="text-sm text-gray-500 leading-relaxed ml-3">{item.desc}</p>
                             </div>
                           ))}
                        </div>
                    </div>
                </div>
                <div className="mt-20 text-center px-6">
                    <button onClick={handleConsultationClick} className="group px-12 py-5 bg-white text-black rounded-full font-black text-lg hover:bg-blue-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 flex items-center gap-3 mx-auto shadow-2xl">
                        {selectedPlan ? `Schedule Consultation for ${selectedPlan}` : 'Schedule My Consultation'}
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                    <p className="mt-6 text-[10px] text-gray-600 uppercase tracking-widest font-bold">By proceeding, you acknowledge and agree to all terms listed above.</p>
                </div>
            </div>
        </div>
      </div>

      <style>{`
        @keyframes scan { 0% { top: 0% } 50% { top: 100% } 100% { top: 0% } }
        @keyframes laptopOpen { 0% { transform: perspective(1000px) rotateX(-90deg); opacity: 0; } 100% { transform: perspective(1000px) rotateX(0deg); opacity: 1; } }
        @keyframes laptopBase { 0% { transform: scaleX(0); opacity: 0; } 100% { transform: scaleX(1); opacity: 1; } }
        .animate-fade-in { animation: fadeIn 0.3s ease-out forwards; }
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      `}</style>
    </div>
  );
};

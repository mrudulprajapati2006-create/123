
import React, { useState, useEffect } from 'react';
import { 
  ExternalLink, Store, ArrowRight, Minus, Plus, X, Check, 
  Receipt, User, Mail, Phone, MapPin, CheckCircle2, Calculator,
  ChevronDown, ChevronUp, ShieldCheck, Loader2
} from 'lucide-react';
import { KhaoJiFeatures } from './KhaoJiFeatures';
import emailjs from '@emailjs/browser';

export const KhaoJiSection: React.FC<{ onNavigate?: (page: string, sectionId?: string, msg?: string) => void }> = ({ onNavigate }) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [includeWhatsappOrdering, setIncludeWhatsappOrdering] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAllIncluded, setShowAllIncluded] = useState(false);
  const [taxRate, setTaxRate] = useState(18); // Customizable, default 18%

  // Pricing Data: ₹600 per month, ₹6000 per year (Inclusive of GST)
  const POS_PRICE_MONTHLY = 600;
  const POS_PRICE_YEARLY = 6000;

  // WhatsApp Ordering Addon: ₹175
  const WHATSAPP_ORDERING_COST_MONTHLY = 175;
  const WHATSAPP_ORDERING_COST_YEARLY = 1750;

  const currentBasePrice = billingCycle === 'monthly' ? POS_PRICE_MONTHLY : POS_PRICE_YEARLY;
  const currentWhatsappOrderingPrice = includeWhatsappOrdering ? (billingCycle === 'monthly' ? WHATSAPP_ORDERING_COST_MONTHLY : WHATSAPP_ORDERING_COST_YEARLY) : 0;

  // WhatsApp Service is inbuilt (₹0)
  const currentAddonPrice = 0; 

  const total = currentBasePrice + currentWhatsappOrderingPrice;

  // Calculate original price for yearly to show discount (17% off)
  const originalMonthlyTotal = POS_PRICE_MONTHLY + (includeWhatsappOrdering ? WHATSAPP_ORDERING_COST_MONTHLY : 0);
  const originalYearlyPrice = originalMonthlyTotal * 12;
  const discountAmount = originalYearlyPrice - total;
  const discountPercentage = originalYearlyPrice > 0 ? Math.round((discountAmount / originalYearlyPrice) * 100) : 0;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    restaurant: '',
    city: ''
  });

  const handleSettle = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_vcl1lfi';
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_fcexkba';
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'v21_0Qb9YvIna2Fw4';

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone_number: formData.phone,
          interest: 'KhaoJi POS License',
          message: `Restaurant: ${formData.restaurant}, City: ${formData.city}, Plan: ${billingCycle}, WhatsApp Ordering: ${includeWhatsappOrdering ? 'Yes' : 'No'}, Total: ${formatPrice(total)} (Incl. GST)`,
          source: 'KhaoJi Pricing Section'
        },
        publicKey
      );
      
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(false);
        setSubmitted(false);
        setFormData({ name: '', email: '', phone: '', restaurant: '', city: '' });
      }, 3000);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Submission failed. Please check your connection or EmailJS configuration.");
    } finally {
      setLoading(false);
    }
  };

  const formatPrice = (p: number) => `₹${p.toLocaleString()}`;

  // Complete list of features provided in latest prompt (minus paid Branding)
  const INCLUDED_ITEMS = [
    "Instant Menu Management",
    "Personalized PDF Bill Receipt",
    "Raw Material Tracking",
    "Smart Recipe",
    "Chef's KOT Interface",
    "Role-based Access Control",
    "Secure PIN Authentication",
    "Staff Shift & Audit Logs",
    "Remote Management App",
    "Multi-Store Connectivity",
    "Real-time Activity Feed",
    "24/7 Support via Mail & Whatsapp",
    "Visual Floor Plan Editor",
    "Live Occupancy Tracking",
    "Reservation Timeline",
    "Preorder Reservation",
    "Multi-room Support",
    "25+ Useful Business Reports",
    "Menu Engineering Analysis",
    "Tax Liability Calculator",
    "Export Tax (Excel & PDF)",
    "Customer Profiles & History",
    "Points-based Loyalty System",
    "WhatsApp Digital Receipts"
  ];

  return (
    <div className="bg-slate-50 min-h-screen pt-20 pb-16 overflow-x-hidden flex flex-col justify-center">
      <div className="container mx-auto px-6">
        
        {/* Hero Header */}
        <div className="text-center max-w-4xl mx-auto min-h-[calc(100vh-80px)] flex flex-col justify-center mb-10">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-100 text-blue-700 rounded-full text-xs font-black tracking-widest uppercase mb-8 shadow-sm self-center">
              <Store size={18} /> Retail Operating System
            </div>
            <h1 className="text-5xl md:text-8xl font-black text-slate-900 mb-8 tracking-tighter">
              KhaoJi
            </h1>
            <p className="text-lg md:text-3xl text-slate-500 max-w-3xl mx-auto leading-relaxed mb-12 font-light">
              Master your retail footprint. Simple pricing for <span className="text-slate-900 font-bold">powerful features</span>.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4">
               <button 
                 onClick={() => setShowModal(true)}
                 className="px-10 py-5 bg-blue-700 text-white rounded-full font-black text-lg shadow-xl shadow-blue-700/20 hover:scale-105 transition-all flex items-center gap-3"
               >
                 Book Your Demo <ArrowRight size={24} />
               </button>
            </div>
        </div>

        {/* Features Library Section (Appears First) */}
        <KhaoJiFeatures />

        {/* Billing UI Section (At the End) */}
        <div id="pricing" className="max-w-3xl mx-auto mt-32">
          <div className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">Simulate Your Setup</h2>
            <p className="text-slate-500 mb-8 px-4">Add your requirements to the bill and settle to book a demo.</p>

            {/* Billing Toggle - Now directly above the card */}
            <div className="inline-flex bg-white p-1.5 sm:p-2 rounded-2xl shadow-xl border border-gray-100 mb-6 max-w-full overflow-hidden">
              <button 
                onClick={() => setBillingCycle('monthly')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 ${
                  billingCycle === 'monthly' 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Monthly
              </button>
              <button 
                onClick={() => setBillingCycle('yearly')}
                className={`px-4 sm:px-8 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-black transition-all duration-300 flex items-center gap-1.5 sm:gap-2 ${
                  billingCycle === 'yearly' 
                    ? 'bg-slate-900 text-white shadow-lg' 
                    : 'text-slate-400 hover:text-slate-600'
                }`}
              >
                Yearly
                <span className="bg-emerald-100 text-emerald-700 text-[9px] sm:text-[10px] px-1.5 sm:px-2 py-0.5 rounded-full uppercase tracking-wide">Save 17%</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] shadow-2xl overflow-hidden border border-gray-100 relative mx-1 sm:mx-0">
            
            {/* POS Card Header */}
            <div className="bg-slate-900 p-6 sm:p-8 flex flex-col sm:flex-row justify-between items-start gap-4 text-white">
              <div>
                <h2 className="text-xl sm:text-2xl font-black flex items-center gap-2 sm:gap-3">
                   <Receipt className="text-emerald-400" /> Billing Summary
                </h2>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Inquiry #ORD-2025-001 • Server: Web</p>
              </div>
              <div className="bg-indigo-500/20 text-indigo-400 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-[10px] sm:text-xs font-black border border-indigo-500/30">
                ACTIVE INQUIRY
              </div>
            </div>

            {/* Receipt Items Area */}
            <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
              <h3 className="text-[10px] font-black text-emerald-600 uppercase tracking-[0.2em] mb-2 sm:mb-4">CURRENT SELECTION (NOT SENT)</h3>

              {/* Item 1: POS License */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center p-5 sm:p-6 bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl sm:rounded-3xl gap-4">
                <div>
                  <h4 className="font-black text-slate-900 text-lg sm:text-xl">KhaoJi POS License</h4>
                  <div className="text-xs sm:text-sm text-slate-500 font-medium">{billingCycle === 'monthly' ? 'Monthly' : 'Annual'} Enterprise Subscription</div>
                  <div className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">{formatPrice(currentBasePrice)} × 1</div>
                </div>
                <div className="flex items-center gap-3 self-end sm:self-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-white border border-gray-100 rounded-xl text-slate-300">
                    <Minus size={14} strokeWidth={3} />
                  </div>
                  <span className="w-6 sm:w-8 text-center font-black text-slate-800 text-base sm:text-lg">1</span>
                  <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center bg-emerald-100 border border-emerald-200 rounded-xl text-emerald-600">
                    <Plus size={14} strokeWidth={3} />
                  </div>
                </div>
              </div>

              {/* Item 2: WhatsApp Integration (Inbuilt) */}
              <div className="flex flex-col p-5 sm:p-6 bg-[#f0fdf4] border border-[#dcfce7] rounded-2xl sm:rounded-3xl gap-2">
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-lg sm:text-xl">WhatsApp Service</h4>
                    <div className="text-xs sm:text-sm text-blue-600 font-bold tracking-tighter">User-initiated WhatsApp Billing</div>
                  </div>
                  <div className="sm:text-right">
                    <span className="text-[10px] sm:text-sm font-black text-emerald-600 uppercase">Inbuilt</span>
                  </div>
                </div>
                <p className="text-[10px] sm:text-[11px] text-slate-500 font-medium leading-tight">Professional PDF bill shared to the customer via WhatsApp included as standard. We give user initiated WhatsApp billing.</p>
              </div>

              {/* Item 3: WhatsApp Ordering Addon */}
              <div className={`flex flex-col p-5 sm:p-6 border rounded-2xl sm:rounded-3xl gap-3 sm:gap-4 transition-all duration-300 ${includeWhatsappOrdering ? 'bg-[#f0fdf4] border-[#dcfce7]' : 'bg-white border-gray-100'}`}>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                  <div>
                    <h4 className="font-black text-slate-900 text-lg sm:text-xl">WhatsApp Ordering</h4>
                    <div className="text-xs sm:text-sm text-slate-500 font-medium">Scan QR & Order from shared menu</div>
                    <div className="text-xs sm:text-sm text-slate-400 mt-1 font-mono">
                      {formatPrice(billingCycle === 'monthly' ? WHATSAPP_ORDERING_COST_MONTHLY : WHATSAPP_ORDERING_COST_YEARLY)} × 1
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button 
                      onClick={() => setIncludeWhatsappOrdering(!includeWhatsappOrdering)}
                      className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-black border transition-all shadow-sm ${
                        includeWhatsappOrdering 
                          ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                          : 'bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100'
                      }`}
                    >
                      {includeWhatsappOrdering ? 'Remove' : 'Add Module'}
                    </button>
                  </div>
                </div>
              </div>

              {/* Collapsible Included Features List - Expanded for requested items */}
              <div className="border border-gray-100 rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-50/50">
                <button 
                  onClick={() => setShowAllIncluded(!showAllIncluded)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 hover:bg-slate-100 transition-colors"
                >
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-5 h-5 sm:w-6 sm:h-6 rounded-full flex items-center justify-center transition-all border ${showAllIncluded ? 'bg-blue-600 border-blue-600 text-white' : 'bg-white border-gray-300 text-transparent'}`}>
                      <Check size={14} strokeWidth={4}/>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-slate-700">
                      Verify {INCLUDED_ITEMS.length} Inbuilt Modules
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[9px] sm:text-xs font-black text-blue-600 uppercase tracking-widest">
                    {showAllIncluded ? 'Hide' : 'Expand'}
                    {showAllIncluded ? <ChevronUp size={16}/> : <ChevronDown size={16}/>}
                  </div>
                </button>

                <div className={`transition-all duration-500 ease-in-out overflow-hidden ${showAllIncluded ? 'max-h-[1200px] opacity-100' : 'max-h-0 opacity-0'}`}>
                  <div className="p-4 sm:p-6 pt-0 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 border-t border-gray-100">
                     {INCLUDED_ITEMS.map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center text-[10px] sm:text-xs p-2.5 sm:p-3 bg-white border border-gray-100 rounded-xl">
                        <span className="text-slate-900 font-bold">{item}</span>
                        <span className="text-emerald-500 font-black uppercase text-[8px] sm:text-[9px] tracking-widest">Included</span>
                      </div>
                     ))}
                  </div>
                </div>
              </div>

            </div>

            {/* Receipt Footer */}
            <div className="p-6 sm:p-8 bg-slate-50 border-t border-gray-100">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-6">
                <div className="text-slate-500 space-y-2 w-full sm:w-auto">
                  {billingCycle === 'yearly' && (
                    <p className="text-sm sm:text-base font-medium flex justify-between gap-6 sm:gap-10 text-slate-400 line-through">
                      Actual Price: <span>{formatPrice(originalYearlyPrice)}</span>
                    </p>
                  )}
                  <p className="text-sm sm:text-base font-medium flex justify-between gap-6 sm:gap-10">
                    Subtotal: <span className="font-black text-slate-800">{formatPrice(total)}</span>
                  </p>
                  <p className="text-xs font-bold text-emerald-600 uppercase tracking-widest">Pricing Inclusive of GST</p>
                </div>
                <div className="w-full sm:text-right border-t sm:border-t-0 pt-4 sm:pt-0">
                  <p className="text-[10px] sm:text-xs font-black text-slate-400 uppercase tracking-widest mb-1">Total Payable</p>
                  <p className="text-3xl sm:text-4xl font-black text-slate-900 leading-none">{formatPrice(total)}</p>
                </div>
              </div>
              
              <div className="flex flex-col">
                 <button 
                  onClick={() => setShowModal(true)}
                  className="w-full bg-[#0ca678] hover:bg-[#099268] text-white font-black py-4 sm:py-5 px-6 rounded-xl sm:rounded-2xl shadow-xl shadow-emerald-500/10 transition-all flex flex-col items-center justify-center active:scale-[0.98]"
                 >
                   <span className="text-lg sm:text-xl">Settle Bill</span>
                   <span className="text-[9px] sm:text-[10px] opacity-80 uppercase tracking-widest font-bold mt-0.5 sm:mt-1">Confirm & Continue</span>
                 </button>
              </div>
              <p className="text-center text-[9px] sm:text-[10px] text-slate-400 uppercase tracking-widest font-bold mt-6 sm:mt-8">Dynamic Simulation • Secure Infrastructure</p>
            </div>
          </div>
        </div>

      </div>

      {/* Settle Bill / Demo Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl" onClick={() => !submitted && setShowModal(false)}></div>
          <div className="relative bg-white w-full max-w-2xl rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-500 max-h-full overflow-y-auto">
             {submitted ? (
                <div className="p-10 sm:p-20 text-center space-y-8">
                   <div className="w-20 h-20 sm:w-24 sm:h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                      <CheckCircle2 size={56} />
                   </div>
                   <div className="space-y-2">
                      <h2 className="text-3xl sm:text-4xl font-black text-slate-900">Request Received!</h2>
                      <p className="text-slate-500 text-lg sm:text-xl font-light">Thank you, <strong>{formData.name}</strong>. Our deployment team has received your order for <strong>{formData.restaurant}</strong> and will contact you shortly.</p>
                   </div>
                   <div className="pt-4">
                     <button onClick={() => setShowModal(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition-colors">Close</button>
                   </div>
                </div>
             ) : (
                <div className="flex flex-col h-full">
                   <div className="p-8 sm:p-10 bg-slate-900 text-white flex justify-between items-center">
                      <div>
                         <div className="flex items-center gap-2 mb-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Order Finalization</span>
                         </div>
                         <h2 className="text-2xl sm:text-3xl font-black">Book Your Demo</h2>
                         <p className="text-emerald-400 text-xs sm:text-sm font-bold flex items-center gap-2 mt-2">
                            <Calculator size={16} /> Total Balance: {formatPrice(total)} (Incl. GST)
                            {billingCycle === 'yearly' && (
                              <span className="text-slate-400 line-through ml-2 decoration-slate-500">{formatPrice(originalYearlyPrice)}</span>
                            )}
                         </p>
                      </div>
                      <button onClick={() => setShowModal(false)} className="p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"><X size={24} /></button>
                   </div>
                   <form onSubmit={handleSettle} className="p-8 sm:p-10 space-y-5 sm:space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                         <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Proprietor Name</label>
                            <div className="relative">
                               <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-4 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-sm sm:text-base" placeholder="John Doe" />
                            </div>
                         </div>
                         <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Mobile Number</label>
                            <div className="relative">
                               <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-4 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-sm sm:text-base" placeholder="+91" />
                            </div>
                         </div>
                      </div>
                      <div className="space-y-1.5 sm:space-y-2">
                         <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email Address</label>
                         <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                            <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-4 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-sm sm:text-base" placeholder="hello@business.com" />
                         </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                         <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Restaurant Name</label>
                            <div className="relative">
                               <Store className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required value={formData.restaurant} onChange={e => setFormData({...formData, restaurant: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-4 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-sm sm:text-base" placeholder="Cafe Name" />
                            </div>
                         </div>
                         <div className="space-y-1.5 sm:space-y-2">
                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">City</label>
                            <div className="relative">
                               <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
                               <input required value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} className="w-full bg-slate-50 border border-slate-200 rounded-xl sm:rounded-2xl pl-12 pr-4 py-3 sm:py-4 focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 outline-none transition-all font-bold text-slate-900 text-sm sm:text-base" placeholder="Ex: Mumbai" />
                            </div>
                         </div>
                      </div>
                      <button type="submit" disabled={loading} className="w-full py-4 sm:py-5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-2xl font-black text-lg sm:text-xl shadow-2xl shadow-emerald-500/20 transition-all active:scale-[0.98] mt-2 sm:mt-4 disabled:bg-gray-400">
                         {loading ? <Loader2 className="animate-spin mx-auto" size={24} /> : 'Confirm & Book Demo'}
                      </button>
                      <div className="flex items-center gap-3 justify-center text-[10px] text-slate-400 uppercase tracking-widest font-black pt-2 sm:pt-4">
                         <ShieldCheck size={14} className="text-slate-300" /> Secure Encryption Active
                      </div>
                   </form>
                </div>
             )}
          </div>
        </div>
      )}
    </div>
  );
};

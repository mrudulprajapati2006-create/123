
import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, ArrowLeft, CheckCircle2, ShieldCheck, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactPageProps {
  onNavigate: (page: string, sectionId?: string, initialMessage?: string) => void;
  initialMessage?: string;
}

export const ContactPage: React.FC<ContactPageProps> = ({ onNavigate, initialMessage }) => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    interest: 'NexPOS',
    message: initialMessage || ''
  });

  useEffect(() => {
    window.scrollTo(0, 0);
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      // EmailJS implementation
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
          interest: formData.interest,
          message: formData.message,
          source: 'Contact Page'
        },
        publicKey
      );

      setSubmitted(true);
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Submission failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white pt-24 pb-12 relative overflow-hidden animate-fade-in-up">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-orange-900/20 blur-3xl rounded-full -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="mb-8">
            <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
            >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
            </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Contact Info */}
          <div className="space-y-8 lg:sticky lg:top-32">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              Let's Build the <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-orange-400">Future Together.</span>
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed">
              Ready to transform your business with innovative technology? Get in touch with our experts to discuss how our solutions can streamline your operations.
            </p>

            <div className="space-y-6 pt-4">
               <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <div className="p-3 bg-blue-500/20 rounded-lg text-blue-400">
                   <Phone size={24} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-lg">Talk to an Expert</h4>
                   <p className="text-gray-400">+91 9313163984</p>
                 </div>
               </div>
               
               <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <div className="p-3 bg-orange-500/20 rounded-lg text-orange-400">
                   <Mail size={24} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-lg">Email Support</h4>
                   <p className="text-gray-400">admin@envisionbharat.com</p>
                 </div>
               </div>

               <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors">
                 <div className="p-3 bg-purple-500/20 rounded-lg text-purple-400">
                   <MapPin size={24} />
                 </div>
                 <div>
                   <h4 className="font-semibold text-lg">Global Headquarters</h4>
                   <p className="text-gray-400">Ahmedabad, India</p>
                 </div>
               </div>
            </div>
          </div>

          {/* Form */}
          <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl transition-all duration-500">
            {submitted ? (
              <div className="py-12 text-center space-y-6 animate-in zoom-in-95">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 size={48} />
                </div>
                <h3 className="text-3xl font-bold">Message Sent!</h3>
                <p className="text-gray-600">Thank you for reaching out. Our team will review your request and get back to you within 24 hours.</p>
                <button 
                  onClick={() => setSubmitted(false)}
                  className="px-8 py-3 bg-gray-100 text-gray-600 rounded-xl font-bold hover:bg-gray-200 transition-colors"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-2">Get Started Now</h3>
                <p className="text-gray-500 mb-6 text-sm">Fill out the form below and our team will get back to you within 24 hours.</p>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Full Name</label>
                      <input 
                        type="text" 
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="John Doe"
                        required
                        disabled={loading}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Phone Number</label>
                      <input 
                        type="tel" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                        placeholder="+91 9313163984"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Email Address</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all"
                      placeholder="john@example.com"
                      required
                      disabled={loading}
                    />
                  </div>

                  <div className="space-y-2 pb-4">
                    <label className="text-sm font-semibold text-gray-700">I'm interested in...</label>
                    <select 
                      name="interest"
                      value={formData.interest}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all appearance-none"
                      disabled={loading}
                    >
                      <option value="NexPOS">NexPOS - Fast Checkout Solutions</option>
                      <option value="KhaoJi">KhaoJi - Restaurant & Retail OS</option>
                      <option value="Other">Other Innovative Solutions</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Message (Optional)</label>
                    <textarea 
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px]"
                      placeholder="Tell us about your requirements..."
                      disabled={loading}
                    />
                  </div>

                  <div className="pt-4">
                    <button 
                        type="submit"
                        disabled={loading}
                        className="flex items-center justify-center gap-2 w-full py-4 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform disabled:bg-gray-400 disabled:cursor-not-allowed"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : <>Submit Request <Send size={18} /></>}
                    </button>
                  </div>
                  <div className="flex items-center gap-3 justify-center text-[10px] text-gray-400 uppercase tracking-widest font-black pt-2">
                    <ShieldCheck size={14} className="text-gray-300" /> Secure Encryption Active
                  </div>
                  <p className="text-xs text-center text-gray-400 mt-4">
                    Your data is secure. By submitting, you agree to our privacy policy.
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Send, Phone, Mail, MapPin, CheckCircle2, Loader2, ShieldCheck } from 'lucide-react';
import emailjs from '@emailjs/browser';

interface ContactSectionProps {
  initialMessage?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ initialMessage }) => {
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
      // Note: User needs to set these up in EmailJS dashboard
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
          source: 'Home Contact Section'
        },
        publicKey
      );

      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
      setFormData({ name: '', email: '', phone: '', interest: 'NexPOS', message: '' });
    } catch (err) {
      console.error("EmailJS Error:", err);
      alert("Submission failed. Please check your connection or EmailJS configuration.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact-form" className="py-16 bg-gray-900 text-white relative overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-900/20 blur-3xl rounded-full translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-1/2 h-full bg-orange-900/20 blur-3xl rounded-full -translate-x-1/2"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Contact Info */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
              Partner with <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Future-Ready Tech.</span>
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Experience the synergy of innovation and efficiency. We engineer the tools that scale your ambition and drive digital transformation. Let's build your success story together.
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
          <div className="bg-white rounded-3xl p-8 md:p-10 text-gray-900 shadow-2xl relative overflow-hidden">
            {submitted && (
              <div className="absolute inset-0 z-50 bg-white/95 flex flex-col items-center justify-center p-8 text-center animate-in fade-in duration-300">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold mb-2">Thank You!</h3>
                <p className="text-gray-600">Your inquiry has been received. Our team will contact you shortly.</p>
                <button onClick={() => setSubmitted(false)} className="mt-6 text-blue-600 font-bold hover:underline">Send another inquiry</button>
              </div>
            )}

            <h3 className="text-2xl font-bold mb-2">Contact Us</h3>
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

              <div className="space-y-2">
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
                <label className="text-sm font-semibold text-gray-700">Message</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all min-h-[100px]"
                  placeholder="Tell us about your requirements..."
                  required
                  disabled={loading}
                />
              </div>

              <div className="pt-4">
                <button 
                    type="submit"
                    disabled={loading}
                    className="flex items-center justify-center gap-2 w-full py-3.5 bg-black text-white rounded-xl font-semibold hover:bg-gray-800 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 transform disabled:bg-gray-400"
                >
                    {loading ? <Loader2 className="animate-spin" /> : <>Submit Request <Send size={18} /></>}
                </button>
              </div>
              <div className="flex items-center gap-3 justify-center text-[10px] text-gray-400 uppercase tracking-widest font-black pt-4">
                <ShieldCheck size={14} className="text-gray-300" /> Secure Encryption Active
              </div>
              <p className="text-xs text-center text-gray-400 mt-4">
                Your data is secure. By submitting, you agree to our privacy policy.
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

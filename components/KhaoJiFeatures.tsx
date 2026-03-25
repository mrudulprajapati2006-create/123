
import React, { useState, useMemo } from 'react';
import { 
  ChefHat, Settings, LayoutGrid, TrendingUp, Users, Receipt, 
  CheckCircle2, Plus, X, ArrowRight, Zap, ShieldCheck, PieChart, 
  Smartphone, BarChart3, Globe, Database, ShoppingCart, Package,
  Wallet, Tag, Bell, Search, History, FileText, Layout, Activity,
  Calendar, Layers, Map, Thermometer, UserCheck, Headset, FileSpreadsheet,
  Split
} from 'lucide-react';

interface FeatureItem {
  name: string;
  description: string;
  benefits: string[];
}

interface FeatureCategory {
  category: string;
  icon: any;
  items: FeatureItem[];
}

const DETAILED_FEATURES: FeatureCategory[] = [
  {
    category: 'Menu & Kitchen',
    icon: ChefHat,
    items: [
      { 
        name: "Instant Menu Management", 
        description: "Change prices, toggle item availability, and update categories instantly across all outlets.", 
        benefits: ["Dynamic Seasonal Menus", "Stock-out prevention", "Live updates"] 
      },
      { 
        name: "Raw Material Tracking", 
        description: "Monitor and track the raw material inlet and outlet per order for better inventory control.", 
        benefits: ["Inlet/Outlet tracking", "Waste reduction", "Real-time inventory"] 
      },
      { 
        name: "Smart Recipe", 
        description: "Add recipes for each item to automatically monitor raw material consumption item-wise.", 
        benefits: ["Recipe management", "Auto-deduction", "Cost analysis"] 
      },
      { 
        name: "Chef's KOT Interface", 
        description: "A digital display system for kitchen staff to manage, prioritize, and track order fulfillment in real-time.", 
        benefits: ["Reduced prep time", "Zero lost orders", "Real-time sync"] 
      }
    ]
  },
  {
    category: 'Admin & Control',
    icon: Settings,
    items: [
      { 
        name: "Personalized PDF Bill Receipt", 
        description: "We give personalized bill receipt with restaurant name and address for a professional feel.", 
        benefits: ["Professional look", "Brand recognition", "Custom details"] 
      },
      { 
        name: "Role-based Access Control", 
        description: "Define granular permissions for staff, managers, and owners to secure sensitive data.", 
        benefits: ["Data security", "Clear accountability", "Simplified management"] 
      },
      { 
        name: "Secure PIN Authentication", 
        description: "Protect sensitive actions like refunds and cancellations with mandatory manager PINs.", 
        benefits: ["High security", "Fraud prevention", "Controlled access"] 
      },
      { 
        name: "Staff Shift & Audit Logs", 
        description: "Track every staff login, shift change, and transaction with detailed security audit trails.", 
        benefits: ["Staff accountability", "Prevention of theft", "Shift handover logs"] 
      },
      { 
        name: "Remote Management App", 
        description: "Monitor your business from anywhere in the world with a dedicated mobile owner's app.", 
        benefits: ["Remote monitoring", "Instant notifications", "Control from home"] 
      },
      { 
        name: "Real-time Activity Feed", 
        description: "A live stream of all business activities including sales, cancellations, and table changes.", 
        benefits: ["Total transparency", "Fast response", "Operational oversight"] 
      },
      { 
        name: "24/7 Support via Mail & Whatsapp", 
        description: "Round-the-clock technical assistance to ensure your business never stops running.", 
        benefits: ["Priority Response Time", "Quick resolution", "Expert guidance"] 
      },
      { 
        name: "Multi-Store Connectivity", 
        description: "Connect a big chain of restaurants in one master admin panel to monitor all store live data and reports.", 
        benefits: ["Master admin panel", "Centralized control", "Live chain data"] 
      }
    ]
  },
  {
    category: 'Smart Tables',
    icon: Layout,
    items: [
      { 
        name: "Preorder Reservation", 
        description: "Customers can preorder items; when they arrive, no need to order again. Saves time and effort.", 
        benefits: ["Time saving", "Pre-arrival prep", "Better planning"] 
      },
      { 
        name: "Visual Floor Plan Editor", 
        description: "Create and manage a 2D map of your restaurant tables, sections, and seating arrangements.", 
        benefits: ["Efficient seating", "Visual oversight", "Easy editing"] 
      },
      { 
        name: "Live Occupancy Tracking", 
        description: "Real-time status of every table: Available, Occupied, Billing, or Needs Cleaning.", 
        benefits: ["Faster turnover", "Better service", "Reduced wait times"] 
      },
      { 
        name: "Reservation Timeline", 
        description: "A comprehensive calendar view for booking tables and managing upcoming reservations.", 
        benefits: ["No overbooking", "Better scheduling", "Customer satisfaction"] 
      },
      { 
        name: "Multi-room Support", 
        description: "Manage multiple floors, outdoor seating, and private dining rooms from a single interface.", 
        benefits: ["Scalable setup", "Easy navigation", "Organized areas"] 
      }
    ]
  },
  {
    category: 'Business Intelligence',
    icon: TrendingUp,
    items: [
      { 
        name: "25+ Useful Business Reports", 
        description: "You need only useful data reports, not unnecessary ones. Deep dive into financial, inventory, staff, and sales performance through detailed analytics. Included in inbuilt module in checkout section.", 
        benefits: ["Useful data only", "Financial depth", "Sales performance"] 
      },
      { 
        name: "Menu Engineering Analysis", 
        description: "AI-driven insights to classify menu items as Stars, Puzzles, or Dogs based on profitability.", 
        benefits: ["Optimized profits", "Smart menu design", "Cost reduction"] 
      },
      { 
        name: "Tax Liability Calculator", 
        description: "Automatic GST/VAT calculation with instant export for accounting and filing.", 
        benefits: ["Zero compliance errors", "Fast reporting", "Audit ready"] 
      },
      { 
        name: "Export Tax calculation in Excel and PDF", 
        description: "Professional grade tax reporting exports ready for your CA or accounting software.", 
        benefits: ["CA-ready files", "Simplified filing", "Structured data"] 
      }
    ]
  },
  {
    category: 'CRM & Loyalty',
    icon: UserCheck,
    items: [
      { 
        name: "Customer Profiles & History", 
        description: "Detailed database of customer preferences, contact info, and lifetime visit history.", 
        benefits: ["Personalized service", "Targeted marketing", "VIP tracking"] 
      },
      { 
        name: "Points-based Loyalty System", 
        description: "Reward repeat customers with points they can redeem on future visits.", 
        benefits: ["Boost retention", "Increase LTV", "Direct engagement"] 
      }
    ]
  },
  {
    category: 'Next-Gen Billing',
    icon: Receipt,
    items: [
      { 
        name: "WhatsApp Digital Receipts", 
        description: "Ditch paper. Send branded, professional receipts directly to customers' WhatsApp numbers. We give user initiated WhatsApp billing.", 
        benefits: ["Cost saving", "Environment friendly", "Direct marketing"] 
      },
      { 
        name: "WhatsApp Ordering", 
        description: "Customers can order by scanning QR code of table and order from the shared menu. Hassle-free and more useful feature that we offer.", 
        benefits: ["QR ordering", "Shared menu", "Hassle-free"] 
      }
    ]
  }
];

export const KhaoJiFeatures: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState<{name: string, description: string, benefits: string[], category: string, icon: any} | null>(null);

  const flatFeatures = useMemo(() => {
    return DETAILED_FEATURES.flatMap(cat => 
      cat.items.map(item => ({ ...item, category: cat.category, icon: cat.icon }))
    );
  }, []);

  const filteredFeatures = useMemo(() => {
    if (activeCategory === 'All') return flatFeatures;
    return flatFeatures.filter(f => f.category === activeCategory);
  }, [activeCategory, flatFeatures]);

  const categories = ['All', ...DETAILED_FEATURES.map(f => f.category)];

  return (
    <div className="py-12 md:py-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-4xl mx-auto mb-10 md:mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-[10px] md:text-xs font-bold tracking-widest text-blue-700 uppercase bg-blue-50 rounded-full border border-blue-100">
            Ecosystem Core
          </span>
          <h2 className="text-3xl md:text-6xl font-black text-slate-900 mb-4 md:mb-6 tracking-tight leading-tight">
            The Ultimate Toolkit for <br className="hidden md:block"/> World-Class Food Business.
          </h2>
          <p className="text-base md:text-xl text-slate-500 font-light">
             From taking orders to analyzing profits, we've built the ultimate tool for your success.
          </p>
        </div>

        {/* Category Tabs - Improved Mobile UX */}
        <div className="mb-10 md:mb-16 overflow-x-auto no-scrollbar -mx-6 px-6">
          <div className="flex items-center gap-2 min-w-max md:justify-center">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`
                  px-4 md:px-5 py-2 md:py-2.5 rounded-xl text-xs md:text-sm font-bold whitespace-nowrap transition-all duration-300 border
                  ${activeCategory === cat 
                    ? 'bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-200' 
                    : 'bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:bg-slate-50'}
                `}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Features Grid - Fully Responsive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredFeatures.map((feature, idx) => (
            <div 
              key={idx}
              onClick={() => setSelectedFeature(feature)}
              className="group bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 md:hover:-translate-y-2 transition-all duration-500 cursor-pointer flex flex-col justify-between min-h-[240px] md:min-h-[300px] relative overflow-hidden"
            >
              <div className="relative z-10">
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl md:rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 mb-6 md:mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-inner">
                  <feature.icon size={24} className="md:w-[28px] md:h-[28px]" strokeWidth={2}/>
                </div>
                <h3 className="font-black text-slate-800 text-xl md:text-2xl leading-snug mb-2 md:mb-3">
                  {feature.name}
                </h3>
                <p className="text-[10px] md:text-sm text-slate-400 font-bold uppercase tracking-widest">{feature.category}</p>
              </div>

              <div className="relative z-10 mt-auto flex justify-between items-center opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 pt-4 md:pt-6">
                <span className="text-sm md:text-base font-bold text-blue-600">View Details</span>
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-900 shadow-sm">
                  <Plus size={16} className="md:w-[20px] md:h-[20px]" />
                </div>
              </div>
              
              <div className="absolute -bottom-16 -right-16 w-32 h-32 md:w-48 md:h-48 bg-gradient-to-br from-blue-500/10 to-transparent rounded-full z-0 transition-transform duration-700 group-hover:scale-150"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Detail Modal - Enhanced Mobile Layout */}
      {selectedFeature && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity"
            onClick={() => setSelectedFeature(null)}
          ></div>
          
          <div className="relative bg-white rounded-[2rem] md:rounded-[3rem] shadow-2xl w-full max-w-4xl overflow-hidden animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
            <div className="bg-slate-50 px-6 md:px-10 py-6 md:py-8 border-b border-gray-100 flex justify-between items-start shrink-0">
              <div className="flex gap-4 md:gap-8">
                <div className="w-12 h-12 md:w-16 md:h-16 bg-white rounded-xl md:rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center text-blue-600 shrink-0">
                  <selectedFeature.icon size={24} className="md:w-[32px] md:h-[32px]" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-1 md:mb-2">
                     <span className="bg-green-100 text-green-700 text-[8px] md:text-xs font-black px-2 md:px-3 py-0.5 md:py-1 rounded-full uppercase tracking-wider">Included Feature</span>
                     <span className="text-[10px] md:text-sm text-slate-500 font-bold uppercase tracking-widest">{selectedFeature.category}</span>
                  </div>
                  <h2 className="text-xl md:text-4xl font-black text-slate-900 leading-tight">{selectedFeature.name}</h2>
                </div>
              </div>
              <button 
                onClick={() => setSelectedFeature(null)}
                className="text-slate-400 hover:text-slate-900 bg-white hover:bg-slate-200 p-2 md:p-3 rounded-full transition-colors ml-2"
              >
                <X size={20} className="md:w-[24px] md:h-[24px]" />
              </button>
            </div>

            <div className="p-6 md:p-14 overflow-y-auto">
              <p className="text-lg md:text-2xl text-slate-600 leading-relaxed mb-8 md:mb-12 font-light">
                {selectedFeature.description}
              </p>
              
              <div className="bg-slate-50 rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 border border-slate-100">
                <h4 className="text-[10px] md:text-sm font-black uppercase tracking-widest text-slate-900 mb-6 md:mb-8">Business Impact</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 md:gap-y-6">
                  {selectedFeature.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3 md:gap-4">
                      <CheckCircle2 size={20} className="text-blue-600 mt-1 flex-shrink-0 md:w-[24px] md:h-[24px]"/>
                      <span className="text-slate-800 font-bold text-base md:text-lg">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

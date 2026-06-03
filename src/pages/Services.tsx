import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../constants";
import { ArrowRight, CheckCircle2, Phone, Mail, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export default function Services() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('id');
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const currentService = SERVICES.find(s => s.id === serviceId);

  // Sync scroll to top on service change & update SEO tags dynamically
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    let titleStr = "Stainless Steel Industrial Inventory Chennai | Sidharth Steels";
    let descStr = "Explore our extensive collection of high-quality stainless steel sheets, coils, plates, pipes, tubes, bars, and fittings in Chennai.Sourced from premium tier-1 global mills.";
    
    if (currentService) {
      titleStr = `${currentService.title} Supplier in Chennai | Sidharth Steels`;
      descStr = `${currentService.subtitle || currentService.title}. Genuine materials sourced from certified global mills in grades 304L, 316L, 201, and 430. Get a quote today.`;
    }
    
    document.title = titleStr;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", descStr);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = descStr;
      document.head.appendChild(meta);
    }
  }, [serviceId, currentService]);

  if (!currentService) {
    return (
      <div className="min-h-screen bg-[#F8F9FA] py-8 md:py-12 px-4">
        <div className="container-custom">
          <div className="text-left max-w-4xl mb-8 md:mb-10">
            <motion.span 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-3 md:mb-4 block"
            >
              Certified Industry Solutions
            </motion.span>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-black text-steel-950 tracking-tighter capitalize mb-4 md:mb-6 leading-[1]"
            >
              Material Catalog
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-steel-500 font-medium text-base md:text-xl leading-relaxed max-w-3xl"
            >
              Explore South India's most comprehensive inventory of premium stainless steel, 
              sourced from global tier-1 mills for mission-critical applications.
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {SERVICES.map((s, i) => (
              <motion.div 
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative h-[400px] md:h-[600px] rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl hover:shadow-primary/10 transition-all duration-700 bg-steel-950"
              >
                <img 
                  src={s.image} 
                  alt={s.title} 
                  className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms] brightness-[0.4] grayscale group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8 md:p-10 z-10">
                   <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-2 md:mb-3 block">Certified Grade</span>
                  <h3 className="text-2xl md:text-4xl font-black text-white mb-4 leading-tight group-hover:text-primary transition-colors tracking-tight">{s.title}</h3>
                  <p className="text-steel-300 text-sm md:text-base mb-6 md:mb-8 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-2">
                    {s.description}
                  </p>
                  <Link 
                    to={`/services?id=${s.id}`} 
                    className="w-full py-2.5 bg-white text-steel-950 font-bold rounded-lg text-xs flex items-center justify-center gap-2 hover:translate-x-1 transition-all shadow-md uppercase tracking-widest"
                  >
                    Specifications <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>


        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">
      {/* Main content Layout */}
      <section className="py-1 md:py-2">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-3 md:gap-4 overflow-hidden">
            
            {/* Sidebar (Desktop) */}
            <aside className="lg:w-1/3 xl:w-1/4 space-y-4 order-2 lg:order-1">
              {/* All Services List */}
              <div className="bg-steel-50 rounded-xl p-4 border border-steel-100">
                <h4 className="text-sm font-bold text-steel-950 mb-3 flex items-center gap-3">
                  All Services
                </h4>
                <div className="space-y-1">
                  {SERVICES.map(s => (
                    <Link
                      key={s.id}
                      to={`/services?id=${s.id}`}
                      className={cn(
                         "flex justify-between items-center px-3 py-2.5 rounded-lg font-bold text-[12px] transition-all grayscale-0",
                        s.id === serviceId 
                          ? "bg-white text-primary shadow-lg border border-steel-50" 
                          : "text-steel-600 hover:bg-white hover:text-primary border border-transparent"
                      )}
                    >
                      {s.title}
                      <ArrowRight size={14} className={cn("transition-transform", s.id === serviceId && "translate-x-1")} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Support Widget */}
              <div className="bg-[#050520] rounded-2xl p-6 text-white relative overflow-hidden">
                 <h4 className="text-lg font-bold mb-3 relative z-10">24/7 ONLINE SUPPORT</h4>
                 <p className="text-white/60 text-[11px] mb-6 relative z-10">Get immediate quotes & book shipment.</p>
                 
                 <form className="space-y-3 relative z-10" onSubmit={e => e.preventDefault()}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors"
                    />
                    <textarea 
                      placeholder="Your Question Here" 
                      rows={3}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    <button className="w-full py-3 bg-primary text-white rounded-lg font-bold text-[11px] uppercase tracking-widest hover:scale-[1.02] transition-transform">
                      Contact Now
                    </button>
                 </form>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2 space-y-8">
              
              {/* Product Hero Header & Compact Side-by-Side Image */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                <div className="md:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.25em] font-extrabold text-primary uppercase">
                    <span className="w-6 h-[1.5px] bg-primary" />
                    Sidharth Steels &middot; Since 1984
                  </div>
                  <motion.h1 
                    key={`${serviceId}-title`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-steel-950 tracking-tight leading-tight uppercase"
                  >
                    Stainless Steel {currentService.title} <span className="text-primary italic block md:inline font-black">Supplier in Chennai</span>
                  </motion.h1>
                  <motion.p 
                    key={`${serviceId}-desc`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-steel-600 text-sm md:text-base leading-relaxed font-semibold"
                  >
                    {currentService.description}
                  </motion.p>
                </div>
                
                <div className="md:col-span-4 flex justify-center">
                  <motion.div 
                    key={`${serviceId}-img`}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative group overflow-hidden rounded-[24px] border border-steel-200/50 shadow-xl aspect-square w-full max-w-[220px] bg-steel-100"
                  >
                    <img 
                      src={currentService.image} 
                      alt={currentService.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-3 right-3 bg-steel-950/85 backdrop-blur-sm text-primary text-[8px] font-black tracking-widest uppercase px-2.5 py-0.5 rounded shadow">
                      In Stock
                    </div>
                  </motion.div>
                </div>
              </div>

              {/* Quality & Traceability Badges */}
              <div className="flex flex-wrap gap-2.5 py-1 border-y border-steel-100">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 border border-steel-200/60 rounded text-[11px] font-bold text-steel-700 shadow-sm">
                  <span className="text-primary">✓</span> Mill Test Certified
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 border border-steel-200/60 rounded text-[11px] font-bold text-steel-700 shadow-sm">
                  <span className="text-primary">✓</span> 304L & 316L In Stock
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 border border-steel-200/60 rounded text-[11px] font-bold text-steel-700 shadow-sm">
                  <span className="text-primary">✓</span> Cut-to-Size Available
                </div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-steel-50 border border-steel-200/60 rounded text-[11px] font-bold text-steel-700 shadow-sm">
                  <span className="text-primary">✓</span> Pan-India Supply
                </div>
              </div>

              {/* Technical Grade Explanatory Callout */}
              <div className="p-5 md:p-6 bg-steel-50 border-l-4 border-primary rounded-r-2xl space-y-2 shadow-sm">
                <h4 className="text-xs font-extrabold text-steel-950 uppercase tracking-wider flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                  Metallurgical Insight: The "L" Series Advantage
                </h4>
                <p className="text-steel-600 text-[12.5px] leading-relaxed font-medium">
                  The <strong className="text-steel-950">"L" designation</strong> in both 304L and 316L variants stands for <em className="not-italic font-bold text-primary">Low Carbon</em> (Max 0.03% content). This is a critical engineering requirement that prevents carbide precipitation during welding. This dramatically reduces the possibility of weld decay and intergranular corrosion, making low-carbon alloys the professional choice for any welded industrial structures or pipe systems.
                </p>
              </div>

              {/* Dual Grade Spotlight Module (Rendered for Sheets/Coils and Plates) */}
              {(serviceId === "sheets-coils" || serviceId === "plates") && (
                <div className="space-y-4">
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Grade Comparison</span>
                    <h3 className="text-xl md:text-2xl font-black text-steel-950 tracking-tight flex items-center gap-2">
                      Choosing the Right Premium Alloy
                    </h3>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Grade 304L */}
                    <div className="border border-steel-200/80 rounded-[20px] p-5 relative overflow-hidden bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                      <div className="absolute top-4 right-5 text-4xl font-black text-steel-900/5 select-none font-mono">304L</div>
                      <span className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider rounded mb-3">Cost-Effective Grade</span>
                      <h4 className="text-base font-bold text-steel-950 mb-1.5">304L Stainless Steel</h4>
                      <p className="text-steel-500 text-xs leading-relaxed mb-4">
                        The ultimate industrial workhorse. Superior food-grade hygiene, exceptional formability, outstanding general purpose resistance, and cost efficiency.
                      </p>
                      <div className="border-t border-steel-100 pt-3 space-y-1.5 font-mono text-[10px] text-steel-500">
                        <div className="flex justify-between"><span>Chromium (Cr)</span><span className="font-bold text-steel-950">18.0 &ndash; 20.0%</span></div>
                        <div className="flex justify-between"><span>Nickel (Ni)</span><span className="font-bold text-steel-950">8.0 &ndash; 12.0%</span></div>
                        <div className="flex justify-between"><span>Molybdenum (Mo)</span><span className="font-bold text-steel-400">&mdash;</span></div>
                        <div className="flex justify-between"><span>Carbon (C)</span><span className="font-bold text-steel-950">Max 0.03% (Low Carbon)</span></div>
                      </div>
                      <div className="mt-4 p-3 bg-steel-50 rounded-lg text-[11px] font-bold text-steel-700">
                        ✓ Ideal for: General fabrications, dairy equipment, breweries, architect structures, structural framing.
                      </div>
                    </div>

                    {/* Grade 316L */}
                    <div className="border border-steel-200/80 rounded-[20px] p-5 relative overflow-hidden bg-white hover:border-primary/40 hover:shadow-lg transition-all duration-300">
                      <div className="absolute top-4 right-5 text-4xl font-black text-steel-900/5 select-none font-mono">316L</div>
                      <span className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider rounded mb-3">Marine & High Performance</span>
                      <h4 className="text-base font-bold text-steel-950 mb-1.5">316L Stainless Steel</h4>
                      <p className="text-steel-500 text-xs leading-relaxed mb-4">
                        The gold standard for engineering in highly corrosive chloride environments. Incorporates molybdenum for high resistance against pits and chemical acids.
                      </p>
                      <div className="border-t border-steel-100 pt-3 space-y-1.5 font-mono text-[10px] text-steel-500">
                        <div className="flex justify-between"><span>Chromium (Cr)</span><span className="font-bold text-steel-950">16.0 &ndash; 18.0%</span></div>
                        <div className="flex justify-between"><span>Nickel (Ni)</span><span className="font-bold text-steel-950">10.0 &ndash; 14.0%</span></div>
                        <div className="flex justify-between"><span>Molybdenum (Mo)</span><span className="font-bold text-primary">2.0 &ndash; 3.0% ★ Key</span></div>
                        <div className="flex justify-between"><span>Carbon (C)</span><span className="font-bold text-steel-950">Max 0.03% (Low Carbon)</span></div>
                      </div>
                      <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 text-[11px] font-bold text-steel-800">
                        ✓ Ideal for: Coastal structures, marine vessels, pharmaceutical vessels, acidic tanks, petrochemical valves.
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Dynamic Specifications Range Table */}
              <div className="bg-steel-950 border border-steel-800/30 rounded-[24px] overflow-hidden shadow-xl relative">
                <div className="p-5 md:p-6 border-b border-steel-900 bg-steel-900/20">
                  <span className="text-[9px] font-black tracking-[0.25em] text-primary uppercase">Certified Data Sheeting</span>
                  <h3 className="text-lg md:text-xl font-bold text-white leading-tight mt-1">Technical Reference Range</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-steel-900/60 border-b border-steel-900">
                        <th className="px-6 py-3.5 text-[10px] font-bold text-primary uppercase tracking-wider font-mono">Parameter</th>
                        <th className="px-6 py-3.5 text-[10px] font-bold text-primary uppercase tracking-wider font-mono">Specification Range & Standard</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-steel-900/40 text-[13px]">
                      {Object.entries(currentService.technical).map(([key, value]) => {
                        const displayKey = key === 'grades' ? 'Primary Grades' :
                                           key === 'thickness' ? 'Thickness Range' :
                                           key === 'finish' ? 'Surface Finishes' :
                                           key === 'standards' ? 'Applicable Standards' :
                                           key === 'usage' ? 'Common Usage' :
                                           key === 'width' ? 'Width Options' :
                                           key === 'processing' ? 'Value-Added Services' :
                                           key === 'types' ? 'Form Types' :
                                           key === 'size' ? 'Available Sizes' :
                                           key === 'schedule' ? 'Wall Schedules' :
                                           key === 'forms' ? 'Cross Sections' :
                                           key === 'shape' ? 'Standard Profiles' :
                                           key === 'items' ? 'Fittings Catalog' :
                                           key === 'connection' ? 'Joint Selection' : key;
                        
                        return (
                          <tr key={key} className="hover:bg-steel-900/30 transition-colors">
                            <td className="px-6 py-4 font-bold text-white capitalize">{displayKey}</td>
                            <td className="px-6 py-4 text-steel-300 font-semibold leading-relaxed">
                              {key === 'finish' || key === 'grades' || key === 'shape' || key === 'types' || key === 'items' ? (
                                <div className="flex flex-wrap gap-1.5 mt-0.5">
                                  {(Array.isArray(value) ? value : String(value).split(',')).map((tagVal, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-steel-900/80 border border-steel-800 rounded text-[10px] font-mono font-bold text-white/90">
                                      {tagVal.trim()}
                                    </span>
                                  ))}
                                </div>
                              ) : (
                                Array.isArray(value) ? value.join(", ") : value
                              )}
                            </td>
                          </tr>
                        );
                      })}
                      <tr className="hover:bg-steel-900/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">Quality Assurance</td>
                        <td className="px-6 py-4 text-steel-300 font-semibold leading-relaxed">
                          Supplied with authenticated Mill Test Certificates (MTCs) from premium global manufacture mills.
                        </td>
                      </tr>
                      <tr className="hover:bg-steel-900/30 transition-colors">
                        <td className="px-6 py-4 font-bold text-white">Processing Capability</td>
                        <td className="px-6 py-4 text-steel-300 font-semibold leading-relaxed">
                          Laser cutting, waterjet cutting, custom shearing, slitting, and mirror-polishing services upon client request.
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lists Section (Supply Details & Why Us) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                   <h4 className="text-base font-extrabold text-steel-950 flex items-center gap-2">
                     <span className="w-1.5 h-6 bg-primary rounded-full" />
                     Supplying {currentService.title} In:
                   </h4>
                   <ul className="grid grid-cols-1 gap-2">
                      {currentService.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2.5 group">
                           <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                           <span className="text-steel-700 font-bold text-[13px]">{f}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-4">
                   <h4 className="text-base font-extrabold text-steel-950 flex items-center gap-2">
                     <span className="w-1.5 h-6 bg-primary rounded-full opacity-50" />
                     Value & Stock Delivery Benefit
                   </h4>
                   <ul className="space-y-2">
                      {currentService.whyChooseUs?.map((item, i) => (
                        <li key={i} className="flex items-start gap-3 p-3 bg-steel-50/50 rounded-xl border border-transparent hover:border-steel-100 hover:bg-white hover:shadow-md transition-all group">
                           <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                           <span className="text-steel-700 font-bold text-[13px]">{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Product Page CTA Strip - Ultra Compact */}
              <div className="bg-steel-950 border border-steel-800/40 rounded-[20px] p-4 md:p-5 relative overflow-hidden group shadow-lg">
                <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary block">Instant Response Procurement</span>
                    <h4 className="text-sm md:text-base font-extrabold text-white leading-tight">
                      Need custom specifications for {currentService.title}?
                    </h4>
                    <p className="text-steel-300 text-[10px] md:text-xs">
                      Get real-time wholesale pricing and stock quantities directly from Chennai operations.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-steel-900 hover:bg-steel-800 border border-steel-800 text-white font-bold text-[10px] rounded-md transition-all uppercase tracking-widest"
                    >
                      Request Quote
                    </Link>
                    <Link
                      to="/contact"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white font-[10px] sm:font-[10px] font-bold rounded-md hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 uppercase tracking-widest text-[10px]"
                    >
                      Contact Sales
                    </Link>
                  </div>
                </div>
                {/* Decorative highlight */}
                <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-1/2 group-hover:translate-x-1/4 transition-transform duration-[3000ms]" />
              </div>

              {/* FAQ Section */}
              <div className="space-y-6 pt-8 border-t border-slate-100">
                 <div>
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">Support Hub</span>
                   <h3 className="text-2xl font-black text-steel-950 tracking-tight">Frequently Asked Questions</h3>
                 </div>
                 <div className="space-y-3">
                    {currentService.faqs?.map((faq, index) => (
                      <div key={index} className="border border-steel-100 rounded-xl overflow-hidden transition-all shadow-sm">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full flex justify-between items-center p-4 text-left hover:bg-steel-50 transition-colors"
                        >
                          <span className="font-bold text-steel-950 text-sm">{faq.question}</span>
                          {openFaq === index ? <ChevronUp className="text-primary" size={16} /> : <ChevronDown className="text-steel-400" size={16} />}
                        </button>
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="p-4 pt-0 text-steel-600 font-medium leading-relaxed border-t border-steel-50 text-[12.5px] bg-steel-50/20">
                                {faq.answer}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ))}
                 </div>
              </div>
            </main>
          </div>
        </div>
      </section>


    </div>
  );
}

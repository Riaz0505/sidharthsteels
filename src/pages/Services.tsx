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

  // Sync scroll to top on service change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

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
            <main className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2 space-y-4">
              {/* Feature Image */}
              <motion.div 
                key={`${serviceId}-img`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[20px] overflow-hidden shadow-lg relative aspect-[21/9]"
              >
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>
 
              {/* Title and Intro */}
              <div className="space-y-4">
                <motion.h2 
                  key={`${serviceId}-title`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-2xl md:text-3xl lg:text-4xl font-black text-steel-950 tracking-tight capitalize leading-tight"
                >
                  {currentService.title} supplier in Chennai
                </motion.h2>
                <motion.p 
                  key={`${serviceId}-desc`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-steel-600 text-base md:text-lg leading-[1.6] font-medium"
                >
                  {currentService.description}
                </motion.p>
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                <div className="space-y-4">
                   <h4 className="text-lg font-bold text-steel-950 flex items-center gap-2">
                     <span className="w-1.5 h-6 bg-primary rounded-full" />
                     We supply {currentService.title.toLowerCase()} in:
                   </h4>
                   <ul className="grid grid-cols-1 gap-2">
                      {currentService.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-2 group">
                           <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                           <span className="text-steel-700 font-bold text-[13px]">{f}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-4">
                   <h4 className="text-lg font-bold text-steel-950 flex items-center gap-2">
                     <span className="w-1.5 h-6 bg-primary rounded-full opacity-50" />
                     Why Choose Us?
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

              {/* Technical Specifications Area */}
              <div className="bg-steel-950 border border-steel-800/30 rounded-[24px] p-6 md:p-8 text-white overflow-hidden relative">
                 <div className="relative z-10">
                    <h3 className="text-xl font-black mb-6">Technical Range</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                       {Object.entries(currentService.technical).map(([key, value]) => (
                         <div key={key} className="space-y-1 border-l border-white/20 pl-4">
                            <span className="text-[9px] font-bold text-white/70 uppercase tracking-[0.2em]">{key}</span>
                            <p className="text-xs font-bold text-white leading-relaxed">
                              {Array.isArray(value) ? value.join(", ") : value}
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-6 pt-8 border-t border-steel-100">
                 <h3 className="text-2xl font-black text-steel-950">FAQs</h3>
                 <div className="space-y-3">
                    {currentService.faqs?.map((faq, index) => (
                      <div key={index} className="border border-steel-100 rounded-xl overflow-hidden">
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
                              <div className="p-4 pt-0 text-steel-500 font-medium leading-relaxed border-t border-steel-50 text-xs">
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

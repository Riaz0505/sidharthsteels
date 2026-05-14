import { motion, AnimatePresence } from "motion/react";
import { SERVICES } from "../constants";
import { ArrowRight, CheckCircle2, Phone, Mail, FileText, ChevronDown, ChevronUp } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { cn } from "../lib/utils";

export default function Services() {
  const [searchParams] = useSearchParams();
  const serviceId = searchParams.get('id') || SERVICES[0].id;
  const currentService = SERVICES.find(s => s.id === serviceId) || SERVICES[0];
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // Sync scroll to top on service change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [serviceId]);

  return (
    <div className="pt-20 min-h-screen bg-white font-sans">
      {/* 1. Hero Section - Breadcrumbs & Title */}
      <section className="relative py-12 border-b border-steel-100 bg-steel-50/30">
        <div className="container-custom">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-steel-400">
              <Link to="/" className="hover:text-primary transition-colors">Home</Link>
              <span>/</span>
              <span className="text-steel-950">Services</span>
              <span>/</span>
              <span className="text-primary truncate max-w-[150px] md:max-w-none">{currentService.title}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Main content Layout */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar (Desktop) */}
            <aside className="lg:w-1/3 xl:w-1/4 space-y-8 order-2 lg:order-1">
              {/* All Services List */}
              <div className="bg-steel-50 rounded-2xl p-6 border border-steel-100">
                <h4 className="text-lg font-bold text-steel-950 mb-6 flex items-center gap-3">
                  All Services
                </h4>
                <div className="space-y-2">
                  {SERVICES.map(s => (
                    <Link
                      key={s.id}
                      to={`/services?id=${s.id}`}
                      className={cn(
                        "flex justify-between items-center px-5 py-4 rounded-xl font-bold text-sm transition-all grayscale-0",
                        s.id === serviceId 
                          ? "bg-white text-primary shadow-lg border border-steel-50" 
                          : "text-steel-600 hover:bg-white hover:text-primary border border-transparent"
                      )}
                    >
                      {s.title}
                      <ArrowRight size={16} className={cn("transition-transform", s.id === serviceId && "translate-x-1")} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Download Brochure (Simulated) */}
              <div className="bg-steel-50 rounded-2xl p-6 border border-steel-100">
                 <h4 className="text-lg font-bold text-steel-950 mb-6">Download Now</h4>
                 <div className="space-y-3">
                    {[2022, 2023, 2024].map(year => (
                      <button 
                        key={year}
                        className="w-full flex justify-between items-center px-4 py-3 bg-white hover:bg-primary hover:text-white transition-all border border-steel-100 rounded-xl font-bold text-xs"
                      >
                         <span>Company Report -{year}</span>
                         <FileText size={16} />
                      </button>
                    ))}
                 </div>
              </div>

              {/* Support Widget */}
              <div className="bg-[#050520] rounded-3xl p-8 text-white relative overflow-hidden">
                 <h4 className="text-xl font-bold mb-4 relative z-10">24/7 ONLINE SUPPORT</h4>
                 <p className="text-white/60 text-xs mb-8 relative z-10">Get immediate quotes & book shipment.</p>
                 
                 <form className="space-y-4 relative z-10" onSubmit={e => e.preventDefault()}>
                    <input 
                      type="text" 
                      placeholder="Your Name" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <input 
                      type="email" 
                      placeholder="Your Email" 
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <textarea 
                      placeholder="Your Question Here" 
                      rows={4}
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors resize-none"
                    />
                    <button className="w-full py-4 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:scale-[1.02] transition-transform">
                      Contact Now
                    </button>
                 </form>
                 <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/20 rounded-full blur-3xl" />
              </div>
            </aside>

            {/* Content Area */}
            <main className="lg:w-2/3 xl:w-3/4 order-1 lg:order-2 space-y-12">
              {/* Feature Image */}
              <motion.div 
                key={`${serviceId}-img`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="rounded-[32px] overflow-hidden shadow-2xl relative aspect-[16/9]"
              >
                <img 
                  src={currentService.image} 
                  alt={currentService.title}
                  className="w-full h-full object-cover"
                />
              </motion.div>

              {/* Title and Intro */}
              <div className="space-y-6">
                <motion.h2 
                  key={`${serviceId}-title`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-3xl md:text-5xl font-black text-steel-950 tracking-tight"
                >
                  {currentService.title} Supplier in Chennai
                </motion.h2>
                <motion.p 
                  key={`${serviceId}-desc`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-steel-600 text-lg leading-relaxed font-medium"
                >
                  {currentService.description}
                </motion.p>
              </div>

              {/* Lists Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                   <h4 className="text-xl font-bold text-steel-950 flex items-center gap-2">
                     <span className="w-2 h-8 bg-primary rounded-full" />
                     We supply {currentService.title.toLowerCase()} in:
                   </h4>
                   <ul className="space-y-4">
                      {currentService.features?.map((f, i) => (
                        <li key={i} className="flex items-start gap-3 group">
                           <CheckCircle2 size={18} className="text-primary mt-1 shrink-0 group-hover:scale-110 transition-transform" />
                           <span className="text-steel-700 font-bold text-sm">{f}</span>
                        </li>
                      ))}
                   </ul>
                </div>
                <div className="space-y-6">
                   <h4 className="text-xl font-bold text-steel-950 flex items-center gap-2">
                     <span className="w-2 h-8 bg-primary rounded-full opacity-50" />
                     Why Choose Us for {currentService.title.toLowerCase()}?
                   </h4>
                   <ul className="space-y-4">
                      {currentService.whyChooseUs?.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 bg-steel-50/50 rounded-2xl border border-transparent hover:border-steel-100 hover:bg-white hover:shadow-lg transition-all group">
                           <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-primary shadow-sm group-hover:bg-primary group-hover:text-white transition-colors">
                            <CheckCircle2 size={14} />
                           </div>
                           <span className="text-steel-700 font-bold text-sm mt-1.5">{item}</span>
                        </li>
                      ))}
                   </ul>
                </div>
              </div>

              {/* Technical Specifications Area */}
              <div className="bg-steel-950 rounded-[40px] p-8 md:p-12 text-white overflow-hidden relative">
                 <div className="relative z-10">
                    <h3 className="text-2xl md:text-3xl font-black mb-8">Technical Range</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-y-10 gap-x-12">
                       {Object.entries(currentService.technical).map(([key, value]) => (
                         <div key={key} className="space-y-2 border-l border-white/10 pl-6">
                            <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em]">{key}</span>
                            <p className="text-sm font-bold text-white leading-relaxed">
                              {Array.isArray(value) ? value.join(", ") : value}
                            </p>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-[120px]" />
              </div>

              {/* Applications Section */}
              <div className="space-y-8">
                 <h4 className="text-2xl font-black text-steel-950">Applications of {currentService.title}</h4>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {currentService.applications?.map((app, i) => (
                      <div key={i} className="flex items-center gap-4 p-4 border border-steel-100 rounded-2xl hover:bg-steel-50 transition-colors">
                         <div className="w-2 h-2 rounded-full bg-primary" />
                         <span className="text-steel-600 font-bold text-sm tracking-tight">{app}</span>
                      </div>
                    ))}
                 </div>
              </div>

              {/* FAQ Section */}
              <div className="space-y-8 pt-12 border-t border-steel-100">
                 <h3 className="text-3xl font-black text-steel-950">Frequently Asked Questions</h3>
                 <div className="space-y-4">
                    {currentService.faqs?.map((faq, index) => (
                      <div key={index} className="border border-steel-100 rounded-2xl overflow-hidden">
                        <button
                          onClick={() => setOpenFaq(openFaq === index ? null : index)}
                          className="w-full flex justify-between items-center p-6 text-left hover:bg-steel-50 transition-colors"
                        >
                          <span className="font-bold text-steel-950">{faq.question}</span>
                          {openFaq === index ? <ChevronUp className="text-primary" /> : <ChevronDown className="text-steel-400" />}
                        </button>
                        <AnimatePresence>
                          {openFaq === index && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                            >
                              <div className="p-6 pt-0 text-steel-500 font-medium leading-relaxed border-t border-steel-50">
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

      {/* 3. Call to Action Footer */}
      <section className="bg-steel-50 py-20 px-4">
         <div className="container-custom">
            <div className="bg-white rounded-[48px] p-8 md:p-16 lg:p-24 shadow-2xl border border-steel-100 flex flex-col lg:flex-row items-center justify-between gap-12 text-left">
               <div className="max-w-2xl">
                 <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8">
                    <Phone size={32} />
                 </div>
                 <h2 className="text-3xl md:text-5xl font-black text-steel-950 mb-6 tracking-tighter uppercase whitespace-pre-line leading-tight">Ready to Start <br />Your Project?</h2>
                 <p className="text-steel-500 text-lg font-medium mb-0 leading-relaxed">
                   Get in touch with our expert sales team to discuss technical specifications and bulk pricing for {currentService.title.toLowerCase()}.
                 </p>
               </div>
               <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                  <a href="tel:+914422334455" className="px-10 py-5 bg-primary text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 shadow-xl shadow-primary/20 transition-all flex items-center justify-center gap-3">
                    Call Now <ArrowRight size={18} />
                  </a>
                  <a href="mailto:sales@sidharthsteel.com" className="px-10 py-5 bg-steel-950 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:scale-105 shadow-xl transition-all flex items-center justify-center gap-3">
                    Send Email <Mail size={18} />
                  </a>
               </div>
            </div>
         </div>
      </section>
    </div>
  );
}

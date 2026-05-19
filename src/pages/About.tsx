import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ACHIEVEMENTS } from "../constants";
import { CheckCircle2, Target, Eye, ShieldCheck, ArrowRight, Globe, Phone } from "lucide-react";
import { cn } from "../lib/utils";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Content Section & Stats */}
      <section id="about-intro" className="py-8 md:py-32 px-4 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-24 items-center mb-12 md:mb-40">
            <div className="lg:col-span-12 max-w-5xl">
               <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 md:mb-8 block"
                >
                   Est. 1983 • Industrial Excellence
                 </motion.span>
              <h1 className="text-3xl md:text-6xl lg:text-7xl font-black text-steel-950 mb-8 md:mb-12 tracking-tighter leading-[1] capitalize">
                The hub of stainless steel <br className="hidden md:block" /> distribution in South India
              </h1>
              <div className="space-y-6 md:space-y-8 text-steel-500 text-base md:text-2xl md:leading-[1.6] font-medium max-w-4xl">
                <p>
                  Sidharth Steels is a premier trusted stainless steel dealer and stockist based in Chennai, serving as a key distribution hub for South India. We specialize in high-grade stainless steel products that power the region's industrial growth.
                </p>
                <p>
                  With a commitment to excellence and inventory readiness, we ensure your projects never stop. Our supply chain is optimized for speed, precision, and certification compliance.
                </p>
                <div className="pt-8 md:pt-12 flex flex-col sm:flex-row items-center gap-6 md:gap-8">
                   <a href="tel:+914422334455" className="w-full sm:w-auto px-8 md:px-12 py-4 md:py-6 bg-primary text-white font-black rounded-2xl flex items-center justify-center gap-3 hover:translate-x-3 transition-transform shadow-2xl shadow-primary/40 uppercase tracking-widest text-sm md:text-base">
                      Call Our Sales <Phone size={24} className="ml-1" />
                   </a>
                   <div className="flex -space-x-4 items-center">
                     {[p1, p2, p3].map((img, i) => (
                       <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        key={i} 
                        className="w-10 h-10 md:w-16 md:h-16 rounded-full border-2 md:border-4 border-white overflow-hidden bg-steel-100 shadow-lg"
                       >
                         <img src={img} className="w-full h-full object-cover" />
                       </motion.div>
                     ))}
                     <span className="ml-6 md:ml-8 text-xs md:text-lg font-bold text-steel-400 bg-steel-50 px-4 md:px-6 py-2 rounded-full border border-steel-100 whitespace-nowrap">Trusted by 500+ Industries</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10 border-t border-steel-100 pt-16 md:pt-32">
            {ACHIEVEMENTS.map((stat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-steel-50/50 p-8 md:p-12 rounded-[32px] md:rounded-[48px] border border-steel-100 shadow-sm flex flex-col justify-between min-h-[160px] md:min-h-[260px] group hover:bg-white hover:shadow-2xl transition-all duration-500"
              >
                <h3 className="text-4xl md:text-6xl font-black text-steel-950 mb-2 md:mb-4 leading-none group-hover:text-primary transition-colors tracking-tighter">{stat.value}</h3>
                <p className="text-steel-400 text-[9px] md:text-xs font-black uppercase tracking-[0.2em] leading-tight group-hover:text-steel-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-16 md:py-40 px-4 bg-steel-50/50">
        <div className="container-custom">
          {/* Mission/Vision - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {[
              { 
                icon: Target, 
                title: "Our Mission", 
                desc: "To empower industries with reliable, high-performance stainless steel solutions while maintaining uncompromising quality standards.",
              },
              { 
                icon: Eye, 
                title: "Our Vision", 
                desc: "To be the most preferred and trusted steel supply partner internationally, setting benchmarks in service and reliability.",
              },
              { 
                icon: ShieldCheck, 
                title: "Our Values", 
                desc: "Integrity, transparency, and technical precision are at the core of every client interaction and material we supply.",
              }
            ].map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 md:p-16 bg-white border border-steel-100 rounded-[48px] md:rounded-[64px] hover:shadow-2xl transition-all h-auto md:h-[400px] flex flex-col group relative overflow-hidden"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-steel-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary border border-steel-100">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-steel-950 mb-4 md:mb-6 tracking-tight">{item.title}</h3>
                <p className="text-steel-500 font-medium leading-relaxed text-sm md:text-lg mb-8 md:mb-0">{item.desc}</p>
                <div className="mt-auto">
                   <div className="flex items-center gap-6 text-[9px] md:text-[10px] font-black text-steel-200 uppercase tracking-[0.3em]">
                      <span>Principles</span>
                      <div className="h-px flex-grow bg-steel-100" />
                   </div>
                </div>
                <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-16 md:py-40 px-4 bg-white">
        <div className="container-custom">
          <div className="text-left mb-16 md:mb-32">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-[11px] mb-6 md:mb-8 block">Our Facility</span>
            <h2 className="text-3xl md:text-6xl font-black text-steel-950 mb-8 md:mb-10 tracking-tighter capitalize leading-tight">Inside the Chennai manufacturing hub</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="lg:col-span-2 aspect-[16/9] rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl relative group"
            >
              <img src={p1} alt="Warehouse Overview" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="aspect-[16/9] md:aspect-square rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl relative group"
            >
              <img src={p2} alt="Steel Sheets" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="aspect-[16/9] md:aspect-square lg:aspect-auto lg:col-span-3 md:h-[600px] rounded-[32px] md:rounded-[64px] overflow-hidden shadow-2xl relative group"
            >
              <img src={p3} alt="Infrastructure" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[3000ms]" />
              <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Horizontal Grid */}
      <section className="py-16 md:py-40 bg-steel-950 rounded-[32px] md:rounded-[80px] mx-2 md:mx-4 mb-4 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="text-left max-w-4xl mb-12 md:mb-24">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-[11px] mb-6 md:mb-8 block">Competitive Advantage</span>
            <h2 className="text-3xl md:text-6xl lg:text-7xl font-black text-white mb-8 md:mb-12 tracking-tighter capitalize leading-tight">Why regional leaders partner <br className="hidden md:block" /> with Sidharth steels</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[
              "Quality Assurance (304, 316 Grades)",
              "Vast Ready-Stock Inventory",
              "Precision Cutting & Sizing",
              "On-Time Logistics & Delivery",
              "Competitive Wholesale Pricing",
              "Full Material Certification"
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col gap-6 md:gap-8 p-8 md:p-12 bg-white/5 border border-white/10 rounded-[32px] md:rounded-[48px] hover:bg-white/10 transition-all group"
              >
                <div className="w-10 h-10 md:w-14 md:h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                   <CheckCircle2 size={20} />
                </div>
                <span className="text-base md:text-2xl font-black text-white tracking-tight leading-tight">{item}</span>
              </motion.div>
            ))}
          </div>

          {/* Join Section - Integrated into dark block or new section below */}
          <div className="mt-16 md:mt-40 border-t border-white/10 pt-16 md:pt-40">
             <div className="max-w-4xl">
                <h2 className="text-3xl md:text-7xl font-black text-white mb-8 md:mb-12 tracking-tight leading-[1] capitalize">Be part of our industrial <br className="hidden md:block" /> legacy today</h2>
                <p className="text-steel-400 text-base md:text-2xl font-medium mb-10 md:mb-16 leading-relaxed">
                   Join forces with South India's premier steel partner. Experience reliability that builds kingdoms.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                   <Link to="/contact" className="px-10 py-5 md:px-12 md:py-6 bg-primary text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 text-center uppercase tracking-widest text-[13px] md:text-base">
                      Get Quotation Now
                   </Link>
                   <Link to="/services" className="px-10 py-5 md:px-12 md:py-6 border-2 border-white/20 text-white font-black rounded-2xl hover:bg-white/10 active:scale-95 transition-all text-center text-[13px] md:text-base uppercase tracking-widest">
                      View Inventory
                   </Link>
                </div>
             </div>
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] border border-white/5 rounded-full blur-sm" />
        <Globe size={400} className="absolute -bottom-20 -right-20 text-white/5 opacity-10" />
        <div className="absolute inset-0 opacity-10 z-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { ACHIEVEMENTS } from "../constants";
import { CheckCircle2, Target, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Content Section & Stats */}
      <section id="about-intro" className="py-2 md:py-4 px-4 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-12 max-w-5xl">
               <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-primary font-bold tracking-[0.2em] uppercase text-[11px] md:text-[13px] mb-4 md:mb-5 block"
                >
                   Est. 1999 • Industrial Excellence
                 </motion.span>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-steel-950 mb-6 md:mb-8 tracking-tighter leading-[1] uppercase">
                The hub of stainless steel <br className="hidden md:block" /> distribution in South India.
              </h1>
              <div className="space-y-4 md:space-y-6 text-steel-500 text-sm md:text-lg md:leading-[1.6] font-medium max-w-3xl">
                <p>
                  Sidharth Steels is a premier trusted stainless steel dealer and stockist based in Chennai, serving as a key distribution hub for South India. We specialize in high-grade stainless steel products that power the region's industrial growth.
                </p>
                <p>
                  With a commitment to excellence and inventory readiness, we ensure your projects never stop. Our supply chain is optimized for speed, precision, and certification compliance.
                </p>
                <div className="pt-6 md:pt-8 flex flex-col sm:flex-row gap-4">
                   <button className="px-8 md:px-10 py-4 md:py-5 bg-primary text-white font-bold rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:translate-x-2 transition-transform shadow-lg shadow-primary/20">
                      Corporate Profile <ArrowRight size={20} />
                   </button>
                   <div className="flex -space-x-3 items-center ml-2">
                     {[p1, p2, p3].map((img, i) => (
                       <div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full border-4 border-white overflow-hidden bg-steel-100">
                         <img src={img} className="w-full h-full object-cover" />
                       </div>
                     ))}
                     <span className="ml-6 text-xs md:text-sm font-bold text-steel-400">Trusted by 500+ Industries</span>
                   </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 border-t border-steel-100 pt-12 md:pt-16">
            {ACHIEVEMENTS.map((stat, i) => (
              <div key={i} className="bg-steel-50/50 p-8 md:p-10 rounded-[32px] md:rounded-[48px] border border-steel-100 shadow-sm flex flex-col justify-between min-h-[180px] md:min-h-[220px] group hover:bg-white hover:shadow-xl transition-all duration-500">
                <h3 className="text-4xl md:text-5xl font-black text-steel-950 mb-2 leading-none group-hover:text-primary transition-colors">{stat.value}</h3>
                <p className="text-steel-400 text-[10px] md:text-[11px] font-bold uppercase tracking-widest leading-tight group-hover:text-steel-600">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission/Vision Section */}
      <section className="py-8 md:py-12 px-4 bg-steel-50/50">
        <div className="container-custom">
          {/* Mission/Vision - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 md:p-10 bg-white border border-steel-100 rounded-[40px] hover:shadow-2xl transition-all h-[320px] flex flex-col group"
              >
                <div className="w-12 h-12 bg-steel-50 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <item.icon size={24} />
                </div>
                <h3 className="text-xl font-bold text-steel-950 mb-4 tracking-tight">{item.title}</h3>
                <p className="text-steel-500 font-medium leading-relaxed text-xs md:text-sm">{item.desc}</p>
                <div className="mt-auto">
                   <div className="flex items-center gap-4 text-xs font-bold text-steel-200 uppercase tracking-widest">
                      <span>Principles</span>
                      <div className="h-0.5 flex-grow bg-steel-50" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="container-custom">
          <div className="text-left mb-16 md:mb-24">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-6 block">Our Facility</span>
            <h2 className="text-4xl md:text-5xl font-bold text-steel-950 mb-8 tracking-tighter uppercase">Inside the Chennai Hub</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-[16/9] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl">
              <img src={p1} alt="Warehouse Overview" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-square rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl">
              <img src={p2} alt="Steel Sheets" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-video md:aspect-square lg:aspect-auto lg:col-span-3 h-[300px] md:h-[400px] rounded-[32px] md:rounded-[48px] overflow-hidden shadow-xl">
              <img src={p3} alt="Infrastructure" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Horizontal Grid */}
      <section className="py-12 md:py-32 bg-steel-950 rounded-[48px] md:rounded-[80px] mx-2 md:mx-4 mb-4 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="text-left max-w-4xl mb-12 md:mb-24">
            <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] mb-4 md:mb-6 block">Competitive Advantage</span>
            <h2 className="text-3xl md:text-6xl font-bold text-white mb-6 md:mb-8 tracking-tighter uppercase leading-tight md:leading-none">Why Choose Sidharth Steels?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {[
              "Quality Assurance (304, 316, 400 series)",
              "Vast Ready-Stock Inventory",
              "Precision Cutting & Sizing",
              "On-Time Logistics & Delivery",
              "Competitive Wholesale Pricing",
              "Material Certification Documentation"
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-4 md:gap-6 p-6 md:p-10 bg-white/5 border border-white/10 rounded-[32px] md:rounded-[40px] hover:bg-white/10 transition-colors">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                   <CheckCircle2 size={16} />
                </div>
                <span className="text-sm md:text-lg font-bold text-white tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute inset-0 opacity-10 z-0 bg-gradient-to-br from-primary/20 via-transparent to-transparent" />
      </section>
    </div>
  );
}

import { motion } from "motion/react";
import { ACHIEVEMENTS } from "../constants";
import { CheckCircle2, Target, Eye, ShieldCheck, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";
import p4 from "../assets/p4.jpg";

export default function About() {
  return (
    <div className="pt-24 min-h-screen bg-[#F8F9FA]">
      {/* Editorial Hero */}
      <section className="py-32 px-4 relative overflow-hidden bg-white">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row items-end justify-between gap-12 border-b border-steel-100 pb-24">
             <div className="max-w-3xl">
                <motion.span 
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="text-steel-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-8 block"
                >
                  Est. 1999 • Industrial Excellence
                </motion.span>
                <motion.h1 
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-4xl md:text-6xl lg:text-8xl font-extrabold text-steel-950 mb-4 md:mb-0 leading-[1.1] md:leading-[0.95] tracking-tighter"
                >
                  Our <span className="text-steel-300 font-light italic">Legacy</span> <br />
                  In Precision.
                </motion.h1>
             </div>
             <div className="max-w-xs mb-4">
                <p className="text-sm text-steel-500 font-medium leading-relaxed italic">
                  "Building the future of infrastructure through a commitment to material integrity and operational excellence."
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Content Section & Stats */}
      <section className="py-32 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24 items-start mb-40">
            <div className="lg:col-span-7">
              <h2 className="text-3xl md:text-4xl font-bold text-steel-950 mb-10 tracking-tight leading-tight uppercase">
                The hub of stainless steel <br />distribution in South India.
              </h2>
              <div className="space-y-8 text-steel-500 text-lg leading-[1.8] font-medium max-w-2xl">
                <p>
                  Sidharth Steels is a premier trusted stainless steel dealer and stockist based in Chennai, serving as a key distribution hub for South India. We specialize in high-grade stainless steel products that power the region's industrial growth.
                </p>
                <p>
                  With a commitment to excellence and inventory readiness, we ensure your projects never stop. Our supply chain is optimized for speed, precision, and certification compliance.
                </p>
                <div className="pt-8">
                   <button className="px-10 py-5 bg-steel-950 text-white font-bold rounded-2xl flex items-center gap-3 hover:translate-x-2 transition-transform shadow-xl">
                      Download Corporate Profile <ArrowRight size={20} />
                   </button>
                </div>
              </div>
            </div>
            
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
              {ACHIEVEMENTS.map((stat, i) => (
                <div key={i} className="bg-white p-10 rounded-[48px] border border-steel-100 shadow-sm flex flex-col justify-between min-h-[220px]">
                  <h3 className="text-5xl font-black text-steel-950 mb-2 leading-none">{stat.value}</h3>
                  <p className="text-steel-400 text-[10px] font-bold uppercase tracking-widest leading-tight">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Mission/Vision - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                className="p-12 bg-white border border-steel-100 rounded-[56px] hover:shadow-2xl transition-all h-[400px] flex flex-col group"
              >
                <div className="w-16 h-16 bg-steel-50 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-steel-950 group-hover:text-white transition-colors">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl font-bold text-steel-950 mb-6 tracking-tight">{item.title}</h3>
                <p className="text-steel-500 font-medium leading-relaxed text-sm">{item.desc}</p>
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
      <section className="py-32 px-4 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 md:mb-24">
            <span className="text-steel-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-6 block">Our Facility</span>
            <h2 className="text-4xl md:text-5xl font-bold text-steel-950 mb-8 tracking-tighter">Inside the Chennai Hub</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl">
              <img src={p1} alt="Warehouse Overview" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-square rounded-[48px] overflow-hidden shadow-xl">
              <img src={p2} alt="Steel Sheets" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="aspect-square rounded-[48px] overflow-hidden shadow-xl">
              <img src={p3} alt="Infrastructure" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
            <div className="lg:col-span-2 aspect-[16/9] rounded-[48px] overflow-hidden shadow-2xl">
              <img src={p4} alt="Industrial Facility" className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" />
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us - Horizontal Grid */}
      <section className="py-40 bg-steel-950 rounded-[80px] mx-4 mb-4 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-24">
            <span className="text-steel-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-6 block">Competitive Advantage</span>
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tighter uppercase leading-none">Why Choose Sidharth Steels?</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              "Quality Assurance (304, 316, 400 series)",
              "Vast Ready-Stock Inventory",
              "Precision Cutting & Sizing",
              "On-Time Logistics & Delivery",
              "Competitive Wholesale Pricing",
              "Material Certification Documentation"
            ].map((item, i) => (
              <div key={i} className="flex flex-col gap-6 p-10 bg-white/5 border border-white/10 rounded-[40px] hover:bg-white/10 transition-colors">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-white">
                   <CheckCircle2 size={18} />
                </div>
                <span className="text-lg font-bold text-white tracking-tight">{item}</span>
              </div>
            ))}
          </div>
        </div>
        
        {/* Abstract Background Element */}
        <div className="absolute -bottom-20 -right-20 w-[500px] h-[500px] border border-white/5 rounded-full" />
        <div className="absolute inset-0 opacity-20 z-0">
          <img src={p4} className="w-full h-full object-cover" alt="Steel background" />
        </div>
      </section>
    </div>
  );
}

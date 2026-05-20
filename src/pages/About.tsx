import { motion } from "motion/react";
import { ACHIEVEMENTS } from "../constants";
import { Target, Eye, ShieldCheck, Phone } from "lucide-react";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Content Section & Stats */}
      <section id="about-intro" className="py-10 md:py-16 px-4 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center mb-8 md:mb-12">
            <div className="lg:col-span-12 max-w-5xl">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-steel-950 mb-6 md:mb-8 tracking-tighter leading-[1.1] capitalize">
                The hub of stainless steel <br className="hidden md:block" /> distribution in South India
              </h1>
              <div className="space-y-4 md:space-y-6 text-steel-500 text-base md:text-lg font-medium max-w-4xl">
                <p>
                  Sidharth Steels is a premier trusted stainless steel dealer and stockist based in Chennai, serving as a key distribution hub for South India. We specialize in high-grade stainless steel products that power the region's industrial growth.
                </p>
                
                <div className="pt-6 md:pt-8 flex flex-col xl:flex-row xl:items-center gap-6">
                  {/* Call Our Sales Button */}
                  <div className="shrink-0">
                    <a href="tel:+914422334455" className="inline-flex w-full sm:w-auto px-6 py-3.5 bg-primary text-white font-bold rounded-full items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 uppercase tracking-widest text-xs whitespace-nowrap">
                        Call Our Sales <Phone size={14} className="ml-1 animate-pulse" />
                    </a>
                  </div>

                  {/* Achievements represented in a beautiful, compact circle format matching requested stats */}
                  <div className="flex flex-wrap items-center gap-3">
                    {ACHIEVEMENTS.map((stat, i) => (
                      <motion.div 
                        key={i}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1, duration: 0.5 }}
                        className="flex items-center gap-2.5 bg-white p-1.5 pr-4 rounded-full border border-steel-100 shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="w-9 h-9 rounded-full bg-steel-950 text-white flex items-center justify-center font-black text-[11px] shrink-0 shadow-inner">
                          {stat.value}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="text-[10px] font-black uppercase tracking-wider text-steel-800 leading-none whitespace-nowrap">
                            {stat.label}
                          </span>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Mission/Vision Section */}
      <section className="py-8 md:py-12 px-4 bg-steel-50/50">
        <div className="container-custom">
          {/* Mission/Vision - Bento Style */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
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
                className="p-6 md:p-8 bg-white border border-steel-100 rounded-[24px] md:rounded-[36px] hover:shadow-2xl transition-all h-auto md:h-[300px] flex flex-col group relative overflow-hidden"
              >
                <div className="w-14 h-14 md:w-16 md:h-16 bg-steel-50 rounded-2xl flex items-center justify-center mb-6 md:mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary border border-steel-100">
                  <item.icon size={28} />
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-steel-950 mb-3 md:mb-6 tracking-tight">{item.title}</h3>
                <p className="text-steel-500 font-medium leading-relaxed text-sm md:text-lg mb-6 md:mb-0">{item.desc}</p>
                <div className="mt-auto">
                   <div className="flex items-center gap-6 text-[9px] md:text-[10px] font-black text-steel-200 uppercase tracking-[0.3em]">
                      <span>Principles</span>
                      <div className="h-px flex-grow bg-steel-100" />
                   </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>


      {/* Facility Gallery */}
      <section className="py-8 md:py-12 px-4 bg-white">
        <div className="container-custom">
          <div className="text-left mb-6 md:mb-8">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-[11px] mb-3 md:mb-4 block">Our Facility</span>
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-steel-950 mb-4 md:mb-6 tracking-tighter capitalize leading-tight">Inside the Chennai manufacturing hub</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {[p1, p2, p3].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square md:aspect-[4/3] rounded-[16px] md:rounded-[24px] overflow-hidden shadow-xl relative group"
              >
                <img src={img} alt={`Facility ${i+1}`} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[3000ms]" />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

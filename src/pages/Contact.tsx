import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import p7 from "../assets/p7.jpg";

export default function Contact() {
  return (
    <div className="pt-24 min-h-screen bg-[#F8F9FA]">
      {/* Premium Header */}
      <section className="py-24 px-4 overflow-hidden relative bg-white">
        <div className="container-custom relative z-10">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-12 border-b border-steel-100 pb-20">
            <div className="max-w-2xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-steel-400 font-bold tracking-[0.2em] uppercase text-[10px] mb-8 block"
              >
                Inquiry & Support Center
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-8xl font-extrabold text-steel-950 mb-0 leading-[1.1] md:leading-[0.95] tracking-tighter"
              >
                Connect <span className="text-steel-300 font-light italic">With</span> <br />
                Our Experts.
              </motion.h1>
              <div className="mt-12 rounded-[32px] overflow-hidden aspect-[21/9] shadow-xl">
                 <img src={p7} alt="Facility" className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" />
              </div>
            </div>
            <div className="bg-steel-950 text-white px-10 py-8 rounded-[40px] shadow-2xl max-w-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-steel-400 mb-4">Response Time</p>
              <p className="text-lg font-bold">Guaranteed technical response within <span className="text-steel-300">4 Hours</span> for industrial accounts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-32 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-24">
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-16">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-steel-950 tracking-tight uppercase leading-none">Contact Information</h2>
                <p className="text-steel-500 font-medium leading-relaxed max-w-md">
                   Visit our regional distribution hub or reach out via phone or email for immediate assistance with your orders.
                </p>
              </div>

              <div className="grid gap-8">
                {[
                  { icon: Phone, label: "Fast Assistance", info: "+91 44 2233 4455", sub: "Priority Industrial Line" },
                  { icon: Mail, label: "Technical Support", info: "info@sidharthsteel.com", sub: "Material Analysis Support" },
                  { icon: MapPin, label: "Global Distribution", info: "Chennai, South India", sub: "Main Operations Center" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-8 p-10 bg-white border border-steel-100 rounded-[48px] shadow-sm hover:shadow-xl transition-all"
                  >
                    <div className="w-16 h-16 bg-steel-950 text-white rounded-[24px] flex items-center justify-center shadow-lg">
                      <item.icon size={28} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-steel-300 mb-2">{item.label}</p>
                      <h4 className="text-xl font-bold text-steel-950 mb-1">{item.info}</h4>
                      <p className="text-xs text-steel-400 font-bold uppercase tracking-widest">{item.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Form Section */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-7"
            >
              <div className="bg-white border border-steel-100 shadow-2xl rounded-[64px] p-12 md:p-20">
                 <h3 className="text-2xl font-bold text-steel-950 mb-12 tracking-tight">Request Specification Support</h3>
                 <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-steel-400">Full Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. Johnathan Smith" 
                         className="w-full px-0 py-4 bg-transparent border-b-2 border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 placeholder:text-steel-200"
                       />
                     </div>
                     <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-steel-400">Professional Email</label>
                       <input 
                         type="email" 
                         placeholder="e.g. smith@enterprise.com" 
                         className="w-full px-0 py-4 bg-transparent border-b-2 border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 placeholder:text-steel-200"
                       />
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                     <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-steel-400">Inquiry Target</label>
                       <select className="w-full px-0 py-4 bg-transparent border-b-2 border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 appearance-none">
                         <option>Material Specification</option>
                         <option>Inventory Availability</option>
                         <option>Technical Consultation</option>
                         <option>General Quotation</option>
                       </select>
                     </div>
                     <div className="space-y-4">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-steel-400">Urgency Level</label>
                       <select className="w-full px-0 py-4 bg-transparent border-b-2 border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 appearance-none">
                         <option>Normal (Routine)</option>
                         <option>High (Next 48H)</option>
                         <option>Critical (Operational Stop)</option>
                       </select>
                     </div>
                   </div>

                   <div className="space-y-4">
                     <label className="text-[10px] font-bold uppercase tracking-widest text-steel-400">Detailed Message</label>
                     <textarea 
                       rows={5}
                       placeholder="Provide technical details about your project or material requirement..." 
                       className="w-full px-0 py-4 bg-transparent border-b-2 border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 placeholder:text-steel-200 resize-none"
                     ></textarea>
                   </div>

                   <button className="w-full py-6 bg-steel-950 text-white font-bold rounded-2xl hover:scale-[1.02] transition-all flex items-center justify-center gap-4 shadow-2xl">
                     Transmit Request <Send size={20} />
                   </button>
                 </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

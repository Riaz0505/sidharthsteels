import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Main Content */}
      <section className="py-8 md:py-14 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-10">
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-6">
              <div className="space-y-3">
                <h2 className="text-xl font-bold text-steel-950 tracking-tight uppercase leading-none">Contact Information</h2>
                <p className="text-steel-500 font-medium leading-relaxed max-w-md text-xs md:text-sm">
                   Visit our regional distribution hub or reach out via phone or email for immediate assistance with your orders.
                </p>
              </div>

              <div className="grid gap-4">
                {[
                  { icon: Phone, label: "Fast Assistance", info: "+91 44 2233 4455", sub: "Priority Line" },
                  { icon: Mail, label: "Technical Support", info: "info@sidharthsteel.com", sub: "Material Analysis" },
                  { icon: MapPin, label: "Distribution Hub", info: "Chennai, South India", sub: "Operations Center" }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center gap-4 md:gap-6 p-4 md:p-6 bg-white border border-steel-100 rounded-[20px] md:rounded-[32px] shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-steel-950 text-white rounded-[12px] md:rounded-[16px] flex items-center justify-center shadow-lg shrink-0">
                      <item.icon size={18} />
                    </div>
                    <div>
                      <p className="text-[8px] font-bold uppercase tracking-widest text-steel-300 mb-1">{item.label}</p>
                      <h4 className="text-sm md:text-base font-bold text-steel-950">
                        {item.icon === Phone ? (
                          <a href={`tel:${item.info.replace(/\s+/g, '')}`} className="hover:text-primary transition-colors">{item.info}</a>
                        ) : item.icon === Mail ? (
                          <a href={`mailto:${item.info}`} className="hover:text-primary transition-colors">{item.info}</a>
                        ) : item.info}
                      </h4>
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
              <div className="bg-white border border-steel-100 shadow-xl rounded-[24px] md:rounded-[32px] p-6 md:p-8">
                 <h3 className="text-xl font-bold text-steel-950 mb-4 md:mb-6 tracking-tight">Request Specification Support</h3>
                 <form className="space-y-4 md:space-y-6" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-steel-400">Full Name</label>
                       <input 
                         type="text" 
                         placeholder="e.g. John Smith" 
                         className="w-full px-0 py-2 bg-transparent border-b border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 placeholder:text-steel-200"
                       />
                     </div>
                     <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-steel-400">Professional Email</label>
                       <input 
                         type="email" 
                         placeholder="e.g. smith@corp.com" 
                         className="w-full px-0 py-2 bg-transparent border-b border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-sm font-bold text-steel-950 placeholder:text-steel-200"
                       />
                     </div>
                   </div>
                   
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                     <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-steel-400">Inquiry Target</label>
                       <select className="w-full px-0 py-2 bg-transparent border-b border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-xs font-bold text-steel-950 appearance-none">
                         <option>Material Specification</option>
                         <option>Inventory Availability</option>
                         <option>Technical Consultation</option>
                         <option>General Quotation</option>
                       </select>
                     </div>
                     <div className="space-y-2">
                       <label className="text-[9px] font-bold uppercase tracking-widest text-steel-400">Urgency Level</label>
                       <select className="w-full px-0 py-2 bg-transparent border-b border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-xs font-bold text-steel-950 appearance-none">
                         <option>Normal (Routine)</option>
                         <option>High (Next 48H)</option>
                         <option>Critical (Op-Stop)</option>
                       </select>
                     </div>
                   </div>

                   <div className="space-y-2">
                     <label className="text-[9px] font-bold uppercase tracking-widest text-steel-400">Detailed Message</label>
                     <textarea 
                       rows={4}
                       placeholder="Provide technical details about your project..." 
                       className="w-full px-0 py-2 bg-transparent border-b border-steel-100 focus:outline-none focus:border-steel-950 transition-all text-xs font-bold text-steel-950 placeholder:text-steel-200 resize-none"
                     ></textarea>
                   </div>

                   <button className="w-full py-2.5 bg-steel-950 text-white font-bold rounded-lg hover:scale-[1.02] transition-all flex items-center justify-center gap-2 shadow-md text-xs md:text-[13px] uppercase tracking-wider">
                     Transmit Request <Send size={14} />
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

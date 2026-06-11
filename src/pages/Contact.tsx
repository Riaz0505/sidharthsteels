import { useEffect } from "react";
import { motion } from "motion/react";
import { Mail, Phone, MapPin, Send, Clock, Globe, Instagram, Linkedin, MessageSquare } from "lucide-react";

export default function Contact() {
  // Set SEO tags as audited in PDF Page 7
  useEffect(() => {
    document.title = "Contact Sidharth Steels | Stainless Steel Supplier Chennai";
    const metaDesc = document.querySelector('meta[name="description"]');
    const contentText = "Get in touch with Sidharth Steels for stainless steel pricing, stock availability, and technical advice. Visit us in Kondithope, Chennai or request a quote online.";
    if (metaDesc) {
      metaDesc.setAttribute("content", contentText);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = contentText;
      document.head.appendChild(meta);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Intro section with exact H1 from PDF Page 7 */}
      <section className="bg-white border-b border-steel-100 py-6 md:py-8 px-4">
        <div className="container-custom">
          <div className="max-w-4xl space-y-4">
            <span className="text-[10px] font-black uppercase tracking-[0.25em] text-primary block">
              Global Procurement Partner
            </span>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-steel-950 tracking-tight leading-tight uppercase">
              Contact Sidharth Steels
            </h1>
            <div className="pt-2">
              <h2 className="text-sm font-extrabold uppercase tracking-wide text-steel-900 mb-1">We Are Here to Help</h2>
              <p className="text-steel-600 font-semibold leading-relaxed text-sm md:text-base max-w-3xl">
                Whether you need pricing on a specific grade, help choosing between 304L and 316L, or a bulk supply quotation, our team at Sidharth Steels is ready to assist. We respond promptly and speak the language of steel, with no jargon and no runaround.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-6 md:py-10 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
            {/* Info Section */}
            <div className="lg:col-span-5 space-y-5">
              <div className="bg-white border border-steel-100 rounded-3xl p-6 shadow-sm space-y-6">
                <h3 className="text-base font-extrabold text-steel-950 uppercase tracking-wider border-b border-steel-50 pb-3">Our Details</h3>
                
                <div className="space-y-4 text-xs font-semibold">
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Globe size={16} />
                    </div>
                    <div>
                      <span className="text-steel-400 text-[10px] uppercase font-black tracking-wider block mb-0.5">Company</span>
                      <p className="text-steel-950 font-bold text-sm">Sidharth Steels</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <MapPin size={16} />
                    </div>
                    <div>
                      <span className="text-steel-400 text-[10px] uppercase font-black tracking-wider block mb-0.5">Address</span>
                      <p className="text-steel-950 font-bold text-[13px] leading-relaxed">
                        12, Kanjeevaram Sabapathy Street, Kondithope, Chennai, Pin 600079, Tamil Nadu, India
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Globe size={16} />
                    </div>
                    <div>
                      <span className="text-steel-400 text-[10px] uppercase font-black tracking-wider block mb-0.5">Website</span>
                      <a href="https://sidharthsteel.com" className="text-primary hover:underline font-bold text-[13px]">
                        sidharthsteel.com
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Clock size={16} />
                    </div>
                    <div>
                      <span className="text-steel-400 text-[10px] uppercase font-black tracking-wider block mb-0.5">Business Hours</span>
                      <p className="text-steel-950 font-bold text-[13px]">
                        Monday to Saturday, 9:00 AM to 6:00 PM IST
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-primary/15 text-primary rounded-xl flex items-center justify-center shrink-0 border border-primary/10">
                      <Phone size={16} />
                    </div>
                    <div>
                      <span className="text-steel-400 text-[10px] uppercase font-black tracking-wider block mb-0.5">Landlines (Indian format)</span>
                      <a href="tel:+914422334455" className="text-steel-950 hover:text-primary transition-colors font-mono font-bold text-[13px]">
                        +91 44 2233 4455
                      </a>
                    </div>
                  </div>
                </div>
              </div>


            </div>

            {/* Request a Quote Form Section (PDF Page 7) */}
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="lg:col-span-7"
            >
              <div className="bg-white border border-steel-100 shadow-xl rounded-3xl p-5 md:p-6 space-y-5">
                 <div>
                   <h3 className="text-lg font-black text-steel-950 uppercase tracking-wide">Request a Quote</h3>
                   <p className="text-steel-600 text-xs font-semibold mt-1">
                     To get a accurate quote, please share the following specifications with us:
                   </p>
                 </div>

                 <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">FullName / Co. Name *</label>
                       <input 
                         type="text" 
                         required
                         placeholder="e.g. John Larson / Larson Fab" 
                         className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Professional Email *</label>
                       <input 
                         type="email" 
                         required
                         placeholder="e.g. john@larsonfab.com" 
                         className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300"
                       />
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Product Required *</label>
                       <select className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 appearance-none">
                         <option>Sheets or Coils</option>
                         <option>Heavy-Gauge Plates</option>
                         <option>Pipes & Tubes (Seamless/Welded)</option>
                         <option>Bars & Rods (Rounds/Flats/Hex)</option>
                         <option>Fittings & Flanges</option>
                         <option>Other / Custom Specification</option>
                       </select>
                     </div>
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Stainless Steel Grade *</label>
                       <select className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 appearance-none">
                         <option>Grade 304L (General, Cost-Effective)</option>
                         <option>Grade 316L (Acid & Coastal Corrosion Resistant)</option>
                         <option>Grade 201 (Economical Indoor)</option>
                         <option>Grade 430 (Specialty finish)</option>
                         <option>Unsure (I need advice from Sidharth technical team)</option>
                       </select>
                     </div>
                   </div>

                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Size & Thickness *</label>
                       <input 
                         type="text" 
                         required
                         placeholder="e.g. 5mm thickness / width 1250mm, or unsure" 
                         className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300"
                       />
                     </div>
                     <div className="space-y-1">
                       <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Quantity Required (kg or tons) *</label>
                       <input 
                         type="text" 
                         required
                         placeholder="e.g. 500 Kilograms / 2.5 Tons" 
                         className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300"
                       />
                     </div>
                   </div>

                   <div className="space-y-1">
                     <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Delivery Location *</label>
                     <input 
                       type="text" 
                       required
                       placeholder="e.g. Chennai Port Area, Ambattur, or Bangalore" 
                       className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300"
                     />
                   </div>

                   <div className="space-y-1">
                     <label className="text-[9px] font-black uppercase tracking-widest text-steel-400">Specific Project Application / Notes</label>
                     <textarea 
                       rows={3}
                       placeholder="Detail your operational or structural requirements..." 
                       className="w-full px-0 py-1.5 bg-transparent border-b border-steel-200 focus:outline-none focus:border-primary transition-all text-xs font-bold text-steel-950 placeholder:text-steel-300 resize-none font-sans"
                     ></textarea>
                   </div>

                   <button className="w-full py-3 bg-primary text-white font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 text-xs uppercase tracking-widest">
                     Transmit Quote Request <Send size={13} />
                   </button>
                   <p className="text-[10px] text-steel-400 text-center font-bold">
                     We will respond with exact pricing, availability, and lead time as quickly as possible.
                   </p>
                 </form>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Embedded Google Map Section for UX and Local SEO (PDF Page 7) */}
      <section className="py-6 bg-white border-t border-steel-100">
        <div className="container-custom space-y-6">
          <div className="max-w-3xl space-y-2">
            <span className="text-primary font-bold tracking-[0.25em] underscore uppercase text-[9px] block">Local Presence</span>
            <h2 className="text-xl md:text-3xl font-black text-steel-950 tracking-tight">Find Us in Chennai</h2>
            <p className="text-steel-600 font-semibold text-xs md:text-sm">
              Sidharth Steels is located in Kondithope, Chennai, one of the city's key commercial and industrial supply areas, easily accessible from the city centre, Chennai Port, and surrounding industrial zones.
            </p>
          </div>
          
          {/* Real Embedded Google Map */}
          <div className="w-full h-[320px] md:h-[420px] rounded-[24px] overflow-hidden border border-steel-200 shadow-md relative group">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1943.00122335704!2d80.27042571477123!3d13.100913990771146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a5265f7c32bf259%3A0xbcbc2be83610998!2sKanjeevaram%20Sabapathy%20St%2C%20Kondithope%2C%20George%20Town%2C%20Chennai%2C%20Tamil%20Nadu%20600079!5e0!3m2!1sen!2sin!4v1655123456789!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Sidharth Steels Google Map Location"
              id="google-maps-embed-iframe"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}

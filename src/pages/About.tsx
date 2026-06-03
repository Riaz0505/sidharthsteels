import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Target, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

export default function About() {
  // Set SEO tags as audited in PDF Page 4
  useEffect(() => {
    document.title = "About Sidharth Steels | Stainless Steel Supplier Chennai Since 1984";
    const metaDesc = document.querySelector('meta[name="description"]');
    const contentText = "Learn about Sidharth Steels — Chennai's trusted stainless steel supplier and stockist since 1984. We supply sheets, plates, pipes, bars & fittings to industries across India.";
    if (metaDesc) {
      metaDesc.setAttribute("content", contentText);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = contentText;
      document.head.appendChild(meta);
    }
  }, []);  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Title Header Section */}
      <section className="pt-10 md:pt-16 pb-6 px-4 bg-white">
        <div className="container-custom">
          {/* Exactly one H1 Heading as verified in Page 4 of the PDF */}
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-steel-950 tracking-tighter leading-[1.1] uppercase max-w-5xl">
            About Sidharth Steels <span className="text-primary italic block md:inline font-black">&mdash; Four Decades of Quality & Trust</span>
          </h1>
          <p className="text-steel-400 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mt-3">
            Since 1984 &middot; Chennai &amp; Pan-India Supply
          </p>
        </div>
      </section>

      {/* Row 1: Who We Are (Text Left, Image Right) */}
      <section className="py-10 md:py-16 px-4 bg-white border-t border-steel-105">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Company Overview</span>
              <h2 className="text-xl md:text-3xl font-black text-steel-950 uppercase tracking-wide">Who We Are</h2>
              <div className="space-y-4 text-steel-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  Sidharth Steels is a Chennai-based stainless steel supplier and stockist with a legacy spanning over four decades. Established in 1984, we have built our reputation on one simple principle: supplying quality stainless steel products backed by honest advice and reliable service.
                </p>
                <p>
                  Located at Kondithope in the heart of Chennai's industrial supply district, we serve a diverse base of customers &mdash; from small fabrication workshops to large-scale industrial contractors and OEM manufacturers &mdash; across Tamil Nadu and throughout India.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-steel-50 to-steel-100/30 rounded-[24px] border border-steel-100 -z-10" />
              <div className="p-2">
                <img 
                  src={p3} 
                  alt="Sidharth Steels Warehouse Footage" 
                  className="w-full h-[280px] md:h-[350px] object-cover rounded-[20px] shadow-lg border border-steel-100" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: What We Do (Image Left, Text Right) */}
      <section className="py-10 md:py-16 px-4 bg-steel-50 border-y border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Image on Left (Top on Mobile) */}
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-white to-steel-100/30 rounded-[24px] border border-steel-150 -z-10" />
              <div className="p-2">
                <img 
                  src={p1} 
                  alt="Sidharth Steels Certified Stock" 
                  className="w-full h-[280px] md:h-[350px] object-cover rounded-[20px] shadow-lg border border-steel-100" 
                />
              </div>
            </div>
            
            {/* Text on Right (Bottom on Mobile) */}
            <div className="space-y-4 order-1 md:order-2">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Material Solutions</span>
              <h2 className="text-xl md:text-3xl font-black text-steel-950 uppercase tracking-wide">What We Do</h2>
              <div className="space-y-4 text-steel-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  We specialise in the import, stocking, and supply of stainless steel in all major product forms:
                </p>
                <ul className="grid grid-cols-2 gap-2.5 my-3 text-steel-800 text-[13px] font-bold">
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Sheets and Coils</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Plates</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Pipes and Tubes</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Bars and Rods</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary shrink-0" /> Fittings & Flanges</li>
                </ul>
                <p>
                  Our inventory covers the most widely used stainless steel grades &mdash; 304L, 316L, 201, and 430 &mdash; across a comprehensive range of sizes, thicknesses, and finishes. All material is sourced from reputable mills and supplied with full Mill Test Certificates (MTCs).
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 3: Our Experience (Text Left, Quality Panel Right) */}
      <section className="py-10 md:py-16 px-4 bg-white border-b border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-5">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Since 1984</span>
              <h2 className="text-xl md:text-3xl font-black text-steel-950 uppercase tracking-wide">Our Experience</h2>
              <div className="space-y-4 text-steel-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  Since 1984, Sidharth Steels has been synonymous with quality stainless steel in Chennai. Over the years, we have grown from a local stockist into a trusted supply partner for industries including food processing, pharmaceuticals, railways, oil & gas, construction, textile machinery, and more.
                </p>
                <p>
                  Our team brings deep technical knowledge of stainless steel grades, specifications, and applications. We don't just sell steel &mdash; we help our customers choose the right material for the right job, saving them time, money, and costly mistakes.
                </p>
              </div>
              
              <div className="pt-2">
                <Link to="/contact" className="inline-flex px-5 py-3 bg-primary text-white font-bold rounded-lg items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 uppercase tracking-widest text-xs whitespace-nowrap">
                  Enquire Now <span className="ml-1 font-bold">&rarr;</span>
                </Link>
              </div>
            </div>
            
            {/* Elegant Right-Hand Quality standards panel (Perfect space filler and symmetrical balanced block) */}
            <div className="bg-steel-50 border border-steel-100 rounded-[24px] p-6 space-y-4 w-full">
              <span className="text-primary font-black uppercase tracking-[0.15em] text-[9.5px] block">
                Quality & Standards Assurance
              </span>
              <h3 className="text-xs font-black text-steel-950 uppercase tracking-tight">
                Guaranteed Material Integrity
              </h3>
              <div className="space-y-3 pt-1">
                {[
                  { label: "Traceable MTCs", desc: "Every consignment is accompanied by verified Mill Test Certificates." },
                  { label: "Premium Sourcing", desc: "Materials procured exclusively from ISO accredited, reputable mills." },
                  { label: "Accurate Specifications", desc: "Strict conformance to ASTM, ASME, EN, and IS standards." },
                  { label: "Physical Verification", desc: "Rigorous gauge and chemical composition checks prior to delivery." }
                ].map((std, idx) => (
                  <div key={idx} className="flex gap-3 items-start text-xs">
                    <span className="text-primary font-black mt-0.5">•</span>
                    <div>
                      <h4 className="font-extrabold text-steel-950 uppercase text-[11px] tracking-tight">{std.label}</h4>
                      <p className="text-steel-500 font-semibold leading-relaxed mt-0.5">{std.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Customers Trust Us (PDF Page 4 & 5 Content) */}
      <section className="py-10 md:py-16 px-4 bg-steel-50 border-y border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-steel-950 uppercase tracking-wide">Why Our Customers Trust Us</h3>
              <ul className="space-y-3">
                {[
                  { title: "Established in 1984", desc: "Over 40 years of trusted industry experience supplying South India." },
                  { title: "Consistent Quality", desc: "Genuine materials strictly sourced from premium, certified mills." },
                  { title: "Technical Expertise", desc: "Our experienced team understands grades, technical standards, and diverse applications." },
                  { title: "Ready Stock", desc: "Fast order fulfilment without severe lead times from our extensive inventory." },
                  { title: "Flexible Supply Options", desc: "Precision cut-to-size, custom lengths, small quantities, and bulk orders all welcome." },
                  { title: "Pan-India Reach", desc: "Supplying bulk or retail customers across South India and beyond." },
                  { title: "Mill Test Certificates (MTCs)", desc: "MTCs provided with every order ensuring complete metallurgical compliance." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2.5 group">
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <span className="text-steel-950 font-bold text-[13px] block">{item.title}</span>
                      <span className="text-steel-500 text-[12px] font-semibold leading-relaxed block">{item.desc}</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products at a Glance Box */}
            <div className="bg-steel-950 rounded-[24px] p-6 lg:p-8 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative z-10 space-y-6">
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] block mb-1">Catalog at a Glance</span>
                  <h4 className="text-xl md:text-2xl font-black tracking-tight mb-2 uppercase">Our Materials Portfolio</h4>
                  <p className="text-steel-300 text-xs font-semibold leading-relaxed">
                    Sidharth Steels stands ready to supply certified materials conforming to highest global guidelines.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-4 text-xs font-mono">
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-1">Product Forms</span>
                    <p className="text-white/90 font-bold font-sans">
                      Stainless Steel Sheets & Coils | Plates | Pipes & Tubes | Bars & Rods | Fittings
                    </p>
                  </div>
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-1">Available Grades</span>
                    <p className="text-white/90 font-bold font-sans">
                      304L | 316L | 201 | 430
                    </p>
                  </div>
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-1">Testing Standards</span>
                    <p className="text-white/90 font-bold font-sans">
                      ASTM | ASME | EN | IS
                    </p>
                  </div>
                </div>
              </div>
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl opacity-50" />
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision Section - Completely unboxed and editorial typographic presentation */}
      <section className="py-12 md:py-20 px-4 bg-white">
        <div className="container-custom space-y-12">
          {/* Mission/Vision - Elegant Editorial Style, avoiding rigid boxes */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-primary font-mono text-5xl font-black select-none tracking-tighter opacity-15 leading-none">
                01
              </div>
              <h3 className="text-xl md:text-2xl font-black text-steel-950 tracking-tight uppercase">Our Vision</h3>
              <p className="text-steel-600 font-medium leading-relaxed text-sm">
                To be India's most trusted stainless steel supplier &mdash; known for the quality of our products, the depth of our technical knowledge, and the reliability of our service.
              </p>
              <p className="text-steel-600 font-medium leading-relaxed text-sm pt-2">
                We believe that every customer &mdash; regardless of order size &mdash; deserves access to premium-grade stainless steel, honest advice, and a supplier who stands behind what they supply.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="text-primary font-mono text-5xl font-black select-none tracking-tighter opacity-15 leading-none">
                02
              </div>
              <h3 className="text-xl md:text-2xl font-black text-steel-950 tracking-tight uppercase">Our Mission</h3>
              <p className="text-steel-600 font-medium leading-relaxed text-sm">
                Our mission is to make quality stainless steel accessible, understandable, and easy to procure for every industry we serve.
              </p>
              <p className="text-steel-600 font-medium leading-relaxed text-sm pt-2">
                We achieve this by:
              </p>
              <ul className="space-y-3.5 text-xs font-bold text-steel-800 font-sans mt-2">
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-black mt-0.5">•</span>
                  <span>Maintaining a comprehensive, ready stock of the most in-demand grades and product forms</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-black mt-0.5">•</span>
                  <span>Building long-term relationships with trusted mills and manufacturers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-black mt-0.5">•</span>
                  <span>Employing technically knowledgeable staff who can advise, not just sell</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-black mt-0.5">•</span>
                  <span>Offering flexible supply &mdash; from single cut lengths to full industrial contracts</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-primary font-black mt-0.5">•</span>
                  <span>Delivering on time, every time, with full material traceability</span>
                </li>
              </ul>
            </motion.div>
          </div>

          {/* Our Values & Commitment - Elegant borderless integration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pt-12 border-t border-steel-100">
            <div className="lg:col-span-6 space-y-5">
              <h3 className="text-xl font-bold text-steel-950 uppercase tracking-wide">Our Values</h3>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { name: "Quality", desc: "We never compromise on the grade or specification of the material we supply." },
                  { name: "Integrity", desc: "Honest pricing, honest advice, and no shortcuts." },
                  { name: "Expertise", desc: "Forty years of stainless steel knowledge at your service." },
                  { name: "Service", desc: "Responsive, knowledgeable, and genuinely helpful." },
                  { name: "Reliability", desc: "Consistent stock, consistent quality, consistent delivery." }
                ].map((val, i) => (
                  <div key={i} className="flex gap-4 group">
                    <span className="font-mono text-xs font-black text-primary bg-primary/5 border border-primary/10 rounded w-8 h-8 flex items-center justify-center shrink-0">
                      0{i + 1}
                    </span>
                    <div>
                      <h4 className="text-sm font-extrabold text-steel-950 mb-1 leading-none uppercase">{val.name}</h4>
                      <p className="text-steel-500 text-xs font-medium leading-relaxed mt-1">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-4 pl-0 lg:pl-12">
              <div className="w-10 h-10 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h4 className="text-lg font-extrabold text-steel-950 tracking-tight uppercase">Our Commitment to Industry</h4>
              <p className="text-steel-600 font-medium text-xs md:text-sm leading-relaxed">
                The industries we serve &mdash; mining, oil & gas, food processing, pharmaceuticals, construction, and more &mdash; demand materials that perform without failure. A pipeline that corrodes, a fitting that fails, a food-contact surface that contaminates: these are not just commercial problems, they are safety problems.
              </p>
              <p className="text-steel-600 font-medium text-xs md:text-sm leading-relaxed pt-1">
                That is why at Sidharth Steels, we take material quality seriously. Every product we supply meets the grade and standard it is sold as &mdash; certified, traceable, and backed by our four decades of reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Facility Gallery */}
      <section className="py-12 bg-steel-50 border-t border-steel-100">
        <div className="container-custom">
          <div className="text-left mb-8">
            <span className="text-primary font-bold tracking-[0.3em] uppercase text-[9px] md:text-[10px] mb-2 block">Our Facility</span>
            <h2 className="text-xl md:text-3xl font-black text-steel-950 tracking-tighter uppercase leading-tight">Inside the Chennai distribution hub</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {[p1, p2, p3].map((img, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="aspect-square md:aspect-[4/3] rounded-[16px] overflow-hidden shadow-md relative group border border-steel-100"
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

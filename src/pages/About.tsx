import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { Target, Eye, ShieldCheck, CheckCircle2 } from "lucide-react";
import SEO from "../components/SEO";
import p1 from "../assets/p1.jpg";
import p2 from "../assets/p2.jpg";
import p3 from "../assets/p3.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      <SEO 
        title="About Sidharth Steels"
        description="Learn about Sidharth Steels — Chennai's trusted stainless steel supplier and stockist since 1984. We supply sheets, plates, pipes, bars & fittings to industries across India."
      />
      {/* Title Header Section */}
      <section className="pt-6 pb-3 px-4 bg-white">
        <div className="container-custom">
          {/* Exactly one H1 Heading as verified in Page 4 of the PDF */}
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-[40px] font-extrabold text-steel-950 tracking-tight leading-tight uppercase max-w-5xl">
            About Sidharth Steels
          </h1>
          <p className="text-steel-400 font-bold text-xs md:text-sm tracking-[0.2em] uppercase mt-2">
            Since 1984 &middot; Chennai &amp; Pan-India Supply
          </p>
        </div>
      </section>

      {/* Row 1: Who We Are (Text Left, Image Right) */}
      <section className="py-6 md:py-8 px-4 bg-white border-t border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div className="space-y-3">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Company Overview</span>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-steel-950 uppercase tracking-tight">Who We Are</h2>
              <div className="space-y-4 text-steel-600 font-semibold text-sm md:text-base leading-relaxed">
                <p>
                  Sidharth Steels is a Chennai-based stainless steel supplier and stockist with a legacy spanning over four decades. Established in 1984, we have built our reputation on one simple principle: supplying quality stainless steel products backed by honest advice and reliable service.
                </p>
                <p>
                  Located at Kondithope in the heart of Chennai's industrial supply district, we serve a diverse base of customers &mdash; from small fabrication workshops to large-scale industrial contractors and OEM manufacturers &mdash; across Tamil Nadu and throughout India.
                </p>
              </div>
            </div>
            
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-steel-50 to-steel-100/30 rounded-[20px] border border-steel-100 -z-10" />
              <div className="p-1">
                <img 
                  src={p3} 
                  alt="Sidharth Steels Warehouse Footage" 
                  className="w-full h-[260px] md:h-[320px] object-cover rounded-[16px] shadow-lg border border-steel-100" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Row 2: What We Do (Image Left, Text Right) */}
      <section className="py-6 md:py-8 px-4 bg-steel-50 border-y border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
            {/* Image on Left (Top on Mobile) */}
            <div className="relative order-2 md:order-1">
              <div className="absolute inset-0 bg-gradient-to-tr from-white to-steel-100/30 rounded-[20px] border border-steel-150 -z-10" />
              <div className="p-1">
                <img 
                  src={p1} 
                  alt="Sidharth Steels Certified Stock" 
                  className="w-full h-[260px] md:h-[320px] object-cover rounded-[16px] shadow-lg border border-steel-100" 
                />
              </div>
            </div>
            
            {/* Text on Right (Bottom on Mobile) */}
            <div className="space-y-3 order-1 md:order-2">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Material Solutions</span>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-steel-950 uppercase tracking-tight">What We Do</h2>
              <div className="space-y-3 text-steel-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  We specialise in the import, stocking, and supply of stainless steel in all major product forms:
                </p>
                <ul className="grid grid-cols-2 gap-3 my-4 text-steel-950 text-xs md:text-sm font-black uppercase tracking-wider">
                  <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-primary shrink-0" /> Sheets and Coils</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-primary shrink-0" /> Plates</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-primary shrink-0" /> Pipes and Tubes</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-primary shrink-0" /> Bars and Rods</li>
                  <li className="flex items-center gap-2.5"><CheckCircle2 size={16} className="text-primary shrink-0" /> Fittings & Flanges</li>
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
      <section className="py-6 md:py-8 px-4 bg-white border-b border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-center">
            <div className="space-y-4">
              <span className="text-primary font-black uppercase tracking-[0.2em] text-[10px] block">Since 1984</span>
              <h2 className="text-lg md:text-2xl lg:text-3xl font-extrabold text-steel-950 uppercase tracking-tight">Our Experience</h2>
              <div className="space-y-3 text-steel-600 font-medium text-sm md:text-base leading-relaxed">
                <p>
                  Since 1984, Sidharth Steels has been synonymous with quality stainless steel in Chennai. Over the years, we have grown from a local stockist into a trusted supply partner for industries including food processing, pharmaceuticals, railways, oil & gas, construction, textile machinery, and more.
                </p>
                <p>
                  Our team brings deep technical knowledge of stainless steel grades, specifications, and applications. We don't just sell steel &mdash; we help our customers choose the right material for the right job, saving them time, money, and costly mistakes.
                </p>
              </div>
              
              <div className="pt-1">
                <Link to="/contact" className="inline-flex px-4 py-2.5 bg-primary text-white font-bold rounded-lg items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/30 uppercase tracking-widest text-[11px] whitespace-nowrap">
                  Enquire Now <span className="ml-1 font-bold">&rarr;</span>
                </Link>
              </div>
            </div>
            
            {/* Elegant Right-Hand Quality standards panel (Perfect space filler and symmetrical balanced block) */}
            <div className="bg-white border border-steel-200/85 rounded-[24px] p-6 space-y-4 w-full shadow-sm">
              <span className="text-primary font-black uppercase tracking-[0.15em] text-[10px] md:text-xs block">
                Quality & Standards Assurance
              </span>
              <h3 className="text-sm md:text-base font-black text-steel-950 uppercase tracking-tight">
                Guaranteed Material Integrity
              </h3>
              <div className="space-y-4 pt-2">
                {[
                  { label: "Traceable MTCs", desc: "Every consignment is accompanied by verified Mill Test Certificates." },
                  { label: "Premium Sourcing", desc: "Materials procured exclusively from ISO accredited, reputable mills." },
                  { label: "Accurate Specifications", desc: "Strict conformance to ASTM, ASME, EN, and IS standards." },
                  { label: "Physical Verification", desc: "Rigorous gauge and chemical composition checks prior to delivery." }
                ].map((std, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-primary font-bold text-sm mt-0.5">•</span>
                    <div>
                      <h4 className="font-bold text-xs md:text-sm text-steel-950 tracking-wide">{std.label}</h4>
                      <p className="text-steel-500 font-medium text-xs md:text-[12.5px] leading-relaxed mt-0.5">{std.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Our Customers Trust Us (PDF Page 4 & 5 Content) */}
      <section className="py-8 md:py-10 px-4 bg-steel-50 border-y border-steel-100">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            <div className="space-y-4">
              <h3 className="text-xl md:text-2xl lg:text-3.5xl font-black text-steel-950 uppercase tracking-tight mb-6">Why Our Customers Trust Us</h3>
              <ul className="space-y-5">
                {[
                  { title: "Established in 1984", desc: "Over 40 years of trusted industry experience supplying South India." },
                  { title: "Consistent Quality", desc: "Genuine materials strictly sourced from premium, certified mills." },
                  { title: "Technical Expertise", desc: "Our experienced team understands grades, technical standards, and diverse applications." },
                  { title: "Ready Stock", desc: "Fast order fulfilment without severe lead times from our extensive inventory." },
                  { title: "Flexible Supply Options", desc: "Precision cut-to-size, custom lengths, small quantities, and bulk orders all welcome." },
                  { title: "Pan-India Reach", desc: "Supplying bulk or retail customers across South India and beyond." },
                  { title: "Mill Test Certificates (MTCs)", desc: "MTCs provided with every order ensuring complete metallurgical compliance." }
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 group">
                    <CheckCircle2 size={18} className="text-primary mt-0.5 shrink-0" />
                    <div>
                      <h4 className="text-steel-950 font-bold text-xs md:text-sm tracking-tight block leading-tight">{item.title}</h4>
                      <p className="text-steel-500 font-medium text-[11px] md:text-xs leading-relaxed block mt-1">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Products at a Glance Box */}
            <div className="bg-steel-950 rounded-[20px] p-5 lg:p-6 text-white relative overflow-hidden flex flex-col justify-between shadow-xl">
              <div className="relative z-10 space-y-4">
                <div>
                  <span className="text-[9px] font-bold text-primary uppercase tracking-[0.2em] block mb-1">Catalog at a Glance</span>
                  <h4 className="text-xl md:text-2xl font-black tracking-tight mb-1 uppercase">Our Materials Portfolio</h4>
                  <p className="text-steel-300 text-xs font-semibold leading-relaxed">
                    Sidharth Steels stands ready to supply certified materials conforming to highest global guidelines.
                  </p>
                </div>

                <div className="border-t border-white/10 pt-3 space-y-3 text-xs font-mono">
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-0.5">Product Forms</span>
                    <p className="text-white/90 font-bold font-sans text-xs">
                      Stainless Steel Sheets & Coils | Plates | Pipes & Tubes | Bars & Rods | Fittings
                    </p>
                  </div>
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-0.5">Available Grades</span>
                    <p className="text-white/90 font-bold font-sans text-xs">
                      304L | 316L | 201 | 430
                    </p>
                  </div>
                  <div>
                    <span className="text-primary block text-[10px] font-black uppercase tracking-wider mb-0.5">Testing Standards</span>
                    <p className="text-white/90 font-bold font-sans text-xs">
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

      {/* Mission/Vision Section - Perfectly cohesive symmetrically balanced cards */}
      <section className="py-6 md:py-8 px-4 bg-white">
        <div className="container-custom space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-steel-200 rounded-[20px] p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Eye size={20} />
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-steel-950 uppercase tracking-tight">Our Vision</h3>
                </div>
                <p className="text-steel-600 font-medium leading-relaxed text-sm">
                  To be India's most trusted stainless steel supplier &mdash; known for the quality of our products, the depth of our technical knowledge, and the reliability of our service.
                </p>
                <ul className="space-y-2 text-xs font-bold text-steel-800 font-sans border-t border-steel-100 pt-3 mt-2">
                  {[
                    "Supplying certified, high-grade stainless materials across India.",
                    "Providing 100% metallurgical verification & traceable Mill Test Certificates.",
                    "Guarding material integrity from sourcing down to the client's final delivery.",
                    "Building generations of trust through transparent, premium mill pricing."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-black mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-white border border-steel-200 rounded-[20px] p-6 shadow-sm flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
                    <Target size={20} />
                  </div>
                  <h3 className="text-lg md:text-xl font-extrabold text-steel-950 uppercase tracking-tight">Our Mission</h3>
                </div>
                <p className="text-steel-600 font-medium leading-relaxed text-sm">
                  Our mission is to make quality stainless steel accessible, understandable, and easy to procure for every industry we serve.
                </p>
                <ul className="space-y-2 text-xs font-bold text-steel-800 font-sans border-t border-steel-100 pt-3 mt-2">
                  {[
                    "Maintaining a comprehensive, ready stock of in-demand grades and forms.",
                    "Building long-term relationships with trusted global manufacturers.",
                    "Employing technically knowledgeable staff who advise rather than just sell.",
                    "Offering flexible supply options, from custom cuts to bulk deliveries."
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-primary font-black mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>

          {/* Our Values & Commitment - Elegant borderless integration */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 pt-10 border-t border-steel-150">
            <div className="lg:col-span-6 space-y-6">
              <h3 className="text-xl md:text-2xl font-black text-steel-950 uppercase tracking-tight">Our Values</h3>
              <div className="grid grid-cols-1 gap-5">
                {[
                  { name: "Quality", desc: "We never compromise on the grade or specification of the material we supply." },
                  { name: "Integrity", desc: "Honest pricing, honest advice, and no shortcuts." },
                  { name: "Expertise", desc: "Forty years of stainless steel knowledge at your service." },
                  { name: "Service", desc: "Responsive, knowledgeable, and genuinely helpful." },
                  { name: "Reliability", desc: "Consistent stock, consistent quality, consistent delivery." }
                ].map((val, i) => (
                  <div key={i} className="flex gap-3 group">
                    <span className="font-mono text-xs font-bold text-primary bg-primary/5 border border-primary/10 rounded-lg w-7 h-7 flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    <div>
                      <h4 className="text-[13px] md:text-sm font-bold text-steel-950 uppercase tracking-wider mb-1 leading-none">{val.name}</h4>
                      <p className="text-steel-500 text-xs md:text-[13px] font-medium leading-relaxed">{val.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col justify-center space-y-3 pl-0 lg:pl-8">
              <div className="w-8 h-8 bg-primary/5 text-primary rounded-lg flex items-center justify-center">
                <ShieldCheck size={18} className="text-primary" />
              </div>
              <h4 className="text-sm md:text-base font-bold text-steel-950 tracking-tight uppercase">Our Commitment to Industry</h4>
              <p className="text-steel-500 font-medium text-xs md:text-sm leading-relaxed">
                The industries we serve &mdash; mining, oil & gas, food processing, pharmaceuticals, construction, and more &mdash; demand materials that perform without failure. A pipeline that corrodes, a fitting that fails, a food-contact surface that contaminates: these are not just commercial problems, they are safety problems.
              </p>
              <p className="text-steel-500 font-medium text-xs md:text-sm leading-relaxed pt-1 border-t border-steel-100 mt-2">
                That is why at Sidharth Steels, we take material quality seriously. Every product we supply meets the grade and standard it is sold as &mdash; certified, traceable, and backed by our four decades of reputation.
              </p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

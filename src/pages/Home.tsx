import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Shield, Award, MapPin, Truck, Phone,
  Building2, Car, FlaskConical, Utensils, Stethoscope, Zap,
  CheckCircle2, Globe, Clock, Package, BarChart3, Settings as SettingsIcon, Loader2
} from "lucide-react";
import { TAGLINE, SERVICES, INDUSTRIES_DETAILED, BLOG_POSTS as STATIC_POSTS } from "../constants";
import { useEffect, useState } from "react";
import { dbService } from "../services/dbService";
import p1 from "../assets/p1.jpg";
import p5 from "../assets/p5.jpg";
import p6 from "../assets/p6.jpg";

const iconMap: Record<string, any> = {
  Building2, Car, FlaskConical, Utensils, Stethoscope, Zap
};

export default function Home() {
  const [settings, setSettings] = useState({
    heroTitle: "Chennai's Trusted Stainless Steel Supplier Since 1984",
    heroTagline: "Sidharth Steels is one of Chennai's most established stainless steel stockists and suppliers. With over four decades of experience, we supply a comprehensive range of stainless steel products — sheets, coils, plates, pipes, tubes, bars, rods, and fittings — to industries across Tamil Nadu and India.",
    heroImage: p6,
  });
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS.slice(0, 3));
  const [loading, setLoading] = useState(true);

  // Set page headers for SEO according to the PDF Page 2
  useEffect(() => {
    document.title = "Stainless Steel Supplier in Chennai | Sidharth Steels";
    const metaDesc = document.querySelector('meta[name="description"]');
    const contentText = "Sidharth Steels — Chennai's trusted stainless steel supplier since 1984. Sheets, coils, plates, pipes, bars & fittings in grades 304L and 316L. Get a quote today.";
    if (metaDesc) {
      metaDesc.setAttribute("content", contentText);
    } else {
      const meta = document.createElement("meta");
      meta.name = "description";
      meta.content = contentText;
      document.head.appendChild(meta);
    }
  }, []);

  useEffect(() => {
    // Safety Timeout: Force stop loading after 3 seconds even if DB is slow
    const timeout = setTimeout(() => {
      if (loading) {
        console.warn("Safety timeout reached: Forcing loading completion");
        setLoading(false);
      }
    }, 3000);

    async function loadData() {
      try {
        // Load Settings from DB if available
        const siteConfig = await dbService.getDocument("settings", "site_config") as any;
        if (siteConfig) {
          setSettings({
            heroTitle: siteConfig.heroTitle || "Chennai's Trusted Stainless Steel Supplier Since 1984",
            heroTagline: siteConfig.heroTagline || "Sidharth Steels is one of Chennai's most established stainless steel stockists and suppliers. With over four decades of experience, we supply a comprehensive range of stainless steel products — sheets, coils, plates, pipes, tubes, bars, rods, and fittings — to industries across Tamil Nadu and India.",
            heroImage: siteConfig.heroImage || p5,
          });
        }

        // Load Posts
        const dynamicPosts = await dbService.getCollection("posts", "createdAt");
        if (dynamicPosts && dynamicPosts.length > 0) {
          setPosts(dynamicPosts.slice(0, 3));
        } else {
          setPosts(STATIC_POSTS.slice(0, 3));
        }
      } catch (error) {
        console.error("Home Data Load Error:", error);
        setPosts(STATIC_POSTS.slice(0, 3));
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    }
    loadData();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section - exactly one H1 Heading as verified in Page 2 of PDF */}
      <section id="hero" className="relative h-[78vh] md:h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage}
            alt="Stainless Steel Industrial Background"
            className="w-full h-full object-cover brightness-[0.35] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/70 to-transparent" />
        </div>
        <div className="w-full px-6 md:px-12 lg:px-20 xl:px-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left flex flex-col items-start"
          >
            {/* The single H1 tag for the homepage */}
            <h1 className="font-display text-2xl sm:text-4xl md:text-[46px] lg:text-[54px] xl:text-[62px] font-black text-white leading-[1.1] mb-5 md:mb-6 tracking-tight text-left animate-fade-in uppercase">
              {settings.heroTitle.includes("Since 1984") ? (
                <>Chennai's Trusted <br className="hidden md:block" /><span className="text-primary italic">Stainless Steel Supplier</span> <br className="hidden md:block" />Since 1984</>
              ) : settings.heroTitle}
            </h1>
            
            <p className="text-xs sm:text-sm md:text-base lg:text-[18px] text-steel-200 mb-6 md:mb-8 font-semibold max-w-2xl leading-relaxed opacity-95 text-left">
              Chennai's premier stockist and supplier of high-quality stainless steel sheets, coils, plates, pipes, and fittings. Sourced from globally certified mills since 1984.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
              <Link to="/services" className="px-5 py-2.5 bg-primary text-white text-[11px] font-bold rounded-lg hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-2 shadow-lg shadow-primary/30 w-full sm:w-auto uppercase tracking-wider">
                Explore Inventory <ArrowRight size={14} />
              </Link>
              <Link to="/contact" className="px-5 py-2.5 border-2 border-white/20 text-white text-[11px] font-bold rounded-lg hover:bg-white/10 active:scale-95 transition-all text-center w-full sm:w-auto backdrop-blur-sm uppercase tracking-wider">
                Material Request
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Trust Signals / Stats Grid */}
      <section className="py-4 md:py-6 bg-steel-950 text-white border-y border-steel-800/40 relative px-4">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            {[
              { val: "40+", label: "Years in Business" },
              { val: "1,000+", label: "Trusted Customers" },
              { val: "5", label: "Product Categories" },
              { val: "100%", label: "Mill Certified (MTC)" },
              { val: "304L/316L", label: "Always in Stock" }
            ].map((stat, i) => (
              <div key={i} className="p-3 bg-white/5 border border-white/10 rounded-xl">
                <span className="text-xl md:text-2xl font-black text-primary block leading-none">{stat.val}</span>
                <span className="text-[9px] md:text-[10px] text-steel-300 uppercase tracking-wider block mt-1 font-bold">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Choose Section & Checklist */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 block">Unmatched Quality Supply Since 1984</span>
              <h2 className="text-2xl md:text-4xl font-black text-steel-950 mb-4 tracking-tight leading-[1.1]">Why Choose Sidharth Steels?</h2>
              <p className="text-steel-500 font-semibold text-xs md:text-sm mb-6 leading-relaxed max-w-2xl">
                With over four decades of trusted relationship with tier-1 global mills, we maintain consistent raw materials inventory to provide value-added services that smaller distributors cannot offer.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  "In business since 1984 — four decades of trusted supply.",
                  "Comprehensive inventory — all major grades and product forms in stock.",
                  "Grades 304L and 316L ready to dispatch — no long lead times.",
                  "Mill Test Certificates (MTCs) supplied with all material.",
                  "Technical team to advise on the right grade and specification.",
                  "Cut-to-size and custom lengths available on request.",
                  "Serving Chennai, Tamil Nadu, and pan-India logistics."
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-2.5 items-start"
                  >
                    <CheckCircle2 size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-steel-800 text-[12.5px] font-bold leading-relaxed">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="aspect-[4/5] w-full max-w-[380px] bg-steel-950 rounded-[24px] overflow-hidden shadow-xl relative">
                <img 
                  src={p1} 
                  alt="Industrial Steel Manufacturing" 
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[3000ms]"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-transparent to-transparent opacity-60" />
              </div>
              {/* Floating badge overlapping the image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-4 -left-4 bg-white p-5 rounded-[20px] shadow-lg border border-steel-100 max-w-[200px] md:max-w-[240px] z-20 animate-fade-in"
              >
                <Package className="text-primary mb-2" size={24} />
                <p className="text-[11px] font-bold text-steel-700 leading-relaxed italic mb-3">
                  "Sidharth Steels has consistently delivered precision materials for our chemical plant expansions."
                </p>
                <div className="pt-2 border-t border-steel-50">
                    <p className="text-[8px] font-black text-primary uppercase tracking-[0.15em]">Sr. Project Manager</p>
                    <p className="text-[11px] font-extrabold text-steel-950">Major Petrochem Corp</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding Our Grades — 304L vs 316L (PDF Page 3) */}
      <section className="py-10 md:py-14 bg-steel-50 border-y border-steel-100 px-4">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-8 space-y-2">
            <span className="text-primary font-bold tracking-[0.25em] underscore uppercase text-[9px] block">Metallurgical Guidance</span>
            <h2 className="text-2xl md:text-3xl font-black text-steel-950 tracking-tight">Understanding Our Grades — 304L vs 316L</h2>
            <p className="text-steel-600 font-medium text-xs md:text-sm">Not sure which stainless steel grade is suited for your specific project environment? Use our quick comparison below.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {/* Grade 304L */}
            <div className="border border-steel-200/80 rounded-[20px] p-5 md:p-6 bg-white relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform">
              <div>
                <div className="absolute top-4 right-5 text-4xl font-extrabold text-steel-950/5 select-none font-mono">304L</div>
                <span className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider rounded mb-3">Cost-Effective & Versatile</span>
                <h4 className="text-base font-bold text-steel-950 mb-1.5">304L Grade</h4>
                <p className="text-steel-600 text-xs leading-relaxed font-semibold">
                  Chromium 18–20%, Nickel 8–12%. Ideal for general use, food processing, construction, and agriculture. The 'L' stands for Low Carbon — better for welding and corrosion resistance after fabrication.
                </p>
              </div>
              <div className="mt-4 p-3 bg-steel-50 rounded-lg text-[10.5px] font-bold text-steel-700">
                Best for: General fabrications, water supply lines, architectural panelling.
              </div>
            </div>

            {/* Grade 316L */}
            <div className="border border-steel-200/80 rounded-[20px] p-5 md:p-6 bg-white relative overflow-hidden flex flex-col justify-between hover:scale-[1.01] transition-transform">
              <div>
                <div className="absolute top-4 right-5 text-4xl font-extrabold text-steel-950/5 select-none font-mono">316L</div>
                <span className="inline-block px-2.5 py-0.5 bg-primary/10 border border-primary/20 text-[9px] font-black text-primary uppercase tracking-wider rounded mb-3">High Performance & Acid Resistant</span>
                <h4 className="text-base font-bold text-steel-950 mb-1.5">316L Grade</h4>
                <p className="text-steel-600 text-xs leading-relaxed font-semibold">
                  Chromium 16–18%, Nickel 10–14%, Molybdenum 2–3%. The molybdenum is the key difference — it gives 316L superior resistance to salt, chlorides, and aggressive chemicals. Essential for coastal environments, chemical plants, oil & gas, and mining.
                </p>
              </div>
              <div className="mt-4 p-3 bg-primary/5 border border-primary/10 rounded-lg text-[10.5px] font-bold text-steel-800">
                Best for: Marine/coastal structures, pharmaceutical vats, acid tanks, saline systems.
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-8 md:py-12 bg-steel-950 text-white overflow-hidden relative px-4">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4">
            <div className="max-w-xl">
              <span className="text-white/95 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2 block">Our Products Collection</span>
              <h2 className="text-xl md:text-3xl font-black mb-2 tracking-tight leading-tight">We stock a complete range of stainless steel products</h2>
              <p className="text-steel-200 font-semibold text-xs italic leading-relaxed">
                South India's most comprehensive inventory of premium stainless steel grades & forms.
              </p>
            </div>
            <Link to="/services" className="w-full md:w-auto px-5 py-2.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest text-xs md:text-[13px]">
               Full Catalog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
            {SERVICES.slice(0, 3).map((service, i) => (
               <motion.div 
                  key={service.id}
                  viewport={{ once: true, margin: "-50px" }}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="group relative bg-black/20 backdrop-blur-sm rounded-[24px] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 h-[240px] md:h-[300px]"
               >
                 <div className="absolute inset-0 z-0">
                    <img 
                      src={service.image} 
                      alt={service.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] brightness-50 grayscale group-hover:grayscale-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                 </div>
                 <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10">
                    <span className="text-primary text-[8px] font-black uppercase tracking-[0.3em] mb-1 block">Certified Product</span>
                    <h3 className="text-base md:text-lg font-black mb-1 leading-tight group-hover:text-primary transition-colors uppercase">{service.title}</h3>
                    <p className="text-steel-200 text-[10px] md:text-xs mb-3 leading-relaxed line-clamp-3 opacity-90">
                      {service.description}
                    </p>
                    <Link to={`/services?id=${service.id}`} className="w-8 h-8 md:w-10 md:h-10 bg-white text-steel-950 rounded-xl flex items-center justify-center group-hover:w-full transition-all duration-500 font-bold overflow-hidden">
                       <span className="hidden group-hover:block whitespace-nowrap px-4 text-[9px] uppercase tracking-widest">View Specifications</span>
                       <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section with Icons */}
      <section className="py-12 md:py-16 bg-[#F8F9FA] px-4 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-left mb-8 md:mb-10">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-[9px] md:text-[10px] mb-2 block">Market Sectors We Serve</span>
             <h2 className="text-2xl md:text-3xl font-black text-steel-950 mb-2 tracking-tight capitalize leading-tight">Industries We Serve</h2>
             <p className="text-steel-600 font-semibold max-w-xl text-xs leading-relaxed">
               Engineered solutions for high-grade stainless steel across diverse industrial landscapes in Chennai and South India. 
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {INDUSTRIES_DETAILED.map((industry, i) => {
              const Icon = iconMap[industry.icon];
              return (
                <motion.div 
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-5 md:p-6 rounded-[20px] border border-steel-100 hover:shadow-lg hover:border-primary/10 transition-all duration-500 cursor-default group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="absolute top-6 right-8 font-mono text-[20px] font-black text-steel-100 group-hover:text-primary/10 transition-colors duration-500 select-none">
                    {`0${i + 1}`}
                  </div>
                  <div>
                    <div className="w-10 h-10 rounded-xl bg-steel-50 text-steel-600 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-steel-100/50">
                      <Icon size={18} />
                    </div>
                    <h3 className="text-sm md:text-base font-black text-steel-950 mb-2 tracking-tight group-hover:text-primary transition-colors capitalize">{industry.name}</h3>
                    <p className="text-steel-500 font-semibold text-xs leading-relaxed pr-6">{industry.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Dynamic Supply Chain Excellence */}
      <section className="bg-steel-50 py-8 md:py-12 overflow-hidden px-4">
        <div className="container-custom">
           <div className="bg-steel-950 rounded-[20px] md:rounded-[28px] p-6 lg:p-8 border border-steel-800/30 shadow-xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center text-white">
                 <div className="lg:col-span-7">
                    <h2 className="text-xl md:text-2xl lg:text-3xl font-black mb-4 leading-[1.1] tracking-tight uppercase">Our supply chain <br className="hidden md:block" /><span className="text-steel-200 italic">excellence process</span></h2>
                    <div className="space-y-4">
                       {[
                         { step: "01", title: "Global Sourcing", desc: "Materials directly sourced from tier-1 global mills like Jindal and POSCO." },
                         { step: "02", title: "Quality Grading", desc: "Rigorous ultrasonic and chemical testing at our Chennai facility." },
                         { step: "03", title: "Precision Processing", desc: "Custom slitting, cutting, and mirror polishing based on drawings." }
                       ].map((item) => (
                         <motion.div 
                           key={item.step} 
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="flex gap-4 group"
                         >
                             <span className="text-lg md:text-2xl font-black text-steel-200 transition-colors group-hover:text-primary leading-none">{item.step}</span>
                             <div>
                                <h4 className="text-sm md:text-base font-black mb-0.5 group-hover:text-primary transition-colors tracking-tight capitalize">{item.title}</h4>
                                <p className="text-steel-100 text-xs font-semibold leading-relaxed max-w-lg">{item.desc}</p>
                             </div>
                         </motion.div>
                       ))}
                    </div>
                 </div>
                 <div className="lg:col-span-5 relative mt-6 lg:mt-0">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-black/25 rounded-[16px] md:rounded-[24px] p-5 md:p-6 lg:p-8 border border-white/10 shadow-xl relative z-10"
                    >
                       <Award className="text-primary mb-3" size={32} />
                       <h3 className="text-lg md:text-xl font-black mb-3 tracking-tight capitalize">Zero-defect policy</h3>
                       <p className="text-steel-100 text-[11px] md:text-xs font-semibold mb-5 leading-relaxed italic">
                         "Our reputation is built on the precision of our products. In 40 years, we have maintained a 99.8% material acceptance rate for critical projects."
                       </p>
                        <Link to="/about" className="w-full text-center px-4 py-2 bg-primary text-white text-[10px] font-bold rounded-lg inline-block hover:scale-105 transition-transform shadow-lg shadow-primary/20 uppercase tracking-widest">
                           The Sidharth Legacy
                        </Link>
                    </motion.div>
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-[120px] opacity-20 -z-10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-10 md:py-14 bg-white px-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
             <div className="max-w-xl">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[9px] mb-2 block">Knowledge Hub</span>
                <h2 className="text-2xl md:text-3xl font-black text-steel-950 tracking-tighter leading-tight">Industrial Insights</h2>
             </div>
             <Link to="/blog" className="text-steel-950 font-black flex items-center gap-2 group text-sm md:text-base hover:text-primary transition-colors">
                Explore Learning Center <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <motion.div 
                key={post.id || post.slug}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[20px] mb-4 shadow relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" referrerPolicy="no-referrer" />
                   <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-md text-[8px] md:text-[9px] font-black text-steel-950 uppercase tracking-widest shadow">
                        {post.category}
                      </span>
                   </div>
                </div>
                <div className="space-y-2 px-1">
                  <h4 className="text-base font-black text-steel-950 group-hover:text-primary transition-colors leading-tight tracking-tight">{post.title}</h4>
                  <Link to={`/blog/${post.id || post.slug}`} className="inline-flex items-center gap-1.5 text-steel-500 font-bold text-[11px] md:text-[12px] hover:text-primary transition-all border-b-2 border-steel-100 hover:border-primary pb-0.5">
                    Full Article <ArrowRight size={14} className="inline-block" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Homepage Call to Action - exactly matching PDF */}
      <section className="py-4 px-4 bg-steel-50 border-t border-steel-100">
        <div className="container-custom">
          <div className="bg-steel-950 rounded-[20px] p-5 md:p-6 border border-steel-800/40 relative overflow-hidden group shadow-lg">
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl space-y-1.5">
                <span className="text-[8px] font-black uppercase tracking-[0.2em] text-primary block">Immediate Procurement Support</span>
                <h4 className="text-base font-extrabold text-white leading-tight">
                  Looking for a reliable stainless steel supplier in Chennai?
                </h4>
                <p className="text-steel-300 text-[11px] leading-relaxed">
                  Contact Sidharth Steels today for pricing, stock availability, and technical advice. We supply to fabricators, contractors, OEMs, and traders across South India and beyond.
                </p>
              </div>
              <div className="flex flex-wrap gap-2.5 shrink-0 items-center">
                <Link
                  to="/contact"
                  className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white font-bold text-[10px] rounded-md transition-all uppercase tracking-widest border border-white/15"
                >
                  Request a Quote
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary text-white font-bold text-[10px] rounded-md hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/20 uppercase tracking-widest"
                >
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Decorative highlight */}
            <div className="absolute top-0 right-0 w-1/4 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 translate-x-1/2 group-hover:translate-x-1/4 transition-transform duration-[3000ms]" />
          </div>
        </div>
      </section>
    </div>
  );
}

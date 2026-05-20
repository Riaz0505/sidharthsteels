import { motion } from "motion/react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Shield, Award, MapPin, Truck, Phone,
  Building2, Car, FlaskConical, Utensils, Stethoscope, Zap,
  CheckCircle2, Globe, Clock, Package, BarChart3, Settings as SettingsIcon, Loader2
} from "lucide-react";
import { TAGLINE, SERVICES, INDUSTRIES_DETAILED, BLOG_POSTS as STATIC_POSTS } from "../constants";
import { doc, getDocFromServer } from "firebase/firestore";
import { db } from "../lib/firebase";
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
    heroTitle: "The Backbone of Industrial India",
    heroTagline: `${TAGLINE} — Delivering certified, high-grade stainless steel with precision logistics.`,
    heroImage: p6,
  });
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS.slice(0, 3));
  const [loading, setLoading] = useState(true);

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
        // Load Settings
        const siteConfig = await dbService.getDocument("settings", "site_config") as any;
        if (siteConfig) {
          setSettings({
            heroTitle: siteConfig.heroTitle || "The Backbone of Industrial India",
            heroTagline: siteConfig.heroTagline || `${TAGLINE} — Delivering certified, high-grade stainless steel with precision logistics.`,
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
      {/* Hero Section */}
      <section id="hero" className="relative h-[75vh] md:h-[90vh] flex items-center overflow-hidden">
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
            <h1 className="font-display text-3xl sm:text-4xl md:text-[50px] lg:text-[62px] xl:text-[72px] font-black text-white leading-[1.05] mb-5 md:mb-6 tracking-tight text-left animate-fade-in">
              {settings.heroTitle.includes('India') ? (
                <>The Backbone of <br className="hidden md:block" /><span className="text-primary">Industrial India</span></>
              ) : settings.heroTitle}
            </h1>
            <p className="text-xs sm:text-sm md:text-base lg:text-[18px] text-steel-200 mb-6 md:mb-8 font-medium max-w-xl leading-relaxed opacity-85 text-left">
              {settings.heroTagline}
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

      {/* Core Strengths Section */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-16 items-center">
            <div className="lg:col-span-7">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-4 block">Unmatched Quality</span>
              <h2 className="text-3xl md:text-5xl font-black text-steel-950 mb-4 md:mb-8 tracking-tight leading-[1.1]">Why industrial leaders choose Sidharth Steels</h2>
              <p className="text-steel-500 font-medium text-base md:text-lg mb-8 md:mb-10 leading-relaxed max-w-2xl">
                We don't just supply metal; we provide the foundation for South India's infrastructure. Our rigorous selection process ensures every sheet and pipe exceeds international standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
                {[
                  { icon: Clock, title: "Just-In-Time", desc: "Express delivery across Tamil Nadu." },
                  { icon: CheckCircle2, title: "100% Traceable", desc: "All materials come with MTC." },
                  { icon: SettingsIcon, title: "Custom Sizing", desc: "Precision cutting and finishing." },
                  { icon: BarChart3, title: "Competitive Rates", desc: "Optimized direct mill sourcing." }
                ].map((item, i) => (
                  <motion.div 
                    key={i}
                    viewport={{ once: true }}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-brand-red-50 rounded-2xl flex items-center justify-center text-primary shadow-sm">
                      <item.icon size={22} />
                    </div>
                    <div>
                      <h4 className="font-bold text-steel-950 text-lg mb-1 leading-tight">{item.title}</h4>
                      <p className="text-steel-500 text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-5 relative mt-6 lg:mt-0 flex justify-center">
              <div className="aspect-[4/5] w-full max-w-[420px] max-h-[480px] md:max-h-[520px] bg-steel-950 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative">
                <img 
                  src={p1} 
                  alt="Industrial Steel Manufacturing" 
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-transparent to-transparent opacity-60" />
              </div>
              {/* Floating badge overlapping the image */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-4 md:-bottom-10 md:-right-8 lg:-left-8 bg-white p-6 md:p-8 rounded-[30px] md:rounded-[40px] shadow-2xl border border-steel-100 max-w-[220px] md:max-w-[300px] z-20"
              >
                <Package className="text-primary mb-4" size={28} />
                <p className="text-xs md:text-sm font-bold text-steel-700 leading-relaxed italic mb-4">
                  "Sidharth Steels has consistently delivered precision materials for our chemical plant expansions."
                </p>
                <div className="pt-4 border-t border-steel-50">
                    <p className="text-[10px] font-black text-primary uppercase tracking-[0.15em] mb-0.5">Sr. Project Manager</p>
                    <p className="text-xs font-bold text-steel-950">Major Petrochem Corp</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-8 md:py-12 bg-steel-950 text-white overflow-hidden relative px-4 border-y border-steel-800/20">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-8 gap-4">
            <div className="max-w-xl">
              <span className="text-white/95 font-bold tracking-[0.2em] uppercase text-[10px] md:text-xs mb-2 block">Product Catalog</span>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-2 tracking-tight leading-tight">The material portfolio powering modern industry</h2>
              <p className="text-steel-100 font-medium text-xs md:text-sm italic leading-relaxed">
                South India's most comprehensive inventory of premium stainless steel grades.
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
                  className="group relative bg-black/20 backdrop-blur-sm rounded-[20px] md:rounded-[28px] overflow-hidden border border-white/10 hover:border-white/30 transition-all duration-700 h-[250px] md:h-[320px]"
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
                    <span className="text-primary text-[9px] font-black uppercase tracking-[0.3em] mb-1.5 block">Certified Product</span>
                    <h3 className="text-lg md:text-xl font-black mb-2 leading-tight group-hover:text-primary transition-colors">{service.title}</h3>
                    <p className="text-steel-200 text-[11px] md:text-xs mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-3">
                      {service.description}
                    </p>
                    <Link to={`/services?id=${service.id}`} className="w-9 h-9 md:w-11 md:h-11 bg-white text-steel-950 rounded-xl flex items-center justify-center group-hover:w-full transition-all duration-500 font-bold overflow-hidden">
                       <span className="hidden group-hover:block whitespace-nowrap px-4 text-[10px] uppercase tracking-widest">View Specifications</span>
                       <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                 </div>
               </motion.div>
            ))}
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-[120px] opacity-20" />
      </section>

      {/* Industries Section with Icons */}
      <section className="py-12 md:py-20 bg-steel-50/50 px-4 relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-left mb-12 md:mb-16">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-3 block">Market Coverage</span>
             <h2 className="text-2xl md:text-3.5xl lg:text-4xl font-black text-steel-950 mb-3 tracking-tight capitalize leading-tight">The sectors we empower</h2>
             <p className="text-steel-600 font-medium max-w-xl text-xs md:text-sm leading-relaxed">
               Engineered solutions for high-grade stainless steel across diverse industrial landscapes in South India. 
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {INDUSTRIES_DETAILED.map((industry, i) => {
              const Icon = iconMap[industry.icon];
              return (
                <motion.div 
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-white p-6 md:p-8 rounded-[20px] border border-steel-100 hover:shadow-xl hover:border-primary/10 transition-all duration-500 cursor-default group flex flex-col justify-between relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-[3px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                  <div className="absolute top-6 right-8 font-mono text-[24px] font-black text-steel-100 group-hover:text-primary/10 transition-colors duration-500 select-none">
                    {`0${i + 1}`}
                  </div>
                  <div>
                    <div className="w-11 h-11 rounded-xl bg-steel-50 text-steel-600 flex items-center justify-center mb-5 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-steel-100/50">
                      <Icon size={20} />
                    </div>
                    <h3 className="text-base md:text-lg font-black text-steel-950 mb-3 tracking-tight leading-tight group-hover:text-primary transition-colors">{industry.name}</h3>
                    <p className="text-steel-500 font-medium text-xs md:text-[13px] leading-relaxed pr-6">{industry.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

       <section className="bg-steel-50 py-8 md:py-12 overflow-hidden px-4">
        <div className="container-custom">
           <div className="bg-steel-950 rounded-[24px] md:rounded-[36px] p-6 md:p-10 lg:p-12 border border-steel-800/30 shadow-xl relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center text-white">
                 <div className="lg:col-span-7">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl font-black mb-4 md:mb-6 leading-[1.1] tracking-tight">Our supply chain <br className="hidden md:block" /><span className="text-steel-200">excellence process</span></h2>
                    <div className="space-y-4 md:space-y-6">
                       {[
                         { step: "01", title: "Global Sourcing", desc: "Materials directly from tier-1 global mills like Jindal and POSCO." },
                         { step: "02", title: "Quality Grading", desc: "Rigorous ultrasonic and chemical analysis at our Chennai facility." },
                         { step: "03", title: "Precision Processing", desc: "Custom slitting, cutting, and polishing based on drawings." }
                       ].map((item) => (
                         <motion.div 
                           key={item.step} 
                           initial={{ opacity: 0, x: -20 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           className="flex gap-4 md:gap-5 group"
                         >
                            <span className="text-xl md:text-3xl font-black text-steel-200 transition-colors group-hover:text-primary leading-none">{item.step}</span>
                            <div>
                               <h4 className="text-base md:text-lg font-black mb-1 group-hover:text-primary transition-colors tracking-tight capitalize">{item.title}</h4>
                               <p className="text-steel-100 text-xs md:text-sm font-medium leading-relaxed max-w-lg">{item.desc}</p>
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
                      className="bg-black/25 rounded-[20px] md:rounded-[28px] p-6 md:p-8 lg:p-10 border border-white/10 shadow-2xl relative z-10"
                    >
                       <Award className="text-primary mb-4" size={36} />
                       <h3 className="text-xl md:text-2xl font-black mb-4 tracking-tight capitalize">Zero-defect policy</h3>
                       <p className="text-steel-100 text-xs md:text-sm font-medium mb-6 leading-relaxed italic">
                         "Our reputation is built on the precision of our products. In 40 years, we have maintained a 99.8% material acceptance rate for critical projects."
                       </p>
                        <Link to="/about" className="w-full text-center px-4 py-2.5 bg-primary text-white text-[11px] font-bold rounded-lg inline-block hover:scale-105 transition-transform shadow-lg shadow-primary/20 uppercase tracking-widest">
                           The Sidharth Legacy
                        </Link>
                    </motion.div>
                    {/* Decorative blurred circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/10 rounded-full blur-[120px] opacity-20 -z-10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6 md:gap-8">
             <div className="max-w-xl">
                <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-3 md:mb-4 block">Knowledge Hub</span>
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-black text-steel-950 tracking-tighter leading-tight">Industrial insights</h2>
             </div>
             <Link to="/blog" className="text-steel-950 font-black flex items-center gap-3 group text-base md:text-xl hover:text-primary transition-colors">
                Explore Learning Center <ArrowRight size={24} className="group-hover:translate-x-3 transition-transform" />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {posts.map((post, i) => (
              <motion.div 
                key={post.id || post.slug}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[32px] mb-6 md:mb-8 shadow-2xl relative">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1500ms]" />
                   <div className="absolute top-6 left-6 md:top-8 md:left-8">
                      <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] md:text-[10px] font-black text-steel-950 uppercase tracking-widest shadow-xl">
                        {post.category}
                      </span>
                   </div>
                </div>
                <div className="space-y-3 px-1 md:px-2">
                  <h4 className="text-lg md:text-xl lg:text-2xl font-black text-steel-950 group-hover:text-primary transition-colors leading-tight tracking-tight">{post.title}</h4>
                  <Link to={`/blog/${post.id || post.slug}`} className="inline-flex items-center gap-2 text-steel-500 font-bold text-[12px] md:text-[14px] hover:text-primary transition-all border-b-2 border-steel-100 hover:border-primary pb-0.5">
                    Full Article <ArrowRight size={16} className="inline-block" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-6 md:py-10 px-4">
        <div className="container-custom">
          <div className="bg-steel-950 rounded-[20px] md:rounded-[28px] p-5 md:p-8 border border-steel-800/40 relative overflow-hidden group shadow-xl">
            <div className="relative z-10 max-w-2xl">
              <span className="text-white/95 font-bold tracking-[0.2em] uppercase text-[9px] mb-3 block">Ready to start?</span>
              <h2 className="text-xl md:text-2xl lg:text-3xl font-black text-white mb-3 tracking-tight leading-[1.1]">Your partner in high-grade stainless steel</h2>
              <p className="text-steel-100 text-[11px] md:text-xs mb-5 font-medium leading-relaxed opacity-90 max-w-lg">
                Get immediate support from our sales specialists in Chennai for custom specifications and bulk wholesale pricing.
              </p>
              <div>
                <a href="tel:+914422334455" className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-white font-bold text-[11px] rounded-lg hover:scale-105 active:scale-95 transition-all shadow-md shadow-primary/30 uppercase tracking-widest">
                  <Phone size={13} /> Call Us Now
                </a>
              </div>
            </div>
            {/* Background Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/10 to-transparent skew-x-12 translate-x-1/2 group-hover:translate-x-1/4 transition-transform duration-[3000ms]" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-white/10 rounded-full blur-[180px] opacity-20" />
            <Globe className="absolute -bottom-20 -right-20 text-white/5 w-96 h-96 blur-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}

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
      <section id="hero" className="relative h-[60vh] md:h-[70vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage}
            alt="Stainless Steel Industrial Background"
            className="w-full h-full object-cover brightness-[0.35] scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/70 to-transparent" />
        </div>
        <div className="w-full px-6 md:px-16 lg:px-24 xl:px-32 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-4xl text-left flex flex-col items-start"
          >
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-white leading-[1.1] mb-6 md:mb-8 tracking-tighter text-left">
              {settings.heroTitle.includes('India') ? (
                <>The Backbone of <br className="hidden md:block" /><span className="text-primary">Industrial India</span></>
              ) : settings.heroTitle}
            </h1>
            <p className="text-sm md:text-xl text-steel-200 mb-8 md:mb-10 font-medium max-w-xl leading-relaxed opacity-80 text-left">
              {settings.heroTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link to="/services" className="px-8 py-4 bg-primary text-white text-sm md:text-lg font-bold rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/40 w-full sm:w-auto uppercase tracking-wider">
                Explore Inventory <ArrowRight size={20} />
              </Link>
              <Link to="/contact" className="px-8 py-4 border-2 border-white/30 text-white text-sm md:text-lg font-bold rounded-2xl hover:bg-white/10 active:scale-95 transition-all text-center w-full sm:w-auto backdrop-blur-sm">
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
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] bg-steel-950 rounded-[32px] md:rounded-[48px] overflow-hidden shadow-2xl relative">
                <img 
                  src={p1} 
                  alt="Industrial Steel Manufacturing" 
                  className="w-full h-full object-cover opacity-80 hover:scale-105 transition-transform duration-[3000ms]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-transparent to-transparent opacity-60" />
              </div>
              {/* Floating badge */}
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="absolute -bottom-6 -left-6 md:-bottom-12 md:-right-12 lg:-left-12 bg-white p-6 md:p-12 rounded-[32px] md:rounded-[48px] shadow-2xl border border-steel-100 max-w-[200px] md:max-w-[320px] z-20"
              >
                <Package className="text-primary mb-6" size={32} />
                <p className="text-sm md:text-lg font-bold text-steel-800 leading-snug italic mb-6">
                  "Sidharth Steels has consistently delivered precision materials for our chemical plant expansions."
                </p>
                <div className="pt-6 border-t border-steel-50">
                   <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-1">Sr. Project Manager</p>
                   <p className="text-sm font-bold text-steel-950">Major Petrochem Corp</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-10 md:py-16 bg-steel-950 text-white overflow-hidden relative px-4">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 md:mb-16 gap-6">
            <div className="max-w-xl">
              <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-sm mb-3 md:mb-4 block">Product Catalog</span>
              <h2 className="text-3xl md:text-5xl font-black mb-4 md:mb-6 tracking-tight leading-tight">The material portfolio powering modern industry</h2>
              <p className="text-steel-400 font-medium text-base md:text-lg italic leading-relaxed">
                South India's most comprehensive inventory of premium stainless steel grades.
              </p>
            </div>
            <Link to="/services" className="w-full md:w-auto px-6 py-3 bg-primary text-white font-black rounded-xl flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest text-[13px] md:text-sm">
               Full Catalog <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {SERVICES.slice(0, 3).map((service, i) => (
              <motion.div 
                key={service.id}
                viewport={{ once: true, margin: "-50px" }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="group relative bg-steel-950/40 backdrop-blur-sm rounded-[32px] md:rounded-[48px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-700 h-[380px] md:h-[500px]"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] brightness-50 grayscale group-hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-10 md:p-12 z-10">
                   <span className="text-primary text-[10px] font-black uppercase tracking-[0.3em] mb-4 block">Certified Product</span>
                   <h3 className="text-2xl md:text-3xl font-black mb-4 leading-tight group-hover:text-primary transition-colors">{service.title}</h3>
                   <p className="text-steel-300 text-sm md:text-base mb-8 leading-relaxed opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 line-clamp-3">
                     {service.description}
                   </p>
                   <Link to={`/services?id=${service.id}`} className="w-12 h-12 md:w-16 md:h-16 bg-white text-steel-950 rounded-2xl flex items-center justify-center group-hover:w-full transition-all duration-500 font-bold overflow-hidden">
                      <span className="hidden group-hover:block whitespace-nowrap px-6 text-sm uppercase tracking-widest">View Specifications</span>
                      <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-primary/20 rounded-full blur-[120px] opacity-20" />
      </section>

      {/* Industries Section with Icons */}
      <section className="py-10 md:py-16 bg-white px-4">
        <div className="container-custom">
          <div className="text-left mb-10 md:mb-16">
             <span className="text-primary font-bold tracking-[0.2em] uppercase text-[10px] md:text-[11px] mb-4 md:mb-5 block">Market Coverage</span>
             <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-steel-950 mb-4 md:mb-8 tracking-tighter capitalize leading-tight">The sectors we empower</h2>
             <p className="text-steel-500 font-medium max-w-2xl text-base md:text-xl leading-relaxed">
               Engineered solutions for mission-critical operations across diverse industrial landscapes. 
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {INDUSTRIES_DETAILED.map((industry, i) => {
              const Icon = iconMap[industry.icon];
              return (
                <motion.div 
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                  className="bg-steel-50/50 p-8 md:p-12 rounded-[32px] md:rounded-[48px] border border-steel-100 hover:bg-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-default group"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white text-primary flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm border border-steel-100">
                    <Icon size={28} />
                  </div>
                  <h3 className="text-2xl font-black text-steel-950 mb-4 tracking-tight leading-tight">{industry.name}</h3>
                  <p className="text-steel-500 font-medium text-sm md:text-base leading-relaxed">{industry.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-8 md:py-16 overflow-hidden px-4">
        <div className="container-custom">
           <div className="bg-steel-950 rounded-[32px] md:rounded-[64px] p-8 md:p-16 relative overflow-hidden">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-16 items-center text-white">
                 <div className="lg:col-span-7">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-black mb-6 md:mb-10 leading-[1.1] tracking-tight">Our supply chain <br className="hidden md:block" /><span className="text-steel-600">excellence process</span></h2>
                    <div className="space-y-6 md:space-y-10">
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
                           className="flex gap-4 md:gap-6 group"
                         >
                            <span className="text-2xl md:text-5xl font-black text-steel-800 transition-colors group-hover:text-primary leading-none">{item.step}</span>
                            <div>
                               <h4 className="text-lg md:text-xl font-black mb-1 md:mb-2 group-hover:text-primary transition-colors tracking-tight capitalize">{item.title}</h4>
                               <p className="text-steel-400 text-sm md:text-base font-medium leading-relaxed max-w-lg">{item.desc}</p>
                            </div>
                         </motion.div>
                       ))}
                    </div>
                 </div>
                 <div className="lg:col-span-5 relative">
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-steel-900 rounded-[32px] md:rounded-[48px] p-8 md:p-16 border border-white/5 shadow-2xl relative z-10"
                    >
                       <Award className="text-primary mb-8" size={48} />
                       <h3 className="text-2xl md:text-3xl font-black mb-6 tracking-tight capitalize">Zero-defect policy</h3>
                       <p className="text-steel-400 text-base md:text-xl font-medium mb-10 md:mb-12 leading-relaxed italic">
                         "Our reputation is built on the precision of our products. In 40 years, we have maintained a 99.8% material acceptance rate for critical projects."
                       </p>
                        <Link to="/about" className="w-full text-center px-10 py-5 bg-primary text-white text-sm md:text-base font-black rounded-2xl inline-block hover:scale-105 transition-transform shadow-2xl shadow-primary/30 uppercase tracking-widest">
                          The Sidharth Legacy
                       </Link>
                    </motion.div>
                    {/* Decorative blurred circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-steel-500 rounded-full blur-[120px] opacity-20 -z-10" />
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
                <div className="space-y-4 md:space-y-5 px-1 md:px-2">
                  <h4 className="text-xl md:text-3xl font-black text-steel-950 group-hover:text-primary transition-colors leading-tight tracking-tight">{post.title}</h4>
                  <Link to={`/blog/${post.id || post.slug}`} className="inline-flex items-center gap-3 text-steel-950 font-black text-[13px] md:text-lg border-b-2 border-primary/20 pb-1 hover:border-primary transition-all">
                    Full Article <ArrowRight size={20} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-10 md:py-16 px-4">
        <div className="container-custom">
          <div className="bg-steel-950 rounded-[32px] md:rounded-[80px] p-8 md:p-16 lg:p-20 relative overflow-hidden group shadow-2xl">
            <div className="relative z-10 max-w-4xl">
              <span className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-[11px] mb-6 md:mb-8 block">Ready to start?</span>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 md:mb-10 tracking-tight leading-[1]">Your partner in high-grade <br className="hidden md:block" /> stainless steel</h2>
              <p className="text-steel-300 text-base md:text-xl mb-8 md:mb-12 font-medium leading-relaxed opacity-80 max-w-2xl">
                Connect with our technical engineers for material selection and competitive bulk pricing. 
                Experience 40+ years of industrial excellence.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 md:gap-5">
                <Link to="/contact" className="w-full sm:w-auto text-center px-8 py-4 md:px-10 md:py-5 bg-primary text-white font-black text-sm md:text-lg rounded-2xl hover:scale-105 active:scale-95 transition-all shadow-2xl shadow-primary/40 uppercase tracking-widest">
                  Connect with Sales
                </Link>
                <a href="tel:+914422334455" className="w-full sm:w-auto text-center px-8 py-4 md:px-10 md:py-5 border-2 border-white/20 text-white font-black text-sm md:text-lg rounded-2xl hover:bg-white/10 active:scale-95 transition-all flex items-center justify-center gap-3 backdrop-blur-sm">
                  <Phone size={22} /> Instant Support
                </a>
              </div>
            </div>
            {/* Background Decorative elements */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary/10 to-transparent skew-x-12 translate-x-1/2 group-hover:translate-x-1/4 transition-transform duration-[3000ms]" />
            <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[180px] opacity-20" />
            <Globe className="absolute -bottom-20 -right-20 text-white/5 w-96 h-96 blur-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}

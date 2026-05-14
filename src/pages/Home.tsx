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
      <section id="hero" className="relative h-[70vh] md:h-[85vh] flex items-center pt-12 md:pt-16 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={settings.heroImage}
            alt="Stainless Steel Industrial Background"
            className="w-full h-full object-cover brightness-[0.35]"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-steel-950 via-steel-950/60 to-transparent" />
        </div>
        <div className="w-full px-4 md:px-16 lg:px-24 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl text-left"
          >
            <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6 md:mb-8 tracking-tighter uppercase">
              {settings.heroTitle.includes('India') ? (
                <>The Backbone of <br className="hidden md:block" /><span className="text-primary">Industrial India</span></>
              ) : settings.heroTitle}
            </h1>
            <p className="text-[10px] md:text-lg text-steel-200 mb-6 md:mb-8 font-medium max-w-lg leading-relaxed opacity-75">
              {settings.heroTagline}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/services" className="px-8 py-4 bg-primary text-white text-xs md:text-base font-bold rounded-xl hover:scale-105 transition-all flex items-center justify-center gap-3 shadow-2xl shadow-primary/30">
                Explore Inventory <ArrowRight size={18} />
              </Link>
              <Link to="/contact" className="px-8 py-4 border-2 border-white/20 text-white text-xs md:text-base font-bold rounded-xl hover:bg-white/10 transition-all text-center">
                Material Request
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section with Glassmorphism */}
      <section className="relative -mt-10 md:-mt-20 z-20 pb-16 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { icon: Shield, label: "Trusted Legacy", value: "25+ Years" },
                { icon: Award, label: "Global Partners", value: "100+" },
                { icon: Truck, label: "Supply Center", value: "Chennai Hub" },
                { icon: Globe, label: "Project Reach", value: "Pan-India" }
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 md:p-8 bg-white/95 backdrop-blur-xl border border-steel-100 rounded-[20px] md:rounded-[24px] shadow-xl text-left group hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-lg md:rounded-xl flex items-center justify-center mb-3 md:mb-4 group-hover:rotate-12 transition-transform shadow-lg shadow-primary/20">
                    <stat.icon size={18} />
                  </div>
                  <h3 className="text-xl md:text-3xl font-bold text-steel-950 mb-0.5 tracking-tighter">{stat.value}</h3>
                  <p className="text-steel-400 font-bold uppercase text-[7px] md:text-[9px] tracking-widest">{stat.label}</p>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* Core Strengths Section */}
      <section className="py-6 md:py-10 bg-white px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <span className="text-steel-400 font-bold tracking-widest uppercase text-[10px] md:text-xs mb-4 block">Unmatched Quality</span>
              <h2 className="text-2xl md:text-4xl font-bold text-steel-950 mb-6 md:mb-8 tracking-tight leading-tight">Why Industrial Leaders Choose Sidharth Steels</h2>
              <p className="text-steel-600 font-medium text-sm md:text-base mb-8 md:mb-10 leading-relaxed">
                We don't just supply metal; we provide the foundation for South India's infrastructure. Our rigorous selection process ensures every sheet and pipe exceeds international standards.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: Clock, title: "Just-In-Time", desc: "Express delivery across Tamil Nadu." },
                  { icon: CheckCircle2, title: "100% Traceable", desc: "All materials come with MTC." },
                  { icon: SettingsIcon, title: "Custom Sizing", desc: "Precision cutting and finishing." },
                  { icon: BarChart3, title: "Competitive Rates", desc: "Optimized direct mill sourcing." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-brand-red-50 rounded-lg flex items-center justify-center text-primary shadow-sm">
                      <item.icon size={16} />
                    </div>
                    <div>
                      <h4 className="font-bold text-steel-950 text-sm mb-0.5">{item.title}</h4>
                      <p className="text-steel-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
              <div className="relative pt-8 md:pt-12">
              <div className="aspect-square md:aspect-video bg-steel-950 rounded-[24px] overflow-hidden shadow-2xl max-w-[300px] md:max-w-md mx-auto lg:mx-0">
                <img 
                  src={p1} 
                  alt="Industrial Steel Manufacturing" 
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              {/* Floating badge */}
              <div className="absolute top-1/2 -translate-y-1/2 -right-2 md:-right-8 bg-white p-4 md:p-8 rounded-[24px] md:rounded-[40px] shadow-2xl border border-steel-100 max-w-[150px] md:max-w-[260px] z-20">
                <Package className="text-primary mb-2 md:mb-4" size={20} md:size={24} />
                <p className="text-[10px] md:text-sm font-bold text-steel-800 leading-snug italic">
                  "Sidharth Steels has consistently delivered precision materials for our chemical plant expansions."
                </p>
                <div className="mt-3 md:mt-4 pt-3 md:pt-4 border-t border-steel-50">
                   <p className="text-[8px] md:text-[10px] font-bold text-primary">SR. PROJECT MANAGER</p>
                   <p className="text-[10px] md:text-xs font-bold text-steel-950">Major Petrochem Corp</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Preview Grid */}
      <section className="py-6 md:py-10 bg-steel-950 text-white overflow-hidden relative px-4">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-8">
            <div className="max-w-xl">
              <span className="text-steel-400 font-bold tracking-widest uppercase text-[10px] mb-3 block">Product Catalog</span>
              <h2 className="text-2xl md:text-4xl font-bold mb-3 md:mb-5 tracking-tight">Material Portfolio</h2>
              <p className="text-steel-400 font-medium text-sm md:text-base italic leading-relaxed">
                South India's most comprehensive inventory of premium stainless steel grades.
              </p>
            </div>
            <Link to="/services" className="w-full md:w-auto px-6 py-3.5 bg-primary text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition-transform shadow-lg">
               Full Catalog <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.slice(0, 3).map((service, i) => (
              <motion.div 
                key={service.id}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group relative bg-steel-950/40 backdrop-blur-sm rounded-[20px] overflow-hidden border border-white/5 hover:border-white/20 transition-all duration-700 h-[300px] md:h-[320px]"
              >
                <div className="absolute inset-0 z-0">
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms] brightness-50 grayscale hover:grayscale-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-steel-950 via-steel-950/40 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                   <span className="text-steel-400 text-[8px] font-bold uppercase tracking-[0.2em] mb-2 block">Certified Product</span>
                   <h3 className="text-xl md:text-2xl font-bold mb-3 leading-tight">{service.title}</h3>
                   <p className="text-steel-300 text-xs mb-4 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500 overflow-hidden line-clamp-2">
                     {service.description}
                   </p>
                   <Link to="/services" className="w-10 h-10 md:w-12 md:h-12 bg-white text-steel-950 rounded-full flex items-center justify-center group-hover:w-full transition-all duration-500 font-bold overflow-hidden">
                      <span className="hidden group-hover:block whitespace-nowrap px-4 text-xs">View Specifications</span>
                      <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                   </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Abstract shapes */}
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-steel-800 rounded-full blur-3xl opacity-20" />
      </section>

      {/* Industries Section with Icons */}
      <section className="py-6 md:py-10 bg-white px-4">
        <div className="container-custom">
          <div className="text-left mb-6 md:mb-10">
             <span className="text-primary font-bold tracking-widest uppercase text-[10px] mb-3 block">Market Coverage</span>
             <h2 className="text-2xl md:text-4xl font-bold text-steel-950 mb-3 md:mb-5 tracking-tight uppercase">The Sectors We Empower</h2>
             <p className="text-steel-600 font-medium max-w-2xl text-sm md:text-base leading-relaxed">
               Engineered solutions for mission-critical operations across diverse industrial landscapes. 
             </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {INDUSTRIES_DETAILED.map((industry, i) => {
              const Icon = iconMap[industry.icon];
              return (
                <motion.div 
                  key={i}
                  viewport={{ once: true }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-white p-8 md:p-10 rounded-[32px] border border-steel-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-500 cursor-default group"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-red-50 text-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
                    <Icon size={24} />
                  </div>
                  <h3 className="text-xl font-bold text-steel-950 mb-3 tracking-tight">{industry.name}</h3>
                  <p className="text-steel-500 font-medium text-sm leading-relaxed">{industry.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="bg-steel-50 py-4 md:py-10 overflow-hidden px-2 md:px-4">
        <div className="container-custom">
           <div className="bg-steel-950 rounded-[32px] md:rounded-[40px] p-6 md:p-10 relative">
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center text-white">
                 <div>
                    <h2 className="text-2xl md:text-4xl font-bold mb-6 md:mb-8 leading-tight uppercase">Supply Chain <span className="text-steel-600 block md:inline">Excellence</span></h2>
                    <div className="space-y-6 md:space-y-8">
                       {[
                         { step: "01", title: "Global Sourcing", desc: "Materials directly from tier-1 global mills like Jindal and POSCO." },
                         { step: "02", title: "Quality Grading", desc: "Rigorous ultrasonic and chemical analysis at our Chennai facility." },
                         { step: "03", title: "Precision Processing", desc: "Custom slitting, cutting, and polishing based on drawings." }
                       ].map((item) => (
                         <div key={item.step} className="flex gap-4 md:gap-6 group">
                            <span className="text-xl md:text-3xl font-bold text-steel-800 transition-colors group-hover:text-primary">{item.step}</span>
                            <div>
                               <h4 className="text-sm md:text-lg font-bold mb-1 group-hover:text-primary transition-colors uppercase tracking-tight">{item.title}</h4>
                               <p className="text-steel-400 text-[10px] md:text-sm font-medium leading-relaxed">{item.desc}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
                 <div className="relative">
                    <div className="bg-steel-900 rounded-[24px] md:rounded-[32px] p-6 md:p-10 border border-white/5 shadow-2xl">
                       <Award className="text-primary mb-4 md:mb-6" size={32} md:size={40} />
                       <h3 className="text-lg md:text-2xl font-bold mb-3 md:mb-4 uppercase tracking-tighter">Zero-Defect Policy</h3>
                       <p className="text-steel-400 text-[10px] md:text-sm font-medium mb-6 md:mb-8 leading-relaxed italic">
                         "Our reputation is built on the precision of our products. In 25 years, we have maintained a 99.8% material acceptance rate for critical projects."
                       </p>
                        <Link to="/about" className="w-full md:w-auto text-center px-8 py-4 bg-primary text-white text-sm font-bold rounded-xl inline-block hover:scale-105 transition-transform shadow-lg shadow-primary/20">
                          Read More About Us
                       </Link>
                    </div>
                    {/* Decorative blurred circle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-steel-500 rounded-full blur-[120px] opacity-20 -z-10" />
                 </div>
              </div>
           </div>
        </div>
      </section>

      {/* Latest Blog Section */}
      <section className="py-6 md:py-10 bg-white px-4">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-6 md:mb-10 gap-6">
             <div className="max-w-xl">
                <span className="text-steel-400 font-bold tracking-widest uppercase text-[10px] mb-3 block">Knowledge Hub</span>
                <h2 className="text-2xl md:text-4xl font-bold text-steel-950 tracking-tight">Industrial Insights</h2>
             </div>
             <Link to="/blog" className="text-steel-950 font-bold flex items-center gap-2 group text-base md:text-lg">
                Full Learning Center <ArrowRight size={22} className="group-hover:translate-x-2 transition-transform" />
             </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {posts.map((post, i) => (
              <motion.div 
                key={post.id || post.slug}
                viewport={{ once: true }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[16/10] overflow-hidden rounded-[24px] mb-6 shadow-lg">
                   <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                </div>
                <div className="space-y-4 px-2">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-0.5 bg-steel-950" />
                    <span className="text-[10px] font-bold text-steel-400 uppercase tracking-widest">{post.category}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-steel-950 group-hover:text-steel-600 transition-colors leading-tight">{post.title}</h4>
                  <Link to={`/blog/${post.id || post.slug}`} className="inline-flex items-center gap-2 text-steel-900 font-bold text-sm pt-2 hover:gap-4 transition-all">
                    Full Article <ArrowRight size={14} />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-6 md:py-8 px-4 pb-12">
        <div className="container-custom">
          <div className="bg-steel-950 rounded-[32px] md:rounded-[40px] p-6 md:p-8 relative overflow-hidden group">
            <div className="relative z-10 max-w-2xl">
              <h2 className="text-2xl md:text-5xl font-bold text-white mb-4 md:mb-6 tracking-tight leading-tight">Start Your Industrial <br />Legacy Today</h2>
              <p className="text-steel-300 text-sm md:text-lg mb-6 md:mb-8 font-medium leading-relaxed opacity-80">
                Connect with our technical engineers for material selection and competitive bulk pricing. 
                Your partner in high-grade stainless steel.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="w-full sm:w-auto text-center px-6 md:px-10 py-3 md:py-4 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl">
                  Connect with Sales
                </Link>
                <a href="tel:+914422334455" className="w-full sm:w-auto text-center px-6 md:px-10 py-3 md:py-4 border-2 border-white/20 text-white font-bold rounded-xl hover:bg-white/10 transition-all flex items-center justify-center gap-2">
                  <Phone size={18} /> Instant Support
                </a>
              </div>
            </div>
            {/* Background Decorative element */}
            <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-steel-800/10 to-transparent skew-x-12 translate-x-1/4 group-hover:translate-x-0 transition-transform duration-[2000ms]" />
            <Globe className="absolute -bottom-20 -right-20 text-white/5 w-64 h-64 blur-sm" />
          </div>
        </div>
      </section>
    </div>
  );
}

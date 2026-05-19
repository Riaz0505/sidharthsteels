import { motion } from "motion/react";
import { BLOG_POSTS as STATIC_POSTS } from "../constants";
import { ArrowRight, Clock, User, Filter, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { dbService } from "../services/dbService";

export default function Blog() {
  const [posts, setPosts] = useState<any[]>(STATIC_POSTS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3000);

    async function loadPosts() {
      try {
        const dynamicPosts = await dbService.getCollection("posts", "createdAt");
        if (dynamicPosts && dynamicPosts.length > 0) {
          setPosts(dynamicPosts);
        } else {
          setPosts(STATIC_POSTS);
        }
      } catch (error) {
        setPosts(STATIC_POSTS);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    }
    loadPosts();
    return () => clearTimeout(timeout);
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-white">
      <Loader2 className="animate-spin text-primary" size={48} />
    </div>
  );

  const featuredPost = posts[0];

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Editorial Header Section */}
      <section id="blog-header" className="py-12 md:py-32 px-4 overflow-hidden relative bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8 mb-16 md:mb-32">
            <div className="max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-[11px] mb-6 md:mb-8 block"
              >
                Industrial Knowledge Hub
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-8xl font-black font-display text-steel-950 leading-[1] tracking-tighter"
              >
                Metal <span className="text-steel-300 font-light italic">insights</span> <br />
                & market report
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="pb-16 md:pb-40 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-16">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-[32px] md:rounded-[48px] overflow-hidden mb-6 md:mb-10 shadow-2xl relative">
                   <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-6 left-6 md:top-8 md:left-8">
                       <span className="px-4 py-2 md:px-5 md:py-2.5 bg-white/90 backdrop-blur-md rounded-xl text-[9px] md:text-[10px] font-black text-steel-950 uppercase tracking-widest shadow-xl">
                         {post.category}
                       </span>
                    </div>
                </div>
                <div className="px-2 flex-grow flex flex-col">
                  <div className="flex items-center gap-6 mb-6 text-[10px] font-black text-steel-400 uppercase tracking-widest">
                    <span className="flex items-center gap-2"><Clock size={14} className="text-primary" /> {post.date ? new Date(post.date).toLocaleDateString() : post.date}</span>
                    <span className="flex items-center gap-2"><User size={14} className="text-primary" /> {post.author || "Technical Expert"}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-steel-950 mb-6 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-steel-500 font-medium text-base md:text-lg leading-relaxed mb-10 line-clamp-3 opacity-80">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/blog/${post.id || post.slug}`} className="text-steel-950 font-black text-sm md:text-base uppercase tracking-widest flex items-center gap-3 group-hover:gap-5 transition-all border-b-2 border-primary/20 pb-1 hover:border-primary">
                      Full Article <ArrowRight size={20} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

          {/* Newsletter / CTA Section within Grid */}
          <div className="mt-32">
            <div className="bg-steel-950 rounded-[64px] p-12 md:p-24 text-center relative overflow-hidden">
               <div className="relative z-10 max-w-2xl mx-auto">
                  <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">Stay ahead of the curve.</h2>
                  <p className="text-steel-400 text-lg font-medium mb-10 leading-relaxed italic">
                    Weekly technical updates and material pricing reports delivered to your inbox.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                     <input 
                       type="email" 
                       placeholder="Enter your email" 
                       className="flex-grow px-8 py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-medium focus:outline-none focus:border-white/30 transition-all"
                     />
                     <button className="px-10 py-5 bg-white text-steel-950 font-bold rounded-2xl hover:scale-105 transition-transform shrink-0">
                       Subscribe Now
                     </button>
                  </div>
               </div>
               <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white rounded-full" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white rounded-full opacity-40" />
               </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

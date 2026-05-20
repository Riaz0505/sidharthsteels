import { motion } from "motion/react";
import { BLOG_POSTS as STATIC_POSTS } from "../constants";
import { ArrowRight, Clock, User, Filter, Loader2, Phone } from "lucide-react";
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
      <section id="blog-header" className="py-8 md:py-12 px-4 overflow-hidden relative bg-white">
        <div className="container-custom">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-6 mb-6 md:mb-10">
            <div className="max-w-4xl">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="text-primary font-bold tracking-[0.3em] uppercase text-[10px] md:text-sm mb-4 md:mb-8 block"
              >
                Industrial Knowledge Hub
              </motion.span>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-4xl md:text-6xl lg:text-8xl font-black font-display text-steel-950 leading-[0.9] tracking-tighter"
              >
                Metal Insights <br />
                & Market Report
              </motion.h1>
            </div>
          </div>
        </div>
      </section>

      {/* Main Grid Section */}
      <section className="pb-10 md:pb-20 px-4">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {posts.map((post, i) => (
              <motion.article 
                key={post.id || post.slug}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group cursor-pointer"
              >
                <div className="aspect-[16/10] rounded-[24px] md:rounded-[32px] overflow-hidden mb-4 md:mb-6 shadow-xl relative">
                   <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[2000ms]"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute top-4 left-4 md:top-6 md:left-6">
                       <span className="px-3 py-1.5 md:px-4 md:py-2 bg-white/90 backdrop-blur-md rounded-lg text-[8px] md:text-[9px] font-black text-steel-950 uppercase tracking-widest shadow-lg">
                         {post.category}
                       </span>
                    </div>
                </div>
                <div className="px-1 flex-grow flex flex-col">
                  <div className="flex items-center gap-4 mb-3 text-[9px] font-black text-steel-400 uppercase tracking-widest">
                    <span className="flex items-center gap-1.5"><Clock size={12} className="text-primary" /> {post.date ? new Date(post.date).toLocaleDateString() : post.date}</span>
                    <span className="flex items-center gap-1.5"><User size={12} className="text-primary" /> {post.author || "Technical"}</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-black text-steel-950 mb-3 tracking-tight leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-steel-500 font-medium text-sm md:text-base leading-relaxed mb-6 line-clamp-2 opacity-80">
                    {post.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link to={`/blog/${post.id || post.slug}`} className="text-steel-950 font-black text-xs md:text-sm uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all border-b-2 border-primary/20 pb-1 hover:border-primary w-fit">
                      Read More <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}

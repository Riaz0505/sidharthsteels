import { useParams, Link } from "react-router-dom";
import { motion } from "motion/react";
import { BLOG_POSTS as STATIC_POSTS} from "../constants";
import { Calendar, User, ArrowLeft, Tag, Loader2 } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { useEffect, useState } from "react";
import { dbService } from "../services/dbService";

export default function BlogPost() {
  const { id } = useParams();
  const [post, setPost] = useState<any>(STATIC_POSTS.find(p => p.id === Number(id) || p.slug === id) || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) setLoading(false);
    }, 3500);

    async function loadPost() {
      try {
        // Try dynamic first
        if (id) {
          const dynamicPost = await dbService.getDocument("posts", id);
          if (dynamicPost) {
            setPost(dynamicPost);
          } else {
            // Check by slug or static
            const staticPost = STATIC_POSTS.find(p => p.id === Number(id) || p.slug === id);
            setPost(staticPost || null);
          }
        }
      } catch (error) {
        const staticPost = STATIC_POSTS.find(p => p.id === Number(id) || p.slug === id);
        setPost(staticPost || null);
      } finally {
        setLoading(false);
        clearTimeout(timeout);
      }
    }
    loadPost();
    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) return (
    <div className="pt-24 min-h-screen text-center flex flex-col items-center justify-center">
      <Loader2 className="animate-spin text-primary" size={48} />
      <p className="mt-4 text-steel-400 font-bold uppercase tracking-widest text-[10px]">Loading Article...</p>
    </div>
  );

  if (!post) {
    return (
      <div className="pt-24 min-h-screen text-center">
        <h1 className="text-4xl font-bold">Post Not Found</h1>
        <Link to="/blog" className="text-steel-600 hover:underline mt-4 inline-block">Back to Blog</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Hero Section - Article Title */}
      <section id="blog-post-header" className="py-4 md:py-6 px-4 bg-white relative">
        <div className="container-custom max-w-5xl">
          <Link to="/blog" className="flex items-center gap-2 text-steel-400 font-bold mb-4 hover:text-steel-950 transition-colors uppercase text-[10px] tracking-[0.2em] group w-fit">
            <ArrowLeft size={16} className="group-hover:-translate-x-2 transition-transform" /> Return to Insights
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-steel-100 pb-6 md:pb-8">
            <div className="max-w-3xl">
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 mb-4"
              >
                <div className="w-8 h-0.5 bg-steel-950" />
                <span className="text-[10px] font-bold text-steel-500 uppercase tracking-widest">{post.category}</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-3xl md:text-5xl lg:text-6xl font-black font-display text-steel-950 mb-0 leading-[1.1] tracking-tight"
              >
                {post.title}
              </motion.h1>
            </div>
            <div className="shrink-0 space-y-1">
              <p className="text-[9px] font-bold text-steel-400 uppercase tracking-widest">Published On</p>
              <p className="text-base font-bold text-steel-950">{post.date ? (post.date.includes('-') ? new Date(post.date).toLocaleDateString() : post.date) : ""}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image - Immersive Width */}
      <div className="bg-white pb-6 md:pb-12">
        <div className="container-custom max-w-7xl px-4">
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="relative rounded-[24px] md:rounded-[40px] overflow-hidden shadow-xl h-[250px] md:h-[500px]"
          >
            <img 
              src={post.image} 
              alt={post.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 border-[8px] md:border-[12px] border-white/10 rounded-[24px] md:rounded-[40px] pointer-events-none" />
          </motion.div>
        </div>
      </div>

      {/* Article Content - Clean Reading Experience */}
      <section className="bg-[#F8F9FA] -mt-10 pb-10 px-4">
        <div className="container-custom max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-10 md:gap-16">
            <aside className="lg:w-1/4 order-last lg:order-first">
               <div className="sticky top-24 space-y-8">
                  <div className="bg-white p-6 md:p-8 rounded-[32px] border border-steel-100 shadow-sm">
                    <h4 className="text-lg font-bold font-display text-steel-950 mb-4">Article Author</h4>
                    <div className="flex items-center gap-4 mb-6">
                       <div className="w-12 h-12 bg-steel-100 rounded-xl flex items-center justify-center text-steel-950 font-bold text-lg">
                          {post.author ? post.author.substring(0, 2).toUpperCase() : "SE"}
                       </div>
                       <div>
                          <p className="text-sm font-bold text-steel-950">{post.author || "Sidharth Expert"}</p>
                          <p className="text-[10px] text-steel-400 font-bold uppercase tracking-widest">Tech Director</p>
                       </div>
                    </div>
                    <p className="text-xs text-steel-500 font-medium leading-relaxed italic">
                      "Bringing 40 years of industrial steel expertise to help our partners succeed."
                    </p>
                  </div>

                  <div className="px-6">
                     <h4 className="text-[10px] font-bold text-steel-400 uppercase tracking-widest mb-4">Key Takeaways</h4>
                     <ul className="space-y-3">
                        {[
                          "Material traceability is crucial",
                          "Certified grades reduce failure",
                          "Precision processing saves cost"
                        ].map((item, i) => (
                          <li key={i} className="flex gap-3 text-xs font-bold text-steel-950">
                             <span className="text-steel-200">0{i+1}</span>
                             {item}
                          </li>
                        ))}
                     </ul>
                  </div>
               </div>
            </aside>

            <article className="lg:w-3/4 bg-white p-6 md:p-12 lg:p-16 rounded-[24px] md:rounded-[48px] lg:rounded-[64px] shadow-sm border border-steel-100 min-h-[400px]">
              <div className="prose-blog text-sm md:text-base">
                <ReactMarkdown>{post.content.trim()}</ReactMarkdown>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Newsletter Footer */}
      <section className="bg-white py-10 border-t border-steel-100">
        <div className="container-custom text-center max-w-3xl">
          <span className="text-steel-400 font-bold tracking-[0.2em] uppercase text-[9px] mb-4 block">Continue Learning</span>
          <h2 className="text-2xl md:text-3xl font-bold text-steel-950 mb-6 leading-tight">Expert consultation is <br />just a message away.</h2>
          <Link to="/contact" className="inline-block px-8 py-4 bg-primary text-white font-bold rounded-xl hover:scale-105 transition-transform shadow-2xl text-sm">
            Technical Support Request
          </Link>
        </div>
      </section>
    </div>
  );
}

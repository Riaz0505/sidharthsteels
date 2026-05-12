import { useState, useEffect } from "react";
import { dbService } from "../../services/dbService";
import { Plus, Edit2, Trash2, X, Check, Loader2 } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    author: "Admin",
    category: "Industrial"
  });

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    setLoading(true);
    const data = await dbService.getCollection("posts", "createdAt");
    setPosts(data || []);
    setLoading(false);
  };

  const handleEdit = (post: any) => {
    setCurrentPost(post);
    setFormData({
      title: post.title || "",
      slug: post.slug || "",
      excerpt: post.excerpt || "",
      content: post.content || "",
      image: post.image || "",
      author: post.author || "Admin",
      category: post.category || "Industrial"
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      await dbService.deleteDocument("posts", id);
      fetchPosts();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (currentPost) {
        await dbService.updateDocument("posts", currentPost.id, formData);
      } else {
        await dbService.createDocument("posts", {
          ...formData,
          date: new Date().toISOString()
        });
      }
      setIsEditing(false);
      setCurrentPost(null);
      setFormData({ title: "", slug: "", excerpt: "", content: "", image: "", author: "Admin", category: "Industrial" });
      fetchPosts();
    } catch (error) {
      console.error(error);
      alert("Error saving post. Check console.");
    }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-steel-900">Manage Blog Posts</h2>
        <button 
          onClick={() => {
            setIsEditing(true);
            setCurrentPost(null);
            setFormData({ title: "", slug: "", excerpt: "", content: "", image: "", author: "Admin", category: "Industrial" });
          }}
          className="flex items-center gap-2 px-6 py-3 bg-steel-950 text-white rounded-xl font-bold hover:bg-steel-800 transition-all"
        >
          <Plus size={18} /> New Post
        </button>
      </div>

      <AnimatePresence>
        {isEditing && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="bg-steel-50 p-6 rounded-[32px] border border-steel-200"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-steel-500 uppercase">Title</label>
                  <input 
                    type="text" 
                    required
                    value={formData.title}
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                    placeholder="Enter post title"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-steel-500 uppercase">Slug</label>
                  <input 
                    type="text" 
                    required
                    value={formData.slug}
                    onChange={e => setFormData({...formData, slug: e.target.value})}
                    className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                    placeholder="blog-post-url-slug"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Image URL</label>
                <input 
                  type="text" 
                  required
                  value={formData.image}
                  onChange={e => setFormData({...formData, image: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                  placeholder="https://images.unsplash.com/..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Excerpt</label>
                <textarea 
                  required
                  value={formData.excerpt}
                  onChange={e => setFormData({...formData, excerpt: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none h-24"
                  placeholder="Short description for preview..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Content (Markdown)</label>
                <textarea 
                  required
                  value={formData.content}
                  onChange={e => setFormData({...formData, content: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none h-64 font-mono"
                  placeholder="# Header Content..."
                />
              </div>

              <div className="flex justify-end gap-4">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 bg-white border border-steel-200 text-steel-600 rounded-xl font-bold hover:bg-steel-50"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={loading}
                  className="px-8 py-3 bg-steel-950 text-white rounded-xl font-bold flex items-center gap-2 hover:bg-steel-800 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="animate-spin" size={18} /> : <Check size={18} />}
                  {currentPost ? "Update Post" : "Publish Post"}
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="grid gap-4">
        {loading && !isEditing ? (
          <div className="flex justify-center py-12 text-steel-400">
            <Loader2 className="animate-spin" size={32} />
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center py-20 bg-white border border-steel-100 rounded-[32px]">
            <p className="text-steel-400 font-medium italic">No blog posts found. Create your first one!</p>
          </div>
        ) : (
          posts.map(post => (
            <div key={post.id} className="bg-white p-6 rounded-2xl border border-steel-100 flex items-center justify-between group hover:shadow-lg transition-all">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shadow-sm">
                  <img src={post.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="font-bold text-steel-900">{post.title}</h3>
                  <p className="text-[10px] text-steel-400 font-bold uppercase tracking-widest">{post.category} • {post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => handleEdit(post)}
                  className="p-3 bg-steel-50 text-steel-600 rounded-xl hover:bg-steel-100 transition-colors"
                >
                  <Edit2 size={18} />
                </button>
                <button 
                  onClick={() => handleDelete(post.id)}
                  className="p-3 bg-red-50 text-red-600 rounded-xl hover:bg-red-100 transition-colors"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

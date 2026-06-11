import { useState, useEffect } from "react";
import { dbService } from "../../services/dbService";
import { Plus, Edit2, Trash2, X, Check, Loader2, Upload, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function BlogManagement() {
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPost, setCurrentPost] = useState<any>(null);
  const [uploadingImage, setUploadingImage] = useState(false);
  const [uploadError, setUploadError] = useState("");
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Image size must be less than 5MB");
      return;
    }

    setUploadingImage(true);
    setUploadError("");

    const data = new FormData();
    data.append("image", file);

    try {
      const response = await fetch("/upload.php", {
        method: "POST",
        body: data,
      });

      if (!response.ok) {
        throw new Error("Upload failed. Server in maintenance mode or missing upload.php");
      }

      const result = await response.json();
      if (result.success && result.url) {
        setFormData(prev => ({ ...prev, image: result.url }));
      } else {
        throw new Error(result.error || "Upload rejected by the server");
      }
    } catch (err: any) {
      console.error(err);
      setUploadError("Failed to upload. Make sure upload.php is uploaded inside cPanel's public_html folder.");
    } finally {
      setUploadingImage(false);
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
      setUploadError("");
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

              <div className="space-y-4 bg-white p-6 rounded-2xl border border-steel-200">
                <div>
                  <label className="text-xs font-bold text-steel-500 uppercase block mb-2">Blog Image Cover</label>
                  <p className="text-xs text-steel-400 mb-4">You can paste an external image URL below, or upload an image file directly to your hosting server (cPanel Storage).</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 items-start">
                  {/* Option A: Paste URL */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-steel-600">Option A: Image URL Link</label>
                    <input 
                      type="text" 
                      required
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
                      className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none text-sm"
                      placeholder="https://images.unsplash.com/..."
                    />
                  </div>

                  {/* Option B: Local File upload */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-steel-600 block mb-1">Option B: Upload Direct to cPanel</label>
                    <div className="flex items-center gap-3">
                      <label className="flex items-center gap-2 px-5 py-3.5 bg-steel-950 hover:bg-steel-800 text-white rounded-xl font-bold text-sm cursor-pointer transition-colors shadow-sm">
                        <Upload size={16} />
                        {uploadingImage ? "Uploading..." : "Choose Image File"}
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handleImageUpload} 
                          disabled={uploadingImage}
                          className="hidden" 
                        />
                      </label>
                      {uploadingImage && <Loader2 className="animate-spin text-steel-600" size={18} />}
                      {formData.image && !uploadingImage && (
                        <span className="text-xs text-green-600 font-bold flex items-center gap-1.5 bg-green-50 px-2.5 py-1.5 rounded-lg border border-green-100">
                          <Check size={14} /> Image Selected
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {uploadError && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-100 text-red-600 text-xs rounded-xl font-medium">
                    <AlertCircle size={14} />
                    <span>{uploadError}</span>
                  </div>
                )}

                {formData.image && (
                  <div className="mt-2 text-xs text-steel-500 font-mono flex items-center gap-2 bg-steel-50 p-2.5 rounded-lg border border-steel-100 overflow-hidden truncate">
                    <span className="font-bold text-steel-700">Active Path:</span>
                    <span className="truncate">{formData.image}</span>
                  </div>
                )}
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

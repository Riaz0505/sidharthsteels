import { useEffect, useState } from "react";
import { auth, googleProvider } from "../lib/firebase";
import { signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { LogOut, LogIn, FileText, Settings as SettingsIcon, ShieldCheck, Key, Copy, Check } from "lucide-react";
import { dbService } from "../services/dbService";
import BlogManagement from "../components/Admin/BlogManagement";
import SettingsManagement from "../components/Admin/SettingsManagement";
import { cn } from "../lib/utils";

export default function AdminPanel() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("posts");
  const [copying, setCopying] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (u) => {
      setUser(u);
      if (u) {
        try {
          const adminDoc = await dbService.getDocument("admins", u.uid);
          setIsAdmin(!!adminDoc);
        } catch (e) {
          console.error("Admin check failed", e);
          setIsAdmin(false);
        }
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handleLogout = () => signOut(auth);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopying(true);
    setTimeout(() => setCopying(false), 2000);
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-steel-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-white font-bold tracking-widest text-xs uppercase">Authorizing Access...</p>
      </div>
    </div>
  );

  if (!user) {
    return (
      <div className="pt-20 min-h-screen container-custom flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-steel-100 text-center max-w-md w-full">
          <div className="w-20 h-20 bg-steel-50 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-inner">
             <ShieldCheck size={40} className="text-steel-950" />
          </div>
          <h1 className="text-3xl font-bold mb-4">Command Center</h1>
          <p className="text-steel-500 mb-10 font-medium leading-relaxed">Secure gateway for managing industrial content, blog insights, and site configurations.</p>
          <button 
            onClick={handleLogin}
            className="w-full py-5 bg-steel-950 text-white font-bold rounded-2xl flex items-center justify-center gap-3 hover:bg-steel-800 transition-all shadow-xl shadow-steel-950/20"
          >
            <LogIn size={20} /> Secure Sign-In
          </button>
          <p className="mt-8 text-[10px] font-bold text-steel-400 uppercase tracking-widest">Authorized Personnel Only</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="pt-20 min-h-screen container-custom flex flex-col items-center justify-center">
        <div className="bg-white p-12 rounded-[48px] shadow-2xl border border-steel-100 text-center max-w-lg w-full">
          <div className="w-20 h-20 bg-orange-50 rounded-3xl flex items-center justify-center mx-auto mb-8">
             <Key size={40} className="text-orange-500" />
          </div>
          <h1 className="text-2xl font-bold mb-4">Admin privileges required</h1>
          <p className="text-steel-500 mb-8 font-medium">To activate your admin access, copy your Unique ID (UID) below and add it to the <span className="font-bold text-steel-950">admins</span> collection in your System Database Console.</p>
          
          <div className="bg-steel-50 p-4 rounded-xl border border-steel-100 flex items-center justify-between gap-4 mb-8">
            <code className="text-xs font-mono text-steel-700 truncate">{user.uid}</code>
            <button 
              onClick={() => copyToClipboard(user.uid)}
              className="p-2 hover:bg-steel-200 rounded-lg transition-colors text-steel-500"
              title="Copy UID"
            >
              {copying ? <Check size={16} className="text-green-500" /> : <Copy size={16} />}
            </button>
          </div>

          <div className="space-y-4">
             <button onClick={handleLogout} className="w-full py-4 bg-steel-950 text-white font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-steel-800 transition-all">
                <LogOut size={18} /> Sign Out
             </button>
             <button 
               onClick={() => window.location.reload()} 
               className="w-full py-4 border border-steel-200 text-steel-600 font-bold rounded-xl hover:bg-steel-50 transition-all"
             >
                I have added my UID, Reload
             </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-24 min-h-screen bg-steel-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-72 bg-white border-r border-steel-200 flex flex-col sticky top-24 h-fit md:h-[calc(100vh-6rem)]">
        <div className="p-8 border-b border-steel-100">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 rounded-xl bg-steel-950 flex items-center justify-center text-white text-xs font-black">SS</div>
             <div>
                <h2 className="text-sm font-bold text-steel-900 leading-none">Control Panel</h2>
                <span className="text-[10px] text-steel-400 font-bold uppercase tracking-widest leading-none">v1.2.0</span>
             </div>
          </div>
        </div>
        <nav className="flex-grow p-4 space-y-2">
          {[
            { id: "posts", name: "Blog Repository", icon: FileText },
            { id: "settings", name: "System Settings", icon: SettingsIcon },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={cn(
                "w-full flex items-center gap-3 p-4 rounded-xl font-bold text-sm transition-all",
                activeTab === item.id ? "bg-steel-950 text-white shadow-lg shadow-steel-950/20" : "text-steel-500 hover:bg-steel-50"
              )}
            >
              <item.icon size={18} /> {item.name}
            </button>
          ))}
        </nav>
        <div className="p-6 border-t border-steel-100 bg-steel-50/30">
          <div className="flex items-center gap-3 mb-6 bg-white p-3 rounded-2xl border border-steel-100 shadow-sm">
            <img src={user.photoURL} alt="User" className="w-10 h-10 rounded-full border-2 border-steel-50" />
            <div className="overflow-hidden">
              <p className="text-[10px] font-bold text-steel-900 truncate leading-tight">{user.displayName}</p>
              <p className="text-[9px] text-steel-400 truncate leading-tight font-medium">{user.email}</p>
            </div>
          </div>
          <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 font-bold rounded-xl hover:bg-red-100 transition-all text-xs">
            <LogOut size={14} /> End Session
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-6 md:p-12 overflow-y-auto max-w-5xl">
        <header className="mb-10">
          <span className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1 block">Administrative Module</span>
          <h1 className="text-4xl font-bold text-steel-950 capitalize">{activeTab.replace("-", " ")}</h1>
        </header>

        <section className="bg-white rounded-[40px] p-8 border border-steel-100 shadow-sm min-h-[600px]">
          {activeTab === "posts" && <BlogManagement />}
          {activeTab === "settings" && <SettingsManagement />}
        </section>
      </main>
    </div>
  );
}

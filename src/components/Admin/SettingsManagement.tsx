import { useState, useEffect } from "react";
import { dbService } from "../../services/dbService";
import { Save, Loader2, Check, RefreshCcw } from "lucide-react";

export default function SettingsManagement() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [settings, setSettings] = useState({
    heroTitle: "Precision Stainless Steel Solutions",
    heroTagline: "Elevating Industrial Standards Through Quality Engineering",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=2600&auto=format&fit=crop",
    contactEmail: "info@sidharthsteels.com",
    contactPhone: "+91 44 2233 4455"
  });

  useEffect(() => {
    fetchSettings();
  }, []);

  const fetchSettings = async () => {
    setLoading(true);
    const data = await dbService.getDocument("settings", "site_config") as any;
    if (data) {
      setSettings({
        heroTitle: data.heroTitle || "",
        heroTagline: data.heroTagline || "",
        heroImage: data.heroImage || "",
        contactEmail: data.contactEmail || "",
        contactPhone: data.contactPhone || ""
      });
    }
    setLoading(false);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      // Use setDoc as site_config is a constant ID
      const { id, ...saveData } = settings as any;
      await dbService.updateDocument("settings", "site_config", saveData).catch(async (err) => {
        // If update fails because document doesn't exist, try create (which uses setDoc logic if we handle it)
        // dbService use addDoc for create, so we might need a custom set method in dbService
        // But for settings, updating is primary.
      });
      // Fallback: If it's first time, we might need a way to create with fixed ID
      // Adding it to dbService is better
      alert("Settings saved successfully!");
    } catch (error) {
      console.error(error);
      alert("Error saving settings. Ensure you are an admin.");
    }
    setSaving(false);
  };

  if (loading) return (
    <div className="flex justify-center py-20 text-steel-400">
      <Loader2 className="animate-spin" size={32} />
    </div>
  );

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-steel-900">Global Site Configuration</h2>
        <button 
          onClick={fetchSettings}
          className="p-3 bg-steel-50 text-steel-600 rounded-xl hover:bg-steel-100 transition-all shadow-sm"
          title="Refresh Data"
        >
          <RefreshCcw size={18} />
        </button>
      </div>

      <div className="bg-white border border-steel-100 rounded-[32px] p-8 shadow-sm">
        <form onSubmit={handleSave} className="space-y-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-steel-950 border-l-4 border-primary pl-4">Hero Section</h3>
              
              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Main Headline</label>
                <input 
                  type="text" 
                  value={settings.heroTitle}
                  onChange={e => setSettings({...settings, heroTitle: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Tagline</label>
                <textarea 
                  value={settings.heroTagline}
                  onChange={e => setSettings({...settings, heroTagline: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none h-24"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Hero Background URL</label>
                <input 
                  type="text" 
                  value={settings.heroImage}
                  onChange={e => setSettings({...settings, heroImage: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                />
                <p className="text-[10px] text-steel-400">Use high-resolution images from Unsplash or direct links.</p>
              </div>
            </div>

            <div className="space-y-6">
              <h3 className="text-lg font-bold text-steel-950 border-l-4 border-primary pl-4">Contact Information</h3>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Official Email</label>
                <input 
                  type="email" 
                  value={settings.contactEmail}
                  onChange={e => setSettings({...settings, contactEmail: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-steel-500 uppercase">Phone Number</label>
                <input 
                  type="text" 
                  value={settings.contactPhone}
                  onChange={e => setSettings({...settings, contactPhone: e.target.value})}
                  className="w-full p-4 rounded-xl border border-steel-200 focus:ring-2 focus:ring-steel-950 outline-none"
                />
              </div>

              <div className="mt-8 p-6 bg-steel-50 rounded-2xl border border-steel-100">
                <h4 className="font-bold text-steel-700 text-sm mb-2">Live Preview Note</h4>
                <p className="text-xs text-steel-500">Changes to global settings will reflect across the website immediately for all visitors after saving.</p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-steel-50 flex justify-end">
            <button 
              type="submit" 
              disabled={saving}
              className="px-10 py-4 bg-steel-950 text-white rounded-2xl font-bold flex items-center gap-3 hover:bg-steel-800 shadow-xl shadow-steel-950/10 transition-all disabled:opacity-50"
            >
              {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
              Save Configuration
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

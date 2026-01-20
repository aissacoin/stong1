import React, { useState, useEffect } from 'react';
import { Network, Plus, Trash2, Download, Copy, Check, ShieldCheck, Zap, Info, Globe, FileCode, ArrowRight, Calendar, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SitemapURL {
  id: string;
  loc: string;
  lastmod: { y: number, m: number, d: number };
  changefreq: string;
  priority: string;
}

export const SitemapGenerator: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['sitemap-gen'] || { internal: { addNode: 'Add Node', export: 'Export' } };
  
  const now = new Date();
  const [urls, setUrls] = useState<SitemapURL[]>([
    { 
      id: '1', 
      loc: 'https://www.example.com/', 
      lastmod: { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }, 
      changefreq: 'daily', 
      priority: '1.0' 
    }
  ]);
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);

  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const generateSitemap = () => {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
    xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
    urls.forEach(url => {
      if (url.loc.trim()) {
        const formattedDate = `${url.lastmod.y}-${String(url.lastmod.m).padStart(2, '0')}-${String(url.lastmod.d).padStart(2, '0')}`;
        xml += `  <url>\n    <loc>${url.loc.trim()}</loc>\n    <lastmod>${toStd(formattedDate)}</lastmod>\n    <changefreq>${url.changefreq}</changefreq>\n    <priority>${toStd(url.priority)}</priority>\n  </url>\n`;
      }
    });
    xml += `</urlset>`;
    setOutput(xml);
  };

  useEffect(() => { generateSitemap(); }, [urls]);

  const addUrl = () => {
    setUrls([...urls, { id: Date.now().toString(), loc: '', lastmod: { y: now.getFullYear(), m: now.getMonth() + 1, d: now.getDate() }, changefreq: 'weekly', priority: '0.5' }]);
  };

  const removeUrl = (id: string) => { if (urls.length > 1) setUrls(urls.filter(u => u.id !== id)); };

  const updateUrl = (id: string, field: keyof SitemapURL, value: any) => {
    setUrls(urls.map(u => u.id === id ? { ...u, [field]: value } : u));
  };

  const adjustDate = (id: string, part: 'y' | 'm' | 'd', amount: number) => {
    setUrls(urls.map(u => {
      if (u.id === id) {
        const newDate = { ...u.lastmod };
        if (part === 'y') newDate.y += amount;
        if (part === 'm') { newDate.m += amount; if (newDate.m > 12) { newDate.m = 1; newDate.y += 1; } if (newDate.m < 1) { newDate.m = 12; newDate.y -= 1; } }
        if (part === 'd') { const daysInMonth = new Date(newDate.y, newDate.m, 0).getDate(); newDate.d += amount; if (newDate.d > daysInMonth) newDate.d = 1; if (newDate.d < 1) newDate.d = daysInMonth; }
        return { ...u, lastmod: newDate };
      }
      return u;
    }));
  };

  return (
    <div className="space-y-12" dir={t.dir}>
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Network size={28} /></div>
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{isAr ? 'مهندس خرائط المواقع' : 'Sitemap Architect'}</h2>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'توليد ملفات الفهرسة القياسية' : 'Standard Indexing Engine'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
              {urls.map((url) => (
                <div key={url.id} className="bg-white/5 border border-white/5 rounded-[2rem] p-6 space-y-4">
                  <div className="flex gap-4">
                    <input value={url.loc} onChange={(e) => updateUrl(url.id, 'loc', e.target.value)} placeholder="https://domain.com/page" className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-xs" />
                    <button onClick={() => removeUrl(url.id)} className="text-rose-500"><Trash2 size={16}/></button>
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex flex-col items-center bg-black/40 p-2 rounded-xl border border-white/5">
                      <span className="text-[8px] uppercase text-gray-600 mb-1">{isAr ? 'سنة' : 'Year'}</span>
                      <div className="flex items-center gap-2">
                        <button onClick={() => adjustDate(url.id, 'y', 1)} className="text-[#D4AF37]"><Plus size={12}/></button>
                        <span className="text-xs font-black text-white">{toStd(url.lastmod.y)}</span>
                        <button onClick={() => adjustDate(url.id, 'y', -1)} className="text-[#D4AF37]"><Minus size={12}/></button>
                      </div>
                    </div>
                    {/* Simplified month and day view for mobile/compactness */}
                    <div className="col-span-2 flex items-center justify-center bg-black/40 rounded-xl border border-white/5 text-[10px] font-black text-[#D4AF37]">
                       {toStd(url.lastmod.y)}-{toStd(url.lastmod.m)}-{toStd(url.lastmod.d)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={addUrl} className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:text-[#D4AF37] transition-all">
              <Plus size={16}/> <span className="text-[10px] font-black uppercase">{langT.internal.addNode}</span>
            </button>
          </div>

          <div className="lg:col-span-5 flex flex-col h-full space-y-4">
             <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-8 overflow-hidden group shadow-inner min-h-[400px]">
               <textarea readOnly value={output} className="relative z-10 w-full h-full bg-transparent border-0 text-emerald-400 font-mono text-[10px] leading-relaxed outline-none resize-none" />
             </div>
             <div className="flex gap-4">
               <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="flex-grow bg-white/5 text-white py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest border border-white/10 hover:bg-white/10 transition-all">
                 {copied ? t.common.copied : t.common.copy}
               </button>
               <button onClick={generateSitemap} className="px-10 bg-[#D4AF37] text-black py-4 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all">
                 {langT.internal.export}
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
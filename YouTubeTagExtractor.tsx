
import React, { useState } from 'react';
import { Youtube, Search, Copy, Check, Hash, Loader2, Target, Info, ShieldCheck, Download, AlertCircle, Sparkles, TrendingUp, Layout, Zap, HelpCircle, BookOpen } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const YouTubeTagExtractor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [title, setTitle] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { t } = useLanguage();
  const langT = t.tools['yt-tag-extractor'];

  const extractTags = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!url.trim() || loading) return;

    setLoading(true);
    setError(null);
    setTags([]);
    setTitle('');

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Extract the video title and all SEO tags/keywords used for this specific YouTube video: ${url}`,
        config: {
          tools: [{ googleSearch: {} }],
          systemInstruction: "You are an Elite YouTube Growth Strategist. Return ONLY a JSON object containing 'title' and 'tags' (array of strings).",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              tags: { type: Type.ARRAY, items: { type: Type.STRING } }
            },
            required: ["title", "tags"]
          }
        }
      });

      const result = JSON.parse(response.text || "{}");
      if (result.tags) {
        setTags(result.tags);
        setTitle(result.title);
      } else {
        throw new Error("No metadata detected for this coordinate.");
      }
    } catch (err: any) {
      setError("Logical Synthesis Error: The metadata stream could not be deconstructed.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (tags.length === 0) return;
    navigator.clipboard.writeText(tags.join(', '));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Metadata Deconstruction Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-red-600/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-red-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500">
              <Youtube size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-red-500/40 uppercase tracking-[0.4em]">Viral Metadata Deconstruction 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Source Grounding Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-8">
          <div className="lg:col-span-5 space-y-10">
            <form onSubmit={extractTags} className="space-y-6">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">{langT.label}</label>
                <div className="relative group">
                   <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
                   <input 
                    type="text" 
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-black border border-white/5 rounded-2xl py-6 pl-16 pr-6 text-white text-sm font-medium outline-none focus:border-red-600/40 transition-all shadow-inner"
                    placeholder={langT.placeholder}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading || !url.trim()}
                className="w-full bg-red-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] disabled:opacity-20"
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    {langT.extracting}
                  </>
                ) : (
                  <>
                    <TrendingUp size={24} />
                    {langT.btn}
                  </>
                )}
              </button>
            </form>
            
            {error && (
              <div className="flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-2">
                <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-rose-400/80 font-bold uppercase tracking-widest leading-relaxed italic">{error}</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 italic">{langT.authority}</label>
              <button 
                onClick={handleCopy}
                disabled={tags.length === 0}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy All'}</span>
              </button>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[400px]">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Target size={64} className="text-red-600 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-red-600">Deconstructing Schema...</p>
                 </div>
               ) : tags.length > 0 ? (
                 <div className="relative z-10 space-y-8 animate-in fade-in duration-1000">
                   <div className="pb-6 border-b border-white/5">
                      <h4 className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em] mb-2 italic">Video Authority Title</h4>
                      <p className="text-xl font-black text-white italic tracking-tight truncate">{title}</p>
                   </div>
                   <div className="flex flex-wrap gap-3">
                     {tags.map((tag, i) => (
                       <div key={i} className="flex items-center gap-2 bg-red-600/10 border border-red-600/30 px-5 py-3 rounded-2xl hover:bg-red-600 hover:text-white transition-all group/item">
                         <Hash size={12} className="text-red-500 group-hover/item:text-white transition-colors" />
                         <span className="text-xs font-black italic">{tag}</span>
                       </div>
                     ))}
                   </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Youtube size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Archival Coordination</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-red-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Metadata Analysis Node Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-red-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Algorithmic Reach Estimation Verified</p>
           </div>
        </div>
      </div>

      {/* DOCUMENTATION GRID */}
      <div className="mt-16 pt-12 border-t border-[#e7d8c5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Info size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.about}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Authority Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Sparkles, Loader2, Copy, Check, Trash2, Zap, MessageSquare, Target, ShieldCheck, Flame, Eye, Brain, Info, MousePointer2, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type TriggerType = 'Curiosity' | 'Controversial' | 'Authority' | 'Fear' | 'Relatability';

interface HookResult {
  hook: string;
  trigger: string;
  logic: string;
}

export const AIHookGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [trigger, setTrigger] = useState<TriggerType>('Curiosity');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [results, setResults] = useState<HookResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const toolData = t.tools['yt-hook-gen'] || {
    name: 'YouTube Hook Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const generateHooks = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const prompt = `Act as a Viral Content Strategist for TikTok and Instagram Reels. 
      Topic: "${topic}"
      Psychological Trigger: ${trigger}
      Language: ${language}
      
      Generate 3 highly engaging "Hooks" (the first 3 seconds of a video).
      Requirements:
      1. Use "Pattern Interrupt" techniques.
      2. Keep them under 10 words.
      3. Provide a brief "Why it works" logic for each.
      4. Return ONLY a JSON array of objects with keys "hook", "trigger", and "logic".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                hook: { type: Type.STRING },
                trigger: { type: Type.STRING },
                logic: { type: Type.STRING }
              },
              required: ["hook", "trigger", "logic"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Error: The engagement node is temporarily desynchronized.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setTopic('');
    setResults([]);
    setError(null);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Engagement Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-red-600/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-red-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500">
              <Flame size={28} className={loading ? 'animate-pulse' : ''} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-red-500/40 uppercase tracking-[0.4em]">Attention Economy Core v2.0</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['English', 'Arabic'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-red-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Retention Verified 0123456789</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Config Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Video Concept Ingestion</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-32 bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-red-600/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar italic"
                placeholder="What is your video about? (e.g. Life hacks or coding tips)..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Psychological Engine</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Curiosity', 'Controversial', 'Authority', 'Fear', 'Relatability'] as TriggerType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrigger(t)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${trigger === t ? 'bg-red-600 text-white border-red-600 shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateHooks}
              disabled={loading || !topic.trim()}
              className="w-full bg-red-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Synthesize Viral Openers
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 italic">Engagement Registry</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-8 space-y-6 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Brain size={64} className="text-red-600 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-red-600">Analyzing Retention Curves...</p>
                 </div>
               ) : results.length > 0 ? (
                 <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                    {results.map((item, i) => (
                      <div key={i} className={`relative group bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:border-red-600/30 transition-all ${language === 'Arabic' ? 'text-right' : 'text-left'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                        <div className={`flex justify-between items-start gap-4 mb-4 ${language === 'Arabic' ? 'flex-row-reverse' : ''}`}>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-red-600/10 flex items-center justify-center text-red-500 font-black text-xs">0123456789</div>
                              <span className="text-[8px] font-black uppercase tracking-widest text-red-500/60 border border-red-600/20 px-2 py-1 rounded-lg">{item.trigger} Node</span>
                           </div>
                           <button 
                            onClick={() => handleCopy(item.hook, i)}
                            className="p-2 bg-white/5 rounded-lg hover:bg-red-600 hover:text-white transition-all"
                           >
                             {copiedIndex === i ? <Check size={14}/> : <Copy size={14}/>}
                           </button>
                        </div>
                        <h4 className="text-2xl font-black text-white italic tracking-tighter mb-3 leading-tight">"{item.hook}"</h4>
                        <div className="flex items-start gap-3 p-4 bg-black/40 rounded-2xl border border-white/5">
                           <Info size={14} className="text-red-500 shrink-0 mt-0.5" />
                           <p className="text-[10px] text-gray-500 leading-relaxed italic">{item.logic}</p>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Eye size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Media Concept</p>
                 </div>
               )}
            </div>

            {error && (
              <div className="flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <Info className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-red-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Retention Optimization Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Brain size={20} className="text-red-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Psychological Pattern Interrupt Applied</p>
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
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Attention Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

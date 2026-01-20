
import React, { useState, useEffect } from 'react';
import { 
  Mic, Sparkles, Loader2, Copy, Check, Trash2, 
  Clock, Music, Zap, ShieldCheck, Info, 
  MessageSquare, Volume2, TrendingUp, AlertCircle, Target, HelpCircle, BookOpen, Layout
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type TiktokTrend = 'Storytime' | 'Tutorial' | 'POV' | 'LifeHack' | 'Review';

export const TikTokVoiceoverGen: React.FC = () => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [trendType, setTrendType] = useState<TiktokTrend>('POV');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const langT = t.tools['tiktok-voiceover'] || {
    name: 'TikTok Script Synth',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  // Estimation logic: ~150 words per minute for clear TTS
  const wordCount = output.trim() ? output.trim().split(/\s+/).length : 0;
  const estDuration = Math.round((wordCount / 150) * 60);

  const generateVoiceover = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Act as a Viral TikTok Content Strategist. Create a high-retention Voiceover Script for: "${topic}".
    Format: ${trendType}
    Language: ${language}
    
    CRITICAL REQUIREMENTS:
    1. Hook the viewer in the first 1.5 seconds.
    2. Use short, punchy sentences (max 10 words per line).
    3. Use phonetic-friendly spelling for difficult words.
    4. Include strategic pauses [pause].
    5. The tone must be high-energy and conversational.
    6. Return ONLY the final script text.
    7. DO NOT use any numbers in the text description.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.9,
          topP: 0.95
        }
      });

      setOutput(response.text || "");
    } catch (err: any) {
      console.error(err);
      setError("Acoustic Node Desync the creative engine is temporarily overloaded");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Acoustic Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#ff0050]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#00f2ea] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0050] to-[#00f2ea]"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#ff0050]/10 rounded-2xl border border-[#ff0050]/20 text-[#ff0050]">
              <Mic size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#00f2ea]/60 uppercase tracking-[0.4em]">Viral Acoustic Architect Node</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['English', 'Arabic'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-[#ff0050] text-white shadow-lg shadow-[#ff0050]/20' : 'text-gray-500 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Acoustic Safe Node</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Config Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Narrative Concept Ingestion</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-32 bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#00f2ea]/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="What is happening in this video"
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Trend Archetype Selection</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Storytime', 'Tutorial', 'POV', 'LifeHack', 'Review'] as TiktokTrend[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTrendType(t)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${trendType === t ? 'bg-[#00f2ea] text-black border-[#00f2ea]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateVoiceover}
              disabled={loading || !topic.trim()}
              className="w-full bg-[#ff0050] text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,0,80,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Forge Acoustic Manuscript
            </button>
          </div>

          {/* Result Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#00f2ea] italic">Acoustic Registry Output</label>
              <button onClick={() => setOutput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[450px]">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Music size={64} className="text-[#ff0050] opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-[#00f2ea]">Syncing with Viral Frequencies</p>
                 </div>
               ) : output ? (
                 <div className={`relative z-10 h-full flex flex-col ${language === 'Arabic' ? 'text-right' : 'text-left'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                    <div className="flex-grow overflow-y-auto custom-scrollbar whitespace-pre-wrap text-white text-lg font-bold leading-relaxed italic">
                       {output}
                    </div>
                    
                    <div className="pt-8 grid grid-cols-2 gap-4">
                       <div className="p-4 bg-[#00f2ea]/5 border border-[#00f2ea]/20 rounded-2xl flex items-center justify-between">
                          <div className="flex items-center gap-2 text-[#00f2ea]">
                             <Clock size={14}/>
                             <span className="text-[9px] font-black uppercase">Est Duration</span>
                          </div>
                          <span className="text-xl font-black text-white tabular-nums italic">{estDuration}s</span>
                       </div>
                       <button 
                        onClick={handleCopy}
                        className={`py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                       >
                         {copied ? <Check size={18}/> : <Copy size={18}/>}
                         {copied ? 'Vaulted' : 'Copy Script'}
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <TrendingUp size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Concept Ingestion</p>
                 </div>
               )}
            </div>

            {error && (
              <div className="flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-2">
                <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Volume2 size={20} className="text-[#00f2ea]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Acoustic Optimization Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Clock size={20} className="text-[#ff0050]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Retention Curve Calibration Applied</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#ff0050]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Viral Pattern Interrupt Logic Verified</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Narrative Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

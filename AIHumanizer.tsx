
import React, { useState } from 'react';
/* Added Zap to the imports from lucide-react */
import { UserCheck, Sparkles, Loader2, Copy, Check, Trash2, BrainCircuit, ShieldCheck, Info, BookOpen, Target, HelpCircle, Layout, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type HumanizeMode = 'Natural' | 'Academic' | 'Creative';

export const AIHumanizer: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [mode, setMode] = useState<HumanizeMode>('Natural');

  const langT = t.tools['ai-humanizer'] || {
    name: 'AI Text Humanizer',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const humanizeText = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const instructions = {
      Natural: "Rewrite the following text to sound like a real person wrote it. Use casual yet professional English, vary sentence lengths. Use standard numbers 0123456789.",
      Academic: "Paraphrase the text to maintain a sophisticated scholarly tone. Use standard numbers 0123456789.",
      Creative: "Transform this text into an engaging, story-like prose. Use standard numbers 0123456789."
    };

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `TEXT TO HUMANIZE:\n${input}`,
        config: { systemInstruction: instructions[mode], temperature: 0.7 }
      });
      setOutput(response.text || "");
    } catch (err) { setOutput("Error: Node synchronization failure."); }
    finally { setLoading(false); }
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
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Humanizer Content Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <BrainCircuit size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Text Refinement 0123456789</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {(['Natural', 'Academic', 'Creative'] as HumanizeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-8">
          <div className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase text-gray-500 italic">Source Manuscript</label>
                <button onClick={() => setInput('')} className="text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
             </div>
             <textarea
               value={input}
               onChange={(e) => setInput(e.target.value)}
               className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-gray-200 text-base leading-relaxed outline-none focus:border-[#D4AF37]/40 resize-none shadow-inner custom-scrollbar italic"
               placeholder="Paste AI generated text here for humanization 0123456789..."
             />
          </div>
          
          <div className="space-y-4">
             <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase text-[#D4AF37] italic">Refined Output Registry</label>
                <button 
                  onClick={handleCopy}
                  disabled={!output}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-zinc-600 hover:text-[#D4AF37]'}`}
                >
                  {copied ? <Check size={14}/> : <Copy size={14}/>}
                  <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
                </button>
             </div>
             <div className="relative w-full h-80 bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 text-gray-300 text-base leading-relaxed overflow-y-auto custom-scrollbar italic shadow-inner">
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50 animate-pulse">
                   <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
                   <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37]">Synthesizing Prose 0123456789</p>
                 </div>
               ) : output ? (
                 <div className="animate-in fade-in duration-500">{output}</div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Sparkles size={80} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Analysis 0123456789</p>
                 </div>
               )}
             </div>
          </div>
        </div>

        <button
          onClick={humanizeText}
          disabled={loading || !input.trim()}
          className="w-full mt-4 bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_60px_rgba(212,175,55,0.2)] disabled:opacity-20"
        >
          {loading ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
          Execute Refinement Protocol
        </button>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

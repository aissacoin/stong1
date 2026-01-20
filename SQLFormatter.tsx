
import React, { useState } from 'react';
import { DatabaseZap, Sparkles, Loader2, Copy, Check, Trash2, Wand2, Terminal, Code2, ShieldCheck, Info, Target, HelpCircle, BookOpen, Layout, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const SQLFormatter: React.FC = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const langT = t.tools['sql-formatter'] || {
    name: 'SQL Beautifier',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const formatSQL = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Format this SQL query for maximum legibility. Use uppercase for keywords. SQL:\n\n${input}`,
        config: {
          systemInstruction: "You are an expert Database Architect. Reformat the SQL query provided. Use standard indentation. Return only the code result without markdown backticks.",
        }
      });

      setOutput(response.text?.trim() || "");
    } catch (err) {
      console.error(err);
      setError("Logical Node Error: Failed to synchronize with the database logic engine");
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
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Structural Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <DatabaseZap size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Advanced Structural Refinement Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Logical Shield Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source Manuscript</label>
              <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-400 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-80 bg-black border border-white/5 rounded-[2rem] p-8 text-emerald-100 font-mono text-xs outline-none focus:border-emerald-500/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar italic"
              placeholder="Paste raw database manuscript here for structural analysis..."
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 italic">Refined Registry</label>
              <button 
                onClick={handleCopy}
                disabled={!output}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-white'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy Result'}</span>
              </button>
            </div>
            <div className="relative w-full h-80 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 text-gray-300 font-mono text-xs overflow-auto custom-scrollbar shadow-inner">
               {loading ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/40 backdrop-blur-sm">
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Synthesizing Logic...</span>
                 </div>
               ) : (
                 <pre className="whitespace-pre-wrap leading-relaxed">{output || "Awaiting archival input for structural refinement..."}</pre>
               )}
            </div>
          </div>
        </div>

        <button
          onClick={formatSQL}
          disabled={loading || !input.trim()}
          className="w-full bg-emerald-600 text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl disabled:opacity-20"
        >
          {loading ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
          Execute Refinement
        </button>

        {error && (
          <div className="mt-6 flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-2">
            <Info className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Terminal size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Syntax Equilibrium Protocol Verified</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Code2 size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">ANSI Standard Conformity Applied</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

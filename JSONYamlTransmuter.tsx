
import React, { useState } from 'react';
import { Braces, RefreshCw, Copy, Check, Trash2, Zap, FileCode, Layers, ShieldCheck, Info, Target, HelpCircle, BookOpen, Layout, Sparkles, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const JSONYamlTransmuter: React.FC = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'JSONtoYAML' | 'YAMLtoJSON'>('JSONtoYAML');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const langT = t.tools['json-yaml'] || {
    name: 'JSON-YAML Shift',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const transmute = async () => {
    if (!input.trim() || loading) return;
    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert this ${mode === 'JSONtoYAML' ? 'JSON to YAML' : 'YAML to JSON'}. Return ONLY the raw code result. Manuscript: "${input}"`,
        config: {
            systemInstruction: "You are a professional data architect. Provide clean, valid output without any markdown formatting or extra text."
        }
      });
      setOutput(response.text || '');
    } catch (e) { 
      console.error(e);
      setError('Logical node synchronization failure');
    }
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
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Structural Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <Braces size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Structured Data Shift Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['JSONtoYAML', 'YAMLtoJSON'] as const).map(m => (
                  <button 
                    key={m} 
                    onClick={() => setMode(m)} 
                    className={`px-5 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${mode === m ? 'bg-emerald-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    {m === 'JSONtoYAML' ? 'JSON ➔ YAML' : 'YAML ➔ JSON'}
                  </button>
                ))}
             </div>
             <div className="hidden sm:flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Registry Safe</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase text-gray-500 italic">Source Manuscript</label>
              <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              className="w-full h-80 bg-black border border-white/5 rounded-[2rem] p-8 text-white font-mono text-xs outline-none focus:border-emerald-500/40 transition-all shadow-inner resize-none custom-scrollbar"
              placeholder={`Paste your ${mode.substring(0, 4)} data here...`}
            />
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase text-emerald-500 italic">Transmuted Registry</label>
              <button 
                onClick={handleCopy}
                disabled={!output}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-white'}`}
              >
                {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy Result'}</span>
              </button>
            </div>
            <div className="w-full h-80 bg-emerald-500/5 border border-emerald-500/20 rounded-[2rem] p-8 text-gray-300 font-mono text-xs overflow-auto custom-scrollbar shadow-inner relative">
               {loading ? (
                 <div className="absolute inset-0 flex flex-col items-center justify-center space-y-4 bg-black/40 backdrop-blur-sm">
                    {/* Fixed: Loader2 is now imported correctly */}
                    <Loader2 className="animate-spin text-emerald-500" size={32} />
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Transmuting Bitstream...</span>
                 </div>
               ) : (
                 <pre className="whitespace-pre-wrap leading-relaxed">{output || "Awaiting archival input for transmutation..."}</pre>
               )}
            </div>
          </div>
        </div>

        <button 
          onClick={transmute} 
          disabled={loading || !input} 
          className="w-full bg-emerald-600 text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl disabled:opacity-20"
        >
          {/* Fixed: Loader2 is now imported correctly */}
          {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />} 
          Execute Transmutation
        </button>

        {error && (
          <div className="mt-6 flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-2">
            <Info className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Layers size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Hierarchical Logic Mapping Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <FileCode size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Syntax Equilibrium Protocol Verified</p>
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

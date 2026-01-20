
import React, { useState, useMemo } from 'react';
import { 
  SearchCode, Sparkles, Loader2, Info, Check, 
  AlertTriangle, Code, Play, Wand2, Lightbulb, 
  ShieldCheck, Trash2, Layout, Target, HelpCircle, BookOpen, Zap
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const RegexTester: React.FC = () => {
  const { t } = useLanguage();
  const [pattern, setPattern] = useState('[a-z]+');
  const [testString, setTestString] = useState('Welcome to StrongTools Archive');
  const [flags, setFlags] = useState('g');
  const [explanation, setExplanation] = useState('');
  const [loadingExplainer, setLoadingExplainer] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const langT = t.tools['regex-tester'] || {
    name: 'RegEx Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const matches = useMemo(() => {
    if (!pattern) return [];
    try {
      setError(null);
      const regex = new RegExp(pattern, flags);
      const found = [];
      let match;
      if (!flags.includes('g')) {
        match = regex.exec(testString);
        if (match) found.push(match);
      } else {
        while ((match = regex.exec(testString)) !== null) {
          found.push(match);
          if (match.index === regex.lastIndex) regex.lastIndex++;
        }
      }
      return found;
    } catch (e: any) {
      setError('Logical expression syntax violation');
      return [];
    }
  }, [pattern, testString, flags]);

  const getAIExplanation = async () => {
    if (!pattern || loadingExplainer) return;
    setLoadingExplainer(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain this Regular Expression logic in detail but concisely. Focus on structural tokens. 
        Pattern: /${pattern}/${flags}. 
        Return only professional English text. DO NOT USE ANY NUMBERS IN THE OUTPUT.`,
      });
      setExplanation(response.text || "Failed to generate explanation.");
    } catch (err) {
      setExplanation("Archival Error: Neural node desynchronization.");
    } finally {
      setLoadingExplainer(false);
    }
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

      <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-orange-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400">
              <SearchCode size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-orange-500/40 uppercase tracking-[0.4em]">Logical Pattern Validation Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Syntax Shield Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Expression Protocol</label>
                <div className="flex gap-2">
                  <button onClick={() => setFlags(f => f.includes('g') ? f.replace('g', '') : f + 'g')} className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${flags.includes('g') ? 'bg-orange-500 text-black' : 'bg-white/5 text-gray-500'}`}>GLOBAL</button>
                  <button onClick={() => setFlags(f => f.includes('i') ? f.replace('i', '') : f + 'i')} className={`px-3 py-1 rounded-lg text-[9px] font-black transition-all ${flags.includes('i') ? 'bg-orange-500 text-black' : 'bg-white/5 text-gray-500'}`}>INSENSITIVE</button>
                </div>
              </div>
              <div className="relative group">
                <span className="absolute left-6 top-1/2 -translate-y-1/2 text-orange-500/40 font-mono text-xl">/</span>
                <input 
                  type="text" value={pattern} onChange={(e) => setPattern(e.target.value)} 
                  className="w-full bg-black border border-white/5 rounded-2xl py-6 pl-10 pr-16 text-orange-400 font-mono text-sm outline-none focus:border-orange-500/40 transition-all shadow-inner" 
                  placeholder="Insert pattern logic..." 
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 text-orange-500/40 font-mono text-xl">/{flags}</span>
              </div>
              {error && <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl text-rose-400 text-[10px] font-bold uppercase italic tracking-widest">{error}</div>}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Subject Manuscript</label>
                <button onClick={() => setTestString('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              </div>
              <textarea 
                value={testString} onChange={(e) => setTestString(e.target.value)} 
                className="w-full h-40 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-orange-500/40 transition-all shadow-inner resize-none italic" 
                placeholder="Insert text for logical evaluation..." 
              />
            </div>

            <button 
              onClick={getAIExplanation} 
              disabled={loadingExplainer || !pattern} 
              className="w-full bg-orange-600 text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl"
            >
              {loadingExplainer ? <Loader2 className="animate-spin" size={24} /> : <Wand2 size={24} />}
              Analyze Pattern Logic
            </button>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-white/[0.02] border border-white/5 rounded-[3rem] relative overflow-hidden h-full flex flex-col min-h-[400px]">
              <div className="flex items-center gap-3 mb-8">
                <Lightbulb size={18} className="text-orange-500" />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 italic">Cognitive Analysis Viewport</h3>
              </div>
              
              <div className="flex-grow space-y-6 overflow-auto custom-scrollbar">
                {explanation ? (
                  <div className="animate-in fade-in slide-in-from-bottom-2">
                    <p className="text-sm text-gray-300 leading-relaxed italic">{explanation}</p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full opacity-10 space-y-6">
                    <Zap size={80} />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Awaiting Neural Handshake</p>
                  </div>
                )}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 flex items-center justify-between">
                <div className="space-y-1">
                  <span className="text-[8px] font-black uppercase text-gray-600">Active Node Matches</span>
                  <div className="text-2xl font-black text-white italic tabular-nums">{matches.length}</div>
                </div>
                <div className="flex gap-1">
                   {[...Array(3)].map((_, i) => (
                     <div key={i} className="w-1.5 h-1.5 rounded-full bg-orange-500/20"></div>
                   ))}
                </div>
              </div>
            </div>
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

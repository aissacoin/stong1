
import React, { useState, useCallback, useEffect } from 'react';
import { Languages, Copy, Check, Trash2, Download, ShieldCheck, Zap, Info, Filter, Globe, BookOpen, Target, HelpCircle, Sparkles, Layout } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface LanguageRange {
  name: string;
  native: string;
  regex: RegExp;
}

const LANGUAGES: LanguageRange[] = [
  { name: 'Arabic', native: 'العربية', regex: /[\u0600-\u06FF]/g },
  { name: 'English', native: 'English', regex: /[a-zA-Z]/g },
  { name: 'Numbers', native: '123...', regex: /[0-9]/g }
];

export const LanguageExtractor: React.FC = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [keepLangs, setKeepLangs] = useState<string[]>(['Arabic', 'English']);
  const [copied, setCopied] = useState(false);

  const toolData = t.tools['lang-extractor'];

  const processExtraction = useCallback(() => {
    if (!input) {
      setOutput('');
      return;
    }
    
    const selectedLangs = LANGUAGES.filter(l => keepLangs.includes(l.name));
    let result = '';
    
    for (const char of input) {
      let isAllowed = false;
      // Spaces, punctuation, and newlines are allowed to maintain structure
      if (/\s|[.,!?;:()'"-]/.test(char)) {
        isAllowed = true;
      } else {
        for (const lang of selectedLangs) {
          lang.regex.lastIndex = 0;
          if (lang.regex.test(char)) {
            isAllowed = true;
            break;
          }
        }
      }
      if (isAllowed) result += char;
    }
    
    // Standard Numeral Enforcement 0123456789
    const stdResult = result.replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
    
    // Clean up multiple spaces and empty segments
    setOutput(stdResult.replace(/ +/g, ' ').trim());
  }, [input, keepLangs]);

  useEffect(() => {
    processExtraction();
  }, [processExtraction]);

  const toggleLang = (name: string) => {
    setKeepLangs(prev => 
      prev.includes(name) ? prev.filter(l => l !== name) : [...prev, name]
    );
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
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Language Filtering Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Languages size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Linguistic Data Isolation Node 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Registry Safe 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <label className="text-[10px] font-black uppercase text-gray-500 italic">Mixed Source Manuscript</label>
                 <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              </div>
              <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 shadow-inner custom-scrollbar italic"
                placeholder="Paste mixed Arabic English and numbers here 0123456789..."
              />
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <label className="text-[10px] font-black uppercase text-[#D4AF37] italic">Filtered Registry Result</label>
                 <button onClick={handleCopy} className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}>
                   {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Vaulted' : 'Copy'}
                 </button>
              </div>
              <div className="w-full h-80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] p-8 text-gray-300 text-sm overflow-y-auto custom-scrollbar italic shadow-inner whitespace-pre-wrap">
                {output || <span className="opacity-10 italic">Awaiting linguistic analysis handshake 0123456789...</span>}
              </div>
           </div>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 text-center block italic">Isolation Protocols 0123456789</label>
          <div className="flex flex-wrap gap-3 justify-center">
            {LANGUAGES.map(lang => (
              <button 
                key={lang.name} 
                onClick={() => toggleLang(lang.name)} 
                className={`px-8 py-4 rounded-2xl border transition-all flex items-center gap-3 font-black text-[10px] uppercase tracking-widest ${
                  keepLangs.includes(lang.name) 
                  ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg' 
                  : 'bg-black border-white/5 text-gray-600 hover:border-white/20'
                }`}
              >
                {keepLangs.includes(lang.name) ? <Check size={14}/> : <Filter size={14} className="opacity-20"/>}
                {lang.name} <span className="opacity-40">({lang.native})</span>
              </button>
            ))}
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Type, Copy, Trash2, Check, ArrowRightLeft, ShieldCheck, Zap, Info, Target, HelpCircle, Sparkles, Layout } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type CaseType = 'UPPER' | 'LOWER' | 'TITLE' | 'SENTENCE' | 'CAMEL' | 'PASCAL';

export const CaseConverter: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);

  const langT = t.tools['case-converter'] || {
    name: 'Case Converter',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const convert = (type: CaseType) => {
    if (!text.trim()) return;
    let result = text;
    const words = text.toLowerCase().split(/\s+/).filter(w => w.length > 0);
    switch (type) {
      case 'UPPER': result = text.toUpperCase(); break;
      case 'LOWER': result = text.toLowerCase(); break;
      case 'TITLE': result = text.toLowerCase().replace(/\b\w/g, s => s.toUpperCase()); break;
      case 'SENTENCE': result = text.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, s => s.toUpperCase()); break;
      case 'CAMEL': result = words.map((word, i) => i === 0 ? word : word.charAt(0).toUpperCase() + word.slice(1)).join(''); break;
      case 'PASCAL': result = words.map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(''); break;
    }
    setText(result);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Topology Archive Display Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Type size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Manuscript Topology Transmuter 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Registry Safe 0123456789</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-8 space-y-6">
            <div className="relative group">
              <div className="flex justify-between items-center px-4 mb-3">
                 <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source Manuscript</label>
                 <div className="flex gap-4">
                    <button onClick={() => setText('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                    <button onClick={handleCopy} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-[#D4AF37]'}`}>
                      {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Captured' : 'Copy'}
                    </button>
                 </div>
              </div>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-lg font-medium outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner placeholder-white/5 resize-none italic custom-scrollbar"
                placeholder="Paste English text here to transmute character casing 0123456789..."
              />
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic mb-1 px-2">Transmutation Protocols</label>
            {[
              { id: 'UPPER', label: 'UPPER CASE' },
              { id: 'LOWER', label: 'lower case' },
              { id: 'TITLE', label: 'Title Case' },
              { id: 'SENTENCE', label: 'Sentence case' },
              { id: 'CAMEL', label: 'camelCase' },
              { id: 'PASCAL', label: 'PascalCase' }
            ].map((p) => (
              <button
                key={p.id}
                onClick={() => convert(p.id as CaseType)}
                className="group relative flex flex-col items-start p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-[#D4AF37]/40 transition-all hover:bg-[#D4AF37]/5 text-left"
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-[11px] font-black uppercase tracking-widest text-white group-hover:text-[#D4AF37] transition-colors">{p.label}</span>
                  <ArrowRightLeft size={12} className="opacity-20 group-hover:opacity-100" />
                </div>
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

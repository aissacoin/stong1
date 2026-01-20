
import React, { useState, useEffect } from 'react';
import { BookOpen, Copy, Trash2, Check, Hash, FileText, Layout, Info, ShieldCheck, Zap, Layers, Type, AlignLeft, Target, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type DocumentStyle = 'Academic (Double Spaced)' | 'Single Spaced' | 'Novel (1.5 Spaced)' | 'Creative (Handwritten Sim)';

const STYLE_WORDS_PER_PAGE: Record<DocumentStyle, number> = {
  'Academic (Double Spaced)': 275,
  'Single Spaced': 550,
  'Novel (1.5 Spaced)': 320,
  'Creative (Handwritten Sim)': 200
};

export const WordCounterPerPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [docStyle, setDocStyle] = useState<DocumentStyle>('Academic (Double Spaced)');
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const langT = t.tools['word-counter-per-page'] || {
    name: 'Words to Pages',
    internal: { title: 'Words to Pages', sub: 'Page Estimator', preset: 'Style', totalPages: 'Pages', wordCount: 'Words', chars: 'Chars', paragraphs: 'Paras' },
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  // Utility for Numerals (Standard 0123456789)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const stats = {
    words: text.trim() ? text.trim().split(/\s+/).length : 0,
    chars: text.length,
    paragraphs: text.split('\n').filter(p => p.trim().length > 0).length,
    pages: 0
  };

  stats.pages = Math.max(0, Math.ceil(stats.words / STYLE_WORDS_PER_PAGE[docStyle]));

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    if (confirm(isAr ? "هل أنت متأكد من مسح النص؟" : "Registry Archival Warning: Clear all current lexical data?")) {
      setText('');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP OF TOOL (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Archival Display Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Tablet and Mobile Ready Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <BookOpen size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">{langT.internal.sub}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Standard Numerals 0123456789 Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">{langT.internal.preset}</label>
              <div className="grid grid-cols-1 gap-2">
                {(Object.keys(STYLE_WORDS_PER_PAGE) as DocumentStyle[]).map((style) => (
                  <button
                    key={style}
                    onClick={() => setDocStyle(style)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      docStyle === style 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-lg' 
                      : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-widest">{style}</span>
                    <Layers size={14} className={docStyle === style ? 'opacity-100' : 'opacity-20'} />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div className="bg-black/60 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-[#D4AF37]/40 transition-all">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-2 italic">{langT.internal.totalPages}</span>
                  <div className="text-4xl font-black text-white italic tabular-nums">{toStd(stats.pages)}</div>
               </div>
               <div className="bg-black/60 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-[#D4AF37]/40 transition-all">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-2 italic">{langT.internal.wordCount}</span>
                  <div className="text-4xl font-black text-[#D4AF37] italic tabular-nums">{toStd(stats.words)}</div>
               </div>
               <div className="bg-black/60 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-[#D4AF37]/40 transition-all">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-2 italic">{langT.internal.chars}</span>
                  <div className="text-xl font-black text-white italic tabular-nums">{toStd(stats.chars.toLocaleString())}</div>
               </div>
               <div className="bg-black/60 border border-white/5 p-6 rounded-[2rem] flex flex-col items-center text-center group hover:border-[#D4AF37]/40 transition-all">
                  <span className="text-[8px] font-black uppercase tracking-widest text-gray-600 mb-2 italic">{langT.internal.paragraphs}</span>
                  <div className="text-xl font-black text-white italic tabular-nums">{toStd(stats.paragraphs)}</div>
               </div>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Manuscript Input Terminal</label>
              <div className="flex gap-3">
                <button onClick={handleClear} className="p-2 text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                <button onClick={handleCopy} className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-[#D4AF37]'}`}>
                  {copied ? <Check size={14}/> : <Copy size={14}/>}
                  <span className="text-[9px] font-black uppercase tracking-widest">{copied ? t.common.copied : t.common.copy}</span>
                </button>
              </div>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-1 shadow-inner group">
               <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className={`w-full h-[450px] bg-transparent border-0 rounded-[3.2rem] p-10 text-gray-300 text-lg leading-relaxed outline-none resize-none custom-scrollbar italic placeholder-white/5 text-left`}
                placeholder="Begin penning your sovereign manuscript here to calculate total page volume..."
               />
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

      {/* AD SLOT: BOTTOM OF PAGE (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-white/40 border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-50">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Sentinel Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

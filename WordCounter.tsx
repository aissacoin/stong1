
import React, { useState } from 'react';
import { 
  FileText, Copy, Trash2, Clock, Hash, AlignLeft, Check, 
  Info, BookOpen, Target, HelpCircle, ShieldCheck, Zap, 
  Sparkles, Layout 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const WordCounter: React.FC = () => {
  const { t } = useLanguage();
  const [text, setText] = useState('');
  const [copied, setCopied] = useState(false);
  
  const langT = t.tools['word-counter'] || {
    name: 'Word Counter',
    internal: { placeholder: 'Start typing...', words: 'Words', chars: 'Chars', sentences: 'Sentences', time: 'Time' },
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const chars = text.length;
  const sentences = text.split(/[.!?]+/).filter(Boolean).length;
  const readingTime = Math.ceil(words / 200) || 0;

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
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Lexical Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <AlignLeft size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Manuscript Magnitude Analysis Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Registry Safe</span>
          </div>
        </div>

        <div className="space-y-8">
          <div className="relative group">
            <div className="flex justify-between items-center px-4 mb-3">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source Manuscript Ingestion</label>
               <div className="flex gap-4">
                  <button onClick={() => setText('')} className="text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                  <button onClick={handleCopy} className={`flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-[#D4AF37]'}`}>
                    {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Captured' : 'Copy'}
                  </button>
               </div>
            </div>
            <textarea 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-10 text-gray-200 text-lg leading-relaxed outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner placeholder-white/5 resize-none custom-scrollbar italic"
              placeholder={langT.internal.placeholder}
            />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center group hover:border-[#D4AF37]/30 transition-all">
               <div className="text-4xl font-black text-white italic tabular-nums">{words}</div>
               <div className="text-[9px] uppercase font-black text-gray-600 tracking-widest mt-2">{langT.internal.words}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center group hover:border-[#D4AF37]/30 transition-all">
               <div className="text-4xl font-black text-[#D4AF37] italic tabular-nums">{chars}</div>
               <div className="text-[9px] uppercase font-black text-gray-600 tracking-widest mt-2">{langT.internal.chars}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center group hover:border-[#D4AF37]/30 transition-all">
               <div className="text-4xl font-black text-white italic tabular-nums">{sentences}</div>
               <div className="text-[9px] uppercase font-black text-gray-600 tracking-widest mt-2">{langT.internal.sentences}</div>
            </div>
            <div className="bg-white/[0.02] border border-white/5 p-8 rounded-[2rem] text-center group hover:border-[#D4AF37]/30 transition-all">
               <div className="text-4xl font-black text-white italic tabular-nums">{readingTime}</div>
               <div className="text-[9px] uppercase font-black text-gray-600 tracking-widest mt-2">{langT.internal.time}</div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Real-Time Lexical Processing Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Institutional Registry Accuracy Verified</p>
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
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Mail, Copy, Trash2, Check, ShieldCheck, Zap, Info, FileSearch, Target, HelpCircle, Sparkles, Layout, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const EmailExtractor: React.FC = () => {
  const [input, setInput] = useState('');
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['email-extractor'];

  const [options, setOptions] = useState({
    removeDuplicates: true,
    alphabetical: true
  });

  const extractEmails = () => {
    if (!input.trim()) {
      setEmails([]);
      return;
    }
    const regex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/gi;
    let matches = input.match(regex) || [];
    matches = matches.map(e => e.toLowerCase());
    if (options.removeDuplicates) matches = Array.from(new Set(matches));
    if (options.alphabetical) matches.sort();
    setEmails(matches);
  };

  useEffect(() => {
    extractEmails();
  }, [input, options]);

  const handleCopy = () => {
    if (emails.length === 0) return;
    navigator.clipboard.writeText(emails.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Harvesting Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Mail size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Contact Data Harvesting node 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Registry Safe 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase text-gray-500 italic">{langT.internal.label}</label>
              <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-400 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="w-full h-80 bg-black border border-white/5 rounded-[2rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 shadow-inner custom-scrollbar italic"
              placeholder={langT.internal.placeholder}
            />
          </div>

          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase text-[#D4AF37] italic">{langT.internal.result} ({emails.length})</label>
              <button 
                onClick={handleCopy}
                disabled={emails.length === 0}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-[#D4AF37] hover:text-white'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
              </button>
            </div>
            <div className="w-full h-80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2rem] p-8 text-[#D4AF37] font-mono text-xs overflow-y-auto custom-scrollbar italic shadow-inner">
              {emails.length > 0 ? (
                <div className="space-y-1">
                  {emails.map((e, i) => <div key={i} className="py-1 border-b border-white/5 last:border-0">{e}</div>)}
                </div>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                  <FileSearch size={48} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Transmission</span>
                </div>
              )}
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

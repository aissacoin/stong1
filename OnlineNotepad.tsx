
import React, { useState, useEffect } from 'react';
import { FileText, Copy, Trash2, Download, Save, Check, History, ShieldCheck, Zap, Info, AlignLeft, Hash, Clock, Layout, Target, HelpCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const OnlineNotepad: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('st_notepad_registry') || '';
  });
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const langT = t.tools['notepad'] || {
    name: 'online notepad',
    desc: 'Secure local-first drafting terminal',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const words = content.trim() ? content.trim().split(/\s+/).length : 0;
  const chars = content.length;
  const lines = content.split('\n').filter(l => l.length > 0).length;
  const readTime = Math.ceil(words / 200);

  // Utility for Numerals (Standard 0123456789)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      localStorage.setItem('st_notepad_registry', content);
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }, 1000);
    return () => clearTimeout(timeout);
  }, [content]);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sovereign_Manuscript_${new Date().getTime()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    if (window.confirm(isAr ? "تحذير: سيتم مسح كافة البيانات المسجلة، هل أنت متأكد؟" : "Registry Archival Warning: This will wipe the current registry Proceed?")) {
      setContent('');
      localStorage.removeItem('st_notepad_registry');
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Text Archive Display Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Active 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <FileText size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Personal Writing Node 0123456789</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
             <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all duration-500 ${saved ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-500'}`}>
                {saved ? <Check size={12} /> : <Save size={12} />}
                <span className="text-[9px] font-black uppercase tracking-widest tabular-nums">{saved ? 'Registry Sealed' : 'Auto Sync Active'}</span>
             </div>
             <button onClick={handleClear} className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-600 hover:text-rose-500 transition-all"><Trash2 size={18}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          <div className="lg:col-span-9 space-y-6">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="relative w-full h-[500px] bg-black border border-white/10 rounded-[2.5rem] p-10 text-gray-200 text-lg leading-relaxed outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar italic"
              placeholder="Begin penning your thoughts here progress is archived locally for your convenience 0123456789"
            />
          </div>

          <div className="lg:col-span-3 flex flex-col gap-4">
             <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-6 shadow-xl">
                <div className="space-y-4">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2"><AlignLeft size={12}/> Words</div>
                      <span className="text-white tabular-nums">{toStd(words)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2"><Hash size={12}/> Chars</div>
                      <span className="text-white tabular-nums">{toStd(chars)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500 border-b border-white/5 pb-2">
                      <div className="flex items-center gap-2"><History size={12}/> Lines</div>
                      <span className="text-white tabular-nums">{toStd(lines)}</span>
                   </div>
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-500">
                      <div className="flex items-center gap-2"><Clock size={12}/> Read Time</div>
                      <span className="text-white tabular-nums">{toStd(readTime)}m</span>
                   </div>
                </div>

                <div className="flex flex-col gap-3 pt-4">
                   <button 
                    onClick={handleCopy}
                    className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                   >
                     {copied ? <Check size={16}/> : <Copy size={16}/>}
                     {copied ? 'Captured' : 'Copy Content'}
                   </button>
                   <button 
                    onClick={handleDownload}
                    className="w-full bg-[#D4AF37] text-black py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-[10px] tracking-[0.2em] hover:scale-[1.02] transition-all"
                   >
                     <Download size={16}/> Save as TXT
                   </button>
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
      <div className="w-full h-32 md:h-56 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Scribe Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

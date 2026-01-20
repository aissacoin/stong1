import React, { useState, useCallback } from 'react';
/* Added missing Sparkles import */
import { Eraser, Copy, Check, Trash2, ShieldCheck, Zap, AlignLeft, Type, ArrowRight, Scissors, Layers, FileCode, Info, BookOpen, Target, HelpCircle, Layout, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const TextCleaner: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();
  const langT = t.tools['text-cleaner'];
  const isAr = language === 'ar';

  /* Fix: Declared options state before cleanText callback to avoid "used before its declaration" error */
  const [options, setOptions] = useState({
    removeEmptyLines: true,
    trimWhitespace: true,
    removeDuplicates: false,
    stripHtml: false,
    removeSpecialChars: false
  });

  const cleanText = useCallback(() => {
    if (!input) { setOutput(''); return; }
    let result = input;
    if (options.stripHtml) result = result.replace(/<[^>]*>?/gm, '');
    if (options.removeSpecialChars) result = result.replace(/[^\w\s\d]/gi, '');
    let lines = result.split(/\r?\n/);
    if (options.trimWhitespace) lines = lines.map(line => line.trim());
    if (options.removeEmptyLines) lines = lines.filter(line => line.length > 0);
    if (options.removeDuplicates) lines = Array.from(new Set(lines));
    setOutput(lines.join('\n'));
  }, [input, options]);

  React.useEffect(() => { cleanText(); }, [cleanText]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Sanitation Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex items-center gap-4 mb-10">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
            <Eraser size={28} />
          </div>
          <div className="text-left">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
            <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Manuscript Purification Node 0123456789</p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">{langT.protocols}</label>
            <div className="grid grid-cols-1 gap-2">
              {[
                { id: 'removeEmptyLines', label: langT.emptyLines, icon: <AlignLeft size={14}/> },
                { id: 'trimWhitespace', label: langT.whitespace, icon: <Scissors size={14}/> },
                { id: 'removeDuplicates', label: langT.duplicates, icon: <Layers size={14}/> },
                { id: 'stripHtml', label: langT.html, icon: <FileCode size={14}/> },
                { id: 'removeSpecialChars', label: langT.special, icon: <Type size={14}/> },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof prev] }))}
                  className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${options[opt.id as keyof typeof options] ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500'}`}
                >
                  <div className="flex items-center gap-3">{opt.icon} <span className="text-[10px] font-black uppercase">{opt.label}</span></div>
                  <div className={`w-1.5 h-1.5 rounded-full ${options[opt.id as keyof typeof options] ? 'bg-[#D4AF37] shadow-[0_0_10px_#D4AF37]' : 'bg-white/10'}`}></div>
                </button>
              ))}
            </div>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
               <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase text-gray-500 italic">Source Manuscript</label>
                  <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
               </div>
               <textarea 
                value={input} onChange={(e) => setInput(e.target.value)}
                className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 shadow-inner custom-scrollbar italic"
                placeholder="Paste raw data here for sanitation 0123456789..."
              />
            </div>
            <div className="space-y-4">
               <div className="flex justify-between items-center px-2">
                  <label className="text-[10px] font-black uppercase text-[#D4AF37] italic">Purified Result</label>
                  <button 
                    onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }}
                    disabled={!output}
                    className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-[#D4AF37]'}`}
                  >
                    {copied ? <Check size={14}/> : <Copy size={14}/>}
                    <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
                  </button>
               </div>
               <textarea readOnly value={output} className="w-full h-80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] p-8 text-gray-300 text-sm shadow-inner italic custom-scrollbar" />
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Sanitation Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};
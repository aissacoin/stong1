
import React, { useState, useEffect, useCallback } from 'react';
import { Hash, Copy, Check, Trash2, Download, ShieldCheck, Zap, Info, FileDigit, ListFilter, Scissors, Type, ArrowRight, Save, Layout, Target, HelpCircle, BookOpen, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const NumberExtractor: React.FC = () => {
  const [input, setInput] = useState('');
  const [extractedNumbers, setExtractedNumbers] = useState<string[]>([]);
  const [copiedType, setCopiedType] = useState<'nums' | 'text' | null>(null);
  const [separator, setSeparator] = useState<string>('\n');
  const { t, language } = useLanguage();
  const isAr = language === 'ar';

  const [options, setOptions] = useState({
    removeDuplicates: false,
    sortNumeric: false,
    keepDecimals: true
  });

  const langT = t.tools['number-extractor'] || {
    name: 'Number Extractor',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  // Standard Numerals Protocol (0123456789)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const extractLogic = useCallback(() => {
    if (!input.trim()) {
      setExtractedNumbers([]);
      return;
    }
    const regex = options.keepDecimals ? /-?\d+(\.\d+)?/g : /\d+/g;
    let matches = input.match(regex) || [];
    if (options.removeDuplicates) matches = Array.from(new Set(matches));
    if (options.sortNumeric) matches.sort((a, b) => parseFloat(a) - parseFloat(b));
    setExtractedNumbers(matches.map(toStd));
  }, [input, options]);

  useEffect(() => {
    extractLogic();
  }, [extractLogic]);

  const handleCopy = (type: 'nums' | 'text') => {
    const textToCopy = type === 'nums' ? extractedNumbers.join(separator) : input;
    if (!textToCopy) return;
    navigator.clipboard.writeText(textToCopy);
    setCopiedType(type);
    setTimeout(() => setCopiedType(null), 2000);
  };

  const handleDownload = () => {
    if (extractedNumbers.length === 0) return;
    const content = extractedNumbers.join(separator);
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Extracted_Numbers_${Date.now()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Extraction Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <FileDigit size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Numerical Data Harvesting Node 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Logic Verified MMXXV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Extraction Protocol 0123456789</label>
            <div className="grid grid-cols-1 gap-2">
              <button
                onClick={() => setOptions(prev => ({ ...prev, keepDecimals: !prev.keepDecimals }))}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${options.keepDecimals ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Include Decimals</span>
                <div className={`w-1.5 h-1.5 rounded-full ${options.keepDecimals ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
              </button>
              <button
                onClick={() => setOptions(prev => ({ ...prev, removeDuplicates: !prev.removeDuplicates }))}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${options.removeDuplicates ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Unique Only</span>
                <div className={`w-1.5 h-1.5 rounded-full ${options.removeDuplicates ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
              </button>
              <button
                onClick={() => setOptions(prev => ({ ...prev, sortNumeric: !prev.sortNumeric }))}
                className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${options.sortNumeric ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Numeric Sort</span>
                <div className={`w-1.5 h-1.5 rounded-full ${options.sortNumeric ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
              </button>
            </div>

            <div className="space-y-3 pt-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Output Separator Node</label>
              <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {[
                  { label: 'Line', val: '\n' },
                  { label: 'Comma', val: ', ' },
                  { label: 'Space', val: ' ' }
                ].map((s) => (
                  <button 
                    key={s.label}
                    onClick={() => setSeparator(s.val)}
                    className={`flex-1 py-2 rounded-lg text-[9px] font-black uppercase transition-all ${separator === s.val ? 'bg-[#D4AF37] text-black shadow-md' : 'text-gray-500'}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleDownload}
              disabled={extractedNumbers.length === 0}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all disabled:opacity-20 mt-6"
            >
              <Download size={16} /> Download Registry (.txt)
            </button>
          </div>

          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source Manuscript</label>
                    <button onClick={() => setInput('')} className="text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                  </div>
                  <textarea 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar italic"
                    placeholder="Paste text with numbers 0123456789..."
                  />
               </div>
               <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Extracted Digits Registry ({extractedNumbers.length})</label>
                    <button 
                      onClick={() => handleCopy('nums')}
                      disabled={extractedNumbers.length === 0}
                      className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copiedType === 'nums' ? 'text-emerald-400' : 'text-zinc-600 hover:text-[#D4AF37]'}`}
                    >
                      {copiedType === 'nums' ? <Check size={14}/> : <Copy size={14}/>}
                      <span className="text-[9px] font-black uppercase tracking-widest">{copiedType === 'nums' ? 'Captured' : 'Copy'}</span>
                    </button>
                  </div>
                  <div className="w-full h-80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] p-8 text-[#D4AF37] font-mono text-sm overflow-y-auto custom-scrollbar italic shadow-inner">
                    {extractedNumbers.length > 0 ? extractedNumbers.join(separator) : <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                       <Hash size={48} />
                       <span className="text-[10px] font-black uppercase tracking-widest">Awaiting Transmission</span>
                    </div>}
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Extraction Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

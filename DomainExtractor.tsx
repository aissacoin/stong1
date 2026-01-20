
import React, { useState, useEffect } from 'react';
import { Globe2, Copy, Trash2, Check, Download, ListFilter, ArrowDownAz, ShieldCheck, Zap, Info, FileSearch, Target, ZapOff, Filter, HelpCircle, Sparkles, Layout } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

type ExtensionFilter = 'all' | '.com' | '.net' | '.site' | '.org';

export const DomainExtractor: React.FC = () => {
  const { t, language } = useLanguage();
  const [input, setInput] = useState('');
  const [domains, setDomains] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [selectedExt, setSelectedExt] = useState<ExtensionFilter>('all');
  const [options, setOptions] = useState({
    removeDuplicates: true,
    alphabetical: true,
    removeWww: false
  });

  const toolData = t.tools['domain-extractor'] || {
    name: 'Domain Extractor',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  // Standard Numeral Enforcement (0123456789)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const extractDomains = () => {
    if (!input.trim()) {
      setDomains([]);
      return;
    }

    let regexPattern = '(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+[a-z0-9][a-z0-9-]{0,61}[a-z0-9]';
    if (selectedExt !== 'all') {
      const ext = selectedExt.replace('.', '\\.');
      regexPattern = `(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\\.)+${ext.replace('\\.', '')}`;
    }
    
    try {
      const regex = new RegExp(regexPattern, 'gi');
      let matches = input.match(regex) || [];

      matches = matches.map(d => d.toLowerCase());

      if (options.removeWww) {
        matches = matches.map(d => d.replace(/^www\./, ''));
      }

      if (options.removeDuplicates) {
        matches = Array.from(new Set(matches));
      }

      if (options.alphabetical) {
        matches.sort();
      }

      setDomains(matches.map(toStd));
    } catch (e) {
      console.error("Invalid Regex Generation", e);
      setDomains([]);
    }
  };

  useEffect(() => {
    extractDomains();
  }, [input, options, selectedExt]);

  const handleCopy = () => {
    if (domains.length === 0) return;
    navigator.clipboard.writeText(domains.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadTxt = () => {
    if (domains.length === 0) return;
    const blob = new Blob([domains.join('\n')], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `strongtools_domains_${new Date().getTime()}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const extensions: ExtensionFilter[] = ['all', '.com', '.net', '.site', '.org'];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Domain Extraction Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Globe2 size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Hostname Data Harvesting Node 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Registry Safe 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <label className="text-[10px] font-black uppercase text-gray-500 italic">Input Source Text</label>
                 <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              </div>
              <textarea 
                value={input} 
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 shadow-inner custom-scrollbar italic"
                placeholder="Paste logs or raw text here 0123456789..."
              />
           </div>
           
           <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                 <label className="text-[10px] font-black uppercase text-[#D4AF37] italic">Harvested Registry Result ({domains.length})</label>
                 <button onClick={handleCopy} className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}>
                   {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Vaulted' : 'Copy'}
                 </button>
              </div>
              <div className="w-full h-80 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[2.5rem] p-8 text-gray-300 text-sm overflow-y-auto custom-scrollbar italic shadow-inner whitespace-pre-wrap">
                {domains.length > 0 ? domains.join('\n') : <span className="opacity-10 italic">Awaiting data ingestion handshake 0123456789...</span>}
              </div>
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Extension Filters 0123456789</label>
            <div className="flex flex-wrap gap-2">
              {extensions.map(ext => (
                <button
                  key={ext}
                  onClick={() => setSelectedExt(ext)}
                  className={`px-6 py-3 rounded-xl text-[9px] font-black uppercase tracking-widest border transition-all ${
                    selectedExt === ext 
                    ? 'bg-[#D4AF37] text-black border-[#D4AF37] shadow-lg' 
                    : 'bg-black border-white/10 text-gray-400 hover:border-white/30'
                  }`}
                >
                  {ext}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Tool Protocols 0123456789</label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'removeDuplicates', label: 'Unique Only' },
                { id: 'alphabetical', label: 'Sort A-Z' },
                { id: 'removeWww', label: 'Strip WWW' }
              ].map(opt => (
                <button 
                  key={opt.id}
                  onClick={() => setOptions(prev => ({ ...prev, [opt.id]: !prev[opt.id as keyof typeof prev] }))}
                  className={`px-4 py-3 rounded-xl border flex items-center justify-between text-[9px] font-black uppercase tracking-widest transition-all ${
                    options[opt.id as keyof typeof options] 
                    ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                    : 'bg-white/5 border-white/5 text-gray-500'
                  }`}
                >
                  {opt.label}
                  <div className={`w-1.5 h-1.5 rounded-full ${options[opt.id as keyof typeof options] ? 'bg-[#D4AF37]' : 'bg-white/10'}`}></div>
                </button>
              ))}
              <button
                onClick={downloadTxt}
                disabled={domains.length === 0}
                className="bg-emerald-600 text-white rounded-xl font-black text-[9px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all disabled:opacity-20"
              >
                <Download size={14}/> Save Registry
              </button>
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

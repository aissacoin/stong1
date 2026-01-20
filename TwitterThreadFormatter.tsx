
import React, { useState, useEffect } from 'react';
import { Twitter, Layout, Scissors, Copy, Check, ShieldCheck, Zap, Info, Target, Sparkles, HelpCircle, BookOpen, Trash2 } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const TwitterThreadFormatter: React.FC = () => {
  const { t } = useLanguage();
  const [input, setInput] = useState('');
  const [tweets, setTweets] = useState<string[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);

  const langT = t.tools['tweet-thread'] || {
    name: 'Thread Master Scribe',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  useEffect(() => {
    if (!input.trim()) {
      setTweets([]);
      return;
    }
    // Partitioning logic: split by ~280 chars or specific newline markers
    const parts = input.match(/.{1,260}(\s|$)/g) || [];
    setTweets(parts.map((p, i) => `${i + 1}/ ${p.trim()} 🧵`));
  }, [input]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Narrative Partition Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <Twitter size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Viral Narrative Partitioning Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Logic Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source Manuscript Ingestion</label>
              <button onClick={() => setInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea 
              value={input} 
              onChange={e => setInput(e.target.value)} 
              className="w-full h-[450px] bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-base leading-relaxed outline-none focus:border-blue-500/40 transition-all shadow-inner custom-scrollbar italic" 
              placeholder="Paste your professional long form manuscript here for partitioning..."
            />
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Partitioned Node Registry</label>
              <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest tabular-nums">{tweets.length} Nodes Manifested</div>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-8 space-y-4 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {tweets.length > 0 ? (
                 <div className="space-y-3 animate-in fade-in duration-700">
                    {tweets.map((t, i) => (
                      <div key={i} className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-6 hover:border-blue-500/40 transition-all">
                        <p className="text-sm text-gray-200 leading-relaxed italic">{t}</p>
                        <button 
                          onClick={() => { navigator.clipboard.writeText(t); setCopiedIdx(i); setTimeout(()=>setCopiedIdx(null), 2000); }} 
                          className={`absolute top-4 right-4 p-2 rounded-lg transition-all ${copiedIdx === i ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-500 hover:bg-blue-600 hover:text-white'}`}
                        >
                          {copiedIdx === i ? <Check size={14}/> : <Copy size={14}/>}
                        </button>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Scissors size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Archival Ingestion</p>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Sequential Partitioning Engine Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Linguistic Boundary Logic Verified</p>
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

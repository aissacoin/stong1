
import React, { useState } from 'react';
import { 
  LayoutGrid, Upload, Trash2, Instagram, Info, 
  ShieldCheck, Target, Sparkles, HelpCircle, 
  BookOpen, Layout, Zap 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const InstaGridPlanner: React.FC = () => {
  const { t } = useLanguage();
  const [images, setImages] = useState<string[]>([]);

  const langT = t.tools['insta-grid'] || {
    name: 'Grid Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []) as File[];
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setImages(prev => [url, ...prev].slice(0, 12));
    });
  };

  const removeImage = (idx: number) => {
    setImages(prev => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Grid Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-pink-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden selection:bg-pink-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-purple-500"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-pink-500">
              <Instagram size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-pink-500/40 uppercase tracking-[0.4em]">Visual Registry Simulation Node</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
             <div className="relative cursor-pointer bg-white/5 border border-white/10 px-6 py-3 rounded-2xl hover:bg-white/10 transition-all flex items-center gap-3 shadow-xl">
                <Upload size={18} className="text-pink-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white">Inject Visual Assets</span>
                <input type="file" multiple onChange={handleUpload} className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*" />
             </div>
             <div className="hidden sm:flex items-center gap-2 px-5 py-3 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Memory Active</span>
             </div>
          </div>
        </div>

        <div className="max-w-md mx-auto relative">
          <div className="absolute -inset-10 bg-gradient-to-tr from-pink-500/5 to-purple-500/5 blur-[100px] rounded-full"></div>
          
          <div className="relative grid grid-cols-3 gap-1 bg-[#111] p-1 rounded-[2.5rem] shadow-2xl border border-white/5 overflow-hidden">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="aspect-square bg-zinc-900/50 overflow-hidden relative group">
                {images[i] ? (
                  <>
                    <img src={images[i]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" alt="Grid Slot" />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                       <button 
                        onClick={() => removeImage(i)}
                        className="p-3 bg-rose-600 text-white rounded-full hover:scale-110 active:scale-95 transition-all"
                       >
                         <Trash2 size={18}/>
                       </button>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center opacity-10 space-y-2">
                    <LayoutGrid size={24} />
                    <span className="text-[6px] font-black uppercase tracking-widest">Null Node</span>
                  </div>
                )}
                {/* Decorative coordinate label */}
                <div className="absolute top-1 left-1 opacity-20 pointer-events-none">
                   <span className="text-[6px] font-mono text-white">X:{i % 3} Y:{Math.floor(i / 3)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-pink-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Aesthetic Entropy Protocol Verified</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Layout size={20} className="text-purple-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Spatial Coordinate Symmetry Active</p>
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

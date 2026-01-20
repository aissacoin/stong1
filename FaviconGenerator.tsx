
import React, { useState, useRef, useEffect } from 'react';
import { 
  Box, Upload, Download, Trash2, Layout, ShieldCheck, 
  Zap, Info, Image as ImageIcon, Check, Loader2, 
  Settings2, Smartphone, Monitor, Globe, FileJson, Layers, Target, Sparkles, HelpCircle, BookOpen
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface FaviconSize {
  id: string;
  size: number;
  label: string;
  selected: boolean;
  platform: 'browser' | 'ios' | 'android';
}

const FAVICON_SIZES: FaviconSize[] = [
  { id: '16', size: 16, label: 'Browser Tab', selected: true, platform: 'browser' },
  { id: '32', size: 32, label: 'Taskbar', selected: true, platform: 'browser' },
  { id: '48', size: 48, label: 'Desktop', selected: true, platform: 'browser' },
  { id: '180', size: 180, label: 'Apple Touch', selected: true, platform: 'ios' },
  { id: '192', size: 192, label: 'Android Small', selected: true, platform: 'android' },
  { id: '512', size: 512, label: 'Android Splash', selected: true, platform: 'android' },
];

export const FaviconGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [originalImage, setOriginalImage] = useState<HTMLImageElement | null>(null);
  const [sizes, setSizes] = useState<FaviconSize[]>(FAVICON_SIZES);
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [processing, setProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['favicon-gen'] || {
    name: 'Sovereign Favicon Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          setOriginalImage(img);
          generateAllFavicons(img);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const generateAllFavicons = (img: HTMLImageElement) => {
    setProcessing(true);
    const newPreviews: Record<string, string> = {};
    
    sizes.forEach(s => {
      if (s.selected) {
        const canvas = document.createElement('canvas');
        canvas.width = s.size;
        canvas.height = s.size;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.imageSmoothingQuality = 'high';
          ctx.drawImage(img, 0, 0, s.size, s.size);
          newPreviews[s.id] = canvas.toDataURL('image/png');
        }
      }
    });

    setPreviews(newPreviews);
    setProcessing(false);
  };

  useEffect(() => {
    if (originalImage) generateAllFavicons(originalImage);
  }, [sizes]);

  const toggleSize = (id: string) => {
    setSizes(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const downloadIndividual = (id: string, size: number) => {
    const url = previews[id];
    if (!url) return;
    const link = document.createElement('a');
    link.href = url;
    link.download = `favicon-${size}x${size}.png`;
    link.click();
  };

  const handleClear = () => {
    setOriginalImage(null);
    setPreviews({});
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Favicon Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Layers size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Multi-Platform Manifest Forge 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Cross-Platform Standard 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-8 border-r border-white/5 pr-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Registry Source</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-40 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${originalImage ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
              >
                {originalImage ? (
                   <div className="text-center animate-in fade-in">
                     <ImageIcon size={32} className="text-[#D4AF37] mx-auto mb-2" />
                     <p className="text-[8px] text-white font-black uppercase tracking-widest">Image Ingested 0123456789</p>
                   </div>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Asset Master</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Scaling Configuration</label>
              <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                {sizes.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => toggleSize(s.id)}
                    className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      s.selected 
                      ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' 
                      : 'bg-white/5 border-white/5 text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                       <div className="opacity-40">{s.platform === 'ios' ? <Smartphone size={14}/> : s.platform === 'android' ? <Smartphone size={14}/> : <Monitor size={14}/>}</div>
                       <span className="text-[10px] font-black uppercase tracking-widest">{s.label}</span>
                    </div>
                    <span className="text-[9px] font-bold opacity-30 tabular-nums">{s.size}x{s.size}</span>
                  </button>
                ))}
              </div>
            </div>

            <button onClick={handleClear} className="w-full py-4 border border-white/5 text-gray-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-rose-500 hover:border-rose-500/20 transition-all">
              Wipe Current Manifest 0123456789
            </button>
          </div>

          {/* Grid Viewport */}
          <div className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Favicon Registry Preview</label>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-hidden shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {originalImage ? (
                 <div className="relative z-10 grid grid-cols-2 md:grid-cols-3 gap-6 animate-in fade-in duration-1000">
                    {sizes.filter(s => s.selected).map((s) => (
                      <div key={s.id} className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-between gap-4 group hover:border-[#D4AF37]/40 transition-all">
                         <div className="text-[8px] font-black uppercase text-gray-600 tracking-widest">{s.size}x{s.size}</div>
                         <div className="flex-grow flex items-center justify-center">
                            <img 
                              src={previews[s.id]} 
                              style={{ width: s.size > 128 ? 128 : s.size, height: s.size > 128 ? 128 : s.size }}
                              className="shadow-2xl rounded-sm"
                              alt={`Favicon ${s.size}`}
                            />
                         </div>
                         <button 
                          onClick={() => downloadIndividual(s.id, s.size)}
                          className="mt-2 w-full py-2 bg-[#D4AF37]/5 text-[#D4AF37] rounded-xl text-[8px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all"
                         >
                            Export PNG 0123456789
                         </button>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Globe size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Digital Identity Source 0123456789</p>
                 </div>
               )}
            </div>

            {originalImage && (
              <div className="p-8 bg-black border border-white/5 rounded-[2.5rem] space-y-6 animate-in slide-in-from-bottom-4">
                 <div className="flex items-center gap-3 text-emerald-400">
                    <FileJson size={18} />
                    <span className="text-[10px] font-black uppercase tracking-[0.4em]">HTML Implementation Manuscript</span>
                 </div>
                 <pre className="p-6 bg-black rounded-2xl text-[10px] font-mono text-emerald-400/80 overflow-x-auto custom-scrollbar leading-relaxed tabular-nums">
{`<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">`}
                 </pre>
              </div>
            )}
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Identity Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

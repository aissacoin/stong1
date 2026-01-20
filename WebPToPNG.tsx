
import React, { useState, useRef } from 'react';
import { RefreshCw, Upload, Download, Trash2, ShieldCheck, Zap, Info, Image as ImageIcon, Check, Loader2, FileImage, Layout, Target, Sparkles, HelpCircle, BookOpen } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const WebPToPNG: React.FC = () => {
  const { t } = useLanguage();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [pngPreview, setPngPreview] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const toolData = t.tools['webp-to-png'] || {
    name: 'Sovereign WebP Transmuter',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/webp') {
        alert("Institutional Protocol: Please select a valid .webp manuscript.");
        return;
      }
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
      setPngPreview(null);
      setSuccess(false);
    }
  };

  const convertToPng = () => {
    if (!originalPreview) return;
    setProcessing(true);
    setSuccess(false);

    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;
      
      // Clear canvas to ensure transparency support
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);

      // Convert to PNG Data URL
      const pngDataUrl = canvas.toDataURL('image/png');
      setPngPreview(pngDataUrl);
      setProcessing(false);
      setSuccess(true);
    };
    img.src = originalPreview;
  };

  const handleDownload = () => {
    if (!pngPreview) return;
    const link = document.createElement('a');
    link.href = pngPreview;
    link.download = `Sovereign_Archive_${originalFile?.name.replace('.webp', '') || Date.now()}.png`;
    link.click();
  };

  const handleClear = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setPngPreview(null);
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Conversion Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-pink-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-pink-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-2xl border border-pink-500/20 text-pink-400">
              <RefreshCw size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-pink-500/40 uppercase tracking-[0.4em]">Archival Asset Transmutation 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Sandbox Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Registry Ingestion (WebP)</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-52 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${originalPreview ? 'border-pink-500/40' : 'border-white/5 hover:border-pink-500/40'}`}
              >
                {originalPreview ? (
                   <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                      <img src={originalPreview} className="max-w-full max-h-full object-contain rounded-xl opacity-60" alt="Source" />
                      <div className="absolute bottom-4 left-0 w-full text-center">
                         <span className="bg-black/80 px-3 py-1 rounded-full text-[8px] font-black text-white uppercase tracking-widest border border-white/10 tabular-nums">.WEBP Manuscript 0123456789</span>
                      </div>
                   </div>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-pink-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject WebP Scroll</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/webp" />
              </div>
            </div>

            <button
              onClick={convertToPng}
              disabled={processing || !originalFile}
              className="w-full bg-pink-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(219,39,119,0.3)] disabled:opacity-20"
            >
              {processing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  Transmuting Pixels 0123456789...
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Synthesize PNG
                </>
              )}
            </button>
            
            {success && (
              <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-[2.5rem] flex items-center gap-4 animate-in fade-in slide-in-from-top-2">
                 <Check className="text-emerald-400 shrink-0" size={20} />
                 <p className="text-xs text-emerald-400 font-bold uppercase tracking-widest italic leading-relaxed">Transmutation Verified PNG archive ready for export 0123456789</p>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-pink-500 italic">Institutional Result Viewport</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 flex items-center justify-center min-h-[400px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.08] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '20px 20px' }}></div>
               
               {pngPreview ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <img 
                      src={pngPreview} 
                      className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                      alt="PNG result" 
                    />
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <FileImage size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Digital Transmutation 0123456789</p>
                 </div>
               )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!pngPreview}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20"
            >
              <Download size={24}/>
              Export Synthesized PNG 0123456789
            </button>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Conversion Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

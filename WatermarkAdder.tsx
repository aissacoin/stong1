
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShieldCheck, Upload, Download, Trash2, LayoutGrid, 
  Zap, Info, Image as ImageIcon, Check, Loader2, 
  Settings2, Move, Maximize, MousePointer2, Copy, Layers
} from 'lucide-react';

interface Position {
  id: string;
  label: string;
  x: 'left' | 'center' | 'right';
  y: 'top' | 'middle' | 'bottom';
}

const POSITIONS: Position[] = [
  { id: 'tl', label: 'Top Left', x: 'left', y: 'top' },
  { id: 'tc', label: 'Top Center', x: 'center', y: 'top' },
  { id: 'tr', label: 'Top Right', x: 'right', y: 'top' },
  { id: 'ml', label: 'Mid Left', x: 'left', y: 'middle' },
  { id: 'cc', label: 'Center', x: 'center', y: 'middle' },
  { id: 'mr', label: 'Mid Right', x: 'right', y: 'middle' },
  { id: 'bl', label: 'Bottom Left', x: 'left', y: 'bottom' },
  { id: 'bc', label: 'Bottom Center', x: 'center', y: 'bottom' },
  { id: 'br', label: 'Bottom Right', x: 'right', y: 'bottom' },
];

export const WatermarkAdder: React.FC = () => {
  const [baseImage, setBaseImage] = useState<HTMLImageElement | null>(null);
  const [watermarkImage, setWatermarkImage] = useState<HTMLImageElement | null>(null);
  const [opacity, setOpacity] = useState(0.5);
  const [scale, setScale] = useState(0.2);
  const [padding, setPadding] = useState(20);
  const [selectedPos, setSelectedPos] = useState<Position>(POSITIONS[8]); // Default BR
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const baseInputRef = useRef<HTMLInputElement>(null);
  const watermarkInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'base' | 'watermark') => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          if (type === 'base') setBaseImage(img);
          else setWatermarkImage(img);
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const drawWatermark = () => {
    if (!baseImage || !canvasRef.current) return;
    setProcessing(true);
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = baseImage.width;
    canvas.height = baseImage.height;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(baseImage, 0, 0);

    if (watermarkImage) {
      ctx.globalAlpha = opacity;
      
      const wWidth = baseImage.width * scale;
      const wHeight = (watermarkImage.height / watermarkImage.width) * wWidth;
      
      let x = padding;
      let y = padding;

      if (selectedPos.x === 'center') x = (baseImage.width - wWidth) / 2;
      if (selectedPos.x === 'right') x = baseImage.width - wWidth - padding;
      
      if (selectedPos.y === 'middle') y = (baseImage.height - wHeight) / 2;
      if (selectedPos.y === 'bottom') y = baseImage.height - wHeight - padding;

      ctx.drawImage(watermarkImage, x, y, wWidth, wHeight);
      ctx.globalAlpha = 1.0;
    }

    setPreviewUrl(canvas.toDataURL('image/png'));
    setProcessing(false);
  };

  useEffect(() => {
    if (baseImage) drawWatermark();
  }, [baseImage, watermarkImage, opacity, scale, padding, selectedPos]);

  const handleDownload = () => {
    if (!previewUrl) return;
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `Sovereign_Watermark_${Date.now()}.png`;
    link.click();
  };

  const handleClear = () => {
    setBaseImage(null);
    setWatermarkImage(null);
    setPreviewUrl(null);
    if (baseInputRef.current) baseInputRef.current.value = '';
    if (watermarkInputRef.current) watermarkInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Layers size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sovereign Watermark Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Proprietary Visual Protection Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Synthesis Protocol MMXXV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-8 border-r border-white/5 pr-8">
            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Ingest Base Asset</label>
                <div 
                  onClick={() => baseInputRef.current?.click()}
                  className={`group relative cursor-pointer h-32 bg-black border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 transition-all overflow-hidden ${baseImage ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
                >
                  {baseImage ? (
                     <div className="flex flex-col items-center animate-in fade-in">
                        <Check size={24} className="text-emerald-400 mb-1" />
                        <span className="text-[8px] text-white font-black uppercase tracking-widest">Base Loaded</span>
                     </div>
                  ) : (
                    <>
                      <Upload size={24} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Main Image</span>
                    </>
                  )}
                  <input type="file" ref={baseInputRef} onChange={(e) => handleImageUpload(e, 'base')} className="hidden" accept="image/*" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Ingest Sovereign Mark</label>
                <div 
                  onClick={() => watermarkInputRef.current?.click()}
                  className={`group relative cursor-pointer h-32 bg-black border-2 border-dashed rounded-3xl flex flex-col items-center justify-center gap-2 transition-all overflow-hidden ${watermarkImage ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
                >
                  {watermarkImage ? (
                     <div className="flex flex-col items-center animate-in fade-in">
                        <Check size={24} className="text-[#D4AF37] mb-1" />
                        <span className="text-[8px] text-white font-black uppercase tracking-widest">Mark Loaded</span>
                     </div>
                  ) : (
                    <>
                      <Zap size={24} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                      <span className="text-[8px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Logo Mark</span>
                    </>
                  )}
                  <input type="file" ref={watermarkInputRef} onChange={(e) => handleImageUpload(e, 'watermark')} className="hidden" accept="image/*" />
                </div>
              </div>
            </div>

            <div className="space-y-6 bg-white/[0.02] p-6 rounded-[2.5rem] border border-white/5 shadow-inner">
               <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Opacity Logic</span>
                    <span className="text-[10px] font-bold text-[#D4AF37] tabular-nums">{Math.round(opacity * 100)}%</span>
                  </div>
                  <input type="range" min="0" max="1" step="0.01" value={opacity} onChange={(e) => setOpacity(parseFloat(e.target.value))} className="w-full accent-[#D4AF37]" />
               </div>

               <div className="space-y-4">
                  <div className="flex justify-between items-center px-1">
                    <span className="text-[9px] font-black uppercase tracking-widest text-gray-500">Scaling Meridian</span>
                    <span className="text-[10px] font-bold text-[#D4AF37] tabular-nums">{Math.round(scale * 100)}%</span>
                  </div>
                  <input type="range" min="0.05" max="1" step="0.01" value={scale} onChange={(e) => setScale(parseFloat(e.target.value))} className="w-full accent-[#D4AF37]" />
               </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">3. Positional Handshake</label>
               <div className="grid grid-cols-3 gap-2">
                  {POSITIONS.map((pos) => (
                    <button
                      key={pos.id}
                      onClick={() => setSelectedPos(pos)}
                      className={`h-12 rounded-xl border transition-all flex items-center justify-center ${selectedPos.id === pos.id ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-700 hover:text-white'}`}
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-current"></div>
                    </button>
                  ))}
               </div>
               <p className="text-center text-[7px] font-black uppercase text-gray-700 tracking-[0.3em]">{selectedPos.label} Selected</p>
            </div>

            <button onClick={handleClear} className="w-full py-4 border border-white/5 text-gray-600 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:text-rose-500 hover:border-rose-500/20 transition-all">
              Reset Digital Workspace
            </button>
          </div>

          {/* Viewport Side */}
          <div className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Proprietary Result Viewport</label>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[500px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {previewUrl ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <img 
                      src={previewUrl} 
                      className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                      alt="Watermarked result" 
                    />
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <ImageIcon size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Digital Assets for Synthesis</p>
                 </div>
               )}
               <canvas ref={canvasRef} className="hidden" />
            </div>

            <button
              onClick={handleDownload}
              disabled={!previewUrl || !baseImage}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              <Download size={24}/>
              Export Protected Asset (.PNG)
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">High-Fidelity Alpha Blending Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Browser-Native Synthesis Verification</p>
           </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { 
  Maximize, Monitor, Smartphone, Film, 
  RotateCw, ShieldCheck, Zap, Info, Target, 
  ChevronRight, ArrowRightLeft, Lock, Unlock,
  Youtube, Instagram, Clapperboard, Video
} from 'lucide-react';

interface RatioPreset {
  name: string;
  ratio: string;
  w: number;
  h: number;
  icon: React.ReactNode;
  category: 'Social' | 'Cinema' | 'Broadcast';
}

const PRESETS: RatioPreset[] = [
  { name: 'YouTube / HD', ratio: '16:9', w: 16, h: 9, icon: <Youtube size={14}/>, category: 'Broadcast' },
  { name: 'TikTok / Reels', ratio: '9:16', w: 9, h: 16, icon: <Smartphone size={14}/>, category: 'Social' },
  { name: 'Instagram Post', ratio: '4:5', w: 4, h: 5, icon: <Instagram size={14}/>, category: 'Social' },
  { name: 'Instagram Square', ratio: '1:1', w: 1, h: 1, icon: <Instagram size={14}/>, category: 'Social' },
  { name: 'Anamorphic', ratio: '2.39:1', w: 2.39, h: 1, icon: <Clapperboard size={14}/>, category: 'Cinema' },
  { name: 'Classic Cinema', ratio: '1.85:1', w: 1.85, h: 1, icon: <Film size={14}/>, category: 'Cinema' },
  { name: 'IMAX Digital', ratio: '1.9:1', w: 1.9, h: 1, icon: <Clapperboard size={14}/>, category: 'Cinema' },
  { name: 'Ultra-Wide', ratio: '21:9', w: 21, h: 9, icon: <Monitor size={14}/>, category: 'Broadcast' },
];

export const VideoRatioCalculator: React.FC = () => {
  const [width, setWidth] = useState<number>(1920);
  const [height, setHeight] = useState<number>(1080);
  const [customRatioW, setCustomRatioW] = useState<number>(16);
  const [customRatioH, setCustomRatioH] = useState<number>(9);
  const [lockedAxis, setLockedAxis] = useState<'ratio' | 'none'>('ratio');

  // Standard Numerals Enforcement (1234567890)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const handleWidthChange = (val: string) => {
    const w = parseInt(toStd(val)) || 0;
    setWidth(w);
    if (lockedAxis === 'ratio') {
      const h = Math.round(w * (customRatioH / customRatioW));
      setHeight(h);
    }
  };

  const handleHeightChange = (val: string) => {
    const h = parseInt(toStd(val)) || 0;
    setHeight(h);
    if (lockedAxis === 'ratio') {
      const w = Math.round(h * (customRatioW / customRatioH));
      setWidth(w);
    }
  };

  const selectPreset = (p: RatioPreset) => {
    setCustomRatioW(p.w);
    setCustomRatioH(p.h);
    const newHeight = Math.round(width * (p.h / p.w));
    setHeight(newHeight);
  };

  const calculateGCD = (a: number, b: number): number => {
    return b === 0 ? a : calculateGCD(b, a % b);
  };

  const getCurrentRatioLabel = () => {
    const commonFactor = calculateGCD(width, height);
    if (commonFactor === 0) return "0:0";
    return `${width / commonFactor}:${height / commonFactor}`;
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Video size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Video Ratio Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Pixel-Perfect Dimensional Solver</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Algorithmically Verified MMXXV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-4 space-y-8 border-r border-white/5 pr-8">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Dimensional Inputs (PX)</label>
              
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Width</span>
                  <div className="relative group">
                    <input 
                      type="text" value={width} onChange={(e) => handleWidthChange(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white text-2xl font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-[10px]">PX</div>
                  </div>
                </div>

                <div className="flex justify-center">
                  <button 
                    onClick={() => setLockedAxis(lockedAxis === 'ratio' ? 'none' : 'ratio')}
                    className={`p-3 rounded-full border transition-all ${lockedAxis === 'ratio' ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-gray-600 border-white/5'}`}
                  >
                    {lockedAxis === 'ratio' ? <Lock size={16} /> : <Unlock size={16} />}
                  </button>
                </div>

                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Height</span>
                  <div className="relative group">
                    <input 
                      type="text" value={height} onChange={(e) => handleHeightChange(e.target.value)}
                      className="w-full bg-black border border-white/10 rounded-2xl p-4 text-white text-2xl font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800 font-bold text-[10px]">PX</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Sovereign Presets</label>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                 {PRESETS.map((p) => (
                   <button
                    key={p.name}
                    onClick={() => selectPreset(p)}
                    className={`flex flex-col items-start p-4 rounded-2xl border transition-all gap-1 ${customRatioW === p.w && customRatioH === p.h ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                   >
                     <div className="flex items-center gap-2 font-black text-[10px] uppercase tracking-tighter">
                       {p.icon} {p.name}
                     </div>
                     <span className="text-[8px] font-bold opacity-40 tabular-nums">{p.ratio}</span>
                   </button>
                 ))}
              </div>
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Active Aspect Viewport</label>
              <div className="text-[10px] font-black uppercase text-gray-600 tabular-nums italic">Calculated Ratio: {getCurrentRatioLabel()}</div>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 flex items-center justify-center min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               <div 
                className="relative bg-[#D4AF37]/10 border-2 border-[#D4AF37]/40 rounded-2xl flex items-center justify-center transition-all duration-500 shadow-[0_0_50px_rgba(212,175,55,0.1)]"
                style={{ 
                  aspectRatio: `${width} / ${height}`,
                  maxWidth: '100%',
                  maxHeight: '100%',
                  width: width > height ? '100%' : 'auto',
                  height: height >= width ? '100%' : 'auto',
                }}
               >
                  <div className="text-center p-4">
                    <div className="text-2xl font-black text-white tabular-nums italic drop-shadow-lg">{width} × {height}</div>
                    <div className="text-[9px] font-bold text-[#D4AF37] uppercase tracking-[0.3em] mt-2">Sovereign Frame</div>
                  </div>
                  
                  {/* Decorative Elements */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-[#D4AF37]/40"></div>
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-[#D4AF37]/40"></div>
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-[#D4AF37]/40"></div>
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-[#D4AF37]/40"></div>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
               <button onClick={() => {setWidth(3840); setHeight(2160)}} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase text-gray-500 hover:text-white hover:border-[#D4AF37]/40 transition-all">4K Ultra HD</button>
               <button onClick={() => {setWidth(2560); setHeight(1440)}} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase text-gray-500 hover:text-white hover:border-[#D4AF37]/40 transition-all">2K Quad HD</button>
               <button onClick={() => {setWidth(1920); setHeight(1080)}} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase text-gray-500 hover:text-white hover:border-[#D4AF37]/40 transition-all">1080p Full HD</button>
               <button onClick={() => {setWidth(1280); setHeight(720)}} className="p-4 bg-white/5 border border-white/5 rounded-2xl text-[9px] font-black uppercase text-gray-500 hover:text-white hover:border-[#D4AF37]/40 transition-all">720p HD</button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Standard Decimal Handshake Enabled</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Aspect Ratio Lock-Step Calibration Active</p>
           </div>
        </div>
      </div>
    </div>
  );
};

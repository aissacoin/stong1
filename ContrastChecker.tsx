
import React, { useState, useEffect } from 'react';
import { 
  Eye, ShieldCheck, Zap, Info, Palette, Type, Check, 
  AlertCircle, RefreshCw, Layers, Monitor, Target,
  CheckCircle2, XCircle
} from 'lucide-react';

export const ContrastChecker: React.FC = () => {
  const [fgColor, setFgColor] = useState('#D4AF37');
  const [bgColor, setBgColor] = useState('#0A0A0A');
  const [ratio, setRatio] = useState<number>(0);

  const hexToRgb = (hex: string) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return { r, g, b };
  };

  const getLuminance = (r: number, g: number, b: number) => {
    const a = [r, g, b].map(v => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
  };

  const calculateContrast = () => {
    const rgb1 = hexToRgb(fgColor);
    const rgb2 = hexToRgb(bgColor);
    const l1 = getLuminance(rgb1.r, rgb1.g, rgb1.b);
    const l2 = getLuminance(rgb2.r, rgb2.g, rgb2.b);
    
    const brightest = Math.max(l1, l2);
    const darkest = Math.min(l1, l2);
    const res = (brightest + 0.05) / (darkest + 0.05);
    setRatio(Number(res.toFixed(2)));
  };

  useEffect(() => {
    calculateContrast();
  }, [fgColor, bgColor]);

  const ComplianceBadge = ({ pass, label }: { pass: boolean, label: string }) => (
    <div className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${pass ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-rose-500/10 border-rose-500/30 text-rose-400'}`}>
      <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
      {pass ? <CheckCircle2 size={16} /> : <XCircle size={16} />}
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Eye size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Accessibility Contrast Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">WCAG 2.1 Chromatic Compliance Node</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Official W3C Logic Standard</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Foreground (Manuscript)</label>
                <div className="flex gap-2">
                  <input 
                    type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                    className="w-14 h-14 bg-black border border-white/10 rounded-xl cursor-pointer p-1"
                  />
                  <input 
                    type="text" value={fgColor} onChange={(e) => setFgColor(e.target.value.toUpperCase())}
                    className="flex-grow bg-black border border-white/10 rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Background (Backdrop)</label>
                <div className="flex gap-2">
                  <input 
                    type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="w-14 h-14 bg-black border border-white/10 rounded-xl cursor-pointer p-1"
                  />
                  <input 
                    type="text" value={bgColor} onChange={(e) => setBgColor(e.target.value.toUpperCase())}
                    className="flex-grow bg-black border border-white/10 rounded-xl p-4 text-white font-mono text-sm outline-none focus:border-[#D4AF37]/40"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#D4AF37]/5 border border-dashed border-[#D4AF37]/20 rounded-[2.5rem] flex flex-col items-center text-center gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]">Contrast Ratio</span>
               <div className="text-7xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-lg">
                 {ratio}:1
               </div>
               <div className="flex gap-2">
                 <button onClick={() => { const temp = fgColor; setFgColor(bgColor); setBgColor(temp); }} className="p-3 bg-white/5 border border-white/10 rounded-xl text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all">
                    <RefreshCw size={16} />
                 </button>
               </div>
            </div>
          </div>

          {/* Results column */}
          <div className="lg:col-span-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
               {/* Simulation Node */}
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Visual Simulation Terminal</label>
                  <div 
                    className="h-64 rounded-[3rem] p-10 flex flex-col justify-center border border-white/5 shadow-inner relative overflow-hidden transition-colors duration-500"
                    style={{ backgroundColor: bgColor }}
                  >
                    <div className="absolute top-0 left-0 w-full h-1 bg-white/5"></div>
                    <div className="space-y-4 relative z-10" style={{ color: fgColor }}>
                       <h3 className="text-3xl font-black italic tracking-tighter uppercase">Sub-Pixel Text</h3>
                       <p className="text-sm font-medium leading-relaxed italic">
                         "The objective of accessibility is not merely compliance, but the absolute removal of barriers to information."
                       </p>
                    </div>
                  </div>
               </div>

               {/* Compliance Registry */}
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Compliance Registry Status</label>
                  <div className="space-y-3">
                     <ComplianceBadge label="WCAG AA Normal" pass={ratio >= 4.5} />
                     <ComplianceBadge label="WCAG AA Large" pass={ratio >= 3} />
                     <ComplianceBadge label="WCAG AAA Normal" pass={ratio >= 7} />
                     <ComplianceBadge label="WCAG AAA Large" pass={ratio >= 4.5} />
                  </div>
               </div>
            </div>

            <div className="bg-black border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-6">
               <div className="flex items-center gap-4">
                  <Info className="text-[#D4AF37]/40" size={24} />
                  <p className="text-[11px] text-gray-500 leading-relaxed italic">
                    Large text is defined as 18pt (24px) or larger, or 14pt (18.66px) bold or larger. Standard text is anything smaller.
                  </p>
               </div>
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/20"></div>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40"></div>
                  <div className="w-2 h-2 rounded-full bg-[#D4AF37]/60"></div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Real-Time Spectral Analysis Node Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Monitor size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Institutional Multi-Device Rendering Verified</p>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-[#D4AF37]/5 border-2 border-dashed border-[#D4AF37]/20 rounded-[4rem] relative overflow-hidden group">
         <Info className="absolute -bottom-10 -right-10 opacity-[0.03] text-[#D4AF37] rotate-12" size={300} />
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-[#D4AF37]">
               <Layers size={24} />
               <h3 className="text-2xl font-black uppercase italic tracking-tighter font-serif-scholarly">Technical Protocol: Luminance Delta</h3>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed italic">
              "The Accessibility Contrast Architect utilizes the **W3C WCAG 2.1 Formula** for relative luminance. By normalizing the 8-bit sRGB color space into linear coordinates, we calculate the geometric ratio of perceived brightness. This handshake ensures that digital manuscripts remain readable for users with various visual archetypes, including color-deficiency and low-vision spectra, maintaining absolute informational integrity."
            </p>
         </div>
      </div>
    </div>
  );
};

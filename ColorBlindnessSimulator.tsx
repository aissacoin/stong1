
import React, { useState, useRef } from 'react';
import { Eye, Upload, Download, Trash2, ShieldCheck, Zap, Info, Layers, Maximize } from 'lucide-react';

type VisionMode = 'Normal' | 'Protanopia' | 'Deuteranopia' | 'Tritanopia' | 'Achromatopsia';

export const ColorBlindnessSimulator: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [mode, setMode] = useState<VisionMode>('Normal');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const getFilter = () => {
    switch (mode) {
      case 'Protanopia': return 'url(#protanopia)';
      case 'Deuteranopia': return 'url(#deuteranopia)';
      case 'Tritanopia': return 'url(#tritanopia)';
      case 'Achromatopsia': return 'grayscale(100%)';
      default: return 'none';
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-pink-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-pink-500/10 rounded-2xl text-pink-500"><Eye size={28} /></div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Vision Accessibility Simulator</h2>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em]">Chromatic Spectrum Analysis Node</p>
          </div>
        </div>
        <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
          {(['Normal', 'Protanopia', 'Deuteranopia', 'Tritanopia', 'Achromatopsia'] as VisionMode[]).map(m => (
            <button key={m} onClick={() => setMode(m)} className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase transition-all ${mode === m ? 'bg-pink-500 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}>{m}</button>
          ))}
        </div>
      </div>

      {!image ? (
        <div onClick={() => fileInputRef.current?.click()} className="h-96 bg-black border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center cursor-pointer hover:border-pink-500/40 transition-all group">
          <Upload size={48} className="text-gray-700 group-hover:text-pink-500 mb-4 transition-colors" />
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Inject UI Screenshot</span>
          <input type="file" ref={fileInputRef} onChange={e => { const f = e.target.files?.[0]; if(f) setImage(URL.createObjectURL(f)); }} className="hidden" accept="image/*" />
        </div>
      ) : (
        <div className="relative group">
          <div className="bg-black/60 border border-white/10 rounded-[3rem] p-4 flex items-center justify-center min-h-[500px] shadow-inner overflow-hidden">
            <img src={image} className="max-w-full max-h-[600px] rounded-2xl transition-all duration-500" style={{ filter: getFilter() }} />
          </div>
          <button onClick={() => setImage(null)} className="absolute top-6 right-6 p-4 bg-rose-600 text-white rounded-full shadow-2xl hover:scale-110 transition-all opacity-0 group-hover:opacity-100"><Trash2 size={20}/></button>
        </div>
      )}

      {/* SVG Filters for simulating color blindness */}
      <svg className="hidden">
        <defs>
          <filter id="protanopia">
            <feColorMatrix type="matrix" values="0.567, 0.433, 0, 0, 0, 0.558, 0.442, 0, 0, 0, 0, 0.242, 0.758, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="deuteranopia">
            <feColorMatrix type="matrix" values="0.625, 0.375, 0, 0, 0, 0.7, 0.3, 0, 0, 0, 0, 0.3, 0.7, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
          <filter id="tritanopia">
            <feColorMatrix type="matrix" values="0.95, 0.05, 0, 0, 0, 0, 0.433, 0.567, 0, 0, 0, 0.475, 0.525, 0, 0, 0, 0, 0, 1, 0" />
          </filter>
        </defs>
      </svg>
    </div>
  );
};

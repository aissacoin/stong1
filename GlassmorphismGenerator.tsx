
import React, { useState } from 'react';
import { Layers, Copy, Check, Target, Zap } from 'lucide-react';

export const GlassmorphismGenerator: React.FC = () => {
  const [blur, setBlur] = useState(10);
  const [transparency, setTransparency] = useState(0.2);
  const [copied, setCopied] = useState(false);

  const css = `background: rgba(255, 255, 255, ${transparency});
border-radius: 16px;
box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
backdrop-filter: blur(${blur}px);
-webkit-backdrop-filter: blur(${blur}px);
border: 1px solid rgba(255, 255, 255, ${transparency + 0.1});`;

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Layers size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Glassmorphism Forge</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Blur Intensity</label>
            <input type="range" min="0" max="40" value={blur} onChange={e => setBlur(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Transparency</label>
            <input type="range" min="0" max="1" step="0.05" value={transparency} onChange={e => setTransparency(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
          </div>
          <div className="p-6 bg-black rounded-2xl border border-white/5 relative group">
            <pre className="text-[10px] font-mono text-[#D4AF37]">{css}</pre>
            <button onClick={() => { navigator.clipboard.writeText(css); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-[#D4AF37]">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 rounded-[3rem] p-20 min-h-[400px]">
           <div style={{ background: `rgba(255, 255, 255, ${transparency})`, backdropFilter: `blur(${blur}px)`, borderRadius: '32px', border: `1px solid rgba(255, 255, 255, ${transparency + 0.1})` }} className="w-full h-full flex items-center justify-center p-12 text-center text-white">
              <span className="text-xl font-black uppercase italic tracking-tighter">The Aureate Glass</span>
           </div>
        </div>
      </div>
    </div>
  );
};

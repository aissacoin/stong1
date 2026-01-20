
import React, { useState, useEffect } from 'react';
import { Sigma, Copy, Check, Info, ShieldCheck, Zap, Download } from 'lucide-react';

export const LatexEditor: React.FC = () => {
  const [latex, setLatex] = useState('\\int_{a}^{b} x^2 dx = \\frac{b^3-a^3}{3}');
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(latex);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Sigma size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Latex Equation Architect</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Latex Manuscript</label>
          <textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            className="w-full h-64 bg-black border border-white/5 rounded-[2.5rem] p-6 text-blue-400 font-mono text-sm outline-none focus:border-blue-500/40 transition-all resize-none shadow-inner"
          />
          <button onClick={handleCopy} className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase text-xs tracking-widest flex items-center justify-center gap-2">
            {copied ? <Check size={16}/> : <Copy size={16}/>} {copied ? 'Captured' : 'Copy Latex'}
          </button>
        </div>

        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic px-2">Visual Rendering</label>
          <div className="w-full h-64 bg-white rounded-[2.5rem] p-8 flex items-center justify-center overflow-auto shadow-inner">
             <img 
               src={`https://latex.codecogs.com/png.latex?\\bg_white&space;\\large&space;${encodeURIComponent(latex)}`} 
               alt="Latex Equation" 
               className="max-w-full"
             />
          </div>
          <p className="text-[9px] text-gray-600 italic text-center uppercase tracking-widest">Real-time High-Fidelity Preview Node</p>
        </div>
      </div>
    </div>
  );
};

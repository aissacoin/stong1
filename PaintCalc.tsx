
import React, { useState, useEffect } from 'react';
import { PaintBucket, ShieldCheck, Zap, Info, Maximize, Ruler } from 'lucide-react';

export const PaintCalc: React.FC = () => {
  const [width, setWidth] = useState(4);
  const [length, setLength] = useState(5);
  const [height, setHeight] = useState(3);
  const [coats, setCoats] = useState(2);
  const [coverage, setCoverage] = useState(10); // m2 per liter

  const [result, setResult] = useState(0);

  useEffect(() => {
    const wallArea = (2 * width * height) + (2 * length * height);
    const ceilingArea = width * length;
    const totalArea = (wallArea + ceilingArea) * coats;
    setResult(totalArea / coverage);
  }, [width, length, height, coats, coverage]);

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><PaintBucket size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Paint Quantity Architect</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="grid grid-cols-3 gap-3">
              <div className="space-y-1">
                 <label className="text-[8px] font-black uppercase text-gray-600">Width (m)</label>
                 <input type="number" value={width} onChange={e=>setWidth(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white tabular-nums" />
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] font-black uppercase text-gray-600">Length (m)</label>
                 <input type="number" value={length} onChange={e=>setLength(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white tabular-nums" />
              </div>
              <div className="space-y-1">
                 <label className="text-[8px] font-black uppercase text-gray-600">Height (m)</label>
                 <input type="number" value={height} onChange={e=>setHeight(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-3 text-white tabular-nums" />
              </div>
           </div>
           <div className="space-y-4">
              <div className="flex justify-between text-[10px] font-black uppercase text-gray-500">
                 <span>Coats: {coats}</span>
                 <span>Coverage: {coverage} m²/L</span>
              </div>
              <input type="range" min="1" max="5" value={coats} onChange={e=>setCoats(Number(e.target.value))} className="w-full accent-blue-500" />
           </div>
        </div>
        <div className="bg-blue-600 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Required Volume</span>
           <div className="text-8xl font-black text-white italic tabular-nums tracking-tighter">{result.toFixed(1)}</div>
           <span className="text-xl font-black text-white/60 uppercase tracking-widest mt-2">Liters</span>
        </div>
      </div>
    </div>
  );
};

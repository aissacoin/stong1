
import React, { useState, useEffect } from 'react';
import { Flower2, Grid, Target, Info, ShieldCheck } from 'lucide-react';

export const PlantSpacing: React.FC = () => {
  const [areaWidth, setAreaWidth] = useState(10);
  const [areaLength, setAreaLength] = useState(10);
  const [spacing, setSpacing] = useState(0.5); // meters

  const [total, setTotal] = useState(0);

  useEffect(() => {
    const cols = Math.floor(areaWidth / spacing);
    const rows = Math.floor(areaLength / spacing);
    setTotal(cols * rows);
  }, [areaWidth, areaLength, spacing]);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400"><Flower2 size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Plant Spacing Logic</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Garden Dimensions (m)</label>
              <div className="flex gap-4">
                 <input type="number" value={areaWidth} onChange={e=>setAreaWidth(Number(e.target.value))} placeholder="Width" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black" />
                 <input type="number" value={areaLength} onChange={e=>setAreaLength(Number(e.target.value))} placeholder="Length" className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black" />
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Spacing per Plant (m): {spacing}</label>
              <input type="range" min="0.1" max="2" step="0.05" value={spacing} onChange={e=>setSpacing(Number(e.target.value))} className="w-full accent-emerald-500" />
           </div>
        </div>
        <div className="bg-emerald-600 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Total Capacity</span>
           <div className="text-9xl font-black text-white italic tabular-nums tracking-tighter">{total}</div>
           <span className="text-xl font-black text-white/60 uppercase tracking-widest mt-2">Plants</span>
        </div>
      </div>
    </div>
  );
};

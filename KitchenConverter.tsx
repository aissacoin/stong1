
import React, { useState, useEffect } from 'react';
import { Scale, Utensils, Info, ShieldCheck, Zap, ArrowRightLeft } from 'lucide-react';

const DENSITIES: Record<string, number> = {
  'Flour': 125, // g per cup
  'Sugar': 200,
  'Butter': 227,
  'Rice': 185,
  'Milk/Water': 236
};

export const KitchenConverter: React.FC = () => {
  const [ingredient, setIngredient] = useState('Flour');
  const [cups, setCups] = useState(1);
  const [grams, setGrams] = useState(0);

  useEffect(() => {
    setGrams(cups * DENSITIES[ingredient]);
  }, [cups, ingredient]);

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Scale size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Kitchen Unit Transmuter</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Substance Archetype</label>
              <div className="grid grid-cols-2 gap-2">
                 {Object.keys(DENSITIES).map(k => (
                   <button key={k} onClick={()=>setIngredient(k)} className={`py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${ingredient === k ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 text-gray-600 border-white/5'}`}>{k}</button>
                 ))}
              </div>
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Volume (Cups): {cups}</label>
              <input type="range" min="0.25" max="10" step="0.25" value={cups} onChange={e=>setCups(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
           </div>
        </div>
        <div className="bg-[#D4AF37] rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/50 mb-2">Calculated Weight</span>
           <div className="text-9xl font-black text-black italic tabular-nums tracking-tighter">{Math.round(grams)}</div>
           <span className="text-xl font-black text-black/60 uppercase tracking-widest mt-2">Grams (g)</span>
        </div>
      </div>
    </div>
  );
};

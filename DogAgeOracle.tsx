
import React, { useState, useEffect } from 'react';
import { Dog, ShieldCheck, Zap, Info, HeartPulse } from 'lucide-react';

export const DogAgeOracle: React.FC = () => {
  const [age, setAge] = useState(1);
  const [size, setSize] = useState<'Small' | 'Medium' | 'Large'>('Medium');
  const [humanAge, setHumanAge] = useState(0);

  useEffect(() => {
    // Basic reliable formula: 1st year = 15, 2nd = 9, rest = 4, 5, 6 depending on size
    if (age === 0) { setHumanAge(0); return; }
    if (age === 1) { setHumanAge(15); return; }
    if (age === 2) { setHumanAge(24); return; }
    
    const factor = size === 'Small' ? 4 : size === 'Medium' ? 5 : 6;
    setHumanAge(24 + (age - 2) * factor);
  }, [age, size]);

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400"><Dog size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Dog Age Oracle</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Canine Age (Years): {age}</label>
              <input type="range" min="0" max="20" step="1" value={age} onChange={e=>setAge(Number(e.target.value))} className="w-full accent-orange-500" />
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Breed Size Archetype</label>
              <div className="grid grid-cols-3 gap-2">
                 {(['Small', 'Medium', 'Large'] as const).map(s => (
                   <button key={s} onClick={()=>setSize(s)} className={`py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${size === s ? 'bg-orange-600 text-white border-orange-600' : 'bg-white/5 text-gray-600 border-white/5'}`}>{s}</button>
                 ))}
              </div>
           </div>
        </div>
        <div className="bg-orange-600 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">Human Equivalence</span>
           <div className="text-9xl font-black text-white italic tabular-nums tracking-tighter">{humanAge}</div>
           <span className="text-xl font-black text-white/60 uppercase tracking-widest mt-2">Years Old</span>
        </div>
      </div>
    </div>
  );
};

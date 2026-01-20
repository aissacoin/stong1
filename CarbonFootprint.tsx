
import React, { useState, useEffect } from 'react';
import { CloudRain, Plane, Globe, ShieldCheck, Zap } from 'lucide-react';

export const CarbonFootprint: React.FC = () => {
  const [distance, setDistance] = useState(1000); // km
  const [classType, setClassType] = useState(1); // multiplier
  const [co2, setCo2] = useState(0);

  useEffect(() => {
    // Standard estimation: ~0.15kg CO2 per km for short haul, x class multiplier
    setCo2(distance * 0.15 * classType);
  }, [distance, classType]);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400"><CloudRain size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Flight Carbon Footprint</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Distance (km): {distance}</label>
              <input type="range" min="100" max="15000" step="100" value={distance} onChange={e=>setDistance(Number(e.target.value))} className="w-full accent-emerald-500" />
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Cabin Class</label>
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={()=>setClassType(1)} className={`py-3 rounded-xl border text-[8px] font-black uppercase transition-all ${classType === 1 ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-500'}`}>Economy</button>
                 <button onClick={()=>setClassType(2)} className={`py-3 rounded-xl border text-[8px] font-black uppercase transition-all ${classType === 2 ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-500'}`}>Business</button>
                 <button onClick={()=>setClassType(3)} className={`py-3 rounded-xl border text-[8px] font-black uppercase transition-all ${classType === 3 ? 'bg-emerald-600 text-white' : 'bg-white/5 text-gray-500'}`}>First</button>
              </div>
           </div>
        </div>
        <div className="bg-emerald-700 rounded-[3rem] p-12 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40 mb-2">Estimated Emissions</span>
           <div className="text-7xl font-black text-white italic tabular-nums tracking-tighter">{co2.toFixed(1)}</div>
           <span className="text-xl font-black text-emerald-300 uppercase tracking-widest mt-2">kg of CO2</span>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Zap, DollarSign, Clock, ShieldCheck, Info } from 'lucide-react';

export const ElectricityEstimator: React.FC = () => {
  const [watts, setWatts] = useState(1000);
  const [hours, setHours] = useState(5);
  const [rate, setRate] = useState(0.12); // $ per kWh

  const [daily, setDaily] = useState(0);
  const [monthly, setMonthly] = useState(0);

  useEffect(() => {
    const kwh = (watts * hours) / 1000;
    const cost = kwh * rate;
    setDaily(cost);
    setMonthly(cost * 30.44);
  }, [watts, hours, rate]);

  return (
    <div className="bg-[#0a0a0a] border border-yellow-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-yellow-500/10 rounded-2xl text-yellow-500"><Zap size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Electricity Bill Estimator</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-500 px-2">Appliance Power (Watts)</label>
             <input type="number" value={watts} onChange={e=>setWatts(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-500 px-2">Hours Active Per Day</label>
             <input type="number" value={hours} onChange={e=>setHours(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums" />
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-500 px-2">Tariff Rate ($ / kWh)</label>
             <input type="number" value={rate} step="0.01" onChange={e=>setRate(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-yellow-400 font-black tabular-nums" />
           </div>
        </div>
        <div className="grid grid-cols-1 gap-6">
           <div className="bg-yellow-500 rounded-[2.5rem] p-10 text-center shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/50">Daily Obligation</span>
              <div className="text-6xl font-black text-black italic tabular-nums tracking-tighter">${daily.toFixed(2)}</div>
           </div>
           <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-10 text-center shadow-xl">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-600">Monthly Projection</span>
              <div className="text-6xl font-black text-white italic tabular-nums tracking-tighter">${monthly.toFixed(2)}</div>
           </div>
        </div>
      </div>
    </div>
  );
};

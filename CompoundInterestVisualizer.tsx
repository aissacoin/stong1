import React, { useState, useEffect } from 'react';
import { TrendingUp, Coins, Calendar, ShieldCheck, Zap, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const CompoundInterestVisualizer: React.FC = () => {
  const { t, language } = useLanguage();
  const langT = t.tools['compound-interest'];
  const [principal, setPrincipal] = useState(10000);
  const [contribution, setContribution] = useState(500);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(10);
  const [total, setTotal] = useState(0);

  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  useEffect(() => {
    let current = principal;
    const monthlyRate = (rate / 100) / 12;
    const months = years * 12;
    for (let i = 0; i < months; i++) {
      current = (current + contribution) * (1 + monthlyRate);
    }
    setTotal(current);
  }, [principal, contribution, rate, years]);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400"><TrendingUp size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2 italic">{langT.principal}</label>
            <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} className={`w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums ${language === 'ar' ? 'text-right' : 'text-left'}`} />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2 italic">{langT.monthly}</label>
            <input type="number" value={contribution} onChange={e => setContribution(Number(e.target.value))} className={`w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums ${language === 'ar' ? 'text-right' : 'text-left'}`} />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2 italic">{langT.rate} (%)</label>
              <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className={`w-full bg-black border border-white/5 rounded-2xl p-4 text-emerald-400 font-black tabular-nums ${language === 'ar' ? 'text-right' : 'text-left'}`} />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2 italic">{langT.years}</label>
              <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className={`w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums ${language === 'ar' ? 'text-right' : 'text-left'}`} />
            </div>
          </div>
        </div>

        <div className="bg-emerald-600 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center shadow-xl relative overflow-hidden group">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-2">{langT.total}</span>
           <div className="text-6xl font-black text-white italic tabular-nums tracking-tighter drop-shadow-2xl">
              ${toStd(total.toLocaleString(language === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 0 }))}
           </div>
        </div>
      </div>
    </div>
  );
};
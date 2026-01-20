import React, { useState, useEffect } from 'react';
import { Percent, Plus, Minus, Hash, Activity } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const PercentageCalc: React.FC = () => {
  const [val1, setVal1] = useState<number>(0);
  const [val2, setVal2] = useState<number>(0);
  const [result, setResult] = useState<string>("0.00");
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['perc-calc'];

  // Standard Numerals Enforcement (1234567890)
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  useEffect(() => {
    const calculation = (val1 / 100) * val2;
    setResult(toStd(calculation.toLocaleString('en-US', { 
      minimumFractionDigits: 2, 
      maximumFractionDigits: 2 
    })));
  }, [val1, val2]);

  const adjust = (target: 'val1' | 'val2', amount: number) => {
    if (target === 'val1') setVal1(prev => Math.max(0, prev + amount));
    else setVal2(prev => Math.max(0, prev + amount));
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-xl mx-auto shadow-[0_0_80px_rgba(212,175,55,0.1)] relative overflow-hidden" dir={t.dir}>
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
          <Percent size={24} />
        </div>
        <div className={isAr ? 'text-right' : 'text-left'}>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.internal.title}</h2>
          <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">{langT.internal.sub}</p>
        </div>
      </div>

      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <label className="block text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black mb-2 text-center italic">{langT.internal.label1}</label>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
              <button onClick={() => adjust('val1', -1)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"><Minus size={16} /></button>
              <span className="text-3xl font-black text-white tabular-nums">{toStd(val1)}</span>
              <button onClick={() => adjust('val1', 1)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"><Plus size={16} /></button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] uppercase tracking-[0.4em] text-zinc-500 font-black mb-2 text-center italic">{langT.internal.label2}</label>
            <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-2xl p-2">
              <button onClick={() => adjust('val2', -10)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"><Minus size={16} /></button>
              <span className="text-3xl font-black text-white tabular-nums">{toStd(val2)}</span>
              <button onClick={() => adjust('val2', 10)} className="w-10 h-10 rounded-xl flex items-center justify-center bg-white/5 text-[#D4AF37] hover:bg-[#D4AF37] hover:text-black transition-all"><Plus size={16} /></button>
            </div>
          </div>
        </div>

        <div className="relative group">
          <div className="absolute -inset-4 bg-[var(--accent)] opacity-[0.03] blur-3xl rounded-full"></div>
          <div className="relative p-10 bg-[#D4AF37]/5 border-2 border-[#D4AF37]/20 rounded-[3rem] text-center shadow-inner">
            <div className="flex items-center justify-center gap-3 mb-4 text-[#D4AF37]/40 font-black uppercase text-[9px] tracking-[0.5em]">
              <Activity size={12} /> {langT.internal.result}
            </div>
            <div className="text-6xl md:text-8xl font-black text-[#D4AF37] tabular-nums tracking-tighter italic drop-shadow-2xl">
              {result}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
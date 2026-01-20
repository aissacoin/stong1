
import React, { useState, useEffect } from 'react';
import { 
  Activity, Plus, Minus, ShieldCheck, Zap, Info, 
  Target, HelpCircle, BookOpen, Layout, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const BMICalculator: React.FC = () => {
  const { t } = useLanguage();
  const [weight, setWeight] = useState<number>(70);
  const [height, setHeight] = useState<number>(170);
  const [result, setResult] = useState<{ bmi: string; status: string } | null>(null);
  
  const langT = t.tools['bmi-calc'] || { 
    name: 'BMI Analyzer', 
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const calculateBMI = () => {
    if (weight > 0 && height > 0) {
      const hMeter = height / 100;
      const bmiValue = (weight / (hMeter * hMeter)).toFixed(1);
      let status = 'Normal';
      const bmiFloat = parseFloat(bmiValue);
      
      if (bmiFloat < 18.5) status = 'Underweight';
      else if (bmiFloat < 25) status = 'Normal';
      else if (bmiFloat < 30) status = 'Overweight';
      else status = 'Obese';
      
      setResult({ bmi: bmiValue, status });
    }
  };

  const adjust = (type: 'w' | 'h', amount: number) => {
    if (type === 'w') setWeight(prev => Math.max(10, prev + amount));
    else setHeight(prev => Math.max(50, prev + amount));
  };

  useEffect(() => {
    calculateBMI();
  }, [weight, height]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Biometric Registry Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3.5rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600/10 rounded-2xl border border-emerald-600/20 text-emerald-500">
              <Activity size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Biometric Equilibrium Analysis Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Registry Data Private</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
          <div className="space-y-10">
            <div className="space-y-6">
              <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black px-2 italic">Mass Magnitude</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-[2rem] p-4 shadow-inner">
                  <button onClick={() => adjust('w', -1)} className="w-14 h-14 rounded-2xl bg-white/5 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-lg"><Minus size={20} /></button>
                  <div className="text-center">
                    <span className="text-5xl font-black text-white tabular-nums italic">{weight}</span>
                    <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">Kilograms</p>
                  </div>
                  <button onClick={() => adjust('w', 1)} className="w-14 h-14 rounded-2xl bg-white/5 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-lg"><Plus size={20} /></button>
                </div>
              </div>

              <div className="space-y-4">
                <label className="block text-[10px] uppercase tracking-[0.4em] text-gray-500 font-black px-2 italic">Vertical Stature</label>
                <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-[2rem] p-4 shadow-inner">
                  <button onClick={() => adjust('h', -1)} className="w-14 h-14 rounded-2xl bg-white/5 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-lg"><Minus size={20} /></button>
                  <div className="text-center">
                    <span className="text-5xl font-black text-white tabular-nums italic">{height}</span>
                    <p className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">Centimeters</p>
                  </div>
                  <button onClick={() => adjust('h', 1)} className="w-14 h-14 rounded-2xl bg-white/5 text-emerald-500 hover:bg-emerald-600 hover:text-white transition-all flex items-center justify-center shadow-lg"><Plus size={20} /></button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center">
            {result ? (
              <div className="relative group">
                <div className="absolute -inset-4 bg-emerald-500 opacity-[0.03] blur-3xl rounded-full group-hover:opacity-[0.05] transition-opacity"></div>
                <div className="relative p-12 bg-emerald-500/5 border-2 border-emerald-500/20 rounded-[3.5rem] text-center shadow-2xl animate-in zoom-in duration-700">
                  <div className="flex items-center justify-center gap-3 mb-6 text-emerald-500/40 font-black uppercase text-[9px] tracking-[0.6em] italic">
                    <Zap size={14} /> Calculated Index
                  </div>
                  <div className="text-8xl md:text-9xl font-black text-white tabular-nums tracking-tighter italic drop-shadow-2xl">
                    {result.bmi}
                  </div>
                  <div className="mt-8 px-8 py-3 bg-emerald-600 text-black inline-block rounded-2xl font-black text-xs uppercase tracking-widest italic shadow-xl">
                    {result.status}
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                 <Activity size={100} className="mx-auto" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Metric Handshake</p>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Real Time Physical Processing Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Institutional Precision Standard Verified</p>
           </div>
        </div>
      </div>

      {/* DOCUMENTATION GRID */}
      <div className="mt-16 pt-12 border-t border-[#e7d8c5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Info size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.about}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Health Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

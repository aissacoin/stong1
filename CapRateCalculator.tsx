
import React, { useState, useEffect } from 'react';
import { 
  Building, TrendingUp, Wallet, ShieldCheck, Zap, Info, 
  Target, HelpCircle, BookOpen, Layout, Trash2, Landmark, 
  Receipt, ArrowUpRight, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const CapRateCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [purchasePrice, setPurchasePrice] = useState(500000);
  const [monthlyRent, setMonthlyRent] = useState(3500);
  const [annualExpenses, setAnnualExpenses] = useState(8000);

  const [results, setResults] = useState({ annualIncome: 0, capRate: 0, netOperating: 0 });

  const langT = t.tools['cap-rate'] || {
    name: 'Cap Rate Oracle',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  useEffect(() => {
    const annualGross = monthlyRent * 12;
    const netOperating = annualGross - annualExpenses;
    const capRate = purchasePrice > 0 ? (netOperating / purchasePrice) * 100 : 0;
    setResults({ annualIncome: annualGross, capRate, netOperating });
  }, [purchasePrice, monthlyRent, annualExpenses]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Fiscal Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500">
              <Building size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Yield Architecture Protocol</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Logic Accuracy Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Inputs Column */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Acquisition Coordinate</label>
                <div className="relative">
                  <Landmark className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-500/30" size={18} />
                  <input 
                    type="number" value={purchasePrice} onChange={e => setPurchasePrice(Number(e.target.value))}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-white font-black text-lg outline-none focus:border-blue-500/40 transition-all tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Yield Cycle Magnitude</label>
                <div className="relative">
                  <TrendingUp className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-500/30" size={18} />
                  <input 
                    type="number" value={monthlyRent} onChange={e => setMonthlyRent(Number(e.target.value))}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-emerald-400 font-black text-lg outline-none focus:border-blue-500/40 transition-all tabular-nums"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Operational Overhead</label>
                <div className="relative">
                  <Receipt className="absolute left-4 top-1/2 -translate-y-1/2 text-rose-500/30" size={18} />
                  <input 
                    type="number" value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 pl-12 text-rose-400 font-black text-lg outline-none focus:border-blue-500/40 transition-all tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="p-8 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2.5rem] flex items-center gap-6">
                <Zap size={40} className="text-blue-500/40 shrink-0" />
                <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1 italic">Handshake Protocol</p>
                    <p className="text-xs text-gray-500 leading-relaxed italic">Engine computes the direct capitalization ratio by evaluating net operating manuscripts against market value coordinates</p>
                </div>
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Synthesized Result Registry</label>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 flex flex-col justify-center items-center text-center shadow-inner min-h-[400px]">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               <div className="absolute -top-10 -right-10 opacity-[0.02] text-blue-500 rotate-12">
                  <ArrowUpRight size={300} />
               </div>
               
               <div className="relative z-10 space-y-10 animate-in zoom-in duration-700">
                  <div className="space-y-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.8em] text-blue-500/60 mb-4 block italic">Capitalization Ratio</span>
                    <div className="text-8xl md:text-9xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-2xl">
                      {results.capRate.toFixed(2)}%
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                     <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all">
                        <div className="text-2xl font-black text-white tabular-nums italic">${results.netOperating.toLocaleString()}</div>
                        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">Net Operating Registry</div>
                     </div>
                     <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl group hover:border-emerald-500/30 transition-all">
                        <div className="text-2xl font-black text-white tabular-nums italic">${results.annualIncome.toLocaleString()}</div>
                        <div className="text-[8px] font-bold text-gray-600 uppercase tracking-widest mt-1">Gross Annual Manuscript</div>
                     </div>
                  </div>
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Real-Time Fiscal Processing Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Institutional Standard Precision Verified</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

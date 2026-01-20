
import React, { useState, useEffect } from 'react';
import { 
  TrendingUp, Wallet, Globe, ShieldCheck, Zap, 
  Info, AlertCircle, PieChart, ArrowRight, 
  Landmark, Coins, Calendar, History, Loader2, Sparkles,
  Target, HelpCircle, BookOpen, Layout, Trash2
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

interface RegionalPreset {
  name: string;
  rate: number;
  currency: string;
}

const REGIONS: RegionalPreset[] = [
  { name: 'United States', rate: 3.1, currency: '$' },
  { name: 'United Kingdom', rate: 4.0, currency: '£' },
  { name: 'European Union', rate: 2.8, currency: '€' },
  { name: 'Saudi Arabia', rate: 1.6, currency: 'SAR' },
];

export const PersonalInflationCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [monthlyExpenses, setMonthlyExpenses] = useState(3000);
  const [years, setYears] = useState(5);
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [customRate, setCustomRate] = useState<number | null>(null);
  
  const [results, setResults] = useState({
    futureCost: 0,
    purchasingPowerLost: 0,
    multiplier: 0
  });

  const [advice, setAdvice] = useState('');
  const [loadingAdvice, setLoadingAdvice] = useState(false);

  const langT = t.tools['inflation-calc'] || {
    name: 'Inflation Oracle',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const sanitizeInput = (val: string) => {
    return val.replace(/[^0-9.]/g, '');
  };

  const currentRate = customRate !== null ? customRate : selectedRegion.rate;

  useEffect(() => {
    const rateDecimal = currentRate / 100;
    const multiplier = Math.pow(1 + rateDecimal, years);
    const futureCost = monthlyExpenses * multiplier;
    const purchasingPowerLost = futureCost - monthlyExpenses;

    setResults({
      futureCost,
      purchasingPowerLost,
      multiplier
    });
  }, [monthlyExpenses, years, selectedRegion, customRate]);

  const getAIAdvice = async () => {
    setLoadingAdvice(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const prompt = `Analyze this personal inflation data and provide a professional strategic analysis. 
    Current Expenses: ${monthlyExpenses}, Horizon: ${years} years, Inflation Rate: ${currentRate} percent.
    Return only professional English text. DO NOT USE ANY NUMBERS IN THE OUTPUT. NO DIGITS AT ALL.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt
      });
      setAdvice(response.text || "");
    } catch (err) {
      setAdvice("Archival node desynchronized logic synthesis unavailable");
    } finally {
      setLoadingAdvice(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Fiscal Projection Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <TrendingUp size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Purchasing Power Erosion Matrix</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Fiscal Oracle Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8 border-r border-white/5 pr-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Jurisdiction Selection</label>
              <div className="grid grid-cols-2 gap-2">
                {REGIONS.map((r) => (
                  <button
                    key={r.name}
                    onClick={() => {setSelectedRegion(r); setCustomRate(null);}}
                    className={`p-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${selectedRegion.name === r.name && customRate === null ? 'bg-emerald-600 text-white border-emerald-600 shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                    {r.name}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Monthly Expenditure</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-emerald-500 font-black">{selectedRegion.currency}</div>
                  <input 
                    type="text" 
                    value={monthlyExpenses} 
                    onChange={(e) => setMonthlyExpenses(Number(sanitizeInput(toStd(e.target.value))))}
                    className="w-full bg-black border border-white/5 rounded-2xl py-6 pl-12 pr-6 text-white text-3xl font-black outline-none focus:border-emerald-500/40 transition-all shadow-inner tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Horizon Years</label>
                  <input 
                    type="text" value={years} onChange={(e) => setYears(Number(sanitizeInput(toStd(e.target.value))))}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black text-xl outline-none focus:border-emerald-500/40 transition-all tabular-nums shadow-inner"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Erosion Rate %</label>
                  <input 
                    type="text" value={currentRate} onChange={(e) => setCustomRate(Number(sanitizeInput(toStd(e.target.value))))}
                    className="w-full bg-black border border-white/5 rounded-2xl p-4 text-emerald-400 font-black text-xl outline-none focus:border-emerald-500/40 transition-all tabular-nums shadow-inner"
                  />
                </div>
              </div>
            </div>

            <button onClick={getAIAdvice} disabled={loadingAdvice} className="w-full bg-emerald-600 text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-2xl">
              {loadingAdvice ? <Loader2 className="animate-spin" size={24}/> : <Sparkles size={24}/>}
              Request Strategic Oracle
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-10 overflow-hidden flex flex-col justify-center items-center text-center shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               <div className="relative z-10 space-y-4">
                  <p className="text-[10px] font-black uppercase tracking-[0.6em] text-emerald-500/60 mb-2">Future Cost Projection</p>
                  <div className="text-7xl md:text-8xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-2xl">
                    {selectedRegion.currency}{toStd(results.futureCost.toLocaleString('en-US', {maximumFractionDigits: 0}))}
                  </div>
                  <div className="inline-flex items-center gap-3 px-6 py-2 bg-rose-500/10 border border-rose-500/20 rounded-2xl text-rose-400 font-black text-xs uppercase tracking-widest italic animate-pulse">
                     Value Decay: -{toStd(results.purchasingPowerLost.toLocaleString('en-US', {maximumFractionDigits: 0}))}
                  </div>
               </div>

               {advice && (
                 <div className="relative z-10 mt-10 p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem] text-sm text-gray-400 leading-relaxed italic animate-in slide-in-from-bottom-4">
                    {advice}
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Landmark size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Macroeconomic Entropy Calculation Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Wallet size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Purchasing Power Parity Handshake Verified</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Financial Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

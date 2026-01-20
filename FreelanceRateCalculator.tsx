
import React, { useState, useEffect } from 'react';
import { 
  Calculator, Wallet, PieChart, ShieldCheck, Zap, 
  Info, TrendingUp, Landmark, Calendar, Clock, 
  DollarSign, Coffee, HeartPulse, Receipt, ArrowRight
} from 'lucide-react';

export const FreelanceRateCalculator: React.FC = () => {
  const [personalIncome, setPersonalIncome] = useState(60000);
  const [overhead, setOverhead] = useState(10000);
  const [taxRate, setTaxRate] = useState(25);
  const [profitMargin, setProfitMargin] = useState(10);
  const [vacationWeeks, setVacationWeeks] = useState(4);
  const [sickDays, setSickDays] = useState(5);
  const [billablePercent, setBillablePercent] = useState(70);

  const [results, setResults] = useState({
    hourlyRate: 0,
    totalAnnualNeeded: 0,
    billableHours: 0
  });

  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const sanitizeInput = (val: string) => {
    return val.replace(/[^0-9.]/g, '');
  };

  useEffect(() => {
    // Standard Professional Freelance Formula
    const baseTarget = personalIncome + overhead;
    const withTax = baseTarget / (1 - (taxRate / 100));
    const finalTarget = withTax * (1 + (profitMargin / 100));

    const workWeeks = 52 - vacationWeeks;
    const totalWorkingDays = (workWeeks * 5) - sickDays;
    const totalAvailableHours = totalWorkingDays * 8; 
    const actualBillableHours = totalAvailableHours * (billablePercent / 100);

    const hourly = finalTarget / actualBillableHours;

    setResults({
      hourlyRate: hourly,
      totalAnnualNeeded: finalTarget,
      billableHours: actualBillableHours
    });
  }, [personalIncome, overhead, taxRate, profitMargin, vacationWeeks, sickDays, billablePercent]);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-emerald-600/10 rounded-2xl text-emerald-500">
            <Calculator size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Freelance Rate Architect</h2>
            <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Professional Valuation Matrix</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
           <ShieldCheck size={14} className="text-emerald-400" />
           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">0123456789 System Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 italic px-2">Annual Net Target ($)</label>
              <input 
                type="text" 
                value={personalIncome} 
                onChange={(e) => setPersonalIncome(Number(sanitizeInput(toStd(e.target.value))))}
                className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white text-2xl font-black tabular-nums outline-none focus:border-emerald-500/40"
              />
           </div>
           
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600">Tax (%)</label>
                <input type="text" value={taxRate} onChange={e=>setTaxRate(Number(sanitizeInput(toStd(e.target.value))))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold tabular-nums" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600">Efficiency (%)</label>
                <input type="text" value={billablePercent} onChange={e=>setBillablePercent(Number(sanitizeInput(toStd(e.target.value))))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold tabular-nums" />
              </div>
           </div>
        </div>

        <div className="lg:col-span-7 bg-emerald-600 rounded-[3rem] p-12 flex flex-col justify-center items-center text-center shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-10 opacity-10 rotate-12 group-hover:scale-110 transition-transform"><Wallet size={200}/></div>
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-4">Required Hourly Rate</span>
           <div className="text-8xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-2xl">
              ${toStd(results.hourlyRate.toFixed(0))}
           </div>
           <p className="text-sm font-bold text-white/60 uppercase tracking-widest mt-6 italic">Based on {toStd(results.billableHours.toFixed(0))} Billable Hours/Year</p>
        </div>
      </div>
    </div>
  );
};

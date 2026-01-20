
import React, { useState, useEffect } from 'react';
import { Table, DollarSign, Calendar, Percent, ShieldCheck, Zap } from 'lucide-react';

export const LoanAmortization: React.FC = () => {
  const [loan, setLoan] = useState(50000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(5);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    const monthlyRate = (rate / 100) / 12;
    const n = years * 12;
    const pmt = (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    setPayment(pmt);
  }, [loan, rate, years]);

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400"><Table size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Loan Amortization Solver</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-4 space-y-6">
           <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Loan Principal ($)</label>
             <input type="number" value={loan} onChange={e => setLoan(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums" />
           </div>
           <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Annual Interest (%)</label>
             <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-orange-400 font-black tabular-nums" />
           </div>
           <div className="space-y-2">
             <label className="text-[9px] font-black uppercase text-gray-500 ml-2">Duration (Years)</label>
             <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white font-black tabular-nums" />
           </div>
           <div className="p-8 bg-orange-500/10 border border-orange-500/20 rounded-[2.5rem] text-center">
              <span className="text-[8px] font-black uppercase text-orange-500 tracking-widest">Monthly Installment</span>
              <div className="text-4xl font-black text-white italic tabular-nums mt-1">${payment.toFixed(2)}</div>
           </div>
        </div>
        <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3rem] p-6 overflow-hidden">
           <div className="flex justify-between items-center mb-6 px-4">
              <span className="text-[10px] font-black uppercase text-gray-600 tracking-widest">Fiscal Deconstruction</span>
              <div className="flex gap-1">
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500/40"></div>
                 <div className="w-1.5 h-1.5 rounded-full bg-orange-500/20"></div>
              </div>
           </div>
           <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="flex justify-between p-4 bg-black/40 border border-white/5 rounded-xl text-xs">
                   <span className="text-gray-500 font-black">Period {i+1}</span>
                   <div className="flex gap-8">
                      <div className="text-right">
                        <p className="text-[8px] text-gray-600 uppercase font-black">Principal</p>
                        <p className="text-white font-black italic">${(payment * 0.8).toFixed(0)}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-[8px] text-gray-600 uppercase font-black">Interest</p>
                        <p className="text-orange-500 font-black italic">${(payment * 0.2).toFixed(0)}</p>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

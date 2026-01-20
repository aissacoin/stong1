
import React, { useState, useEffect } from 'react';
import { DollarSign, Percent, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export const DropshipProfitCalc: React.FC = () => {
  const [cost, setCost] = useState(15);
  const [sellingPrice, setSellingPrice] = useState(45);
  const [adSpend, setAdSpend] = useState(10);
  const [fees, setFees] = useState(3); // payment processing %

  const [results, setResults] = useState({ profit: 0, margin: 0, roi: 0 });

  useEffect(() => {
    const revenue = sellingPrice;
    const totalCosts = cost + adSpend + (revenue * (fees / 100));
    const profit = revenue - totalCosts;
    const margin = (profit / revenue) * 100;
    const roi = (profit / (cost + adSpend)) * 100;
    setResults({ profit, margin, roi });
  }, [cost, sellingPrice, adSpend, fees]);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><DollarSign size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Dropshipping Profit Architect</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Product Cost ($)</label>
            <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-white font-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Selling Price ($)</label>
            <input type="number" value={sellingPrice} onChange={e => setSellingPrice(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-emerald-400 font-black" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Ad Spend per Order ($)</label>
            <input type="number" value={adSpend} onChange={e => setAdSpend(Number(e.target.value))} className="w-full bg-black border border-white/10 rounded-xl p-4 text-rose-400 font-black" />
          </div>
        </div>
        <div className="bg-emerald-500/5 rounded-[2.5rem] border border-emerald-500/20 p-8 flex flex-col justify-center items-center text-center space-y-6">
           <div>
              <span className="text-[10px] font-black uppercase text-emerald-500/60 tracking-[0.3em]">Net Profit Per Order</span>
              <div className="text-6xl font-black text-white italic tracking-tighter tabular-nums">${results.profit.toFixed(2)}</div>
           </div>
           <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                 <div className="text-[8px] font-black text-gray-500 uppercase mb-1">Profit Margin</div>
                 <div className="text-xl font-black text-emerald-400">{results.margin.toFixed(1)}%</div>
              </div>
              <div className="bg-black/40 p-4 rounded-2xl border border-white/5">
                 <div className="text-[8px] font-black text-gray-500 uppercase mb-1">CPA ROI</div>
                 <div className="text-xl font-black text-blue-400">{results.roi.toFixed(1)}%</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

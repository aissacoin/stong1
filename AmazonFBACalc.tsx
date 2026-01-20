
import React, { useState, useEffect } from 'react';
import { Box, ShoppingCart, TrendingUp, Info, ShieldCheck } from 'lucide-react';

export const AmazonFBACalc: React.FC = () => {
  const [price, setPrice] = useState(100);
  const [shipping, setShipping] = useState(5.5); // FBA fee
  const [referral, setReferral] = useState(15); // %
  const [cost, setCost] = useState(20);

  const [results, setResults] = useState({ feeTotal: 0, net: 0, margin: 0 });

  useEffect(() => {
    const referralFee = price * (referral / 100);
    const totalFees = referralFee + shipping;
    const net = price - totalFees - cost;
    const margin = (net / price) * 100;
    setResults({ feeTotal: totalFees, net, margin });
  }, [price, shipping, referral, cost]);

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Box size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Amazon FBA Fee Solver</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-5">
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase text-gray-600 ml-2">Sale Price ($)</label>
             <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase text-gray-600 ml-2">Referral Fee (%)</label>
             <input type="number" value={referral} onChange={e => setReferral(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase text-gray-600 ml-2">FBA Fulfillment Fee ($)</label>
             <input type="number" value={shipping} onChange={e => setShipping(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
           </div>
           <div className="space-y-1">
             <label className="text-[9px] font-black uppercase text-gray-600 ml-2">Land Cost per Unit ($)</label>
             <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
           </div>
        </div>
        <div className="bg-blue-600 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center space-y-6 shadow-xl">
            <div>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.3em]">Net Profit Archive</span>
              <div className="text-7xl font-black text-white italic tracking-tighter tabular-nums">${results.net.toFixed(2)}</div>
            </div>
            <div className="w-full space-y-2">
               <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                  <span>Total Amazon Fees</span>
                  <span>${results.feeTotal.toFixed(2)}</span>
               </div>
               <div className="flex justify-between text-[10px] font-black uppercase text-white/40">
                  <span>Profit Margin</span>
                  <span>{results.margin.toFixed(1)}%</span>
               </div>
            </div>
        </div>
      </div>
    </div>
  );
};

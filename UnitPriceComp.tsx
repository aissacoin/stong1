
import React, { useState, useEffect } from 'react';
import { Scale, Tag, ShoppingCart, Zap, ShieldCheck } from 'lucide-react';

export const UnitPriceComp: React.FC = () => {
  const [itemA, setItemA] = useState({ price: 10, quantity: 500 }); // $10 for 500g
  const [itemB, setItemB] = useState({ price: 18, quantity: 1000 }); // $18 for 1kg

  const rateA = itemA.price / (itemA.quantity || 1);
  const rateB = itemB.price / (itemB.quantity || 1);
  const winner = rateA < rateB ? 'A' : 'B';
  const savings = Math.abs(rateA - rateB) * Math.max(itemA.quantity, itemB.quantity);

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Scale size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Unit Price Equilibrium</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Item A */}
        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${winner === 'A' ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white/5 border-white/5'}`}>
           <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Candidate Alpha</h3>
           <div className="space-y-4">
              <input type="number" value={itemA.price} onChange={e => setItemA({...itemA, price: Number(e.target.value)})} placeholder="Price" className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold" />
              <input type="number" value={itemA.quantity} onChange={e => setItemA({...itemA, quantity: Number(e.target.value)})} placeholder="Quantity" className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold" />
           </div>
           <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <span className="text-[9px] font-black uppercase text-gray-600 block">Rate Per Unit</span>
              <div className="text-2xl font-black text-white tabular-nums">${rateA.toFixed(4)}</div>
           </div>
        </div>

        {/* Item B */}
        <div className={`p-8 rounded-[2.5rem] border transition-all duration-500 ${winner === 'B' ? 'bg-[#D4AF37]/10 border-[#D4AF37]' : 'bg-white/5 border-white/5'}`}>
           <h3 className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-6">Candidate Beta</h3>
           <div className="space-y-4">
              <input type="number" value={itemB.price} onChange={e => setItemB({...itemB, price: Number(e.target.value)})} placeholder="Price" className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold" />
              <input type="number" value={itemB.quantity} onChange={e => setItemB({...itemB, quantity: Number(e.target.value)})} placeholder="Quantity" className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-bold" />
           </div>
           <div className="mt-6 pt-6 border-t border-white/5 text-center">
              <span className="text-[9px] font-black uppercase text-gray-600 block">Rate Per Unit</span>
              <div className="text-2xl font-black text-white tabular-nums">${rateB.toFixed(4)}</div>
           </div>
        </div>
      </div>

      <div className="mt-10 p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-[2.5rem] text-center">
         <p className="text-sm font-black text-white uppercase italic tracking-tighter">Candidate {winner} provides the sovereign economic advantage.</p>
      </div>
    </div>
  );
};

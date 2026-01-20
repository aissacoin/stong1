
import React, { useState, useEffect } from 'react';
import { Bitcoin, TrendingUp, TrendingDown, RefreshCw, Zap, ShieldCheck, Info, Wallet, ArrowRight } from 'lucide-react';

export const CryptoPLCalc: React.FC = () => {
  const [buyPrice, setBuyPrice] = useState<string>('50000');
  const [sellPrice, setSellPrice] = useState<string>('65000');
  const [amount, setAmount] = useState<string>('0.5');
  const [fee, setFee] = useState<string>('0.1'); // %

  const [results, setResults] = useState({
    investment: 0,
    profit: 0,
    percent: 0,
    netSell: 0,
    totalFees: 0
  });

  // Sovereignty Protocol: Standard 0123456789 Numerals Enforced
  const toStd = (n: string) => {
    return n.replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)])
            .replace(/[^0-9.]/g, ''); // Filter out non-numeric
  };

  const calculateAudit = () => {
    const bPrice = parseFloat(toStd(buyPrice)) || 0;
    const sPrice = parseFloat(toStd(sellPrice)) || 0;
    const qty = parseFloat(toStd(amount)) || 0;
    const fRate = parseFloat(toStd(fee)) || 0;

    // Scientific Financial Formula for P/L Audit
    const investment = bPrice * qty;
    const grossSell = sPrice * qty;
    
    // Calculate fees for both buy and sell sides (Standard Exchange Protocol)
    const buyFee = investment * (fRate / 100);
    const sellFee = grossSell * (fRate / 100);
    const totalFees = buyFee + sellFee;

    const netProfit = grossSell - investment - totalFees;
    const profitPercent = investment > 0 ? (netProfit / investment) * 100 : 0;

    setResults({
      investment,
      profit: netProfit,
      percent: profitPercent,
      netSell: grossSell - sellFee,
      totalFees
    });
  };

  useEffect(() => {
    calculateAudit();
  }, [buyPrice, sellPrice, amount, fee]);

  const handleInput = (setter: React.Dispatch<React.SetStateAction<string>>, val: string) => {
    setter(toStd(val));
  };

  return (
    <div className="space-y-10">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Bitcoin size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Crypto P/L Auditor</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Asset Performance Registry</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">0123456789 Standard Enforced</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Input Parameters */}
          <div className="lg:col-span-5 space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500 ml-2 italic">Buy Price ($)</label>
                <input 
                  type="text" value={buyPrice} onChange={e => handleInput(setBuyPrice, e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500 ml-2 italic">Sell Price ($)</label>
                <input 
                  type="text" value={sellPrice} onChange={e => handleInput(setSellPrice, e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-[#D4AF37] font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500 ml-2 italic">Quantity (Tokens)</label>
                <input 
                  type="text" value={amount} onChange={e => handleInput(setAmount, e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-white font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-500 ml-2 italic">Exchange Fee (%)</label>
                <input 
                  type="text" value={fee} onChange={e => handleInput(setFee, e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-4 text-gray-500 font-black tabular-nums outline-none focus:border-[#D4AF37]/40 transition-all"
                />
              </div>
            </div>

            <div className="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4">
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                  <span>Initial Investment</span>
                  <span className="text-white tabular-nums">${results.investment.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
               </div>
               <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-gray-600">
                  <span>Audited Trading Fees</span>
                  <span className="text-rose-500 tabular-nums">-${results.totalFees.toLocaleString('en-US', {maximumFractionDigits: 2})}</span>
               </div>
            </div>
          </div>

          {/* Audit Results Viewport */}
          <div className="lg:col-span-7 bg-black border border-white/5 rounded-[3.5rem] p-10 flex flex-col justify-center items-center text-center relative overflow-hidden group shadow-inner">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
             
             <div className="relative z-10 animate-in zoom-in duration-700">
                <span className={`text-[10px] font-black uppercase tracking-[0.5em] mb-4 block italic ${results.profit >= 0 ? 'text-emerald-500/60' : 'text-rose-500/60'}`}>
                   {results.profit >= 0 ? 'Surplus Equilibrium' : 'Deficit Detected'}
                </span>
                <div className={`text-7xl md:text-8xl font-black italic tracking-tighter tabular-nums drop-shadow-2xl transition-colors duration-500 ${results.profit >= 0 ? 'text-white' : 'text-rose-500'}`}>
                   ${results.profit.toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits: 2})}
                </div>
                
                <div className="mt-8 flex items-center justify-center gap-4">
                   <div className={`px-6 py-2 rounded-full font-black text-xs flex items-center gap-2 tabular-nums shadow-lg ${results.profit >= 0 ? 'bg-emerald-500 text-black' : 'bg-rose-600 text-white'}`}>
                      {results.profit >= 0 ? <TrendingUp size={16}/> : <TrendingDown size={16}/>}
                      {results.percent.toFixed(2)}%
                   </div>
                </div>
             </div>

             <div className="relative z-10 w-full mt-12 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group hover:border-[#D4AF37]/30 transition-all">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Final Exit Balance</p>
                    <div className="text-xl font-black text-white tabular-nums">${results.netSell.toLocaleString('en-US', {maximumFractionDigits: 2})}</div>
                </div>
                <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2.5rem] group hover:border-[#D4AF37]/30 transition-all">
                    <p className="text-[8px] font-black text-gray-500 uppercase tracking-widest mb-1">Fee Impact Node</p>
                    <div className="text-xl font-black text-rose-500 tabular-nums">-{((results.totalFees / (results.investment || 1)) * 100).toFixed(3)}%</div>
                </div>
             </div>
          </div>
        </div>
        
        {/* RE-ENTRY OF AD SLOT FOR RESPONSIVENESS */}
        <div className="w-full flex items-center justify-center bg-white/[0.01] border border-white/5 rounded-2xl p-4 min-h-[50px] mt-10 italic text-[8px] text-zinc-800 uppercase tracking-[0.5em] text-center">
           Responsive Financial Node Ad (728x90 / 320x50)
        </div>
      </div>
      
      <div className="max-w-4xl mx-auto p-10 bg-white/[0.01] rounded-3xl border border-white/5 space-y-6 opacity-60">
        <h3 className="text-xl font-black text-white flex items-center gap-3 italic tracking-tight">
          <Info size={20} className="text-[#D4AF37]" /> Technical Calculation Protocol
        </h3>
        <p className="text-zinc-500 text-xs leading-relaxed italic">
          "The Crypto P/L Auditor utilizes a **Multi-Stage Settlement Algorithm**. Unlike basic calculators that ignore entry/exit fees, our node performs a double-ended deduction based on standard exchange handshake protocols. 
          Step 1: Calculate Acquisition Cost (Principal + Fee). Step 2: Calculate Disposal Value (Gross Exit - Fee). Step 3: Audit the Delta. This provides a high-fidelity representation of real-world capital flow, adhering to the 1234567890 Latin Numeral Standard of StrongTools Registry."
        </p>
      </div>
    </div>
  );
};

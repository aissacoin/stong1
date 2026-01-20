
import React, { useState, useEffect } from 'react';
import { Coins, Users, ShieldCheck, Zap, Info, Wallet, Plus, Minus, Receipt, Trash2, Check, CreditCard } from 'lucide-react';

export const TipCalculator: React.FC = () => {
  const [billAmount, setBillAmount] = useState<string>('0');
  const [tipPercentage, setTipPercentage] = useState<string>('15');
  const [peopleCount, setPeopleCount] = useState<string>('1');
  
  const [results, setResults] = useState({
    totalTip: 0,
    totalBill: 0,
    tipPerPerson: 0,
    totalPerPerson: 0
  });

  // Sovereignty Protocol: Force Standard Numerals (1234567890)
  const toStd = (n: string) => {
    return n.replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)])
            .replace(/[^0-9.]/g, ''); // Filter out any non-numeric characters except decimal
  };

  const calculate = () => {
    const bill = parseFloat(toStd(billAmount)) || 0;
    const tip = parseFloat(toStd(tipPercentage)) || 0;
    const people = Math.max(1, parseInt(toStd(peopleCount)) || 1);

    const totalTip = bill * (tip / 100);
    const totalBill = bill + totalTip;
    const tipPerPerson = totalTip / people;
    const totalPerPerson = totalBill / people;

    setResults({
      totalTip,
      totalBill,
      tipPerPerson,
      totalPerPerson
    });
  };

  useEffect(() => {
    calculate();
  }, [billAmount, tipPercentage, peopleCount]);

  const adjustValue = (setter: React.Dispatch<React.SetStateAction<string>>, current: string, amount: number, isFloat: boolean = true) => {
    const val = (isFloat ? parseFloat(toStd(current)) : parseInt(toStd(current))) || 0;
    const next = Math.max(isFloat ? 0 : 1, val + amount);
    setter(String(next));
  };

  const handleClear = () => {
    setBillAmount('0');
    setTipPercentage('15');
    setPeopleCount('1');
  };

  const tipOptions = [10, 15, 18, 20, 25];

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="bg-[#0a0a0a] border border-yellow-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden selection:bg-yellow-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-yellow-500/10 rounded-2xl border border-yellow-500/20 text-yellow-500">
              <Coins size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Gratuity Precision Master</h2>
              <p className="text-[9px] font-bold text-yellow-500/40 uppercase tracking-[0.4em]">Service Equilibrium Node</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <button onClick={handleClear} className="p-3 bg-white/5 border border-white/10 rounded-xl text-gray-500 hover:text-rose-500 transition-all" title="Wipe Registry">
                <Trash2 size={18} />
             </button>
             <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">1234567890 Active</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Ingestion Module (Inputs) */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              {/* Bill Amount Input */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Bill Manuscript Amount</label>
                <div className="relative group">
                  <div className="absolute left-6 top-1/2 -translate-y-1/2 text-yellow-500 font-black text-xl">$</div>
                  <input 
                    type="text" 
                    value={billAmount} 
                    onChange={(e) => setBillAmount(toStd(e.target.value))}
                    className="w-full bg-black border border-white/10 rounded-[2rem] py-8 pl-14 pr-6 text-white text-4xl font-black outline-none focus:border-yellow-500/40 transition-all shadow-inner tabular-nums"
                    placeholder="0.00"
                  />
                </div>
                <div className="flex gap-2">
                  <button onClick={() => adjustValue(setBillAmount, billAmount, -10)} className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase text-gray-500 hover:text-yellow-500 transition-all">- $10</button>
                  <button onClick={() => adjustValue(setBillAmount, billAmount, 10)} className="flex-1 py-3 bg-white/5 border border-white/5 rounded-xl text-[9px] font-black uppercase text-gray-500 hover:text-yellow-500 transition-all">+ $10</button>
                </div>
              </div>

              {/* Tip Scale */}
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Gratuity Percentage (%)</label>
                <div className="grid grid-cols-5 gap-2">
                  {tipOptions.map(pct => (
                    <button 
                      key={pct}
                      onClick={() => setTipPercentage(String(pct))}
                      className={`py-3 rounded-xl text-[10px] font-black transition-all ${tipPercentage === String(pct) ? 'bg-yellow-500 text-black shadow-lg' : 'bg-white/5 text-gray-500'}`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
                <div className="flex items-center justify-between bg-black/60 border border-white/5 p-4 rounded-2xl gap-4 shadow-inner">
                   <button onClick={() => adjustValue(setTipPercentage, tipPercentage, -1)} className="p-2 text-yellow-500 hover:bg-white/5 rounded-lg"><Minus size={20}/></button>
                   <input 
                    type="text" value={tipPercentage} onChange={(e) => setTipPercentage(toStd(e.target.value))}
                    className="bg-transparent text-white text-3xl font-black text-center w-full outline-none tabular-nums"
                   />
                   <button onClick={() => adjustValue(setTipPercentage, tipPercentage, 1)} className="p-2 text-yellow-500 hover:bg-white/5 rounded-lg"><Plus size={20}/></button>
                </div>
              </div>

              {/* People Split */}
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">3. Node Division (People)</label>
                <div className="flex items-center justify-between bg-black/60 border border-white/5 p-4 rounded-2xl gap-4 shadow-inner">
                   <Users className="text-yellow-500/30" size={24} />
                   <button onClick={() => adjustValue(setPeopleCount, peopleCount, -1, false)} className="p-2 text-yellow-500 hover:bg-white/5 rounded-lg"><Minus size={20}/></button>
                   <input 
                    type="text" value={peopleCount} onChange={(e) => setPeopleCount(toStd(e.target.value))}
                    className="bg-transparent text-white text-3xl font-black text-center w-full outline-none tabular-nums"
                   />
                   <button onClick={() => adjustValue(setPeopleCount, peopleCount, 1, false)} className="p-2 text-yellow-500 hover:bg-white/5 rounded-lg"><Plus size={20}/></button>
                </div>
              </div>
            </div>
          </div>

          {/* Synthesis Module (Results) */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-yellow-500 italic">Financial Outcome Registry</label>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner flex flex-col justify-center gap-8">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-8 bg-yellow-500/5 border border-yellow-500/20 rounded-[2.5rem] flex flex-col items-center text-center space-y-2 group hover:border-yellow-500 transition-all">
                    <span className="text-[9px] font-black uppercase tracking-widest text-yellow-500/60 italic">Nodal Tip Share</span>
                    <div className="text-5xl font-black text-white italic tabular-nums tracking-tighter">
                      ${results.tipPerPerson.toFixed(2).replace(/[0-9]/g, d => "0123456789"[parseInt(d)])}
                    </div>
                    <p className="text-[7px] font-bold text-gray-600 uppercase">Per Individual</p>
                  </div>
                  <div className="p-8 bg-yellow-500 border border-yellow-500 shadow-[0_20px_60px_rgba(234,179,8,0.2)] rounded-[2.5rem] flex flex-col items-center text-center space-y-2">
                    <span className="text-[9px] font-black uppercase tracking-widest text-black/60 italic">Total Nodal Cost</span>
                    <div className="text-5xl font-black text-black italic tabular-nums tracking-tighter">
                      ${results.totalPerPerson.toFixed(2).replace(/[0-9]/g, d => "0123456789"[parseInt(d)])}
                    </div>
                    <p className="text-[7px] font-bold text-black/40 uppercase">Consolidated Share</p>
                  </div>
               </div>

               <div className="relative z-10 space-y-4">
                 <div className="flex justify-between items-center px-8 py-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center gap-3">
                      <Receipt size={16} className="text-yellow-500/40" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Total Archive Gratuity</span>
                    </div>
                    <span className="text-2xl font-black text-white tabular-nums italic">${results.totalTip.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between items-center px-8 py-5 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.04] transition-all">
                    <div className="flex items-center gap-3">
                      <Wallet size={16} className="text-yellow-500/40" />
                      <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Consolidated Transaction</span>
                    </div>
                    <span className="text-2xl font-black text-yellow-500 tabular-nums italic">${results.totalBill.toFixed(2)}</span>
                 </div>
               </div>
            </div>

            <div className="p-6 bg-yellow-500/5 border border-dashed border-yellow-500/20 rounded-[2.5rem] flex items-start gap-4">
               <Info size={20} className="text-yellow-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
                 Registry Protocol: Standard 1234567890 numerals enforced. Deterministic rounding applied to the nearest decimal coordinate.
               </p>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40 py-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Zap size={14} className="text-yellow-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Instant Math Engine</span>
          </div>
          <div className="flex items-center gap-2">
            <CreditCard size={14} className="text-yellow-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Transaction Calibration</span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} className="text-yellow-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Precision Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
};

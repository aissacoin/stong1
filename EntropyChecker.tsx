
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Zap, Info, ShieldAlert, Lock, Hash } from 'lucide-react';

export const EntropyChecker: React.FC = () => {
  const [password, setPassword] = useState('');
  const [entropy, setEntropy] = useState(0);

  useEffect(() => {
    if (!password) { setEntropy(0); return; }
    let poolSize = 0;
    if (/[a-z]/.test(password)) poolSize += 26;
    if (/[A-Z]/.test(password)) poolSize += 26;
    if (/[0-9]/.test(password)) poolSize += 10;
    if (/[^a-zA-Z0-9]/.test(password)) poolSize += 32;

    const bits = Math.log2(Math.pow(poolSize, password.length));
    setEntropy(bits);
  }, [password]);

  const getStrength = () => {
    if (entropy < 40) return { label: 'Vulnerable', color: 'bg-rose-600', text: 'text-rose-500' };
    if (entropy < 60) return { label: 'Baseline', color: 'bg-yellow-600', text: 'text-yellow-500' };
    if (entropy < 80) return { label: 'Resilient', color: 'bg-emerald-600', text: 'text-emerald-500' };
    return { label: 'Sovereign', color: 'bg-cyan-600', text: 'text-cyan-500' };
  };

  const strength = getStrength();

  return (
    <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400"><Lock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Password Entropy Oracle</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
           <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Manuscript Ingestion</label>
              <input type="text" value={password} onChange={e=>setPassword(e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white font-mono text-lg outline-none focus:border-cyan-500/40" placeholder="Type password..." />
           </div>
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] space-y-4">
              <div className="flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-gray-600">Archival Pool Size</span>
                 <span className="text-xl font-black text-white tabular-nums">{password ? (entropy/password.length > 0 ? Math.pow(2, entropy/password.length) : 0) : 0}</span>
              </div>
              <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                 <div className={`h-full ${strength.color} transition-all duration-1000`} style={{ width: `${Math.min(100, (entropy/128)*100)}%` }}></div>
              </div>
           </div>
        </div>
        <div className="bg-cyan-900/20 border border-cyan-500/20 rounded-[3rem] p-10 flex flex-col items-center justify-center text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500/60 mb-2">Entropy Value</span>
           <div className="text-8xl font-black text-white italic tabular-nums tracking-tighter">{Math.round(entropy)}</div>
           <span className="text-xl font-black text-cyan-400 uppercase tracking-widest mt-2 italic">{strength.label}</span>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Shield, RefreshCw, Copy, Check, Lock, Zap, ShieldCheck } from 'lucide-react';

export const PrivateKeyForge: React.FC = () => {
  const [key, setKey] = useState('');
  const [copied, setCopied] = useState(false);

  const generateKey = () => {
    const array = new Uint8Array(32);
    window.crypto.getRandomValues(array);
    const hex = Array.from(array).map(b => b.toString(16).padStart(2, '0')).join('');
    setKey(hex);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Shield size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Private Key Forge</h2>
      </div>
      <div className="space-y-8">
        <div className="relative group">
          <div className="absolute -inset-1 bg-blue-500/20 rounded-[2rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative bg-black border border-white/5 p-8 rounded-[2rem] text-center space-y-4">
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500/60 italic">Cryptographic Entropy Node</span>
             <div className="text-sm md:text-xl font-mono text-emerald-400 break-all tabular-nums leading-relaxed">
               {key || '0000000000000000000000000000000000000000000000000000000000000000'}
             </div>
          </div>
        </div>
        <div className="flex gap-4">
           <button onClick={generateKey} className="flex-grow bg-blue-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.01] transition-all">
              <RefreshCw size={20} /> Forge Entropy Key
           </button>
           <button onClick={() => { navigator.clipboard.writeText(key); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} disabled={!key} className={`px-10 rounded-2xl border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
              {copied ? <Check size={20}/> : <Copy size={20}/>}
           </button>
        </div>
        <div className="p-6 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-2xl flex items-start gap-4">
           <ShieldCheck className="text-blue-500 shrink-0" size={20} />
           <p className="text-[10px] text-gray-500 leading-relaxed italic uppercase tracking-widest">
             "StrongTools Security Pact: This key is generated using your browser's Hardware Entropy source. It is never transmitted, logged, or cached outside your local RAM."
           </p>
        </div>
      </div>
    </div>
  );
};

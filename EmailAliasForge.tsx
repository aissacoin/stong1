
import React, { useState } from 'react';
import { Mail, RefreshCw, Copy, Check, ShieldCheck, Zap, Wand2 } from 'lucide-react';

export const EmailAliasForge: React.FC = () => {
  const [alias, setAlias] = useState('shadow_scribe');
  const [domain, setDomain] = useState('tempmail.io');
  const [copied, setCopied] = useState(false);

  const generate = () => {
    const adj = ['silent', 'crypto', 'shadow', 'sovereign', 'aureate', 'meridian'];
    const noun = ['node', 'vault', 'scribe', 'archive', 'pulse', 'handshake'];
    const rand = Math.floor(Math.random() * 1000);
    setAlias(`${adj[Math.floor(Math.random()*adj.length)]}_${noun[Math.floor(Math.random()*noun.length)]}_${rand}`);
  };

  const fullEmail = `${alias}@${domain}`;

  return (
    <div className="bg-[#0a0a0a] border border-indigo-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-400"><Mail size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Disposable Alias Forge</h2>
      </div>
      <div className="space-y-8">
        <div className="relative group">
           <div className="absolute -inset-1 bg-indigo-500/20 rounded-[2.5rem] blur-xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <div className="relative bg-black border border-white/5 p-10 rounded-[2.5rem] text-center space-y-4">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-indigo-500/60 italic">Synthetic Identity node</span>
              <div className="text-3xl md:text-5xl font-black text-white italic tracking-tighter tabular-nums break-all">{fullEmail}</div>
           </div>
        </div>
        <div className="flex gap-4">
           <button onClick={generate} className="flex-grow bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
              <Wand2 size={20} /> Forge New Identity
           </button>
           <button onClick={() => { navigator.clipboard.writeText(fullEmail); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className={`px-10 rounded-2xl border transition-all ${copied ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}>
              {copied ? <Check size={20}/> : <Copy size={20}/>}
           </button>
        </div>
      </div>
    </div>
  );
};

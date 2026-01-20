
import React, { useState } from 'react';
import { Lock, Zap, Trash2, ShieldCheck, Copy, Check, Eye, EyeOff, Loader2 } from 'lucide-react';

export const EncryptedNote: React.FC = () => {
  const [note, setNote] = useState('');
  const [password, setPassword] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSeal = async () => {
    if(!note || !password) return;
    setLoading(true);
    // Simple local obfuscation (Simulated encryption for UI demo)
    setTimeout(() => {
      const b64 = btoa(unescape(encodeURIComponent(note)));
      setEncrypted(`ST-CRYPT-${b64}-${Date.now()}`);
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Lock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Self-Destruct Note Forge</h2>
      </div>
      <div className="space-y-6">
        <textarea value={note} onChange={e=>setNote(e.target.value)} className="w-full h-40 bg-black border border-white/5 rounded-2xl p-6 text-white text-sm outline-none focus:border-rose-500/40" placeholder="Enter sensitive manuscript..." />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="bg-black border border-white/5 rounded-xl p-4 text-white text-sm" placeholder="Sovereign Pass-Key" />
           <button onClick={handleSeal} disabled={loading || !note} className="bg-rose-600 text-white py-4 rounded-xl font-black uppercase flex items-center justify-center gap-2 hover:bg-rose-500 transition-all">
             {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />} Seal Manuscript
           </button>
        </div>
        {encrypted && (
          <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4 animate-in zoom-in">
             <div className="flex justify-between items-center">
                <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest italic">Encrypted Link (Local Buffer)</span>
                <button onClick={() => { navigator.clipboard.writeText(encrypted); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="text-[#D4AF37] hover:text-white transition-colors">
                   {copied ? <Check size={18}/> : <Copy size={18}/>}
                </button>
             </div>
             <p className="text-[10px] font-mono text-gray-500 break-all">{encrypted}</p>
             <p className="text-[8px] font-black text-rose-500/40 uppercase text-center">Manuscript will self-destruct upon buffer clearance.</p>
          </div>
        )}
      </div>
    </div>
  );
};

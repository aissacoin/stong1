
import React, { useState, useEffect } from 'react';
import { Key, ShieldCheck, Zap, Info, Clock, RefreshCw } from 'lucide-react';

export const TwoFactorExplainer: React.FC = () => {
  const [code, setCode] = useState('');
  const [timeLeft, setTimeLeft] = useState(30);

  useEffect(() => {
    const generateCode = () => {
      const newCode = Math.floor(100000 + Math.random() * 900000).toString();
      setCode(newCode);
      setTimeLeft(30);
    };

    generateCode();
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          generateCode();
          return 30;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400"><Key size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">2FA Logic Explainer</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-8 flex flex-col justify-center">
           <div className="bg-black border border-white/5 p-10 rounded-[2.5rem] text-center space-y-4 shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-white/5">
                <div className="h-full bg-emerald-500 transition-all duration-1000" style={{ width: `${(timeLeft/30)*100}%` }}></div>
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-emerald-500/60">Dynamic Token</span>
              <div className="text-7xl font-black text-white italic tracking-[0.2em] tabular-nums">{code}</div>
              <div className="flex items-center justify-center gap-2 text-gray-600">
                <Clock size={12} />
                <span className="text-[9px] font-black uppercase tabular-nums">Expires in {timeLeft}s</span>
              </div>
           </div>
        </div>
        <div className="space-y-6">
           <div className="p-6 bg-white/[0.02] border border-white/5 rounded-2xl space-y-4">
              <h3 className="text-sm font-black text-white uppercase tracking-widest flex items-center gap-2">
                <Zap size={14} className="text-emerald-500"/> Algorithmic Sync
              </h3>
              <p className="text-xs text-gray-400 leading-relaxed italic">
                TOTP (Time-based One-Time Password) uses a shared secret key and the current Unix time to hash a unique 6-digit code. Both your device and the server perform the same calculation simultaneously.
              </p>
           </div>
           <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl space-y-2">
              <div className="flex items-center gap-2 text-emerald-400">
                 <ShieldCheck size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Sovereign Security</span>
              </div>
              <p className="text-[10px] text-gray-500 italic">
                Even if a node captures your code, it becomes mathematically invalid within 30 seconds, creating a temporal defense wall.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

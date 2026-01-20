import React, { useState, useEffect, useCallback } from 'react';
import { ShieldAlert, Copy, RefreshCw, Check, Lock, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const PasswordGenerator: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['pwd-gen'];
  
  const [length, setLength] = useState(16);
  const [includeUpper, setIncludeUpper] = useState(true);
  const [includeLower, setIncludeLower] = useState(true);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const generatePassword = useCallback(() => {
    let charset = '';
    if (includeLower) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeUpper) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+~`|}{[]:;?><,./-=';
    if (!charset) return;
    let generated = '';
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);
    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }
    setPassword(generated);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  useEffect(() => { generatePassword(); }, [generatePassword]);

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-2xl mx-auto shadow-2xl relative overflow-hidden" dir={t.dir}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]"><Lock size={24} /></div>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">{langT.internal.title}</h2>
            <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">{langT.internal.sub}</p>
          </div>
        </div>
        <button onClick={generatePassword} className="p-3 text-[#D4AF37] hover:bg-[#D4AF37]/10 rounded-xl transition-all"><RefreshCw size={20} /></button>
      </div>

      <div className="space-y-8">
        <div className="relative bg-black border border-[#D4AF37]/20 rounded-[2rem] p-8 flex flex-col items-center gap-6 shadow-inner">
          <div className="text-2xl md:text-3xl font-mono text-white break-all tabular-nums leading-relaxed mb-4 text-center">{password}</div>
          <button onClick={() => { navigator.clipboard.writeText(password); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all ${copied ? 'bg-emerald-500/20 text-emerald-400' : 'bg-[#D4AF37] text-black shadow-lg'}`}>
            {copied ? <ShieldCheck size={18} /> : <Copy size={18} />}
            {copied ? t.common.copied : langT.internal.capture}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">{langT.internal.complexity}: {password.length}</label>
            <input type="range" min="8" max="64" value={length} onChange={(e) => setLength(parseInt(e.target.value))} className="w-full h-1.5 bg-white/5 rounded-lg appearance-none cursor-pointer accent-[#D4AF37]" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { id: 'upper', label: langT.internal.caps, active: includeUpper, set: setIncludeUpper },
              { id: 'lower', label: langT.internal.alpha, active: includeLower, set: setIncludeLower },
              { id: 'num', label: langT.internal.numeric, active: includeNumbers, set: setIncludeNumbers },
              { id: 'sym', label: langT.internal.glyphs, active: includeSymbols, set: setIncludeSymbols },
            ].map(toggle => (
              <button key={toggle.id} onClick={() => toggle.set(!toggle.active)} className={`p-4 rounded-2xl border transition-all text-[9px] font-black uppercase tracking-widest ${toggle.active ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-zinc-500'}`}>{toggle.label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
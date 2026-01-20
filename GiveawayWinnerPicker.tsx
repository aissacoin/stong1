import React, { useState, useEffect } from 'react';
import { Trophy, Copy, Check, Trash2, ShieldCheck, Zap, Info, Crown, Loader2, ListFilter } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const GiveawayWinnerPicker: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['winner-picker'] || { internal: { btn: 'Pick', countdown: 'Drawing' } };
  
  const [input, setInput] = useState('');
  const [entrants, setEntrants] = useState<string[]>([]);
  const [winner, setWinner] = useState<string | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [uniqueOnly, setUniqueOnly] = useState(true);

  useEffect(() => {
    const lines = input.split(/\r?\n/).map(line => line.trim()).filter(line => line.length > 0);
    const processed = uniqueOnly ? Array.from(new Set(lines)) : lines;
    setEntrants(processed);
  }, [input, uniqueOnly]);

  const pickWinner = () => {
    if (entrants.length < 1 || isSpinning) return;
    setIsSpinning(true);
    setWinner(null);
    setCountdown(3);
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === 1) { clearInterval(timer); finalizeWinner(); return null; }
        return prev ? prev - 1 : null;
      });
    }, 1000);
  };

  const finalizeWinner = () => {
    const randomIndex = Math.floor(Math.random() * entrants.length);
    setWinner(entrants[randomIndex]);
    setIsSpinning(false);
  };

  return (
    <div className="space-y-12" dir={t.dir}>
      <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-600/10 rounded-2xl text-purple-500"><Trophy size={28} /></div>
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'قرعة عادلة مبنية على العشوائية المطلقة' : 'Fair Draw Engine'}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <textarea
              value={input} onChange={(e) => setInput(e.target.value)}
              className={`w-full h-80 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-purple-500/40 shadow-inner resize-none ${isAr ? 'text-right' : 'text-left'}`}
              placeholder={isAr ? "أدخل الأسماء هنا (اسم في كل سطر)..." : "Enter names here..."}
            />
            <button onClick={pickWinner} disabled={isSpinning || entrants.length === 0} className="w-full bg-purple-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-4 hover:scale-[1.02]">
              {isSpinning ? <Loader2 className="animate-spin" /> : <Crown />} {langT.internal.btn}
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-10 flex items-center justify-center shadow-inner min-h-[400px]">
               {countdown !== null ? (
                 <div className="text-[12rem] font-black text-white italic drop-shadow-[0_0_50px_rgba(168,85,247,0.5)]">{countdown}</div>
               ) : winner ? (
                 <div className="text-center animate-in zoom-in">
                    <Crown size={64} className="text-purple-500 mx-auto mb-4 animate-bounce" />
                    <div className="text-5xl font-black text-white italic tracking-tighter">{winner}</div>
                 </div>
               ) : <div className="opacity-10 text-[10px] font-black uppercase">{isAr ? 'في انتظار البدء' : 'Awaiting Ceremony'}</div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
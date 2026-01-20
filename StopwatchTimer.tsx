import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Flag, Bell, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const StopwatchTimer: React.FC = () => {
  const [mode, setMode] = useState<'stopwatch' | 'timer'>('stopwatch');
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['stopwatch-timer'];
  
  const toStd = (n: number | string) => {
    const s = n.toString().padStart(2, '0');
    return s.replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const [swTime, setSwTime] = useState(0);
  const [swIsActive, setSwIsActive] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const swIntervalRef = useRef<number | null>(null);

  const [timerInput, setTimerInput] = useState({ h: 0, m: 0, s: 0 });
  const [timerSeconds, setTimerSeconds] = useState(0);
  const [timerIsActive, setTimerIsActive] = useState(false);
  const timerIntervalRef = useRef<number | null>(null);

  const startSw = () => {
    setSwIsActive(true);
    const startTime = Date.now() - swTime;
    swIntervalRef.current = window.setInterval(() => {
      setSwTime(Date.now() - startTime);
    }, 10);
  };

  const pauseSw = () => {
    setSwIsActive(false);
    if (swIntervalRef.current) clearInterval(swIntervalRef.current);
  };

  const resetSw = () => {
    setSwIsActive(false);
    if (swIntervalRef.current) clearInterval(swIntervalRef.current);
    setSwTime(0);
    setLaps([]);
  };

  const formatSw = (ms: number) => {
    const minutes = Math.floor(ms / 60000);
    const seconds = Math.floor((ms % 60000) / 1000);
    const centi = Math.floor((ms % 1000) / 10);
    return `${toStd(minutes)}:${toStd(seconds)}.${toStd(centi)}`;
  };

  const adjustTimer = (unit: 'h' | 'm' | 's', amount: number) => {
    setTimerInput(prev => {
      const max = unit === 'h' ? 99 : 59;
      let next = prev[unit] + amount;
      if (next > max) next = 0;
      if (next < 0) next = max;
      return { ...prev, [unit]: next };
    });
  };

  const startTimer = () => {
    let total = timerSeconds;
    if (!timerIsActive && total === 0) {
      total = timerInput.h * 3600 + timerInput.m * 60 + timerInput.s;
    }
    if (total <= 0) return;
    setTimerSeconds(total);
    setTimerIsActive(true);
    timerIntervalRef.current = window.setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          setTimerIsActive(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="max-w-md mx-auto bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 shadow-2xl overflow-hidden relative" dir={t.dir}>
      <div className="flex bg-white/5 p-1 rounded-2xl mb-8 border border-white/5">
        <button onClick={() => setMode('stopwatch')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'stopwatch' ? 'bg-[#D4AF37] text-black' : 'text-zinc-500 hover:text-white'}`}>{langT.internal.stopwatch}</button>
        <button onClick={() => setMode('timer')} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${mode === 'timer' ? 'bg-[#D4AF37] text-black' : 'text-zinc-500 hover:text-white'}`}>{langT.internal.timer}</button>
      </div>

      {mode === 'stopwatch' ? (
        <div className="space-y-8 animate-in fade-in">
          <div className="text-center">
            <div className="text-6xl font-black text-white tabular-nums tracking-tighter mb-2 italic">{formatSw(swTime)}</div>
            <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">{langT.internal.active}</p>
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={resetSw} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white"><RotateCcw size={20} /></button>
            <button onClick={swIsActive ? pauseSw : startSw} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${swIsActive ? 'bg-rose-500/20 text-rose-400' : 'bg-[#D4AF37] text-black shadow-lg'}`}>{swIsActive ? <Pause size={32} /> : <Play size={32} />}</button>
          </div>
        </div>
      ) : (
        <div className="space-y-8 animate-in fade-in">
          <div className="text-center">
            <div className="text-6xl font-black text-white tabular-nums tracking-tighter mb-2 italic">{timerIsActive || timerSeconds > 0 ? toStd(Math.floor(timerSeconds/3600)) + ':' + toStd(Math.floor((timerSeconds%3600)/60)) + ':' + toStd(timerSeconds%60) : `${toStd(timerInput.h)}:${toStd(timerInput.m)}:${toStd(timerInput.s)}`}</div>
            {!timerIsActive && timerSeconds === 0 && (
               <div className="flex justify-center gap-4 mt-6">
                  {(['h', 'm', 's'] as const).map((unit) => (
                    <div key={unit} className="flex flex-col items-center gap-2">
                      <button onClick={() => adjustTimer(unit, 1)} className="p-2 text-cyan-500"><Plus size={16} /></button>
                      <div className="w-14 bg-white/5 border border-white/10 rounded-lg py-2 text-center text-[#D4AF37] font-black text-xl tabular-nums">{toStd(timerInput[unit])}</div>
                      <button onClick={() => adjustTimer(unit, -1)} className="p-2 text-cyan-500"><Minus size={16} /></button>
                      <span className="text-[8px] font-black uppercase text-zinc-600">{unit === 'h' ? langT.internal.hours : unit === 'm' ? langT.internal.mins : langT.internal.secs}</span>
                    </div>
                  ))}
               </div>
            )}
          </div>
          <div className="flex justify-center gap-4">
            <button onClick={() => { setTimerSeconds(0); setTimerIsActive(false); }} className="w-14 h-14 rounded-full border border-white/10 flex items-center justify-center text-zinc-500"><RotateCcw size={20} /></button>
            <button onClick={timerIsActive ? () => setTimerIsActive(false) : startTimer} className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${timerIsActive ? 'bg-rose-500/20 text-rose-400' : 'bg-[#D4AF37] text-black shadow-lg'}`}>{timerIsActive ? <Pause size={32} /> : <Play size={32} />}</button>
          </div>
        </div>
      )}
    </div>
  );
};
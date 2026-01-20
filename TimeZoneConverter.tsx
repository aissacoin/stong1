
import React, { useState, useEffect } from 'react';
import { Globe2, ArrowRightLeft, Clock, Calendar, MapPin, Zap, ShieldCheck, Info, History, Plus, Minus } from 'lucide-react';

export const TimeZoneConverter: React.FC = () => {
  const [sourceDate, setSourceDate] = useState(new Date());
  const [sourceZone, setSourceZone] = useState<string>(Intl.DateTimeFormat().resolvedOptions().timeZone);
  const [targetZone, setTargetZone] = useState<string>('UTC');
  const [convertedTime, setConvertedTime] = useState<string>('');
  const [timeDiff, setTimeDiff] = useState<string>('');

  // Force Standard Numerals Protocol 1234567890
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const allTimezones = (Intl as any).supportedValuesOf ? (Intl as any).supportedValuesOf('timeZone') : [
    'UTC', 'America/New_York', 'Europe/London', 'Asia/Tokyo', 'Asia/Dubai', 'Europe/Paris', 'Africa/Cairo'
  ];

  const adjustDate = (unit: 'h' | 'm' | 'd' | 'M', amount: number) => {
    const newDate = new Date(sourceDate);
    if (unit === 'h') newDate.setHours(newDate.getHours() + amount);
    if (unit === 'm') newDate.setMinutes(newDate.getMinutes() + amount);
    if (unit === 'd') newDate.setDate(newDate.getDate() + amount);
    if (unit === 'M') {
      const currentMonth = newDate.getMonth();
      const nextMonth = (currentMonth + amount + 12) % 12;
      newDate.setMonth(nextMonth);
    }
    setSourceDate(newDate);
  };

  const calculateConversion = () => {
    try {
      const targetFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: targetZone,
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      });
      
      setConvertedTime(toStd(targetFormatter.format(sourceDate)));

      const sourceTimeStr = sourceDate.toLocaleString('en-US', { timeZone: sourceZone });
      const targetTimeStr = sourceDate.toLocaleString('en-US', { timeZone: targetZone });
      
      const sOffset = new Date(sourceTimeStr).getTime();
      const tOffset = new Date(targetTimeStr).getTime();
      const diffHours = (tOffset - sOffset) / (1000 * 60 * 60);
      
      const diffString = diffHours >= 0 ? `+${diffHours}` : `${diffHours}`;
      setTimeDiff(`${toStd(diffString)} Hours Differential`);
    } catch (e) {
      setConvertedTime('Registry Sync Error');
    }
  };

  useEffect(() => {
    calculateConversion();
  }, [sourceDate, sourceZone, targetZone]);

  const swapZones = () => {
    const temp = sourceZone;
    setSourceZone(targetZone);
    setTargetZone(temp);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-cyan-500 selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400">
              <Globe2 size={28} className="animate-spin-slow" />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Global Time Zone Architect</h2>
              <p className="text-[9px] font-bold text-cyan-500/40 uppercase tracking-[0.4em]">Inter-Jurisdictional Sync Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">1234567890 standard active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-5 space-y-8 border-r border-white/5 pr-10">
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Origin Chronometry (Manual Input)</label>
              
              {/* Date & Time Incrementer Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Month (1-12)</span>
                  <div className="flex items-center justify-between bg-black/60 border border-white/5 p-3 rounded-2xl">
                    <button onClick={() => adjustDate('M', -1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Minus size={14}/></button>
                    <span className="text-lg font-black text-white tabular-nums">{toStd(sourceDate.getMonth() + 1)}</span>
                    <button onClick={() => adjustDate('M', 1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Plus size={14}/></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Day</span>
                  <div className="flex items-center justify-between bg-black/60 border border-white/5 p-3 rounded-2xl">
                    <button onClick={() => adjustDate('d', -1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Minus size={14}/></button>
                    <span className="text-lg font-black text-white tabular-nums">{toStd(sourceDate.getDate())}</span>
                    <button onClick={() => adjustDate('d', 1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Plus size={14}/></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Hour (24h)</span>
                  <div className="flex items-center justify-between bg-black/60 border border-white/5 p-3 rounded-2xl">
                    <button onClick={() => adjustDate('h', -1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Minus size={14}/></button>
                    <span className="text-lg font-black text-white tabular-nums">{toStd(sourceDate.getHours())}</span>
                    <button onClick={() => adjustDate('h', 1)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Plus size={14}/></button>
                  </div>
                </div>
                <div className="space-y-2">
                  <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Minute</span>
                  <div className="flex items-center justify-between bg-black/60 border border-white/5 p-3 rounded-2xl">
                    <button onClick={() => adjustDate('m', -5)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Minus size={14}/></button>
                    <span className="text-lg font-black text-white tabular-nums">{toStd(sourceDate.getMinutes())}</span>
                    <button onClick={() => adjustDate('m', 5)} className="p-1 text-cyan-500 hover:bg-white/5 rounded-lg"><Plus size={14}/></button>
                  </div>
                </div>
              </div>

              <div className="h-px bg-white/5"></div>

              <div className="space-y-4">
                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Source Jurisdiction</label>
                  <select 
                    value={sourceZone} 
                    onChange={(e) => setSourceZone(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-white text-xs font-bold outline-none focus:border-cyan-500/40 appearance-none cursor-pointer"
                  >
                    {allTimezones.map((tz: string) => (
                      <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>

                <div className="flex justify-center">
                   <button onClick={swapZones} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-cyan-500 hover:bg-cyan-500 hover:text-black transition-all group">
                     <ArrowRightLeft size={16} className="group-hover:rotate-180 transition-transform duration-500" />
                   </button>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Target Jurisdiction</label>
                  <select 
                    value={targetZone} 
                    onChange={(e) => setTargetZone(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-xl p-4 text-cyan-400 text-xs font-bold outline-none focus:border-cyan-500/40 appearance-none cursor-pointer"
                  >
                    {allTimezones.map((tz: string) => (
                      <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 italic">Synthesized Registry Output</label>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner flex flex-col justify-center items-center text-center">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               <div className="absolute -top-10 -right-10 opacity-[0.02] text-cyan-500 rotate-12">
                  <Clock size={300} />
               </div>
               
               <div className="relative z-10 space-y-8 animate-in zoom-in duration-700">
                  <div className="space-y-2">
                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                      <MapPin size={12} className="text-cyan-500/40" />
                      <span className="text-[10px] font-black uppercase tracking-widest">{targetZone.split('/').pop()?.replace(/_/g, ' ')} Time</span>
                    </div>
                    <div className="text-6xl md:text-8xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-2xl">
                      {convertedTime.split(',').length > 1 ? convertedTime.split(',').pop() : convertedTime}
                    </div>
                    <div className="text-xl font-bold text-cyan-500/60 uppercase tracking-[0.2em] italic">
                      {convertedTime.split(',')[0]}
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-3 px-6 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-2xl text-cyan-400 font-black text-[10px] uppercase tracking-widest italic">
                    <History size={14} /> {timeDiff}
                  </div>
               </div>
            </div>

            <div className="p-6 bg-cyan-500/5 border border-dashed border-cyan-500/20 rounded-3xl flex items-start gap-4">
               <Info size={20} className="text-cyan-500 shrink-0 mt-0.5" />
               <p className="text-[8px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
                 "Registry Protocol: Standard 1234567890 numerals enforced. Monthly logic limited to 1-12 interval. Cross-Jurisdiction Leap Awareness Active."
               </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

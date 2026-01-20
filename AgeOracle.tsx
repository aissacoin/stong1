
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, History, Target, Zap, ShieldCheck, Info, UserCheck, Star, Activity, Heart, Timer, Plus, Minus } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface TemporalAge {
  years: number;
  months: number;
  days: number;
  totalDays: number;
  totalHours: number;
  nextBirthday: number;
}

export const AgeOracle: React.FC = () => {
  const { t } = useLanguage();
  const langT = t.tools['age-oracle'];
  const [year, setYear] = useState<number>(1999);
  const [month, setMonth] = useState<number>(1);
  const [day, setDay] = useState<number>(1);
  const [age, setAge] = useState<TemporalAge | null>(null);
  const [liveSeconds, setLiveSeconds] = useState(0);

  const toStd = (n: number | string) => String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);

  const calculateAge = () => {
    const birth = new Date(year, month - 1, day);
    const now = new Date();
    if (birth > now || isNaN(birth.getTime())) { setAge(null); return; }
    let years = now.getFullYear() - birth.getFullYear();
    let months = now.getMonth() - birth.getMonth();
    let days = now.getDate() - birth.getDate();
    if (days < 0) { months--; days += new Date(now.getFullYear(), now.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    const totalMs = now.getTime() - birth.getTime();
    const totalDays = Math.floor(totalMs / (1000 * 60 * 60 * 24));
    const totalHours = Math.floor(totalMs / (1000 * 60 * 60));
    let nextBday = new Date(now.getFullYear(), birth.getMonth(), birth.getDate());
    if (nextBday < now) nextBday.setFullYear(now.getFullYear() + 1);
    const nextDiff = Math.ceil((nextBday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    setAge({ years, months, days, totalDays, totalHours, nextBirthday: nextDiff });
    setLiveSeconds(Math.floor(totalMs / 1000));
  };

  useEffect(() => {
    calculateAge();
    const interval = setInterval(calculateAge, 1000);
    return () => clearInterval(interval);
  }, [year, month, day]);

  const adjust = (type: 'y' | 'm' | 'd', val: number) => {
    if (type === 'y') setYear(prev => Math.max(1900, Math.min(new Date().getFullYear(), prev + val)));
    if (type === 'm') setMonth(prev => (prev + val > 12 ? 1 : prev + val < 1 ? 12 : prev + val));
    if (type === 'd') setDay(prev => (prev + val > 31 ? 1 : prev + val < 1 ? 31 : prev + val));
  };

  return (
    <div className="space-y-8 max-w-4xl mx-auto">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 shadow-2xl relative overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.title}</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="bg-black/60 border border-white/5 p-4 rounded-3xl flex items-center justify-between">
                <button onClick={() => adjust('y', -1)} className="p-3 bg-white/5 rounded-xl text-[#D4AF37]"><Minus size={16}/></button>
                <div className="text-center">
                  <span className="text-2xl font-black text-white tabular-nums">{toStd(year)}</span>
                  <div className="text-[8px] font-black uppercase text-gray-600">{langT.years}</div>
                </div>
                <button onClick={() => adjust('y', 1)} className="p-3 bg-white/5 rounded-xl text-[#D4AF37]"><Plus size={16}/></button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-black/60 border border-white/5 p-4 rounded-3xl flex items-center justify-between">
                  <button onClick={() => adjust('m', -1)} className="p-2 text-[#D4AF37]"><Minus size={14}/></button>
                  <span className="text-lg font-black text-white">{toStd(month)}</span>
                  <button onClick={() => adjust('m', 1)} className="p-2 text-[#D4AF37]"><Plus size={14}/></button>
                </div>
                <div className="bg-black/60 border border-white/5 p-4 rounded-3xl flex items-center justify-between">
                  <button onClick={() => adjust('d', -1)} className="p-2 text-[#D4AF37]"><Minus size={14}/></button>
                  <span className="text-lg font-black text-white">{toStd(day)}</span>
                  <button onClick={() => adjust('d', 1)} className="p-2 text-[#D4AF37]"><Plus size={14}/></button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center items-center text-center space-y-6">
             {age && (
               <div className="grid grid-cols-3 gap-4 w-full">
                  <div className="p-4 bg-white/5 rounded-2xl">
                     <div className="text-3xl font-black text-[#D4AF37]">{toStd(age.years)}</div>
                     <div className="text-[8px] uppercase text-gray-500">{langT.years}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                     <div className="text-3xl font-black text-[#D4AF37]">{toStd(age.months)}</div>
                     <div className="text-[8px] uppercase text-gray-500">{langT.months}</div>
                  </div>
                  <div className="p-4 bg-white/5 rounded-2xl">
                     <div className="text-3xl font-black text-[#D4AF37]">{toStd(age.days)}</div>
                     <div className="text-[8px] uppercase text-gray-500">{langT.days}</div>
                  </div>
               </div>
             )}
             <div className="p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl w-full">
                <span className="text-[10px] font-black uppercase text-[#D4AF37] block mb-2">{langT.seconds}</span>
                <div className="text-3xl font-mono text-white tabular-nums">{toStd(liveSeconds.toLocaleString())}</div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

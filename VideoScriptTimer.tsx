
import React, { useState, useEffect } from 'react';
import { Timer, Zap, ShieldCheck, Clock, Type } from 'lucide-react';

export const VideoScriptTimer: React.FC = () => {
  const [text, setText] = useState('');
  const [speed, setSpeed] = useState(150); // words per minute
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const words = text.trim() ? text.trim().split(/\s+/).length : 0;
    const minutes = words / speed;
    setDuration(Math.round(minutes * 60));
  }, [text, speed]);

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Timer size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Script Temporal Oracle</h2>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-6">
          <textarea value={text} onChange={e => setText(e.target.value)} placeholder="Paste your video script manuscript here..." className="w-full h-64 bg-black border border-white/5 rounded-3xl p-6 text-white text-sm outline-none focus:border-[#D4AF37]/40 resize-none shadow-inner" />
          <div className="space-y-2">
            <div className="flex justify-between text-[10px] font-black uppercase text-gray-500 tracking-widest">
              <span>Delivery Speed</span>
              <span>{speed} WPM</span>
            </div>
            <input type="range" min="100" max="220" value={speed} onChange={e => setSpeed(Number(e.target.value))} className="w-full accent-[#D4AF37]" />
          </div>
        </div>
        <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 space-y-4">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]/60 italic">Estimated Duration</span>
           <div className="text-9xl font-black text-white italic tracking-tighter tabular-nums drop-shadow-2xl">{duration}s</div>
           <p className="text-xs text-gray-500 italic max-w-xs">Optimized for high-retention formats like Reels and TikTok.</p>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Music, RefreshCw, ArrowRight, ShieldCheck, Zap } from 'lucide-react';

const SCALE = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export const GuitarTransposer: React.FC = () => {
  const [chords, setChords] = useState('C G Am F');
  const [shift, setShift] = useState(0);

  const transpose = (chord: string, amount: number) => {
    return chord.replace(/[A-G][#b]?/g, (match) => {
      let index = SCALE.indexOf(match);
      if (index === -1) { // Handle flats
        const flatMap: any = { 'Db': 'C#', 'Eb': 'D#', 'Gb': 'F#', 'Ab': 'G#', 'Bb': 'A#' };
        index = SCALE.indexOf(flatMap[match] || match);
      }
      if (index === -1) return match;
      const newIndex = (index + amount + 12) % 12;
      return SCALE[newIndex];
    });
  };

  const transposedResult = chords.split(' ').map(c => transpose(c, shift)).join(' ');

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Music size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Guitar Chord Transposer</h2>
      </div>
      <div className="space-y-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Original Progression</label>
              <textarea value={chords} onChange={e=>setChords(e.target.value)} className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white font-mono text-xl outline-none focus:border-blue-500/40" />
           </div>
           <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Semitone Shift: {shift > 0 ? `+${shift}` : shift}</label>
              <input type="range" min="-11" max="11" value={shift} onChange={e=>setShift(Number(e.target.value))} className="w-full accent-blue-500" />
              <div className="grid grid-cols-3 gap-2">
                 <button onClick={()=>setShift(s=>s-1)} className="p-4 bg-white/5 rounded-xl text-white font-black">-1</button>
                 <button onClick={()=>setShift(0)} className="p-4 bg-white/5 rounded-xl text-white font-black">Reset</button>
                 <button onClick={()=>setShift(s=>s+1)} className="p-4 bg-white/5 rounded-xl text-white font-black">+1</button>
              </div>
           </div>
        </div>
        <div className="bg-blue-600 rounded-[2.5rem] p-12 text-center shadow-xl">
           <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/50 mb-4 block">Transposed Manuscript</span>
           <div className="text-4xl md:text-6xl font-black text-white italic tracking-tighter break-all">{transposedResult}</div>
        </div>
      </div>
    </div>
  );
};

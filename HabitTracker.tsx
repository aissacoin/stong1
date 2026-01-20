
import React, { useState, useEffect } from 'react';
import { CheckSquare, Printer, Plus, Trash2, Calendar, ShieldCheck, Zap } from 'lucide-react';

export const HabitTracker: React.FC = () => {
  const [habits, setHabits] = useState<string[]>(['Morning Meditation', 'Focus Work (4h)', 'Hydration (3L)']);
  const [newHabit, setNewHabit] = useState('');

  const add = () => { if(newHabit.trim()){ setHabits([...habits, newHabit.trim()]); setNewHabit(''); } };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex justify-between items-center mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><CheckSquare size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Habit Master Grid</h2>
        </div>
        <button onClick={()=>window.print()} className="p-4 bg-blue-600 text-white rounded-xl hover:scale-105 transition-all flex items-center gap-2 font-black text-[10px] uppercase tracking-widest"><Printer size={16}/> Print Manuscript</button>
      </div>

      <div className="space-y-6 print-area">
        <div className="flex gap-2 no-print">
           <input value={newHabit} onChange={e=>setNewHabit(e.target.value)} placeholder="Define new success ritual..." className="flex-grow bg-black border border-white/10 rounded-xl p-4 text-white text-sm" />
           <button onClick={add} className="p-4 bg-white/5 text-blue-400 rounded-xl border border-white/10"><Plus size={24}/></button>
        </div>

        <div className="overflow-x-auto custom-scrollbar">
           <table className="w-full border-collapse">
              <thead>
                 <tr>
                    <th className="p-4 text-left text-[10px] font-black uppercase text-gray-500 tracking-widest">Ritual Archetype</th>
                    {Array.from({length: 7}).map((_, i) => (
                      <th key={i} className="p-4 text-center text-[10px] font-black uppercase text-gray-700">Day {i+1}</th>
                    ))}
                 </tr>
              </thead>
              <tbody>
                 {habits.map((h, idx) => (
                   <tr key={idx} className="border-t border-white/5 group">
                      <td className="p-4 flex items-center justify-between">
                         <span className="text-sm font-bold text-white italic">{h}</span>
                         <button onClick={()=>setHabits(habits.filter((_,i)=>i!==idx))} className="text-rose-500 opacity-0 group-hover:opacity-100 no-print"><Trash2 size={14}/></button>
                      </td>
                      {Array.from({length: 7}).map((_, i) => (
                        <td key={i} className="p-4 text-center">
                           <div className="w-6 h-6 rounded-md border-2 border-white/10 mx-auto hover:border-blue-500/50 cursor-pointer"></div>
                        </td>
                      ))}
                   </tr>
                 ))}
              </tbody>
           </table>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Plus, Minus, RotateCcw, Save, ShieldCheck, Zap, Scissors } from 'lucide-react';

export const KnittingCounter: React.FC = () => {
  const [rows, setRows] = useState(() => Number(localStorage.getItem('st_knitting_rows')) || 0);
  const [project, setProject] = useState(() => localStorage.getItem('st_knitting_proj') || 'Default Project');

  useEffect(() => {
    localStorage.setItem('st_knitting_rows', rows.toString());
    localStorage.setItem('st_knitting_proj', project);
  }, [rows, project]);

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400"><Scissors size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Knitting Row Sentinel</h2>
      </div>
      <div className="space-y-8">
        <input value={project} onChange={e=>setProject(e.target.value)} className="w-full bg-transparent border-0 text-center text-xl font-bold text-gray-500 italic outline-none" />
        <div className="flex items-center justify-between gap-6">
           <button onClick={()=>setRows(r=>Math.max(0,r-1))} className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-rose-500 hover:bg-rose-500 hover:text-white transition-all"><Minus size={32}/></button>
           <div className="text-center">
              <div className="text-9xl font-black text-white italic tabular-nums tracking-tighter">{rows}</div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-700">Active Rows</span>
           </div>
           <button onClick={()=>setRows(r=>r+1)} className="w-20 h-20 rounded-full bg-rose-600 shadow-xl shadow-rose-600/20 flex items-center justify-center text-white hover:scale-110 transition-all"><Plus size={32}/></button>
        </div>
        <button onClick={()=>setRows(0)} className="w-full py-4 bg-white/5 rounded-xl text-[10px] font-black uppercase text-gray-600 flex items-center justify-center gap-2 hover:text-rose-400 transition-colors"><RotateCcw size={14}/> Wipe Row Registry</button>
      </div>
    </div>
  );
};

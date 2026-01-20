
import React, { useState, useEffect } from 'react';
import { Heart, Plus, Trash2, CheckCircle2, UserPlus, Info, ShieldCheck } from 'lucide-react';

interface Guest {
  id: string;
  name: string;
  confirmed: boolean;
  plusOne: boolean;
}

export const WeddingGuestList: React.FC = () => {
  const [guests, setGuests] = useState<Guest[]>(() => {
    const saved = localStorage.getItem('st_wedding_registry');
    return saved ? JSON.parse(saved) : [{ id: '1', name: 'Example Guest', confirmed: false, plusOne: false }];
  });

  useEffect(() => {
    localStorage.setItem('st_wedding_registry', JSON.stringify(guests));
  }, [guests]);

  const add = () => setGuests([{ id: Date.now().toString(), name: '', confirmed: false, plusOne: false }, ...guests]);
  const toggle = (id: string, field: 'confirmed' | 'plusOne') => setGuests(guests.map(g => g.id === id ? { ...g, [field]: !g[field] } : g));
  const update = (id: string, name: string) => setGuests(guests.map(g => g.id === id ? { ...g, name } : g));

  const confirmedCount = guests.filter(g => g.confirmed).length;
  const totalPotential = guests.length + guests.filter(g => g.plusOne).length;

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-400"><Heart size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Wedding Guest Sentinel</h2>
        </div>
        <div className="flex gap-4">
           <div className="px-5 py-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
              <p className="text-[8px] font-black uppercase text-rose-500">Confirmed</p>
              <p className="text-xl font-black text-white tabular-nums">{confirmedCount}</p>
           </div>
           <div className="px-5 py-3 bg-rose-500/10 rounded-xl border border-rose-500/20 text-center">
              <p className="text-[8px] font-black uppercase text-rose-500">Total Cap</p>
              <p className="text-xl font-black text-white tabular-nums">{totalPotential}</p>
           </div>
           <button onClick={add} className="p-4 bg-rose-600 text-white rounded-xl hover:scale-105 transition-all shadow-lg"><UserPlus size={24}/></button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar pr-4">
        {guests.map(g => (
          <div key={g.id} className="bg-white/5 p-4 rounded-2xl border border-white/5 flex items-center gap-6 group hover:border-rose-500/30 transition-all">
             <input value={g.name} onChange={e=>update(g.id, e.target.value)} placeholder="Enter Guest Name..." className="bg-transparent border-0 text-white font-bold italic outline-none flex-grow" />
             <div className="flex gap-4">
                <button onClick={()=>toggle(g.id, 'plusOne')} className={`text-[10px] font-black uppercase tracking-widest transition-all ${g.plusOne ? 'text-rose-400' : 'text-gray-700'}`}>+1 Node</button>
                <button onClick={()=>toggle(g.id, 'confirmed')} className={`p-2 rounded-lg transition-all ${g.confirmed ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-700'}`}><CheckCircle2 size={16}/></button>
                <button onClick={()=>setGuests(guests.filter(x=>x.id!==g.id))} className="text-gray-800 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

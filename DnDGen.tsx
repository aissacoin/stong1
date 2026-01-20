
import React, { useState } from 'react';
import { Sword, Sparkles, Loader2, Copy, Check, Shield, Zap, BookOpen } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const DnDGen: React.FC = () => {
  const [race, setRace] = useState('Elf');
  const [role, setRole] = useState('Wizard');
  const [names, setNames] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generateNames = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 epic Dungeons & Dragons names for a ${race} ${role}. Return as a simple list separated by newlines. No extra text.`,
      });
      setNames(response.text?.split('\n').filter(n => n.trim()) || []);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-amber-600/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-600/10 rounded-2xl text-amber-500"><Sword size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">D&D Character Name Architect</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Race Selection</label>
             <select value={race} onChange={e=>setRace(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white">
               {['Elf', 'Dwarf', 'Orc', 'Tiefling', 'Dragonborn', 'Human'].map(r => <option key={r}>{r}</option>)}
             </select>
           </div>
           <div className="space-y-2">
             <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Class / Role</label>
             <select value={role} onChange={e=>setRole(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white">
               {['Wizard', 'Warrior', 'Rogue', 'Paladin', 'Bard', 'Cleric'].map(r => <option key={r}>{r}</option>)}
             </select>
           </div>
           <button onClick={generateNames} disabled={loading} className="w-full bg-amber-600 text-black py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.02] transition-all">
             {loading ? <Loader2 className="animate-spin" /> : <Zap />} Forge Names
           </button>
        </div>
        <div className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 space-y-4 min-h-[300px] flex flex-col">
           <span className="text-[10px] font-black uppercase text-amber-500 tracking-[0.3em] mb-4 italic">Archival Ledger</span>
           <div className="space-y-3 flex-grow">
              {names.map((name, i) => (
                <div key={i} className="flex justify-between items-center bg-black/40 p-4 rounded-xl border border-white/5 group">
                   <span className="text-white font-bold italic">{name}</span>
                   <button onClick={() => { navigator.clipboard.writeText(name); setCopied(i); setTimeout(()=>setCopied(null), 2000); }} className="text-gray-600 hover:text-amber-500">
                      {copied === i ? <Check size={16}/> : <Copy size={16}/>}
                   </button>
                </div>
              ))}
              {!loading && names.length === 0 && <div className="h-full flex items-center justify-center opacity-10"><BookOpen size={64}/></div>}
           </div>
        </div>
      </div>
    </div>
  );
};

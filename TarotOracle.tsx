
import React, { useState } from 'react';
import { Sparkles, Loader2, RefreshCw, ShieldCheck, Zap, Info, Eye } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const TarotOracle: React.FC = () => {
  const [reading, setReading] = useState('');
  const [card, setCard] = useState('');
  const [loading, setLoading] = useState(false);

  const pullCard = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Pick a random Tarot card (Major or Minor Arcana). 
        Provide: The Card Name and a 100-word daily wisdom interpretation focusing on professional and personal growth. 
        Format: "CARD: [Name]\nWISDOM: [Content]".`,
      });
      const parts = response.text?.split('\n') || [];
      setCard(parts.find(p=>p.startsWith('CARD:'))?.replace('CARD:', '') || 'The Oracle');
      setReading(parts.find(p=>p.startsWith('WISDOM:'))?.replace('WISDOM:', '') || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-[3rem] p-10 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
      <div className="flex items-center gap-4 mb-12">
        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-400"><Sparkles size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">AI Tarot Daily Oracle</h2>
      </div>

      {!reading && !loading ? (
        <div className="text-center py-20 space-y-8">
           <div className="w-48 h-72 mx-auto bg-gradient-to-tr from-purple-900 to-indigo-950 rounded-2xl border-4 border-purple-500/30 flex flex-col items-center justify-center group cursor-pointer hover:scale-105 transition-all shadow-2xl" onClick={pullCard}>
              <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 group-hover:scale-125 transition-all"><Eye size={40}/></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-purple-500/60 mt-6">Consult the Arcane</span>
           </div>
           <p className="text-gray-500 italic text-sm">"The cards do not predict the future; they illuminate the present."</p>
        </div>
      ) : (
        <div className="space-y-10 animate-in zoom-in duration-700">
           <div className="text-center">
              <span className="text-[10px] font-black uppercase tracking-[0.8em] text-purple-500 animate-pulse">The Manifested Arcana</span>
              <h3 className="text-6xl font-black text-white italic tracking-tighter mt-4">{card}</h3>
           </div>
           <div className="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] relative">
              {loading ? (
                <div className="flex flex-col items-center gap-4 py-20">
                  <Loader2 size={48} className="text-purple-500 animate-spin" />
                  <span className="text-[10px] font-black uppercase text-purple-500/40">Synchronizing with Cosmic Nodes...</span>
                </div>
              ) : (
                <>
                  <p className="text-xl text-gray-300 leading-relaxed italic font-serif">"{reading}"</p>
                  <button onClick={pullCard} className="mt-10 flex items-center gap-2 text-[10px] font-black uppercase text-purple-500 hover:text-white transition-all"><RefreshCw size={14}/> Recalibrate Fate</button>
                </>
              )}
           </div>
        </div>
      )}
    </div>
  );
};

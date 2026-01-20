
import React, { useState } from 'react';
import { Plane, Sparkles, Loader2, Copy, Check, Trash2, MapPin, Calendar, Briefcase, Zap, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const TravelPacker: React.FC = () => {
  const [destination, setDestination] = useState('');
  const [duration, setDuration] = useState('7');
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateList = async () => {
    if (!destination.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional travel packing list for: ${destination} for ${duration} days. Include: Essential Docs, Clothing (weather appropriate), Toiletries, and Tech. Return as a clean list with each item starting with "- ".`,
      });
      const items = (response.text || '').split('\n').filter(line => line.startsWith('-'));
      setOutput(items);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Plane size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Travel Packing Architect</h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={destination} onChange={e => setDestination(e.target.value)} placeholder="Destination (e.g. Tokyo, Japan)" className="bg-black border border-white/5 rounded-xl p-4 text-white text-sm" />
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="Days" className="bg-black border border-white/5 rounded-xl p-4 text-white text-sm" />
        </div>
        <button onClick={generateList} disabled={loading || !destination} className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:scale-[1.02] transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Pack List
        </button>
        {output.length > 0 && (
          <div className="p-8 bg-white/[0.02] rounded-3xl border border-white/10 space-y-3">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase text-[#D4AF37] tracking-widest italic">Archival Manifest</span>
                <button onClick={() => { navigator.clipboard.writeText(output.join('\n')); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="text-xs text-gray-500 hover:text-white flex items-center gap-2">
                   {copied ? <Check size={14} className="text-emerald-400" /> : <Copy size={14}/>} {copied ? 'Vaulted' : 'Copy List'}
                </button>
             </div>
             {output.map((item, i) => (
               <div key={i} className="flex items-center gap-3 text-sm text-gray-300 italic border-b border-white/5 pb-2">
                 <div className="w-1.5 h-1.5 rounded-full bg-[#D4AF37]/40"></div>
                 {item.replace('- ', '')}
               </div>
             ))}
          </div>
        )}
      </div>
    </div>
  );
};

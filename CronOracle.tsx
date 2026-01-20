
import React, { useState } from 'react';
import { Clock, Loader2, Sparkles, Copy, Check, Zap, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const CronOracle: React.FC = () => {
  const [cron, setCron] = useState('0 0 * * 0');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const explainCron = async () => {
    if (!cron.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain this Cron schedule expression in plain, friendly English: "${cron}".`,
      });
      setExplanation(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-500 selection:text-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Clock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Cron Job Oracle</h2>
      </div>
      <div className="space-y-10">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Temporal Expression (Minute Hour Day Month Weekday)</label>
          <input value={cron} onChange={e => setCron(e.target.value)} className="w-full bg-black border border-white/10 rounded-2xl p-6 text-center text-3xl font-black text-blue-400 outline-none focus:border-blue-500/40 tabular-nums italic" placeholder="* * * * *" />
        </div>
        <button onClick={explainCron} disabled={loading} className="w-full bg-blue-600 text-white py-6 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.01] transition-all shadow-lg">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synchronize Meaning
        </button>
        {explanation && (
          <div className="p-8 bg-blue-500/5 border border-blue-500/20 rounded-[2.5rem] animate-in slide-in-from-bottom-4">
             <div className="flex items-center gap-3 mb-4 text-blue-400/60">
                <Info size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest italic">Computed Chronometry</span>
             </div>
             <p className="text-xl text-white font-medium italic leading-relaxed">"{explanation}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

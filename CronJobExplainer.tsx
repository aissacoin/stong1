
import React, { useState } from 'react';
import { Clock, Info, Sparkles, Loader2, Copy, Check } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const CronJobExplainer: React.FC = () => {
  const [cron, setCron] = useState('');
  const [explanation, setExplanation] = useState('');
  const [loading, setLoading] = useState(false);

  const explainCron = async () => {
    if (!cron.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Explain what this Cron expression does in plain English: "${cron}". Be precise.`,
      });
      setExplanation(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Clock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Cron Job Oracle</h2>
      </div>
      <div className="space-y-6">
        <input 
          value={cron} onChange={e => setCron(e.target.value)}
          className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white font-mono text-center text-xl outline-none focus:border-blue-500/40"
          placeholder="0 0 * * 0"
        />
        <button onClick={explainCron} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Info />} Decode Temporal Pattern
        </button>
        {explanation && (
          <div className="p-6 bg-white/5 rounded-2xl border border-blue-500/20 animate-in fade-in">
            <p className="text-gray-300 italic">"{explanation}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

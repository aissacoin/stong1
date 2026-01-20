
import React, { useState } from 'react';
import { Mic, Sparkles, Loader2, Target, Zap, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PodcastTitleTester: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState<{title: string, score: number, reason: string}[]>([]);
  const [loading, setLoading] = useState(false);

  const testTitles = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate and A/B test 3 podcast episode titles for: "${topic}". 
        Provide a "Click-Worthiness Score" (0-100) and a brief reason. Return in simple JSON array format.`,
      });
      const data = JSON.parse(response.text?.replace(/```json|```/gi, '') || "[]");
      setResults(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><Mic size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Podcast Title Oracle</h2>
      </div>
      <div className="space-y-6">
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="Episode theme (e.g. History of Bitcoin)..." className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-emerald-500/40" />
        <button onClick={testTitles} disabled={loading} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize A/B Candidates
        </button>
        <div className="space-y-4">
          {results.map((res, i) => (
            <div key={i} className="p-6 bg-white/5 border border-white/10 rounded-2xl animate-in fade-in">
              <div className="flex justify-between items-start mb-2">
                <h4 className="text-lg font-black text-white italic">"{res.title}"</h4>
                <span className="bg-emerald-500 text-black px-3 py-1 rounded-full text-[10px] font-black">{res.score}%</span>
              </div>
              <p className="text-[10px] text-gray-500 italic uppercase tracking-widest">{res.reason}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

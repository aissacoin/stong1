
import React, { useState } from 'react';
import { GraduationCap, Sparkles, Loader2, Copy, Check, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const ThesisTitleGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState<number | null>(null);

  const generate = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 5 sophisticated academic thesis titles for the following research interest: "${topic}". 
        The titles should range from Descriptive to Provocative. Return ONLY the titles in a numbered list.`,
      });
      const list = (response.text || '').split('\n').filter(t => t.trim() && !isNaN(parseInt(t))).map(t => t.replace(/^\d+\.\s*/, ''));
      setTitles(list);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><GraduationCap size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Thesis Title Oracle</h2>
      </div>

      <div className="space-y-6">
        <input 
          value={topic} onChange={e => setTopic(e.target.value)}
          className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-[#D4AF37]/40"
          placeholder="Research Area (e.g. AI ethics in healthcare)..."
        />
        <button onClick={generate} disabled={loading} className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Generate Academic Titles
        </button>

        <div className="space-y-3">
          {titles.map((title, i) => (
            <div key={i} className="group p-5 bg-white/5 border border-white/5 rounded-2xl hover:border-[#D4AF37]/40 transition-all flex justify-between items-center">
              <p className="text-gray-300 italic font-serif leading-relaxed">"{title}"</p>
              <button onClick={() => { navigator.clipboard.writeText(title); setCopied(i); setTimeout(()=>setCopied(null), 2000); }} className="text-[#D4AF37] p-2 hover:bg-[#D4AF37]/10 rounded-lg">
                {copied === i ? <Check size={16}/> : <Copy size={16}/>}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

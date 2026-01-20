
import React, { useState } from 'react';
import { Search, ShieldAlert, Loader2, Zap, Info, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PlagiarismChecker: React.FC = () => {
  const [text, setText] = useState('');
  const [report, setReport] = useState<{percent: number, summary: string} | null>(null);
  const [loading, setLoading] = useState(false);

  const checkText = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform a neural similarity audit on this manuscript for potential plagiarism: "${text}". 
        Estimate a similarity percentage and provide a summary of potential source matches. 
        Return ONLY a JSON object: {"percent": number, "summary": "string"}.`,
      });
      const data = JSON.parse(response.text?.replace(/```json|```/gi, '') || "{}");
      setReport(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Search size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Plagiarism Logic Auditor</h2>
      </div>

      <div className="space-y-6">
        <textarea 
          value={text} onChange={e => setText(e.target.value)}
          className="w-full h-64 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-rose-500/40 shadow-inner"
          placeholder="Paste manuscript for originality verification..."
        />
        <button onClick={checkText} disabled={loading} className="w-full bg-rose-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <ShieldAlert />} Execute Originality Audit
        </button>

        {report && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 animate-in fade-in zoom-in duration-500">
            <div className="md:col-span-4 bg-black/40 border border-rose-500/30 rounded-3xl p-8 flex flex-col items-center justify-center">
              <div className="text-5xl font-black text-rose-500 tabular-nums italic">{report.percent}%</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-gray-500 mt-2">Similarity Node</div>
            </div>
            <div className="md:col-span-8 bg-white/5 border border-white/10 rounded-3xl p-8">
               <p className="text-gray-400 italic text-sm leading-relaxed">"{report.summary}"</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

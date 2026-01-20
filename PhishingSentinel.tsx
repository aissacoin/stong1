
import React, { useState } from 'react';
import { Search, AlertTriangle, ShieldCheck, Loader2, Zap, Target, ExternalLink } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PhishingSentinel: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{safe: boolean, reason: string, score: number} | null>(null);

  const scanUrl = async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a Cyber Security Sentinel. Analyze this URL for phishing or malicious intent: "${url}". 
        Check for typosquatting, suspicious TLDs, and deception patterns. 
        Return ONLY a JSON: {"safe": boolean, "reason": "string", "score": number (0-100 safe score)}.`,
      });
      const data = JSON.parse(response.text?.replace(/```json|```/gi, '') || "{}");
      setResult(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-rose-500/10 rounded-2xl text-rose-500"><Target size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Phishing Link Sentinel</h2>
      </div>
      <div className="space-y-6">
        <div className="relative group">
           <input value={url} onChange={e=>setUrl(e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl p-6 text-white text-sm outline-none focus:border-rose-500/40 pl-14" placeholder="Paste suspicious URL here..." />
           <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
        </div>
        <button onClick={scanUrl} disabled={loading || !url} className="w-full bg-rose-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-rose-500 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <ShieldCheck />} Execute Neural Scan
        </button>

        {result && (
          <div className={`p-8 rounded-[2.5rem] border-2 flex flex-col items-center text-center space-y-4 animate-in zoom-in duration-500 ${result.safe ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'}`}>
             <div className={`w-20 h-20 rounded-full flex items-center justify-center ${result.safe ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'}`}>
                {result.safe ? <ShieldCheck size={48} /> : <AlertTriangle size={48} />}
             </div>
             <h3 className="text-3xl font-black italic tracking-tighter uppercase">{result.safe ? 'Sovereign Clear' : 'Deception Detected'}</h3>
             <p className="text-sm text-gray-400 italic max-w-md">"{result.reason}"</p>
             <div className="text-6xl font-black text-white tabular-nums">{result.score}% <span className="text-xs uppercase text-gray-600 tracking-widest block">Safe Probability</span></div>
          </div>
        )}
      </div>
    </div>
  );
};

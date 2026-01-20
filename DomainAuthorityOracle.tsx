
import React, { useState } from 'react';
import { ShieldCheck, Search, Loader2, Target, BarChart3, Info, Globe, Zap, ExternalLink } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

export const DomainAuthorityOracle: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const analyzeAuthority = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim() || loading) return;

    setLoading(true);
    setError(null);
    setData(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a Senior SEO Strategist. Analyze the likely Domain Authority (DA) and Page Authority (PA) for: "${url}". Use real search-grounded signals if available. Return ONLY a JSON object.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              da: { type: Type.NUMBER },
              pa: { type: Type.NUMBER },
              spamScore: { type: Type.NUMBER },
              links: { type: Type.NUMBER },
              archetype: { type: Type.STRING }
            },
            required: ["da", "pa", "spamScore", "links", "archetype"]
          }
        }
      });

      setData(JSON.parse(response.text || "{}"));
    } catch (err) {
      setError("Archival Desync: Could not synthesize authority metrics.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]"><ShieldCheck size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Domain Authority Oracle</h2>
      </div>

      <div className="space-y-10">
        <form onSubmit={analyzeAuthority} className="flex gap-4">
          <input 
            type="text" 
            value={url} 
            onChange={e => setUrl(e.target.value)} 
            className="flex-grow bg-black border border-white/5 rounded-2xl py-6 px-8 text-white text-lg font-medium outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner"
            placeholder="Enter Web Coordinate (e.g. strongtools.site)..."
          />
          <button type="submit" disabled={loading || !url} className="px-10 bg-[#D4AF37] text-black rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] transition-all shadow-xl disabled:opacity-20">
            {loading ? <Loader2 className="animate-spin" /> : <Zap />}
          </button>
        </form>

        {data ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in zoom-in duration-700">
            <div className="bg-black border border-[#D4AF37]/20 rounded-[2.5rem] p-10 text-center relative overflow-hidden group">
               <div className="absolute inset-0 bg-[#D4AF37]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] mb-2 block italic">Domain Authority</span>
               <div className="text-8xl font-black text-white tabular-nums drop-shadow-2xl">{data.da}</div>
            </div>
            <div className="bg-black border border-white/5 rounded-[2.5rem] p-10 text-center relative overflow-hidden">
               <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-500 mb-2 block italic">Page Authority</span>
               <div className="text-8xl font-black text-white tabular-nums opacity-60">{data.pa}</div>
            </div>
            <div className="flex flex-col gap-4">
               <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-gray-600">Spam Registry</span>
                  <span className={`text-xl font-black tabular-nums ${data.spamScore > 10 ? 'text-rose-500' : 'text-emerald-500'}`}>{data.spamScore}%</span>
               </div>
               <div className="bg-white/[0.02] border border-white/5 rounded-3xl p-6 flex justify-between items-center">
                  <span className="text-[10px] font-black uppercase text-gray-600">Archival Links</span>
                  <span className="text-xl font-black text-white tabular-nums">{data.links.toLocaleString()}</span>
               </div>
               <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl p-6 flex flex-col items-center justify-center text-center">
                  <span className="text-[9px] font-black uppercase text-[#D4AF37] mb-1">Entity Archetype</span>
                  <span className="text-xs font-bold text-white italic truncate w-full">{data.archetype}</span>
               </div>
            </div>
          </div>
        ) : (
          <div className="h-64 bg-black border-2 border-dashed border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-10 space-y-4">
             <BarChart3 size={80} />
             <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Spectral Handshake</p>
          </div>
        )}
      </div>
    </div>
  );
};

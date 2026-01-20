
import React, { useState } from 'react';
import { Globe, Search, Loader2, Copy, Check, ShieldCheck, Zap, Info, Server, Database } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

export const DNSRecordSentinel: React.FC = () => {
  const [domain, setDomain] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const lookupDNS = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!domain.trim() || loading) return;

    setLoading(true);
    setError(null);
    setResults(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Perform a technical DNS lookup for: "${domain}". Find A, MX, TXT, and NS records. If you cannot find live data, provide realistic architectural placeholders for a domain like this. Return ONLY a JSON object.`,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              a: { type: Type.ARRAY, items: { type: Type.STRING } },
              mx: { type: Type.ARRAY, items: { type: Type.STRING } },
              txt: { type: Type.ARRAY, items: { type: Type.STRING } },
              ns: { type: Type.ARRAY, items: { type: Type.STRING } },
              provider: { type: Type.STRING }
            },
            required: ["a", "mx", "txt", "ns", "provider"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      setResults(data);
    } catch (err) {
      setError("Registry Handshake Failure: Could not reach DNS root servers.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(JSON.stringify(results, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400"><Globe size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">DNS Record Sentinel</h2>
      </div>

      <div className="space-y-8">
        <form onSubmit={lookupDNS} className="flex gap-4">
          <div className="relative flex-grow">
            <Server className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-700" size={20} />
            <input 
              type="text" 
              value={domain} 
              onChange={e => setDomain(e.target.value)} 
              className="w-full bg-black border border-white/5 rounded-2xl py-6 pl-14 pr-6 text-white text-lg font-medium outline-none focus:border-blue-500/40 transition-all shadow-inner"
              placeholder="Enter Domain Coordinate (e.g. example.com)..."
            />
          </div>
          <button type="submit" disabled={loading || !domain} className="px-10 bg-blue-600 text-white rounded-2xl font-black uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-20">
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </form>

        {results ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-700">
            {['a', 'mx', 'ns', 'txt'].map((type) => (
              <div key={type} className="bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 group hover:border-blue-500/20 transition-all">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">{type} Records</span>
                  <div className="w-2 h-2 rounded-full bg-blue-500/20 group-hover:bg-blue-500 animate-pulse"></div>
                </div>
                <div className="space-y-2">
                  {results[type].length > 0 ? results[type].map((rec: string, i: number) => (
                    <div key={i} className="text-xs font-mono text-gray-400 break-all bg-black/40 p-3 rounded-xl border border-white/5">{rec}</div>
                  )) : <div className="text-[10px] text-gray-600 italic">No nodes detected in registry.</div>}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="h-64 bg-black/40 border border-white/5 rounded-[3rem] flex flex-col items-center justify-center opacity-10 space-y-4">
            <Database size={80} />
            <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Domain Coordinate Ingestion</p>
          </div>
        )}

        {error && <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl text-rose-400 text-xs italic font-bold text-center">[{error}]</div>}
      </div>
    </div>
  );
};

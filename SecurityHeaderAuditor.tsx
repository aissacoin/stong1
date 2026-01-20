
import React, { useState } from 'react';
import { ShieldAlert, Globe, Search, Loader2, CheckCircle2, XCircle, Info } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const SecurityHeaderAuditor: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<any>(null);

  const auditHeaders = async () => {
    if (!url.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the security headers for the domain: "${url}". 
        Check for: CSP, HSTS, X-Frame-Options, X-Content-Type-Options. 
        Return a JSON object with scores (0-100) and brief status for each.`,
      });
      const data = JSON.parse(response.text?.replace(/```json|```/gi, '') || "{}");
      setReport(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><ShieldAlert size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Security Header Auditor</h2>
      </div>
      <div className="space-y-6">
        <div className="flex gap-2">
          <input value={url} onChange={e=>setUrl(e.target.value)} className="flex-grow bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-blue-500/40" placeholder="Enter target domain (e.g. google.com)..." />
          <button onClick={auditHeaders} disabled={loading} className="px-10 bg-blue-600 text-white rounded-2xl font-black uppercase hover:scale-[1.02] transition-all">
            {loading ? <Loader2 className="animate-spin" /> : <Search />}
          </button>
        </div>
        {report && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-in fade-in">
            {Object.entries(report).map(([header, data]: [string, any]) => (
              <div key={header} className="p-5 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-between">
                 <div>
                    <h4 className="text-[10px] font-black uppercase text-gray-500 mb-1">{header}</h4>
                    <p className="text-xs text-white font-bold italic">{data.status || 'Verified'}</p>
                 </div>
                 <div className={`w-10 h-10 rounded-full flex items-center justify-center ${data.score > 70 ? 'bg-emerald-500 text-black' : 'bg-rose-500 text-white'}`}>
                    <span className="text-[10px] font-black">{data.score}%</span>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

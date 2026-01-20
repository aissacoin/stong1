
import React, { useState } from 'react';
import { Terminal, Sparkles, Loader2, Copy, Check, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const GitCommandHelper: React.FC = () => {
  const [issue, setIssue] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const getCommand = async () => {
    if (!issue.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Translate this development scenario into the exact Git command(s) needed: "${issue}". Return ONLY the commands inside a code block. No explanation.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500"><Terminal size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Git Command Architect</h2>
      </div>
      <div className="space-y-6">
        <input 
          value={issue} onChange={e => setIssue(e.target.value)}
          className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-orange-500/40"
          placeholder="e.g. I want to delete the last 3 commits but keep my changes..."
        />
        <button onClick={getCommand} disabled={loading} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-orange-500 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Commands
        </button>
        {output && (
          <div className="p-6 bg-black rounded-2xl border border-orange-500/20 relative group">
            <pre className="text-emerald-400 font-mono text-sm">{output.replace(/```git|```/g, '')}</pre>
            <button onClick={() => { navigator.clipboard.writeText(output.replace(/```git|```/g, '')); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-orange-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

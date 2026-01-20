
import React, { useState } from 'react';
import { MessageSquare, Sparkles, Loader2, Copy, Check, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const DiscordRulesGen: React.FC = () => {
  const [serverName, setServerName] = useState('New Community');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateRules = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate a professional and clear set of Discord server rules for: "${serverName}". 
        Include: Tone, specific prohibited behaviors, and a "Standard of Conduct" section. Use Discord markdown styles (bolding, lists).`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-indigo-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-indigo-500/10 rounded-2xl text-indigo-500"><MessageSquare size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Discord Rules Scribe</h2>
      </div>
      <div className="space-y-6">
        <input value={serverName} onChange={e => setServerName(e.target.value)} placeholder="Server Name..." className="w-full bg-black border border-white/5 rounded-xl p-4 text-white font-bold" />
        <button onClick={generateRules} disabled={loading} className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Protocol
        </button>
        {output && (
          <div className="p-10 bg-black rounded-3xl border border-white/5 relative h-96 overflow-y-auto custom-scrollbar italic text-gray-400 text-xs leading-relaxed whitespace-pre-wrap">
            {output}
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-6 right-6 text-indigo-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

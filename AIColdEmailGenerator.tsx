
import React, { useState } from 'react';
import { Mail, Send, Sparkles, Loader2, Copy, Check, Briefcase } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIColdEmailGenerator: React.FC = () => {
  const [goal, setGoal] = useState('');
  const [recipient, setRecipient] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateEmail = async () => {
    if (!goal.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a high-conversion cold email. 
        Goal: "${goal}"
        Recipient Identity: "${recipient}"
        Style: Professional, personalized, and non-spammy. Include a clear subject line.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Mail size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">AI Cold Email Forge</h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input value={recipient} onChange={e => setRecipient(e.target.value)} placeholder="Who is the recipient? (e.g. CEO of TechX)" className="bg-black border border-white/5 rounded-xl p-4 text-white text-sm" />
          <input value={goal} onChange={e => setGoal(e.target.value)} placeholder="What is your goal? (e.g. Graphic design partnership)" className="bg-black border border-white/5 rounded-xl p-4 text-white text-sm" />
        </div>
        <button onClick={generateEmail} disabled={loading || !goal} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-blue-500 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Send size={20} />} Synthesize Email
        </button>
        {output && (
          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 relative whitespace-pre-wrap text-sm text-gray-300 italic">
            {output}
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-blue-400">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

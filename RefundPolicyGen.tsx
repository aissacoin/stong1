
import React, { useState } from 'react';
import { FileText, Sparkles, Loader2, Copy, Check, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const RefundPolicyGen: React.FC = () => {
  const [shopName, setShopName] = useState('My Store');
  const [days, setDays] = useState(30);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePolicy = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create a professional, clear Refund and Returns policy for an online shop named "${shopName}". The period for returns is ${days} days. Include conditions for original packaging and non-refundable items. Return only the policy text.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-zinc-500/10 rounded-2xl text-zinc-500"><FileText size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Refund Policy Scribe</h2>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <input value={shopName} onChange={e => setShopName(e.target.value)} className="bg-black border border-white/10 rounded-xl p-4 text-white text-sm" placeholder="Shop Name" />
          <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} className="bg-black border border-white/10 rounded-xl p-4 text-white text-sm" placeholder="Return Days" />
        </div>
        <button onClick={generatePolicy} disabled={loading} className="w-full bg-zinc-700 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Policy
        </button>
        {output && (
          <div className="p-10 bg-black rounded-3xl border border-white/5 relative h-96 overflow-y-auto custom-scrollbar italic text-gray-400 text-xs leading-relaxed whitespace-pre-wrap">
            {output}
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-6 right-6 text-zinc-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Layout, Sparkles, Loader2, Copy, Check, MessageSquare } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const FBAdTester: React.FC = () => {
  const [product, setProduct] = useState('');
  const [angle, setAngle] = useState('Benefit-driven');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateAd = async () => {
    if (!product.trim()) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Write a high-converting Facebook Ad copy for: "${product}". Angle: ${angle}. 
        Format: Hook, Body with emojis, and a clear Call to Action. Return only the ad text.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-600/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-600/10 rounded-2xl text-blue-600"><Layout size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">FB Ad Copy Architect</h2>
      </div>
      <div className="space-y-6">
        <textarea value={product} onChange={e => setProduct(e.target.value)} className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-blue-500/40" placeholder="Product details or offer..." />
        <div className="flex gap-2">
           {['Benefit-driven', 'Storytelling', 'Scarcity'].map(a => (
             <button key={a} onClick={() => setAngle(a)} className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${angle === a ? 'bg-blue-600 text-white' : 'bg-white/5 text-gray-500'}`}>{a}</button>
           ))}
        </div>
        <button onClick={generateAd} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Ad Variants
        </button>
        {output && (
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 relative whitespace-pre-wrap text-sm text-gray-300 italic">
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

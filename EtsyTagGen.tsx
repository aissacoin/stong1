
import React, { useState } from 'react';
import { Tag, Sparkles, Loader2, Copy, Check, Hash } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const EtsyTagGen: React.FC = () => {
  const [product, setProduct] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateTags = async () => {
    if (!product.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Generate 13 high-SEO Etsy tags for: "${product}". Ensure they are within 20 character limit. Return as a simple comma separated list.`,
      });
      const list = (response.text || '').split(',').map(t => t.trim());
      setTags(list);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500"><Tag size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Etsy Tag Oracle</h2>
      </div>
      <div className="space-y-6">
        <input value={product} onChange={e => setProduct(e.target.value)} className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-orange-500/40" placeholder="What are you selling? (e.g. Handmade Ceramic Mug)" />
        <button onClick={generateTags} disabled={loading} className="w-full bg-orange-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Generate 13 Tags
        </button>
        {tags.length > 0 && (
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 space-y-4">
             <div className="flex flex-wrap gap-2">
                {tags.map((tag, i) => (
                  <span key={i} className="bg-black/60 text-orange-400 px-3 py-1.5 rounded-lg text-[10px] font-black uppercase border border-white/5">{tag}</span>
                ))}
             </div>
             <button onClick={() => { navigator.clipboard.writeText(tags.join(', ')); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="text-xs text-gray-500 hover:text-white flex items-center gap-2">
               {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Vaulted' : 'Copy All'}
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

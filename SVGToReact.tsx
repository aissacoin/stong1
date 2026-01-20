
import React, { useState } from 'react';
import { FileCode, Sparkles, Loader2, Copy, Check, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const SVGToReact: React.FC = () => {
  const [svg, setSvg] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const convert = async () => {
    if (!svg.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert this SVG into a clean, functional React component (TypeScript). Refine the paths and use standard prop-passing. SVG: "${svg}". Return only the component code.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><FileCode size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">SVG to React</h2>
      </div>
      <div className="space-y-6">
        <textarea 
          value={svg} onChange={e => setSvg(e.target.value)}
          className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-[#D4AF37]/40"
          placeholder="Paste raw SVG code here..."
        />
        <button onClick={convert} disabled={loading} className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Optimize & Transform
        </button>
        {output && (
          <div className="p-6 bg-white/5 rounded-2xl border border-[#D4AF37]/20 relative group">
            <pre className="text-gray-300 font-mono text-xs overflow-x-auto">{output.replace(/```tsx|```/g, '')}</pre>
            <button onClick={() => { navigator.clipboard.writeText(output.replace(/```tsx|```/g, '')); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-[#D4AF37]">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

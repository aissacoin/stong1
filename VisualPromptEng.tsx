
import React, { useState } from 'react';
import { Wand2, Sparkles, Loader2, Copy, Check, Trash2, Zap, Info, Target, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const VisualPromptEng: React.FC = () => {
  const [concept, setConcept] = useState('');
  const [style, setStyle] = useState('Photorealistic');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generatePrompt = async () => {
    if (!concept.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Act as a world-class AI Prompt Engineer for Midjourney and Stable Diffusion. Expand this concept: "${concept}" into a high-fidelity technical prompt using ${style} style. Include cinematic lighting, camera lens data, and atmospheric effects. Return only the final prompt string.`,
      });
      setOutput(response.text || '');
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400"><Wand2 size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Visual Prompt Engineer</h2>
      </div>

      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Raw Concept Ingestion</label>
            <textarea value={concept} onChange={e=>setConcept(e.target.value)} className="w-full h-32 bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-orange-500/40 resize-none shadow-inner" placeholder="e.g. A futuristic city made of glass..." />
          </div>
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest">Aesthetic Calibration</label>
            <div className="grid grid-cols-2 gap-2">
              {['Photorealistic', 'Cyberpunk', 'Impressionist', '3D Render'].map(s => (
                <button key={s} onClick={()=>setStyle(s)} className={`py-3 rounded-xl border text-[9px] font-black uppercase transition-all ${style === s ? 'bg-orange-600 text-white border-orange-600 shadow-lg' : 'bg-white/5 border-white/5 text-gray-600'}`}>{s}</button>
              ))}
            </div>
            <button onClick={generatePrompt} disabled={loading || !concept} className="w-full bg-orange-600 text-white py-4 rounded-xl font-black uppercase text-xs flex items-center justify-center gap-2 hover:scale-[1.01] transition-all">
              {loading ? <Loader2 className="animate-spin" /> : <Zap />} Synthesize Prompt
            </button>
          </div>
        </div>

        {output && (
          <div className="p-8 bg-black border border-orange-500/20 rounded-[2.5rem] relative animate-in fade-in zoom-in">
             <div className="flex justify-between items-center mb-4">
                <span className="text-[10px] font-black uppercase text-orange-500 tracking-widest italic">Technical Manuscript Node</span>
                <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="text-gray-500 hover:text-white">
                  {copied ? <Check size={18} className="text-emerald-400" /> : <Copy size={18}/>}
                </button>
             </div>
             <p className="text-sm text-gray-300 leading-relaxed font-mono italic">"{output}"</p>
          </div>
        )}
      </div>
    </div>
  );
};

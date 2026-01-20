
import React, { useState } from 'react';
import { Youtube, Sparkles, Loader2, Copy, Check, Trash2, Video, Target, Zap, ShieldCheck } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIYouTubeScriptGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateScript = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-1.5-pro", // التحويل إلى 1.5 برو للمقالات الطويلة مجاناً
        contents: `Generate a high-retention viral YouTube script for: "${topic}". Include title, hook, content, and CTA. Use standard numbers 0123456789.`,
      });
      setOutput(response.text || "");
    } catch (err) {
      setOutput("Archival Error: Failed to synchronize with 1.5-Pro node.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#ff0000]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-600/10 rounded-2xl text-red-500"><Youtube size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">YouTube Script Forge</h2>
      </div>
      <div className="space-y-6">
        <textarea 
          value={topic} 
          onChange={e => setTopic(e.target.value)} 
          className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-red-500/40" 
          placeholder="Video concept..." 
        />
        <button onClick={generateScript} disabled={loading} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Generate Long-Form Script
        </button>
        {output && (
          <div className="p-8 bg-white/5 rounded-2xl border border-white/10 relative">
            <pre className="text-gray-300 text-xs whitespace-pre-wrap leading-relaxed italic">{output}</pre>
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-red-500">
              {copied ? <Check /> : <Copy />}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { Youtube, Zap, Sparkles, Loader2, Copy, Check, PlayCircle } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AIYouTubeHookGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateHook = async () => {
    if (!topic.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Create 3 viral opening hooks (first 10 seconds) for a YouTube video about: "${topic}". 
        The hooks should use different techniques: Curiosity, Controversy, and Immediate Value.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-red-600/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-red-600/10 rounded-2xl text-red-600"><Youtube size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">YouTube Intro Hook Forge</h2>
      </div>
      <div className="space-y-6">
        <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="What is your video about?" className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white outline-none focus:border-red-500/40" />
        <button onClick={generateHook} disabled={loading || !topic} className="w-full bg-red-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-red-500 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Zap size={20} />} Generate Viral Hooks
        </button>
        {output && (
          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 relative whitespace-pre-wrap text-sm text-gray-300 leading-relaxed italic">
            {output}
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-red-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { ShieldAlert, Code2, Copy, Check, Trash2, Zap, ShieldCheck, Terminal, Loader2 } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const JSObfuscatorNode: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const obfuscateCode = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Obfuscate the following JavaScript code to make it unreadable but functionally identical. Use techniques like renaming variables to hex strings, string splitting, and dead code injection. Return ONLY the obfuscated code without any explanation or backticks. Code: "${code}"`,
      });
      setOutput(response.text || '');
    } catch (e) {
      setOutput('Institutional Node Failure: Obfuscation protocol interrupted.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-500"><ShieldAlert size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">JS Logic Obfuscator</h2>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 bg-rose-500/5 border border-rose-500/20 rounded-xl">
           <Terminal size={14} className="text-rose-400" />
           <span className="text-[9px] font-black uppercase tracking-widest text-rose-400/60">Sovereign Protection Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase text-gray-500 px-2 italic tracking-widest">Source Logic (Raw JS)</label>
          <textarea 
            value={code} 
            onChange={(e) => setCode(e.target.value)} 
            className="w-full h-80 bg-black border border-white/5 rounded-[2rem] p-8 text-rose-100 font-mono text-xs outline-none focus:border-rose-500/40 transition-all resize-none shadow-inner" 
            placeholder="function secure() { console.log('Top Secret'); } ..."
          />
        </div>
        <div className="space-y-4 flex flex-col">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-black uppercase text-rose-500 italic tracking-widest">Obfuscated Archive</label>
            <button 
              onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(() => setCopied(false), 2000); }} 
              disabled={!output}
              className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}
            >
              {copied ? <Check size={14}/> : <Copy size={14}/>} {copied ? 'Vaulted' : 'Copy'}
            </button>
          </div>
          <div className="flex-grow bg-black/60 border border-white/5 rounded-[2rem] p-8 text-emerald-400 font-mono text-[10px] leading-relaxed shadow-inner overflow-auto custom-scrollbar">
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-4 animate-pulse">
                <Loader2 className="animate-spin" size={32} />
                <span className="text-[10px] font-black uppercase tracking-widest">Scrambling Bitstream...</span>
              </div>
            ) : (
              <pre className="whitespace-pre-wrap">{output || "Awaiting archival input for scrambling..."}</pre>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={obfuscateCode}
        disabled={loading || !code.trim()}
        className="w-full bg-rose-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl disabled:opacity-20"
      >
        {loading ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
        Execute Neural Scrambler
      </button>
    </div>
  );
};

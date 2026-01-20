
import React, { useState } from 'react';
import { FileCode, Code2, Sparkles, Loader2, Copy, Check, FileText } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const AITechDocWriter: React.FC = () => {
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const generateDocs = async () => {
    if (!code.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert the following code into professional technical documentation for end-users. 
        Explain what it does, the requirements, and how to use it. Use a clear, structured format.
        CODE:
        ${code}`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-500"><FileCode size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">AI Code-to-Doc Scribe</h2>
      </div>
      <div className="space-y-6">
        <textarea 
          value={code} 
          onChange={e => setCode(e.target.value)} 
          className="w-full h-48 bg-black border border-white/5 rounded-2xl p-6 text-emerald-400 font-mono text-xs outline-none focus:border-emerald-500/40" 
          placeholder="Paste your code snippet here..."
        />
        <button onClick={generateDocs} disabled={loading || !code} className="w-full bg-emerald-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2 hover:bg-emerald-500 transition-all">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Documentation
        </button>
        {output && (
          <div className="p-6 bg-white/[0.02] rounded-2xl border border-white/10 relative whitespace-pre-wrap text-sm text-gray-300 leading-relaxed italic h-96 overflow-y-auto custom-scrollbar">
            {output}
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-emerald-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { FileJson, Sparkles, Loader2, Copy, Check, Globe } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const PostmanToOpenAPI: React.FC = () => {
  const [json, setJson] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const convert = async () => {
    if (!json.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Convert this Postman Collection JSON into a valid OpenAPI 3.0 YAML specification: "${json}". Return only the YAML.`,
      });
      setOutput(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-500"><Globe size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Postman to OpenAPI</h2>
      </div>
      <div className="space-y-6">
        <textarea 
          value={json} onChange={e => setJson(e.target.value)}
          className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white outline-none focus:border-blue-500/40"
          placeholder="Paste Postman Collection JSON..."
        />
        <button onClick={convert} disabled={loading} className="w-full bg-blue-600 text-white py-5 rounded-2xl font-black uppercase flex items-center justify-center gap-2">
          {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Spec
        </button>
        {output && (
          <div className="p-6 bg-white/5 rounded-2xl border border-blue-500/20 relative group">
            <pre className="text-gray-300 font-mono text-xs overflow-x-auto">{output.replace(/```yaml|```/g, '')}</pre>
            <button onClick={() => { navigator.clipboard.writeText(output.replace(/```yaml|```/g, '')); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-blue-500">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

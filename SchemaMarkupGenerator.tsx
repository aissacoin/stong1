
import React, { useState, useEffect } from 'react';
import { 
  Code2, Sparkles, Loader2, Copy, Check, Trash2, 
  Search, Globe, ShieldCheck, Zap, Info, FileJson, 
  Layout, Eye, Terminal, Star, HelpCircle, ShoppingBag, 
  MapPin, Calendar, User
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

type SchemaType = 'Article' | 'Product' | 'FAQPage' | 'Organization' | 'LocalBusiness' | 'Event' | 'Recipe';

export const SchemaMarkupGenerator: React.FC = () => {
  const [type, setType] = useState<SchemaType>('Article');
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateSchema = async () => {
    if (!input.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Act as an Elite Technical SEO Architect. Generate a high-fidelity JSON-LD Schema Markup for the following ${type} data:
    
    Data Source: "${input}"
    Schema Type: ${type}
    
    Requirements:
    1. Output MUST be valid JSON-LD.
    2. Include all recommended and required fields for Google Search Rich Results.
    3. Use standard schema.org vocabulary.
    4. Return ONLY the JSON-LD script content (starting with { and ending with }). No backticks or explanations.`;

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.1, // Low temperature for precise code generation
        }
      });

      const text = response.text?.trim() || "";
      // Strip potential markdown backticks if AI ignores instruction
      const cleaned = text.replace(/```json|```/gi, "").trim();
      setOutput(cleaned);
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Error: The semantic node is temporarily desynchronized.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    const scriptTag = `<script type="application/ld+json">\n${output}\n</script>`;
    navigator.clipboard.writeText(scriptTag);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const getSchemaIcon = (t: SchemaType) => {
    switch(t) {
      case 'Article': return <FileJson size={14} />;
      case 'Product': return <ShoppingBag size={14} />;
      case 'FAQPage': return <HelpCircle size={14} />;
      case 'Organization': return <Globe size={14} />;
      case 'LocalBusiness': return <MapPin size={14} />;
      case 'Event': return <Calendar size={14} />;
      case 'Recipe': return <Zap size={14} />;
      default: return <Code2 size={14} />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600/10 rounded-2xl border border-emerald-600/20 text-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
              <Code2 size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Schema Markup Architect</h2>
              <p className="text-[9px] font-bold text-emerald-500/60 uppercase tracking-[0.4em]">Semantic SEO Synthesis v1.0</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Search-Engine Compliant</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Configuration Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Schema Classification</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(['Article', 'Product', 'FAQPage', 'Organization', 'LocalBusiness', 'Event'] as SchemaType[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setType(t)}
                    className={`py-3 px-2 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${type === t ? 'bg-emerald-600 text-white border-emerald-600' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {getSchemaIcon(t)} {t === 'FAQPage' ? 'FAQ' : t === 'LocalBusiness' ? 'Local Biz' : t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Entity Context Ingestion</label>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="w-full h-40 bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-emerald-500/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder={`Describe your ${type.toLowerCase()} details here (Name, price, date, questions, etc.)...`}
              />
            </div>

            <button
              onClick={generateSchema}
              disabled={loading || !input.trim()}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Synthesize Schema Node
            </button>
          </div>

          {/* Result Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500 italic">Institutional Registry Viewport</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/80 border border-white/5 rounded-[3rem] p-6 overflow-hidden group shadow-inner min-h-[450px]">
               <div className="absolute top-0 right-0 p-8 opacity-[0.02] pointer-events-none rotate-12">
                  <Terminal size={300} />
               </div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <FileJson size={64} className="text-emerald-500 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-emerald-500">Mapping Semantic Graph...</p>
                 </div>
               ) : output ? (
                 <div className="relative z-10 h-full flex flex-col">
                    <div className="flex-grow overflow-y-auto custom-scrollbar">
                      <pre className="text-emerald-400/90 font-mono text-[11px] leading-relaxed whitespace-pre-wrap">
                        {output}
                      </pre>
                    </div>
                    <div className="pt-6 border-t border-white/5 mt-4">
                       <button 
                        onClick={handleCopy}
                        className={`w-full py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                       >
                         {copied ? <Check size={18}/> : <Copy size={18}/>}
                         {copied ? 'Captured' : 'Copy Script Tag'}
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Layout size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Entity Context</p>
                 </div>
               )}
            </div>

            {error && (
              <div className="flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <Info className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Star size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Rich Result Probability Optimized</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Eye size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Google Knowledge Graph Ready</p>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-emerald-500/5 border-2 border-dashed border-emerald-500/20 rounded-[4rem] relative overflow-hidden group">
         <Info className="absolute -bottom-10 -right-10 opacity-[0.03] text-emerald-500 rotate-12" size={300} />
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
               <Zap size={24} />
               <h3 className="text-2xl font-black uppercase italic tracking-tighter font-serif-scholarly">Technical Protocol: Structured Data</h3>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed italic">
              "Schema Markup is the sovereign language of search engines. By utilizing JSON-LD (JavaScript Object Notation for Linked Data), we provide a deterministic metadata layer that maps your content onto the **Knowledge Graph**. This instrument follows the strict schema.org specifications, ensuring that your entity is recognized with maximum semantic clarity by Google, Bing, and other archival crawlers."
            </p>
         </div>
      </div>
    </div>
  );
};

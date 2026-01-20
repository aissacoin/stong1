
import React, { useState } from 'react';
import { Youtube, Sparkles, Loader2, Copy, Check, Trash2, Video, ListChecks, PlayCircle, Info, Target, HelpCircle, BookOpen, ShieldCheck, Zap, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const YouTubeScriptGen: React.FC = () => {
  const { t } = useLanguage();
  const [topic, setTopic] = useState('');
  const [audience, setAudience] = useState('');
  const [tone, setTone] = useState('Engaging');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const toolData = t.tools['yt-script-gen'] || {
    name: 'YouTube Script Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const generateScript = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const prompt = `Generate a full, viral-ready YouTube script for the topic: "${topic}". 
    Target Audience: ${audience || 'General'}. 
    Tone: ${tone}.
    
    The script must include:
    1. Attention-grabbing Title options.
    2. A high-retention Hook (first 30 seconds).
    3. Organized segments with visual cues.
    4. Call to Action (CTA) and Outro.
    
    Structure the response clearly for a creator. Use standard numerals 0123456789.`;

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          systemInstruction: "You are an expert YouTube Content Strategist who understands algorithm retention and audience psychology. You write scripts that sound human, exciting, and professional. Use numerals 0123456789.",
          temperature: 0.85
        }
      });

      setOutput(response.text || "Failed to generate script.");
    } catch (err) {
      console.error(err);
      setOutput("Error synchronizing with the creative engine 0123456789");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Viral Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-red-600/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-red-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-red-600/10 rounded-2xl border border-red-600/20 text-red-500">
              <Youtube size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-red-500/40 uppercase tracking-[0.4em]">Viral Narrative Synthesis Node 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Logic Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Concept Ingestion</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-32 bg-black border border-white/5 rounded-[2rem] p-6 text-white text-sm outline-none focus:border-red-600/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar italic"
                placeholder="e.g. The Future of Space Colonization 0123456789..."
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Audience & Tone</label>
              <div className="grid grid-cols-2 gap-4">
                 <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-red-600/40"
                  placeholder="Target Audience"
                />
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl p-4 text-white text-xs outline-none focus:border-red-600/40"
                >
                  <option>Engaging</option>
                  <option>Educational</option>
                  <option>Professional</option>
                  <option>Humorous</option>
                </select>
              </div>
            </div>
            <button
              onClick={generateScript}
              disabled={loading || !topic.trim()}
              className="w-full bg-red-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(220,38,38,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Forge Manuscript
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-red-500 italic">Synthesized Narrative Archive</label>
              <div className="flex gap-4">
                <button onClick={() => setOutput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                <button 
                  onClick={handleCopy}
                  disabled={!output}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}
                >
                  {copied ? <Check size={14}/> : <Copy size={14}/>}
                  <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
                </button>
              </div>
            </div>
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Video size={64} className="text-red-600 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center text-red-600">Architecting Narrative Arc 0123456789...</p>
                 </div>
               ) : output ? (
                 <div className="relative z-10 text-gray-300 text-sm leading-relaxed italic whitespace-pre-wrap animate-in fade-in duration-700">
                    {output}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Youtube size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Conceptual Ingestion 0123456789</p>
                 </div>
               )}
            </div>
          </div>
        </div>
      </div>

      {/* DOCUMENTATION GRID */}
      <div className="mt-16 pt-12 border-t border-[#e7d8c5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Info size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.about}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Narrative Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

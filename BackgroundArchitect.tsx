
import React, { useState, useRef } from 'react';
import { Mountain, Upload, Loader2, Sparkles, Download, ShieldCheck, Zap, Image as ImageIcon, Trash2, Wand2, Info, Target, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const BackgroundArchitect: React.FC = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [prompt, setPrompt] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['bg-architect'] || {
    name: 'Synthetic Environment Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const synthesizeBackground = async () => {
    if (!file || !prompt.trim() || loading) return;
    setLoading(true);
    setResult(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const base64 = await fileToBase64(file);
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64, mimeType: file.type } },
            { text: `Keep the main subject exactly as it is. Replace the background with: "${prompt}". The new background should be professional, atmospheric, and have lighting that matches the subject perfectly. Return the combined final image. Use standard numerals 0123456789.` }
          ]
        }
      });

      let base64Data = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          base64Data = part.inlineData.data;
          break;
        }
      }
      if (base64Data) setResult(`data:image/png;base64,${base64Data}`);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Environmental Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-2xl border border-orange-500/20 text-orange-400">
              <Mountain size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Spatial Synthesis 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Registry Isolation Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Ingest Subject Profile</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`h-64 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${preview ? 'border-orange-500/40' : 'border-white/5 hover:border-orange-500/40'}`}
              >
                {preview ? <img src={preview} className="h-full w-full object-contain p-4" /> : (
                  <>
                    <Upload size={32} className="text-gray-700 mb-2" />
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Inject Asset Manuscript 0123456789</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={e => { const f = e.target.files?.[0]; if(f){ setFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Environment Directive 0123456789</label>
               <textarea 
                value={prompt} 
                onChange={e => setPrompt(e.target.value)} 
                className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white text-sm outline-none focus:border-orange-500/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="Describe target ambiance (e.g. A luxury studio with soft lighting 0123456789)..."
               />
            </div>

            <button onClick={synthesizeBackground} disabled={loading || !file || !prompt} className="w-full bg-orange-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(249,115,22,0.3)] disabled:opacity-20">
              {loading ? <Loader2 className="animate-spin" size={24}/> : <Wand2 size={24}/>}
              Forge Environment Frame
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Handshake Result Viewport</label>
              <button onClick={() => { setPreview(null); setFile(null); setResult(null); }} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="text-center space-y-4 animate-pulse">
                    <Loader2 className="animate-spin text-orange-500 mx-auto" size={48} />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-orange-500">Mapping Environment 0123456789...</p>
                 </div>
               ) : result ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                    <img src={result} className="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Result" />
                    <button onClick={() => { const a = document.createElement('a'); a.href = result; a.download = 'Sovereign_Environment_Forge.png'; a.click(); }} className="mt-6 flex items-center gap-3 px-8 py-3 bg-orange-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                      <Download size={16}/> Export Archive 0123456789
                    </button>
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <ImageIcon size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Digital Ingestion 0123456789</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

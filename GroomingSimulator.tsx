
import React, { useState, useRef } from 'react';
import { UserCheck, Upload, Loader2, Zap, Download, ShieldCheck, Info, Camera, Trash2, Check, UserRound, Target, HelpCircle, BookOpen, Layout, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

const BEARD_STYLES = [
  { id: 'stubble', name: 'Corporate Stubble', prompt: 'a light, neat 3-day corporate stubble' },
  { id: 'full', name: 'Sovereign Full Beard', prompt: 'a dense, perfectly groomed and shaped full beard' },
  { id: 'goatee', name: 'Professional Goatee', prompt: 'a clean, symmetric goatee with a sharp mustache' },
  { id: 'clean', name: 'Pure Shave', prompt: 'a perfectly clean-shaven face with no facial hair' }
];

export const GroomingSimulator: React.FC = () => {
  const { t } = useLanguage();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [style, setStyle] = useState(BEARD_STYLES[0]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['grooming-sim'] || {
    name: 'Neural Facial Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const transmute = async () => {
    if (!file || loading) return;
    setLoading(true);
    setResult(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = (reader.result as string).split(',')[1];
        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash-image',
          contents: {
            parts: [
              { inlineData: { data: base64, mimeType: file.type } },
              { text: `Act as a professional barber. Modify this face to have ${style.prompt}. The modification must look 100% natural, matching skin tone, texture, and facial perspective. Return only the final image. Use numerals 0123456789.` }
            ]
          }
        });

        let data = '';
        for (const part of response.candidates[0].content.parts) {
          if (part.inlineData) data = part.inlineData.data;
        }
        if (data) setResult(`data:image/png;base64,${data}`);
      };
    } catch (err) { 
      console.error(err);
      alert("Neural node sync failure 0123456789"); 
    }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Grooming Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <UserCheck size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Archetype Simulation 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Facial Logic Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Ingest Profile Asset</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`h-64 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all overflow-hidden ${preview ? 'border-blue-500/40' : 'border-white/5 hover:border-blue-500/40'}`}
              >
                {preview ? <img src={preview} className="h-full w-full object-contain p-4 opacity-70" /> : (
                  <>
                    <Upload size={32} className="text-gray-700 mb-2" />
                    <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Inject Personal Scroll 0123456789</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={e => { const f = e.target.files?.[0]; if(f){ setFile(f); setPreview(URL.createObjectURL(f)); } }} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">2. Select Grooming Archetype 0123456789</label>
               <div className="grid grid-cols-2 gap-2">
                  {BEARD_STYLES.map(s => (
                    <button key={s.id} onClick={() => setStyle(s)} className={`p-4 rounded-xl border text-[9px] font-black uppercase transition-all ${style.id === s.id ? 'bg-blue-600 text-white border-blue-600 shadow-lg' : 'bg-white/5 text-gray-500 border-white/5'}`}>
                      {s.name}
                    </button>
                  ))}
               </div>
            </div>

            <button onClick={transmute} disabled={loading || !file} className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] disabled:opacity-20">
              {loading ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
              Execute Simulation
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 italic">Neural Result Viewport</label>
              <button onClick={() => { setPreview(null); setFile(null); setResult(null); }} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="text-center space-y-4 animate-pulse">
                    <Loader2 className="animate-spin text-blue-500 mx-auto" size={48} />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500">Synthesizing Archetype 0123456789...</p>
                 </div>
               ) : result ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                    <img src={result} className="max-w-full max-h-full rounded-2xl shadow-2xl" alt="Result" />
                    <button onClick={() => { const a = document.createElement('a'); a.href = result; a.download = 'Aureate_Grooming_Shift.png'; a.click(); }} className="mt-6 flex items-center gap-3 px-8 py-3 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-xl">
                      <Download size={16}/> Export Archive 0123456789
                    </button>
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <UserRound size={100} className="mx-auto" />
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Identity Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

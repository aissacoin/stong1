
import React, { useState, useRef } from 'react';
import { Box, Upload, Download, Trash2, ShieldCheck, Zap, Info, Image as ImageIcon, Loader2, Check, Sparkles, Camera, Layers, Target, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type ForgeMode = '3D_RENDER' | 'ULTRA_4K' | 'FLAT_2D';
type AspectRatio = '1:1' | '16:9' | '9:16' | '4:3';

export const DimensionForge: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [mode, setMode] = useState<ForgeMode>('3D_RENDER');
  const [ratio, setRatio] = useState<AspectRatio>('1:1');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['dimension-forge'] || {
    name: '3D Dimension Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0];
    if (uploadedFile) {
      setFile(uploadedFile);
      setPreview(URL.createObjectURL(uploadedFile));
      setResult(null);
      setStatus('');
    }
  };

  const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve((reader.result as string).split(',')[1]);
      reader.onerror = (error) => reject(error);
    });
  };

  const forgeDimensions = async () => {
    if (!file || loading) return;
    setLoading(true);
    setStatus(isAr ? 'جاري تصنيع الأبعاد...' : 'Synthesizing Dimensions...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const base64Data = await fileToBase64(file);
      const promptMap = {
        '3D_RENDER': "Transform this image into a hyper-realistic 3D render with depth and shadows. Professional product photography look.",
        'ULTRA_4K': "Enhance this image to Ultra-HD 4K quality, sharpen edges, and remove artifacts.",
        'FLAT_2D': "Simplify this image into a clean, minimalist 2D vector illustrative style."
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: file.type } },
            { text: promptMap[mode] }
          ]
        },
        config: { imageConfig: { aspectRatio: ratio } }
      });

      let forgedBase64 = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) forgedBase64 = part.inlineData.data;
      }

      if (forgedBase64) setResult(`data:image/png;base64,${forgedBase64}`);
      setStatus('');
    } catch (err) { setStatus('Error'); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Visual Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent"></div>
        
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-4 bg-[#D4AF37]/10 rounded-[1.5rem] border border-[#D4AF37]/20 text-[#D4AF37]">
              <Camera size={32} />
            </div>
            <div className="text-left">
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[10px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.5em] mt-2">Neural Visual Synthesis Core 0123456789</p>
            </div>
          </div>

          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {(['3D_RENDER', 'ULTRA_4K', 'FLAT_2D'] as ForgeMode[]).map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${mode === m ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {m.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4 space-y-8 border-r border-white/5 pr-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase text-gray-500 italic px-2">1. Ingest Master Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="group relative cursor-pointer h-48 bg-black border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 hover:border-[#D4AF37]/40 transition-all overflow-hidden"
              >
                {preview ? <img src={preview} className="w-full h-full object-contain p-4 opacity-70" /> : <Upload size={32} className="text-gray-700" />}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <button
              onClick={forgeDimensions}
              disabled={loading || !file}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />}
              Forge Asset 0123456789
            </button>
            
            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-3">
               <ShieldCheck size={18} className="text-emerald-400" />
               <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Privacy Protocol Verified 0123456789</span>
            </div>
          </div>

          <div className="lg:col-span-8 flex flex-col h-full space-y-6">
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[500px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse z-10">
                    <Layers size={64} className="text-[#D4AF37] opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] italic">{status}</p>
                 </div>
               ) : result ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-700">
                    <img src={result} className="max-w-full max-h-full rounded-2xl shadow-2xl" />
                    <button onClick={() => { const a = document.createElement('a'); a.href = result; a.download = 'forged_3d_archive.png'; a.click(); }} className="mt-6 flex items-center gap-3 px-8 py-3 bg-emerald-600 text-white rounded-xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">
                        <Download size={16}/> Download File
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

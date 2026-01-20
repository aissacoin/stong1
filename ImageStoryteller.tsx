
import React, { useState, useRef } from 'react';
import { MessageSquareText, Upload, Sparkles, Loader2, Copy, Check, Trash2, Zap, Info, ShieldCheck, Eye, Target, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const ImageStoryteller: React.FC = () => {
  const { t } = useLanguage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['image-storyteller'] || {
    name: 'Neural Narrative Architect',
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

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setOutput('');
    }
  };

  const narrateImage = async () => {
    if (!imageFile || loading) return;
    setLoading(true);
    setError(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const base64Data = await fileToBase64(imageFile);
      const imagePart = {
        inlineData: { data: base64Data, mimeType: imageFile.type }
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: { 
          parts: [
            imagePart, 
            { text: "Analyze this image and write a compelling, artistic narrative or professional marketing description for it. Focus on atmosphere, lighting, and hidden details. Return in high-fidelity prose. Use standard numerals 0123456789" }
          ] 
        }
      });

      setOutput(response.text || "Vision node returned null registry.");
    } catch (err) {
      setError("Logical Synthesis Failure: The neural engine could not parse the visual data 0123456789");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setOutput('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Narrative Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <MessageSquareText size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Semantic Visual Analysis 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Analysis Logic Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div 
              onClick={() => fileInputRef.current?.click()}
              className={`h-80 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all ${previewUrl ? 'border-blue-500/40' : 'border-white/5 hover:border-blue-500/40'}`}
            >
              {previewUrl ? (
                <img src={previewUrl} className="w-full h-full object-contain p-4 rounded-[2.5rem]" alt="Source" />
              ) : (
                <>
                  <Upload size={48} className="text-gray-700 mb-4" />
                  <span className="text-[10px] font-black uppercase text-gray-500">Inject Visual Source 0123456789</span>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            </div>
            <button onClick={narrateImage} disabled={loading || !imageFile} className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-2xl">
              {loading ? <Loader2 className="animate-spin" /> : <Sparkles />} Synthesize Narrative
            </button>
          </div>

          <div className="relative flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-400 italic">Synthesized Manuscript 0123456789</label>
              <div className="flex gap-4">
                 <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                 {output && (
                   <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="text-gray-500 hover:text-white transition-colors">
                     {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16}/>}
                   </button>
                 )}
              </div>
            </div>
            <div className="flex-grow bg-black/60 border border-white/5 rounded-[2.5rem] p-8 overflow-y-auto custom-scrollbar shadow-inner">
              {loading ? (
                <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-40 animate-pulse">
                  <Eye size={48} className="text-blue-500" />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Reading Visual Data 0123456789...</p>
                </div>
              ) : output ? (
                <p className="text-sm text-gray-300 leading-relaxed italic whitespace-pre-wrap">{output}</p>
              ) : (
                <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4">
                  <MessageSquareText size={64} />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Visual Ingestion 0123456789</p>
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

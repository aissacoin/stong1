
import React, { useState, useRef } from 'react';
import { Sparkles, Upload, Download, Trash2, ShieldCheck, Zap, Image as ImageIcon, Loader2, Check, AlertCircle, Wand2, Eye, Info, Target, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const AIPhotoEnhancer: React.FC = () => {
  const { t } = useLanguage();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [enhancedUrl, setEnhancedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [enhancementType, setEnhancementType] = useState<'General' | 'Portrait' | 'Landscape'>('General');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['photo-enhancer'] || {
    name: 'Neural Detail Forge',
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
      if (file.size > 10 * 1024 * 1024) {
        setError("File size exceeds 10MB archival limit.");
        return;
      }
      setOriginalFile(file);
      setOriginalPreview(URL.createObjectURL(file));
      setEnhancedUrl(null);
      setError(null);
    }
  };

  const enhanceImage = async () => {
    if (!originalFile || processing) return;

    setProcessing(true);
    setError(null);
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const base64Data = await fileToBase64(originalFile);
      
      const promptMap = {
        General: "Enhance this image by improving sharpness, color balance, and dynamic range. Reduce noise and reconstruct fine details without changing the composition. Use standard numerals 0123456789.",
        Portrait: "Enhance this portrait. Soften skin naturally, sharpen eye details, improve lighting on the subject, and ensure natural skin tones. Use standard numerals 0123456789.",
        Landscape: "Enhance this landscape. Improve sky clarity, sharpen textures in trees or rocks, enhance saturation naturally, and increase depth. Use standard numerals 0123456789."
      };

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            {
              inlineData: {
                data: base64Data,
                mimeType: originalFile.type,
              },
            },
            {
              text: promptMap[enhancementType],
            },
          ],
        },
      });

      let enhancedBase64 = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          enhancedBase64 = part.inlineData.data;
          break;
        }
      }

      if (!enhancedBase64) throw new Error("Synthesis Null");

      setEnhancedUrl(`data:image/png;base64,${enhancedBase64}`);
      
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Failure: The neural engine could not process the enhancement. This may be due to complex textures or temporary node desync 0123456789.");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!enhancedUrl) return;
    const link = document.createElement('a');
    link.href = enhancedUrl;
    link.download = `Enhanced_${enhancementType}_${Date.now()}.png`;
    link.click();
  };

  const handleClear = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setEnhancedUrl(null);
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Neural Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Wand2 size={28} className={processing ? 'animate-pulse' : ''} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Detail Reconstruction Core 0123456789</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {(['General', 'Portrait', 'Landscape'] as const).map((type) => (
              <button
                key={type}
                onClick={() => setEnhancementType(type)}
                className={`px-5 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${enhancementType === type ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Input Side */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Original Manuscript</label>
              {originalPreview && (
                <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              )}
            </div>
            <div 
              onClick={() => !originalPreview && fileInputRef.current?.click()}
              className={`relative h-[400px] bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center transition-all overflow-hidden ${originalPreview ? 'border-[#D4AF37]/20 cursor-default' : 'border-white/5 hover:border-[#D4AF37]/40 cursor-pointer'}`}
            >
              {originalPreview ? (
                <img src={originalPreview} className="w-full h-full object-contain" alt="Original" />
              ) : (
                <>
                  <Upload size={48} className="text-gray-700 mb-4" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-500">Inject Vision Source 0123456789</span>
                </>
              )}
              <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
            </div>
          </div>

          {/* Result Side */}
          <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Enhanced Registry</label>
              {enhancedUrl && (
                <button onClick={handleDownload} className="text-emerald-400 hover:text-white transition-colors flex items-center gap-2">
                  <Download size={14}/> <span className="text-[9px] font-black uppercase">Export PNG</span>
                </button>
              )}
            </div>
            <div className="relative h-[400px] bg-black border border-white/5 rounded-[3.5rem] flex items-center justify-center overflow-hidden shadow-inner group">
              <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
              
              {processing ? (
                <div className="flex flex-col items-center gap-4 z-10">
                  <Loader2 className="animate-spin text-[#D4AF37]" size={48} />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37] animate-pulse">Synthesizing Details 0123456789...</p>
                </div>
              ) : enhancedUrl ? (
                <img src={enhancedUrl} className="w-full h-full object-contain animate-in fade-in zoom-in duration-700" alt="Enhanced" />
              ) : (
                <div className="text-center opacity-10 space-y-6">
                  <Sparkles size={80} className="mx-auto" />
                  <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Neural Pass 0123456789</p>
                </div>
              )}
            </div>
          </div>
        </div>

        <button
          onClick={enhanceImage}
          disabled={processing || !originalFile}
          className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
        >
          {processing ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
          Execute Archival Enhancement 0123456789
        </button>

        {error && (
          <div className="mt-6 flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl animate-in slide-in-from-top-2">
            <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
            <p className="text-xs text-rose-400/80 font-bold uppercase tracking-widest leading-relaxed italic">{error}</p>
          </div>
        )}
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

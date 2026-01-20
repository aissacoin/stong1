
import React, { useState, useRef } from 'react';
import { Eraser, Upload, Download, Trash2, ShieldCheck, Zap, Image as ImageIcon, Loader2, Check, AlertCircle, Maximize, Info, Focus, Target, HelpCircle, BookOpen, Layout, Sparkles } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

const PRESET_COLORS = [
  { name: 'Transparent', hex: 'transparent' },
  { name: 'Pure White', hex: '#FFFFFF' },
  { name: 'Studio Grey', hex: '#374151' }
];

export const AIBackgroundRemover: React.FC = () => {
  const { t } = useLanguage();
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [isolatedSubjectUrl, setIsolatedSubjectUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [previewBgColor, setPreviewBgColor] = useState('transparent');
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const toolData = t.tools['bg-remover'] || {
    name: 'AI BG Remover',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 20 * 1024 * 1024) {
        setError("Archival Limit: 20MB max for pixel-perfect masking.");
        return;
      }
      if (originalPreview) URL.revokeObjectURL(originalPreview);
      const url = URL.createObjectURL(file);
      setOriginalFile(file);
      setOriginalPreview(url);
      setIsolatedSubjectUrl(null);
      setError(null);
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

  const applyBinaryAlphaMask = (originalUrl: string, aiMaskBase64: string): Promise<string> => {
    return new Promise((resolve) => {
      const originalImg = new Image();
      const maskImg = new Image();
      
      originalImg.onload = () => {
        maskImg.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d', { willReadFrequently: true });
          if (!ctx) return resolve(originalUrl);

          canvas.width = originalImg.width;
          canvas.height = originalImg.height;

          const maskCanvas = document.createElement('canvas');
          const maskCtx = maskCanvas.getContext('2d');
          maskCanvas.width = canvas.width;
          maskCanvas.height = canvas.height;
          maskCtx?.drawImage(maskImg, 0, 0, canvas.width, canvas.height);
          const maskData = maskCtx?.getImageData(0, 0, canvas.width, canvas.height).data;

          ctx.drawImage(originalImg, 0, 0);
          const finalImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = finalImageData.data;

          if (maskData) {
            for (let i = 0; i < data.length; i += 4) {
              const mr = maskData[i];
              const mg = maskData[i + 1];
              const mb = maskData[i + 2];
              const luminance = (mr + mg + mb) / 3;
              if (luminance < 128) {
                data[i + 3] = 0;
              }
            }
          }

          ctx.putImageData(finalImageData, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        maskImg.src = `data:image/png;base64,${aiMaskBase64}`;
      };
      originalImg.src = originalUrl;
    });
  };

  const removeBackground = async () => {
    if (!originalFile || !originalPreview || processing) return;

    setProcessing(true);
    setError(null);
    setStatus('Analyzing Object Geometry 0123456789...');
    
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const base64Data = await fileToBase64(originalFile);
      
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash-image',
        contents: {
          parts: [
            { inlineData: { data: base64Data, mimeType: originalFile.type } },
            { text: "Act as a binary mask generator Identify the single primary subject Produce a high-contrast binary mask where the subject is pure white #FFFFFF and the entire background is pure black #000000 Do not include the original subject details Return only this black and white stencil Use numerals 0123456789" },
          ],
        },
      });

      setStatus('Mapping Original Pixels 0123456789...');

      let aiMaskBase64 = '';
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          aiMaskBase64 = part.inlineData.data;
          break;
        }
      }

      if (!aiMaskBase64) throw new Error("Mask Synthesis Null");

      const finalResult = await applyBinaryAlphaMask(originalPreview, aiMaskBase64);
      setIsolatedSubjectUrl(finalResult);
      setStatus('Quality Verified 0123456789');
      
    } catch (err: any) {
      setError("STENCIL FAILURE: The engine could not define a clear subject mask Try an image with higher contrast 0123456789");
    } finally {
      setProcessing(false);
    }
  };

  const handleDownload = () => {
    if (!isolatedSubjectUrl) return;
    const link = document.createElement('a');
    link.href = isolatedSubjectUrl;
    link.download = `Sovereign_Subject_${Date.now()}.png`;
    link.click();
  };

  const handleClear = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setIsolatedSubjectUrl(null);
    setError(null);
    setStatus('');
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Subject Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Focus size={28} className={processing ? 'animate-pulse' : ''} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Pixel-Perfect Stencil Extraction 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Source Integrity Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Ingest Master Image</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-64 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${originalPreview ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
              >
                {originalPreview ? (
                   <div className="relative w-full h-full">
                      <img src={originalPreview} className="w-full h-full object-contain opacity-60" alt="Source" />
                      <div className="absolute inset-0 flex items-center justify-center">
                         <span className="bg-black/80 px-4 py-2 rounded-full text-[8px] font-black text-[#D4AF37] uppercase tracking-widest border border-[#D4AF37]/20 tabular-nums">Replace Master 0123456789</span>
                      </div>
                   </div>
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Vision Scroll</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <button
              onClick={removeBackground}
              disabled={processing || !originalFile}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {processing ? (
                <>
                  <Loader2 className="animate-spin" size={24} />
                  {status}
                </>
              ) : (
                <>
                  <Zap size={24} />
                  Extract Subject Pixels
                </>
              )}
            </button>

            {isolatedSubjectUrl && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic px-2">Backdrop Verification 0123456789</label>
                <div className="grid grid-cols-3 gap-2">
                  {PRESET_COLORS.map((col) => (
                    <button
                      key={col.hex}
                      onClick={() => setPreviewBgColor(col.hex)}
                      className={`h-12 rounded-xl border transition-all flex items-center justify-center ${previewBgColor === col.hex ? 'border-[#D4AF37] scale-105 shadow-lg' : 'border-white/10 opacity-40 hover:opacity-100'}`}
                      style={{ background: col.hex === 'transparent' ? 'repeating-conic-gradient(#333 0% 25%, #111 0% 50%) 50% / 8px 8px' : col.hex }}
                    >
                      {previewBgColor === col.hex && <Check size={14} className={col.hex === '#FFFFFF' ? 'text-black' : 'text-white'} />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Subject Output Viewport (100% Quality)</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div 
              className="relative flex-grow border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[450px] overflow-hidden transition-colors duration-500 shadow-inner"
              style={{ backgroundColor: previewBgColor === 'transparent' ? '#050505' : previewBgColor }}
            >
               {previewBgColor === 'transparent' && (
                  <div className="absolute inset-0 opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#333 0% 25%, #000 0% 50%)', backgroundSize: '20px 20px' }}></div>
               )}
               
               {isolatedSubjectUrl ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <img 
                      src={isolatedSubjectUrl} 
                      className="max-w-full max-h-full rounded-2xl shadow-2xl"
                      alt="True Source Result" 
                    />
                    <div className="absolute top-0 right-0 p-4">
                      <div className="px-4 py-2 bg-emerald-500 text-black rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2 tabular-nums">
                        <Check size={12} /> Stencil Logic 0123456789
                      </div>
                    </div>
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <ImageIcon size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Archival Recognition 0123456789</p>
                 </div>
               )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!isolatedSubjectUrl}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(5,150,105,0.3)] disabled:opacity-20"
            >
              <Download size={24}/>
              Export Sovereign PNG 0123456789
            </button>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Subject Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

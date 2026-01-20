
import React, { useState, useRef } from 'react';
import { PackageSearch, Upload, Copy, Check, Sparkles, Loader2, Trash2, Globe, ShieldCheck, Info, Target, ShoppingBag, Eye, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const AIProductDescription: React.FC = () => {
  const { t, language: currentLang } = useLanguage();
  const langT = t.tools['product-scribe'];
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (file.size > 4 * 1024 * 1024) {
        setError(currentLang === 'ar' ? 'حجم الملف كبير جداً (4 ميجا كحد أقصى)' : "Archival Limit Exceeded: Please use an image under 4MB.");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
      setOutput('');
    }
  };

  const generateDescription = async () => {
    if (!imageFile || loading) return;

    setLoading(true);
    setError(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    try {
      const base64Data = await fileToBase64(imageFile);
      const imagePart = { inlineData: { data: base64Data, mimeType: imageFile.type } };

      const systemInstruction = currentLang === 'ar'
        ? "قم بتحليل صورة هذا المنتج واكتب وصفًا احترافيًا محسنًا لمحركات البحث (SEO) يتضمن: اسم المنتج، والميزات الرئيسية، والجمهور المستهدف، ودعوة للعمل (Call to Action). استخدم لغة تسويقية راقية ومؤثرة."
        : "Analyze this product image and write a professional SEO-optimized description. Include Product Name, Key Features, and Call to Action.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: { parts: [imagePart, { text: systemInstruction }] },
      });

      setOutput(response.text || "Cognitive node returned null.");
    } catch (err: any) {
      setError(currentLang === 'ar' ? "فشل الاتصال بمحرك التحليل" : "Logical Synthesis Failure.");
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

  const handleClear = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setOutput('');
    setError(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-10">
      <div className="bg-[#0a0a0a] border border-[var(--accent)]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[var(--accent)]/50 to-transparent"></div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[var(--accent)]/10 rounded-2xl border border-[var(--accent)]/20 text-[var(--accent)]">
              <PackageSearch size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[var(--accent)]/40 uppercase tracking-[0.4em]">{langT.desc}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-5 space-y-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">{langT.upload}</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-72 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${previewUrl ? 'border-[var(--accent)]/40' : 'border-white/5 hover:border-[var(--accent)]/40'}`}
              >
                {previewUrl ? (
                   <img src={previewUrl} className="w-full h-full object-contain animate-in fade-in" alt="Product" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-[var(--accent)] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">{t.common.upload}</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>
            <button
              onClick={generateDescription}
              disabled={loading || !imageFile}
              className="w-full bg-[var(--accent)] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-xl disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
              {langT.btn}
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[var(--accent)] italic">{langT.outputLabel}</label>
              <div className="flex gap-4">
                 <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                 <button onClick={handleCopy} disabled={!output} className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-[var(--accent)] hover:text-white'}`}>
                  {copied ? <Check size={14}/> : <Copy size={14}/>}
                  <span className="text-[9px] font-black uppercase tracking-widest">{copied ? t.common.copied : t.common.copy}</span>
                </button>
              </div>
            </div>
            <div className={`relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 flex flex-col min-h-[450px] overflow-hidden group shadow-inner ${currentLang === 'ar' ? 'text-right' : 'text-left'}`} dir={currentLang === 'ar' ? 'rtl' : 'ltr'}>
               <div className="relative z-10 w-full flex-grow overflow-y-auto custom-scrollbar text-gray-300 text-lg leading-relaxed italic">
                 {loading ? (
                    <div className="h-full flex flex-col items-center justify-center space-y-4 opacity-50 animate-pulse">
                        <Zap size={64} className="text-[var(--accent)] mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">{langT.loading}</p>
                    </div>
                 ) : output ? (
                   output.split('\n').map((line, i) => <p key={i} className="mb-4">{line}</p>)
                 ) : (
                   <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                     <PackageSearch size={100} className="mx-auto" />
                     <p className="text-[10px] font-black uppercase tracking-[0.5em]">{currentLang === 'ar' ? 'في انتظار الصورة...' : 'Awaiting Input'}</p>
                   </div>
                 )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

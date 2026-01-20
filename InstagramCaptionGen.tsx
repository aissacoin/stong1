
import React, { useState, useRef } from 'react';
import { 
  Instagram, Sparkles, Loader2, Copy, Check, Trash2, 
  Image as ImageIcon, ShieldCheck, Zap, MessageCircle, 
  Hash, Globe, Heart, Send, Palette, Info, Target, HelpCircle, BookOpen, Layout
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type Tone = 'Witty' | 'Professional' | 'Minimalist' | 'Inspiring' | 'Funny';

export const InstagramCaptionGen: React.FC = () => {
  const { t } = useLanguage();
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [tone, setTone] = useState<Tone>('Witty');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [extraContext, setExtraContext] = useState('');
  const [output, setOutput] = useState<{ caption: string; hashtags: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const langT = t.tools['insta-caption'] || {
    name: 'Instagram Caption Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

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
      if (file.size > 5 * 1024 * 1024) {
        setError("Archival Limit maximum for vision analysis");
        return;
      }
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError(null);
    }
  };

  const generateCaption = async () => {
    if (loading) return;
    setLoading(true);
    setError(null);

    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      let parts: any[] = [];
      
      if (imageFile) {
        const base64Data = await fileToBase64(imageFile);
        parts.push({
          inlineData: {
            data: base64Data,
            mimeType: imageFile.type,
          },
        });
      }

      const prompt = `Generate a viral Instagram caption for this ${imageFile ? 'image' : 'post topic'}.
      Tone: ${tone}
      Language: ${language}
      Context: ${extraContext || 'General life business'}
      
      Requirements:
      1. Write one primary engaging caption.
      2. Include strategic hashtags.
      3. Return ONLY a JSON object with keys "caption" and "hashtags".
      4. DO NOT use any numbers in the text output.`;

      parts.push({ text: prompt });

      const response = await ai.models.generateContent({
        model: imageFile ? 'gemini-2.5-flash-image' : 'gemini-3-flash-preview',
        contents: { parts },
        config: {
          responseMimeType: "application/json"
        }
      });

      const result = JSON.parse(response.text || "{}");
      setOutput(result);
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Error the creative engine is temporarily desynchronized");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(`${output.caption}\n\n${output.hashtags}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleClear = () => {
    setImageFile(null);
    setPreviewUrl(null);
    setOutput(null);
    setExtraContext('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Creative Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-gradient-to-tr from-purple-600 to-pink-500 rounded-2xl border border-white/10 text-white shadow-xl">
              <Instagram size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Creative Engagement Node</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['English', 'Arabic'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setLanguage(lang)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${language === lang ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    {lang}
                  </button>
                ))}
             </div>
             <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
                <ShieldCheck size={14} className="text-emerald-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Creative Safe Node</span>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Workspace Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2 flex items-center gap-2">
                <ImageIcon size={12}/> Visual Ingestion
              </label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-52 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${previewUrl ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
              >
                {previewUrl ? (
                   <img src={previewUrl} className="w-full h-full object-cover opacity-60" alt="Source" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Imagery</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Social Persona</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Witty', 'Professional', 'Minimalist', 'Inspiring', 'Funny'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${tone === t ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Additional Context Manuscript</label>
              <textarea
                value={extraContext}
                onChange={(e) => setExtraContext(e.target.value)}
                className="w-full h-24 bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="What is happening in this post"
              />
            </div>

            <button
              onClick={generateCaption}
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Sparkles size={24} />}
              Forge Social Copy
            </button>
          </div>

          {/* Registry Side (Preview) */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Handshake Registry Preview</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 flex flex-col min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Zap size={64} className="text-[#D4AF37]" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Synthesizing Narrative Logic</p>
                 </div>
               ) : output ? (
                 <div className={`relative z-10 space-y-8 animate-in fade-in zoom-in duration-500 ${language === 'Arabic' ? 'text-right' : 'text-left'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                    <div className="space-y-4">
                       <div className="flex items-center gap-2 text-pink-500">
                          <MessageCircle size={16}/>
                          <span className="text-[10px] font-black uppercase tracking-widest">The Caption</span>
                       </div>
                       <p className="text-xl font-bold text-white leading-relaxed italic">"{output.caption}"</p>
                    </div>

                    <div className="space-y-4">
                       <div className="flex items-center gap-2 text-purple-500">
                          <Hash size={16}/>
                          <span className="text-[10px] font-black uppercase tracking-widest">Algorithmic Anchors</span>
                       </div>
                       <p className="text-sm font-black text-white/60 tracking-wider font-mono">{output.hashtags}</p>
                    </div>

                    <div className="pt-8 flex gap-4">
                       <button 
                        onClick={handleCopy}
                        className={`flex-grow py-4 rounded-2xl flex items-center justify-center gap-3 font-black uppercase text-xs tracking-widest transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 border border-white/10 text-white hover:bg-white/10'}`}
                       >
                         {copied ? <Check size={18} /> : <Copy size={18} />}
                         {copied ? 'Captured' : 'Copy Full Copy'}
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Instagram size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Creative Inputs</p>
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
      </div>

      {/* DOCUMENTATION GRID */}
      <div className="mt-16 pt-12 border-t border-[#e7d8c5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Info size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.about}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Narrative Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

const Upload = ({ size, className }: { size: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
    </svg>
);

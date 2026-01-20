
import React, { useState, useRef, useEffect } from 'react';
import { Twitter, Download, Share2, ShieldCheck, Zap, Image as ImageIcon, Check, Palette, User, MessageCircle, Heart, Repeat2, Sparkles, Loader2, Wand2, Monitor, Layout, Info, Target, HelpCircle, BookOpen } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type Theme = 'Dark' | 'Light' | 'Glass' | 'Aureate' | 'Gradient';

export const TweetToImageConverter: React.FC = () => {
  const { t } = useLanguage();
  const [text, setText] = useState('Build tools that solve real problems. Precision is the ultimate aesthetic. #StrongTools');
  const [author, setAuthor] = useState('Alexander Sterling');
  const [handle, setHandle] = useState('sterling_scribe');
  const [isVerified, setIsVerified] = useState(true);
  const [theme, setTheme] = useState<Theme>('Dark');
  const [showStats, setShowStats] = useState(true);
  const [loading, setLoading] = useState(false);
  const [exporting, setExporting] = useState(false);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const langT = t.tools['tweet-to-image'] || {
    name: 'Tweet to Image',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const enhanceText = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Rewrite this tweet to be more viral and aesthetic, keep it under 280 chars: "${text}"`,
      });
      setText(response.text || text);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    setExporting(true);
    setTimeout(() => {
      if (!containerRef.current) return;
      import('https://esm.sh/html2canvas@1.4.1').then((html2canvas) => {
        html2canvas.default(containerRef.current!, {
          backgroundColor: null,
          scale: 3,
          logging: false,
          useCORS: true
        }).then(canvas => {
          const link = document.createElement('a');
          link.download = `StrongTools_Tweet_${Date.now()}.png`;
          link.href = canvas.toDataURL('image/png');
          link.click();
          setExporting(false);
        });
      });
    }, 100);
  };

  const getThemeClasses = () => {
    switch (theme) {
      case 'Light': return 'bg-white text-black border-gray-100 shadow-xl';
      case 'Glass': return 'bg-white/10 backdrop-blur-xl text-white border-white/20 shadow-2xl';
      case 'Aureate': return 'bg-[#0a0a0a] text-[#D4AF37] border-[#D4AF37]/30 shadow-[0_0_50px_rgba(212,175,55,0.1)]';
      case 'Gradient': return 'bg-gradient-to-br from-indigo-600 to-purple-600 text-white border-white/10 shadow-2xl';
      default: return 'bg-[#161616] text-white border-white/5 shadow-2xl';
    }
  };

  const getWrapperBg = () => {
    switch (theme) {
        case 'Light': return 'bg-gray-50';
        case 'Aureate': return 'bg-black';
        case 'Gradient': return 'bg-white';
        case 'Glass': return 'bg-gradient-to-tr from-[#0f172a] to-[#334155]';
        default: return 'bg-[#050505]';
    }
  }

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Creative Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Twitter size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Visual Narrative Synthesis Node</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {(['Dark', 'Light', 'Glass', 'Aureate', 'Gradient'] as Theme[]).map((t) => (
              <button
                key={t}
                onClick={() => setTheme(t)}
                className={`px-4 py-2 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${theme === t ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Manuscript Identity</label>
              <div className="grid grid-cols-2 gap-3">
                <input 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all"
                  placeholder="Author Name"
                />
                <input 
                  value={handle} 
                  onChange={(e) => setHandle(e.target.value)}
                  className="bg-black border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all"
                  placeholder="Handle"
                />
              </div>
              <button 
                onClick={() => setIsVerified(!isVerified)}
                className={`w-full py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all flex items-center justify-center gap-2 ${isVerified ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-600'}`}
              >
                <ShieldCheck size={14} /> Verified Protocol {isVerified ? 'Active' : 'Offline'}
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Content Body</label>
                <button 
                    onClick={enhanceText}
                    disabled={loading}
                    className="text-[#D4AF37] hover:text-white transition-colors flex items-center gap-1"
                >
                    {loading ? <Loader2 size={12} className="animate-spin" /> : <Wand2 size={12} />}
                    <span className="text-[9px] font-black uppercase tracking-widest">AI Enhance</span>
                </button>
              </div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-32 bg-black border border-white/5 rounded-2xl p-5 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner italic"
                placeholder="Type your viral quote..."
              />
            </div>

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <div className="flex items-center gap-3">
                 <Layout size={16} className="text-[#D4AF37]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Show Engagement Metrics</span>
               </div>
               <button 
                onClick={() => setShowStats(!showStats)}
                className={`w-12 h-6 rounded-full transition-all relative ${showStats ? 'bg-emerald-500' : 'bg-gray-800'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${showStats ? 'left-7' : 'left-1'}`}></div>
               </button>
            </div>

            <button
              onClick={handleDownload}
              disabled={exporting}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)]"
            >
              {exporting ? <Loader2 className="animate-spin" size={24} /> : <Download size={24} />}
              Export Visual Asset
            </button>
          </div>

          {/* Preview Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Sovereign Viewport</label>
              <div className="flex items-center gap-2 opacity-30">
                <Monitor size={14}/> <span className="text-[8px] font-black uppercase tracking-widest">1080x1080 Simulation</span>
              </div>
            </div>
            
            <div className={`relative flex-grow rounded-[3.5rem] p-12 flex items-center justify-center min-h-[500px] overflow-hidden group shadow-inner transition-colors duration-700 ${getWrapperBg()}`}>
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '30px 30px' }}></div>
               
               <div 
                ref={containerRef}
                className={`relative z-10 w-full max-w-md p-8 rounded-[2rem] border transition-all duration-500 ${getThemeClasses()}`}
               >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-xl ${theme === 'Light' ? 'bg-black text-white' : 'bg-[#D4AF37] text-black shadow-lg'}`}>
                            {author.charAt(0)}
                        </div>
                        <div className="flex flex-col">
                            <div className="flex items-center gap-1">
                                <span className="font-black text-sm tracking-tight">{author}</span>
                                {isVerified && <ShieldCheck size={14} className={theme === 'Light' ? 'text-blue-500' : 'text-[#D4AF37]'} fill="currentColor" />}
                            </div>
                            <span className="text-[10px] opacity-40 font-bold">@{handle}</span>
                        </div>
                    </div>
                    <Twitter size={20} className="opacity-20" />
                  </div>

                  <div className="mb-8">
                     <p className={`text-lg font-medium leading-relaxed italic ${theme === 'Aureate' ? 'font-serif text-white' : ''}`}>
                        {text}
                     </p>
                  </div>

                  {showStats && (
                    <div className="flex items-center justify-between pt-6 border-t border-current/10 opacity-30">
                        <div className="flex items-center gap-1.5">
                            <MessageCircle size={14} />
                            <span className="text-[10px] font-black">1.2K</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Repeat2 size={14} />
                            <span className="text-[10px] font-black">4.8K</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Heart size={14} />
                            <span className="text-[10px] font-black">12.5K</span>
                        </div>
                        <Share2 size={14} />
                    </div>
                  )}

                  <div className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-20 transition-opacity">
                     <span className="text-[8px] font-black uppercase tracking-[1em] whitespace-nowrap">StrongTools Archive Registry</span>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-white/5 border border-white/5 rounded-3xl flex items-start gap-4">
               <Info size={20} className="text-[#D4AF37] shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
                 Note: Export utilizes the "Aureate Scaler" node, rendering at 3x resolution for sub-pixel clarity on Retina displays.
               </p>
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

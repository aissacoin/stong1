
import React, { useState } from 'react';
import { 
  Twitter, Sparkles, Loader2, Copy, Check, Trash2, 
  MessageSquare, Zap, Share2, Globe, Send, 
  List, Layout, AlertCircle, Info, Hash, RefreshCw
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

type Aura = 'Educational' | 'Controversial' | 'Witty' | 'Professional' | 'Minimalist';

export const TweetThreadGen: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [aura, setAura] = useState<Aura>('Educational');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [isThread, setIsThread] = useState(true);
  const [output, setOutput] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateTweets = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const prompt = `Act as a top-tier X (Twitter) ghostwriter. Create a ${isThread ? 'thread of 5-7 tweets' : 'single viral tweet'} about: "${topic}".
      Language: ${language}
      Aura/Tone: ${aura}
      
      Requirements:
      1. First tweet must be a high-engagement "Hook".
      2. If a thread, use 🧵 emoji and numbering (1/, 2/...).
      3. Use active, punchy sentences. Avoid corporate fluff.
      4. Include relevant emojis.
      5. Return ONLY the content, each tweet separated by "---ITEM---".`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.9,
          topP: 0.95
        }
      });

      const text = response.text || "";
      const tweets = text.split('---ITEM---').map(t => t.trim()).filter(t => t.length > 0);
      setOutput(tweets);
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Error: The creative node is temporarily offline.");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleClear = () => {
    setTopic('');
    setOutput([]);
    setError(null);
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white text-black rounded-2xl border border-white/10 shadow-xl">
              <Twitter size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">X Narrative Forge</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Viral Thread Synthesis Node</p>
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
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Workspace Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Topic or Raw Ingestion</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-32 bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="What is the narrative core? (e.g., 5 ways AI is changing the world)..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Narrative Type</label>
              <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button 
                  onClick={() => setIsThread(true)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${isThread ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Thread Scribe
                </button>
                <button 
                  onClick={() => setIsThread(false)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${!isThread ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                >
                  Single Tweet
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Tone Aura</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Educational', 'Controversial', 'Witty', 'Professional', 'Minimalist'] as Aura[]).map((a) => (
                  <button
                    key={a}
                    onClick={() => setAura(a)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${aura === a ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateTweets}
              disabled={loading || !topic.trim()}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Forge Viral Narrative
            </button>
          </div>

          {/* X Preview Registry Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Handshake Registry Preview</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 space-y-6 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Twitter size={64} className="text-white opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Synthesizing Archival Thread...</p>
                 </div>
               ) : output.length > 0 ? (
                 <div className="space-y-4 animate-in fade-in duration-700">
                    {output.map((tweet, i) => (
                      <div key={i} className="relative group bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:border-[#D4AF37]/30 transition-all">
                        <div className="flex gap-4">
                           <div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10 shrink-0 flex items-center justify-center font-black text-xs">S</div>
                           <div className="flex-grow space-y-2">
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-black text-white">StrongTools Scribe</span>
                                <span className="text-[10px] text-gray-500">@StrongTools • Now</span>
                              </div>
                              <p className={`text-sm text-gray-200 leading-relaxed whitespace-pre-wrap ${language === 'Arabic' ? 'text-right' : 'text-left'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                                {tweet}
                              </p>
                           </div>
                        </div>
                        <button 
                          onClick={() => handleCopy(tweet, i)}
                          className="absolute top-4 right-4 p-2 bg-white/5 rounded-lg opacity-0 group-hover:opacity-100 transition-all hover:bg-[#D4AF37] hover:text-black"
                        >
                          {copiedIndex === i ? <Check size={14}/> : <Copy size={14}/>}
                        </button>
                      </div>
                    ))}
                    <div className="flex justify-center pt-6">
                       <button 
                        onClick={() => {
                          const fullText = output.join('\n\n---\n\n');
                          navigator.clipboard.writeText(fullText);
                        }}
                        className="px-8 py-3 bg-white/5 border border-white/10 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white hover:bg-white/10 transition-all flex items-center gap-3"
                       >
                         <Share2 size={14} /> Copy Full Thread Manuscript
                       </button>
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Twitter size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Narrative Input</p>
                 </div>
               )}
            </div>

            {error && (
              <div className="flex items-start gap-4 p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl">
                <AlertCircle className="text-rose-500 shrink-0 mt-0.5" size={20} />
                <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Hash size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">High-Engagement Semantic Analysis Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <RefreshCw size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Algorithmic Growth Modeling Checked</p>
           </div>
        </div>
      </div>
    </div>
  );
};

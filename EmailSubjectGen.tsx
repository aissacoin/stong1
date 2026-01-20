
import React, { useState } from 'react';
import { 
  Mail, Sparkles, Loader2, Copy, Check, Trash2, 
  Zap, Eye, Target, MessageSquare, Info, ShieldCheck, 
  MousePointer2, List, ArrowRight
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

type SubjectTone = 'Urgent' | 'Curious' | 'Professional' | 'Friendly' | 'Scarcity';

interface SubjectLine {
  text: string;
  reason: string;
}

export const EmailSubjectGen: React.FC = () => {
  const [emailContent, setEmailContent] = useState('');
  const [tone, setTone] = useState<SubjectTone>('Professional');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [useEmoji, setUseEmoji] = useState(true);
  const [results, setResults] = useState<SubjectLine[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateSubjects = async () => {
    if (!emailContent.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const prompt = `Generate 5 viral-ready email subject lines for this content: "${emailContent}".
      Tone: ${tone}
      Language: ${language}
      Emojis: ${useEmoji ? 'Enabled' : 'Disabled'}
      
      Requirements:
      1. Lines should be optimized for high Open Rate.
      2. Keep them concise (under 60 chars).
      3. Return ONLY a JSON array of objects with keys "text" and "reason" (short marketing explanation).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                text: { type: Type.STRING },
                reason: { type: Type.STRING }
              },
              required: ["text", "reason"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      setResults(data);
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
    setEmailContent('');
    setResults([]);
    setError(null);
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-white text-black rounded-2xl border border-white/10 shadow-xl">
              <Mail size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Email Subject Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">CTR Optimization Node</p>
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
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Email Content Manuscript</label>
              <textarea
                value={emailContent}
                onChange={(e) => setEmailContent(e.target.value)}
                className="w-full h-48 bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="Paste the body of your email here for context analysis..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Psychological Trigger</label>
              <div className="grid grid-cols-3 gap-2">
                {(['Urgent', 'Curious', 'Professional', 'Friendly', 'Scarcity'] as SubjectTone[]).map((t) => (
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

            <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
               <div className="flex items-center gap-3">
                 <Sparkles size={16} className="text-[#D4AF37]" />
                 <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Inject Emoji Logic</span>
               </div>
               <button 
                onClick={() => setUseEmoji(!useEmoji)}
                className={`w-12 h-6 rounded-full transition-all relative ${useEmoji ? 'bg-emerald-500' : 'bg-gray-800'}`}
               >
                 <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${useEmoji ? 'left-7' : 'left-1'}`}></div>
               </button>
            </div>

            <button
              onClick={generateSubjects}
              disabled={loading || !emailContent.trim()}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Architect Subject Lines
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Inbox Simulation Registry</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 space-y-4 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Mail size={64} className="text-white opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center">Simulating Open-Rate Entropy...</p>
                 </div>
               ) : results.length > 0 ? (
                 <div className="space-y-3 animate-in fade-in duration-700">
                    {results.map((item, i) => (
                      <div key={i} className="group relative bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:border-[#D4AF37]/40 transition-all">
                        <div className="flex justify-between items-start gap-4">
                           <div className="space-y-1">
                              <p className={`text-base font-bold text-white italic ${language === 'Arabic' ? 'text-right font-serif' : 'text-left font-sans'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                                {item.text}
                              </p>
                              <div className={`flex items-center gap-2 text-gray-500 ${language === 'Arabic' ? 'flex-row-reverse' : ''}`}>
                                <Target size={10} className="text-[#D4AF37]/60" />
                                <span className="text-[9px] font-black uppercase tracking-widest">{item.reason}</span>
                              </div>
                           </div>
                           <button 
                            onClick={() => handleCopy(item.text, i)}
                            className="p-2 bg-white/5 rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all shrink-0"
                           >
                             {copiedIndex === i ? <Check size={14}/> : <Copy size={14}/>}
                           </button>
                        </div>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Mail size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Content Input</p>
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

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Eye size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Attention Analysis Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Verified Conversion Psychology Logic</p>
           </div>
        </div>
      </div>
    </div>
  );
};

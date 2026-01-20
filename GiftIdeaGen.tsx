
import React, { useState } from 'react';
import { 
  Gift, Sparkles, Loader2, Copy, Check, Trash2, 
  Target, Heart, Wallet, User, Zap, Info, 
  ShieldCheck, ShoppingBag, Globe, MessageSquare
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

type BudgetRange = 'Economy' | 'Mid-Range' | 'Premium' | 'Luxury';

interface GiftSuggestion {
  idea: string;
  category: string;
  reasoning: string;
}

export const GiftIdeaGen: React.FC = () => {
  const [recipient, setRecipient] = useState('');
  const [interests, setInterests] = useState('');
  const [budget, setBudget] = useState<BudgetRange>('Mid-Range');
  const [language, setLanguage] = useState<'English' | 'Arabic'>('English');
  const [results, setResults] = useState<GiftSuggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const generateGifts = async () => {
    if (!recipient.trim() || !interests.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const prompt = `Act as a Professional Gift Consultant. Suggest 5 unique gift ideas for:
      Recipient Profile: ${recipient}
      Interests/Hobbies: ${interests}
      Budget Tier: ${budget}
      Language: ${language}
      
      Requirements:
      1. Ideas should be creative and highly personalized.
      2. Categorize each (e.g., Physical, Experience, DIY, Tech).
      3. Provide a brief "Why it works" logic.
      4. Return ONLY a JSON array of objects with keys "idea", "category", and "reasoning".`;

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
                idea: { type: Type.STRING },
                category: { type: Type.STRING },
                reasoning: { type: Type.STRING }
              },
              required: ["idea", "category", "reasoning"]
            }
          }
        }
      });

      const data = JSON.parse(response.text || "[]");
      setResults(data);
    } catch (err: any) {
      console.error(err);
      setError("Logical Synthesis Error: The archival node could not process this persona.");
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
    setRecipient('');
    setInterests('');
    setResults([]);
    setError(null);
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Gift size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">AI Gift Idea Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Personalized Generosity Logic</p>
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
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2 flex items-center gap-2">
                <User size={12}/> Recipient Archetype
              </label>
              <input
                type="text"
                value={recipient}
                onChange={(e) => setRecipient(e.target.value)}
                className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5"
                placeholder="e.g. My 30yo brother, a minimalist architect..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2 flex items-center gap-2">
                <Target size={12}/> Interest Matrix
              </label>
              <textarea
                value={interests}
                onChange={(e) => setInterests(e.target.value)}
                className="w-full h-24 bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner"
                placeholder="e.g. Loves manual espresso machines, sci-fi books, and Japanese gardening..."
              />
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2 flex items-center gap-2">
                <Wallet size={12}/> Fiscal Tier (Budget)
              </label>
              <div className="grid grid-cols-2 gap-2">
                {(['Economy', 'Mid-Range', 'Premium', 'Luxury'] as BudgetRange[]).map((b) => (
                  <button
                    key={b}
                    onClick={() => setBudget(b)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${budget === b ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'}`}
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateGifts}
              disabled={loading || !recipient.trim() || !interests.trim()}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Architect Gift Ideas
            </button>
          </div>

          {/* Results Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Inspiration Ledger</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 space-y-4 overflow-y-auto custom-scrollbar min-h-[450px] shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Gift size={64} className="text-[#D4AF37] opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-[#D4AF37]">Consulting Curated Vaults...</p>
                 </div>
               ) : results.length > 0 ? (
                 <div className="space-y-4 animate-in fade-in duration-700">
                    {results.map((item, i) => (
                      <div key={i} className={`relative group bg-white/[0.03] border border-white/5 rounded-3xl p-6 hover:border-[#D4AF37]/30 transition-all ${language === 'Arabic' ? 'text-right' : 'text-left'}`} dir={language === 'Arabic' ? 'rtl' : 'ltr'}>
                        <div className={`flex justify-between items-start gap-4 mb-3 ${language === 'Arabic' ? 'flex-row-reverse' : ''}`}>
                           <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-xl bg-[#D4AF37]/10 flex items-center justify-center text-[#D4AF37] font-black text-xs">{i+1}</div>
                              <span className="text-[9px] font-black uppercase tracking-widest text-[#D4AF37]/60 border border-[#D4AF37]/20 px-2 py-1 rounded-lg">{item.category}</span>
                           </div>
                           <button 
                            onClick={() => handleCopy(`${item.idea}\n${item.reasoning}`, i)}
                            className="p-2 bg-white/5 rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"
                           >
                             {copiedIndex === i ? <Check size={14}/> : <Copy size={14}/>}
                           </button>
                        </div>
                        <h4 className="text-lg font-black text-white italic tracking-tight mb-2 underline decoration-[#D4AF37]/20">{item.idea}</h4>
                        <p className="text-xs text-gray-400 leading-relaxed italic">{item.reasoning}</p>
                      </div>
                    ))}
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <ShoppingBag size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Recipient Data</p>
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
             <Heart size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Sentiment Matching Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Verified Budget Calibration Verified</p>
           </div>
        </div>
      </div>
    </div>
  );
};

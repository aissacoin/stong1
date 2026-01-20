
import React, { useState } from 'react';
import { 
  BookOpen, Sparkles, Loader2, Copy, Check, Trash2, 
  Clock, GraduationCap, Microscope, ListChecks, 
  ShieldCheck, Zap, Info, FileText, Send, Target, HelpCircle, Layout
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

type Level = 'Primary' | 'Secondary' | 'University' | 'Professional';
type Tone = 'Interactive' | 'Lecturing' | 'Practical' | 'Inquiry-Based';

export const LessonPlanGen: React.FC = () => {
  const { t, language } = useLanguage();
  const [topic, setTopic] = useState('');
  const [level, setLevel] = useState<Level>('Secondary');
  const [duration, setDuration] = useState('45');
  const [tone, setTone] = useState<Tone>('Interactive');
  const [langPref, setLangPref] = useState<'English' | 'Arabic'>('English');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toolData = t.tools['lesson-plan'] || {
    name: 'Lesson Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const generatePlan = async () => {
    if (!topic.trim() || loading) return;

    setLoading(true);
    setError(null);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const prompt = `Act as a senior pedagogical expert. Create a comprehensive lesson plan for the topic: "${topic}".
      Target Level: ${level}
      Class Duration: ${duration} minutes
      Teaching Style: ${tone}
      Language: ${langPref}
      
      The plan must include:
      1. Learning Objectives (Bloom's Taxonomy).
      2. Required Materials.
      3. Introduction & Hook (Timed).
      4. Main Activity/Direct Instruction (Timed).
      5. Independent Practice/Group Work.
      6. Assessment & Closure.
      
      Use a professional, clear format with bold headers. Use standard numerals 0123456789.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
        config: {
          temperature: 0.7,
          topP: 0.9
        }
      });

      setOutput(response.text || "");
    } catch (err: any) {
      console.error(err);
      setError("Pedagogical Node Failure: The archival engine is currently updating its curriculum.");
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

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Pedagogical Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <BookOpen size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Pedagogical Framework Forge 0123456789</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
            {(['English', 'Arabic'] as const).map((l) => (
              <button
                key={l}
                onClick={() => setLangPref(l)}
                className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${langPref === l ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {l}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Subject Matter Node</label>
              <textarea
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                className="w-full h-24 bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all placeholder-white/5 resize-none shadow-inner italic"
                placeholder="e.g. Advanced Calculus or Basic Culinary Skills 0123456789..."
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Academic Level</label>
                <select 
                  value={level}
                  onChange={(e) => setLevel(e.target.value as Level)}
                  className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-xs font-bold outline-none focus:border-[#D4AF37]/40"
                >
                  <option value="Primary">Primary</option>
                  <option value="Secondary">Secondary</option>
                  <option value="University">University</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              <div className="space-y-4">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Duration (Mins)</label>
                <input 
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-xs font-bold outline-none focus:border-[#D4AF37]/40 tabular-nums"
                />
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Instructional Aura</label>
              <div className="grid grid-cols-2 gap-2">
                {(['Interactive', 'Lecturing', 'Practical', 'Inquiry-Based'] as Tone[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTone(t)}
                    className={`py-3 rounded-xl border text-[9px] font-black uppercase tracking-widest transition-all ${tone === t ? 'bg-[#D4AF37] text-black border-[#D4AF37]' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generatePlan}
              disabled={loading || !topic.trim()}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
              Architect Lesson Plan
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Synthesized Manuscript</label>
              <div className="flex gap-4">
                <button onClick={() => setOutput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
                <button 
                  onClick={handleCopy}
                  disabled={!output}
                  className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-[#D4AF37]'}`}
                >
                  {copied ? <Check size={14}/> : <Copy size={14}/>}
                  <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
                </button>
              </div>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[500px]">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <GraduationCap size={64} className="text-[#D4AF37] opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-[#D4AF37]">Synthesizing Pedagogical Framework 0123456789...</p>
                 </div>
               ) : output ? (
                 <div className={`relative z-10 h-full flex flex-col ${langPref === 'Arabic' ? 'text-right font-serif' : 'text-left font-sans'}`} dir={langPref === 'Arabic' ? 'rtl' : 'ltr'}>
                    <div className="flex-grow overflow-y-auto custom-scrollbar whitespace-pre-wrap text-gray-300 text-sm leading-relaxed italic">
                       {output}
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <FileText size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Subject Ingestion 0123456789</p>
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

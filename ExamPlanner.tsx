
import React, { useState } from 'react';
import { Calendar, Clock, Sparkles, Loader2, Trash2, Check, Zap, Info, Target, HelpCircle, BookOpen, Layout } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const ExamPlanner: React.FC = () => {
  const { t } = useLanguage();
  const [exams, setExams] = useState('');
  const [days, setDays] = useState('7');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const toolData = t.tools['exam-planner'] || {
    name: 'Exam Meridian',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  // Force standard numerals 0123456789
  const formatNum = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const generatePlan = async () => {
    if (!exams.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const prompt = `Architect a highly efficient study schedule for these exams: "${exams}". I have ${days} days left. 
      Focus on: High-intensity intervals (Pomodoro), prioritized difficulty, and mandatory revision nodes. 
      Format: Day-by-Day schedule with clear time slots. Return in professional English. Use standard numerals 0123456789.`;
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });
      setOutput(response.text || '');
    } catch (e) { 
      console.error(e); 
      setOutput('Archival Failure: The logic node could not synchronize with the curriculum engine 0123456789');
    }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Scholastic Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/20 text-amber-500">
              <Calendar size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Temporal preparation Forge 0123456789</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
             <div className="px-5 py-2 text-[9px] font-black uppercase text-[#D4AF37] tracking-widest tabular-nums italic">Registry Active 0123456789</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Subjects & Difficulty Matrix</label>
              <textarea 
                value={exams} onChange={e => setExams(e.target.value)}
                className="w-full h-40 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-amber-500/40 transition-all shadow-inner custom-scrollbar italic"
                placeholder="e.g. Calculus (Hard), Physics (Medium), History (Easy) 0123456789..."
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Temporal Limit (Days)</label>
              <input 
                type="number" value={days} onChange={e => setDays(formatNum(e.target.value))}
                className="w-full bg-black border border-white/5 rounded-2xl p-5 text-white font-black text-3xl outline-none focus:border-amber-500/40 tabular-nums shadow-inner italic"
              />
              <button onClick={generatePlan} disabled={loading || !exams.trim()} className="w-full bg-amber-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(217,119,6,0.3)] disabled:opacity-20">
                {loading ? <Loader2 className="animate-spin" size={24}/> : <Sparkles size={24}/>}
                Synthesize Schedule
              </button>
            </div>
          </div>

          <div className="flex flex-col h-full space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-amber-400 italic">Curriculum Archive</label>
              {output && (
                <button onClick={() => setOutput('')} className="text-zinc-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              )}
            </div>
            <div className="relative flex-grow bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[400px]">
               {loading ? (
                 <div className="h-full flex flex-col items-center justify-center space-y-6 animate-pulse">
                    <Clock size={64} className="text-amber-500 opacity-20" />
                    <p className="text-[10px] font-black uppercase tracking-[0.5em] text-amber-500">mapping Temporal Nodes 0123456789...</p>
                 </div>
               ) : output ? (
                 <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                    <div className="prose prose-invert prose-sm text-gray-300 italic whitespace-pre-wrap leading-relaxed font-serif text-lg">
                      {output}
                    </div>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <BookOpen size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Subject Ingestion 0123456789</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

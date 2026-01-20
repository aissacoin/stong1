import React, { useState } from 'react';
import { BrainCircuit, Search, Loader2, ShieldCheck, AlertTriangle, Zap, Info, FileText } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { useLanguage } from '../LanguageContext';

export const AIGCDetector: React.FC = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['aigc-detector'] || { internal: { btn: 'Run Audit', result: 'Probability' } };
  
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [report, setReport] = useState<{ probability: number; rationale: string } | null>(null);

  const detectAI = async () => {
    if (!text.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Analyze the following manuscript for signs of AI generation (AIGC). Provide an estimated probability percentage (0-100) and a brief technical rationale. Manuscript: "${text}". Return ONLY JSON: {"probability": number, "rationale": "string"}.`,
      });
      const data = JSON.parse(response.text?.replace(/```json|```/gi, '') || "{}");
      setReport(data);
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="space-y-12" dir={t.dir}>
      <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-500"><BrainCircuit size={28} /></div>
          <div className={isAr ? 'text-right' : 'text-left'}>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{isAr ? 'تحليل احتمالية التدخل الآلي' : 'Neural Origin Analysis'}</p>
          </div>
        </div>

        <div className="space-y-6">
          <textarea 
            value={text} 
            onChange={e => setText(e.target.value)} 
            className={`w-full h-64 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-orange-500/40 transition-all shadow-inner ${isAr ? 'text-right' : 'text-left'}`} 
            placeholder={isAr ? "الصق النص المراد فحصه هنا..." : "Paste manuscript here..."} 
          />
          <button onClick={detectAI} disabled={loading || !text} className="w-full bg-orange-600 text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter flex items-center justify-center gap-4 hover:scale-[1.01] transition-all">
            {loading ? <Loader2 className="animate-spin" size={24}/> : <Zap size={24}/>}
            {langT.internal.btn}
          </button>

          {report && (
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 animate-in zoom-in">
              <div className="md:col-span-4 bg-black border-2 border-white/5 rounded-[3rem] p-10 text-center">
                 <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest mb-4 block">{langT.internal.result}</span>
                 <div className={`text-7xl font-black italic tracking-tighter tabular-nums ${report.probability > 70 ? 'text-rose-500' : 'text-emerald-500'}`}>{report.probability}%</div>
              </div>
              <div className="md:col-span-8 bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 flex flex-col justify-center">
                 <p className={`text-lg text-gray-300 leading-relaxed italic ${isAr ? 'text-right' : 'text-left'}`}>"{report.rationale}"</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
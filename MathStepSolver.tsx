
import React, { useState } from 'react';
import { Calculator, ListChecks, Sparkles, Loader2, Check, Zap } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

export const MathStepSolver: React.FC = () => {
  const [problem, setProblem] = useState('');
  const [solution, setSolution] = useState('');
  const [loading, setLoading] = useState(false);

  const solve = async () => {
    if (!problem.trim() || loading) return;
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `Solve this math problem step-by-step: "${problem}". 
        Ensure each logical step is clearly numbered. Use professional mathematical language.`,
      });
      setSolution(response.text || '');
    } catch (e) { console.error(e); }
    finally { setLoading(false); }
  };

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-emerald-500/10 rounded-2xl text-emerald-400"><Calculator size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Step-by-Step Logic Solver</h2>
      </div>

      <div className="space-y-6">
        <div className="relative">
          <input 
            value={problem} onChange={e => setProblem(e.target.value)}
            className="w-full bg-black border border-white/5 rounded-2xl p-6 text-white text-xl font-bold outline-none focus:border-emerald-500/40"
            placeholder="e.g. Solve for x: 3x^2 + 5x - 2 = 0"
          />
          <button onClick={solve} disabled={loading} className="absolute right-3 top-1/2 -translate-y-1/2 p-4 bg-emerald-600 text-white rounded-xl hover:scale-105 transition-all">
            {loading ? <Loader2 className="animate-spin" size={20} /> : <Zap size={20} />}
          </button>
        </div>

        {solution && (
          <div className="p-10 bg-white/[0.02] rounded-[3rem] border border-emerald-500/20 animate-in slide-in-from-bottom-4">
             <div className="flex items-center gap-3 mb-6 text-emerald-400 opacity-60">
                <ListChecks size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">Logical Sequence Extraction</span>
             </div>
             <div className="prose prose-invert max-w-none text-gray-300 italic whitespace-pre-wrap leading-loose font-serif text-lg">
                {solution}
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

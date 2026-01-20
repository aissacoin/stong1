
import React, { useEffect, useState, useMemo } from 'react';
import { ArrowLeft, Clock, ShieldCheck, Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { getDetailedArticle } from '../services/geminiService';

interface BlogDetailProps {
  id: string;
}

export const BlogDetail: React.FC<BlogDetailProps> = ({ id }) => {
  const [article, setArticle] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;
    
    // جلب البيانات بشكل مباشر وسريع
    const load = async () => {
      try {
        const data = await getDetailedArticle(id);
        if (active) {
          if (data) setArticle(data);
          else setError(true);
          setLoading(false);
        }
      } catch (err) {
        if (active) {
          setError(true);
          setLoading(false);
        }
      }
    };

    load();
    return () => { active = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <Loader2 className="animate-spin text-[#D4AF37]" size={40} />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white p-10">
        <AlertCircle className="text-rose-500 mb-4" size={48} />
        <h2 className="text-2xl font-black uppercase italic">Manuscript Missing</h2>
        <button onClick={() => window.location.hash = '#/blog'} className="mt-6 text-[#D4AF37] underline font-black uppercase text-xs">Return to Chronicles</button>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pb-32 pt-24 animate-in fade-in duration-500">
      <div className="max-w-3xl mx-auto px-6">
        <button onClick={() => window.location.hash = '#/blog'} className="flex items-center gap-2 text-[#D4AF37] font-black text-[10px] uppercase tracking-widest mb-12 hover:opacity-70">
          <ArrowLeft size={14} /> Back to Repository
        </button>

        <header className="mb-16 space-y-6">
          <div className="inline-block px-4 py-1 bg-[#D4AF37]/10 border border-[#D4AF37]/30 rounded-full text-[#D4AF37] text-[8px] font-black uppercase tracking-widest">
            <Sparkles size={10} className="inline mr-2" /> Verified Archive
          </div>
          <h1 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter leading-none">
            {article.title}
          </h1>
        </header>

        <article className="prose prose-invert max-w-none">
          <div className="text-gray-400 text-lg leading-relaxed italic space-y-6" 
               dangerouslySetInnerHTML={{ __html: article.content }} />
        </article>

        <div className="mt-20 pt-10 border-t border-white/5 flex justify-between items-center opacity-30 text-[8px] font-black uppercase tracking-widest">
           <div className="flex items-center gap-2"><Clock size={12}/> Verified Cycle MMXXV</div>
           <div className="flex items-center gap-2"><ShieldCheck size={12}/> Sovereign Data</div>
        </div>
      </div>
    </div>
  );
};

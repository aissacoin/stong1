
import React, { useState, useEffect, useCallback } from 'react';
import { TOOLS } from '../constants';
// Fix: Correct import for renderToolLogic from Home.tsx
import { renderToolLogic } from './Home';
import { getArchivedContent, getCycleMetadata } from '../services/geminiService';
import { 
  ArrowLeft, 
  Loader2, 
  History, 
  ShieldCheck,
  AlertTriangle,
  Activity,
  ScrollText
} from 'lucide-react';

interface ToolDetailProps {
  id: string;
}

export const ToolDetail: React.FC<ToolDetailProps> = ({ id }) => {
  const tool = TOOLS.find(t => t.id === id);
  const { cycleString } = getCycleMetadata();
  
  const [archiveData, setArchiveData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchArchive = useCallback(async () => {
    if (!tool) {
      setError("Instrument not found in archives.");
      setIsLoading(false);
      return;
    }
    
    setIsLoading(true);
    setError(null);

    try {
      const data = await getArchivedContent(tool.id);
      setArchiveData(data);
    } catch (err) {
      setError("Synchronization failed.");
    } finally {
      setIsLoading(false);
    }
  }, [id, tool]);

  useEffect(() => {
    fetchArchive();
  }, [fetchArchive]);

  if (!tool) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#050505] text-white p-6 text-center">
        <AlertTriangle size={80} className="text-rose-500 mb-6 opacity-40" />
        <h2 className="text-4xl font-black uppercase italic text-white mb-4">Invalid Archive ID</h2>
        <a href="#/" className="text-[#D4AF37] underline font-black uppercase tracking-widest text-xs">Return Home</a>
      </div>
    );
  }

  return (
    <div className="bg-[#050505] min-h-screen text-white pt-24 pb-32">
      <div className="max-w-7xl mx-auto px-4">
        
        <div className="mb-12 flex items-center justify-between border-b border-white/5 pb-6">
          <a href="#/" className="flex items-center gap-3 text-[#D4AF37] font-black text-xs uppercase tracking-widest group">
            <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
          </a>
          <div className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/20 text-[#D4AF37] text-[9px] font-black uppercase tracking-widest">
            <History size={12} /> Registry Cycle: {cycleString}
          </div>
        </div>

        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none">
            {tool.name}
          </h1>
          <p className="text-lg text-gray-500 italic max-w-2xl mx-auto">"{tool.description}"</p>
        </header>

        <section className="mb-24">
          <div className="bg-[#0d0d0d] p-6 md:p-12 rounded-[3.5rem] border border-white/5 relative shadow-2xl">
            {renderToolLogic(tool.id)}
          </div>
        </section>

        <div className="max-w-4xl mx-auto space-y-16">
          <div className="flex items-center gap-6">
            <ScrollText className="text-[#D4AF37]" size={32} />
            <h2 className="text-2xl font-black uppercase tracking-widest italic">User <span className="text-[#D4AF37]">Guide</span></h2>
            <div className="flex-grow h-px bg-gradient-to-r from-[#D4AF37]/30 to-transparent"></div>
          </div>

          {isLoading ? (
            <div className="py-20 text-center space-y-4">
              <Loader2 className="animate-spin mx-auto text-[#D4AF37]" size={48} />
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-600 animate-pulse">Syncing Technical Data...</p>
            </div>
          ) : archiveData ? (
            <article className="p-10 md:p-16 rounded-[3rem] border border-white/5 bg-white/[0.01]">
               <h3 className="text-3xl font-black text-[#D4AF37] mb-8 italic">{archiveData.title}</h3>
               <div 
                className="prose-archive text-gray-400 text-lg leading-relaxed italic space-y-6"
                dangerouslySetInnerHTML={{ __html: archiveData.content }}
               />
               <div className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between opacity-40">
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <ShieldCheck size={14}/> Accuracy Verified
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest">
                    <Activity size={14}/> Sovereign Registry
                  </div>
               </div>
            </article>
          ) : null}
        </div>
      </div>
    </div>
  );
};

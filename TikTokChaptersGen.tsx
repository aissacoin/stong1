
import React, { useState } from 'react';
import { Clock, Plus, Trash2, Copy, Check, ShieldCheck, Zap } from 'lucide-react';

export const TikTokChaptersGen: React.FC = () => {
  const [chapters, setChapters] = useState<{ time: string; title: string }[]>([
    { time: '00:00', title: 'Introduction' }
  ]);
  const [copied, setCopied] = useState(false);

  const addChapter = () => setChapters([...chapters, { time: '', title: '' }]);
  const removeChapter = (i: number) => setChapters(chapters.filter((_, idx) => idx !== i));
  const update = (i: number, f: 'time' | 'title', v: string) => {
    const next = [...chapters];
    next[i][f] = v;
    setChapters(next);
  };

  const getOutput = () => chapters.map(c => `${c.time} ${c.title}`).join('\n');

  return (
    <div className="bg-[#0a0a0a] border border-[#ff0050]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#ff0050] to-[#00f2ea]"></div>
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-[#ff0050]/10 rounded-2xl text-[#ff0050]"><Clock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">TikTok Chapters Synth</h2>
      </div>
      <div className="space-y-4 mb-8">
        {chapters.map((c, i) => (
          <div key={i} className="flex gap-4 items-center animate-in slide-in-from-left-2" style={{ animationDelay: `${i * 50}ms` }}>
            <input value={c.time} onChange={e => update(i, 'time', e.target.value)} placeholder="00:05" className="w-24 bg-black border border-white/5 rounded-xl p-3 text-white font-mono text-center" />
            <input value={c.title} onChange={e => update(i, 'title', e.target.value)} placeholder="Viral Moment Name" className="flex-grow bg-black border border-white/5 rounded-xl p-3 text-white italic" />
            <button onClick={() => removeChapter(i)} className="text-rose-500 p-2 hover:bg-rose-500/10 rounded-lg"><Trash2 size={16}/></button>
          </div>
        ))}
        <button onClick={addChapter} className="w-full py-3 border-2 border-dashed border-white/5 rounded-xl text-gray-500 hover:text-[#00f2ea] hover:border-[#00f2ea]/30 transition-all flex items-center justify-center gap-2 text-xs font-black uppercase">
          <Plus size={14}/> Append Temporal Node
        </button>
      </div>
      <div className="p-6 bg-black rounded-3xl border border-white/5 relative">
        <pre className="text-xs text-emerald-400 font-mono">{getOutput() || "Awaiting nodes..."}</pre>
        <button onClick={() => { navigator.clipboard.writeText(getOutput()); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-[#00f2ea]">
          {copied ? <Check size={18}/> : <Copy size={18}/>}
        </button>
      </div>
    </div>
  );
};

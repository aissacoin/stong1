
import React, { useState, useRef } from 'react';
import { FileJson, Upload, Copy, Check, Trash2, Image as ImageIcon, Zap, ShieldCheck, Download, Loader2 } from 'lucide-react';

export const Base64VisualTransmuter: React.FC = () => {
  const [base64, setBase64] = useState('');
  const [preview, setPreview] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const reader = new FileReader();
      reader.onload = (event) => {
        const result = event.target?.result as string;
        setBase64(result);
        setPreview(result);
        setLoading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleTextChange = (val: string) => {
    setBase64(val);
    if (val.startsWith('data:image')) {
      setPreview(val);
    } else {
      setPreview(null);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(base64);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-zinc-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-zinc-500/50 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-zinc-500/10 rounded-2xl border border-zinc-500/20 text-zinc-400"><FileJson size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Base64 Visual Transmuter</h2>
        </div>
        <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
           <ShieldCheck size={14} className="text-emerald-400" />
           <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Binary Integrity Verified</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="h-64 bg-black border-2 border-dashed border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500/40 transition-all group overflow-hidden"
          >
            {loading ? <Loader2 className="animate-spin text-zinc-500" size={40}/> : preview ? (
              <img src={preview} className="h-full w-full object-contain p-4" alt="Preview" />
            ) : (
              <>
                <Upload size={32} className="text-gray-700 group-hover:text-zinc-500 transition-colors mb-2" />
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Inject Visual Manuscript</span>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>

          <div className="p-6 bg-zinc-500/5 border border-dashed border-zinc-500/20 rounded-[2rem] space-y-4">
             <div className="flex items-center gap-3 text-zinc-400">
                <Zap size={16}/>
                <span className="text-[10px] font-black uppercase tracking-widest">Transmutation Logic</span>
             </div>
             <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
               "Converting images to Base64 allows for the archival of visual assets directly within HTML or CSS manuscripts, bypassing HTTP request latency."
             </p>
          </div>
        </div>

        <div className="lg:col-span-7 flex flex-col h-full space-y-4">
          <div className="flex justify-between items-center px-2">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 italic">Binary Data Stream</label>
            <div className="flex gap-2">
              <button onClick={() => {setBase64(''); setPreview(null);}} className="p-2 text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
              <button onClick={handleCopy} className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-zinc-500 hover:text-white'}`}>
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <textarea
            value={base64}
            onChange={(e) => handleTextChange(e.target.value)}
            className="flex-grow bg-black border border-white/5 rounded-[2.5rem] p-8 text-zinc-400 font-mono text-[10px] leading-relaxed outline-none focus:border-zinc-500/40 transition-all resize-none shadow-inner custom-scrollbar"
            placeholder="Base64 bitstream will manifest here..."
          />
        </div>
      </div>
    </div>
  );
};

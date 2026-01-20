
import React, { useState, useEffect } from 'react';
import { 
  Unlock, Copy, Check, ShieldCheck, Zap, Info, 
  Terminal, Code2, ShieldAlert, Trash2, Layout, 
  Target, HelpCircle, BookOpen, Sparkles, Database,
  Cpu, Key
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const JWTDebugger: React.FC = () => {
  const { t } = useLanguage();
  const [token, setToken] = useState('');
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [error, setError] = useState('');
  const [copied, setCopied] = useState<string | null>(null);

  const langT = t.tools['jwt-debugger'] || {
    name: 'JWT Manuscript Debug',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  useEffect(() => {
    if (!token) { setHeader(''); setPayload(''); setError(''); return; }
    try {
      const parts = token.split('.');
      if (parts.length !== 3) throw new Error("Invalid Format");
      
      const decodeB64 = (str: string) => {
        const base64 = str.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.stringify(JSON.parse(atob(base64)), null, 2);
      };

      setHeader(decodeB64(parts[0]));
      setPayload(decodeB64(parts[1]));
      setError('');
    } catch (e) {
      setError('Invalid Cryptographic Manuscript detected in buffer');
    }
  }, [token]);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Security Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-rose-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-rose-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-rose-500/10 rounded-2xl border border-rose-500/20 text-rose-500">
              <Unlock size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-rose-500/40 uppercase tracking-[0.4em]">Cryptographic Claim Analysis Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Binary Security Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Encoded JWS Manuscript</label>
              <button onClick={() => setToken('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea 
              value={token} 
              onChange={e => setToken(e.target.value)} 
              className="w-full h-[500px] bg-black border border-white/5 rounded-[2rem] p-8 text-rose-400 font-mono text-xs outline-none focus:border-rose-500/40 transition-all shadow-inner resize-none custom-scrollbar"
              placeholder="Paste encoded token here for decryption..."
            />
          </div>

          <div className="space-y-6 flex flex-col h-full">
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 italic">Registry Header</label>
                <button 
                  onClick={() => handleCopy(header, 'h')}
                  className={`text-gray-600 hover:text-white transition-all ${copied === 'h' ? 'text-emerald-400' : ''}`}
                >
                  {copied === 'h' ? <Check size={14}/> : <Copy size={14}/>}
                </button>
              </div>
              <div className="h-40 bg-white/[0.02] border border-white/5 rounded-[2rem] p-6 overflow-auto custom-scrollbar shadow-inner relative">
                 <pre className="text-gray-400 font-mono text-[10px] leading-relaxed">{header || "Awaiting algorithm data..."}</pre>
                 <Cpu className="absolute bottom-4 right-4 text-white opacity-[0.02]" size={40} />
              </div>
            </div>

            <div className="flex-[2] space-y-3">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-rose-500 italic">Decoded Claims Payload</label>
                <button 
                  onClick={() => handleCopy(payload, 'p')}
                  className={`text-gray-600 hover:text-white transition-all ${copied === 'p' ? 'text-emerald-400' : ''}`}
                >
                  {copied === 'p' ? <Check size={14}/> : <Copy size={14}/>}
                </button>
              </div>
              <div className="h-64 bg-white/[0.02] border border-white/5 rounded-[2rem] p-8 overflow-auto custom-scrollbar shadow-inner relative">
                 <pre className="text-gray-300 font-mono text-[10px] leading-relaxed">{payload || "Awaiting archival claims..."}</pre>
                 <Database className="absolute bottom-4 right-4 text-white opacity-[0.02]" size={60} />
              </div>
            </div>

            {error && (
              <div className="p-4 bg-rose-500/5 border border-rose-500/20 rounded-xl flex items-center gap-3 animate-pulse">
                <ShieldAlert size={14} className="text-rose-500" />
                <span className="text-[9px] font-black uppercase text-rose-400 tracking-widest italic">{error}</span>
              </div>
            )}
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Key size={20} className="text-rose-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Cryptographic Standard Handshake Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Code2 size={20} className="text-rose-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Base Sixty Four Partitioning Verified</p>
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
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

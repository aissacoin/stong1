
import React, { useState, useEffect } from 'react';
import { QrCode, Download, Check, Info, ShieldCheck, Zap, Target, HelpCircle, BookOpen, Layout, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const QRGenerator: React.FC = () => {
  const { t } = useLanguage();
  const langT = t.tools['qr-gen'] || {
    name: 'Archival QR Architect',
    internal: { label: 'Data Ingestion', placeholder: 'Enter URL or raw manuscript', btnDownload: 'Export QR Manuscript' },
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };
  
  const [text, setText] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (text.trim()) {
      const encoded = encodeURIComponent(text);
      // Using a standard high-fidelity QR endpoint with institutional colors
      setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encoded}&color=0a0a0a&bgcolor=fdfaf3&margin=2`);
    } else {
      setQrUrl('');
    }
  }, [text]);

  const handleDownload = () => {
    if (!qrUrl) return;
    const link = document.createElement('a');
    link.href = qrUrl;
    link.download = `Sovereign_Matrix_0123456789.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Matrix Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <QrCode size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">High-Fidelity Matrix Synthesis 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Matrix Logic Verified 0123456789</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">{langT.internal.label}</label>
              <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full h-56 bg-black border border-white/5 rounded-[2.5rem] p-8 text-white text-sm outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner custom-scrollbar italic"
                placeholder={langT.internal.placeholder}
              />
            </div>
            <button
              onClick={handleDownload}
              disabled={!qrUrl}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              <Download size={24}/> {langT.internal.btnDownload}
            </button>
          </div>

          <div className="flex flex-col items-center justify-center bg-black/60 border border-white/5 rounded-[3.5rem] p-10 min-h-[400px] shadow-inner relative overflow-hidden group">
             <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
             
             {qrUrl ? (
               <div className="relative z-10 space-y-6 text-center animate-in zoom-in duration-700">
                 <div className="p-6 bg-[#fdfaf3] rounded-[2rem] shadow-2xl border border-white/10 group-hover:scale-[1.02] transition-transform">
                    <img src={qrUrl} className="w-64 h-64 rounded-sm" alt="QR Matrix" />
                 </div>
                 <div className="flex items-center justify-center gap-2 text-emerald-400">
                    <Check size={16} />
                    <span className="text-[10px] font-black uppercase tracking-widest italic">Synthesis Complete 0123456789</span>
                 </div>
               </div>
             ) : (
               <div className="text-center opacity-10 space-y-6">
                 <QrCode size={100} className="mx-auto text-white" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Digital Ingestion 0123456789</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Matrix Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

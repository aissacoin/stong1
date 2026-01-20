
import React, { useState, useEffect } from 'react';
import { Fingerprint, ShieldCheck, Zap, Info, Globe, Monitor, Settings } from 'lucide-react';

export const FingerprintChecker: React.FC = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    setData({
      ua: navigator.userAgent,
      platform: navigator.platform,
      language: navigator.language,
      cookies: navigator.cookieEnabled ? 'Enabled' : 'Disabled',
      screen: `${window.screen.width}x${window.screen.height}`,
      depth: window.screen.colorDepth,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      cores: navigator.hardwareConcurrency || 'Hidden'
    });
  }, []);

  if (!data) return null;

  return (
    <div className="bg-[#0a0a0a] border border-amber-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-amber-500/10 rounded-2xl text-amber-400"><Fingerprint size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Fingerprint Analyzer</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(data).map(([key, val]) => (
          <div key={key} className="bg-white/[0.02] border border-white/5 p-5 rounded-2xl flex justify-between items-center group hover:border-amber-500/30 transition-all">
             <div className="space-y-1">
                <p className="text-[8px] font-black uppercase text-gray-600 tracking-widest">{key}</p>
                <p className="text-xs text-white font-bold italic truncate max-w-[200px]">{val as string}</p>
             </div>
             <Zap size={14} className="text-amber-500/20 group-hover:text-amber-500 transition-colors" />
          </div>
        ))}
      </div>
      <div className="mt-8 p-6 bg-amber-500/5 border border-dashed border-amber-500/20 rounded-[2rem]">
         <p className="text-[10px] text-gray-500 leading-relaxed italic text-center uppercase tracking-widest">
           "This digital signature is used by centralized trackers to identify you across domains without cookies. Use a sovereign browser to minimize this trace."
         </p>
      </div>
    </div>
  );
};

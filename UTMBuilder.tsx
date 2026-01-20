
import React, { useState } from 'react';
import { Link as LinkIcon, Copy, Check, Trash2, Globe, Target, Zap, ShieldCheck, Info } from 'lucide-react';

export const UTMBuilder: React.FC = () => {
  const [url, setUrl] = useState('');
  const [source, setSource] = useState('');
  const [medium, setMedium] = useState('');
  const [campaign, setCampaign] = useState('');
  const [copied, setCopied] = useState(false);

  const generateUTM = () => {
    if (!url) return '';
    try {
      const baseUrl = new URL(url.startsWith('http') ? url : `https://${url}`);
      if (source) baseUrl.searchParams.set('utm_source', source);
      if (medium) baseUrl.searchParams.set('utm_medium', medium);
      if (campaign) baseUrl.searchParams.set('utm_campaign', campaign);
      return baseUrl.toString();
    } catch {
      return 'Invalid URL Archive';
    }
  };

  const utmResult = generateUTM();

  const handleCopy = () => {
    navigator.clipboard.writeText(utmResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-500 selection:text-white">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Target size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">UTM Campaign Architect</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest italic">Base URL Node</label>
            <input value={url} onChange={e => setUrl(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500/40 shadow-inner" placeholder="https://example.com" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest italic">Campaign Source</label>
            <input value={source} onChange={e => setSource(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500/40" placeholder="google, newsletter, facebook" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest italic">Campaign Medium</label>
            <input value={medium} onChange={e => setMedium(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500/40" placeholder="cpc, banner, email" />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500 px-2 tracking-widest italic">Campaign Name</label>
            <input value={campaign} onChange={e => setCampaign(e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-4 text-white text-sm outline-none focus:border-blue-500/40" placeholder="spring_sale" />
          </div>
        </div>
      </div>

      <div className="relative group">
        <div className="absolute -inset-1 bg-blue-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
        <div className="relative bg-black border border-white/10 rounded-3xl p-8 space-y-4">
           <div className="flex justify-between items-center">
              <span className="text-[10px] font-black uppercase text-blue-500 italic tracking-[0.3em]">Tracked Coordinate</span>
              <button onClick={handleCopy} className={`p-2 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-500 hover:text-white'}`}>
                {copied ? <Check size={18}/> : <Copy size={18}/>}
              </button>
           </div>
           <div className="text-sm font-mono text-gray-300 break-all leading-relaxed bg-white/5 p-4 rounded-xl shadow-inner">
             {utmResult || 'Awaiting parameters...'}
           </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-4 p-4 bg-blue-500/5 rounded-2xl border border-blue-500/20 opacity-60">
        <Info size={16} className="text-blue-500 shrink-0" />
        <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
          UTM parameters allow accurate measurement of traffic sources in Google Analytics. This node formats coordinates for standard compliance.
        </p>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { 
  Container, Download, Copy, Check, Zap, 
  ShieldCheck, Info, Terminal, Settings2, Code2, 
  Monitor, Layout, Target, HelpCircle, BookOpen, Sparkles 
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const DockerNodeGen: React.FC = () => {
  const { t } = useLanguage();
  const [nodeVersion, setNodeVersion] = useState('latest');
  const [isAlpine, setIsAlpine] = useState(true);
  const [port, setPort] = useState('default');
  const [copied, setCopied] = useState(false);

  const langT = t.tools['docker-gen'] || {
    name: 'Docker Node Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const dockerfile = `# Production Node.js Environment
FROM node:${nodeVersion}${isAlpine ? '-alpine' : ''}

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package*.json ./
RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE ${port === 'default' ? 'three thousand' : port}
CMD [ "npm", "start" ]`;

  const handleCopy = () => {
    navigator.clipboard.writeText(dockerfile);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Dev Environment Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500">
              <Container size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Virtual Container Synthesis Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Registry Standard Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-6">
              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Foundation Version</label>
                <select 
                  value={nodeVersion} 
                  onChange={e => setNodeVersion(e.target.value)} 
                  className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-blue-500/40 transition-all appearance-none cursor-pointer"
                >
                  <option value="latest">Latest Stable</option>
                  <option value="current">Current Active</option>
                  <option value="legacy">Legacy LTS</option>
                </select>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Network Port Node</label>
                <input 
                  type="text" 
                  value={port} 
                  onChange={e => setPort(e.target.value)}
                  className="w-full bg-black border border-white/5 rounded-2xl p-4 text-white text-sm outline-none focus:border-blue-500/40 transition-all placeholder-white/5"
                  placeholder="e.g. default or custom"
                />
              </div>

              <button 
                onClick={() => setIsAlpine(!isAlpine)}
                className={`w-full py-4 rounded-2xl border flex items-center justify-between px-6 transition-all ${isAlpine ? 'bg-blue-600/10 border-blue-600 text-blue-500 shadow-lg' : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest">Alpine Linux Protocol</span>
                <div className={`w-2 h-2 rounded-full ${isAlpine ? 'bg-blue-500 shadow-[0_0_10px_#3b82f6]' : 'bg-white/10'}`}></div>
              </button>
            </div>

            <div className="p-8 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2.5rem] flex items-center gap-6">
                <Zap size={40} className="text-blue-500/40 shrink-0" />
                <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1 italic">Handshake Integrity</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed italic">Engine generates production ready manuscripts optimized for low latency hardware nodes</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Synthesized Manuscript Viewport</label>
              <button 
                onClick={handleCopy}
                className={`flex items-center gap-2 px-3 py-1 rounded-lg transition-all ${copied ? 'text-emerald-400' : 'text-gray-600 hover:text-white'}`}
              >
                {copied ? <Check size={14}/> : <Copy size={14}/>}
                <span className="text-[9px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy All'}</span>
              </button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[450px]">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               <div className="absolute top-0 right-0 p-10 opacity-[0.02] pointer-events-none rotate-12">
                  <Terminal size={300} />
               </div>
               
               <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                  <pre className="text-emerald-400 font-mono text-[11px] leading-relaxed">
                    {dockerfile}
                  </pre>
               </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Code2 size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Container Logic Protocol Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Monitor size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Server Environment Consistency Verified</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Infrastructure Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

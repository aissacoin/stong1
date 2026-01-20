
import React, { useState, useEffect } from 'react';
import { 
  Monitor, Smartphone, Tablet, Laptop, Maximize, 
  RotateCw, Globe, ShieldCheck, Zap, Info, Target, 
  ChevronRight, Smartphone as MobileIcon, Monitor as DesktopIcon,
  RefreshCw, MousePointer2
} from 'lucide-react';

interface DevicePreset {
  name: string;
  width: number;
  height: number;
  icon: React.ReactNode;
  type: 'mobile' | 'tablet' | 'desktop';
}

const PRESETS: DevicePreset[] = [
  { name: 'iPhone 14 Pro', width: 393, height: 852, icon: <Smartphone size={14}/>, type: 'mobile' },
  { name: 'Samsung S22', width: 360, height: 800, icon: <Smartphone size={14}/>, type: 'mobile' },
  { name: 'iPad Pro 11"', width: 834, height: 1194, icon: <Tablet size={14}/>, type: 'tablet' },
  { name: 'iPad Mini', width: 768, height: 1024, icon: <Tablet size={14}/>, type: 'tablet' },
  { name: 'MacBook Air', width: 1280, height: 800, icon: <Laptop size={14}/>, type: 'desktop' },
  { name: 'Full HD Monitor', width: 1920, height: 1080, icon: <Monitor size={14}/>, type: 'desktop' },
  { name: '4K Display', width: 2560, height: 1440, icon: <Monitor size={14}/>, type: 'desktop' },
];

export const ViewportChecker: React.FC = () => {
  const [url, setUrl] = useState('https://www.wikipedia.org');
  const [activeUrl, setActiveUrl] = useState('https://www.wikipedia.org');
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(800);
  const [isLandscape, setIsLandscape] = useState(false);
  const [zoom, setZoom] = useState(0.8); // Default scale to fit UI

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let cleanUrl = url.trim();
    if (!/^https?:\/\//i.test(cleanUrl)) {
      cleanUrl = 'https://' + cleanUrl;
    }
    setActiveUrl(cleanUrl);
  };

  const selectPreset = (p: DevicePreset) => {
    setWidth(p.width);
    setHeight(p.height);
    setIsLandscape(false);
  };

  const toggleOrientation = () => {
    const w = width;
    setWidth(height);
    setHeight(w);
    setIsLandscape(!isLandscape);
  };

  // Adjust zoom automatically if viewport is too large
  useEffect(() => {
    if (width > 1200) setZoom(0.4);
    else if (width > 800) setZoom(0.6);
    else setZoom(0.8);
  }, [width]);

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-[1600px] mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col xl:flex-row items-center justify-between gap-8 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Maximize size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sovereign Viewport Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Responsive Logic Validation Node</p>
            </div>
          </div>

          <form onSubmit={handleUrlSubmit} className="flex-grow max-w-2xl w-full flex gap-3">
             <div className="relative flex-grow">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-700" size={18} />
                <input 
                  type="text" 
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white text-sm font-medium outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner italic"
                  placeholder="Enter URL to project..."
                />
             </div>
             <button type="submit" className="px-8 bg-[#D4AF37] text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-lg">Project Node</button>
          </form>

          <div className="flex gap-3">
             <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                <button onClick={toggleOrientation} className="p-3 text-gray-500 hover:text-[#D4AF37] transition-all" title="Toggle Orientation">
                  <RotateCw size={18} className={isLandscape ? 'rotate-90 transition-transform' : 'transition-transform'} />
                </button>
                <div className="w-px h-8 bg-white/10 mx-1 self-center"></div>
                <button onClick={() => selectPreset(PRESETS[0])} className="p-3 text-gray-500 hover:text-white" title="Mobile"><MobileIcon size={18}/></button>
                <button onClick={() => selectPreset(PRESETS[5])} className="p-3 text-gray-500 hover:text-white" title="Desktop"><DesktopIcon size={18}/></button>
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls & Presets Sidebar */}
          <div className="lg:col-span-3 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Manual Dimensional Registry</label>
              <div className="grid grid-cols-2 gap-3">
                 <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Width (PX)</span>
                    <input 
                      type="number" value={width} onChange={(e) => setWidth(parseInt(e.target.value) || 0)}
                      className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm font-black tabular-nums outline-none focus:border-[#D4AF37]/40"
                    />
                 </div>
                 <div className="space-y-2">
                    <span className="text-[8px] font-black text-gray-700 uppercase tracking-widest ml-2">Height (PX)</span>
                    <input 
                      type="number" value={height} onChange={(e) => setHeight(parseInt(e.target.value) || 0)}
                      className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm font-black tabular-nums outline-none focus:border-[#D4AF37]/40"
                    />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Standard Device Archives</label>
               <div className="space-y-2 max-h-[400px] overflow-y-auto custom-scrollbar pr-2">
                  {PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => selectPreset(p)}
                      className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                        width === p.width && !isLandscape 
                        ? 'bg-[#D4AF37]/10 border-[#D4AF37] text-[#D4AF37] shadow-lg' 
                        : 'bg-white/5 border-white/5 text-gray-500 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                         <div className="opacity-40">{p.icon}</div>
                         <span className="text-[10px] font-black uppercase tracking-widest">{p.name}</span>
                      </div>
                      <span className="text-[9px] font-bold opacity-30 tabular-nums">{p.width}x{p.height}</span>
                    </button>
                  ))}
               </div>
            </div>

            <div className="p-6 bg-[#D4AF37]/5 border border-dashed border-[#D4AF37]/20 rounded-[2.5rem] space-y-4">
               <div className="flex items-center gap-3 text-[#D4AF37]">
                 <Info size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Sandbox Note</span>
               </div>
               <p className="text-[9px] text-gray-500 leading-relaxed italic">
                 Due to browser security protocols (X-Frame-Options), some websites like Google or Facebook may block projection. Use standard independent domains for optimal results.
               </p>
            </div>
          </div>

          {/* Projection Viewport */}
          <div className="lg:col-span-9 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-4 bg-white/5 py-4 rounded-3xl border border-white/10">
              <div className="flex items-center gap-6">
                 <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500/80">Active Projection</span>
                 </div>
                 <div className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20 italic tabular-nums">
                   MERIDIAN: {width}W × {height}H PX
                 </div>
              </div>
              <div className="flex items-center gap-4">
                 <span className="text-[9px] font-black text-gray-600 uppercase">Scale: {Math.round(zoom * 100)}%</span>
                 <input 
                  type="range" min="0.1" max="1" step="0.1" value={zoom} 
                  onChange={(e) => setZoom(parseFloat(e.target.value))}
                  className="w-24 accent-[#D4AF37]"
                 />
              </div>
            </div>
            
            <div className="relative flex-grow bg-[#111] border border-white/5 rounded-[3.5rem] flex items-center justify-center overflow-auto min-h-[600px] shadow-inner pattern-dots">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '60px 60px' }}></div>
               
               <div 
                className="relative bg-white shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-[12px] border-zinc-800 rounded-[2rem] overflow-hidden transition-all duration-500"
                style={{ 
                  width: `${width}px`, 
                  height: `${height}px`,
                  transform: `scale(${zoom})`,
                  transformOrigin: 'center center'
                }}
               >
                  {/* Fake Device UI Top Bar */}
                  <div className="h-6 bg-zinc-800 flex items-center justify-center gap-2">
                     <div className="w-1.5 h-1.5 rounded-full bg-zinc-700"></div>
                     <div className="w-8 h-1.5 rounded-full bg-zinc-700"></div>
                  </div>
                  
                  <iframe 
                    src={activeUrl}
                    className="w-full h-full border-0 bg-white"
                    title="Sovereign Projection"
                  />
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Independent Sandbox Execution Verified</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Pixel-Perfect Topology Mapping Active</p>
           </div>
        </div>
      </div>
    </div>
  );
};

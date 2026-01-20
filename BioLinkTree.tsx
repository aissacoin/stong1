import React, { useState, useEffect } from 'react';
import { 
  Link as LinkIcon, Plus, Trash2, Smartphone, 
  Palette, Share2, Globe, ShieldCheck, Zap, 
  Info, ExternalLink, Instagram, Twitter, 
  Linkedin, Youtube, MessageCircle, Move, Check, Copy,
  // Added missing Layout icon import
  Layout
} from 'lucide-react';

interface LinkNode {
  id: string;
  label: string;
  url: string;
  icon: string;
}

type TreeTheme = 'Aureate' | 'Obsidian' | 'Frost' | 'Midnight';

export const BioLinkTree: React.FC = () => {
  const [nodes, setNodes] = useState<LinkNode[]>(() => {
    const saved = localStorage.getItem('st_bio_tree');
    return saved ? JSON.parse(saved) : [
      { id: '1', label: 'My Official Portfolio', url: 'https://strongtools.site', icon: 'Globe' },
      { id: '2', label: 'Professional Ledger (LinkedIn)', url: 'https://linkedin.com', icon: 'Linkedin' },
      { id: '3', label: 'Visual Archive (Instagram)', url: 'https://instagram.com', icon: 'Instagram' }
    ];
  });

  const [theme, setTheme] = useState<TreeTheme>('Aureate');
  const [profileName, setProfileName] = useState('Alexander Sterling');
  const [bio, setBio] = useState('Senior Archival Architect | Digital Strategist');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    localStorage.setItem('st_bio_tree', JSON.stringify(nodes));
  }, [nodes]);

  const addNode = () => {
    const newNode: LinkNode = {
      id: Date.now().toString(),
      label: 'New Strategic Link',
      url: 'https://',
      icon: 'LinkIcon'
    };
    setNodes([...nodes, newNode]);
  };

  const updateNode = (id: string, field: keyof LinkNode, value: string) => {
    setNodes(nodes.map(n => n.id === id ? { ...n, [field]: value } : n));
  };

  const removeNode = (id: string) => {
    setNodes(nodes.filter(n => n.id !== id));
  };

  const getThemeStyles = () => {
    switch (theme) {
      case 'Obsidian': return 'bg-[#0a0a0a] text-white border-white/10';
      case 'Frost': return 'bg-white text-black border-gray-100';
      case 'Midnight': return 'bg-[#020617] text-blue-100 border-blue-900/30';
      default: return 'bg-[#0a0a0a] text-[#D4AF37] border-[#D4AF37]/20';
    }
  };

  const getButtonStyles = () => {
    switch (theme) {
      case 'Obsidian': return 'bg-white/5 border-white/10 hover:bg-white/10 text-white';
      case 'Frost': return 'bg-gray-50 border-gray-200 hover:bg-gray-100 text-black';
      case 'Midnight': return 'bg-blue-950/40 border-blue-800/30 hover:border-blue-500 text-blue-100';
      default: return 'bg-[#D4AF37]/5 border-[#D4AF37]/20 hover:border-[#D4AF37] text-[#D4AF37]';
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-700">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Share2 size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Bio-Link Tree Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Unified Digital Identity Node</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
             <div className="flex bg-white/5 p-1 rounded-xl border border-white/10">
                {(['Aureate', 'Obsidian', 'Frost', 'Midnight'] as TreeTheme[]).map((t) => (
                  <button
                    key={t}
                    onClick={() => setTheme(t)}
                    className={`px-4 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${theme === t ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
                  >
                    {t}
                  </button>
                ))}
             </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Construction Panel */}
          <div className="lg:col-span-7 space-y-8">
            <div className="bg-white/5 border border-white/5 rounded-[2.5rem] p-8 space-y-6 shadow-inner">
               <div className="flex items-center gap-3 text-gray-500 mb-2">
                 <Palette size={16} />
                 <span className="text-[10px] font-black uppercase tracking-widest italic">Identity Metadata</span>
               </div>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-600 ml-2 tracking-widest">Public Label</label>
                    <input 
                      value={profileName} 
                      onChange={(e) => setProfileName(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-[#D4AF37]/40"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase text-gray-600 ml-2 tracking-widest">Short Abstract</label>
                    <input 
                      value={bio} 
                      onChange={(e) => setBio(e.target.value)}
                      className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-xs outline-none focus:border-[#D4AF37]/40"
                    />
                  </div>
               </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Strategic Nodal Links</label>
                <span className="text-[9px] font-black text-[#D4AF37] uppercase tracking-widest tabular-nums">{nodes.length} / 8 Active</span>
              </div>

              <div className="space-y-3 max-h-[450px] overflow-y-auto custom-scrollbar pr-4">
                {nodes.map((node) => (
                  <div key={node.id} className="group bg-white/5 border border-white/5 rounded-2xl p-5 hover:border-[#D4AF37]/30 transition-all flex gap-4 items-start">
                    <div className="pt-3 text-gray-700">
                      <Move size={16} />
                    </div>
                    <div className="flex-grow space-y-3">
                      <input 
                        value={node.label}
                        onChange={(e) => updateNode(node.id, 'label', e.target.value)}
                        className="w-full bg-transparent border-b border-white/10 text-white font-black italic text-sm outline-none focus:border-[#D4AF37] py-1"
                        placeholder="Link Label"
                      />
                      <div className="flex gap-2">
                        <div className="relative flex-grow">
                          <LinkIcon size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-600" />
                          <input 
                            value={node.url}
                            onChange={(e) => updateNode(node.id, 'url', e.target.value)}
                            className="w-full bg-black/40 border border-white/5 rounded-lg py-2 pl-9 pr-3 text-[10px] text-gray-400 outline-none focus:border-[#D4AF37]/40"
                            placeholder="URL Coordinate"
                          />
                        </div>
                      </div>
                    </div>
                    <button 
                      onClick={() => removeNode(node.id)}
                      className="p-2 text-gray-700 hover:text-rose-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>

              <button 
                onClick={addNode}
                disabled={nodes.length >= 8}
                className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-gray-600 hover:text-[#D4AF37] hover:border-[#D4AF37]/30 transition-all disabled:opacity-0"
              >
                <Plus size={16} />
                <span className="text-[10px] font-black uppercase tracking-widest">Append Link Node</span>
              </button>
            </div>
          </div>

          {/* Simulation Viewport */}
          <div className="lg:col-span-5 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Handshake Viewport</label>
              <div className="flex items-center gap-2 opacity-30">
                <Smartphone size={14}/> <span className="text-[8px] font-black uppercase tracking-widest">Mobile Simulation</span>
              </div>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[4rem] p-8 flex items-center justify-center min-h-[600px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '60px 60px' }}></div>
               
               {/* Mobile Phone Mockup */}
               <div className={`w-[320px] h-[580px] rounded-[3rem] border-[8px] border-zinc-800 shadow-2xl overflow-hidden flex flex-col transition-all duration-700 ${getThemeStyles()}`}>
                  <div className="h-6 bg-zinc-800/20 flex items-center justify-center">
                    <div className="w-12 h-1 bg-zinc-800 rounded-full"></div>
                  </div>
                  
                  <div className="flex-grow p-6 flex flex-col items-center overflow-y-auto custom-scrollbar">
                     <div className={`w-20 h-20 rounded-3xl mb-4 flex items-center justify-center font-black text-3xl shadow-xl transition-all duration-500 ${theme === 'Frost' ? 'bg-black text-white' : 'bg-[#D4AF37] text-black'}`}>
                        {profileName.charAt(0)}
                     </div>
                     <h4 className="text-sm font-black uppercase tracking-tight mb-1">{profileName}</h4>
                     <p className="text-[10px] opacity-60 font-medium italic mb-8 text-center px-4">{bio}</p>
                     
                     <div className="w-full space-y-3">
                        {nodes.map(node => (
                          <div 
                            key={node.id} 
                            className={`w-full py-4 px-6 rounded-2xl border text-center font-bold text-xs transition-all animate-in slide-in-from-bottom-2 ${getButtonStyles()}`}
                          >
                            {node.label}
                          </div>
                        ))}
                     </div>

                     <div className="mt-auto pt-10 flex gap-4 opacity-40">
                        <Instagram size={14}/>
                        <Twitter size={14}/>
                        <Linkedin size={14}/>
                        <Globe size={14}/>
                     </div>
                  </div>
               </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-3xl space-y-4">
               <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 text-emerald-400">
                    <ShieldCheck size={18} />
                    <span className="text-[10px] font-black uppercase tracking-widest">Archive Sovereignty</span>
                  </div>
                  <button 
                    onClick={() => {
                      navigator.clipboard.writeText(`Alexander Sterling Bio-Link\n---\n${nodes.map(n => `${n.label}: ${n.url}`).join('\n')}`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className={`flex items-center gap-2 px-4 py-1.5 rounded-lg text-[9px] font-black uppercase transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 text-gray-400 hover:text-white'}`}
                  >
                    {copied ? <Check size={12}/> : <Copy size={12}/>} {copied ? 'Manuscript Saved' : 'Copy All Links'}
                  </button>
               </div>
               <p className="text-[9px] text-gray-500 leading-relaxed italic">
                 "StrongTools Protocol: This architect executes entirely within your browser's RAM. Your identity links are stored in the Local Registry, ensuring total sovereignty without third-party tracking."
               </p>
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Zero-Upload Manifest Synthesis Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Layout size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Multi-Theme Chromatic Simulation Verified</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Smartphone size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Mobile-First UI Handshake Protocol</p>
           </div>
        </div>
      </div>
    </div>
  );
};
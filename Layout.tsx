
import React, { useState } from 'react';
import { Menu, X, Home, Info, Mail, Github, ChevronRight, Search, ShieldCheck } from 'lucide-react';
import { T as t } from '../translations';

export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navigateTo = (path: string) => {
    setIsMenuOpen(false);
    window.location.hash = path;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#f3ece0]">
      {/* Modern Minimal Header - Warm Tones */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-header px-4 md:px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center h-16 md:h-20">
          <button 
            onClick={() => navigateTo('#/')} 
            className="flex items-center gap-2 group outline-none"
          >
            <div className="w-8 h-8 bg-[#b45309] rounded-lg flex items-center justify-center text-[#fdf6e3] font-bold text-lg">S</div>
            <span className="text-xl font-extrabold text-[#3c2f2f] tracking-tight">{t.brand}</span>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <button onClick={() => navigateTo('#/')} className="text-sm font-semibold text-[#7d6e6e] hover:text-[#b45309] transition-colors">Home</button>
            <button onClick={() => navigateTo('#/about')} className="text-sm font-semibold text-[#7d6e6e] hover:text-[#b45309] transition-colors">About</button>
            <button onClick={() => navigateTo('#/contact')} className="text-sm font-semibold text-[#7d6e6e] hover:text-[#b45309] transition-colors">Contact</button>
            <button className="p-2 text-[#b7a896] hover:text-[#3c2f2f]"><Github size={20}/></button>
          </nav>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 text-[#3c2f2f]">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </header>

      {/* AD SPACE 1: TOP HEADER (RESPONSIVE) */}
      <div className="pt-20 px-4 flex justify-center bg-[#fdfaf3]">
        <div className="w-full max-w-7xl h-24 md:h-28 border border-dashed border-[#e7d8c5] rounded-xl flex items-center justify-center bg-white/[0.2] overflow-hidden">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#b7a896] italic">Responsive Header Ledger Ad (728x90 / 320x50)</span>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-[#fdf6e3] pt-24 px-6 space-y-6">
          <button onClick={() => navigateTo('#/')} className="block w-full text-left text-2xl font-bold text-[#3c2f2f]">Home</button>
          <button onClick={() => navigateTo('#/about')} className="block w-full text-left text-2xl font-bold text-[#3c2f2f]">About</button>
          <button onClick={() => navigateTo('#/contact')} className="block w-full text-left text-2xl font-bold text-[#3c2f2f]">Contact</button>
        </div>
      )}

      <main className="flex-grow">{children}</main>

      <footer className="bg-[#fdfaf3] border-t border-[#e7d8c5] pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6">
          {/* AD SPACE 6: FOOTER SENTINEL (BIG BANNERS) */}
          <div className="mb-16 w-full min-h-[150px] md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[3rem] flex items-center justify-center text-center p-8">
             <div className="space-y-2">
               <ShieldCheck size={24} className="mx-auto text-[#b7a896] opacity-30 mb-2" />
               <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic">Institutional Master Registry Sentinel Ad</p>
               <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em]">Adaptive across Mobile, Tablet, and Desktop Nodes</p>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center gap-2">
                 <div className="w-6 h-6 bg-[#b45309] rounded flex items-center justify-center text-white font-bold text-xs">S</div>
                 <span className="text-lg font-bold text-[#3c2f2f]">{t.brand}</span>
              </div>
              <p className="text-[#7d6e6e] text-sm leading-relaxed">{t.footerSub}</p>
            </div>
            
            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase text-[#b7a896] tracking-wider">Features</h5>
              <nav className="flex flex-col gap-2 text-sm text-[#7d6e6e]">
                <button onClick={() => navigateTo('#/')} className="hover:text-[#b45309] transition-all text-left">Browse Tools</button>
                <button onClick={() => navigateTo('#/tools')} className="hover:text-[#b45309] transition-all text-left">Tools List</button>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase text-[#b7a896] tracking-wider">Company</h5>
              <nav className="flex flex-col gap-2 text-sm text-[#7d6e6e]">
                <button onClick={() => navigateTo('#/about')} className="hover:text-[#b45309] transition-all text-left">About</button>
                <button onClick={() => navigateTo('#/contact')} className="hover:text-[#b45309] transition-all text-left">Contact</button>
              </nav>
            </div>

            <div className="space-y-4">
              <h5 className="text-xs font-bold uppercase text-[#b7a896] tracking-wider">Legal</h5>
              <nav className="flex flex-col gap-2 text-sm text-[#7d6e6e]">
                <button onClick={() => navigateTo('#/privacy')} className="hover:text-[#b45309] transition-all text-left">Privacy Policy</button>
                <button onClick={() => navigateTo('#/terms')} className="hover:text-[#b45309] transition-all text-left">Terms of Use</button>
              </nav>
            </div>
          </div>
          <div className="border-t border-[#e7d8c5] pt-8 flex justify-between items-center text-xs text-[#b7a896] font-medium">
            <p>{t.registryLabel}</p>
            <p>Designed for Comfort</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

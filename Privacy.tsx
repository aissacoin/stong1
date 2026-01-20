
import React from 'react';
import { ShieldCheck, Lock, Eye, Globe, Database, FileText, Cookie, Info } from 'lucide-react';

export const Privacy: React.FC = () => {
  return (
    <div className="bg-[#f3ece0] min-h-screen text-[#3c2f2f] pt-32 pb-32 selection:bg-[#b45309] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Header Section */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#b45309]/10 text-[#b45309] text-[10px] font-black uppercase tracking-widest mb-4 border border-[#b45309]/20">
            <ShieldCheck size={14} /> Privacy Protocol
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-[#3c2f2f]">
            Privacy <span className="text-[#b45309]">Policy</span>
          </h1>
          <p className="text-lg text-[#7d6e6e] italic max-w-2xl mx-auto leading-relaxed">
            "Your data sovereignty is our primary mandate. We operate with absolute transparency regarding your digital footprint."
          </p>
        </header>

        {/* Main Content */}
        <div className="space-y-10">
          <section className="bg-[#fdf6e3] rounded-[2.5rem] p-10 border border-[#e7d8c5] shadow-sm space-y-6">
            <div className="flex items-center gap-4 text-[#b45309]">
              <Database size={24} />
              <h2 className="text-xl font-black uppercase tracking-widest italic">1. Local Data Residency</h2>
            </div>
            <p className="text-[#7d6e6e] leading-relaxed italic">
              StrongTools utilizes a <strong>Local-First Protocol</strong>. Most utilities execute entirely within your browser's RAM and LocalStorage. We do not maintain centralized databases of your input data. Your manuscripts, calculations, and visual assets remain on your hardware.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-[#fdf6e3] rounded-[2rem] p-8 border border-[#e7d8c5] space-y-4">
              <div className="flex items-center gap-3 text-[#b45309]">
                <Globe size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">2. Advertising & Cookies</h3>
              </div>
              <p className="text-xs text-[#7d6e6e] leading-relaxed italic">
                We use Google AdSense to sustain the archive. Third-party vendors, including Google, use cookies to serve ads based on prior visits. You may opt-out via Google Ad Settings.
              </p>
            </section>

            <section className="bg-[#fdf6e3] rounded-[2rem] p-8 border border-[#e7d8c5] space-y-4">
              <div className="flex items-center gap-3 text-[#b45309]">
                <Lock size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">3. Cryptographic Safety</h3>
              </div>
              <p className="text-xs text-[#7d6e6e] leading-relaxed italic">
                Any security-related tools (Keys, Hashes, 2FA) use standard browser-native WebCrypto APIs. No sensitive secrets are ever transmitted over the network.
              </p>
            </section>
          </div>

          <section className="bg-[#b45309]/5 rounded-[2.5rem] p-10 border border-[#b45309]/20 space-y-6">
            <div className="flex items-center gap-4 text-[#b45309]">
              <Info size={24} />
              <h2 className="text-xl font-black uppercase tracking-widest italic">4. User Rights (GDPR)</h2>
            </div>
            <p className="text-[#7d6e6e] text-sm leading-relaxed italic">
              You have the absolute right to access, rectify, or erase your local data. Since our tools are client-side, clearing your browser cache is equivalent to a full data erasure from our system.
            </p>
          </section>
        </div>

        <footer className="text-center pt-10 border-t border-[#e7d8c5]">
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b7a896]">
            Verified for Comfort MMXXV • StrongTools Archive
          </p>
        </footer>
      </div>
    </div>
  );
};

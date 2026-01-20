
import React from 'react';
import { Gavel, AlertTriangle, ShieldCheck, Scale, Terminal, BookOpen, Check } from 'lucide-react';

export const Terms: React.FC = () => {
  return (
    <div className="bg-[#f3ece0] min-h-screen text-[#3c2f2f] pt-32 pb-32 selection:bg-[#b45309] selection:text-white">
      <div className="max-w-4xl mx-auto px-6 space-y-16">
        
        {/* Header */}
        <header className="text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#b45309]/10 text-[#b45309] text-[10px] font-black uppercase tracking-widest mb-4 border border-[#b45309]/20">
            <Gavel size={14} /> Usage Agreement
          </div>
          <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tighter italic leading-none text-[#3c2f2f]">
            Terms of <span className="text-[#b45309]">Use</span>
          </h1>
          <p className="text-lg text-[#7d6e6e] italic max-w-2xl mx-auto leading-relaxed">
            "By accessing this utility vault, you agree to abide by the mathematical and logical parameters defined herein."
          </p>
        </header>

        <div className="space-y-8">
          <section className="bg-[#fdf6e3] rounded-[2rem] p-10 border border-[#e7d8c5] shadow-sm">
            <div className="flex items-center gap-4 text-[#b45309] mb-6">
              <Scale size={24} />
              <h2 className="text-xl font-black uppercase tracking-widest italic">1. License of Use</h2>
            </div>
            <p className="text-[#7d6e6e] leading-relaxed italic">
              We grant you a personal, non-transferable license to utilize these digital instruments. You may not scrape, reverse-engineer, or attempt to disrupt the sovereign logic of our processing nodes.
            </p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-[#fdf6e3] rounded-[2rem] p-8 border border-[#e7d8c5] space-y-4">
              <div className="flex items-center gap-3 text-[#b45309]">
                <AlertTriangle size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">2. Liability</h3>
              </div>
              <p className="text-xs text-[#7d6e6e] leading-relaxed italic">
                StrongTools provides these utilities "as-is". We are not liable for any deficit, financial loss, or archival corruption resulting from the use of our calculators or AI engines.
              </p>
            </div>
            <div className="bg-[#fdf6e3] rounded-[2rem] p-8 border border-[#e7d8c5] space-y-4">
              <div className="flex items-center gap-3 text-[#b45309]">
                <Terminal size={20} />
                <h3 className="text-sm font-black uppercase tracking-widest italic">3. Content Accuracy</h3>
              </div>
              <p className="text-xs text-[#7d6e6e] leading-relaxed italic">
                While we strive for sub-pixel precision, all outputs should be verified against official institutional benchmarks before professional application.
              </p>
            </div>
          </div>

          <section className="bg-white/40 rounded-[2rem] p-10 border border-[#e7d8c5] border-dashed">
            <h4 className="text-xs font-black uppercase text-[#3c2f2f] mb-6 tracking-[0.3em]">Compliance Checklist</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                'No Automated Scraping',
                'Ethical AI Prompting',
                'Local Data Respect',
                'Non-Commercial Redistribution',
                'Attribution of Scribe Content',
                'Standard Numeral Usage'
              ].map(item => (
                <div key={item} className="flex items-center gap-3 text-[10px] font-black uppercase text-[#7d6e6e]">
                  <Check size={14} className="text-emerald-600" /> {item}
                </div>
              ))}
            </div>
          </section>
        </div>

        <footer className="text-center opacity-40 italic text-xs">
          Last Revision: January MMXXV
        </footer>
      </div>
    </div>
  );
};

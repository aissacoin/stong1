
import React from 'react';
import { Landmark, ShieldCheck, Zap, Award, Crown, Compass, BookOpen, Target, Info } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="bg-[#f3ece0] min-h-screen text-[#3c2f2f] pt-32 pb-32 selection:bg-[#b45309] selection:text-white">
      <div className="max-w-5xl mx-auto px-6 space-y-32">
        
        {/* Hero Section */}
        <div className="text-center space-y-8 animate-in fade-in duration-1000">
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] text-[10px] font-black uppercase tracking-[0.4em] mb-4">
            <Crown size={16} /> Precision Utility Archive
          </div>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter italic leading-none">
            About <span className="text-[#b45309]">Archive</span>
          </h1>
          <p className="text-2xl font-light text-[#7d6e6e] italic max-w-3xl mx-auto leading-tight">
            "A curated sanctuary where digital logic meets high-fidelity aesthetic comfort."
          </p>
        </div>

        {/* Narrative Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-[#b45309] rounded-2xl flex items-center justify-center text-white shadow-lg">
                <Landmark size={32} />
              </div>
              <h2 className="text-3xl font-black uppercase tracking-tight italic">Our Mandate</h2>
            </div>
            <p className="text-xl text-[#3c2f2f] leading-relaxed italic border-l-4 border-[#b45309] pl-6 py-2">
              StrongTools was synthesized to bridge the gap between raw computational power and professional usability. In an era of distracting digital noise, we provide the silence of absolute data.
            </p>
            <p className="text-lg text-[#7d6e6e] leading-relaxed font-light">
              Every instrument in our archive—from neural text processors to cryptographic generators—is designed for sub-millisecond logical execution. We respect the professional eye by offering a theme that minimizes strain during extended sessions.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6">
            {[
              { icon: <ShieldCheck />, title: 'Privacy Pact', desc: '100% Client-side processing. Your data never leaves your device.' },
              { icon: <Zap />, title: 'Instant Logic', desc: 'Zero-latency algorithms optimized for modern browser engines.' },
              { icon: <Target />, title: 'Mathematical Rigor', desc: 'Outputs verified against global institutional benchmarks.' }
            ].map((item, i) => (
              <div key={i} className="bg-[#fdf6e3] p-8 rounded-[2rem] border border-[#e7d8c5] flex gap-6 group hover:border-[#b45309] transition-all">
                <div className="text-[#b45309] shrink-0 group-hover:scale-110 transition-transform">{item.icon}</div>
                <div>
                  <h4 className="text-sm font-black uppercase tracking-widest mb-2">{item.title}</h4>
                  <p className="text-xs text-[#7d6e6e] italic leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Vision Section */}
        <div className="bg-[#b45309] rounded-[3rem] p-16 text-white text-center space-y-10 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-20 opacity-10 rotate-12"><Compass size={300}/></div>
          <div className="relative z-10 space-y-6">
            <h3 className="text-4xl font-black uppercase italic tracking-tighter">The Aureate Standard</h3>
            <p className="text-xl font-medium italic max-w-2xl mx-auto opacity-80">
              "We believe a beautiful tool is, by definition, a more efficient tool. Aesthetics are the final layer of professional accuracy."
            </p>
            <div className="flex justify-center gap-3">
              {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-white/20"></div>)}
            </div>
          </div>
        </div>

        {/* Closing */}
        <div className="pt-20 text-center space-y-6 border-t border-[#e7d8c5]">
          <BookOpen className="text-[#b45309]/30 mx-auto" size={40} />
          <p className="text-[11px] font-black uppercase tracking-[0.8em] text-[#b7a896]">
            StrongTools Master Registry • Sovereign Edition v4.1
          </p>
        </div>
      </div>
    </div>
  );
};

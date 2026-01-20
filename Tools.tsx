
import React from 'react';
import { TOOLS, CATEGORY_COLORS } from '../constants';
import * as LucideIcons from 'lucide-react';
import { Search, Sparkles, Zap } from 'lucide-react';
import { useLanguage } from '../components/LanguageContext';

export const Tools: React.FC = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = React.useState('');
  
  const filteredTools = TOOLS.filter(tool => {
    const name = tool.name.toLowerCase();
    const desc = tool.description.toLowerCase();
    const query = searchTerm.toLowerCase();
    return name.includes(query) || desc.includes(query);
  });

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[#f3ece0]">
      <div className="max-w-7xl mx-auto px-6 space-y-16">
        {/* Header with Shadowed Text */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="space-y-4">
            <h1 className="text-6xl font-black tracking-tight text-white drop-shadow-[0_4px_3px_rgba(60,47,47,0.8)]">
              Utility <span className="text-[#b45309]">Vault</span>
            </h1>
            <p className="text-[#b45309]/80 font-black text-xl flex items-center gap-2 uppercase tracking-widest italic">
              <Sparkles size={24}/> {TOOLS.length} Curated Instruments
            </p>
          </div>
          
          <div className="relative w-full md:w-96 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-[#b7a896] group-focus-within:text-[#b45309] transition-colors" size={24} />
            <input 
              type="text" 
              placeholder="Filter the archives..." 
              className="w-full pl-16 pr-8 py-5 bg-[#fdfaf3] border border-[#e7d8c5] rounded-[2rem] text-lg outline-none focus:border-[#b45309] focus:ring-4 focus:ring-[#b45309]/5 transition-all text-[#3c2f2f] placeholder-[#b7a896]/50 shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Grid of Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredTools.map(tool => {
            const IconComponent = (LucideIcons as any)[tool.icon] || Zap;
            
            return (
              <div key={tool.id} className="group">
                <a 
                  href={`#/tool/${tool.id}`}
                  className="w-full text-left h-full bg-[#fdf6e3] border border-[#e7d8c5] p-10 rounded-[3rem] flex flex-col items-center text-center space-y-8 block transition-all duration-300 hover:translate-y-[-8px] hover:shadow-[0_20px_40px_-15px_rgba(60,47,47,0.15)] hover:border-[#b45309]/30"
                >
                  <div className={`w-24 h-24 rounded-[2.5rem] flex items-center justify-center bg-[#b45309]/10 text-[#b45309] shadow-inner group-hover:bg-[#b45309] group-hover:text-white transition-all duration-500`}>
                    <IconComponent size={42} strokeWidth={2.5} />
                  </div>
                  
                  <div className="space-y-3">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#b45309]/50">{tool.category}</span>
                    <h4 className="text-2xl font-black text-[#3c2f2f] leading-tight transition-colors group-hover:text-[#b45309]">
                      {tool.name}
                    </h4>
                    <p className="text-[#7d6e6e] text-xs font-medium leading-relaxed line-clamp-2 italic">
                      "{tool.description}"
                    </p>
                  </div>

                  <div className="pt-4 mt-auto">
                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#b7a896] group-hover:text-[#b45309] transition-colors">
                      Deploy Logic <LucideIcons.ChevronRight size={14} />
                    </div>
                  </div>
                </a>
              </div>
            );
          })}
        </div>

        {filteredTools.length === 0 && (
          <div className="text-center py-32 bg-[#fdfaf3]/50 rounded-[4rem] border-4 border-dashed border-[#e7d8c5]">
            <Search size={64} className="mx-auto text-[#e7d8c5] mb-6" />
            <p className="text-2xl font-black text-[#b7a896] italic tracking-tight">
              No instruments match your query in our records.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

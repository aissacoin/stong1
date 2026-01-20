
import React, { useState, useEffect } from 'react';
import { 
  ArrowRightLeft, ShieldCheck, Zap, Target, Plus, Minus, 
  Check, Info, HelpCircle, BookOpen, Sparkles, Layout, 
  Trash2, Ruler, Scale
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const UNIT_DATA = {
  Length: {
    units: [
      { name: 'Meters', factor: 1, symbol: 'm' },
      { name: 'Kilometers', factor: 1000, symbol: 'km' },
      { name: 'Centimeters', factor: 0.01, symbol: 'cm' },
      { name: 'Millimeters', factor: 0.001, symbol: 'mm' },
      { name: 'Miles', factor: 1609.34, symbol: 'mi' },
      { name: 'Feet', factor: 0.3048, symbol: 'ft' },
      { name: 'Inches', factor: 0.0254, symbol: 'in' }
    ]
  },
  Weight: {
    units: [
      { name: 'Kilograms', factor: 1, symbol: 'kg' },
      { name: 'Grams', factor: 0.001, symbol: 'g' },
      { name: 'Milligrams', factor: 0.000001, symbol: 'mg' },
      { name: 'Pounds', factor: 0.453592, symbol: 'lb' },
      { name: 'Ounces', factor: 0.0283495, symbol: 'oz' }
    ]
  }
};

export const UnitConverter: React.FC = () => {
  const { t } = useLanguage();
  const [category, setCategory] = useState<'Length' | 'Weight'>('Length');
  const [inputValue, setInputValue] = useState<string>('ten');
  const [fromUnit, setFromUnit] = useState(UNIT_DATA.Length.units[0]);
  const [results, setResults] = useState<{ name: string; value: string; symbol: string }[]>([]);

  const langT = t.tools['unit-calc'] || {
    name: 'Sovereign Unit Transmuter',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const sanitizeNumber = (val: string) => {
    return val.replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]).replace(/[^0-9.]/g, '');
  };

  const adjustValue = (amount: number) => {
    const current = parseFloat(sanitizeNumber(inputValue)) || 0;
    const next = Math.max(0, current + amount);
    setInputValue(String(next));
  };

  useEffect(() => {
    setFromUnit(UNIT_DATA[category].units[0]);
  }, [category]);

  useEffect(() => {
    const numValue = parseFloat(sanitizeNumber(inputValue)) || 0;
    const baseValue = numValue * fromUnit.factor;
    const currentUnits = UNIT_DATA[category].units;
    
    const newResults = currentUnits.map(u => ({
      name: u.name,
      symbol: u.symbol,
      value: (baseValue / u.factor).toLocaleString('en-US', { 
        maximumFractionDigits: 4,
        useGrouping: false
      })
    }));

    setResults(newResults);
  }, [inputValue, fromUnit, category]);

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Structural Logic Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-blue-600 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-600/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-600/10 rounded-2xl border border-blue-600/20 text-blue-500">
              <ArrowRightLeft size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Metric Logic Transmutation Node</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 shadow-inner">
            <button 
              onClick={() => setCategory('Length')}
              className={`px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${category === 'Length' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Dimension
            </button>
            <button 
              onClick={() => setCategory('Weight')}
              className={`px-8 py-2.5 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${category === 'Weight' ? 'bg-blue-600 text-white shadow-lg' : 'text-gray-500 hover:text-white'}`}
            >
              Magnitude
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-8">
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Primary Ingestion</label>
              
              <div className="flex flex-col gap-4">
                <div className="relative group">
                  <input 
                    type="text" 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="w-full bg-black border border-white/10 rounded-[2rem] p-8 text-blue-400 text-4xl font-black outline-none focus:border-blue-500/40 transition-all shadow-inner italic"
                    placeholder="Enter value..."
                  />
                  <div className="absolute right-6 top-1/2 -translate-y-1/2 flex items-center gap-2">
                    <select
                      value={fromUnit.name}
                      onChange={(e) => setFromUnit(UNIT_DATA[category].units.find(u => u.name === e.target.value)!)}
                      className="bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-2 text-[10px] font-black uppercase text-white outline-none cursor-pointer hover:border-blue-500/40 transition-all appearance-none"
                    >
                      {UNIT_DATA[category].units.map(u => <option key={u.name} value={u.name}>{u.symbol}</option>)}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => adjustValue(-1)}
                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl text-gray-400 hover:bg-rose-500/10 hover:text-rose-500 transition-all"
                  >
                    <Minus size={18} />
                  </button>
                  <button 
                    onClick={() => adjustValue(1)}
                    className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 py-4 rounded-2xl text-gray-400 hover:bg-emerald-500/10 hover:text-emerald-500 transition-all"
                  >
                    <Plus size={18} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-8 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2.5rem] flex items-center gap-6">
                <Zap size={40} className="text-blue-500/40 shrink-0" />
                <div>
                    <p className="text-[10px] font-black text-white uppercase tracking-widest mb-1 italic">Logic Handshake</p>
                    <p className="text-[10px] text-gray-500 leading-relaxed italic uppercase">Engine performs high fidelity resolution mapping across global measurement standards</p>
                </div>
            </div>
          </div>

          <div className="lg:col-span-7 bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col h-full shadow-inner min-h-[400px]">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.5em] text-blue-500 mb-8 italic">Synthesized Result Registry</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 overflow-y-auto custom-scrollbar pr-2 flex-grow relative z-10">
              {results.map((res, i) => (
                <div key={i} className="bg-black/40 border border-white/5 p-6 rounded-[2rem] group hover:border-blue-500/40 transition-all animate-in fade-in slide-in-from-right-2 duration-500">
                  <div className="flex justify-between items-start mb-3">
                      <span className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-500 group-hover:text-blue-500 transition-colors">{res.name}</span>
                      <div className="text-[8px] font-black bg-white/5 px-2 py-1 rounded text-white/20 uppercase">{res.symbol}</div>
                  </div>
                  <div className="text-2xl font-black text-white tabular-nums tracking-tighter truncate italic">{res.value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <ShieldCheck size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Mathematical Precision Protocol Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-blue-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Institutional Registry Accuracy Verified</p>
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
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Conversion Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

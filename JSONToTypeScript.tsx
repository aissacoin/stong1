
import React, { useState, useCallback } from 'react';
import { 
  FileCode, Code2, Copy, Check, Trash2, ShieldCheck, 
  Zap, Info, FileJson, Terminal, Braces, Layers,
  ChevronRight, ArrowRight, Save
} from 'lucide-react';

export const JSONToTypeScript: React.FC = () => {
  const [jsonInput, setJsonInput] = useState('');
  const [tsOutput, setTsOutput] = useState('');
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateInterfaces = useCallback(() => {
    setError(null);
    if (!jsonInput.trim()) {
      setTsOutput('');
      return;
    }

    try {
      const parsed = JSON.parse(jsonInput);
      const interfaces: string[] = [];
      const processedTypes = new Set<string>();

      const toPascalCase = (str: string) => {
        return str.replace(/(\w)(\w*)/g, (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()).replace(/[^\w]/g, '');
      };

      const inferType = (val: any, key: string): string => {
        if (val === null) return 'any';
        if (Array.isArray(val)) {
          if (val.length === 0) return 'any[]';
          const innerType = inferType(val[0], key);
          return `${innerType}[]`;
        }
        if (typeof val === 'object') {
          const interfaceName = toPascalCase(key) || 'RootObject';
          buildInterface(val, interfaceName);
          return interfaceName;
        }
        return typeof val;
      };

      const buildInterface = (obj: any, name: string) => {
        if (processedTypes.has(name)) return;
        processedTypes.add(name);

        let str = `export interface ${name} {\n`;
        for (const key in obj) {
          const type = inferType(obj[key], key);
          str += `  ${key}: ${type};\n`;
        }
        str += `}\n`;
        interfaces.unshift(str); // Add to beginning so root is often at bottom or child types precede parent
      };

      buildInterface(parsed, 'RootObject');
      setTsOutput(interfaces.join('\n'));
    } catch (e: any) {
      setError("Syntax Violation: The input manuscript is not a valid JSON structure.");
      setTsOutput('');
    }
  }, [jsonInput]);

  const handleCopy = () => {
    if (!tsOutput) return;
    navigator.clipboard.writeText(tsOutput);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-20">
      {/* TOOL INTERFACE */}
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-white">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-600/10 rounded-2xl border border-emerald-600/20 text-emerald-500">
              <Braces size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">JSON to TypeScript Architect</h2>
              <p className="text-[9px] font-bold text-emerald-500/60 uppercase tracking-[0.4em]">High-Fidelity Interface Synthesis</p>
            </div>
          </div>
          <div className="hidden lg:flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Type-Safe Production Ready</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Input Side */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Source JSON Manuscript</label>
              <button onClick={() => setJsonInput('')} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            <textarea 
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-[450px] bg-black border border-white/5 rounded-[2.5rem] p-8 text-blue-300 font-mono text-xs outline-none focus:border-emerald-500/40 transition-all placeholder-white/5 resize-none shadow-inner custom-scrollbar"
              placeholder='{ "id": 1, "name": "StrongTools", "features": ["Speed", "Safety"] }'
            />
            <button
              onClick={generateInterfaces}
              disabled={!jsonInput.trim()}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20"
            >
              <Zap size={24} />
              Synthesize Types
            </button>
          </div>

          {/* Output Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">TypeScript Interface Registry</label>
              <button 
                onClick={handleCopy}
                disabled={!tsOutput}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${copied ? 'bg-emerald-500 text-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                {copied ? <Check size={16}/> : <Copy size={16}/>}
                <span className="text-[10px] font-black uppercase tracking-widest">{copied ? 'Captured' : 'Copy Code'}</span>
              </button>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-10 overflow-hidden group shadow-inner min-h-[500px]">
               <div className="absolute top-0 right-0 p-12 opacity-[0.02] pointer-events-none rotate-12">
                  <Terminal size={300} />
               </div>
               
               {tsOutput ? (
                 <div className="relative z-10 h-full overflow-y-auto custom-scrollbar">
                    <pre className="text-emerald-400 font-mono text-xs leading-relaxed">
                      {tsOutput}
                    </pre>
                 </div>
               ) : (
                 <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                   <Code2 size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Data Schema</p>
                 </div>
               )}
            </div>

            {error && (
              <div className="p-6 bg-rose-500/5 border border-rose-500/20 rounded-2xl flex items-center gap-4 animate-in fade-in">
                 <Info size={20} className="text-rose-500 shrink-0" />
                 <p className="text-xs text-rose-400 font-bold uppercase tracking-widest italic">{error}</p>
              </div>
            )}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Layers size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Recursive Depth Parsing Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <FileCode size={20} className="text-emerald-500" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">PascalCase Naming Convention Applied</p>
           </div>
        </div>
      </div>

      {/* EDUCATIONAL SECTION */}
      <div className="max-w-4xl mx-auto space-y-24 py-16 px-8 bg-white/[0.01] rounded-[4rem] border border-white/5">
        <section className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Info size={24} />
            </div>
            <h3 className="text-3xl font-black text-white font-serif-scholarly italic">The Imperative of Type Safety</h3>
          </div>
          <p className="text-xl text-gray-400 leading-relaxed italic">
            In modern application architecture, the gap between dynamic API responses and strictly typed client code is a primary source of logical regressions. The JSON to TypeScript Interface synthesizer eliminates this entropy by creating a deterministic contract between your data and your UI components. By utilizing recursive type inference, we ensure that even the deepest nested properties of your JSON archives are captured with absolute precision.
          </p>
        </section>

        <section className="space-y-8">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
              <Layers size={24} />
            </div>
            <h3 className="text-3xl font-black text-white font-serif-scholarly italic">Architectural Flow</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-500 font-black uppercase tracking-widest text-xs">1. Schema Ingestion</h4>
              <p className="text-gray-500 text-sm leading-relaxed">The engine parses raw JSON strings into memory-based JavaScript objects, validating syntax integrity immediately.</p>
            </div>
            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-500 font-black uppercase tracking-widest text-xs">2. Recursive Mapping</h4>
              <p className="text-gray-500 text-sm leading-relaxed">Each property is analyzed. Objects trigger the generation of child interfaces, ensuring a modular and clean type registry.</p>
            </div>
            <div className="p-8 bg-black/40 border border-white/5 rounded-3xl space-y-4 hover:border-emerald-500/30 transition-colors">
              <h4 className="text-emerald-500 font-black uppercase tracking-widest text-xs">3. Interface Synthesis</h4>
              <p className="text-gray-500 text-sm leading-relaxed">The final manuscript is rendered using standard PascalCase nomenclature, ready for immediate inclusion in professional IDEs.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

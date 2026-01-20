import React, { useState, useEffect } from 'react';
import { Binary, Copy, Trash2, Check, RefreshCw, Cpu, Info, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const BinaryCipherTool: React.FC = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isBinaryToText, setIsBinaryToText] = useState(false);
  const [copied, setCopied] = useState(false);
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  const langT = t.tools['binary-cipher'];

  const textToBinary = (text: string) => {
    return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
  };

  const binaryToText = (bin: string) => {
    try {
      return bin.split(/\s+/).filter(b => b.length > 0).map(b => String.fromCharCode(parseInt(b, 2))).join('');
    } catch (e) {
      return isAr ? "خطأ في بنية الكود الثنائي" : "Invalid Binary Registry Entry";
    }
  };

  useEffect(() => {
    if (!input) { setOutput(''); return; }
    setOutput(isBinaryToText ? binaryToText(input) : textToBinary(input));
  }, [input, isBinaryToText]);

  return (
    <div className="space-y-12" dir={t.dir}>
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Cpu size={24} /></div>
            <div className={isAr ? 'text-right' : 'text-left'}>
              <h2 className="text-xl font-black text-white uppercase italic">{langT.internal.title}</h2>
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">{langT.internal.sub}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsBinaryToText(!isBinaryToText)}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-all"
          >
            <RefreshCw size={14} /> {langT.internal.switch}
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className={`w-full h-48 bg-black border border-white/10 rounded-2xl p-6 text-white text-sm outline-none focus:border-[#D4AF37] ${isAr ? 'text-right' : 'text-left'}`}
            placeholder={isAr ? (isBinaryToText ? langT.internal.placeholderBin : langT.internal.placeholderText) : "Enter input here..."}
          />
          <div className="relative">
            <textarea readOnly value={output} className={`w-full h-48 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-2xl p-6 text-[#D4AF37] font-mono text-sm shadow-inner ${isAr ? 'text-right' : 'text-left'}`} />
            <button onClick={() => { navigator.clipboard.writeText(output); setCopied(true); setTimeout(()=>setCopied(false), 2000); }} className="absolute top-4 right-4 text-[#D4AF37]">
              {copied ? <Check size={18}/> : <Copy size={18}/>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
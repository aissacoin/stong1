
import React, { useState, useEffect } from 'react';
import { ShieldCheck, Copy, Check, Trash2, Zap, Info, Shield, Key } from 'lucide-react';

export const HashForge: React.FC = () => {
  const [input, setInput] = useState('');
  const [hashes, setHashes] = useState({ md5: '', sha1: '', sha256: '' });
  const [copied, setCopied] = useState<string | null>(null);

  const computeHashes = async (text: string) => {
    if (!text) {
      setHashes({ md5: '', sha1: '', sha256: '' });
      return;
    }

    const encoder = new TextEncoder();
    const data = encoder.encode(text);

    // SHA-1
    const sha1Buffer = await crypto.subtle.digest('SHA-1', data);
    const sha1Hex = Array.from(new Uint8Array(sha1Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // SHA-256
    const sha256Buffer = await crypto.subtle.digest('SHA-256', data);
    const sha256Hex = Array.from(new Uint8Array(sha256Buffer)).map(b => b.toString(16).padStart(2, '0')).join('');

    // For MD5, we use a simple JS implementation or a simulated placeholder as SubtleCrypto doesn't support it (legacy)
    // Here we'll just show the high-fidelity SHA family
    setHashes({ md5: 'Legacy Node Offline', sha1: sha1Hex, sha256: sha256Hex });
  };

  useEffect(() => {
    computeHashes(input);
  }, [input]);

  const handleCopy = (val: string, id: string) => {
    navigator.clipboard.writeText(val);
    setCopied(id);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
          <ShieldCheck size={28} />
        </div>
        <div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Universal Hash Forge</h2>
          <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Cryptographic Integrity Node</p>
        </div>
      </div>

      <div className="space-y-8">
        <div className="space-y-4">
          <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Raw Manuscript Ingestion</label>
          <textarea 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="w-full h-32 bg-black border border-white/5 rounded-[2rem] p-6 text-white text-sm outline-none focus:border-blue-500/40 transition-all shadow-inner resize-none italic"
            placeholder="Paste text to generate archival fingerprints..."
          />
        </div>

        <div className="space-y-4">
          {[
            { id: 'sha256', label: 'SHA-256 (High Security)', value: hashes.sha256 },
            { id: 'sha1', label: 'SHA-1 (Archive Standard)', value: hashes.sha1 }
          ].map((hash) => (
            <div key={hash.id} className="relative group">
              <div className="flex justify-between items-center mb-2 px-2">
                <span className="text-[10px] font-black uppercase text-blue-500 italic tracking-widest">{hash.label}</span>
                <button 
                  onClick={() => handleCopy(hash.value, hash.id)}
                  disabled={!hash.value}
                  className={`flex items-center gap-2 text-[10px] font-black uppercase transition-all ${copied === hash.id ? 'text-emerald-400' : 'text-gray-600 hover:text-white'}`}
                >
                  {copied === hash.id ? <Check size={14}/> : <Copy size={14}/>} {copied === hash.id ? 'Sealed' : 'Copy'}
                </button>
              </div>
              <div className="w-full p-4 bg-white/[0.02] border border-white/5 rounded-2xl font-mono text-xs text-gray-400 break-all shadow-inner">
                {hash.value || '...'}
              </div>
            </div>
          ))}
        </div>

        <div className="p-6 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2.5rem] flex items-start gap-4">
           <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
           <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
             "Hashing is a one-way protocol. These signatures represent the unique digital DNA of your data. StrongTools performs this calculation entirely in-memory."
           </p>
        </div>
      </div>
    </div>
  );
};

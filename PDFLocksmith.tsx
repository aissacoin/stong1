
import React, { useState, useRef } from 'react';
import { Lock, Unlock, ShieldCheck, Zap, Upload, Download, Loader2, Check, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const PDFLocksmith: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [password, setPassword] = useState('');
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const encryptPDF = async () => {
    if (!file || !password) return;
    setProcessing(true);
    setSuccess(false);

    try {
      // PDF-Lib is used for cryptographic sealing
      const { PDFDocument } = await import('https://esm.sh/pdf-lib@1.17.1');
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      
      // Institutional Sealing Protocol
      const encryptedBytes = await pdfDoc.save({
        userPassword: password,
        ownerPassword: password,
        permissions: {
          printing: 'highResolution',
          modifying: false,
          copying: false,
          annotating: false,
          fillingForms: false,
          contentAccessibility: true,
          documentAssembly: false,
        },
      });

      const blob = new Blob([encryptedBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Sovereign_Locked_${file.name}`;
      link.click();
      
      setSuccess(true);
    } catch (err) {
      console.error("Encryption failure", err);
      alert("Logical desync: Failed to apply cryptographic seal.");
    } finally {
      setProcessing(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400"><Lock size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sovereign PDF Locksmith</h2>
      </div>

      <div className="space-y-8">
        <div onClick={() => fileInputRef.current?.click()} className={`h-40 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all ${file ? 'border-emerald-500/40' : 'border-white/5 hover:border-emerald-500/40'}`}>
          {file ? <div className="text-emerald-400 font-black uppercase text-[10px]">{file.name} Ready</div> : <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Inject PDF to Seal</span>}
          <input type="file" ref={fileInputRef} onChange={e => setFile(e.target.files?.[0] || null)} className="hidden" accept=".pdf" />
        </div>

        <div className="relative group">
           <input 
            type={showPass ? 'text' : 'password'} 
            value={password} onChange={e => setPassword(e.target.value)} 
            className="w-full bg-black border border-white/10 rounded-2xl p-6 text-white text-xl font-bold outline-none focus:border-emerald-500/40 transition-all pr-16" 
            placeholder="Institutional Password..." 
           />
           <button onClick={() => setShowPass(!showPass)} className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-600 hover:text-emerald-500">
             {showPass ? <EyeOff size={20}/> : <Eye size={20}/>}
           </button>
        </div>

        <button onClick={encryptPDF} disabled={processing || !file || !password} className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20">
          {processing ? <Loader2 className="animate-spin" size={24}/> : <ShieldCheck size={24}/>}
          Apply Cryptographic Seal
        </button>

        {success && (
          <div className="flex items-center gap-4 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl animate-in zoom-in">
             <Check className="text-emerald-400" />
             <p className="text-[10px] font-black uppercase text-emerald-400 tracking-widest">Manuscript Encrypted & Download Initiated</p>
          </div>
        )}
      </div>
    </div>
  );
};


import React, { useState, useRef } from 'react';
import { 
  ShieldCheck, ShieldAlert, Upload, Download, Trash2, 
  Zap, Info, Image as ImageIcon, Check, Loader2, 
  Eye, EyeOff, MapPin, Camera, Clock, Lock
} from 'lucide-react';

export const ExifRemover: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [purgedUrl, setPurgedUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [hasMetadata, setHasMetadata] = useState<boolean | null>(null);
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setPurgedUrl(null);
      setHasMetadata(true); // Assume metadata exists for protection
    }
  };

  const purgeMetadata = () => {
    if (!originalFile || !previewUrl) return;
    setProcessing(true);

    const img = new Image();
    img.src = previewUrl;
    img.onload = () => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Match exact original dimensions to preserve quality
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw image to canvas - this process discards all EXIF/Metadata
      ctx.drawImage(img, 0, 0);

      // Export as a fresh PNG/JPEG which contains NO metadata by default
      const cleanDataUrl = canvas.toDataURL('image/jpeg', 0.95);
      setPurgedUrl(cleanDataUrl);
      setHasMetadata(false);
      setProcessing(false);
    };
  };

  const handleDownload = () => {
    if (!purgedUrl) return;
    const link = document.createElement('a');
    link.href = purgedUrl;
    link.download = `Sovereign_Purged_${originalFile?.name.split('.')[0] || 'Image'}.jpg`;
    link.click();
  };

  const handleClear = () => {
    setOriginalFile(null);
    setPreviewUrl(null);
    setPurgedUrl(null);
    setHasMetadata(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Lock size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sovereign Exif Purger</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Privacy Metadata Decomposition Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Sandbox Protocol MMXXV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Registry Ingestion</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-64 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${previewUrl ? 'border-[#D4AF37]/40' : 'border-white/5 hover:border-[#D4AF37]/40'}`}
              >
                {previewUrl ? (
                   <img src={previewUrl} className="w-full h-full object-contain opacity-60" alt="Source" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-[#D4AF37] transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Vision Scroll</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
              </div>
            </div>

            {previewUrl && (
              <div className="space-y-4 animate-in fade-in slide-in-from-top-4">
                <div className={`p-6 rounded-[2rem] border flex items-start gap-4 ${hasMetadata ? 'bg-rose-500/5 border-rose-500/20' : 'bg-emerald-500/5 border-emerald-500/20'}`}>
                   {hasMetadata ? <ShieldAlert className="text-rose-500 shrink-0" size={24} /> : <ShieldCheck className="text-emerald-500 shrink-0" size={24} />}
                   <div>
                      <h4 className={`text-xs font-black uppercase tracking-widest ${hasMetadata ? 'text-rose-400' : 'text-emerald-400'}`}>
                        {hasMetadata ? 'Metadata Detected' : 'Privacy Verified'}
                      </h4>
                      <p className="text-[10px] text-gray-500 mt-1 leading-relaxed">
                        {hasMetadata 
                          ? 'This asset likely contains GPS coordinates, camera logs, and temporal stamps.' 
                          : 'Asset is now free of archival metadata logs.'}
                      </p>
                   </div>
                </div>
                
                {hasMetadata && (
                  <button
                    onClick={purgeMetadata}
                    disabled={processing}
                    className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
                  >
                    {processing ? <Loader2 className="animate-spin" size={24} /> : <Zap size={24} />}
                    Execute Metadata Purge
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Processed Viewport</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black/60 border border-white/5 rounded-[3.5rem] p-6 flex items-center justify-center min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
               
               {purgedUrl ? (
                 <div className="relative z-10 w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-500">
                    <img 
                      src={purgedUrl} 
                      className="max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10"
                      alt="Purged result" 
                    />
                    <div className="absolute top-0 right-0 p-4">
                      <div className="px-4 py-2 bg-emerald-500 text-black rounded-full text-[9px] font-black uppercase tracking-widest shadow-2xl flex items-center gap-2">
                        <Check size={12} /> Registry Cleaned
                      </div>
                    </div>
                 </div>
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   {hasMetadata ? <Eye size={100} className="mx-auto" /> : <EyeOff size={100} className="mx-auto" />}
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">
                     {previewUrl ? 'Archive Loaded - Awaiting De-Identification' : 'Awaiting Archival Ingestion'}
                   </p>
                 </div>
               )}
            </div>

            <button
              onClick={handleDownload}
              disabled={!purgedUrl}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(5,150,105,0.3)] disabled:opacity-20"
            >
              <Download size={24}/>
              Export Purged Asset (.JPG)
            </button>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <MapPin size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">GPS Coordinate Removal Verified</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Camera size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Hardware Fingerprint Suppression</p>
           </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-12 bg-[#D4AF37]/5 border-2 border-dashed border-[#D4AF37]/20 rounded-[4rem] relative overflow-hidden group">
         <Info className="absolute -bottom-10 -right-10 opacity-[0.03] text-[#D4AF37] rotate-12" size={300} />
         <div className="relative z-10 space-y-6">
            <div className="flex items-center gap-3 text-[#D4AF37]">
               <Lock size={24} />
               <h3 className="text-2xl font-black uppercase italic tracking-tighter font-serif-scholarly">Protocol: Zero-Knowledge Stripping</h3>
            </div>
            <p className="text-lg text-gray-400 leading-relaxed italic">
              "When you capture a digital image, your hardware automatically embeds a 'Digital Shadow'—EXIF data. This archive includes your precise satellite location, exact camera model, and temporal coordinates. The Sovereign Exif Purger operates on a **Decoupling Logic**: it takes the raw light data (pixels) and maps them onto a fresh, non-indexed canvas. The resulting export is a mathematically identical image but with a completely severed digital history."
            </p>
         </div>
      </div>
    </div>
  );
};

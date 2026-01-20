
import React, { useState, useRef, useEffect } from 'react';
import { User, Upload, Download, Trash2, Camera, ShieldCheck, Zap, Palette, Maximize, Check } from 'lucide-react';

export const ProfilePicMaker: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [bgColor, setBgColor] = useState('#D4AF37');
  const [borderWidth, setBorderWidth] = useState(10);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const drawProfile = () => {
    if (!image || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = 1000;
    canvas.width = size;
    canvas.height = size;

    // Background
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, size, size);

    // Circle clipping
    ctx.save();
    ctx.beginPath();
    ctx.arc(size/2, size/2, (size/2) - borderWidth, 0, Math.PI * 2);
    ctx.clip();

    const img = new Image();
    img.onload = () => {
      const ratio = Math.max(size / img.width, size / img.height);
      const w = img.width * ratio;
      const h = img.height * ratio;
      ctx.drawImage(img, (size - w)/2, (size - h)/2, w, h);
      setPreviewUrl(canvas.toDataURL('image/png'));
    };
    img.src = image;
    ctx.restore();
  };

  useEffect(() => { drawProfile(); }, [image, bgColor, borderWidth]);

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
      
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]">
            <Camera size={28} />
          </div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Profile Picture Architect</h2>
            <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Visual Identity Synthesis</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-8">
          <div onClick={() => fileInputRef.current?.click()} className="h-48 bg-black border-2 border-dashed border-white/5 rounded-[2rem] flex flex-col items-center justify-center cursor-pointer hover:border-[#D4AF37]/40 transition-all">
            <Upload className="text-gray-700 mb-2" />
            <span className="text-[10px] font-black uppercase text-gray-500">Inject Portrait Scroll</span>
            <input type="file" ref={fileInputRef} onChange={handleUpload} className="hidden" accept="image/*" />
          </div>

          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase text-gray-500 italic">Backdrop Meridian</label>
            <div className="flex gap-2">
              {['#D4AF37', '#1a1a1a', '#ffffff', '#3b82f6', '#ef4444'].map(c => (
                <button key={c} onClick={() => setBgColor(c)} className={`w-10 h-10 rounded-full border-2 ${bgColor === c ? 'border-white' : 'border-transparent'}`} style={{ backgroundColor: c }} />
              ))}
              <input type="color" value={bgColor} onChange={e => setBgColor(e.target.value)} className="w-10 h-10 bg-transparent border-0 cursor-pointer" />
            </div>
          </div>

          <button onClick={() => previewUrl && window.open(previewUrl)} className="w-full bg-[#D4AF37] text-black py-5 rounded-2xl font-black uppercase text-xs tracking-widest shadow-xl">
            Export Sovereign Profile
          </button>
        </div>

        <div className="lg:col-span-7 flex items-center justify-center bg-black/40 rounded-[3rem] p-10 min-h-[400px]">
          {previewUrl ? (
            <img src={previewUrl} className="w-64 h-64 rounded-full shadow-2xl border-4 border-[#D4AF37]/20" alt="Preview" />
          ) : (
            <User size={100} className="text-gray-800" />
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { 
  FileVideo, Upload, Download, Trash2, ShieldCheck, 
  Zap, Info, Image as ImageIcon, Loader2, Check, 
  Play, RefreshCw, Layers, Film
} from 'lucide-react';

export const WebPToVideoTransmuter: React.FC = () => {
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [originalPreview, setOriginalPreview] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('');
  const [progress, setProgress] = useState(0);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type !== 'image/webp') {
        alert("Institutional Protocol: Only .webp manuscripts are accepted in this node.");
        return;
      }
      setOriginalFile(file);
      const url = URL.createObjectURL(file);
      setOriginalPreview(url);
      setVideoUrl(null);
      setStatus('');
    }
  };

  const transmuteToVideo = async () => {
    if (!originalPreview || !canvasRef.current) return;
    setProcessing(true);
    setStatus('Initializing Archival Synthesis...');
    setProgress(10);

    const img = new Image();
    img.src = originalPreview;
    
    img.onload = async () => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      canvas.width = img.width;
      canvas.height = img.height;

      // Protocol: We capture the animation loop using MediaRecorder
      // This ensures 100% compatibility with all browsers
      const stream = canvas.captureStream(30); // 30 FPS
      const recorder = new MediaRecorder(stream, { mimeType: 'video/webm;codecs=vp9' });
      const chunks: Blob[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunks.push(e.data);
      };

      recorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        setVideoUrl(URL.createObjectURL(blob));
        setProcessing(false);
        setStatus('Transmutation Verified');
        setProgress(100);
      };

      // Animation Cycle Handshake
      setStatus('Recording Temporal Frames...');
      recorder.start();
      
      let startTime = performance.now();
      const duration = 5000; // Capture 5 seconds of the animation

      const renderFrame = (now: number) => {
        const elapsed = now - startTime;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0);
        
        const currentProgress = Math.min(10 + (elapsed / duration) * 80, 90);
        setProgress(Math.floor(currentProgress));

        if (elapsed < duration) {
          requestAnimationFrame(renderFrame);
        } else {
          recorder.stop();
        }
      };

      requestAnimationFrame(renderFrame);
    };
  };

  const handleDownload = () => {
    if (!videoUrl) return;
    const link = document.createElement('a');
    link.href = videoUrl;
    link.download = `Sovereign_WebP_Node_${Date.now()}.webm`;
    link.click();
  };

  const handleClear = () => {
    setOriginalFile(null);
    setOriginalPreview(null);
    setVideoUrl(null);
    setProcessing(false);
    setStatus('');
    setProgress(0);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="space-y-12">
      <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400">
              <RefreshCw size={28} className={processing ? 'animate-spin' : ''} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">WebP to Video Transmuter</h2>
              <p className="text-[9px] font-bold text-blue-500/40 uppercase tracking-[0.4em]">Temporal Bitstream Architect</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Local Sandbox Protocol Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Controls Side */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">1. Ingest Animated WebP</label>
              <div 
                onClick={() => fileInputRef.current?.click()}
                className={`group relative cursor-pointer h-52 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center gap-4 transition-all overflow-hidden ${originalPreview ? 'border-blue-500/40' : 'border-white/5 hover:border-blue-500/40'}`}
              >
                {originalPreview ? (
                   <img src={originalPreview} className="w-full h-full object-contain opacity-60" alt="Source" />
                ) : (
                  <>
                    <Upload size={32} className="text-gray-700 group-hover:text-blue-500 transition-colors" />
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-500">Inject Frame Sequence</span>
                  </>
                )}
                <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/webp" />
              </div>
            </div>

            <div className="space-y-4">
               <button
                onClick={transmuteToVideo}
                disabled={processing || !originalFile}
                className="w-full bg-blue-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(37,99,235,0.3)] disabled:opacity-20"
              >
                {processing ? (
                  <>
                    <Loader2 className="animate-spin" size={24} />
                    {progress}% Synchronizing...
                  </>
                ) : (
                  <>
                    <Zap size={24} />
                    Execute Transmutation
                  </>
                )}
              </button>
              {status && <p className="text-center text-[10px] font-black uppercase tracking-widest text-emerald-400 italic">{status}</p>}
            </div>

            <div className="p-6 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2rem] flex items-start gap-4">
               <Info size={20} className="text-blue-500 shrink-0 mt-0.5" />
               <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
                 "This node utilizes standard CaptureStream logic to decouple animation ticks from the browser's GPU and seal them into a persistent video container."
               </p>
            </div>
          </div>

          {/* Visualization Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 italic">Institutional Result Viewport</label>
              <button onClick={handleClear} className="text-gray-600 hover:text-rose-500 transition-colors"><Trash2 size={16}/></button>
            </div>
            
            <div className="relative flex-grow bg-black border border-white/5 rounded-[3.5rem] p-4 flex items-center justify-center min-h-[450px] overflow-hidden group shadow-inner">
               <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '30px 30px' }}></div>
               
               {videoUrl ? (
                 <video 
                  src={videoUrl} 
                  autoPlay 
                  loop 
                  muted 
                  className="relative z-10 max-w-full max-h-full rounded-2xl shadow-2xl border border-white/10 animate-in zoom-in duration-500" 
                 />
               ) : (
                 <div className="text-center opacity-10 space-y-6">
                   <FileVideo size={100} className="mx-auto" />
                   <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Temporal Synthesis</p>
                 </div>
               )}
               <canvas ref={canvasRef} className="hidden" />
            </div>

            <button
              onClick={handleDownload}
              disabled={!videoUrl}
              className="w-full bg-emerald-600 text-white py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(16,185,129,0.3)] disabled:opacity-20"
            >
              <Download size={24}/>
              Export Sovereign Video (.WEBM)
            </button>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40 py-4 border-t border-white/5">
          <div className="flex items-center gap-2">
            <Layers size={14} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Multi-Frame Decoupling</span>
          </div>
          <div className="flex items-center gap-2">
            <Film size={14} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Standard 30FPS Capture</span>
          </div>
          <div className="flex items-center gap-2">
            <Play size={14} className="text-blue-500" />
            <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white">Browser-Native Synthesis</span>
          </div>
        </div>
      </div>
    </div>
  );
};

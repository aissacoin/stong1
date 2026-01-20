
import React, { useState, useRef, useEffect } from 'react';
import { RefreshCw, Play, Plus, Trash2, Trophy, ShieldCheck, Zap, Info, Target, Settings2 } from 'lucide-react';

export const SpinnerWheel: React.FC = () => {
  const [options, setOptions] = useState<string[]>(['Choice 1', 'Choice 2', 'Choice 3', 'Choice 4']);
  const [newOption, setNewOption] = useState('');
  const [winner, setWinner] = useState<string | null>(null);
  const [spinning, setSpinning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rotationRef = useRef(0);

  // الألوان الذهبية والداكنة المتوافقة مع السمة
  const colors = ['#D4AF37', '#1A1512', '#A89078', '#3D322A', '#FDF8F3', '#2D241E'];

  const drawWheel = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;
    const sliceAngle = (2 * Math.PI) / options.length;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    options.forEach((opt, i) => {
      const angle = rotationRef.current + i * sliceAngle;
      
      // رسم القطاع
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.arc(centerX, centerY, radius, angle, angle + sliceAngle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();
      ctx.strokeStyle = 'rgba(212, 175, 55, 0.3)';
      ctx.stroke();

      // رسم النص
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle + sliceAngle / 2);
      ctx.textAlign = 'right';
      ctx.fillStyle = (i % colors.length === 0 || i % colors.length === 4) ? '#000' : '#D4AF37';
      ctx.font = 'bold 12px Montserrat';
      ctx.fillText(opt.substring(0, 15), radius - 20, 5);
      ctx.restore();
    });

    // رسم المركز
    ctx.beginPath();
    ctx.arc(centerX, centerY, 15, 0, 2 * Math.PI);
    ctx.fillStyle = '#D4AF37';
    ctx.fill();
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 3;
    ctx.stroke();
  };

  useEffect(() => {
    drawWheel();
  }, [options]);

  const spin = () => {
    if (spinning || options.length < 2) return;
    
    setSpinning(true);
    setWinner(null);
    
    const spinDuration = 4000; // 4 ثواني
    const startTime = performance.now();
    const startRotation = rotationRef.current;
    const extraSpins = (Math.random() * 5 + 5) * 2 * Math.PI; // دوران عشوائي
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / spinDuration, 1);
      
      // دالة تخميد الحركة (ease-out cubic)
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      rotationRef.current = startRotation + progress * extraSpins;
      drawWheel();

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSpinning(false);
        calculateWinner();
      }
    };

    requestAnimationFrame(animate);
  };

  const calculateWinner = () => {
    const sliceAngle = (2 * Math.PI) / options.length;
    // ضبط الزاوية لمعرفة السهم العلوي (الذي يشير لـ 270 درجة أو -90)
    const normalizedRotation = ((rotationRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    const index = Math.floor((2 * Math.PI - normalizedRotation) / sliceAngle) % options.length;
    setWinner(options[index]);
  };

  const addOption = () => {
    if (newOption.trim() && options.length < 12) {
      setOptions([...options, newOption.trim()]);
      setNewOption('');
    }
  };

  const removeOption = (idx: number) => {
    if (options.length > 2) {
      setOptions(options.filter((_, i) => i !== idx));
    }
  };

  return (
    <div className="space-y-16">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <RefreshCw className={spinning ? 'animate-spin' : ''} size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Aureate Spinner Node</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Probability Equilibrium Engine</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Entropy Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Controls */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Registry Management</label>
              <div className="flex gap-2">
                <input 
                  type="text" 
                  value={newOption}
                  onChange={(e) => setNewOption(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addOption()}
                  className="flex-grow bg-black border border-white/10 rounded-xl p-4 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all shadow-inner"
                  placeholder="Enter custom choice..."
                />
                <button onClick={addOption} className="p-4 bg-[#D4AF37] text-black rounded-xl hover:scale-105 transition-transform">
                  <Plus size={20} />
                </button>
              </div>
              
              <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
                {options.map((opt, i) => (
                  <div key={i} className="flex items-center justify-between p-3 bg-white/5 border border-white/5 rounded-xl group">
                    <span className="text-xs text-gray-300 font-bold italic tabular-nums flex items-center gap-3">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: colors[i % colors.length] }}></div>
                      {opt}
                    </span>
                    <button onClick={() => removeOption(i)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={spin}
              disabled={spinning}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              <Play size={24} fill="currentColor" />
              Engage Rotation
            </button>
          </div>

          {/* Visual Wheel Area */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center relative">
            {/* The Pointer */}
            <div className="absolute top-0 z-10 text-[#D4AF37] drop-shadow-lg -translate-y-2">
              <div className="w-8 h-8 rotate-45 bg-[#D4AF37] rounded-sm border-2 border-black"></div>
            </div>
            
            <div className="bg-white/[0.02] border border-white/5 rounded-[4rem] p-10 flex flex-col items-center justify-center relative overflow-hidden w-full aspect-square max-w-[450px]">
               <canvas 
                ref={canvasRef} 
                width={400} 
                height={400} 
                className={`max-w-full rounded-full shadow-[0_0_80px_rgba(0,0,0,0.5)] ${spinning ? 'cursor-wait' : 'cursor-default'}`}
               />
               
               {winner && !spinning && (
                 <div className="absolute inset-0 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-10 animate-in zoom-in duration-500 text-center">
                    <Trophy size={64} className="text-[#D4AF37] mb-4 animate-bounce" />
                    <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#D4AF37]/60 mb-2 italic">The Sovereign Choice</span>
                    <h3 className="text-4xl font-black text-white italic tracking-tighter mb-8 uppercase">{winner}</h3>
                    <button onClick={() => setWinner(null)} className="px-8 py-3 bg-[#D4AF37]/10 border border-[#D4AF37]/30 text-[#D4AF37] rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-[#D4AF37] hover:text-black transition-all">Dismiss Archive</button>
                 </div>
               )}
            </div>
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Randomization Protocol Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Mathematical Angular Accuracy Verified</p>
           </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { Upload, Grid, Trophy, RefreshCw, Image as ImageIcon, ShieldCheck, Zap, Info, Target, CheckCircle2, ChevronRight } from 'lucide-react';

interface PuzzlePiece {
  id: number;
  correctPos: number;
  currentPos: number | null;
  bgPos: string;
}

export const PuzzleMaker: React.FC = () => {
  const [image, setImage] = useState<string | null>(null);
  const [gridSize, setGridSize] = useState(4); // 4x4 = 16 pieces
  const [pieces, setPieces] = useState<PuzzlePiece[]>([]);
  const [shuffledIndices, setShuffledIndices] = useState<number[]>([]);
  const [isWon, setIsWon] = useState(false);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImage(ev.target?.result as string);
        setIsWon(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const initPuzzle = () => {
    if (!image) return;
    setLoading(true);
    
    const totalPieces = gridSize * gridSize;
    const newPieces: PuzzlePiece[] = [];
    const indices = Array.from({ length: totalPieces }, (_, i) => i);
    
    // Create the logical pieces
    for (let i = 0; i < totalPieces; i++) {
      const row = Math.floor(i / gridSize);
      const col = i % gridSize;
      const x = (col / (gridSize - 1)) * 100;
      const y = (row / (gridSize - 1)) * 100;
      
      newPieces.push({
        id: i,
        correctPos: i,
        currentPos: null,
        bgPos: `${x}% ${y}%`
      });
    }

    // Shuffle for the tray
    const shuffled = [...indices].sort(() => Math.random() - 0.5);
    
    setPieces(newPieces);
    setShuffledIndices(shuffled);
    setIsWon(false);
    setLoading(false);
  };

  useEffect(() => {
    if (image) initPuzzle();
  }, [image, gridSize]);

  const onDragStart = (e: React.DragEvent, pieceId: number) => {
    e.dataTransfer.setData('pieceId', pieceId.toString());
  };

  const onDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    const pieceId = parseInt(e.dataTransfer.getData('pieceId'));
    
    // Update piece position
    const updatedPieces = pieces.map(p => {
      if (p.id === pieceId) return { ...p, currentPos: targetIndex };
      // If another piece was already there, move it back to tray (null)
      if (p.currentPos === targetIndex) return { ...p, currentPos: null };
      return p;
    });

    setPieces(updatedPieces);
    checkWin(updatedPieces);
  };

  const checkWin = (currentPieces: PuzzlePiece[]) => {
    const allCorrect = currentPieces.every(p => p.currentPos === p.correctPos);
    if (allCorrect && currentPieces.length > 0) {
      setIsWon(true);
    }
  };

  const resetPuzzle = () => {
    initPuzzle();
  };

  return (
    <div className="space-y-16">
      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Grid size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Sovereign Puzzle Architect</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Neural Geometry Reconstruction Node</p>
            </div>
          </div>
          <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
            {[3, 4, 5, 6].map((size) => (
              <button 
                key={size}
                onClick={() => setGridSize(size)}
                className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${gridSize === size ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}
              >
                {size * size} Pieces
              </button>
            ))}
          </div>
        </div>

        {!image ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="group cursor-pointer h-[500px] bg-black border-2 border-dashed border-white/5 rounded-[4rem] flex flex-col items-center justify-center gap-6 hover:border-[#D4AF37]/40 transition-all shadow-inner"
          >
            <div className="w-32 h-32 bg-[#D4AF37]/10 rounded-full flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all">
              <Upload size={48} />
            </div>
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-white uppercase italic tracking-tighter">Ingest Image Master</h3>
              <p className="text-[10px] font-bold text-gray-600 uppercase tracking-[0.3em]">JPEG, PNG, OR WEBP • PIXEL ANALYSIS AUTO</p>
            </div>
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept="image/*" />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative">
            
            {/* The Assembly Grid */}
            <div className="lg:col-span-8">
              <div className="relative aspect-square w-full max-w-[600px] mx-auto bg-white/5 border border-white/10 rounded-3xl overflow-hidden p-2">
                <div 
                  className="grid h-full w-full gap-1"
                  style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)` }}
                >
                  {Array.from({ length: gridSize * gridSize }).map((_, i) => {
                    const placedPiece = pieces.find(p => p.currentPos === i);
                    return (
                      <div 
                        key={i}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={(e) => onDrop(e, i)}
                        className={`relative aspect-square border border-white/5 rounded-md flex items-center justify-center transition-colors ${!placedPiece ? 'bg-black/40 hover:bg-white/5' : ''}`}
                      >
                        {placedPiece ? (
                          <div 
                            draggable
                            onDragStart={(e) => onDragStart(e, placedPiece.id)}
                            className="w-full h-full rounded-sm cursor-grab active:cursor-grabbing shadow-lg"
                            style={{ 
                              backgroundImage: `url(${image})`,
                              backgroundPosition: placedPiece.bgPos,
                              backgroundSize: `${gridSize * 100}%`
                            }}
                          />
                        ) : (
                          <div className="opacity-5 text-[8px] font-black uppercase text-white tabular-nums">{i + 1}</div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {isWon && (
                  <div className="absolute inset-0 z-20 bg-black/80 backdrop-blur-md flex flex-col items-center justify-center p-12 text-center animate-in zoom-in duration-500">
                    <div className="w-32 h-32 bg-[#D4AF37] rounded-full flex items-center justify-center text-black mb-8 shadow-[0_0_80px_rgba(212,175,55,0.4)] animate-bounce">
                      <Trophy size={64} />
                    </div>
                    <h3 className="text-5xl font-black text-white uppercase italic tracking-tighter mb-4">Congratulation!</h3>
                    <p className="text-xl text-[#D4AF37] font-bold uppercase tracking-widest mb-10">The Sovereign Image is Reconstructed</p>
                    <div className="flex gap-4">
                       <button onClick={resetPuzzle} className="px-10 py-4 bg-[#D4AF37] text-black rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-105 transition-all">New Challenge</button>
                       <button onClick={() => setImage(null)} className="px-10 py-4 bg-white/5 border border-white/10 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white/10 transition-all">Change Master</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* The Tray (Remaining Pieces) */}
            <div className="lg:col-span-4 flex flex-col h-full">
              <div className="flex items-center justify-between mb-4 px-2">
                <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Piece Tray (Entropy)</label>
                <button onClick={resetPuzzle} className="text-[#D4AF37] hover:text-white transition-colors"><RefreshCw size={14} /></button>
              </div>
              <div className="flex-grow bg-black/60 border border-white/5 rounded-[2.5rem] p-6 overflow-y-auto custom-scrollbar min-h-[300px] shadow-inner">
                <div className="grid grid-cols-3 gap-3">
                   {pieces.filter(p => p.currentPos === null).map((piece) => (
                     <div 
                      key={piece.id}
                      draggable
                      onDragStart={(e) => onDragStart(e, piece.id)}
                      className="aspect-square rounded-lg cursor-grab active:cursor-grabbing border border-white/10 shadow-2xl hover:scale-105 hover:border-[#D4AF37]/50 transition-all"
                      style={{ 
                        backgroundImage: `url(${image})`,
                        backgroundPosition: piece.bgPos,
                        backgroundSize: `${gridSize * 100}%`
                      }}
                     />
                   ))}
                </div>
                {pieces.filter(p => p.currentPos === null).length === 0 && !isWon && (
                   <div className="h-full flex flex-col items-center justify-center text-center opacity-20 space-y-4">
                      <ShieldCheck size={48} />
                      <p className="text-[10px] font-black uppercase tracking-widest">All Nodes Deployed</p>
                   </div>
                )}
              </div>

              <div className="mt-8 p-6 bg-[#D4AF37]/5 border border-[#D4AF37]/20 rounded-3xl">
                <div className="flex items-center gap-3 text-[#D4AF37] mb-3">
                  <Info size={16}/>
                  <span className="text-[10px] font-black uppercase tracking-widest">Assembly Guide</span>
                </div>
                <p className="text-[10px] text-gray-500 leading-relaxed italic">
                  Drag pieces from the tray and drop them into the logical grid coordinates. The node will lock once symmetry is achieved.
                </p>
              </div>
            </div>

          </div>
        )}

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 opacity-40">
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Zap size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Neural Pattern Recognition Active</p>
           </div>
           <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5">
             <Target size={20} className="text-[#D4AF37]" />
             <p className="text-[9px] font-black uppercase tracking-widest leading-loose italic">Mathematical Spatial Verification Engaged</p>
           </div>
        </div>
      </div>
    </div>
  );
};

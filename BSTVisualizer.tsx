
import React, { useState } from 'react';
import { Binary, Plus, RotateCcw, Trash2, Zap, Info } from 'lucide-react';

interface Node {
  value: number;
  left: Node | null;
  right: Node | null;
}

export const BSTVisualizer: React.FC = () => {
  const [root, setRoot] = useState<Node | null>(null);
  const [inputValue, setInputValue] = useState('');

  const insertNode = (current: Node | null, val: number): Node => {
    if (!current) return { value: val, left: null, right: null };
    if (val < current.value) current.left = insertNode(current.left, val);
    else if (val > current.value) current.right = insertNode(current.right, val);
    return current;
  };

  const handleInsert = () => {
    const val = parseInt(inputValue);
    if (!isNaN(val)) {
      setRoot(prev => insertNode(prev ? { ...prev } : null, val));
      setInputValue('');
    }
  };

  const renderTree = (node: Node | null, x: number, y: number, offset: number): React.ReactNode => {
    if (!node) return null;
    return (
      <g className="animate-in fade-in duration-500">
        {node.left && <line x1={x} y1={y} x2={x - offset} y2={y + 60} stroke="#D4AF37" strokeWidth="1" />}
        {node.right && <line x1={x} y1={y} x2={x + offset} y2={y + 60} stroke="#D4AF37" strokeWidth="1" />}
        <circle cx={x} cy={y} r="18" fill="#161616" stroke="#D4AF37" strokeWidth="2" />
        <text x={x} y={y + 5} textAnchor="middle" fill="#D4AF37" fontSize="12" fontWeight="bold" className="tabular-nums">{node.value}</text>
        {renderTree(node.left, x - offset, y + 60, offset / 2)}
        {renderTree(node.right, x + offset, y + 60, offset / 2)}
      </g>
    );
  };

  return (
    <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-[#D4AF37]/10 rounded-2xl text-[#D4AF37]"><Binary size={28} /></div>
          <div>
            <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">BST Visualizer</h2>
            <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest">Algorithmic Structure Node</p>
          </div>
        </div>
        <div className="flex gap-2">
          <input 
            type="number" value={inputValue} onChange={e => setInputValue(e.target.value)}
            className="bg-black border border-white/10 rounded-xl p-3 text-white text-xs w-24 outline-none focus:border-[#D4AF37]"
            placeholder="Val"
          />
          <button onClick={handleInsert} className="p-3 bg-[#D4AF37] text-black rounded-xl hover:scale-105 transition-all"><Plus size={18}/></button>
          <button onClick={() => setRoot(null)} className="p-3 bg-white/5 border border-white/10 text-rose-500 rounded-xl hover:bg-rose-500/10 transition-all"><RotateCcw size={18}/></button>
        </div>
      </div>

      <div className="bg-black/60 border border-white/5 rounded-[3rem] p-4 min-h-[400px] overflow-auto flex items-start justify-center shadow-inner">
        <svg width="600" height="400">
           {renderTree(root, 300, 40, 140)}
        </svg>
      </div>
      <p className="text-center text-[8px] font-black text-gray-700 uppercase tracking-[0.4em] mt-6 italic">Binary Search Logic Verified • Recursive Depth Analysis Active</p>
    </div>
  );
};

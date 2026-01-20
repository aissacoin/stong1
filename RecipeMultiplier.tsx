
import React, { useState } from 'react';
import { UtensilsCrossed, Plus, Minus, Trash2, Check, Zap, Info, Scale } from 'lucide-react';

interface Ingredient {
  id: string;
  name: string;
  amount: number;
  unit: string;
}

export const RecipeMultiplier: React.FC = () => {
  const [servings, setServings] = useState(4);
  const [targetServings, setTargetServings] = useState(8);
  const [ingredients, setIngredients] = useState<Ingredient[]>([
    { id: '1', name: 'Flour', amount: 500, unit: 'g' },
    { id: '2', name: 'Eggs', amount: 2, unit: 'pcs' }
  ]);

  const multiplier = targetServings / servings;

  const addIng = () => setIngredients([...ingredients, { id: Date.now().toString(), name: '', amount: 0, unit: 'g' }]);
  const update = (id: string, f: keyof Ingredient, v: any) => setIngredients(ingredients.map(i => i.id === id ? { ...i, [f]: v } : i));

  return (
    <div className="bg-[#0a0a0a] border border-orange-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-orange-500/10 rounded-2xl text-orange-400"><UtensilsCrossed size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Recipe Servings Multiplier</h2>
        </div>
        <div className="flex bg-black border border-white/10 rounded-2xl p-2 gap-4 items-center">
           <span className="text-[10px] font-black uppercase text-gray-500 px-2">Scale From {servings} to</span>
           <input type="number" value={targetServings} onChange={e=>setTargetServings(Number(e.target.value))} className="w-16 bg-white/5 border border-white/10 rounded-lg p-2 text-white font-black text-center" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-4">
           <label className="text-[10px] font-black uppercase text-gray-500 tracking-widest px-2">Original Ledger</label>
           <div className="space-y-2 max-h-80 overflow-y-auto custom-scrollbar pr-2">
             {ingredients.map(ing => (
               <div key={ing.id} className="grid grid-cols-12 gap-2">
                 <input value={ing.name} onChange={e=>update(ing.id, 'name', e.target.value)} placeholder="Item" className="col-span-6 bg-black border border-white/5 rounded-xl p-2 text-white text-xs" />
                 <input type="number" value={ing.amount} onChange={e=>update(ing.id, 'amount', Number(e.target.value))} className="col-span-3 bg-black border border-white/5 rounded-xl p-2 text-white text-xs font-black tabular-nums" />
                 <input value={ing.unit} onChange={e=>update(ing.id, 'unit', e.target.value)} className="col-span-3 bg-black border border-white/5 rounded-xl p-2 text-white text-xs uppercase" />
               </div>
             ))}
           </div>
           <button onClick={addIng} className="w-full py-3 border-2 border-dashed border-white/5 rounded-xl text-gray-600 hover:text-orange-400 hover:border-orange-500/30 transition-all text-[10px] font-black uppercase">Append Ingredient</button>
        </div>

        <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-10 flex flex-col">
           <span className="text-[10px] font-black uppercase text-orange-500 tracking-[0.5em] mb-6 italic">Scaled Manifest (x{multiplier.toFixed(1)})</span>
           <div className="space-y-4 flex-grow">
              {ingredients.map(ing => (
                <div key={ing.id} className="flex justify-between items-center border-b border-white/5 pb-2">
                   <span className="text-gray-400 font-bold italic">{ing.name || '---'}</span>
                   <div className="flex gap-2">
                      <span className="text-white font-black tabular-nums">{(ing.amount * multiplier).toLocaleString()}</span>
                      <span className="text-orange-500 font-black uppercase text-[10px]">{ing.unit}</span>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </div>
  );
};

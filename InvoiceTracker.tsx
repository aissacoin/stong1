
import React, { useState, useEffect } from 'react';
import { Hash, Plus, Trash2, Check, ShieldCheck, Zap, Info, Landmark } from 'lucide-react';

interface InvoiceRecord {
  id: string;
  number: string;
  client: string;
  date: string;
}

export const InvoiceTracker: React.FC = () => {
  const [records, setRecords] = useState<InvoiceRecord[]>(() => {
    const saved = localStorage.getItem('st_invoice_ledger');
    return saved ? JSON.parse(saved) : [{ id: '1', number: 'INV-001', client: 'Alpha Corp', date: new Date().toISOString().split('T')[0] }];
  });

  useEffect(() => {
    localStorage.setItem('st_invoice_ledger', JSON.stringify(records));
  }, [records]);

  const addRecord = () => {
    const lastNum = records.length > 0 ? parseInt(records[0].number.replace(/\D/g, '')) : 0;
    const nextNum = `INV-${String(lastNum + 1).padStart(3, '0')}`;
    setRecords([{ id: Date.now().toString(), number: nextNum, client: '', date: new Date().toISOString().split('T')[0] }, ...records]);
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Landmark size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Invoice Sequence Architect</h2>
        </div>
        <button onClick={addRecord} className="px-6 py-3 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:scale-105 transition-all flex items-center gap-2">
           <Plus size={16}/> New Entry
        </button>
      </div>

      <div className="space-y-3 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
        {records.map((rec) => (
          <div key={rec.id} className="grid grid-cols-12 gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl items-center hover:border-blue-500/30 transition-all group">
             <div className="col-span-2 text-blue-400 font-mono font-black text-xs">{rec.number}</div>
             <div className="col-span-6">
                <input 
                  value={rec.client} 
                  onChange={e => setRecords(records.map(r => r.id === rec.id ? { ...r, client: e.target.value } : r))}
                  placeholder="Client Identity..."
                  className="w-full bg-transparent border-0 text-white text-sm outline-none font-bold italic"
                />
             </div>
             <div className="col-span-3 text-gray-500 text-[10px] font-black uppercase tabular-nums">{rec.date}</div>
             <button onClick={() => setRecords(records.filter(r => r.id !== rec.id))} className="col-span-1 text-gray-700 hover:text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity">
                <Trash2 size={16} />
             </button>
          </div>
        ))}
      </div>
    </div>
  );
};


import React, { useState, useRef, useEffect } from 'react';
import { 
  FileSpreadsheet, Plus, Minus, Trash2, Printer, 
  Download, Landmark, User, Receipt, ShieldCheck, 
  Zap, Info, Calendar, Image as ImageIcon, Camera, 
  Check, FileText, Wallet 
} from 'lucide-react';

interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
}

export const InvoiceGenerator: React.FC = () => {
  const [logo, setLogo] = useState<string | null>(null);
  const [useDefaultLogo, setUseDefaultLogo] = useState(true);
  const [invoiceData, setInvoiceData] = useState({
    invoiceNumber: `INV-${Date.now().toString().slice(-6)}`,
    date: new Date().toISOString().split('T')[0],
    from: 'Your Institutional Entity\nFull Address Registry',
    to: 'Recipient Entity Name\nFull Address Registry',
    taxRate: 15,
    notes: 'Payment terms: Net 30. Standard Bank Transfer.'
  });

  const [items, setItems] = useState<InvoiceItem[]>([
    { id: '1', description: 'Consultation Services', quantity: 1, price: 1200.00 }
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Sovereignty Protocol: Standard 1234567890 Numerals
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  const sanitizeInput = (val: string) => {
    return val.replace(/[^0-9.]/g, '');
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setLogo(ev.target?.result as string);
        setUseDefaultLogo(false);
      };
      reader.readAsDataURL(file);
    }
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), description: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter(i => i.id !== id));
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    let finalVal = value;
    if (field === 'quantity' || field === 'price') {
      finalVal = Number(sanitizeInput(toStd(value)));
    }
    setItems(items.map(i => i.id === id ? { ...i, [field]: finalVal } : i));
  };

  const increment = (id: string, field: 'quantity' | 'price', amount: number) => {
    setItems(items.map(i => {
      if (i.id === id) {
        const val = Number(i[field]) + amount;
        return { ...i, [field]: val < 0 ? 0 : val };
      }
      return i;
    }));
  };

  const adjustTax = (amount: number) => {
    setInvoiceData(prev => ({
      ...prev,
      taxRate: Math.max(0, Math.min(100, prev.taxRate + amount))
    }));
  };

  const subtotal = items.reduce((acc, item) => acc + (item.quantity * item.price), 0);
  const taxAmount = subtotal * (invoiceData.taxRate / 100);
  const total = subtotal + taxAmount;

  const handlePrint = () => window.print();

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <style>{`
        @media print {
          body * { visibility: hidden; background: white !important; color: black !important; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; padding: 0; }
          .no-print { display: none !important; }
          .print-border { border: 1px solid #eee !important; border-radius: 0 !important; }
        }
      `}</style>

      <div className="bg-[#0a0a0a] border border-emerald-500/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-emerald-500 selection:text-black no-print">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-400">
              <FileSpreadsheet size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Fiscal Invoice Architect</h2>
              <p className="text-[9px] font-bold text-emerald-500/40 uppercase tracking-[0.4em]">Sovereign Billing Protocol v5.0</p>
            </div>
          </div>
          <div className="flex gap-3">
             <button onClick={handlePrint} className="px-6 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-emerald-500 transition-all shadow-lg">
                <Printer size={16} /> Print Manuscript
             </button>
             <button onClick={handlePrint} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:bg-white/10 transition-all">
                <FileText size={16} /> Export Official Form
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-4 space-y-8 border-r border-white/5 pr-8">
            <div className="space-y-4">
               <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic px-2">Institutional Identity (Logo)</label>
               <div className="grid grid-cols-2 gap-3">
                  <button 
                    onClick={() => setUseDefaultLogo(true)}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${useDefaultLogo ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-white/5 bg-black text-gray-600'}`}
                  >
                    <Landmark size={20} />
                    <span className="text-[8px] font-black uppercase">StrongTools</span>
                  </button>
                  <button 
                    onClick={() => fileInputRef.current?.click()}
                    className={`p-4 rounded-2xl border transition-all flex flex-col items-center gap-2 ${!useDefaultLogo && logo ? 'border-emerald-500 bg-emerald-500/10 text-emerald-400' : 'border-white/5 bg-black text-gray-600'}`}
                  >
                    {logo && !useDefaultLogo ? <Check size={20} /> : <Camera size={20} />}
                    <span className="text-[8px] font-black uppercase">Upload Logo</span>
                  </button>
                  <input type="file" ref={fileInputRef} onChange={handleLogoUpload} className="hidden" accept="image/*" />
               </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 italic px-2">Tax Logic Registry</label>
              <div className="flex items-center justify-between bg-black border border-white/5 p-4 rounded-2xl">
                 <button onClick={() => adjustTax(-1)} className="p-2 text-emerald-500 hover:bg-white/5 rounded-lg"><Minus size={16}/></button>
                 <div className="text-center">
                    <span className="text-2xl font-black text-white tabular-nums">{toStd(invoiceData.taxRate)}%</span>
                    <p className="text-[7px] font-black text-gray-600 uppercase">Current Rate</p>
                 </div>
                 <button onClick={() => adjustTax(1)} className="p-2 text-emerald-500 hover:bg-white/5 rounded-lg"><Plus size={16}/></button>
              </div>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-dashed border-emerald-500/20 rounded-[2rem] flex items-start gap-4">
              <ShieldCheck className="text-emerald-500/40 shrink-0" size={20} />
              <p className="text-[9px] font-bold text-gray-500 uppercase tracking-widest leading-relaxed italic">
                Registry Standard: 1234567890 numerals enforced. Temporal coordinates synced.
              </p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-8">
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 ml-2 italic">Sender Ledger</label>
                <textarea 
                  value={invoiceData.from}
                  onChange={(e) => setInvoiceData({...invoiceData, from: e.target.value})}
                  className="w-full bg-black border border-white/5 rounded-2xl p-6 text-white text-xs outline-none focus:border-emerald-500/40 min-h-[100px] italic shadow-inner"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[9px] font-black uppercase text-gray-600 ml-2 italic">Recipient Registry</label>
                <textarea 
                  value={invoiceData.to}
                  onChange={(e) => setInvoiceData({...invoiceData, to: e.target.value})}
                  className="w-full bg-black border border-white/5 rounded-2xl p-6 text-white text-xs outline-none focus:border-emerald-500/40 min-h-[100px] italic shadow-inner"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-4 px-4 text-[9px] font-black uppercase text-gray-600 italic">
                <div className="col-span-6">Descriptor</div>
                <div className="col-span-2 text-center">Qty</div>
                <div className="col-span-3 text-right">Unit Value</div>
              </div>
              
              <div className="space-y-2">
                {items.map((item) => (
                  <div key={item.id} className="grid grid-cols-12 gap-3 bg-white/5 border border-white/5 p-3 rounded-2xl items-center hover:border-emerald-500/30 transition-all group">
                    <div className="col-span-6">
                       <input 
                        value={item.description} 
                        onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                        placeholder="Service descriptor..."
                        className="w-full bg-transparent border-0 text-white text-sm outline-none font-black italic"
                       />
                    </div>
                    <div className="col-span-2 flex items-center gap-2 bg-black/40 rounded-xl p-1">
                       <button onClick={() => increment(item.id, 'quantity', -1)} className="p-1 text-emerald-500/40 hover:text-emerald-500 transition-colors"><Minus size={12}/></button>
                       <input 
                        value={toStd(item.quantity)} 
                        onChange={(e) => updateItem(item.id, 'quantity', e.target.value)}
                        className="w-full bg-transparent border-0 text-center text-white text-xs font-black tabular-nums"
                       />
                       <button onClick={() => increment(item.id, 'quantity', 1)} className="p-1 text-emerald-500/40 hover:text-emerald-500 transition-colors"><Plus size={12}/></button>
                    </div>
                    <div className="col-span-3 flex items-center gap-2 bg-black/40 rounded-xl p-1">
                       <button onClick={() => increment(item.id, 'price', -10)} className="p-1 text-emerald-500/40 hover:text-emerald-500 transition-colors"><Minus size={12}/></button>
                       <input 
                        value={toStd(item.price)} 
                        onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                        className="w-full bg-transparent border-0 text-right text-white text-xs font-black tabular-nums pr-2"
                       />
                       <button onClick={() => increment(item.id, 'price', 10)} className="p-1 text-emerald-500/40 hover:text-emerald-500 transition-colors"><Plus size={12}/></button>
                    </div>
                    <button onClick={() => removeItem(item.id)} className="col-span-1 text-gray-700 hover:text-rose-500 flex justify-center">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <button onClick={addItem} className="w-full py-4 border-2 border-dashed border-white/5 rounded-2xl flex items-center justify-center gap-2 text-gray-600 hover:text-emerald-500 hover:border-emerald-500/20 transition-all">
                <Plus size={16}/> <span className="text-[10px] font-black uppercase">Append Item node</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-[3rem] p-16 text-black shadow-2xl print-area print-border relative overflow-hidden">
        <div className="flex justify-between items-start mb-20">
          <div className="space-y-6">
            {useDefaultLogo ? (
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 bg-black rounded-xl flex items-center justify-center text-white font-black text-2xl">S</div>
                 <span className="text-2xl font-black tracking-tighter">Strong<span className="text-emerald-600">Tools</span></span>
              </div>
            ) : logo ? (
              <img src={logo} className="h-16 object-contain" alt="Custom Logo" />
            ) : (
              <div className="w-16 h-16 bg-gray-100 rounded-xl flex items-center justify-center text-gray-300 italic text-[10px] text-center border-2 border-dashed">Identity Blank</div>
            )}
            <div className="text-[10px] uppercase font-black tracking-widest text-gray-400 mt-4 leading-relaxed whitespace-pre-wrap">{invoiceData.from}</div>
          </div>
          <div className="text-right space-y-2">
            <h1 className="text-5xl font-black italic tracking-tighter uppercase mb-4">Fiscal Form</h1>
            <div className="text-[10px] font-black uppercase text-gray-500">ID: <span className="text-black">{toStd(invoiceData.invoiceNumber)}</span></div>
            <div className="text-[10px] font-black uppercase text-gray-500">Date: <span className="text-black">{toStd(invoiceData.date)}</span></div>
          </div>
        </div>

        <div className="mb-16">
          <p className="text-[10px] font-black uppercase text-gray-400 mb-4 tracking-widest">Client Recipient</p>
          <div className="text-sm font-bold whitespace-pre-wrap italic">{invoiceData.to}</div>
        </div>

        <table className="w-full border-collapse mb-16">
          <thead>
            <tr className="border-b-2 border-black text-[10px] font-black uppercase tracking-widest">
              <th className="py-4 text-left">Ledger item</th>
              <th className="py-4 text-center">Quantity</th>
              <th className="py-4 text-right">Unit Price</th>
              <th className="py-4 text-right">Total</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {items.map((item, idx) => (
              <tr key={idx} className="border-b border-gray-100">
                <td className="py-4 font-bold italic">{item.description || 'Professional Service'}</td>
                <td className="py-4 text-center font-black tabular-nums">{toStd(item.quantity)}</td>
                <td className="py-4 text-right font-black tabular-nums">${toStd(item.price.toLocaleString())}</td>
                <td className="py-4 text-right font-black tabular-nums">${toStd((item.quantity * item.price).toLocaleString())}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-end">
          <div className="w-72 space-y-4">
             <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
               <span>Subtotal Registry</span>
               <span className="text-black tabular-nums">${toStd(subtotal.toLocaleString())}</span>
             </div>
             <div className="flex justify-between text-[10px] font-black uppercase text-gray-400">
               <span>Tax Assessment ({toStd(invoiceData.taxRate)}%)</span>
               <span className="text-black tabular-nums">${toStd(taxAmount.toLocaleString())}</span>
             </div>
             <div className="h-px bg-black"></div>
             <div className="flex justify-between items-center">
               <span className="text-[12px] font-black uppercase tracking-widest">Total Sovereign Balance</span>
               <span className="text-3xl font-black italic tabular-nums">${toStd(total.toLocaleString(undefined, { minimumFractionDigits: 2 }))}</span>
             </div>
          </div>
        </div>

        <div className="mt-32 pt-8 border-t border-gray-100 grid grid-cols-2 gap-20">
           <div className="space-y-4">
              <p className="text-[10px] font-black uppercase text-gray-400 tracking-widest italic underline">Instructions</p>
              <p className="text-[11px] font-bold text-gray-600 leading-relaxed italic whitespace-pre-wrap">{invoiceData.notes}</p>
           </div>
           <div className="flex flex-col items-center justify-center opacity-10">
              <Landmark size={64} />
              <span className="text-[8px] font-black uppercase mt-2 tracking-widest">Secure Registry MMXXV</span>
           </div>
        </div>
      </div>
    </div>
  );
};

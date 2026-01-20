
import React, { useState } from 'react';
import { Mail, Send, CheckCircle2, User, MessageCircle, Clock, Globe, ShieldCheck, Landmark } from 'lucide-react';

export const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulation of dispatch protocol
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-[#f3ece0] min-h-screen text-[#3c2f2f] pt-32 pb-32 selection:bg-[#b45309] selection:text-white">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
          
          {/* Info Column */}
          <div className="lg:col-span-5 space-y-12">
            <header className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-[#b45309]/10 border border-[#b45309]/30 text-[#b45309] text-[10px] font-black uppercase tracking-widest">
                <Landmark size={14} /> Postmaster General
              </div>
              <h1 className="text-6xl font-black uppercase tracking-tighter italic leading-none">
                Inquiry <br/><span className="text-[#b45309]">Registry</span>
              </h1>
              <p className="text-xl text-[#7d6e6e] italic leading-relaxed">
                "Whether you wish to propose a new instrument or report a logical regression—we are listening."
              </p>
            </header>

            <div className="space-y-8">
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#b45309] shadow-sm group-hover:scale-110 transition-transform">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-[#b7a896] tracking-widest">Archive Dispatch</p>
                  <p className="text-sm font-bold italic">registry@strongtools.site</p>
                </div>
              </div>
              <div className="flex items-center gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-[#b45309] shadow-sm group-hover:scale-110 transition-transform">
                  <Clock size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-[#b7a896] tracking-widest">Response Meridian</p>
                  <p className="text-sm font-bold italic">24-48 Solar Hours</p>
                </div>
              </div>
            </div>

            <div className="p-8 bg-[#b45309]/5 border border-[#b45309]/20 rounded-3xl">
              <div className="flex items-center gap-3 text-[#b45309] mb-4">
                <ShieldCheck size={20} />
                <span className="text-[10px] font-black uppercase tracking-widest">Privacy Assurance</span>
              </div>
              <p className="text-xs text-[#7d6e6e] leading-relaxed italic">
                All correspondence is handled within our Secure Transmission Protocol. Your contact details are never logged in third-party archives.
              </p>
            </div>
          </div>

          {/* Form Column */}
          <div className="lg:col-span-7">
            <div className="bg-[#fdf6e3] rounded-[3rem] p-10 md:p-16 border border-[#e7d8c5] shadow-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-10 opacity-5 -rotate-12"><MessageCircle size={300}/></div>
              
              {submitted ? (
                <div className="py-20 text-center space-y-8 animate-in zoom-in">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-lg text-white">
                    <CheckCircle2 size={48} />
                  </div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter italic">Manuscript Sent</h2>
                  <p className="text-[#7d6e6e] italic">Your inquiry has been vaulted for processing.</p>
                  <button onClick={() => setSubmitted(false)} className="text-[#b45309] font-black uppercase tracking-widest text-[10px] underline">Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-[#b7a896] ml-2 tracking-widest">Entity Name</label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a896]" size={16} />
                        <input required className="w-full bg-[#fdfaf3] border border-[#e7d8c5] rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-[#b45309] transition-all italic" placeholder="Alexander Sterling" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black uppercase text-[#b7a896] ml-2 tracking-widest">Dispatch Address</label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#b7a896]" size={16} />
                        <input required type="email" className="w-full bg-[#fdfaf3] border border-[#e7d8c5] rounded-2xl py-4 pl-12 pr-4 text-sm outline-none focus:border-[#b45309] transition-all italic" placeholder="entity@meridian.com" />
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#b7a896] ml-2 tracking-widest">Manuscript Content</label>
                    <textarea required rows={5} className="w-full bg-[#fdfaf3] border border-[#e7d8c5] rounded-[2rem] p-6 text-sm outline-none focus:border-[#b45309] transition-all resize-none italic" placeholder="Describe your inquiry or proposal..." />
                  </div>
                  <button disabled={loading} className="w-full bg-[#b45309] text-white py-6 rounded-[2rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-[#b45309]/20">
                    {loading ? "Dispatching..." : "Transmit Manuscript"}
                    <Send size={24} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

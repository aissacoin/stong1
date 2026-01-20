
import React, { useState } from 'react';
/* Added Sparkles to the imports from lucide-react */
import { MapPin, RefreshCw, Copy, Check, ShieldCheck, Zap, Info, Target, Globe, User, Phone, Mail, HelpCircle, BookOpen, Layout, Sparkles } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";
import { useLanguage } from '../LanguageContext';

interface FakeAddress {
  fullName: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  country: string;
}

const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'UK', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'JP', name: 'Japan' }
];

export const FakeAddressGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES[0]);
  const [address, setAddress] = useState<FakeAddress | null>(null);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const toolData = t.tools['fake-address'] || {
    name: 'Synthetic Identity Forge',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const generateAddress = async () => {
    setLoading(true);
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a highly realistic synthetic (fake) identity and address for ${selectedCountry.name}. Use standard numbers 0123456789.`,
        config: {
          systemInstruction: "You are a Synthetic Data Architect. Generate realistic but fake user data. Return ONLY a JSON object.",
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              fullName: { type: Type.STRING },
              street: { type: Type.STRING },
              city: { type: Type.STRING },
              state: { type: Type.STRING },
              zip: { type: Type.STRING },
              phone: { type: Type.STRING },
              email: { type: Type.STRING },
              country: { type: Type.STRING }
            },
            required: ["fullName", "street", "city", "state", "zip", "phone", "email", "country"]
          }
        }
      });

      const data = JSON.parse(response.text || "{}");
      setAddress(data);
    } catch (err) {
      console.error("Archive Synthesis Failure:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Identity Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3.5rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <MapPin size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Synthetic Registry Forge 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Logic Verified MMXXV</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Settings Column */}
          <div className="lg:col-span-4 space-y-8">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Regional Jurisdiction</label>
              <div className="grid grid-cols-1 gap-2">
                {COUNTRIES.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => setSelectedCountry(c)}
                    className={`flex items-center justify-between p-4 rounded-2xl border transition-all ${
                      selectedCountry.code === c.code 
                      ? 'bg-[#D4AF37] text-black border-[#D4AF37] font-black shadow-lg' 
                      : 'bg-white/5 border-white/5 text-gray-400 hover:border-white/20'
                    }`}
                  >
                    <span className="text-xs uppercase tracking-widest">{c.name}</span>
                    <Globe size={14} className={selectedCountry.code === c.code ? 'opacity-100' : 'opacity-20'} />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={generateAddress}
              disabled={loading}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.3)] disabled:opacity-20"
            >
              {loading ? <RefreshCw className="animate-spin" size={24} /> : <Zap size={24} />}
              Synthesize Data
            </button>
          </div>

          {/* Results Grid */}
          <div className="lg:col-span-8 bg-white/[0.02] border border-white/5 rounded-[3.5rem] p-10 relative overflow-hidden min-h-[450px] shadow-inner">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#fff 0% 25%, #000 0% 50%)', backgroundSize: '40px 40px' }}></div>
            
            {loading ? (
              <div className="h-full flex flex-col items-center justify-center space-y-6 opacity-40 animate-pulse">
                 <RefreshCw size={64} className="text-[#D4AF37] animate-spin" />
                 <p className="text-[10px] font-black uppercase tracking-[0.5em] text-center italic text-[#D4AF37]">Consulting Archival Registries 0123456789...</p>
              </div>
            ) : address ? (
              <div className="relative z-10 space-y-6 animate-in fade-in zoom-in duration-500">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl group relative">
                    <button onClick={() => handleCopy(address.fullName, 'name')} className="absolute top-4 right-4 text-gray-600 hover:text-[#D4AF37] transition-colors">
                      {copiedField === 'name' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <div className="flex items-center gap-3 text-[#D4AF37] mb-2 opacity-60">
                      <User size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Full Name</span>
                    </div>
                    <div className="text-xl font-black text-white italic truncate">{address.fullName}</div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl group relative">
                    <button onClick={() => handleCopy(address.street, 'street')} className="absolute top-4 right-4 text-gray-600 hover:text-[#D4AF37] transition-colors">
                      {copiedField === 'street' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <div className="flex items-center gap-3 text-[#D4AF37] mb-2 opacity-60">
                      <MapPin size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Street Archive</span>
                    </div>
                    <div className="text-xl font-black text-white italic truncate">{address.street}</div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl group relative">
                    <button onClick={() => handleCopy(`${address.city}, ${address.state} ${address.zip}`, 'csz')} className="absolute top-4 right-4 text-gray-600 hover:text-[#D4AF37] transition-colors">
                      {copiedField === 'csz' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <div className="flex items-center gap-3 text-[#D4AF37] mb-2 opacity-60">
                      <Globe size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Region & Postal</span>
                    </div>
                    <div className="text-xl font-black text-white italic tabular-nums">{address.city}, {address.state} {address.zip}</div>
                  </div>

                  <div className="bg-black/40 border border-white/5 p-6 rounded-3xl group relative">
                    <button onClick={() => handleCopy(address.phone, 'phone')} className="absolute top-4 right-4 text-gray-600 hover:text-[#D4AF37] transition-colors">
                      {copiedField === 'phone' ? <Check size={14} className="text-emerald-400" /> : <Copy size={14} />}
                    </button>
                    <div className="flex items-center gap-3 text-[#D4AF37] mb-2 opacity-60">
                      <Phone size={12} /> <span className="text-[9px] font-black uppercase tracking-widest">Telephony Node</span>
                    </div>
                    <div className="text-xl font-black text-white italic tabular-nums">{address.phone}</div>
                  </div>
                </div>

                <div className="bg-[#D4AF37]/5 border border-[#D4AF37]/30 p-8 rounded-[2.5rem] relative group mt-8">
                   <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3 text-[#D4AF37]">
                        <Mail size={16} /> <span className="text-[10px] font-black uppercase tracking-[0.4em]">Synthetic Mailbox</span>
                      </div>
                      <button onClick={() => handleCopy(address.email, 'email')} className="text-gray-400 hover:text-[#D4AF37] transition-all">
                        {copiedField === 'email' ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                      </button>
                   </div>
                   <div className="text-2xl font-black text-white italic break-all underline decoration-[#D4AF37]/20">{address.email}</div>
                </div>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-6">
                <MapPin size={100} className="mx-auto" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Data Synthesis Initiation 0123456789</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* DOCUMENTATION GRID */}
      <div className="mt-16 pt-12 border-t border-[#e7d8c5] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Info size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.about}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{toolData.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Data Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node 0123456789</p>
      </div>
    </div>
  );
};

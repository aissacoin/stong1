
import React, { useState, useRef } from 'react';
import { PenLine, User, Briefcase, Phone, Mail, Globe, Linkedin, Twitter, Copy, Check, ShieldCheck, Zap, Info, Trash2, Code, Target, HelpCircle, BookOpen, Layout, Sparkles } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

export const EmailSignatureGenerator: React.FC = () => {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: 'Alexander Sterling',
    title: 'Senior Technical Scribe',
    company: 'StrongTools Institutional Archive',
    phone: '+1 234 567 890',
    email: 'alexander@strongtools.site',
    website: 'www.strongtools.site',
    linkedin: 'linkedin.com/in/strongtools',
    twitter: 'twitter.com/strongtools',
    accentColor: '#D4AF37'
  });
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const signatureRef = useRef<HTMLDivElement>(null);

  const langT = t.tools['email-sig'] || {
    name: 'Email Sig Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const copySignature = async () => {
    if (!signatureRef.current) return;
    
    try {
      const type = "text/html";
      const blob = new Blob([signatureRef.current.innerHTML], { type });
      const data = [new ClipboardItem({ [type]: blob })];
      await navigator.clipboard.write(data);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed", err);
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Identity Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node</p>
         </div>
      </div>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-6xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <PenLine size={28} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{langT.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Institutional Identity Forge Node</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60">Registry Standard Verified</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Identity Parameters</label>
              <div className="grid grid-cols-1 gap-3">
                 <div className="relative">
                   <User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                   <input name="name" value={formData.name} onChange={handleChange} className="w-full bg-black border border-white/5 rounded-xl p-3 pl-10 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all" placeholder="Full Name" />
                 </div>
                 <div className="relative">
                   <Briefcase size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                   <input name="title" value={formData.title} onChange={handleChange} className="w-full bg-black border border-white/5 rounded-xl p-3 pl-10 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all" placeholder="Professional Title" />
                 </div>
                 <div className="relative">
                   <Globe size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                   <input name="company" value={formData.company} onChange={handleChange} className="w-full bg-black border border-white/5 rounded-xl p-3 pl-10 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all" placeholder="Organization" />
                 </div>
              </div>
            </div>

            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-500 italic px-2">Communication Nodes</label>
              <div className="grid grid-cols-1 gap-3">
                 <div className="relative">
                   <Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                   <input name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-black border border-white/5 rounded-xl p-3 pl-10 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all" placeholder="Phone Number" />
                 </div>
                 <div className="relative">
                   <Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-600" />
                   <input name="email" value={formData.email} onChange={handleChange} className="w-full bg-black border border-white/5 rounded-xl p-3 pl-10 text-white text-xs outline-none focus:border-[#D4AF37]/40 transition-all" placeholder="Email Address" />
                 </div>
              </div>
            </div>

            <button
              onClick={copySignature}
              className="w-full bg-[#D4AF37] text-black py-6 rounded-[2.5rem] font-black text-xl uppercase tracking-tighter italic flex items-center justify-center gap-4 hover:scale-[1.01] active:scale-95 transition-all shadow-[0_20px_50px_rgba(212,175,55,0.2)]"
            >
              {copied ? <Check size={24} /> : <Zap size={24} />}
              {copied ? 'Signature Vaulted' : 'Forge Signature'}
            </button>
          </div>

          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Visual Identity Preview</label>
              <button onClick={() => setShowCode(!showCode)} className="text-gray-600 hover:text-[#D4AF37] transition-colors">
                <Code size={16}/>
              </button>
            </div>
            
            <div className="relative flex-grow bg-white border border-gray-200 rounded-[3.5rem] p-12 flex items-center justify-center min-h-[350px] shadow-inner overflow-hidden">
               <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%)', backgroundSize: '20px 20px' }}></div>
               
               {showCode ? (
                 <pre className="relative z-10 w-full h-full bg-gray-900 text-emerald-400 p-6 rounded-2xl text-[10px] overflow-auto font-mono whitespace-pre-wrap">
                   {signatureRef.current?.innerHTML}
                 </pre>
               ) : (
                 <div ref={signatureRef} className="relative z-10 w-full animate-in zoom-in duration-500">
                    <table cellPadding="0" cellSpacing="0" style={{ fontFamily: 'Montserrat, Arial, sans-serif', color: '#1a1a1a', textAlign: 'left' }}>
                      <tr>
                        <td style={{ paddingRight: '20px', borderRight: `3px solid ${formData.accentColor}` }}>
                           <div style={{ width: '80px', height: '80px', backgroundColor: formData.accentColor, borderRadius: '15px', color: '#000', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', fontWeight: '900', fontSize: '32px', lineHeight: '80px' }}>
                             {formData.name.charAt(0)}
                           </div>
                        </td>
                        <td style={{ paddingLeft: '20px' }}>
                           <div style={{ fontSize: '18px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '-0.5px', marginBottom: '2px', color: '#000' }}>{formData.name}</div>
                           <div style={{ fontSize: '12px', fontWeight: '600', color: formData.accentColor, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>{formData.title}</div>
                           <div style={{ fontSize: '11px', fontWeight: '700', color: '#666', marginBottom: '8px' }}>{formData.company}</div>
                           
                           <table cellPadding="0" cellSpacing="0" style={{ fontSize: '11px' }}>
                              <tr>
                                <td style={{ paddingBottom: '4px' }}>
                                  <span style={{ fontWeight: '800', color: formData.accentColor, marginRight: '8px' }}>M</span>
                                  <span style={{ color: '#444' }}>{formData.phone}</span>
                                </td>
                              </tr>
                              <tr>
                                <td style={{ paddingBottom: '4px' }}>
                                  <span style={{ fontWeight: '800', color: formData.accentColor, marginRight: '8px' }}>E</span>
                                  <a href={`mailto:${formData.email}`} style={{ color: '#444', textDecoration: 'none' }}>{formData.email}</a>
                                </td>
                              </tr>
                              <tr>
                                <td>
                                  <span style={{ fontWeight: '800', color: formData.accentColor, marginRight: '8px' }}>W</span>
                                  <a href={`https://${formData.website}`} style={{ color: '#444', textDecoration: 'none' }}>{formData.website}</a>
                                </td>
                              </tr>
                           </table>
                        </td>
                      </tr>
                    </table>
                 </div>
               )}
            </div>
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
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.about}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Target size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.usage}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.usage}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <Sparkles size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.benefits}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.benefits}</p>
         </div>
         <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#b45309]">
              <HelpCircle size={18}/>
              <span className="text-xs font-black uppercase tracking-widest">{t.common.faq}</span>
            </div>
            <p className="text-sm text-[#7d6e6e] leading-relaxed italic">{langT.doc.faq}</p>
         </div>
      </div>

      {/* AD SLOT: BOTTOM (BIG BANNER) */}
      <div className="w-full h-32 md:h-64 bg-black/[0.03] border-4 border-dashed border-[#e7d8c5] rounded-[4rem] flex flex-col items-center justify-center p-8 opacity-40">
         <Layout size={40} className="text-[#b7a896] mb-4 opacity-20" />
         <p className="text-[10px] font-black uppercase tracking-[0.8em] text-[#b7a896] italic text-center">Institutional Registry Display Ad</p>
         <p className="text-[8px] font-bold text-[#b7a896]/40 uppercase tracking-[0.3em] mt-2">Precision Placement Node</p>
      </div>
    </div>
  );
};

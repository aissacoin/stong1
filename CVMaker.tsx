
import React, { useState, useRef, useEffect } from 'react';
import { 
  User, Briefcase, GraduationCap, Sparkles, Plus, Trash2, 
  Download, Printer, ChevronRight, ChevronLeft, ShieldCheck, 
  Layout, Type, Mail, Phone, MapPin, Globe, Award, Check, Info, Target, HelpCircle, BookOpen
} from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface CVData {
  personal: {
    fullName: string;
    jobTitle: string;
    email: string;
    phone: string;
    address: string;
    website: string;
    summary: string;
  };
  experience: { id: string; company: string; position: string; duration: string; desc: string }[];
  education: { id: string; school: string; degree: string; year: string }[];
  skills: string[];
}

export const CVMaker: React.FC = () => {
  const { t, language } = useLanguage();
  const [step, setStep] = useState(1);
  const [data, setData] = useState<CVData>(() => {
    const saved = localStorage.getItem('st_cv_archive');
    return saved ? JSON.parse(saved) : {
      personal: { fullName: 'Alexander Sterling', jobTitle: 'Senior Archival Engineer', email: 'alex@meridian.com', phone: '123-456-7890', address: 'London, UK', website: 'www.strongtools.site', summary: 'Professional with absolute rigor in digital utility craftsmanship.' },
      experience: [{ id: '1', company: 'Tech Forge', position: 'Lead Developer', duration: '2020 - Present', desc: 'Managed high-fidelity neural archives.' }],
      education: [{ id: '1', school: 'University of Logic', degree: 'BSc Computer Science', year: '2018' }],
      skills: ['Mathematical Rigor', 'System Design', 'Visual Aesthetics']
    };
  });

  const toolData = t.tools['cv-maker'] || {
    name: 'CV Architect',
    doc: { about: '', usage: '', benefits: '', faq: '' }
  };

  useEffect(() => {
    localStorage.setItem('st_cv_archive', JSON.stringify(data));
  }, [data]);

  const updatePersonal = (field: keyof CVData['personal'], value: string) => {
    setData(prev => ({ ...prev, personal: { ...prev.personal, [field]: value } }));
  };

  const addExp = () => setData(prev => ({ ...prev, experience: [...prev.experience, { id: Date.now().toString(), company: '', position: '', duration: '', desc: '' }] }));
  const removeExp = (id: string) => setData(prev => ({ ...prev, experience: prev.experience.filter(e => e.id !== id) }));
  const updateExp = (id: string, field: string, value: string) => setData(prev => ({ ...prev, experience: prev.experience.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addEdu = () => setData(prev => ({ ...prev, education: [...prev.education, { id: Date.now().toString(), school: '', degree: '', year: '' }] }));
  const removeEdu = (id: string) => setData(prev => ({ ...prev, education: prev.education.filter(e => e.id !== id) }));
  const updateEdu = (id: string, field: string, value: string) => setData(prev => ({ ...prev, education: prev.education.map(e => e.id === id ? { ...e, [field]: value } : e) }));

  const addSkill = (val: string) => { if (val.trim()) { setData(prev => ({ ...prev, skills: [...prev.skills, val.trim()] })); } };
  const removeSkill = (idx: number) => setData(prev => ({ ...prev, skills: prev.skills.filter((_, i) => i !== idx) }));

  const handlePrint = () => window.print();

  const renderForm = () => {
    switch(step) {
      case 1: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          <h3 className="text-xl font-black text-white italic uppercase tracking-widest flex items-center gap-2"><User size={18} className="text-[#D4AF37]"/> Personal Registry</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500">Full Archival Name</label>
              <input value={data.personal.fullName} onChange={e => updatePersonal('fullName', e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm outline-none focus:border-[#D4AF37]/40" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500">Job Meridian</label>
              <input value={data.personal.jobTitle} onChange={e => updatePersonal('jobTitle', e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm outline-none focus:border-[#D4AF37]/40" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500">Digital Coordinate (Email)</label>
              <input value={data.personal.email} onChange={e => updatePersonal('email', e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm outline-none focus:border-[#D4AF37]/40" />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase text-gray-500">Telephony Node</label>
              <input value={data.personal.phone} onChange={e => updatePersonal('phone', e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm outline-none focus:border-[#D4AF37]/40" />
            </div>
          </div>
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase text-gray-500">Professional Manuscript (Summary)</label>
            <textarea value={data.personal.summary} onChange={e => updatePersonal('summary', e.target.value)} rows={4} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white text-sm outline-none focus:border-[#D4AF37]/40 resize-none italic" />
          </div>
        </div>
      );
      case 2: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-white italic uppercase tracking-widest flex items-center gap-2"><Briefcase size={18} className="text-[#D4AF37]"/> Career Archive</h3>
            <button onClick={addExp} className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"><Plus size={20}/></button>
          </div>
          <div className="space-y-4">
            {data.experience.map(exp => (
              <div key={exp.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4 relative group">
                <button onClick={() => removeExp(exp.id)} className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                <div className="grid grid-cols-2 gap-4">
                  <input placeholder="Company Entity" value={exp.company} onChange={e => updateExp(exp.id, 'company', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                  <input placeholder="Position Held" value={exp.position} onChange={e => updateExp(exp.id, 'position', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                  <input placeholder="Temporal Duration (e.g. 2020 - 2023)" value={exp.duration} onChange={e => updateExp(exp.id, 'duration', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                </div>
                <textarea placeholder="Key Contributions..." value={exp.desc} onChange={e => updateExp(exp.id, 'desc', e.target.value)} className="w-full bg-black border border-white/5 rounded-xl p-2 text-xs text-white resize-none" />
              </div>
            ))}
          </div>
        </div>
      );
      case 3: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-black text-white italic uppercase tracking-widest flex items-center gap-2"><GraduationCap size={18} className="text-[#D4AF37]"/> Scholastic Registry</h3>
            <button onClick={addEdu} className="p-2 bg-[#D4AF37]/10 text-[#D4AF37] rounded-lg hover:bg-[#D4AF37] hover:text-black transition-all"><Plus size={20}/></button>
          </div>
          <div className="space-y-4">
            {data.education.map(edu => (
              <div key={edu.id} className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-4 relative group">
                <button onClick={() => removeEdu(edu.id)} className="absolute top-4 right-4 text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16}/></button>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input placeholder="Institution Name" value={edu.school} onChange={e => updateEdu(edu.id, 'school', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                  <input placeholder="Degree Obtained" value={edu.degree} onChange={e => updateEdu(edu.id, 'degree', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                  <input placeholder="Year" value={edu.year} onChange={e => updateEdu(edu.id, 'year', e.target.value)} className="bg-black border border-white/5 rounded-xl p-2 text-xs text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      );
      case 4: return (
        <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
          <h3 className="text-xl font-black text-white italic uppercase tracking-widest flex items-center gap-2"><Sparkles size={18} className="text-[#D4AF37]"/> Competency Grid</h3>
          <div className="space-y-4">
            <div className="flex gap-2">
              <input id="skill-input" placeholder="Enter skill node (e.g. Photoshop)" className="flex-grow bg-black border border-white/5 rounded-xl p-3 text-sm text-white" onKeyPress={e => e.key === 'Enter' && (addSkill((e.target as any).value), (e.target as any).value = '')} />
              <button onClick={() => { const i = document.getElementById('skill-input') as HTMLInputElement; addSkill(i.value); i.value = ''; }} className="px-6 bg-[#D4AF37] text-black font-black rounded-xl hover:scale-105 transition-transform"><Plus size={18}/></button>
            </div>
            <div className="flex flex-wrap gap-2">
              {data.skills.map((skill, i) => (
                <div key={i} className="px-4 py-2 bg-white/5 border border-[#D4AF37]/30 rounded-full flex items-center gap-2 group">
                  <span className="text-[10px] font-black text-white uppercase tracking-widest">{skill}</span>
                  <button onClick={() => removeSkill(i)} className="text-rose-500 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={12}/></button>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000" dir="ltr">
      {/* AD SLOT: TOP (RESPONSIVE) */}
      <div className="w-full h-24 md:h-32 bg-black/[0.02] border border-dashed border-[#e7d8c5] rounded-3xl flex items-center justify-center overflow-hidden">
         <div className="text-center">
            <p className="text-[8px] font-black uppercase tracking-[0.6em] text-[#b7a896] italic">Responsive Professional Archive Ad</p>
            <p className="text-[7px] font-bold text-[#b7a896]/40 uppercase tracking-[0.2em] mt-1">Multi-Device Placement Node 0123456789</p>
         </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; background: white !important; }
          .cv-print-only, .cv-print-only * { visibility: visible; }
          .cv-print-only { position: absolute; left: 0; top: 0; width: 100%; height: auto; }
          .no-print { display: none !important; }
        }
      `}</style>

      <div className="bg-[#0a0a0a] border border-[#D4AF37]/30 rounded-[3rem] p-8 max-w-7xl mx-auto shadow-2xl relative overflow-hidden selection:bg-[#D4AF37] selection:text-black">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-[#D4AF37]/10 rounded-2xl border border-[#D4AF37]/20 text-[#D4AF37]">
              <Layout size={28} />
            </div>
            <div className="text-left">
              <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">{toolData.name}</h2>
              <p className="text-[9px] font-bold text-[#D4AF37]/40 uppercase tracking-[0.4em]">Institutional Professional Registry 0123456789</p>
            </div>
          </div>
          <div className="flex items-center gap-4 no-print">
             <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10">
                {[1, 2, 3, 4].map(s => (
                  <button key={s} onClick={() => setStep(s)} className={`w-10 h-10 rounded-xl flex items-center justify-center text-[10px] font-black transition-all ${step === s ? 'bg-[#D4AF37] text-black shadow-lg' : 'text-gray-500 hover:text-white'}`}>{s}</button>
                ))}
             </div>
             <button onClick={handlePrint} className="flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-500 transition-all shadow-lg">
                <Printer size={16} /> Finalize Archive
             </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Form Side */}
          <div className="lg:col-span-5 space-y-8 border-r border-white/5 pr-8 no-print">
            {renderForm()}
            
            <div className="flex justify-between pt-10 border-t border-white/5">
              <button disabled={step === 1} onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-gray-500 hover:text-white disabled:opacity-20 transition-all">
                <ChevronLeft size={14}/> Previous Registry
              </button>
              {step < 4 ? (
                <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 text-[10px] font-black uppercase text-[#D4AF37] hover:text-white transition-all">
                  Next Step <ChevronRight size={14}/>
                </button>
              ) : (
                <button onClick={handlePrint} className="flex items-center gap-2 text-[10px] font-black uppercase text-emerald-400 hover:text-emerald-300 transition-all">
                  Produce Manuscript <Sparkles size={14}/>
                </button>
              )}
            </div>
          </div>

          {/* Live Preview Side */}
          <div className="lg:col-span-7 flex flex-col h-full space-y-6">
            <div className="flex justify-between items-center px-2 no-print">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-[#D4AF37] italic">Handshake Registry Preview</label>
              <div className="flex items-center gap-2 opacity-40">
                <ShieldCheck size={14}/> <span className="text-[8px] font-black uppercase tracking-widest tabular-nums">Local Memory Safe 0123456789</span>
              </div>
            </div>
            
            <div className="cv-print-only bg-white rounded-[2rem] shadow-2xl p-12 text-black min-h-[800px] flex flex-col font-serif shadow-[0_0_80px_rgba(0,0,0,0.3)] transition-all transform scale-95 lg:scale-100 hover:scale-[1.01]">
              <div className="border-b-4 border-black pb-8 mb-10 flex justify-between items-end">
                <div>
                  <h1 className="text-5xl font-black uppercase tracking-tighter mb-2">{data.personal.fullName || 'Identity Pending'}</h1>
                  <h2 className="text-xl font-bold italic text-gray-600">{data.personal.jobTitle}</h2>
                </div>
                <div className="text-right text-[10px] font-bold uppercase tracking-widest text-gray-400 space-y-1">
                   <div className="flex items-center justify-end gap-2"><Mail size={10}/> {data.personal.email}</div>
                   <div className="flex items-center justify-end gap-2"><Phone size={10}/> {data.personal.phone}</div>
                   <div className="flex items-center justify-end gap-2"><MapPin size={10}/> {data.personal.address}</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
                <div className="md:col-span-4 space-y-10 border-r border-gray-100 pr-6">
                  <section className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1">Registry Profile</h4>
                    <p className="text-xs leading-relaxed italic text-gray-600">{data.personal.summary}</p>
                  </section>
                  <section className="space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-[0.3em] border-b-2 border-black pb-1">Cognitive Nodes</h4>
                    <div className="flex flex-col gap-2">
                       {data.skills.map((s, i) => (
                         <div key={i} className="flex items-center gap-2 text-[10px] font-bold uppercase">
                           <div className="w-1 h-1 bg-black rounded-full"></div> {s}
                         </div>
                       ))}
                    </div>
                  </section>
                </div>

                <div className="md:col-span-8 space-y-10">
                  <section className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-2"><Briefcase size={16}/> Professional Tenure</h4>
                    <div className="space-y-6">
                       {data.experience.map(exp => (
                         <div key={exp.id} className="space-y-1">
                            <div className="flex justify-between items-baseline">
                              <span className="text-sm font-black uppercase">{exp.company}</span>
                              <span className="text-[10px] font-bold tabular-nums text-gray-400 italic">{exp.duration}</span>
                            </div>
                            <div className="text-xs font-bold text-gray-700 italic">{exp.position}</div>
                            <p className="text-[11px] leading-relaxed text-gray-500 mt-2">{exp.desc}</p>
                         </div>
                       ))}
                    </div>
                  </section>

                  <section className="space-y-6">
                    <h4 className="text-sm font-black uppercase tracking-[0.4em] flex items-center gap-2"><GraduationCap size={16}/> Scholastic Attainment</h4>
                    <div className="space-y-4">
                       {data.education.map(edu => (
                         <div key={edu.id} className="flex justify-between items-baseline">
                           <div>
                             <div className="text-sm font-black uppercase">{edu.school}</div>
                             <div className="text-[10px] font-bold italic text-gray-600">{edu.degree}</div>
                           </div>
                           <span className="text-[10px] font-bold tabular-nums text-gray-400 italic">{edu.year}</span>
                         </div>
                       ))}
                    </div>
                  </section>
                </div>
              </div>
              <div className="mt-auto pt-10 text-center opacity-10">
                 <div className="flex justify-center items-center gap-4">
                   <div className="h-px w-20 bg-black"></div>
                   <span className="text-[7px] font-black uppercase tracking-[1em]">StrongTools Scribe Archive</span>
                   <div className="h-px w-20 bg-black"></div>
                 </div>
              </div>
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

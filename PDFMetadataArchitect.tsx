
import React, { useState, useRef } from 'react';
import { FileSearch, Upload, Info, ShieldCheck, Trash2, Check, Loader2, Save, FileText, User, Settings } from 'lucide-react';

export const PDFMetadataArchitect: React.FC = () => {
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState<any>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== 'application/pdf') return;

    setLoading(true);
    setFileName(file.name);
    setSuccess(false);

    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdfjs = await import('https://esm.sh/pdfjs-dist@4.0.379');
      pdfjs.GlobalWorkerOptions.workerSrc = `https://esm.sh/pdfjs-dist@4.0.379/build/pdf.worker.min.mjs`;

      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      const meta = await pdf.getMetadata();
      
      setMetadata({
        title: meta.info?.Title || 'N/A',
        author: meta.info?.Author || 'N/A',
        subject: meta.info?.Subject || 'N/A',
        keywords: meta.info?.Keywords || 'N/A',
        creator: meta.info?.Creator || 'N/A',
        producer: meta.info?.Producer || 'N/A',
        created: meta.info?.CreationDate || 'N/A',
        modified: meta.info?.ModDate || 'N/A',
        pages: pdf.numPages
      });
    } catch (err) {
      console.error("Metadata extraction failure", err);
      alert("Institutional logic error: Could not parse document headers.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-blue-500/10 rounded-2xl border border-blue-500/20 text-blue-400"><FileSearch size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">PDF Metadata Architect</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-6">
          <div 
            onClick={() => fileInputRef.current?.click()}
            className={`h-64 bg-black border-2 border-dashed rounded-[2.5rem] flex flex-col items-center justify-center cursor-pointer transition-all ${fileName ? 'border-blue-500/40' : 'border-white/5 hover:border-blue-500/40'}`}
          >
            {loading ? <Loader2 className="animate-spin text-blue-500" size={40}/> : fileName ? (
              <div className="text-center p-6">
                <FileText size={48} className="text-blue-500 mx-auto mb-2" />
                <p className="text-xs text-white font-black uppercase truncate max-w-[200px]">{fileName}</p>
              </div>
            ) : (
              <>
                <Upload size={32} className="text-gray-700 mb-2" />
                <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Inject PDF Manuscript</span>
              </>
            )}
            <input type="file" ref={fileInputRef} onChange={handleFileUpload} className="hidden" accept=".pdf" />
          </div>

          <div className="p-6 bg-blue-500/5 border border-dashed border-blue-500/20 rounded-[2rem] flex items-start gap-4">
             <ShieldCheck size={20} className="text-blue-500 shrink-0" />
             <p className="text-[9px] text-gray-500 uppercase font-bold tracking-widest leading-loose italic">
               "Metadata isolation ensures that your document's digital shadow—including original author and software nodes—is completely decoupled from the manuscript."
             </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="bg-black border border-white/5 rounded-[3rem] p-8 min-h-[400px] relative overflow-hidden flex flex-col">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 mb-6 italic">Handshake Registry Logs</h3>
            
            {metadata ? (
              <div className="space-y-4 animate-in fade-in duration-500">
                {Object.entries(metadata).map(([key, val]) => (
                  <div key={key} className="flex justify-between items-center border-b border-white/5 pb-2">
                    <span className="text-[10px] font-black uppercase text-gray-600">{key}</span>
                    <span className="text-xs font-bold text-white italic truncate max-w-[250px]">{String(val)}</span>
                  </div>
                ))}
                <button className="w-full mt-6 bg-blue-600 text-white py-4 rounded-xl font-black uppercase text-xs tracking-widest hover:scale-[1.01] transition-all flex items-center justify-center gap-2">
                  <Save size={16}/> Purge All Metadata Tags
                </button>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center opacity-10 space-y-4 flex-grow">
                <Settings size={80} className="animate-spin-slow" />
                <p className="text-[10px] font-black uppercase tracking-[0.5em]">Awaiting Archival Data</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { Globe, ShieldAlert, Zap, Info, ShieldCheck, RefreshCw } from 'lucide-react';

export const IPLeakTest: React.FC = () => {
  const [publicIp, setPublicIp] = useState<string>('Loading...');
  const [localIps, setLocalIps] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchIps = async () => {
    setLoading(true);
    try {
      const res = await fetch('https://api.ipify.org?format=json');
      const data = await res.json();
      setPublicIp(data.ip);
    } catch (e) { setPublicIp('Failed to fetch'); }

    // WebRTC Leak Logic (Conceptual Browser Native)
    const pc = new RTCPeerConnection({ iceServers: [{ urls: "stun:stun.l.google.com:19302" }] });
    pc.createDataChannel("");
    pc.onicecandidate = (e) => {
      if (!e.candidate) return;
      const ip = /([0-9]{1,3}(\.[0-9]{1,3}){3})/.exec(e.candidate.candidate);
      if (ip) setLocalIps(prev => Array.from(new Set([...prev, ip[1]])));
    };
    pc.createOffer().then(o => pc.setLocalDescription(o));
    
    setTimeout(() => setLoading(false), 2000);
  };

  useEffect(() => { fetchIps(); }, []);

  return (
    <div className="bg-[#0a0a0a] border border-blue-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-500/10 rounded-2xl text-blue-400"><Globe size={28} /></div>
          <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">WebRTC IP Leak Tracer</h2>
        </div>
        <button onClick={fetchIps} className="p-4 bg-white/5 rounded-xl hover:bg-blue-600 hover:text-black transition-all"><RefreshCw size={20} /></button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/60 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2">
           <span className="text-[10px] font-black uppercase text-gray-500 tracking-widest">Public Address Node</span>
           <div className="text-3xl font-black text-white tabular-nums italic">{publicIp}</div>
           <ShieldCheck size={24} className="text-emerald-500 mt-4" />
        </div>
        <div className="bg-rose-500/5 border border-rose-500/20 p-8 rounded-[2.5rem] flex flex-col items-center justify-center text-center space-y-2">
           <span className="text-[10px] font-black uppercase text-rose-500 tracking-widest">Internal Leak Nodes</span>
           <div className="text-3xl font-black text-rose-400 tabular-nums italic">
             {localIps.length > 0 ? localIps.join(', ') : 'No Leaks Detected'}
           </div>
           {localIps.length > 0 ? <ShieldAlert size={24} className="text-rose-500 mt-4" /> : <ShieldCheck size={24} className="text-emerald-500 mt-4" />}
        </div>
      </div>
    </div>
  );
};


import React, { useState, useEffect } from 'react';
import { TrendingUp, User, Wallet, ShieldCheck, Zap } from 'lucide-react';

export const InfluencerROI: React.FC = () => {
  const [cost, setCost] = useState(500);
  const [followers, setFollowers] = useState(50000);
  const [engagement, setEngagement] = useState(3); // %
  const [conversion, setConversion] = useState(1); // %
  const [aoV, setAoV] = useState(50); // Average Order Value

  const [results, setResults] = useState({ estRevenue: 0, roi: 0, cpa: 0 });

  useEffect(() => {
    const estReach = followers * (engagement / 100);
    const estSales = estReach * (conversion / 100);
    const estRevenue = estSales * aoV;
    const profit = estRevenue - cost;
    const roi = (profit / cost) * 100;
    const cpa = cost / (estSales || 1);
    setResults({ estRevenue, roi, cpa });
  }, [cost, followers, engagement, conversion, aoV]);

  return (
    <div className="bg-[#0a0a0a] border border-purple-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl">
      <div className="flex items-center gap-4 mb-8">
        <div className="p-3 bg-purple-500/10 rounded-2xl text-purple-500"><TrendingUp size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Influencer ROI Predictor</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600 ml-2">Campaign Cost ($)</label>
                <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600 ml-2">Followers</label>
                <input type="number" value={followers} onChange={e => setFollowers(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
              </div>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600 ml-2">Engagement (%)</label>
                <input type="number" value={engagement} onChange={e => setEngagement(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
              </div>
              <div className="space-y-1">
                <label className="text-[8px] font-black uppercase text-gray-600 ml-2">Conversion (%)</label>
                <input type="number" value={conversion} onChange={e => setConversion(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
              </div>
           </div>
           <div className="space-y-1">
             <label className="text-[8px] font-black uppercase text-gray-600 ml-2">Avg. Order Value ($)</label>
             <input type="number" value={aoV} onChange={e => setAoV(Number(e.target.value))} className="w-full bg-black border border-white/5 rounded-xl p-3 text-white font-black" />
           </div>
        </div>
        <div className="bg-purple-600 rounded-[2.5rem] p-10 flex flex-col justify-center items-center text-center space-y-6">
           <div>
              <span className="text-[10px] font-black uppercase text-white/50 tracking-[0.3em]">Projected Revenue</span>
              <div className="text-6xl font-black text-white italic tracking-tighter tabular-nums">${results.estRevenue.toFixed(0)}</div>
           </div>
           <div className="grid grid-cols-2 gap-4 w-full">
              <div className="bg-black/20 p-4 rounded-2xl border border-white/10">
                 <div className="text-[8px] font-black text-white/40 uppercase mb-1">Expected ROI</div>
                 <div className="text-xl font-black text-white">{results.roi.toFixed(0)}%</div>
              </div>
              <div className="bg-black/20 p-4 rounded-2xl border border-white/10">
                 <div className="text-[8px] font-black text-white/40 uppercase mb-1">CPA (Cost/Sale)</div>
                 <div className="text-xl font-black text-white">${results.cpa.toFixed(2)}</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

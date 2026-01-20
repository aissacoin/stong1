
import React, { useState, useEffect, useRef } from 'react';
import { 
  AlarmClock as AlarmIcon, Bell, BellOff, Play, Square, Timer, 
  ShieldCheck, Zap, Info, Clock, Volume2, Plus, Minus, 
  Ship, Bus, Train, ShieldAlert, Ambulance, Truck, Phone, 
  Bug, Music, VolumeX, Speaker, Wind, Radio, CloudLightning
} from 'lucide-react';

interface SoundProfile {
  id: string;
  name: string;
  icon: React.ReactNode;
  url: string; 
}

/**
 * SOVEREIGN AUDIO REGISTRY
 * Using stable high-fidelity direct links for absolute reliability.
 */
const SOUND_PROFILES: SoundProfile[] = [
  { id: 'ship', name: 'Ship Horn', icon: <Ship size={18}/>, url: 'https://actions.google.com/sounds/v1/transportation/ship_horn.ogg' },
  { id: 'train', name: 'Train Blast', icon: <Train size={18}/>, url: 'https://actions.google.com/sounds/v1/transportation/train_horn.ogg' },
  { id: 'emergency', name: 'Emergency', icon: <ShieldAlert size={18} className="text-rose-500"/>, url: 'https://actions.google.com/sounds/v1/emergency/emergency_siren.ogg' },
  { id: 'ambulance', name: 'Ambulance', icon: <Ambulance size={18}/>, url: 'https://actions.google.com/sounds/v1/emergency/ambulance_siren.ogg' },
  { id: 'truck', name: 'Truck Reverse', icon: <Truck size={18}/>, url: 'https://actions.google.com/sounds/v1/transportation/truck_reverse_beep.ogg' },
  { id: 'phone', name: 'Old Phone', icon: <Phone size={18}/>, url: 'https://actions.google.com/sounds/v1/office/phone_ringing.ogg' },
  { id: 'thunder', name: 'Thunder Arc', icon: <CloudLightning size={18} className="text-yellow-500"/>, url: 'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg' },
  { id: 'crickets', name: 'Crickets', icon: <Bug size={18}/>, url: 'https://actions.google.com/sounds/v1/animals/crickets_chirping.ogg' },
  { id: 'wind', name: 'Deep Wind', icon: <Wind size={18}/>, url: 'https://actions.google.com/sounds/v1/weather/wind_howling.ogg' },
  { id: 'radio', name: 'Radio Static', icon: <Radio size={18}/>, url: 'https://actions.google.com/sounds/v1/science_fiction/radio_static.ogg' }
];

export const AlarmClock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState({ h: '08', m: '00', p: 'AM' });
  const [isAlarmActive, setIsAlarmActive] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [timeUntil, setTimeUntil] = useState<string>('');
  const [selectedSound, setSelectedSound] = useState<SoundProfile>(SOUND_PROFILES[0]);
  const [volume, setVolume] = useState(0.8);
  const [isPreviewing, setIsPreviewing] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sovereignty Protocol: Standard 1234567890 Numerals
  const toStd = (n: number | string) => {
    return String(n).replace(/[٠-٩]/g, d => "0123456789"["٠١٢٣٤٥٦٧٨٩".indexOf(d)]);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now);
      if (isAlarmActive && !isRinging) {
        checkAlarm(now);
        updateCountdown(now);
      }
    }, 1000);
    return () => clearInterval(timer);
  }, [isAlarmActive, alarmTime, isRinging]);

  const updateCountdown = (now: Date) => {
    let alarmH = parseInt(toStd(alarmTime.h));
    const alarmM = parseInt(toStd(alarmTime.m));
    if (alarmTime.p === 'PM' && alarmH < 12) alarmH += 12;
    if (alarmTime.p === 'AM' && alarmH === 12) alarmH = 0;

    const alarmDate = new Date(now);
    alarmDate.setHours(alarmH, alarmM, 0, 0);
    if (alarmDate <= now) alarmDate.setDate(alarmDate.getDate() + 1);

    const diff = alarmDate.getTime() - now.getTime();
    const h = Math.floor(diff / (1000 * 60 * 60));
    const m = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((diff % (1000 * 60)) / 1000);
    setTimeUntil(`${toStd(h)}h ${toStd(m)}m ${toStd(s)}s remaining`);
  };

  const checkAlarm = (now: Date) => {
    let alarmH = parseInt(toStd(alarmTime.h));
    const alarmM = parseInt(toStd(alarmTime.m));
    if (alarmTime.p === 'PM' && alarmH < 12) alarmH += 12;
    if (alarmTime.p === 'AM' && alarmH === 12) alarmH = 0;

    if (now.getHours() === alarmH && now.getMinutes() === alarmM && now.getSeconds() === 0) {
      triggerAlarm();
    }
  };

  const triggerAlarm = () => {
    setIsRinging(true);
    playSovereignAudio(true);
  };

  const playSovereignAudio = (loop: boolean) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    const audio = new Audio(selectedSound.url);
    audio.loop = loop;
    audio.volume = volume;
    audio.play().catch(e => console.error("Acoustic node failure:", e));
    audioRef.current = audio;
  };

  const stopAlarm = () => {
    setIsRinging(false);
    setIsAlarmActive(false);
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current = null;
    }
  };

  const previewSound = (profile: SoundProfile) => {
    setSelectedSound(profile);
    if (isPreviewing) return;
    
    setIsPreviewing(true);
    const audio = new Audio(profile.url);
    audio.volume = volume;
    audio.play().catch(e => {
      console.error("Preview node failure:", e);
      setIsPreviewing(false);
    });
    
    setTimeout(() => {
      audio.pause();
      setIsPreviewing(false);
    }, 4000); // 4 second preview
  };

  const adjustAlarm = (type: 'h' | 'm', amount: number) => {
    if (type === 'h') {
      let h = parseInt(toStd(alarmTime.h)) + amount;
      if (h > 12) h = 1; else if (h < 1) h = 12;
      setAlarmTime(prev => ({ ...prev, h: h.toString().padStart(2, '0') }));
    } else {
      let m = parseInt(toStd(alarmTime.m)) + amount;
      if (m >= 60) m = 0; else if (m < 0) m = 59;
      setAlarmTime(prev => ({ ...prev, m: m.toString().padStart(2, '0') }));
    }
  };

  return (
    <div className="space-y-12 animate-in fade-in duration-1000">
      <div className={`bg-[#0a0a0a] border ${isRinging ? 'border-yellow-500 shadow-[0_0_100px_rgba(234,179,8,0.3)] ring-4 ring-yellow-500/20 animate-pulse' : 'border-cyan-500/30'} rounded-[3.5rem] p-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden transition-all duration-500`}>
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex items-center gap-4">
            <div className={`p-4 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-400 ${isRinging ? 'animate-bounce' : ''}`}>
              <AlarmIcon size={32} />
            </div>
            <div>
              <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter leading-none">Chronos Awakening Node</h2>
              <p className="text-[10px] font-bold text-cyan-500/40 uppercase tracking-[0.4em] mt-1 italic">Professional High-Fidelity Acoustic Sync</p>
            </div>
          </div>
          <div className="flex items-center gap-2 px-5 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-xl">
             <ShieldCheck size={14} className="text-emerald-400" />
             <span className="text-[9px] font-black uppercase tracking-widest text-emerald-400/60 tabular-nums">Standard 1234567890 Active</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Time Config */}
          <div className="lg:col-span-4 space-y-10 border-r border-white/5 pr-10">
            <div className="text-center space-y-2">
              <div className="text-6xl font-black text-white italic tabular-nums tracking-tighter">
                {toStd(currentTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit' }))}
              </div>
              <div className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Live Registry Time</div>
            </div>

            <div className="bg-black/60 border border-white/5 p-8 rounded-[3rem] space-y-8 shadow-inner">
               <div className="flex items-center gap-10 justify-center">
                 <div className="flex flex-col items-center">
                   <button onClick={() => adjustAlarm('h', 1)} className="p-2 text-cyan-500 hover:bg-white/5 rounded-lg transition-transform active:scale-90"><Plus size={18}/></button>
                   <span className="text-5xl font-black text-white tabular-nums">{toStd(alarmTime.h)}</span>
                   <button onClick={() => adjustAlarm('h', -1)} className="p-2 text-cyan-500 hover:bg-white/5 rounded-lg transition-transform active:scale-90"><Minus size={18}/></button>
                 </div>
                 <div className="text-4xl font-black text-gray-800 animate-pulse">:</div>
                 <div className="flex flex-col items-center">
                   <button onClick={() => adjustAlarm('m', 1)} className="p-2 text-cyan-500 hover:bg-white/5 rounded-lg transition-transform active:scale-90"><Plus size={18}/></button>
                   <span className="text-5xl font-black text-white tabular-nums">{toStd(alarmTime.m)}</span>
                   <button onClick={() => adjustAlarm('m', -1)} className="p-2 text-cyan-500 hover:bg-white/5 rounded-lg transition-transform active:scale-90"><Minus size={18}/></button>
                 </div>
                 <div className="flex flex-col gap-2">
                   <button onClick={() => setAlarmTime({...alarmTime, p: 'AM'})} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${alarmTime.p === 'AM' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-600'}`}>AM</button>
                   <button onClick={() => setAlarmTime({...alarmTime, p: 'PM'})} className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${alarmTime.p === 'PM' ? 'bg-cyan-500 text-black shadow-lg shadow-cyan-500/20' : 'bg-white/5 text-gray-600'}`}>PM</button>
                 </div>
               </div>
               
               <div className="space-y-5">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-[10px] font-black text-gray-500 uppercase tracking-widest italic">Acoustic Gain: {toStd(Math.round(volume * 100))}%</span>
                    {volume === 0 ? <VolumeX size={16} className="text-rose-500"/> : <Speaker size={16} className="text-cyan-500"/>}
                  </div>
                  <input 
                    type="range" min="0" max="1" step="0.01" value={volume} 
                    onChange={(e) => setVolume(parseFloat(e.target.value))}
                    className="w-full h-2 bg-white/5 rounded-full appearance-none cursor-pointer accent-cyan-500"
                  />
               </div>
            </div>

            <button 
              onClick={isRinging ? stopAlarm : () => setIsAlarmActive(!isAlarmActive)}
              className={`w-full py-6 rounded-[2.5rem] font-black text-2xl uppercase tracking-tighter italic flex items-center justify-center gap-4 transition-all shadow-2xl ${isRinging ? 'bg-rose-600 text-white animate-pulse' : isAlarmActive ? 'bg-white/5 border border-white/10 text-rose-500' : 'bg-cyan-600 text-black hover:scale-[1.02]'}`}
            >
              {isRinging ? <Square size={28} fill="currentColor"/> : isAlarmActive ? <BellOff size={28}/> : <Play size={28} fill="currentColor"/>}
              {isRinging ? 'SILENCE NODE' : isAlarmActive ? 'ABORT TRIGGER' : 'ENGAGE NODE'}
            </button>
          </div>

          {/* Sound Library */}
          <div className="lg:col-span-8 space-y-8">
            <div className="flex items-center gap-3 px-2">
              <div className="p-2 bg-cyan-500/10 rounded-xl text-cyan-400">
                <Volume2 size={20} />
              </div>
              <label className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 italic">Internet Audio Registry (High-Fidelity Sources)</label>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 max-h-[500px] overflow-y-auto custom-scrollbar pr-4">
              {SOUND_PROFILES.map((profile) => (
                <button
                  key={profile.id}
                  onClick={() => previewSound(profile)}
                  className={`flex flex-col items-center justify-center p-6 rounded-[2.5rem] border transition-all gap-4 group relative ${selectedSound.id === profile.id ? 'bg-cyan-500/10 border-cyan-500 shadow-[0_0_30px_rgba(6,182,212,0.1)]' : 'bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]'}`}
                >
                  <div className={`p-4 rounded-2xl transition-all duration-500 ${selectedSound.id === profile.id ? 'bg-cyan-500 text-black scale-110 shadow-lg' : 'bg-black text-cyan-500/40 group-hover:text-cyan-400'}`}>
                    {profile.icon}
                  </div>
                  <div className="text-center">
                    <span className={`text-[10px] font-black uppercase tracking-widest block ${selectedSound.id === profile.id ? 'text-white' : 'text-gray-600 group-hover:text-gray-400'}`}>{profile.name}</span>
                    <span className="text-[7px] font-bold text-gray-700 uppercase tracking-tighter mt-1 block italic">Live Link</span>
                  </div>
                  {selectedSound.id === profile.id && (
                    <div className="absolute top-4 right-4 flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-cyan-500 animate-ping"></div>
                    </div>
                  )}
                </button>
              ))}
            </div>

            <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 flex items-center justify-between shadow-inner">
               <div className="flex items-center gap-6">
                 <div className={`p-4 rounded-2xl ${isAlarmActive ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-white/5 text-gray-700'}`}>
                    <Timer size={28} className={isAlarmActive ? 'animate-spin-slow' : ''} />
                 </div>
                 <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500 italic mb-1">Temporal Sync Status</p>
                    <p className={`text-xl font-black uppercase tabular-nums tracking-tight ${isAlarmActive ? 'text-white' : 'text-gray-700'}`}>{isAlarmActive ? timeUntil : 'Awaiting Parameters'}</p>
                 </div>
               </div>
               <div className="flex gap-2">
                 {[1,2,3,4].map(i => <div key={i} className={`w-2 h-2 rounded-full ${isAlarmActive ? 'bg-emerald-500 shadow-[0_0_100px_rgba(16,185,129,0.5)] animate-pulse' : 'bg-gray-800'}`} style={{ animationDelay: `${i*250}ms` }}></div>)}
               </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-10 opacity-40 py-6 border-t border-white/5">
          <div className="flex items-center gap-3">
            <Radio size={16} className="text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">Cloud Audio Stream</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap size={16} className="text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">Zero-Latency Synthesis</span>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck size={16} className="text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">Verified Sound Registry</span>
          </div>
          <div className="flex items-center gap-3">
            <Info size={16} className="text-cyan-400" />
            <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white italic">Infinite Loop Logic</span>
          </div>
        </div>
      </div>
    </div>
  );
};

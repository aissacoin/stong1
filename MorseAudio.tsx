
import React, { useState, useRef } from 'react';
import { Radio, Play, Pause, RefreshCw, Volume2, ShieldCheck, Zap, Info } from 'lucide-react';

const MORSE_CODE: any = {
  'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
  'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
  'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
  'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
  'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
  '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
  '8': '---..', '9': '----.', ' ': '/'
};

export const MorseAudio: React.FC = () => {
  const [text, setText] = useState('STRONG TOOLS');
  const [playing, setPlaying] = useState(false);
  const audioCtx = useRef<AudioContext | null>(null);

  const textToMorse = (str: string) => str.toUpperCase().split('').map(c => MORSE_CODE[c] || '').join(' ');

  const playSignal = async (duration: number) => {
    if (!audioCtx.current) audioCtx.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const osc = audioCtx.current.createOscillator();
    const gain = audioCtx.current.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.current.destination);
    osc.frequency.value = 600;
    osc.start();
    await new Promise(r => setTimeout(r, duration));
    osc.stop();
  };

  const playMorse = async () => {
    if (playing) return;
    setPlaying(true);
    const code = textToMorse(text);
    const dot = 100;
    const dash = 300;

    for (const char of code) {
      if (char === '.') await playSignal(dot);
      else if (char === '-') await playSignal(dash);
      else if (char === ' ') await new Promise(r => setTimeout(r, dot));
      await new Promise(r => setTimeout(r, dot));
    }
    setPlaying(false);
  };

  return (
    <div className="bg-[#0a0a0a] border border-cyan-500/30 rounded-[3rem] p-8 max-w-4xl mx-auto shadow-2xl relative overflow-hidden">
      <div className="flex items-center gap-4 mb-10">
        <div className="p-3 bg-cyan-500/10 rounded-2xl text-cyan-400"><Volume2 size={28} /></div>
        <h2 className="text-2xl font-black text-white uppercase italic tracking-tighter">Morse Code Audio Synth</h2>
      </div>
      <div className="space-y-8">
        <textarea value={text} onChange={e=>setText(e.target.value)} className="w-full h-32 bg-black border border-white/5 rounded-2xl p-6 text-white text-xl font-black outline-none focus:border-cyan-500/40" />
        <div className="p-8 bg-black rounded-[2rem] border border-white/5 font-mono text-cyan-500 text-2xl tracking-[0.5em] break-all">
           {textToMorse(text)}
        </div>
        <button onClick={playMorse} disabled={playing} className="w-full bg-cyan-600 text-black py-6 rounded-2xl font-black uppercase flex items-center justify-center gap-3 hover:scale-[1.01] transition-all">
          {playing ? <RefreshCw className="animate-spin" /> : <Play fill="black" />} {playing ? 'Transmitting Signal...' : 'Engage Audio Playback'}
        </button>
      </div>
    </div>
  );
};

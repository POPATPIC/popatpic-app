import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pixelFramePng from '../assets/frames/pixel-frame.png';

const SelectFrame = () => {
  const navigate = useNavigate();
  const [activeCount, setActiveCount] = useState(4);

  const allFrames = [
    { 
      id: 'classic-purple', 
      count: 4, 
      name: 'Pixel Pastel', 
      image: pixelFramePng, 
      tag: 'Popular', 
      desc: 'Soft neon, playful and vibrant.',
      figmaWidth: 2756, 

      slots: [
        { x: 136, y: 178, w: 1171, h: 1437 },   
        { x: 1449, y: 178, w: 1171, h: 1437 },  
        { x: 136, y: 1778, w: 1171, h: 1437 },  
        { x: 1449, y: 1778, w: 1171, h: 1437 }, 
      ]
    },
    { id: 'minimal-white', count: 4, name: 'Classic White', image: null, tag: 'New', desc: 'Clean, minimal, timeless.', slots: [] },
  ];

  const filteredFrames = allFrames.filter((f) => f.count === activeCount);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fb] text-[#191c1e]">
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(139,92,246,0.15)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter text-[#6b38d4]">Lumina Booth</button>
          <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold text-[#494454]">← Back</button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10">
        <section className="mb-14">
          <h2 className="mb-6 text-3xl font-bold tracking-tight md:text-4xl">How many poses?</h2>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => setActiveCount(num)}
                className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 text-xl font-bold transition-all md:h-20 md:w-20 ${
                  activeCount === num ? 'scale-105 border-[#6b38d4] bg-[#6b38d4] text-white shadow-lg' : 'border-white/50 bg-white/70 text-[#494454]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h2 className="mb-8 text-2xl font-bold tracking-tight md:text-3xl">Curated frames</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredFrames.map((frame) => (
              <button
                key={frame.id}

                onClick={() => navigate('/booth', { state: { frameCount: frame.count, frameImage: frame.image, slots: frame.slots, figmaWidth: frame.figmaWidth } })}
                className="group text-left"
              >
                <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 p-4 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#eceef0]">
                    {frame.image ? (
                      <img src={frame.image} alt={frame.name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-[#cbc3d7]">
                        <span className="text-5xl">🖼</span><p className="mt-2 text-xs font-semibold">No preview</p>
                      </div>
                    )}
                    <div className="absolute left-3 top-3 rounded-full bg-[#fd56a7] px-3 py-1 text-[10px] font-bold uppercase text-white">{frame.tag}</div>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#191c1e]">{frame.name}</h3>
                    <p className="mt-1 text-sm text-[#494454]">{frame.desc}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SelectFrame;
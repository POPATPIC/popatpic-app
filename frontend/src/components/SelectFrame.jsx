import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pixelFramePng from '../assets/frames/pixel-frame.png';

const SelectFrame = () => {
  const navigate = useNavigate();
  const [activeCount, setActiveCount] = useState(4);

  const allFrames = [
    { id: 'classic-purple', count: 4, name: 'Pixel Pastel', image: pixelFramePng, tag: 'Popular', desc: 'Soft neon, playful and vibrant.' },
    { id: 'minimal-white', count: 4, name: 'Classic White', image: null, tag: 'New', desc: 'Clean, minimal, timeless.' },
    { id: 'solo-1', count: 1, name: 'Single Shot', image: null, tag: 'Solo', desc: 'Perfect for portraits and profile photos.' },
  ];

  const filteredFrames = allFrames.filter((f) => f.count === activeCount);

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f9fb] text-[#191c1e]">
      {/* Navbar */}
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-[0_4px_30px_rgba(139,92,246,0.15)]">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 md:px-10">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-tighter text-[#6b38d4] transition-opacity hover:opacity-80"
          >
            Lumina Booth
          </button>

          <div className="hidden items-center gap-2 md:flex">
            <div className="rounded-full bg-[#6b38d4]/10 px-4 py-2 text-sm font-semibold text-[#6b38d4]">
              Select your frame
            </div>
          </div>

          <button
            onClick={() => navigate('/')}
            className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold text-[#494454] backdrop-blur-sm transition-colors hover:border-[#6b38d4] hover:text-[#6b38d4]"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-5 pb-20 pt-28 md:px-10">
        {/* Hero */}
        <section className="relative mb-14 overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 p-6 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] md:p-10">
          <div className="absolute -left-10 top-10 h-40 w-40 rounded-full bg-[#6b38d4]/15 blur-[80px]" />
          <div className="absolute -bottom-10 right-10 h-56 w-56 rounded-full bg-[#fd56a7]/15 blur-[100px]" />

          <div className="relative grid gap-8 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <div className="mb-5 inline-flex items-center rounded-full border border-[#6b38d4]/20 bg-[#6b38d4]/10 px-4 py-1.5 text-sm font-semibold text-[#6b38d4]">
                Choose the mood
              </div>

              <h1 className="mb-5 text-4xl font-extrabold tracking-tighter leading-tight md:text-6xl">
                Pick your <span className="bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] bg-clip-text text-transparent">frame style</span>
              </h1>

              <p className="max-w-2xl text-lg text-[#494454]">
                Select how many poses you want, then choose the frame that matches your vibe before starting the booth session.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-[1.5rem] border border-white/50 bg-white/70 p-5 backdrop-blur-sm">
                <p className="text-sm text-[#494454]">Available styles</p>
                <p className="mt-2 text-3xl font-bold text-[#6b38d4]">{filteredFrames.length}</p>
              </div>
              <div className="rounded-[1.5rem] border border-white/50 bg-white/70 p-5 backdrop-blur-sm">
                <p className="text-sm text-[#494454]">Pose count</p>
                <p className="mt-2 text-3xl font-bold text-[#fd56a7]">{activeCount}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Pose selector */}
        <section className="mb-14">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-2xl font-bold tracking-tight md:text-3xl">How many poses?</h2>
            <p className="hidden text-sm text-[#494454] md:block">Tap a number to filter the frames below</p>
          </div>

          <div className="flex gap-3 overflow-x-auto pb-2">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => setActiveCount(num)}
                className={`flex h-16 w-16 flex-shrink-0 items-center justify-center rounded-2xl border-2 text-xl font-bold transition-all md:h-20 md:w-20 ${
                  activeCount === num
                    ? 'scale-105 border-[#6b38d4] bg-[#6b38d4] text-white shadow-lg'
                    : 'border-white/50 bg-white/70 text-[#494454] backdrop-blur-sm hover:border-[#6b38d4]/40 hover:text-[#6b38d4]'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </section>

        {/* Frames grid */}
        <section>
          <div className="mb-8 flex items-end justify-between">
            <div>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">Curated frames</h2>
              <p className="mt-2 text-[#494454]">Choose one layout and continue to the booth.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {filteredFrames.map((frame) => (
              <button
                key={frame.id}
                onClick={() => navigate('/booth', { state: { frameCount: frame.count, frameImage: frame.image } })}
                className="group text-left"
              >
                <div className="overflow-hidden rounded-[2rem] border border-white/50 bg-white/70 p-4 shadow-[0_4px_30px_rgba(139,92,246,0.15)] backdrop-blur-[20px] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_40px_rgba(253,86,167,0.3)]">
                  <div className="relative mb-4 aspect-[3/4] overflow-hidden rounded-[1.5rem] bg-[#eceef0]">
                    {frame.image ? (
                      <img
                        src={frame.image}
                        alt={frame.name}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full w-full flex-col items-center justify-center text-[#cbc3d7]">
                        <span className="text-5xl">🖼</span>
                        <p className="mt-2 text-xs font-semibold uppercase tracking-widest">No preview</p>
                      </div>
                    )}

                    <div className="absolute left-3 top-3 rounded-full bg-[#fd56a7] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                      {frame.tag}
                    </div>

                    <div className="absolute bottom-3 left-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-[#191c1e] backdrop-blur-sm">
                      {frame.count} poses
                    </div>
                  </div>

                  <div className="flex items-center justify-between px-1">
                    <div>
                      <h3 className="text-xl font-bold text-[#191c1e]">{frame.name}</h3>
                      <p className="mt-1 text-sm text-[#494454]">{frame.desc}</p>
                    </div>

                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#6b38d4]/10 text-[#6b38d4] transition-colors group-hover:bg-[#6b38d4] group-hover:text-white">
                      →
                    </div>
                  </div>
                </div>
              </button>
            ))}

            {filteredFrames.length === 0 && (
              <div className="col-span-full rounded-[2rem] border border-dashed border-[#cbc3d7] bg-white/60 py-20 text-center backdrop-blur-sm">
                <p className="font-semibold text-[#494454]">Design catalogs for {activeCount} poses are coming soon.</p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SelectFrame;
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import pixelFramePng from '../assets/frames/pixel-frame.png';
import cuteFramePng from '../assets/frames/cute-frame.png';
import circusFramePng from '../assets/frames/circus-frame.png';
import monochromeFramePng from '../assets/frames/monochrome-frame.png';
import tapeFramePng from '../assets/frames/tape-frame.png';

const SelectFrame = () => {
  const navigate = useNavigate();
  const [activeCount, setActiveCount] = useState(4);
  const [allFrames, setAllFrames] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const framesSectionRef = useRef(null);
  const sliderRef = useRef(null);

  useEffect(() => {
    const imageMap = {
      'pixel-frame.png': pixelFramePng,
      'cute-frame.png': cuteFramePng,
      'circus-frame.png': circusFramePng,
      'monochrome-frame.png': monochromeFramePng,
      'tape-frame.png': tapeFramePng
    };

    fetch('https://popatpic-g03qsvzg3-karima-ulya-s-projects.vercel.app/frames')
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((dbFrame) => {
          let parsedSlots = dbFrame.slots;
          if (typeof parsedSlots === 'string') {
            parsedSlots = JSON.parse(parsedSlots);
          }
          return {
            id: dbFrame.id,
            name: dbFrame.name,
            count: dbFrame.pose_count,
            image: imageMap[dbFrame.image_url] || null,
            desc: 'Premium curated frame for your best moments.',
            figmaWidth: dbFrame.figma_width,
            slots: parsedSlots
          };
        });
        setAllFrames(formattedData);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error("Gagal menarik data API:", err);
        setIsLoading(false);
      });
  }, []);

  const filteredFrames = allFrames.filter((f) => f.count === activeCount);

  // Auto-Scroll saat milih pose
  const handlePoseSelect = (num) => {
    setActiveCount(num);
    setTimeout(() => {
      framesSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 150);
  };

  const scrollSlider = (direction) => {
    if (sliderRef.current) {
      const scrollAmount = 350;
      sliderRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-[#f7f9fb] text-[#191c1e] font-sans scroll-smooth">
      
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <button onClick={() => navigate('/')} className="text-2xl font-extrabold tracking-tighter text-[#6b38d4] transition-transform hover:scale-105">
            Pop@Pic!
          </button>
          <button 
            onClick={() => navigate('/')} 
            className="rounded-full border border-[#e0e3e5] bg-white px-6 py-2 text-sm font-bold text-[#494454] shadow-sm transition-all hover:bg-gray-50 hover:shadow"
          >
            ← Back
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6">
        
        {/* SECTION 1: POSE SELECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center text-center pt-20">
          {/* Teks "poses" dikasih warna gradien! */}
          <h2 className="mb-8 text-4xl font-extrabold tracking-tighter md:text-6xl">
            How many <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b38d4] to-[#fd56a7]">poses?</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 max-w-2xl">
            {[1, 2, 4, 6, 8].map((num) => (
              <button
                key={num}
                onClick={() => handlePoseSelect(num)}
                className={`flex items-center justify-center rounded-full px-8 py-3.5 text-base font-bold transition-all duration-300 ${
                  activeCount === num 
                    ? 'bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] text-white shadow-lg scale-105' 
                    : 'bg-white border border-[#e0e3e5] text-[#494454] shadow-sm hover:border-[#6b38d4] hover:text-[#6b38d4] hover:-translate-y-1'
                }`}
              >
                {num} Poses
              </button>
            ))}
          </div>
          <p className="mt-8 text-sm text-gray-400 animate-bounce">Select to continue ↓</p>
        </section>

        {/* SECTION 2: FRAME GALLERY */}
        <section ref={framesSectionRef} className="min-h-screen flex flex-col justify-center pt-10 pb-20">
          <div className="w-full">
            
            {/* Heading Curated Frames diubah jadi label kecil elegan */}
            <h2 className="mb-6 text-sm font-bold tracking-widest text-gray-400 uppercase text-center">
              Curated Frames
            </h2>
            
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-20 text-[#6b38d4]">
                <div className="w-10 h-10 border-4 border-[#6b38d4] border-t-transparent rounded-full animate-spin mb-4"></div>
                <p className="font-bold animate-pulse">Memuat desain frame...</p>
              </div>
            ) : (
              <div className="relative group w-full">
                
                {/* Tombol Panah Kiri */}
                <button 
                  onClick={() => scrollSlider('left')}
                  className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 z-10 h-12 w-12 items-center justify-center rounded-full bg-white text-[#6b38d4] shadow-xl border border-[#e0e3e5] opacity-0 transition-opacity group-hover:opacity-100 hover:scale-110 ${filteredFrames.length > 3 ? 'md:flex hidden' : 'hidden'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                  </svg>
                </button>

                {/* Slider Container */}
                <div 
                  ref={sliderRef}
                  className={`flex gap-8 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 px-2 no-scrollbar ${filteredFrames.length < 4 ? 'justify-center' : ''}`}
                  style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                  {filteredFrames.map((frame) => (
                    <button
                      key={frame.id}
                      onClick={() => navigate('/booth', { state: { frameCount: frame.count, frameImage: frame.image, slots: frame.slots, figmaWidth: frame.figmaWidth } })}
                      className="group text-left min-w-[280px] max-w-[320px] shrink-0 snap-center"
                    >
                      <div className="overflow-hidden rounded-[2.5rem] border border-[#e0e3e5] bg-white p-5 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:border-white h-full">
                        <div className="relative mb-5 aspect-[3/4] w-full overflow-hidden rounded-[1.5rem] bg-[#f3ebff]">
                          {frame.image ? (
                            <img 
                              src={frame.image} 
                              alt={frame.name} 
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" 
                            />
                          ) : (
                            <div className="flex h-full w-full flex-col items-center justify-center text-[#cbc3d7]">
                              <span className="text-5xl mb-2">🖼</span>
                              <p className="text-xs font-bold uppercase tracking-widest">No preview</p>
                            </div>
                          )}
                        </div>
                        
                        <div className="px-2 pb-2 text-center md:text-left">
                          <h3 className="text-2xl font-extrabold text-[#191c1e] transition-colors group-hover:text-[#6b38d4]">{frame.name}</h3>
                          <p className="mt-1 text-sm font-medium text-[#494454] line-clamp-2">{frame.desc}</p>
                        </div>
                      </div>
                    </button>
                  ))}

                  {filteredFrames.length === 0 && (
                    <div className="w-full shrink-0 rounded-[2.5rem] border-2 border-dashed border-[#e0e3e5] bg-white/50 py-24 text-center snap-center max-w-lg">
                      <span className="text-4xl mb-4 block">👀</span>
                      <p className="text-lg font-bold text-[#494454]">Belum ada frame untuk {activeCount} poses.</p>
                      <p className="text-sm text-gray-400 mt-1">Coba pilih jumlah pose yang lain ya!</p>
                    </div>
                  )}
                </div>

                {/* Tombol Panah Kanan */}
                <button 
                  onClick={() => scrollSlider('right')}
                  className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 z-10 h-12 w-12 items-center justify-center rounded-full bg-white text-[#6b38d4] shadow-xl border border-[#e0e3e5] opacity-0 transition-opacity group-hover:opacity-100 hover:scale-110 ${filteredFrames.length > 3 ? 'md:flex hidden' : 'hidden'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </button>

              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default SelectFrame;
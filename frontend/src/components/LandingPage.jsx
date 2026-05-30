import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  const previewFrames = [
    {
      id: 1,
      name: 'Pixel Pastel',
      desc: 'Soft neon, playful and vibrant.',
      image: 'https://i.pinimg.com/736x/a4/d1/83/a4d1839f71769b445c33808ea80d43ac.jpg', 
    },
    {
      id: 2,
      name: 'Dark Aesthetic',
      desc: 'Moody, elegant, and bold.',
      image: 'https://i.pinimg.com/736x/68/2e/eb/682eebc81470f9a2a9278e9978c1152e.jpg',
    },
    {
      id: 3,
      name: 'Floral Spring',
      desc: 'Fresh, cute, and blooming.',
      image: 'https://i.pinimg.com/736x/9a/33/2c/9a332cb85ba736685bf9ac2ad8d09c77.jpg',
    }
  ];

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] font-sans scroll-smooth">
      
      {/* NAVBAR */}
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/80 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <div className="text-2xl font-extrabold tracking-tighter text-[#6b38d4]">Pop@Pic!</div>
          
          <nav className="hidden md:flex gap-8 text-sm font-semibold text-[#494454]">
            <a href="#home" className="hover:text-[#6b38d4] transition-colors">Home</a>
            <a href="#frames" className="hover:text-[#6b38d4] transition-colors">Frames</a>
            <a href="#about" className="hover:text-[#6b38d4] transition-colors">About</a>
          </nav>

          <button 
            onClick={() => navigate('/select-frame')}
            className="rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-6 py-2.5 text-sm font-bold text-white shadow-md hover:scale-105 transition-transform"
          >
            Start Session
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <main id="home" className="mx-auto max-w-7xl px-6 pt-32 pb-20 md:px-12 md:pt-36">
        <section className="flex flex-col-reverse items-center gap-12 lg:flex-row lg:justify-between">
          
          {/* Teks Kiri */}
          <div className="flex-1 text-center lg:text-left lg:pr-10 z-20">
            <div className="inline-block rounded-full bg-[#f3ebff] px-4 py-1.5 text-xs font-bold text-[#6b38d4] mb-6 border border-[#e9d5ff]">
              Live Photobooth Experience
            </div>
            <h1 className="text-5xl font-extrabold tracking-tighter md:text-7xl leading-[1.1] mb-6">
              Snap. <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b38d4] to-[#fd56a7]">Style.</span><br/>Share.
            </h1>
            <p className="mb-8 text-lg text-[#494454] max-w-md mx-auto lg:mx-0">
              Turn ordinary moments into electric memories. Choose your vibe, strike a pose, and instantly share high-energy photos.
            </p>
            <button 
              onClick={() => navigate('/select-frame')}
              className="rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-8 py-4 text-base font-bold text-white shadow-xl hover:scale-105 transition-transform"
            >
              Take a Photo Now
            </button>
          </div>

          {/* Gambar Kanan (Grup Tumpukan Kartu Polaroid) */}
          <div className="flex-1 flex justify-center lg:justify-end w-full">
            <div className="w-full max-w-[320px] lg:max-w-[400px] aspect-[4/5] relative mt-12 lg:mt-4 group cursor-pointer">
              
              {/* Bayangan Belakang yang ikut membesar saat di-hover */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#6b38d4]/30 to-[#fd56a7]/30 rounded-[3rem] blur-3xl transform rotate-3 transition-transform duration-700 group-hover:rotate-12 group-hover:scale-110"></div>
              
              {/* Tumpukan Kartu 1: Belakang Kiri */}
              <img 
                src="https://i.pinimg.com/1200x/b5/c5/d3/b5c5d38cfe741f85c9e63c9252054852.jpg" 
                alt="Card left" 
                className="absolute top-4 left-0 w-2/3 aspect-[3/4] object-cover rounded-2xl shadow-xl border-[6px] border-white transform -rotate-12 transition-all duration-700 group-hover:-translate-x-10 group-hover:-translate-y-4 group-hover:-rotate-[20deg] group-hover:shadow-2xl z-10"
              />

              {/* Tumpukan Kartu 2: Belakang Kanan */}
              <img 
                src="https://i.pinimg.com/1200x/5b/61/1f/5b611f4d0ab4792a02ce0bd4ed88016f.jpg" 
                alt="Card right" 
                className="absolute top-10 right-0 w-2/3 aspect-[3/4] object-cover rounded-2xl shadow-xl border-[6px] border-white transform rotate-12 transition-all duration-700 group-hover:translate-x-12 group-hover:translate-y-2 group-hover:rotate-[24deg] group-hover:shadow-2xl z-10"
              />

              {/* Tumpukan Kartu 3: Utama / Depan Tengah */}
              <img 
                src="https://i.pinimg.com/1200x/59/1f/01/591f01ab34c51059eb3ac03c9b95d48e.jpg" 
                alt="Main card" 
                className="absolute top-12 left-1/2 -translate-x-1/2 w-[75%] aspect-[3/4] object-cover rounded-3xl shadow-2xl border-[6px] border-white transform rotate-2 transition-all duration-700 group-hover:-translate-y-8 group-hover:rotate-0 group-hover:scale-105 z-20"
              />
              
            </div>
          </div>

        </section>
      </main>

      {/* FRAMES SECTION */}
      <section id="frames" className="bg-white py-24">
        <div className="mx-auto max-w-7xl px-6 md:px-12">
          <div className="mb-12 text-center lg:text-left flex flex-col lg:flex-row justify-between items-end gap-4">
            <div>
              <h2 className="text-3xl font-extrabold md:text-4xl">Trending Frames</h2>
              <p className="mt-3 text-[#494454]">Pick a layout that matches your aesthetic.</p>
            </div>
            <button onClick={() => navigate('/select-frame')} className="text-[#6b38d4] font-bold hover:underline">
              View all frames
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {previewFrames.map((frame) => (
              <button 
                key={frame.id}
                onClick={() => navigate('/select-frame')}
                className="group flex flex-col text-left rounded-[2rem] bg-[#f7f9fb] p-4 border border-[#e0e3e5] hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="aspect-video w-full overflow-hidden rounded-[1.5rem] bg-gray-200 mb-4">
                  <img src={frame.image} alt={frame.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                </div>
                <h3 className="text-xl font-bold text-[#191c1e] px-2">{frame.name}</h3>
                <p className="text-sm text-[#494454] px-2 mt-1 pb-2">{frame.desc}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="py-24">
        <div className="mx-auto max-w-5xl px-6 text-center md:px-12">
          <h2 className="text-3xl font-extrabold md:text-4xl mb-6">Built for Memories</h2>
          <p className="text-lg text-[#494454] leading-relaxed mb-10">
            Pop@Pic! is an interactive digital photobooth experience designed to capture your best moments instantly. 
            Built with modern web technologies, we bring the classic arcade photobooth right to your personal device. 
            No physical prints needed—just snap, style with our custom frames, and scan the QR code to save your memories forever.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
             <span className="px-5 py-2.5 bg-white border border-[#e0e3e5] rounded-full text-sm font-bold text-[#6b38d4]">High Quality Capture</span>
             <span className="px-5 py-2.5 bg-white border border-[#e0e3e5] rounded-full text-sm font-bold text-[#6b38d4]">Aesthetic Frames</span>
             <span className="px-5 py-2.5 bg-white border border-[#e0e3e5] rounded-full text-sm font-bold text-[#6b38d4]">Instant QR Download</span>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#e0e3e5] bg-white py-8 text-center text-sm font-semibold text-gray-400">
        <p>© 2026 Pop@Pic! Photobooth. All rights reserved.</p>
      </footer>

    </div>
  );
};

export default LandingPage;
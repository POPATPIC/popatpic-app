import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pixelFramePng from '../assets/frames/pixel-frame.png';

const BoothPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const frameCount = location.state?.frameCount || 4;
  const frameImage = location.state?.frameImage || pixelFramePng;

  const [countdown, setCountdown] = useState(null);
  const [isShooting, setIsShooting] = useState(false);
  const [photos, setPhotos] = useState([]);

  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const shots = Array.from({ length: frameCount }, (_, i) => i + 1);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startCamera();

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleShoot = async () => {
    if (isShooting) return;
    setIsShooting(true);
    setPhotos([]); 
    
    const tempPhotos = []; 

    for (let i = 0; i < frameCount; i++) {
      for (let c = 3; c > 0; c--) {
        setCountdown(c);
        await new Promise(r => setTimeout(r, 1000));
      }
      
      setCountdown('📸');
      await new Promise(r => setTimeout(r, 300)); 

      const video = videoRef.current;
      if (video) {
        const canvas = document.createElement("canvas");
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        const ctx = canvas.getContext("2d");
        
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        const dataUrl = canvas.toDataURL("image/png");
        tempPhotos.push(dataUrl);
        setPhotos([...tempPhotos]); 
      }

      await new Promise(r => setTimeout(r, 1000)); 
    }

    setCountdown(null);
    setIsShooting(false);

    setTimeout(() => {
      navigate('/result', {
        state: { frameCount, frameImage, photos: tempPhotos },
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] overflow-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 md:px-10">
          <button
            onClick={() => navigate('/')}
            className="text-2xl font-bold tracking-tighter text-[#6b38d4]"
          >
            Pop@Pic!
          </button>
          <button
            onClick={() => navigate('/select-frame')}
            className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold text-[#494454] hover:border-[#6b38d4] hover:text-[#6b38d4]"
          >
            ← Change Frame
          </button>
        </div>
      </header>

      {/* Perubahan Utama: Mengunci tinggi menjadi h-screen dan membatasi lebar max-w-5xl */}
      <main className="mx-auto flex h-screen max-w-5xl flex-col px-5 pb-6 pt-24 md:px-10">
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tighter md:text-4xl">
              Pop your <span className="bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] bg-clip-text text-transparent">Pic!</span>
            </h1>
          </div>
          <div className="hidden rounded-full bg-[#6b38d4]/10 px-4 py-2 text-sm font-semibold text-[#6b38d4] md:block">
            {countdown !== null ? `0:${countdown}` : 'Ready'}
          </div>
        </div>

        {/* Perubahan: min-h-0 agar elemen dalam flex bisa menyusut menyesuaikan layar */}
        <section className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
          
          {/* Camera preview */}
          <div className="flex min-h-0 w-full flex-col rounded-[2rem] border bg-white/70 p-4 shadow backdrop-blur-[20px] md:p-5 lg:w-1/2">
            <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-[#eceef0] min-h-0">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="h-full w-full object-cover rounded-[1.5rem]"
                style={{ transform: 'scaleX(-1)' }}
              />
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full bg-white/90 px-8 py-4 text-5xl font-extrabold text-[#6b38d4]">
                    {countdown}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-shrink-0 items-center justify-between gap-3">
              <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold text-[#191c1e]">
                {frameCount} poses
              </div>
              <button
                onClick={handleShoot}
                disabled={isShooting}
                className="rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-8 py-3 font-bold text-white hover:scale-[1.02] disabled:opacity-60"
              >
                {isShooting ? 'Shooting...' : 'Shoot'}
              </button>
            </div>
          </div>

          {/* Grid preview */}
          <div className="flex min-h-0 w-full flex-col rounded-[2rem] border bg-white/70 p-4 shadow backdrop-blur-[20px] md:p-5 lg:w-1/2">
            <div className="mb-3 flex flex-shrink-0 items-center justify-between">
              <h2 className="text-xl font-bold">Grid preview</h2>
              <div className="rounded-full bg-[#fd56a7]/10 px-3 py-1 text-xs font-bold uppercase text-[#fd56a7]">
                {frameCount} shots
              </div>
            </div>
            
            {/* Perubahan: Area grid ini yang bisa di-scroll ke bawah kalau layarnya sangat kecil */}
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                {shots.map((shot, idx) => (
                  <div
                    key={shot}
                    className="aspect-[3/4] overflow-hidden rounded-[1.25rem] border border-[#e0e3e5] bg-[#eceef0]"
                  >
                    {photos[idx] ? (
                      <img
                        src={photos[idx]}
                        alt={`Shot ${shot}`}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-white/60">
                        <div className="text-center">
                          <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-[#6b38d4]/10 text-[#6b38d4]">
                            {shot}
                          </div>
                          <p className="text-xs font-semibold text-[#494454]">Shot {shot}</p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default BoothPage;
import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import pixelFramePng from '../assets/frames/pixel-frame.png';

const BoothPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const frameCount = location.state?.frameCount || 4;
  const frameImage = location.state?.frameImage || pixelFramePng;
  const slots = location.state?.slots || []; 

  const figmaWidth = location.state?.figmaWidth || 2756;

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
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch (err) {
        console.error("Error accessing webcam:", err);
      }
    };
    startCamera();

    return () => {
      if (streamRef.current) streamRef.current.getTracks().forEach(track => track.stop());
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

        tempPhotos.push(canvas.toDataURL("image/png"));
        setPhotos([...tempPhotos]); 
      }
      await new Promise(r => setTimeout(r, 1000)); 
    }

    setCountdown(null);
    setIsShooting(false);

    setTimeout(() => {
      // Lempar figmaWidth ke halaman hasil
      navigate('/result', {
        state: { frameCount, frameImage, photos: tempPhotos, slots, figmaWidth },
      });
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] overflow-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter text-[#6b38d4]">Pop@Pic!</button>
          <button onClick={() => navigate('/select-frame')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold">← Change Frame</button>
        </div>
      </header>

      <main className="mx-auto flex h-screen max-w-5xl flex-col px-5 pb-6 pt-24 md:px-10">
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tighter md:text-4xl">Pop your <span className="text-[#6b38d4]">Pic!</span></h1>
        </div>

        <section className="flex min-h-0 flex-1 flex-col gap-4 lg:flex-row">
          <div className="flex min-h-0 w-full flex-col rounded-[2rem] border bg-white/70 p-4 shadow lg:w-1/2">
            <div className="relative flex-1 overflow-hidden rounded-[1.5rem] bg-[#eceef0] min-h-0">
              <video ref={videoRef} autoPlay playsInline className="h-full w-full object-cover" style={{ transform: 'scaleX(-1)' }} />
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full bg-white/90 px-8 py-4 text-5xl font-extrabold text-[#6b38d4]">{countdown}</div>
                </div>
              )}
            </div>
            <div className="mt-4 flex flex-shrink-0 items-center justify-between">
              <div className="rounded-full bg-white/80 px-4 py-2 text-sm font-semibold">{frameCount} poses</div>
              <button onClick={handleShoot} disabled={isShooting} className="rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] px-8 py-3 font-bold text-white hover:scale-[1.02] disabled:opacity-60">
                {isShooting ? 'Shooting...' : 'Shoot'}
              </button>
            </div>
          </div>

          <div className="flex min-h-0 w-full flex-col rounded-[2rem] border bg-white/70 p-4 shadow lg:w-1/2">
            <h2 className="text-xl font-bold mb-3">Grid preview</h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <div className="grid grid-cols-2 gap-3">
                {shots.map((shot, idx) => (
                  <div key={shot} className="aspect-[3/4] overflow-hidden rounded-[1.25rem] border bg-[#eceef0]">
                    {photos[idx] ? (
                      <img src={photos[idx]} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center font-semibold text-gray-400">Shot {shot}</div>
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
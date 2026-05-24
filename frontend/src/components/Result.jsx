import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react'; // Pakai import yang benar

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const { photos, frameImage } = location.state || {};

useEffect(() => {
    if (!photos || !frameImage || photos.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    const imgFrame = new Image();
    imgFrame.src = frameImage;

    const loadPhotoImages = photos.map(src => {
      return new Promise((resolve) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = () => resolve(null);
      });
    });

    // Koordinat ini udah aku kali 10 menyesuaikan ukuran asli gambarmu (4000 x 5900)
    const slots = [
      { x: 480, y: 480, w: 1460, h: 1940 },   // Atas Kiri
      { x: 2060, y: 480, w: 1460, h: 1940 },  // Atas Kanan
      { x: 480, y: 2540, w: 1460, h: 1940 },  // Bawah Kiri
      { x: 2060, y: 2540, w: 1460, h: 1940 }, // Bawah Kanan
    ];

    Promise.all([
      new Promise(resolve => imgFrame.onload = () => resolve(imgFrame)),
      ...loadPhotoImages
    ]).then(([loadedFrame, ...loadedPhotos]) => {
      if (!loadedFrame) return;

      canvas.width = loadedFrame.width;
      canvas.height = loadedFrame.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // LAPISAN 1 (BAWAH): Gambar foto-fotonya dulu
      loadedPhotos.forEach((photoImg, index) => {
        if (photoImg && slots[index]) {
          const slot = slots[index];
          ctx.drawImage(photoImg, slot.x, slot.y, slot.w, slot.h);
        }
      });

      // LAPISAN 2 (ATAS): Timpa pakai bingkai bolong kamu
      ctx.drawImage(loadedFrame, 0, 0);

      const finalImage = canvas.toDataURL("image/png");
      setDownloadUrl(finalImage);
    });

  }, [photos, frameImage]);

  const downloadImage = () => {
    if (!canvasRef.current || !downloadUrl) return;
    const link = document.createElement('a');
    link.download = 'LuminaBooth-Memories.png';
    link.href = downloadUrl;
    link.click();
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] overflow-hidden">
      {/* Navbar Atas */}
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter text-[#6b38d4]">Pop@Pic!</button>
          <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold text-[#494454] hover:border-[#6b38d4] hover:text-[#6b38d4]">Back to Home</button>
        </div>
      </header>

      {/* Main Container dengan pembatas tinggi h-screen agar tidak scroll */}
      <main className="mx-auto flex h-screen max-w-5xl flex-col px-5 pb-6 pt-24 md:px-10">
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tighter md:text-4xl">
            Electric Moment <span className="bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] bg-clip-text text-transparent">Captured!</span>
          </h1>
        </div>

        {/* Section Utama: Dibagi 2 Kolom (Kiri & Kanan) */}
        <section className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row">
          
          {/* KOLOM KIRI: Area Preview Hasil Cetak (Canvas) */}
          <div className="flex min-h-0 w-full flex-1 items-center justify-center rounded-[2rem] border bg-white/70 p-4 shadow backdrop-blur-[20px] lg:w-1/2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-2">
              {/* h-full object-contain kuncinya agar strip vertikal kamu melar pas proporsional mengikuti tinggi layar laptop */}
              <canvas ref={canvasRef} className="h-full max-w-full rounded-2xl border border-[#e0e3e5] shadow-md object-contain" />
            </div>
          </div>

          {/* --- KOLOM KANAN (PERBAIKAN TATA LETAK) --- */}
          {/* justify-start agar konten menumpuk dari atas, bukan terpisah jauh */}
          <div className="flex w-full flex-col justify-start gap-10 rounded-[2rem] border bg-white/70 p-8 shadow backdrop-blur-[20px] lg:w-1/2">
            
            {/* Sisi Atas: Deskripsi & Tombol Aksi */}
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Save Your Memory</h2>
              <p className="text-sm text-[#494454]">
                Download your aesthetic photo strip directly or scan the QR code to keep it on your phone. Instantly shared!
              </p>
              
              <div className="flex gap-3 mt-2">
                <button 
                  onClick={downloadImage} 
                  disabled={!downloadUrl}
                  className="flex-1 rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] py-3.5 font-bold text-white shadow-lg hover:scale-[1.02] transition-transform disabled:opacity-60 text-sm"
                >
                  ↓ Download Photo Strip
                </button>
                <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white px-6 py-3.5 font-semibold text-[#494454] hover:bg-gray-50 text-sm">Home</button>
              </div>
            </div>

            {/* --- SISI BAWAH (QR CODE SEKARANG DI SINI) --- */}
            {/* Area QR Code diletakkan di bawah konten atas dengan gap-10, bukan di paling bawah layar */}
            <div className="flex flex-col items-center justify-center border-t border-[#e0e3e5] pt-8 mt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fd56a7] mb-3">
                Scan to Download via Phone
              </p>
              <div className="rounded-2xl border border-[#e0e3e5] bg-white p-4 shadow-sm">
                {/* Pakai QRCodeSVG agar tidak error */}
                {/* SESUDAHNYA */}
                <QRCodeSVG value="https://popatpic.com/download/dummy-id" size={140} /> 
              </div>
            </div>

            <div className="flex-1"></div> {/* Spacer tak terlihat */}

          </div>

        </section>
      </main>
    </div>
  );
};

export default ResultPage;
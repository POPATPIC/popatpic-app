import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  const [downloadUrl, setDownloadUrl] = useState(null);

  const { photos, frameImage, slots, figmaWidth } = location.state || {};

  useEffect(() => {
    if (!photos || !frameImage || !slots || photos.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    
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

    Promise.all([
      new Promise(resolve => imgFrame.onload = () => resolve(imgFrame)),
      ...loadPhotoImages
    ]).then(([loadedFrame, ...loadedPhotos]) => {
      if (!loadedFrame) return;

      canvas.width = loadedFrame.width;
      canvas.height = loadedFrame.height;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // --- RUMUS AUTO-SCALE ---
      // Menghitung berapa kali lipat perbedaan ukuran gambar PNG dengan desain Figma
      const scale = canvas.width / (figmaWidth || canvas.width);
      
      const margin = 15; 

      loadedPhotos.forEach((photoImg, index) => {
        if (photoImg && slots[index]) {
          const slot = slots[index];

          // Kalikan semua koordinat asli Figma dengan angka skala
          const scaledX = slot.x * scale;
          const scaledY = slot.y * scale;
          const scaledW = slot.w * scale;
          const scaledH = slot.h * scale;

          const imgRatio = photoImg.width / photoImg.height;
          const slotRatio = scaledW / scaledH;

          let sx = 0, sy = 0, sw = photoImg.width, sh = photoImg.height;

          if (imgRatio > slotRatio) {
            sw = photoImg.height * slotRatio;
            sx = (photoImg.width - sw) / 2;
          } else {
            sh = photoImg.width / slotRatio;
            sy = (photoImg.height - sh) / 2;
          }

          ctx.drawImage(photoImg, sx, sy, sw, sh,
            scaledX - margin,
            scaledY - margin,
            scaledW + (margin * 2),
            scaledH + (margin * 2)
          );
        }
      });

      ctx.drawImage(loadedFrame, 0, 0);

      const finalImage = canvas.toDataURL("image/png");
      setDownloadUrl(finalImage);
    });

  }, [photos, frameImage, slots, figmaWidth]);

  const downloadImage = () => {
    if (!canvasRef.current || !downloadUrl) return;
    const link = document.createElement('a');
    link.download = 'LuminaBooth-Memories.png';
    link.href = downloadUrl;
    link.click();
  };

  if (!photos) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#6b38d4] mb-4">Waduh, Sesi Foto Hilang! 😅</h2>
        <p className="text-gray-500 mb-8 max-w-md">Karena foto belum masuk database, halaman ini nggak bisa direfresh. Yuk, mulai lagi dari depan!</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] text-white font-bold rounded-full shadow-lg">Kembali ke Halaman Utama</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f7f9fb] text-[#191c1e] overflow-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-5 md:px-10">
          <button onClick={() => navigate('/')} className="text-2xl font-bold tracking-tighter text-[#6b38d4]">Pop@Pic!</button>
          <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold">Back to Home</button>
        </div>
      </header>

      <main className="mx-auto flex h-screen max-w-5xl flex-col px-5 pb-6 pt-24 md:px-10">
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h1 className="text-3xl font-extrabold tracking-tighter md:text-4xl">Electric Moment <span className="text-[#fd56a7]">Captured!</span></h1>
        </div>

        <section className="flex min-h-0 flex-1 flex-col gap-6 lg:flex-row custom-scrollbar">
          <div className="flex min-h-0 w-full flex-1 items-center justify-center rounded-[2rem] border bg-white/70 p-4 shadow lg:w-1/2">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-2">
              <canvas ref={canvasRef} className="h-full max-w-full rounded-2xl border shadow-md object-contain" />
            </div>
          </div>

          <div className="flex w-full flex-col justify-start gap-10 rounded-[2rem] border bg-white/70 p-8 shadow lg:w-1/2">
            <div className="flex flex-col gap-4">
              <h2 className="text-xl font-bold">Save Your Memory</h2>
              <p className="text-sm text-gray-500">Download your aesthetic photo strip directly or scan the QR code to keep it on your phone.</p>
              <div className="flex gap-3 mt-2">
                <button onClick={downloadImage} disabled={!downloadUrl} className="flex-1 rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] py-3.5 font-bold text-white shadow-lg text-sm transition-opacity">↓ Download Photo Strip</button>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center border-t border-[#e0e3e5] pt-8 mt-2">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fd56a7] mb-3">Scan to Download via Phone</p>
              <div className="rounded-2xl border bg-white p-4 shadow-sm">
                <QRCodeSVG value="https://popatpic.com/download/example-id" size={140} />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResultPage;
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';

const ResultPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const canvasRef = useRef(null);
  
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [publicUrl, setPublicUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(true);

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

      const scale = canvas.width / (figmaWidth || canvas.width);
      const margin = 15; 

      loadedPhotos.forEach((photoImg, index) => {
        if (photoImg && slots[index]) {
          const slot = slots[index];
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

      fetch('http://localhost:5000/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          frameId: 'classic-purple', 
          imageBase64: finalImage
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPublicUrl(data.url);
        }
        setIsUploading(false); 
      })
      .catch(err => {
        console.error("Gagal mengunggah foto ke server:", err);
        setIsUploading(false);
      });

    });

  }, [photos, frameImage, slots, figmaWidth]);

  // NAMA FILE SUDAH DIGANTI JADI POPATPIC 
  const downloadImage = () => {
    if (!canvasRef.current || !downloadUrl) return;
    const link = document.createElement('a');
    link.download = `PopAtPic-Memory-${Date.now()}.png`;
    link.href = downloadUrl;
    link.click();
  };

  if (!photos) {
    return (
      <div className="min-h-screen bg-[#f7f9fb] flex flex-col items-center justify-center p-6 text-center">
        <h2 className="text-3xl font-extrabold text-[#6b38d4] mb-4">Sesi Foto Hilang!</h2>
        <p className="text-gray-500 mb-8 max-w-md">Yuk, mulai lagi dari depan!</p>
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] text-white font-bold rounded-full shadow-lg">Kembali ke Halaman Utama</button>
      </div>
    );
  }

  return (
    // Root diubah responsif seperti halaman Booth
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] lg:overflow-hidden">
      
      {/* Lebar header disesuaikan jadi max-w-7xl */}
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <button onClick={() => navigate('/')} className="text-2xl font-extrabold tracking-tighter text-[#6b38d4]">Pop@Pic!</button>
          <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold hover:bg-white transition-colors">Back to Home</button>
        </div>
      </header>

      {/* Main dipaskan agar eye-level dan pakai max-w-7xl */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-6 pt-28 pb-10 md:px-12 md:pt-32 flex flex-col lg:min-h-0">
        <div className="mb-4 flex flex-shrink-0 items-center justify-between">
          <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl">
            Electric Moment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b38d4] to-[#fd56a7]">Captured!</span>
          </h1>
        </div>

{/* Ganti bagian section flex ini di file ResultPage.jsx kamu */}
<section className="flex flex-1 flex-col gap-6 lg:flex-row min-h-0">
  
  {/* BOX KIRI: KANVAS (Dikasih flex-1 biar dia yang ambil ruang paling banyak) */}
  <div className="flex w-full lg:w-1/2 flex-col rounded-[2rem] border bg-white/70 p-4 shadow-sm items-center justify-center">
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden p-2">
      <canvas ref={canvasRef} className="h-full max-w-full rounded-2xl border border-gray-200 shadow-md object-contain" />
    </div>
  </div>

  {/* BOX KANAN: DOWNLOAD & QR (Dibuat flex flex-col agar QR selalu punya ruang) */}
  <div className="flex w-full lg:w-1/2 flex-col justify-between gap-6 rounded-[2rem] border bg-white/70 p-8 shadow-sm">
    
    {/* BAGIAN TOMBOL DOWNLOAD */}
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl font-bold">Save Your Memory</h2>
      <p className="text-sm text-[#494454]">Download your aesthetic photo strip directly or scan the QR code to keep it on your phone.</p>
      <button 
        onClick={downloadImage} 
        disabled={!downloadUrl} 
        className="w-full rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] py-4 font-bold text-white shadow-lg text-sm transition-transform hover:scale-[1.02]"
      >
        Download Photo
      </button>
    </div>

    {/* BAGIAN QR CODE (Dikasih mt-auto supaya dia punya jarak aman) */}
    <div className="flex flex-col items-center justify-center border-t border-[#e0e3e5] pt-6 mt-auto">
      <p className="text-xs font-bold uppercase tracking-wider text-[#fd56a7] mb-4">Scan to Download via Phone</p>
      
      <div className="rounded-3xl border bg-white p-5 shadow-sm flex items-center justify-center">
        {isUploading ? (
          <div className="flex flex-col items-center p-6">
            <div className="w-10 h-10 border-4 border-[#6b38d4] border-t-transparent rounded-full animate-spin mb-3"></div>
            <span className="text-xs text-gray-500 font-semibold animate-pulse">Menyiapkan QR...</span>
          </div>
        ) : (
          <QRCodeSVG value={publicUrl || "https://popatpic.com"} size={150} />
        )}
      </div>
    </div>
  </div>
</section>
      </main>
    </div>
  );
};

export default ResultPage;
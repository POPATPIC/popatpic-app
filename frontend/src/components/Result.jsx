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

      // Upload ke Imgur
      const formData = new FormData();
      formData.append('image', finalImage.split(',')[1]); 

      fetch('https://api.imgur.com/3/image', {
        method: 'POST',
        headers: {
          'Authorization': 'Client-ID 7447432822d1039',
        },
        body: formData
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setPublicUrl(data.data.link);
        }
        setIsUploading(false);
      })
      .catch(err => {
        console.error("Gagal upload ke Imgur:", err);
        setIsUploading(false);
      });
    });
  }, [photos, frameImage, slots, figmaWidth]);

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
        <button onClick={() => navigate('/')} className="px-8 py-4 bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] text-white font-bold rounded-full">Kembali ke Home</button>
      </div>
    );
  }

  return (
    <div className="min-h-screen lg:h-screen flex flex-col bg-[#f7f9fb] text-[#191c1e] lg:overflow-hidden">
      <header className="fixed top-0 z-50 w-full border-b border-white/40 bg-white/70 backdrop-blur-xl shadow-sm">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-12">
          <button onClick={() => navigate('/')} className="text-2xl font-extrabold tracking-tighter text-[#6b38d4]">Pop@Pic!</button>
          <button onClick={() => navigate('/')} className="rounded-full border border-[#cbc3d7] bg-white/60 px-5 py-2 text-sm font-semibold">Back to Home</button>
        </div>
      </header>

      <main className="flex-1 mx-auto w-full max-w-7xl px-6 pt-28 pb-10 md:px-12 md:pt-32 flex flex-col lg:min-h-0">
        <h1 className="text-4xl font-extrabold tracking-tighter md:text-5xl mb-6">
          Electric Moment <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6b38d4] to-[#fd56a7]">Captured!</span>
        </h1>

        <section className="flex flex-1 flex-col gap-6 lg:flex-row min-h-0">
          <div className="flex w-full lg:w-1/2 rounded-[2rem] border bg-white/70 p-4 shadow-sm items-center justify-center">
            <canvas ref={canvasRef} className="h-full max-w-full rounded-2xl border shadow-md object-contain" />
          </div>

          <div className="flex w-full lg:w-1/2 flex-col justify-between gap-6 rounded-[2rem] border bg-white/70 p-8 shadow-sm">
            <div className="flex flex-col gap-4">
              <h2 className="text-2xl font-bold">Save Your Memory</h2>
              <button onClick={downloadImage} disabled={!downloadUrl} className="w-full rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] py-4 font-bold text-white shadow-lg">Download Photo</button>
            </div>

            <div className="flex flex-col items-center justify-center border-t border-[#e0e3e5] pt-6 mt-auto">
              <p className="text-xs font-bold uppercase tracking-wider text-[#fd56a7] mb-4">Scan to get photo</p>
              <div className="rounded-3xl border bg-white p-5 shadow-sm flex items-center justify-center">
                {isUploading ? (
                  <div className="animate-pulse text-sm text-gray-500">Menyiapkan QR...</div>
                ) : publicUrl ? (
                  <QRCodeSVG value={publicUrl} size={150} level="L" />
                ) : (
                  <span className="text-sm text-red-500">Gagal upload</span>
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
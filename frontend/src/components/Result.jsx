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
  const [errorMessage, setErrorMessage] = useState(null);

  const { photos, frameImage, slots, figmaWidth } = location.state || {};

  function loadImage(src) {
    return new Promise((resolve) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = src;
    });
  }

  useEffect(() => {
    if (!photos || !frameImage || !slots || photos.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    setIsUploading(true);
    setPublicUrl(null);
    setDownloadUrl(null);
    setErrorMessage(null);

    Promise.all([
      loadImage(frameImage),
      ...photos.map(src => loadImage(src))
    ]).then(([loadedFrame, ...loadedPhotos]) => {
      if (!loadedFrame) {
        setErrorMessage('Gagal memuat frame. Periksa sumber frameImage.');
        setIsUploading(false);
        return;
      }

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

      try {
        const finalDataUrl = canvas.toDataURL('image/png');
        setDownloadUrl(finalDataUrl);

        const formData = new FormData();
        formData.append('file', finalDataUrl); 
        
        formData.append('upload_preset', 'popatpic-preset'); 

        fetch('https://api.cloudinary.com/v1_1/dlzrd1lsd/image/upload', {
          method: 'POST',
          body: formData
        })
        .then(res => res.json())
        .then(data => {
          if (data && data.secure_url) {
            setPublicUrl(data.secure_url); 
          } else {
            console.error('Cloudinary error:', data);
            setErrorMessage('Upload ke server gagal.');
          }
          setIsUploading(false);
        })
        .catch(err => {
          console.error('Gagal upload ke Cloudinary:', err);
          setErrorMessage('Koneksi upload gagal.');
          setIsUploading(false);
        });
        // ----------------------------

      } catch (err) {
        console.error('Gagal membuat gambar untuk upload:', err);
        setErrorMessage('Gagal memproses gambar. Mungkin karena CORS.');
        setIsUploading(false);
      }
    });
  }, [photos, frameImage, slots, figmaWidth]);

  function downloadFromUrl(url) {
    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error('Fetch failed: ' + res.status);
        return res.blob();
      })
      .then(blob => {
        const u = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = u;
        a.download = `PopAtPic-Memory-${Date.now()}.png`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        URL.revokeObjectURL(u);
      })
      .catch(err => {
        console.error('Gagal download dari URL publik:', err);
        alert('Gagal mendownload otomatis. Silakan buka link publik dan simpan manual.');
      });
  }

  const downloadImage = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(blob => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `PopAtPic-Memory-${Date.now()}.png`;
          document.body.appendChild(a);
          a.click();
          a.remove();
          URL.revokeObjectURL(url);
        } else {
          if (publicUrl) downloadFromUrl(publicUrl);
          else if (downloadUrl) window.open(downloadUrl, '_blank');
        }
      }, 'image/png');
    } catch (err) {
      if (publicUrl) downloadFromUrl(publicUrl);
      else if (downloadUrl) window.open(downloadUrl, '_blank');
    }
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
              <button onClick={downloadImage} disabled={!downloadUrl && !publicUrl} className="w-full rounded-full bg-gradient-to-r from-[#6b38d4] to-[#fd56a7] py-4 font-bold text-white shadow-lg disabled:opacity-50">
                Download Photo
              </button>
              {errorMessage && <p className="text-sm text-red-500 mt-2">{errorMessage}</p>}
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
              {publicUrl && (
                <a href={publicUrl} target="_blank" rel="noreferrer" className="mt-3 text-xs text-[#6b38d4] underline">Open public link</a>
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default ResultPage;
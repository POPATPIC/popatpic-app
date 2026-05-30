# Pop@Pic!

Pop@Pic! adalah aplikasi web photobooth interaktif yang dirancang untuk memberikan pengalaman berfoto yang praktis dan terintegrasi. Pengguna dapat memilih frame kustom, mengambil foto, dan langsung mengunduh hasilnya atau membagikannya melalui pemindaian QR Code.

## Fitur Utama

* **Pemilihan Frame Dinamis:** Pengguna dapat memilih berbagai template frame berdasarkan jumlah pose yang diinginkan.
* **Real-time Photo Capture:** Integrasi kamera web untuk pengambilan gambar secara langsung dari peramban.
* **Pemrosesan Gambar Berbasis Canvas:** Penggabungan foto pengguna dengan frame dilakukan secara langsung di sisi klien menggunakan HTML5 Canvas.
* **Integrasi Cloud Storage:** Hasil akhir foto diunggah secara otomatis ke Cloudinary menggunakan metode Unsigned Upload untuk mendapatkan tautan permanen yang aman.
* **Instant QR Code Sharing:** Menghasilkan QR Code yang berisi tautan langsung ke gambar resolusi tinggi, memungkinkan pengguna mengunduh foto ke perangkat seluler tanpa batasan jaringan lokal.

## Teknologi yang Digunakan

* **Frontend:** React.js
* **Routing:** React Router DOM
* **Styling:** Tailwind CSS
* **Image Processing:** HTML5 Canvas API
* **Cloud Storage:** Cloudinary API
* **Deployment:** Vercel

## Prasyarat

Sebelum menjalankan proyek ini di lingkungan lokal, pastikan perangkat Anda telah memasang:
* Node.js (versi 16 atau lebih baru)
* npm atau yarn
* Akun Cloudinary aktif untuk kebutuhan unggah gambar

## Instalasi dan Konfigurasi Lokal

1. **Kloning repositori:**
   ```bash
   git clone [https://github.com/POPATPIC/popatpic-app.git](https://github.com/POPATPIC/popatpic-app.git)
   cd popatpic-app
   ```

2. **Instalasi dependensi:**
   ```bash
   npm install
   ```

3. **Konfigurasi API Cloudinary:**
   * Buka file terkait pemrosesan hasil akhir (misalnya `ResultPage.jsx`).
   * Ganti parameter `upload_preset` dengan Unsigned Upload Preset dari pengaturan Cloudinary Anda.
   * Perbarui endpoint API dengan Cloud Name Anda: `https://api.cloudinary.com/v1_1/CLOUD_NAME_ANDA/image/upload`

4. **Menjalankan server pengembangan:**
   ```bash
   npm start
   ```
   Aplikasi akan berjalan pada `http://localhost:3000`.

## Deployment

Proyek ini telah dioptimalkan untuk di-deploy melalui platform Vercel. 
1. Hubungkan repositori GitHub ini ke dasbor Vercel.
2. Vercel akan mendeteksi proyek React secara otomatis dan menjalankan perintah `npm run build`.
3. Aplikasi akan diperbarui secara otomatis setiap kali ada perubahan yang didorong (push) ke branch utama.

## Pengembang

Dikembangkan oleh Karima Ulya Hermawan.

require('dotenv').config(); 
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Koneksi ke Database MySQL XAMPP
const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    ssl: { 
        minVersion: 'TLSv1.2', 
        rejectUnauthorized: true 
    },
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

app.get('/', (req, res) => {
  res.send('Server Backend Pop@Pic! Berjalan Mulus!');
});

app.get('/api/frames', (req, res) => {
  const querySql = "SELECT * FROM frames";
  
  db.query(querySql, (err, results) => {
    if (err) {
      console.error("Gagal narik data dari database:", err);
      // Trik nampilin error asli ke layar browser
      return res.status(500).json({ 
          error: "Terjadi kesalahan di server",
          bocoran_error: err.message 
      });
    }
    res.json(results); 
  });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.post('/api/upload', (req, res) => {
  const { frameId, imageBase64 } = req.body;

  if (!imageBase64) {
    return res.status(400).json({ error: 'Data gambar tidak ditemukan' });
  }

  const base64Data = imageBase64.replace(/^data:image\/png;base64,/, "");
  
  const fileName = `pop@pic!_${Date.now()}.png`;
  const filePath = path.join(__dirname, 'uploads', fileName);

  fs.writeFile(filePath, base64Data, 'base64', (err) => {
    if (err) {
      console.error("Gagal menyimpan file gambar:", err);
      return res.status(500).json({ error: "Gagal menyimpan gambar di server" });
    }

    const photoId = `photo_${Date.now()}`;
    
    const imageUrl = `https://popatpic.vercel.app/uploads/${fileName}`;

    const sql = "INSERT INTO photos (id, frame_id, image_url) VALUES (?, ?, ?)";
    db.query(sql, [photoId, frameId || 'unknown', imageUrl], (dbErr) => {
      if (dbErr) {
        console.error("Gagal mencatat ke database:", dbErr);
        return res.status(500).json({ error: "Gagal simpan ke DB" });
      }

      res.json({ success: true, url: imageUrl, id: photoId });
    });
  });
});

app.listen(port, () => {
  console.log(`Server menyala di http://localhost:${port}`);
});

// Tambahin ini biar pas link Vercel dibuka nggak 404
app.get('/', (req, res) => {
    res.send('Yeay! Backend Pop@Pic! Oya udah nyala di Vercel! 🚀');
});
module.exports = app;
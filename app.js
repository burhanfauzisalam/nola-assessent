const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = process.env.PORT || 5000;

// Konfigurasi multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "files/"); // Simpan file di folder 'files'
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname); // Simpan file dengan nama asli
  },
});

const upload = multer({ storage: storage });

// Setel view engine jika Anda ingin menggunakan template engine
// app.set('view engine', 'ejs');

// Route untuk menampilkan formulir upload file
app.get("/", (req, res) => {
  res.send("server berjalan");
});

// Route untuk menangani permintaan upload file
app.post("/upload", upload.single("file"), function (req, res, next) {
  if (!req.file) {
    return res.status(400).send("Tidak ada file yang diunggah.");
  }
  try {
    res.send(req.file.originalname);
  } catch (error) {
    res.status(500).send("File gagal diunggah");
  }
});

// Serve file statis di folder 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Jalankan server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

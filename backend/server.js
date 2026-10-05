const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const { bacaDatabase, simpanDatabase } = require("./database");

const app = express();
const PORT = 3000;
// ==================================================
// UPLOAD FOTO GALERI
// ==================================================

const folderGaleri = path.join(__dirname, "../images/galeri");

fs.mkdirSync(folderGaleri, { recursive: true });

const storageGaleri = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, folderGaleri);
    },

    filename: function (req, file, cb) {
        const ext = path.extname(file.originalname).toLowerCase();

        cb(
            null,
            "galeri-" + Date.now() + ext
        );
    }
});

const uploadGaleri = multer({
    storage: storageGaleri,

    limits: {
        fileSize: 5 * 1024 * 1024
    },

    fileFilter: function (req, file, cb) {

        const tipeDiizinkan = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (tipeDiizinkan.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error(
                    "Foto harus JPG, PNG, atau WEBP"
                )
            );
        }
    }
});

app.use(
    "/images",
    express.static(
        path.join(__dirname, "../images")
    )
);
app.use(cors());
app.use(express.json());


// ==================================================
// HALAMAN UTAMA
// ==================================================

app.get("/", (req, res) => {
    res.json({
        nama: "Koperasi Desa Merah Putih Unjur",
        status: "Server aktif",
        versi: "1.4"
    });
});


// ==================================================
// PRODUK
// ==================================================

app.get("/api/produk", (req, res) => {

    const db = bacaDatabase();

    res.json(db.produk);

});


app.post("/api/produk", (req, res) => {

    const db = bacaDatabase();

    const {
        nama,
        kategori,
        harga,
        stok,
        deskripsi
    } = req.body;


    if (!nama) {

        return res.status(400).json({
            error: "Nama produk wajib diisi"
        });

    }


    const produkBaru = {

        id: Date.now(),

        nama: nama,

        kategori: kategori || "",

        harga: Number(harga) || 0,

        stok: Number(stok) || 0,

        deskripsi: deskripsi || ""

    };


    db.produk.push(produkBaru);

    simpanDatabase(db);


    res.status(201).json({

        message: "Produk berhasil ditambahkan",

        produk: produkBaru

    });

});


app.put("/api/produk/:id", (req, res) => {

    const db = bacaDatabase();

    const id = Number(req.params.id);


    const produk =
        db.produk.find(
            p => p.id === id
        );


    if (!produk) {

        return res.status(404).json({

            error: "Produk tidak ditemukan"

        });

    }


    const {
        nama,
        kategori,
        harga,
        stok,
        deskripsi
    } = req.body;


    if (nama !== undefined)
        produk.nama = nama;

    if (kategori !== undefined)
        produk.kategori = kategori;

    if (harga !== undefined)
        produk.harga = Number(harga);

    if (stok !== undefined)
        produk.stok = Number(stok);

    if (deskripsi !== undefined)
        produk.deskripsi = deskripsi;


    simpanDatabase(db);


    res.json({

        message: "Produk berhasil diperbarui",

        produk: produk

    });

});


app.delete("/api/produk/:id", (req, res) => {

    const db = bacaDatabase();

    const id = Number(req.params.id);


    const jumlahAwal =
        db.produk.length;


    db.produk =
        db.produk.filter(
            p => p.id !== id
        );


    if (db.produk.length === jumlahAwal) {

        return res.status(404).json({

            error: "Produk tidak ditemukan"

        });

    }


    simpanDatabase(db);


    res.json({

        message: "Produk berhasil dihapus"

    });

});


// ==================================================
// ANGGOTA
// ==================================================

app.get("/api/anggota", (req, res) => {

    const db = bacaDatabase();

    res.json(db.anggota);

});


app.post("/api/anggota", (req, res) => {

    const db = bacaDatabase();

    const {
        nomor,
        nama,
        nik,
        alamat,
        status
    } = req.body;


    if (!nama) {

        return res.status(400).json({

            error: "Nama anggota wajib diisi"

        });

    }


    const anggotaBaru = {

        id: Date.now(),

        nomor: nomor || "",

        nama: nama,

        nik: nik || "",

        alamat: alamat || "",

        status: status || "Aktif"

    };


    db.anggota.push(anggotaBaru);

    simpanDatabase(db);


    res.status(201).json({

        message: "Anggota berhasil ditambahkan",

        anggota: anggotaBaru

    });

});


app.put("/api/anggota/:id", (req, res) => {

    const db = bacaDatabase();

    const id = Number(req.params.id);


    const anggota =
        db.anggota.find(
            a => a.id === id
        );


    if (!anggota) {

        return res.status(404).json({

            error: "Anggota tidak ditemukan"

        });

    }


    const {
        nomor,
        nama,
        nik,
        alamat,
        status
    } = req.body;


    if (nomor !== undefined)
        anggota.nomor = nomor;

    if (nama !== undefined)
        anggota.nama = nama;

    if (nik !== undefined)
        anggota.nik = nik;

    if (alamat !== undefined)
        anggota.alamat = alamat;

    if (status !== undefined)
        anggota.status = status;


    simpanDatabase(db);


    res.json({

        message: "Anggota berhasil diperbarui",

        anggota: anggota

    });

});


app.delete("/api/anggota/:id", (req, res) => {

    const db = bacaDatabase();

    const id = Number(req.params.id);


    const jumlahAwal =
        db.anggota.length;


    db.anggota =
        db.anggota.filter(
            a => a.id !== id
        );


    if (db.anggota.length === jumlahAwal) {

        return res.status(404).json({

            error: "Anggota tidak ditemukan"

        });

    }


    simpanDatabase(db);


    res.json({

        message: "Anggota berhasil dihapus"

    });

});


// ==================================================
// PESANAN
// ==================================================

app.get("/api/pesanan", (req, res) => {

    const db = bacaDatabase();

    res.json(db.pesanan);

});


app.post("/api/pesanan", (req, res) => {

    const db = bacaDatabase();

    const {
        namaPembeli,
        anggotaId,
        produkId,
        namaProduk,
        jumlah,
        harga,
        total,
        status
    } = req.body;


    if (!namaPembeli || !namaProduk) {

        return res.status(400).json({

            error:
                "Nama pembeli dan produk wajib diisi"

        });

    }


    const produk =
        db.produk.find(
            p => p.id === Number(produkId)
        );


    if (!produk) {

        return res.status(404).json({

            error: "Produk tidak ditemukan"

        });

    }


    const jumlahPesanan =
        Number(jumlah) || 0;


    if (jumlahPesanan < 1) {

        return res.status(400).json({

            error: "Jumlah pesanan tidak valid"

        });

    }


    if (
        jumlahPesanan >
        Number(produk.stok)
    ) {

        return res.status(400).json({

            error: "Stok tidak mencukupi"

        });

    }


    const pesananBaru = {

        id: Date.now(),

        tanggal:
            new Date().toISOString(),

        namaPembeli:
            namaPembeli,

        anggotaId:
            anggotaId || "",

        produkId:
            Number(produkId),

        namaProduk:
            namaProduk,

        jumlah:
            jumlahPesanan,

        harga:
            Number(harga) || 0,

        total:
            Number(total) || 0,

        status:
            status || "Menunggu",

        stokDikurangi:
            false,

        transaksiId:
            null

    };


    db.pesanan.push(pesananBaru);

    simpanDatabase(db);


    res.status(201).json({

        message:
            "Pesanan berhasil ditambahkan",

        pesanan:
            pesananBaru

    });

});


// ==================================================
// PESANAN - UBAH STATUS
// ==================================================

app.put("/api/pesanan/:id", (req, res) => {

    const db = bacaDatabase();

    const id =
        Number(req.params.id);


    const pesanan =
        db.pesanan.find(
            p => p.id === id
        );


    if (!pesanan) {

        return res.status(404).json({

            error:
                "Pesanan tidak ditemukan"

        });

    }


    const statusLama =
        pesanan.status;


    const {
        namaPembeli,
        anggotaId,
        produkId,
        namaProduk,
        jumlah,
        harga,
        total,
        status
    } = req.body;


    if (namaPembeli !== undefined)
        pesanan.namaPembeli =
            namaPembeli;

    if (anggotaId !== undefined)
        pesanan.anggotaId =
            anggotaId;

    if (produkId !== undefined)
        pesanan.produkId =
            Number(produkId);

    if (namaProduk !== undefined)
        pesanan.namaProduk =
            namaProduk;

    if (jumlah !== undefined)
        pesanan.jumlah =
            Number(jumlah);

    if (harga !== undefined)
        pesanan.harga =
            Number(harga);

    if (total !== undefined)
        pesanan.total =
            Number(total);


    // ==================================================
    // STATUS MENJADI SELESAI
    // ==================================================

    if (
        status === "Selesai" &&
        statusLama !== "Selesai"
    ) {

        const produk =
            db.produk.find(
                p =>
                    p.id ===
                    Number(pesanan.produkId)
            );


        if (!produk) {

            return res.status(404).json({

                error:
                    "Produk pesanan tidak ditemukan"

            });

        }


        if (
            Number(pesanan.jumlah) >
            Number(produk.stok)
        ) {

            return res.status(400).json({

                error:
                    "Stok tidak mencukupi"

            });

        }


        // KURANGI STOK

        produk.stok =
            Number(produk.stok) -
            Number(pesanan.jumlah);


        pesanan.stokDikurangi =
            true;


        // ==================================================
        // BUAT TRANSAKSI KEUANGAN
        // ==================================================

        const transaksiBaru = {

            id: Date.now(),

            tanggal:
                new Date().toISOString(),

            jenis:
                "Pendapatan",

            kategori:
                "Penjualan",

            keterangan:
                pesanan.namaProduk +
                " x " +
                pesanan.jumlah,

            jumlah:
                Number(pesanan.total) || 0,

            pesananId:
                pesanan.id

        };


        if (!db.transaksi)
            db.transaksi = [];


        db.transaksi.push(
            transaksiBaru
        );


        pesanan.transaksiId =
            transaksiBaru.id;

    }


    // ==================================================
    // SELESAI -> STATUS LAIN
    // ==================================================

    if (
        statusLama === "Selesai" &&
        status !== "Selesai" &&
        pesanan.stokDikurangi === true
    ) {

        const produk =
            db.produk.find(
                p =>
                    p.id ===
                    Number(pesanan.produkId)
            );


        if (produk) {

            produk.stok =
                Number(produk.stok) +
                Number(pesanan.jumlah);

        }


        pesanan.stokDikurangi =
            false;


        // ==================================================
        // HAPUS TRANSAKSI PENJUALAN
        // ==================================================

        if (pesanan.transaksiId) {

            db.transaksi =
                (db.transaksi || [])
                    .filter(
                        t =>
                            t.id !==
                            pesanan.transaksiId
                    );

        }


        pesanan.transaksiId =
            null;

    }


    pesanan.status =
        status || statusLama;


    simpanDatabase(db);


    res.json({

        message:
            "Pesanan berhasil diperbarui",

        pesanan:
            pesanan

    });

});


// ==================================================
// HAPUS PESANAN
// ==================================================

app.delete("/api/pesanan/:id", (req, res) => {

    const db = bacaDatabase();

    const id =
        Number(req.params.id);


    const pesanan =
        db.pesanan.find(
            p => p.id === id
        );


    if (!pesanan) {

        return res.status(404).json({

            error:
                "Pesanan tidak ditemukan"

        });

    }


    // KEMBALIKAN STOK

    if (
        pesanan.status === "Selesai" &&
        pesanan.stokDikurangi === true
    ) {

        const produk =
            db.produk.find(
                p =>
                    p.id ===
                    Number(pesanan.produkId)
            );


        if (produk) {

            produk.stok =
                Number(produk.stok) +
                Number(pesanan.jumlah);

        }

    }


    // HAPUS TRANSAKSI

    if (pesanan.transaksiId) {

        db.transaksi =
            (db.transaksi || [])
                .filter(
                    t =>
                        t.id !==
                        pesanan.transaksiId
                );

    }


    db.pesanan =
        db.pesanan.filter(
            p => p.id !== id
        );


    simpanDatabase(db);


    res.json({

        message:
            "Pesanan berhasil dihapus"

    });

});


// ==================================================
// KEUANGAN / TRANSAKSI
// ==================================================

app.get("/api/transaksi", (req, res) => {

    const db = bacaDatabase();

    if (!db.transaksi)
        db.transaksi = [];


    res.json(
        db.transaksi
    );

});


app.post("/api/transaksi", (req, res) => {

    const db = bacaDatabase();

    if (!db.transaksi)
        db.transaksi = [];


    const {
        jenis,
        kategori,
        keterangan,
        jumlah
    } = req.body;


    if (!jenis || !keterangan) {

        return res.status(400).json({

            error:
                "Jenis dan keterangan wajib diisi"

        });

    }


    const transaksiBaru = {

        id: Date.now(),

        tanggal:
            new Date().toISOString(),

        jenis:
            jenis,

        kategori:
            kategori || "Lainnya",

        keterangan:
            keterangan,

        jumlah:
            Number(jumlah) || 0

    };


    db.transaksi.push(
        transaksiBaru
    );


    simpanDatabase(db);


    res.status(201).json({

        message:
            "Transaksi berhasil ditambahkan",

        transaksi:
            transaksiBaru

    });

});


// ==================================================
// HAPUS TRANSAKSI
// ==================================================

app.delete("/api/transaksi/:id", (req, res) => {

    const db = bacaDatabase();

    if (!db.transaksi)
        db.transaksi = [];


    const id =
        Number(req.params.id);


    const jumlahAwal =
        db.transaksi.length;


    db.transaksi =
        db.transaksi.filter(
            t => t.id !== id
        );


    if (
        db.transaksi.length ===
        jumlahAwal
    ) {

        return res.status(404).json({

            error:
                "Transaksi tidak ditemukan"

        });

    }


    simpanDatabase(db);


    res.json({

        message:
            "Transaksi berhasil dihapus"

    });

});


// ==================================================
// SERVER
// ==================================================
// ===============================
// API BERITA
// ===============================

app.get("/api/berita", (req, res) => {
    const db = bacaDatabase();

    if (!db.berita) {
        db.berita = [];
        simpanDatabase(db);
    }

    res.json(db.berita);
});


app.post("/api/berita", (req, res) => {
    const db = bacaDatabase();

    if (!db.berita) {
        db.berita = [];
    }

    const berita = {
        id: Date.now(),
        judul: req.body.judul || "",
        isi: req.body.isi || "",
        gambar: req.body.gambar || "",
        tanggal: new Date().toISOString()
    };

    db.berita.push(berita);

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Berita berhasil ditambahkan",
        berita: berita
    });
});


app.put("/api/berita/:id", (req, res) => {
    const db = bacaDatabase();

    if (!db.berita) {
        db.berita = [];
    }

    const id = Number(req.params.id);

    const index = db.berita.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Berita tidak ditemukan"
        });
    }

    db.berita[index].judul =
        req.body.judul || db.berita[index].judul;

    db.berita[index].isi =
        req.body.isi || db.berita[index].isi;

    db.berita[index].gambar =
        req.body.gambar || db.berita[index].gambar;

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Berita berhasil diperbarui",
        berita: db.berita[index]
    });
});


app.delete("/api/berita/:id", (req, res) => {
    const db = bacaDatabase();

    if (!db.berita) {
        db.berita = [];
    }

    const id = Number(req.params.id);

    const index = db.berita.findIndex(b => b.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Berita tidak ditemukan"
        });
    }

    db.berita.splice(index, 1);

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Berita berhasil dihapus"
    });
});
// ===============================
// API GALERI
// ===============================
// ==================================================
// UPLOAD FOTO GALERI DARI DEVICE
// ==================================================

app.post(
    "/api/galeri/upload",
    uploadGaleri.single("gambar"),
    (req, res) => {

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Foto belum dipilih"
            });
        }

        const db = bacaDatabase();

        if (!db.galeri) {
            db.galeri = [];
        }

        const galeri = {
            id: Date.now(),

            judul:
                req.body.judul ||
                "Foto Galeri",

            gambar:
                "http://localhost:3000/images/galeri/" +
                req.file.filename,

            tanggal:
                new Date().toISOString()
        };

        db.galeri.push(galeri);

        simpanDatabase(db);

        res.json({
            success: true,

            message:
                "Foto berhasil diupload",

            galeri:
                galeri
        });
    }
);
app.get("/api/galeri", (req, res) => {
    const db = bacaDatabase();

    if (!db.galeri) {
        db.galeri = [];
        simpanDatabase(db);
    }

    res.json(db.galeri);
});


app.post("/api/galeri", (req, res) => {
    const db = bacaDatabase();

    if (!db.galeri) {
        db.galeri = [];
    }

    const galeri = {
        id: Date.now(),
        judul: req.body.judul || "",
        gambar: req.body.gambar || "",
        tanggal: new Date().toISOString()
    };

    if (!galeri.judul) {
        return res.status(400).json({
            success: false,
            message: "Judul galeri harus diisi"
        });
    }

    if (!galeri.gambar) {
        return res.status(400).json({
            success: false,
            message: "Link gambar harus diisi"
        });
    }

    db.galeri.push(galeri);

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Foto berhasil ditambahkan",
        galeri: galeri
    });
});


app.put("/api/galeri/:id", (req, res) => {
    const db = bacaDatabase();

    if (!db.galeri) {
        db.galeri = [];
    }

    const id = Number(req.params.id);

    const index = db.galeri.findIndex(g => g.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Foto tidak ditemukan"
        });
    }

    db.galeri[index].judul =
        req.body.judul || db.galeri[index].judul;

    db.galeri[index].gambar =
        req.body.gambar || db.galeri[index].gambar;

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Foto berhasil diperbarui",
        galeri: db.galeri[index]
    });
});


app.delete("/api/galeri/:id", (req, res) => {
    const db = bacaDatabase();

    if (!db.galeri) {
        db.galeri = [];
    }

    const id = Number(req.params.id);

    const index = db.galeri.findIndex(g => g.id === id);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: "Foto tidak ditemukan"
        });
    }

    db.galeri.splice(index, 1);

    simpanDatabase(db);

    res.json({
        success: true,
        message: "Foto berhasil dihapus"
    });
});
app.listen(PORT, () => {

    console.log(
        `Server KDMP Unjur berjalan di http://localhost:${PORT}`
    );

});

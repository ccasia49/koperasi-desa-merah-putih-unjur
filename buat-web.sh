#!/bin/bash

mkdir -p css js images

cat > index.html <<'EOF'
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>KDMP Unjur - Koperasi Desa Merah Putih Unjur</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>

<header>
<div class="logo">
<div class="logo-circle">KDMP</div>
<div>
<h2>KDMP UNJUR</h2>
<small>Koperasi Desa Merah Putih Unjur</small>
</div>
</div>

<nav>
<a href="index.html">Beranda</a>
<a href="profil.html">Profil</a>
<a href="unit-usaha.html">Unit Usaha</a>
<a href="produk.html">Produk</a>
<a href="kios-angkat.html">Kios Angkat</a>
<a href="pertanian.html">Pertanian</a>
<a href="anggota.html">Anggota</a>
<a href="berita.html">Berita</a>
<a href="galeri.html">Galeri</a>
<a href="kontak.html">Kontak</a>
</nav>
</header>

<section class="hero">
<div class="hero-content">
<span>KOPERASI DESA MERAH PUTIH</span>
<h1>Bersama Membangun Ekonomi Desa Unjur</h1>
<p>
Membangun usaha bersama, memenuhi kebutuhan masyarakat,
dan membuka peluang ekonomi bagi anggota Desa Unjur.
</p>
<a href="produk.html" class="btn">Belanja Produk</a>
<a href="profil.html" class="btn-outline">Tentang Kami</a>
</div>
</section>

<section class="section">
<div class="section-title">
<span>UNIT USAHA</span>
<h2>Melayani Kebutuhan Masyarakat</h2>
<p>KDMP Unjur mengembangkan potensi usaha desa secara bertahap dan berkelanjutan.</p>
</div>

<div class="cards">

<div class="card">
<div class="icon">🛒</div>
<h3>Sembako</h3>
<p>Minyak, gula, beras dan kebutuhan pokok masyarakat.</p>
<a href="produk.html">Lihat Produk →</a>
</div>

<div class="card">
<div class="icon">🌾</div>
<h3>Hasil Pertanian</h3>
<p>Mendukung penampungan dan pemasaran hasil pertanian masyarakat.</p>
<a href="pertanian.html">Selengkapnya →</a>
</div>

<div class="card">
<div class="icon">🐟</div>
<h3>Pora-Pora</h3>
<p>Mengembangkan produk olahan ikan lokal Desa Unjur.</p>
<a href="produk.html">Lihat Produk →</a>
</div>

<div class="card">
<div class="icon">🏪</div>
<h3>Kios Angkat</h3>
<p>Melibatkan anggota dalam memperluas pemasaran produk koperasi.</p>
<a href="kios-angkat.html">Selengkapnya →</a>
</div>

</div>
</section>

<section class="about">
<div>
<span>TENTANG KDMP UNJUR</span>
<h2>Usaha Bersama Untuk Desa</h2>
<p>
Koperasi Desa Merah Putih Unjur berkomitmen mengembangkan
potensi ekonomi yang ada di Desa Unjur dengan melibatkan
anggota dan masyarakat.
</p>
<a href="profil.html" class="btn">Profil KDMP Unjur</a>
</div>

<div class="stats">
<div><strong>71</strong><span>Anggota</span></div>
<div><strong>4+</strong><span>Unit Usaha</span></div>
<div><strong>2025</strong><span>Tahun Berdiri</span></div>
</div>
</section>

<section class="cta">
<h2>Mari Bertumbuh Bersama</h2>
<p>Dukung produk lokal dan perkembangan ekonomi Desa Unjur.</p>
<a href="produk.html" class="btn">Lihat Produk</a>
</section>

<footer>
<div>
<h3>KDMP UNJUR</h3>
<p>Koperasi Desa Merah Putih Unjur</p>
</div>
<p>© 2026 KDMP Unjur</p>
</footer>

</body>
</html>
EOF


cat > css/style.css <<'EOF'
*{
margin:0;
padding:0;
box-sizing:border-box;
}

body{
font-family:Arial,sans-serif;
color:#222;
background:#fff;
line-height:1.6;
}

header{
min-height:75px;
display:flex;
align-items:center;
justify-content:space-between;
padding:12px 5%;
background:#fff;
border-bottom:1px solid #eee;
position:sticky;
top:0;
z-index:1000;
}

.logo{
display:flex;
align-items:center;
gap:12px;
}

.logo-circle{
width:48px;
height:48px;
border-radius:50%;
background:#c90000;
color:#fff;
display:flex;
align-items:center;
justify-content:center;
font-weight:bold;
font-size:12px;
}

.logo h2{
color:#b40000;
font-size:18px;
}

.logo small{
color:#777;
}

nav{
display:flex;
gap:16px;
flex-wrap:wrap;
justify-content:flex-end;
}

nav a{
text-decoration:none;
color:#333;
font-size:14px;
font-weight:bold;
}

nav a:hover{
color:#c00000;
}

.hero{
min-height:570px;
display:flex;
align-items:center;
padding:70px 8%;
background:linear-gradient(90deg,#850000,#d00000);
color:#fff;
}

.hero-content{
max-width:750px;
}

.hero-content span,
.section-title span,
.about span{
font-size:13px;
font-weight:bold;
letter-spacing:2px;
}

.hero h1{
font-size:clamp(40px,6vw,70px);
line-height:1.1;
margin:18px 0;
}

.hero p{
font-size:18px;
max-width:650px;
margin-bottom:30px;
}

.btn,.btn-outline{
display:inline-block;
padding:13px 24px;
border-radius:7px;
text-decoration:none;
font-weight:bold;
margin:5px;
}

.btn{
background:#c90000;
color:#fff;
}

.hero .btn{
background:#fff;
color:#b00000;
}

.btn-outline{
border:1px solid #fff;
color:#fff;
}

.section{
padding:85px 7%;
}

.section-title{
text-align:center;
max-width:700px;
margin:0 auto 45px;
}

.section-title span,.about span{
color:#c00000;
}

.section-title h2,.about h2{
font-size:34px;
margin:10px 0;
}

.cards{
display:grid;
grid-template-columns:repeat(4,1fr);
gap:22px;
}

.card{
padding:28px;
border:1px solid #eee;
border-radius:14px;
background:#fff;
box-shadow:0 8px 25px rgba(0,0,0,.06);
transition:.3s;
}

.card:hover{
transform:translateY(-6px);
}

.card .icon{
font-size:40px;
margin-bottom:15px;
}

.card h3{
margin-bottom:8px;
}

.card p{
color:#666;
font-size:14px;
margin-bottom:15px;
}

.card a{
color:#c00000;
text-decoration:none;
font-weight:bold;
}

.about{
padding:80px 8%;
background:#f8f8f8;
display:grid;
grid-template-columns:1.4fr 1fr;
gap:60px;
align-items:center;
}

.about p{
color:#666;
margin:20px 0 25px;
max-width:650px;
}

.stats{
display:grid;
grid-template-columns:repeat(3,1fr);
gap:15px;
}

.stats div{
background:#fff;
padding:25px 10px;
text-align:center;
border-radius:10px;
}

.stats strong{
display:block;
font-size:30px;
color:#c00000;
}

.stats span{
color:#666;
font-size:13px;
}

.cta{
padding:75px 20px;
text-align:center;
background:#b90000;
color:#fff;
}

.cta h2{
font-size:35px;
}

.cta p{
margin:10px 0 25px;
}

.cta .btn{
background:#fff;
color:#b90000;
}

footer{
background:#171717;
color:#fff;
padding:35px 7%;
display:flex;
justify-content:space-between;
gap:20px;
}

footer p{
color:#aaa;
font-size:14px;
}

@media(max-width:1000px){
nav{
display:none;
}

.cards{
grid-template-columns:repeat(2,1fr);
}

.about{
grid-template-columns:1fr;
}
}

@media(max-width:600px){
.hero{
min-height:500px;
padding:50px 7%;
}

.hero h1{
font-size:42px;
}

.cards{
grid-template-columns:1fr;
}

.stats{
grid-template-columns:1fr;
}

footer{
flex-direction:column;
}
}
EOF


for page in profil unit-usaha produk kios-angkat pertanian anggota berita galeri kontak
do

cat > "$page.html" <<EOF
<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>$page - KDMP Unjur</title>
<link rel="stylesheet" href="css/style.css">
</head>

<body>

<header>
<div class="logo">
<div class="logo-circle">KDMP</div>
<div>
<h2>KDMP UNJUR</h2>
<small>Koperasi Desa Merah Putih Unjur</small>
</div>
</div>

<nav>
<a href="index.html">Beranda</a>
<a href="profil.html">Profil</a>
<a href="unit-usaha.html">Unit Usaha</a>
<a href="produk.html">Produk</a>
<a href="kios-angkat.html">Kios Angkat</a>
<a href="pertanian.html">Pertanian</a>
<a href="anggota.html">Anggota</a>
<a href="berita.html">Berita</a>
<a href="galeri.html">Galeri</a>
<a href="kontak.html">Kontak</a>
</nav>
</header>

<section class="hero" style="min-height:350px">
<div class="hero-content">
<span>KDMP UNJUR</span>
<h1>$page</h1>
<p>
Informasi dan layanan Koperasi Desa Merah Putih Unjur.
</p>
</div>
</section>

<section class="section">

<div class="section-title">
<span>INFORMASI</span>
<h2>$page KDMP Unjur</h2>
<p>
Halaman ini akan dikembangkan menjadi modul lengkap sesuai kebutuhan koperasi.
</p>
</div>

<div class="cards">

<div class="card">
<div class="icon">🤝</div>
<h3>Usaha Bersama</h3>
<p>
Mengembangkan potensi desa melalui kerja sama koperasi dan anggota.
</p>
</div>

<div class="card">
<div class="icon">🏘️</div>
<h3>Untuk Masyarakat</h3>
<p>
Memberikan pelayanan dan manfaat bagi masyarakat Desa Unjur.
</p>
</div>

<div class="card">
<div class="icon">📈</div>
<h3>Pengembangan</h3>
<p>
Usaha dikembangkan secara bertahap sesuai potensi dan kebutuhan desa.
</p>
</div>

<div class="card">
<div class="icon">💼</div>
<h3>Anggota</h3>
<p>
Anggota menjadi bagian penting dalam kegiatan usaha koperasi.
</p>
</div>

</div>
</section>

<footer>
<div>
<h3>KDMP UNJUR</h3>
<p>Koperasi Desa Merah Putih Unjur</p>
</div>
<p>© 2026 KDMP Unjur</p>
</footer>

</body>
</html>
EOF

done

echo "===================================="
echo " WEBSITE KDMP UNJUR BERHASIL DIBUAT"
echo "===================================="
echo "File dan halaman dasar sudah dibuat."
EOF

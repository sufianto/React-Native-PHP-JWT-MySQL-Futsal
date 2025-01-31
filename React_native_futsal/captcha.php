<?php

// Konfigurasi session agar bisa digunakan di cross-domain atau HTTPS
ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');

// Mulai sesi
session_start();
 // Pastikan sesi aktif

// Generate string CAPTCHA (6 karakter, huruf & angka)
$captcha_string = substr(str_shuffle("23456789ABCDEFGHJKLMNPQRSTUVWXYZ"), 0, 6);
$_SESSION['captcha'] = $captcha_string;

// Debugging: Log CAPTCHA yang dibuat
error_log("CAPTCHA Generated: " . $_SESSION['captcha']);

// Buat gambar CAPTCHA
header('Content-Type: image/png');
$image = imagecreatetruecolor(100, 40);
$bg_color = imagecolorallocate($image, 255, 255, 255); // Putih
$text_color = imagecolorallocate($image, 0, 0, 0); // Hitam
$line_color = imagecolorallocate($image, 64, 64, 64); // Garis abu-abu

imagefilledrectangle($image, 0, 0, 100, 40, $bg_color);

// Tambahkan garis acak untuk mengganggu bot
for ($i = 0; $i < 5; $i++) {
    imageline($image, rand(0, 100), rand(0, 40), rand(0, 100), rand(0, 40), $line_color);
}

// Tambahkan teks CAPTCHA
imagestring($image, 5, 15, 10, $captcha_string, $text_color);

// Tampilkan gambar CAPTCHA
imagepng($image);
imagedestroy($image);
?>

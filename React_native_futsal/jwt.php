<?php
require_once "vendor/autoload.php";  // Tambahkan ini

use Firebase\JWT\JWT;

$key = "kunciRahasiaSuperAman123!@#";  // Ganti dengan kunci rahasia yang lebih kuat

// Fungsi untuk membuat token
function generate_jwt($user_id, $username, $email, $foto) {
    global $key;

    $issued_at = time();
    $expiration_time = $issued_at + (7 * 24 * 60 * 60); // Token berlaku selama 7 hari

    $payload = [
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'id' => $user_id,
        'username' => $username,
        'email' => $email,
        'foto' => $foto,
    ];

    $jwt = JWT::encode($payload, $key, 'HS256');
    return $jwt;
}
?>

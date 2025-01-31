<?php
require_once 'vendor/autoload.php'; // pastikan sudah install library JWT
require_once 'db.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type: application/json');

$key = "kunciRahasiaSuperAman123!@#";

// Fungsi untuk mendapatkan token dari header
function get_jwt_from_header() {
    // Coba cek header Authorization dari $_SERVER
    if (isset($_SERVER['HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['HTTP_AUTHORIZATION'];
    } elseif (isset($_SERVER['REDIRECT_HTTP_AUTHORIZATION'])) {
        $authHeader = $_SERVER['REDIRECT_HTTP_AUTHORIZATION']; // Untuk server tertentu yang memakai REDIRECT_ prefix
    } else {
        return null;
    }

    // Pastikan ada "Bearer " di header Authorization
    if (preg_match('/Bearer (.+)/', $authHeader, $matches)) {
        return $matches[1];  // Kembalikan token yang ditemukan
    }
    return null;  // Jika tidak ada token yang valid
}


$token = get_jwt_from_header();

if ($token) {
    try {
        // Decode token
        $decoded = JWT::decode($token, new Key($key, 'HS256'));
        $user_id = $decoded->id;
        
        // Ambil data terbaru dari database
        $sql = "SELECT id, username, email, foto FROM users WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $result = $stmt->get_result();
        $user = $result->fetch_assoc();
        
        if ($user) {
            // Pastikan path foto lengkap
            if ($user['foto']) {
                // Jika foto adalah URL lengkap, gunakan apa adanya
                if (strpos($user['foto'], 'http') === 0) {
                    $foto_path = $user['foto'];
                } else {
                    // Jika foto adalah path relatif, tambahkan base URL
                    $foto_path = $user['foto'];
                }
                $user['foto'] = $foto_path;
            }
            
            echo json_encode([
                "id" => $user['id'],
                "username" => $user['username'],
                "email" => $user['email'],
                "foto" => $user['foto']
            ]);
        } else {
            echo json_encode(["error" => "User tidak ditemukan"]);
        }
        
    } catch (Exception $e) {
        // Jika token invalid
        echo json_encode(["error" => "Token tidak valid atau kadaluarsa: " . $e->getMessage()]);
    }
} else {
    // Jika token tidak ditemukan
    echo json_encode(["error" => "Token tidak ditemukan"]);
}

// Log untuk debugging
error_log("Profile API Response: " . json_encode($user ?? null));

// // Debug: Menampilkan semua header yang diterima server
// var_dump(getallheaders()); 
// exit;



?>

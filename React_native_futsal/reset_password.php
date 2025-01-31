<?php
require_once 'vendor/autoload.php';
require_once 'db.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Methods: POST, OPTIONS");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$key = "kunciRahasiaSuperAman123!@#";

// Ambil token dari header seperti di update_profile.php
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = str_replace('Bearer ', '', $authHeader);

error_log("Received Authorization: " . $authHeader);
error_log("Extracted Token: " . $token);

try {
    $data = json_decode(file_get_contents("php://input"), true);
    
    if (!isset($data['oldPassword']) || !isset($data['newPassword'])) {
        echo json_encode(["error" => "Semua kolom harus diisi"]);
        exit;
    }

    // Decode token
    $decoded = JWT::decode($token, new Key($key, 'HS256'));
    $userId = $decoded->id;

    error_log("Decoded User ID: " . $userId);

    // Verifikasi password lama
    $stmt = $conn->prepare("SELECT password FROM users WHERE id = ?");
    $stmt->bind_param("i", $userId);
    $stmt->execute();
    $result = $stmt->get_result();
    
    if ($result->num_rows === 0) {
        error_log("User not found with ID: " . $userId);
        echo json_encode(["error" => "User tidak ditemukan"]);
        exit;
    }

    $user = $result->fetch_assoc();
    $stmt->close();

    if (!password_verify($data['oldPassword'], $user['password'])) {
        error_log("Old password verification failed for user ID: " . $userId);
        echo json_encode(["error" => "Password lama salah"]);
        exit;
    }

    // Update password baru
    $newHashedPassword = password_hash($data['newPassword'], PASSWORD_BCRYPT);
    $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE id = ?");
    $updateStmt->bind_param("si", $newHashedPassword, $userId);

    if ($updateStmt->execute()) {
        echo json_encode(["success" => true, "message" => "Password berhasil diperbarui"]);
    } else {
        error_log("Password update failed: " . $conn->error);
        echo json_encode(["error" => "Gagal memperbarui password"]);
    }

    $updateStmt->close();

} catch (Exception $e) {
    error_log("JWT Error: " . $e->getMessage());
    echo json_encode([
        "error" => "Token tidak valid atau kadaluarsa",
        "details" => $e->getMessage()
    ]);
}
?>

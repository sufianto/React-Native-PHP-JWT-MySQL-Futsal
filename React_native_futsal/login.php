<?php
require_once "vendor/autoload.php";
use Firebase\JWT\JWT;

ini_set('session.cookie_samesite', 'None');
ini_set('session.cookie_secure', '1');

if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$key = "kunciRahasiaSuperAman123!@#";
require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);
$username = trim($data['username'] ?? '');
$password = trim($data['password'] ?? '');
$captcha_input = trim($data['captcha'] ?? '');

// Log debugging
error_log("CAPTCHA session: " . ($_SESSION['captcha'] ?? 'Tidak ada'));
error_log("CAPTCHA user input: " . $captcha_input);

if (!isset($_SESSION['captcha']) || strtolower($captcha_input) !== strtolower($_SESSION['captcha'])) {
    echo json_encode(["error" => "CAPTCHA tidak valid!"]);
    exit;
}

unset($_SESSION['captcha']); // Hapus setelah diverifikasi

if (empty($username) || empty($password)) {
    echo json_encode(["error" => "Username dan password harus diisi"]);
    exit;
}

$sql = "SELECT * FROM users WHERE username = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $username);
$stmt->execute();
$result = $stmt->get_result();
$user = $result->fetch_assoc();

if (!$user) {
    echo json_encode(["error" => "Username tidak ditemukan"]);
    exit;
}

if (!password_verify($password, $user['password'])) {
    echo json_encode(["error" => "Password salah"]);
    exit;
}

// Fungsi untuk membuat token JWT
function generate_jwt($user_id, $username, $email, $foto) {
    global $key;
    $issued_at = time();
    $expiration_time = $issued_at + 3600; // 1 jam
    $payload = [
        'iat' => $issued_at,
        'exp' => $expiration_time,
        'id' => $user_id,
        'username' => $username,
        'email' => $email,
        'foto' => $foto,
    ];
    return JWT::encode($payload, $key, 'HS256');
}

$token = generate_jwt($user['id'], $user['username'], $user['email'], $user['foto']);

echo json_encode([
    "message" => "Login berhasil",
    "token" => $token
]);
?>

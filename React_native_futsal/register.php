<?php
// header("Access-Control-Allow-Origin: *");
// header("Access-Control-Allow-Methods: POST");
// header("Content-Type: application/json");

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");


require_once "db.php";

$data = json_decode(file_get_contents("php://input"), true);

if (isset($data["username"], $data["email"], $data["password"])) {
    $username = $data["username"];
    $email = $data["email"];
    $password = password_hash($data["password"], PASSWORD_DEFAULT); // Hash password

    $stmt = $conn->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
    $stmt->bind_param("sss", $username, $email, $password);

    if ($stmt->execute()) {
        echo json_encode(["message" => "Registrasi berhasil"]);
    } else {
        echo json_encode(["error" => "Gagal registrasi, username atau email sudah digunakan"]);
    }

    $stmt->close();
} else {
    echo json_encode(["error" => "Data tidak lengkap"]);
}

$conn->close();
?>

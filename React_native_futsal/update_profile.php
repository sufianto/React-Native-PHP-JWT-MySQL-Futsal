<?php
require_once 'vendor/autoload.php';
require_once 'db.php';
use Firebase\JWT\JWT;
use Firebase\JWT\Key;

header('Content-Type: application/json');

$key = "kunciRahasiaSuperAman123!@#";

// Ambil token dari header
$authHeader = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
$token = str_replace('Bearer ', '', $authHeader);

try {
    // Decode token
    $decoded = JWT::decode($token, new Key($key, 'HS256'));
    $user_id = $decoded->id;

    // Proses update data
    $username = $_POST['username'] ?? '';
    $email = $_POST['email'] ?? '';
    
    $updateFields = [];
    $updateValues = [];
    $types = '';

    if (!empty($username)) {
        $updateFields[] = "username = ?";
        $updateValues[] = $username;
        $types .= 's';
    }

    if (!empty($email)) {
        $updateFields[] = "email = ?";
        $updateValues[] = $email;
        $types .= 's';
    }

    // Handle foto upload
    if (isset($_FILES['foto']) && $_FILES['foto']['error'] === UPLOAD_ERR_OK) {
        $upload_dir = 'uploads/';
        if (!file_exists($upload_dir)) {
            mkdir($upload_dir, 0777, true);
        }

        $file_extension = pathinfo($_FILES['foto']['name'], PATHINFO_EXTENSION);
        $new_filename = 'profile_' . $user_id . '_' . time() . '.' . $file_extension;
        $upload_path = $upload_dir . $new_filename;

        if (move_uploaded_file($_FILES['foto']['tmp_name'], $upload_path)) {
            $updateFields[] = "foto = ?";
            $updateValues[] = $upload_path;
            $types .= 's';
        }
    }

    if (!empty($updateFields)) {
        $updateValues[] = $user_id;
        $types .= 'i';

        $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param($types, ...$updateValues);
        
        if ($stmt->execute()) {
            // Ambil data terbaru setelah update
            $select_sql = "SELECT username, email, foto FROM users WHERE id = ?";
            $select_stmt = $conn->prepare($select_sql);
            $select_stmt->bind_param("i", $user_id);
            $select_stmt->execute();
            $result = $select_stmt->get_result();
            $updated_data = $result->fetch_assoc();
            
            echo json_encode([
                'success' => true, 
                'message' => 'Profil berhasil diperbarui',
                'data' => $updated_data
            ]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Gagal memperbarui profil']);
        }
    } else {
        echo json_encode(['success' => false, 'message' => 'Tidak ada data yang diperbarui']);
    }

} catch (Exception $e) {
    echo json_encode(['success' => false, 'message' => 'Token tidak valid']);
}
?>

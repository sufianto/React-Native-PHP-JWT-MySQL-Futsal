<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Content-Type: application/json");

require_once "db.php";

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $result = $conn->query("SELECT * FROM users");
        $users = $result->fetch_all(MYSQLI_ASSOC);
        echo json_encode($users);
        break;

    case 'POST':
        $data = json_decode(file_get_contents('php://input'), true);
        $username = $data['username'];
        $email = $data['email'];
        $password = password_hash($data['password'], PASSWORD_BCRYPT); // Hash password
        $conn->query("INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$password')");
        echo json_encode(['message' => 'User created']);
        break;

    case 'PUT':
        $data = json_decode(file_get_contents('php://input'), true);
        $id = $data['id'];
        $username = $data['username'];
        $email = $data['email'];
        $conn->query("UPDATE users SET username = '$username', email = '$email' WHERE id = $id");
        echo json_encode(['message' => 'User updated']);
        break;

    case 'DELETE':
        $id = $_GET['id'];
        $conn->query("DELETE FROM users WHERE id = $id");
        echo json_encode(['message' => 'User deleted']);
        break;
}
$conn->close();
?>

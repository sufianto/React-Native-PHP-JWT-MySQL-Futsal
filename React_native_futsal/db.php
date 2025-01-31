<?php
$host = "localhost";
$user = "root";
$password = "";
$dbname = "react_native_futsal";

$conn = new mysqli($host, $user, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode(["error" => "Database connection failed"]));
}
?>

<?php
require 'db.php';
require 'auth.php';
requireAdmin();
$data = json_decode(file_get_contents('php://input'), true);
$stmt = $conn->prepare('INSERT INTO products (title,price,rating,description,image_url,brand,size,function_type,category) VALUES (?,?,?,?,?,?,?,?,?)');
$stmt->execute([
  $data['title'],
  $data['price'],
  $data['rating'],
  $data['description'],
  $data['image'],
  $data['brand'],
  $data['size'],
  $data['function_type'],
  $data['category'] ?? 'device'
]);
echo json_encode(['id' => $conn->lastInsertId()]);
?>
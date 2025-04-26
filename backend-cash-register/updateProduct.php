<?php
require 'db.php';
require 'auth.php';
requireAdmin();
$id = (int)$_GET['id'];
$data = json_decode(file_get_contents('php://input'), true);
$stmt = $conn->prepare('UPDATE products SET title=?,price=?,rating=?,description=?,image_url=?,brand=?,size=?,function_type=?,category=? WHERE id=?');
$stmt->execute([
  $data['title'],
  $data['price'],
  $data['rating'],
  $data['description'],
  $data['image'],
  $data['brand'],
  $data['size'],
  $data['function_type'],
  $data['category'] ?? 'device',
  $id
]);
echo json_encode(['status'=>'updated']);
?>
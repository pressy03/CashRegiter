<?php
require 'db.php';
require 'auth.php';
requireAdmin();
$id=(int)$_GET['id'];
$stmt=$conn->prepare('DELETE FROM products WHERE id=?');
$stmt->execute([$id]);
echo json_encode(['status'=>'deleted']);
?>
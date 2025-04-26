<?php
require 'db.php';
$id=(int)$_GET['id'];
$stmt=$conn->prepare('SELECT * FROM products WHERE id=?');
$stmt->execute([$id]);
echo json_encode($stmt->fetch());
?>
<?php
require 'db.php';
require 'auth.php';
requireLogin();
$data=json_decode(file_get_contents('php://input'),true);
$stmt=$conn->prepare('INSERT INTO messages (user_id,content) VALUES (?,?)');
$stmt->execute([$_SESSION['user']['id'],$data['description']]);
echo json_encode(['status'=>'received']);
?>
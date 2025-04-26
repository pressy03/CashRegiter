<?php
require 'db.php';
require 'auth.php';
requireLogin();
$data=json_decode(file_get_contents('php://input'),true);
$conn->prepare('INSERT INTO service_requests (user_id,description) VALUES (?,?)')
      ->execute([$_SESSION['user']['id'],$data['description']]);
echo json_encode(['status'=>'received']);
?>
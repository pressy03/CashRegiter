<?php
require 'db.php';
$data=json_decode(file_get_contents('php://input'),true);
$username=$data['username'] ?? '';
$password=$data['password'] ?? '';
if(!$username || !$password){
  http_response_code(400);
  echo json_encode(['error'=>'missing fields']);
  exit;
}
if($username === 'admin'){
  http_response_code(403);
  echo json_encode(['error'=>'cannot use reserved username']);
  exit;
}
$stmt=$conn->prepare('SELECT id FROM users WHERE username=?');
$stmt->execute([$username]);
if($stmt->fetch()){
  http_response_code(409);
  echo json_encode(['error'=>'user exists']);
  exit;
}
$hash=password_hash($password,PASSWORD_DEFAULT);
$conn->prepare('INSERT INTO users (username,password,role) VALUES (?,?,?)')
      ->execute([$username,$hash,'user']);
echo json_encode(['status'=>'registered']);
?>
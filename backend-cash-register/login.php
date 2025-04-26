<?php
require 'db.php';
$data=json_decode(file_get_contents('php://input'),true);
$username=$data['username']??'';
$password=$data['password']??'';
$stmt=$conn->prepare('SELECT * FROM users WHERE username=?');
$stmt->execute([$username]);
$user=$stmt->fetch();
if(!$user || !password_verify($password,$user['password'])){
  http_response_code(401);
  echo json_encode(['error'=>'invalid credentials']);
  exit;
}
$_SESSION['user']=['id'=>$user['id'],'username'=>$user['username'],'role'=>$user['role']];
echo json_encode($_SESSION['user']);
?>
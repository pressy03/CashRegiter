<?php
require 'db.php';
require 'auth.php';

if (isset($_SESSION['user'])) {
  header('Content-Type: application/json');
  echo json_encode($_SESSION['user']);
} else {
  http_response_code(401);
  echo json_encode(['error' => 'unauthorized']);
}
?>

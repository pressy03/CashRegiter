<?php
function requireLogin() {
  if (!isset($_SESSION['user'])) {
    http_response_code(401);
    echo json_encode(['error'=>'unauthenticated']);
    exit;
  }
}
function requireAdmin() {
  requireLogin();
  if ($_SESSION['user']['role'] !== 'admin') {
    http_response_code(403);
    echo json_encode(['error'=>'forbidden']);
    exit;
  }
}
?>
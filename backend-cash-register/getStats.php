<?php
require 'db.php';
require 'auth.php';
requireLogin();
header('Content-Type: application/json');

$stmt = $conn->prepare('
  SELECT SUM(quantity) as qty
  FROM order_items oi
  JOIN products p ON oi.product_id = p.id
  WHERE oi.order_id IN (
    SELECT id FROM orders WHERE user_id=?
  )
  AND p.category="consumable"
');
$stmt->execute([$_SESSION['user']['id']]);
$row = $stmt->fetch();
echo json_encode(['consumableQty'=> (int)$row['qty']]);
?>

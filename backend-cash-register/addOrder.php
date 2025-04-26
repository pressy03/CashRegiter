<?php
require 'db.php';
require 'auth.php';
requireLogin();
$data = json_decode(file_get_contents('php://input'), true);
$payment = $data['payment_method'];
$items = $data['items']; // array of {product_id, quantity, price}
$total = 0;
foreach($items as $it){ $total += $it['price'] * $it['quantity']; }

$conn->beginTransaction();
$stmt = $conn->prepare('INSERT INTO orders (user_id,payment_method,total) VALUES (?,?,?)');
$stmt->execute([$_SESSION['user']['id'],$payment,$total]);
$order_id = $conn->lastInsertId();

$oi = $conn->prepare('INSERT INTO order_items (order_id,product_id,quantity,price_each) VALUES (?,?,?,?)');
foreach($items as $it){
  $oi->execute([$order_id,$it['product_id'],$it['quantity'],$it['price']]);
}
$conn->commit();
echo json_encode(['order_id'=>$order_id]);
?>
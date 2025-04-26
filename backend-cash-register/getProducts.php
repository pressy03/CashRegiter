<?php
require 'db.php';
$stmt=$conn->query('SELECT * FROM products');
echo json_encode($stmt->fetchAll());
?>
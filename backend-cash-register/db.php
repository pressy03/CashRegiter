<?php
require_once 'cors.php';
session_start();
$host='localhost';
$db='cash_registers';
$user='root';
$pass='';
$dsn="mysql:host=$host;dbname=$db;charset=utf8mb4";
$options=[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC];
$conn=new PDO($dsn,$user,$pass,$options);
?>
<?php
include 'db.php';
$name = $_POST['name'];
$price = $_POST['price'];
$stock = $_POST['stock'];
$category = $_POST['category'];
$desc = $_POST['description'];
$image = $_FILES['image']['name'];
$tmp = $_FILES['image']['tmp_name'];
move_uploaded_file($tmp, "uploads/".$image);
$sql = "INSERT INTO bags (name, price, image, stock, category, description) VALUES ('$name', '$price', '$image', '$stock', '$category', '$desc')";
$conn->query($sql);
header("Location: products.php");
?>
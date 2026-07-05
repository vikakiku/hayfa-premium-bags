<?php
include 'db.php';
$id = $_POST['id'];
$name = $_POST['name'];
$price = $_POST['price'];
$stock = $_POST['stock'];
$category = $_POST['category'];
$desc = $_POST['description'];
if ($_FILES['image']['name']) {
  $image = $_FILES['image']['name'];
  $tmp = $_FILES['image']['tmp_name'];
  move_uploaded_file($tmp, "uploads/".$image);
  $sql = "UPDATE bags SET name='$name', price=$price, stock=$stock, category='$category', description='$desc', image='$image' WHERE id=$id";
} else {
  $sql = "UPDATE bags SET name='$name', price=$price, stock=$stock, category='$category', description='$desc' WHERE id=$id";
}
$conn->query($sql);
header("Location: products.php");
?>

<?php include 'db.php'; $id = $_GET['id']; $conn->query("DELETE FROM bags WHERE id=$id"); header("Location: products.php"); ?>

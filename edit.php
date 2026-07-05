<?php include 'db.php'; $id = $_GET['id']; $row = $conn->query("SELECT * FROM bags WHERE id=$id")->fetch_assoc(); ?>
<!DOCTYPE html>
<html>
<head><title>Edit Product</title></head>
<body>
  <h1>Edit Bag</h1>
  <form method="POST" action="update.php" enctype="multipart/form-data">
    <input type="hidden" name="id" value="<?= $id ?>">
    <input type="text" name="name" value="<?= $row['name'] ?>" required><br>
    <input type="number" name="price" value="<?= $row['price'] ?>" required><br>
    <input type="number" name="stock" value="<?= $row['stock'] ?>" required><br>
    <input type="text" name="category" value="<?= $row['category'] ?>" required><br>
    <textarea name="description"><?= $row['description'] ?></textarea><br>
    <input type="file" name="image"><br>
    <button type="submit">Update</button>
  </form>
</body>
</html>
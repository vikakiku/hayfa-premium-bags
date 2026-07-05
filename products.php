<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Products - Hayfa Leather</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

  <div class="top-bar">
    <p>Website Exclusive for Shipping Worldwide</p>
  </div>

  <header class="main-header">
    <div class="nav-left">
      <div class="logo">HAYFA</div>
      <nav>
        <a href="index.php">Home</a>
        <a href="products.php">Products</a>
        <a href="add_product.php">Add Product</a>
        <a href="about.html">About</a>
      </nav>
    </div>
    <div class="nav-right">
      <span>IDR ▾</span>
      <span>🔍</span>
      <span>👜</span>
      <span>👤</span>
    </div>
  </header>

  <main class="products-section">
    <h1>Our Collection</h1>
    <a class="add-btn" href="add_product.php">+ Add New Product</a>

    <table class="products-table">
      <tr>
        <th>Name</th>
        <th>Price</th>
        <th>Stock</th>
        <th>Category</th>
        <th>Image</th>
        <th>Actions</th>
      </tr>
      <?php
      $result = $conn->query("SELECT * FROM bags");
      while($row = $result->fetch_assoc()): ?>
        <tr>
          <td><?= $row['name'] ?></td>
          <td>IDR <?= number_format($row['price']) ?></td>
          <td><?= $row['stock'] ?></td>
          <td><?= $row['category'] ?></td>
          <td><img src="uploads/<?= $row['image'] ?>" width="70"></td>
          <td>
            <a class="action-btn edit" href="edit.php?id=<?= $row['id'] ?>">Edit</a>
            <a class="action-btn delete" href="delete.php?id=<?= $row['id'] ?>" onclick="return confirm('Delete this product?')">Delete</a>
          </td>
        </tr>
      <?php endwhile; ?>
    </table>
  </main>

  <footer>
    <p>&copy; 2025 Hayfa Leather Co.</p>
  </footer>

</body>
</html>

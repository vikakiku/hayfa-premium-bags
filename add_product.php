<?php include 'db.php'; ?>
<!DOCTYPE html>
<html>
<head>
  <title>Add Product - Hayfa Leather</title>
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

  <main class="form-section">
    <h1>Add New Product</h1>
    <form method="POST" action="insert.php" enctype="multipart/form-data" class="product-form">
      <input type="text" name="name" placeholder="Bag Name" required>
      <input type="number" name="price" placeholder="Price (IDR)" required>
      <input type="number" name="stock" placeholder="Stock" required>
      <input type="text" name="category" placeholder="Category" required>
      <textarea name="description" placeholder="Description"></textarea>
      <input type="file" name="image" accept="image/*">
      <input type="submit" value="Add Product">
    </form>
  </main>

  <footer>
    <p>&copy; 2025 Hayfa Leather Co.</p>
  </footer>

</body>
</html>

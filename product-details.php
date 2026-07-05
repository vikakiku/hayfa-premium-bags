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

<?php
include 'db.php';

$name = $_GET['name'] ?? '';

$stmt = $conn->prepare("SELECT * FROM bags WHERE name = ?");
$stmt->bind_param("s", $name);
$stmt->execute();
$product = $stmt->get_result()->fetch_assoc();

if (!$product) {
  echo "<h2>Product not found.</h2>";
  exit;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title><?= htmlspecialchars($product['name']) ?> - Hayfa Bag</title>
  <link rel="stylesheet" href="styles.css">
</head>
<body>

  <div class="detail-container">
    <img class="product-image" src="uploads/<?= htmlspecialchars($product['image']) ?>" alt="<?= htmlspecialchars($product['name']) ?>">
    <h1 class="product-title"><?= htmlspecialchars($product['name']) ?></h1>
    <p class="product-price">IDR <?= number_format($product['price'], 0, ',', '.') ?></p>
    <p class="product-description"><?= htmlspecialchars($product['description']) ?></p>

    <?php if ($product['stock'] <= 0): ?>
      <p class="stock-finished">Sorry, this item is sold out.</p>
    <?php else: ?>
      <p class="stock-info">Only <?= $product['stock'] ?> left in stock!</p>

      <form action="cart.php" method="post" class="add-to-cart-form">
        <input type="hidden" name="product_id" value="<?= $product['id'] ?>">
        <label for="quantity">Qty:</label>
        <input type="number" name="quantity" id="quantity" value="1" min="1" max="<?= $product['stock'] ?>" class="quantity-input">
        <button type="submit" class="btn-add-cart">Add to Cart</button>
      </form>
    <?php endif; ?>
  </div>

</body>
</html>

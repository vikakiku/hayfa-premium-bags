<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Hayfa Leather</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="page-container">

  <!-- Top announcement bar -->
  <div class="top-bar">
    <p>Exclusive Website for Shipping in Asia</p>
  </div>

  <!-- Main header with logo and nav -->
  <header class="main-header">
  <div class="nav-left">
    <div class="logo">HAYFA</div>
    <nav class="main-nav">
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


<main>
    <section class="hero">
      <h1>Welcome to Hayfa Bag Boutique</h1>
      <p>Elegant handcrafted bags, made with care and cultural heritage.</p>
    </section>

    <section class="homepage-products">
  <h2>Our Collection</h2>
  <div class="product-grid">
    <?php
    include 'db.php'; // Make sure this is only included once
    $result = $conn->query("SELECT * FROM bags ORDER BY id DESC");
    while($row = $result->fetch_assoc()): ?>
    
      <div class="product-card">
        <!-- Product clickable link -->
        <a href="product-details.php?name=<?= urlencode($row['name']) ?>" class="product-link">
          <img src="uploads/<?= $row['image'] ?>" alt="<?= $row['name'] ?>">
          <h3><?= $row['name'] ?></h3>
        </a>

        <!-- Stock badge -->
        <?php if($row['stock'] <= 0): ?>
          <span class="badge finished">Finished</span>
        <?php elseif($row['stock'] <= 10): ?>
          <span class="badge low-stock">Low Stock</span>
        <?php endif; ?>

        <!-- Price -->
        <p class="price">IDR <?= number_format($row['price'], 0, ',', '.') ?></p>
      </div>

    <?php endwhile; ?>
  </div>
</section>

  </main>

  <footer>
    <p>&copy; 2025 Hayfa Leather Co.</p>
  </footer>

</body>
</html>

<template>
  <footer class="footer mg_t100">
    <div class="footer-container">
      <div class="footer-section">
        <h3>CHĂM SÓC KHÁCH HÀNG</h3>
        <ul>
          <li><a href="#">Trung tâm trợ giúp</a></li>
          <li><a href="#">Hướng dẫn mua hàng</a></li>
          <li><a href="#">Hướng dẫn bán hàng</a></li>
          <li><a href="#">Chính sách bảo hành</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>VỀ SHOPEE</h3>
        <ul>
          <li><a href="#">Giới thiệu</a></li>
          <li><a href="#">Tuyển dụng</a></li>
          <li><a href="#">Điều khoản Shopee</a></li>
          <li><a href="#">Chính sách bảo mật</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>THANH TOÁN</h3>
        <div class="payment-methods">
          <img src="" alt="Visa" />
          <img src="" alt="MasterCard" />
          <img src="" alt="Momo" />
        </div>
        <h3>ĐƠN VỊ VẬN CHUYỂN</h3>
        <div class="shipping-methods">
          <img src="" alt="GHN" />
          <img src="" alt="ViettelPost" />
        </div>
      </div>
      <div class="footer-section">
        <h3>THEO DÕI CHÚNG TÔI</h3>
        <ul>
          <li><a href="#">Facebook</a></li>
          <li><a href="#">Instagram</a></li>
          <li><a href="#">YouTube</a></li>
        </ul>
      </div>
      <div class="footer-section">
        <h3>TẢI ỨNG DỤNG SHOPEE</h3>
        <div class="app-download">
          <img src="" alt="QR Code" />
          <div class="app-links">
            <img src="" alt="Google Play" />
            <img src="" alt="App Store" />
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>
<style lang="css" scoped>
.footer {
  background-color: #f5f5f5;
  padding: 40px 0;
  font-family: Arial, sans-serif;
}

.footer-container {
  display: flex;
  justify-content: space-between;
  max-width: 1200px;
  margin: auto;
  flex-wrap: wrap;
}

.footer-section {
  flex: 1;
  min-width: 200px;
  margin-bottom: 20px;
}

.footer-section h3 {
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 10px;
  margin-top: 20px
}

.footer-section ul {
  list-style: none;
  padding: 0;
}

.footer-section ul li {
  margin-bottom: 8px;
}

.footer-section ul li a {
  text-decoration: none;
  color: #333;
  font-size: 1.1rem;
}

.payment-methods,
.shipping-methods,
.app-download {
  display: flex;
  gap: 10px;
}

.app-links img {
  width: 120px;
}

.app-download img {
  width: 100px;
}
</style>

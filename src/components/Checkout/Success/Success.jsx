import React from "react";
import "./success.scss";
function Success() {
  return (
    <div className="success-page">
      <header className="success-header">HELIOS</header>
      <div className="success-content">
        <h2>Thanh toán thành công!</h2>
        <p>Cảm ơn bạn đã mua hàng. Đơn hàng của bạn đang được xử lý.</p>
        <a href="/" className="home-link">← Quay về trang chủ</a>
      </div>
    </div>
  );
}

export default Success;

import React from "react";
import "./OrderSummary.scss";

const OrderSummary = ({ order }) => {
  const vnTime = new Date(order.order_date).toLocaleString("vi-VN", {
    timeZone: "Asia/Ho_Chi_Minh",
  });
  return (
    <div className="order-summary">
      <div style={{ margin: "10px 0" }}>Mã đơn hàng: {order.id} </div>
      <div>Ngày đặt: {vnTime}</div>

      {order.Products.map((product) => (
        <div key={product.id} className="product">
          <img
            src={product?.image || "https://via.placeholder.com/100"} // dùng ảnh nếu có
            alt={product?.name}
            className="product-img"
          />
          <div className="product-info">
            <p className="product-title">{product.name}</p>
            <span className="product-option">
              Phân loại hàng: {product?.Category?.name || "Không có"}
            </span>
            <span className="product-qty">
              x{product.OrderDetail?.quantity || 1}
            </span>
          </div>
          <div className="product-price">₫{product.price.toLocaleString()}</div>
        </div>
      ))}

      <div className="total">
        <span>Thành tiền:</span>
        <span className="total-price">₫{order.total.toLocaleString()}</span>
      </div>

      <div className="actions">
        <span>Trạng thái: {order.status}</span>
        <button className="btn buy-again">Mua Lại</button>
      </div>
    </div>
  );
};

export default OrderSummary;

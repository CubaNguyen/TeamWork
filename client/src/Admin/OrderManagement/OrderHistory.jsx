import React from "react";
import "./OrderHistory.scss";
//HIHI
const OrderHistory = ({ customer, orders, onBack }) => {
  if (!customer) {
    return (
      <div>
        <p>Không tìm thấy thông tin khách hàng.</p>
        <button onClick={onBack} className="back-btn">Quay lại</button>
      </div>
    );
  }

  return (
    <div>
      <h2>Lịch sử đơn hàng của {customer.username}</h2>
      <ul className="customer-details">
        <li><strong>Username:</strong> {customer.username}</li>
        <li><strong>Email:</strong> {customer.email}</li>
        <li><strong>Số điện thoại:</strong> {customer.phone}</li>
        <li><strong>Địa chỉ:</strong> {customer.address}</li>
        <li><strong>Trạng thái:</strong>{" "}
          <span className={customer.status === "Chưa khóa" ? "status-active" : "status-blocked"}>
            {customer.status}
          </span>{" "}
          {customer.status === "Chưa khóa" ? "✔️" : "❌"}
        </li>
        <li><strong>Ngày tạo:</strong> {customer.createdDate}</li>
      </ul>

      <h3 className="kaka">Đơn hàng</h3>
      <table className="order-table">
        <thead>
          <tr>
            <th>Mã đơn hàng</th>
            <th>Ngày đặt</th>
            <th>Tổng tiền</th>
            <th>Trạng thái</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 ? (
            orders.map((order) => (
              <tr key={order.orderId}>
                <td>{order.orderId}</td>
                <td>{order.date}</td>
                <td>{order.total.toLocaleString()} VNĐ</td>
                <td>{order.status}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">Chưa có đơn hàng nào.</td>
            </tr>
          )}
        </tbody>
      </table>

      <button onClick={onBack} className="back-btn">Quay lại</button>
    </div>
  );
};

export default OrderHistory;

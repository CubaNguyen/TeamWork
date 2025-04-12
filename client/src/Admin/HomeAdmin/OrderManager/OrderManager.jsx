import React, { useState } from "react";
import "./OrderManager.scss";

const orders = [
    { id: 1001, customer: "Nguyễn Văn A", date: "01/03/2025", total: "1,500,000", status: "Chờ xác nhận" },
    { id: 1002, customer: "Trần Thị B", date: "02/03/2025", total: "850,000", status: "Đang giao hàng" }
];

const OrderManager = () => {
    const [viewDetails, setViewDetails] = useState(false);

    return (
        <div className="order-manager">
            <h2>Quản lý đơn hàng</h2>
            {viewDetails ? (
                <div className="details-view">
                    <h3>Dm Gia Huy</h3>
                    <button onClick={() => setViewDetails(false)} className="back-btn">Quay lại</button>
                </div>
            ) : (
                <table className="order-table">
                    <thead>
                        <tr>
                            <th>Mã đơn</th>
                            <th>Khách hàng</th>
                            <th>Ngày đặt</th>
                            <th>Tổng tiền</th>
                            <th>Trạng thái</th>
                            <th>Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id}>
                                <td>{order.id}</td>
                                <td>{order.customer}</td>
                                <td>{order.date}</td>
                                <td>{order.total}</td>
                                <td>{order.status}</td>
                                <td className="actions">
                                    <button onClick={() => setViewDetails(true)} className="view-btn">👁 Xem</button>
                                    <button className="edit-btn">✏️ Cập nhật</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default OrderManager;

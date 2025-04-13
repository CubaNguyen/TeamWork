// src/components/CustomerManager.jsx
import React, { useState, useEffect } from "react";
import "./OrderManagement.scss";

const OrderManagement = () => {
  const [view, setView] = useState("list");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchEmail, setSearchEmail] = useState("");
  const [searchPhone, setSearchPhone] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("Tất cả");
  const customersPerPage = 5;

  useEffect(() => {
    setCustomers([
      {
        id: 1,
        username: "nguyenvana",
        email: "a@gmail.com",
        phone: "097654321",
        address: "123 Đường ABC, TP.HCM",
        status: "Đã khóa",
        createdDate: "01/03/2025",
      },
      {
        id: 2,
        username: "Vũ Thành Đạt",
        email: "b@gmail.com",
        phone: "0978123456",
        address: "456 XYZ",
        status: "Chưa khóa",
        createdDate: "02/03/2025",
      },
      {
        id: 3,
        username: "Phan Công Hợi",
        email: "c@gmail.com",
        phone: "0912345678",
        address: "789 PQR",
        status: "Đã khóa",
        createdDate: "03/03/2025",
      },
      {
        id: 4,
        username: "Nguyễn Ngọc Cân",
        email: "d@gmail.com",
        phone: "0934567890",
        address: "555 MNO",
        status: "Đã khóa",
        createdDate: "04/03/2025",
      },
      {
        id: 5,
        username: "Nguyễn Huyền Đức",
        email: "e@gmail.com",
        phone: "0965432109",
        address: "777 XYZ",
        status: "Chưa khóa",
        createdDate: "05/03/2025",
      },
      {
        id: 6,
        username: "Trần Văn An",
        email: "f@gmail.com",
        phone: "0912345679",
        address: "888 DEF",
        status: "Chưa khóa",
        createdDate: "06/03/2025",
      },
      {
        id: 7,
        username: "Lê Thị Bình",
        email: "g@gmail.com",
        phone: "0923456780",
        address: "999 GHI",
        status: "Đã khóa",
        createdDate: "07/03/2025",
      },
    ]);
  }, []);

  const filteredCustomers = customers.filter(
    (customer) =>
      customer.username.toLowerCase().includes(searchName.toLowerCase()) &&
      customer.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
      customer.phone.includes(searchPhone) &&
      (statusFilter === "Tất cả" || customer.status === statusFilter)
  );

  const totalCustomers = filteredCustomers.length;
  const totalPages = Math.ceil(totalCustomers / customersPerPage);
  const startIndex = (currentPage - 1) * customersPerPage;
  const currentCustomers = filteredCustomers.slice(
    startIndex,
    startIndex + customersPerPage
  );

  useEffect(() => {
    if (selectedCustomerId) {
      setOrders([
        {
          orderId: "DH001",
          date: "2025-04-01",
          total: 500000,
          status: "Hoàn thành",
          customerId: 1,
        },
        {
          orderId: "DH002",
          date: "2025-04-02",
          total: 750000,
          status: "Đang giao",
          customerId: 1,
        },
      ].filter((order) => order.customerId === selectedCustomerId));
    }
  }, [selectedCustomerId]);

  const toggleStatus = (customerId) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === customerId
          ? {
              ...customer,
              status: customer.status === "Chưa khóa" ? "Đã khóa" : "Chưa khóa",
            }
          : customer
      )
    );
  };

  const handleViewHistory = (customerId) => {
    setSelectedCustomerId(customerId);
    setView("history");
  };

  const handleBack = () => {
    setView("list");
    setSelectedCustomerId(null);
    setOrders([]);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const selectedCustomer = customers.find((c) => c.id === selectedCustomerId);

  return (
    <div className="customer-manager">
      {view === "list" ? (
        <>
          <div className="header">
            <h2>Quản lý khách hàng</h2>
          </div>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Nhập tên..."
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập email..."
              value={searchEmail}
              onChange={(e) => setSearchEmail(e.target.value)}
            />
            <input
              type="text"
              placeholder="Nhập SĐT..."
              value={searchPhone}
              onChange={(e) => setSearchPhone(e.target.value)}
            />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="status-filter"
            >
              <option value="Tất cả">Tất cả</option>
              <option value="Chưa khóa">Chưa khóa</option>
              <option value="Đã khóa">Đã khóa</option>
            </select>
          </div>
          <table className="customer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Username</th>
                <th>Email</th>
                <th>SĐT</th>
                <th>Địa chỉ</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {currentCustomers.length > 0 ? (
                currentCustomers.map((customer) => (
                  <tr key={customer.id}>
                    <td>{customer.id}</td>
                    <td
                      className="clickable"
                      onClick={() => handleViewHistory(customer.id)}
                    >
                      {customer.username}
                    </td>
                    <td
                      className="clickable"
                      onClick={() => handleViewHistory(customer.id)}
                    >
                      {customer.email}
                    </td>
                    <td>{customer.phone}</td>
                    <td>{customer.address}</td>
                    <td>
                      <span
                        className={
                          customer.status === "Chưa khóa"
                            ? "status-active"
                            : "status-blocked"
                        }
                      >
                        {customer.status}
                      </span>
                    </td>
                    <td>
                      <button
                        onClick={() => toggleStatus(customer.id)}
                        className={`action-btn ${
                          customer.status === "Chưa khóa"
                            ? "block-btn"
                            : "unblock-btn"
                        }`}
                      >
                        {customer.status === "Chưa khóa" ? "Khóa" : "Mở khóa"}
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7">Chưa có khách hàng nào.</td>
                </tr>
              )}
            </tbody>
          </table>
          <div className="pagination">
            <button
              onClick={handlePrevPage}
              disabled={currentPage === 1}
              className="page-btn"
            >
              Trang trước
            </button>
            <span>
              Trang {currentPage}/{totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage === totalPages}
              className="page-btn"
            >
              Trang sau
            </button>
          </div>
        </>
      ) : (
        <>
          <h2>Lịch sử đơn hàng của {selectedCustomer?.username}</h2>
          {selectedCustomer && (
            <ul className="customer-details">
              <li>
                <strong>Username:</strong> {selectedCustomer.username}
              </li>
              <li>
                <strong>Email:</strong> {selectedCustomer.email}
              </li>
              <li>
                <strong>Số điện thoại:</strong> {selectedCustomer.phone}
              </li>
              <li>
                <strong>Địa chỉ:</strong> {selectedCustomer.address}
              </li>
              <li>
                <strong>Trạng thái:</strong>{" "}
                <span
                  className={
                    selectedCustomer.status === "Chưa khóa"
                      ? "status-active"
                      : "status-blocked"
                  }
                >
                  {selectedCustomer.status}
                </span>{" "}
                {selectedCustomer.status === "Chưa khóa" ? "✔️" : "❌"}
              </li>
              <li>
                <strong>Ngày tạo:</strong> {selectedCustomer.createdDate}
              </li>
            </ul>
          )}
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
          <button onClick={handleBack} className="back-btn">
            Quay lại
          </button>
        </>
      )}
    </div>
  );
};

export default OrderManagement;
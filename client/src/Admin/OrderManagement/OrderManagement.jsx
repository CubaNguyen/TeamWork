import React, { useState, useEffect } from "react";
import "./OrderManagement.scss";
import OrderHistory from "./OrderHistory";

const OrderManagement = () => {
  const [view, setView] = useState("list");
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);
  const [customers, setCustomers] = useState([]);
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

  // Giả lập đơn hàng nếu cần truyền vào OrderHistory
  const orders = [
    {
      orderId: "DH001",
      date: "10/04/2025",
      total: 150000,
      status: "Đã giao",
    },
    {
      orderId: "DH002",
      date: "12/04/2025",
      total: 200000,
      status: "Chờ xác nhận",
    },
  ];

  return (
    <div className="customer-manager">
      {view === "list" ? (
        <>
          <div className="header">
            <h2>Quản Lý Khách Hàng</h2>
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
        <OrderHistory
          customer={customers.find((c) => c.id === selectedCustomerId)}
          orders={orders} // Truyền đơn hàng tương ứng nếu có
          onBack={handleBack}
        />
      )}
    </div>
  );
};

export default OrderManagement;

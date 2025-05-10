import React, { useState } from "react";
import './CustomerManagement.scss'; // CSS của anh iu
import { useEffect } from "react"; // nếu chưa import
import OrderHistory from './OrderHistory';
// Đây là một comment một dòng
const initialCustomers = [
  { id: 1, username: "Đặng Văn Chương", email: "a@gmail.com", phone: "0987654321", address: "123 ABC", status: "active" },
  { id: 2, username: "Vũ Thành Đạt", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  { id: 3, username: "Phan Công Hoài", email: "c@gmail.com", phone: "0912345678", address: "789 PQR", status: "active" },
  { id: 4, username: "Nguyễn Ngọc Cẩn", email: "d@gmail.com", phone: "0934567890", address: "555 MNO", status: "locked" },
  { id: 5, username: "Nguyễn Huỳnh Đức", email: "e@gmail.com", phone: "0965432109", address: "777 XYZ", status: "active" },
  { id: 6, username: "Trần Văn A", email: "f@gmail.com", phone: "0988888888", address: "999 XYZ", status: "locked" },
];

const orderHistory = {
  1: [
    { id: 1002, date: "01/03/2025", total: 1500000, status: "Đã giao hàng" },
    { id: 1003, date: "15/03/2025", total: 750000, status: "Đang giao hàng" },
  ],
  2: [
    { id: 1004, date: "02/04/2025", total: 300000, status: "Đã giao hàng" }
  ],
  3: [
    { id: 1005, date: "02/04/2025", total: 300000, status: "Đã giao hàng" }
  ],
  4: [
    { id: 1006, date: "02/04/2025", total: 300000, status: "Đã giao hàng" }
  ],
  5: [
    { id: 1007, date: "02/04/2025", total: 300000, status: "Đã giao hàng" }
  ],
  6: [
    { id: 1008, date: "02/04/2025", total: 300000, status: "Đã giao hàng" }
  ],
  // Các user khác thêm sau nếu cần
};

const ITEMS_PER_PAGE = 5;

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [nameFilter, setNameFilter] = useState("");
  const [emailFilter, setEmailFilter] = useState("");
  const [phoneFilter, setPhoneFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCustomerId, setSelectedCustomerId] = useState(null);

  const toggleStatus = (id) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, status: customer.status === "active" ? "locked" : "active" } : customer
    ));
  };

  const filteredByName = customers.filter(customer =>
    customer.username.toLowerCase().includes(nameFilter.toLowerCase())
  );

  const filteredByEmail = customers.filter(customer =>
    customer.email.toLowerCase().includes(emailFilter.toLowerCase())
  );

  const filteredByPhone = customers.filter(customer =>
    customer.phone.includes(phoneFilter)
  );

  const filteredByStatus = customers.filter(customer =>
    statusFilter === "all" || customer.status === statusFilter
  );

  const finalFilteredCustomers = filteredByName.filter(c1 =>
    filteredByEmail.some(c2 => c2.id === c1.id) &&
    filteredByPhone.some(c3 => c3.id === c1.id) &&
    filteredByStatus.some(c4 => c4.id === c1.id)
  );

  const totalPages = Math.ceil(finalFilteredCustomers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentCustomers = finalFilteredCustomers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    if (finalFilteredCustomers.length === 1) {
      setSelectedCustomerId(finalFilteredCustomers[0].id);
    } else {
      setSelectedCustomerId(null); // Nếu không phải 1 người, thì ẩn đi
    }
  }, [nameFilter, emailFilter, phoneFilter, statusFilter]);


  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="customer-management">
      <h1>Quản lý Khách hàng</h1>

      <div className="controls">
        <input type="text" placeholder="Nhập tên..." value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
        <input type="text" placeholder="Nhập email..." value={emailFilter} onChange={(e) => setEmailFilter(e.target.value)} />
        <input type="text" placeholder="Nhập SĐT..." value={phoneFilter} onChange={(e) => setPhoneFilter(e.target.value)} />
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="all">Tất cả</option>
          <option value="active">Hoạt động</option>
          <option value="locked">Đã khóa</option>
        </select>
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>SDT</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>
                <button className="link-button" onClick={() => setSelectedCustomerId(customer.id)}>
                  {customer.username}
                </button>
              </td>
              <td>{customer.email}</td>
              <td>{customer.phone}</td>
              <td>{customer.address}</td>
              <td className={customer.status}>
                {customer.status === "active" ? "✅ Hoạt động" : "❌ Đã khóa"}
              </td>
              <td>
                <button onClick={() => toggleStatus(customer.id)} className={customer.status}>
                  {customer.status === "active" ? "🔒 Khóa" : "🔓 Mở khóa"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ textAlign: "center", marginTop: "10px" }}>
        <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
          Trang trước
        </button>
        <span style={{ margin: "0 10px" }}>
          Trang {currentPage} / {totalPages}
        </span>
        <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          Trang sau
        </button>
      </div>

      {selectedCustomerId && orderHistory[selectedCustomerId] && (
  <OrderHistory orders={orderHistory[selectedCustomerId]} />
)}

    </div>
  );
};

export default CustomerManagement;
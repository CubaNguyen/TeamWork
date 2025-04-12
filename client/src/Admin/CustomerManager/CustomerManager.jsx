import React, { useState } from "react";
import "./CustomerManager.scss";

const initialCustomers = [
  { id: 1, username: "Đang Van Chuong", email: "a@gmail.com", phone: "0987654321", address: "123 ABC", status: "active" },
  { id: 2, username: "Vu Thanh Đat", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  { id: 3, username: "Phan Cong Hoai", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  { id: 4, username: "Nguyen Ngoc Can", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  { id: 5, username: "Nguyen Huynh Duc", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  { id: 6, username: "Nguyen Gia HUy", email: "b@gmail.com", phone: "0978123456", address: "456 XYZ", status: "locked" },
  
];

const CustomerManagement = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const toggleStatus = (id) => {
    setCustomers(customers.map(customer =>
      customer.id === id ? { ...customer, status: customer.status === "active" ? "locked" : "active" } : customer
    ));
  };

  const filteredCustomers = customers.filter(customer => 
    (filter === "all" || customer.status === filter) &&
    (customer.username.includes(search) || customer.username.includes(search) || customer.phone.includes(search))
  );

  return (
    <div className="customer-management">
      <h1>Quản lý Khách hàng</h1>

      <div className="controls">
        <input
          type="text"
          placeholder="Tìm kiếm theo số điện thoại"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
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
          {filteredCustomers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.username}</td>
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
    </div>
  );
};

export default CustomerManagement;

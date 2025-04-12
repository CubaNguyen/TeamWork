import React, { useState, useEffect } from 'react';
import './OrderCollect.scss';

const initialCustomers = [
  {
    id: 1,
    username: 'nguyenvana',
    email: 'a@gmail.com',
    phone: '0987654321',
    address: '123 ABC',
    status: 'Hoạt động',
    orders: [
      { id: '1001', date: '01/03/2025', total: 1500000, status: 'Đã giao hàng' },
      { id: '1005', date: '15/03/2025', total: 750000, status: 'Đang giao hàng' }
    ]
  },
  {
    id: 2,
    username: 'tranthith',
    email: 'b@gmail.com',
    phone: '0978123456',
    address: '456 XYZ',
    status: 'Đã khóa',
    orders: []
  },
  {
    id: 3,
    username: 'lethanhb',
    email: 'c@gmail.com',
    phone: '0909123456',
    address: '789 DEF',
    status: 'Hoạt động',
    orders: []
  },
  {
    id: 4,
    username: 'phamvanh',
    email: 'd@gmail.com',
    phone: '0934567890',
    address: '101 GHI',
    status: 'Đã khóa',
    orders: []
  },
  {
    id: 5,
    username: 'doanthuyt',
    email: 'e@gmail.com',
    phone: '0923456789',
    address: '202 JKL',
    status: 'Hoạt động',
    orders: []
  },
  // Thêm 5 khách hàng nữa để có tổng cộng 10 phần tử
  {
    id: 6,
    username: 'nguyenthib',
    email: 'f@gmail.com',
    phone: '0912345678',
    address: '303 MNO',
    status: 'Hoạt động',
    orders: []
  },
  {
    id: 7,
    username: 'tranvanc',
    email: 'g@gmail.com',
    phone: '0945678901',
    address: '404 PQR',
    status: 'Đã khóa',
    orders: []
  },
  {
    id: 8,
    username: 'levand',
    email: 'h@gmail.com',
    phone: '0967890123',
    address: '505 STU',
    status: 'Hoạt động',
    orders: []
  },
  {
    id: 9,
    username: 'phamthie',
    email: 'i@gmail.com',
    phone: '0989012345',
    address: '606 VWX',
    status: 'Đã khóa',
    orders: []
  },
  {
    id: 10,
    username: 'doanminhf',
    email: 'j@gmail.com',
    phone: '0990123456',
    address: '707 YZA',
    status: 'Hoạt động',
    orders: []
  }
];

const OrderCollect = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [filterStatus, setFilterStatus] = useState('Tất cả');
  const [searchName, setSearchName] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  // Thêm state cho phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Số phần tử trên mỗi trang

  const filtered = customers.filter(c => {
    const matchStatus = filterStatus === 'Tất cả' || c.status === filterStatus;
    const matchName = c.username.toLowerCase().includes(searchName.toLowerCase());
    const matchEmail = c.email.toLowerCase().includes(searchEmail.toLowerCase());
    const matchPhone = c.phone.includes(searchPhone);
    return matchStatus && matchName && matchEmail && matchPhone;
  });

  // Tính toán phân trang
  const totalItems = filtered.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filtered.slice(startIndex, endIndex);

  useEffect(() => {
    if (filtered.length === 1) {
      setSelectedCustomer(filtered[0]);
    } else {
      setSelectedCustomer(null);
    }
    // Reset về trang 1 khi thay đổi bộ lọc
    setCurrentPage(1);
  }, [filtered]);

  const toggleStatus = (id) => {
    const updated = customers.map(c => {
      if (c.id === id) {
        return {
          ...c,
          status: c.status === 'Hoạt động' ? 'Đã khóa' : 'Hoạt động'
        };
      }
      return c;
    });
    setCustomers(updated);
    setSelectedCustomer(null);
  };

  // Hàm chuyển trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="customer-manager">
      <h1>Quản lý Khách hàng</h1>

      {/* Bộ lọc */}
      <div className="filters">
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
          placeholder="Nhập SDT..."
          value={searchPhone}
          onChange={(e) => setSearchPhone(e.target.value)}
        />
        <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="Tất cả">Tất cả</option>
          <option value="Hoạt động">Hoạt động</option>
          <option value="Đã khóa">Đã khóa</option>
        </select>
      </div>

      {/* Bảng khách hàng */}
      <table className="customer-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>SDT</th>
            <th>Địa chỉ</th>
            <th>Trạng thái</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {currentItems.map((c) => (
            <tr key={c.id}>
              <td>{c.username}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.address}</td>
              <td>
                <span className={c.status === 'Hoạt động' ? 'status-active' : 'status-locked'}>
                  {c.status}
                </span>
              </td>
              <td>
                <button
                  className={c.status === 'Hoạt động' ? 'btn-lock' : 'btn-unlock'}
                  onClick={() => toggleStatus(c.id)}
                >
                  {c.status === 'Hoạt động' ? '🔒 Khóa' : '🔓 Mở khóa'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Thêm phân trang */}
      <div className="pagination">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Trang trước
        </button>
        <span>Trang {currentPage} / {totalPages}</span>
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Trang sau
        </button>
      </div>

      {/* Chi tiết khách hàng */}
      {selectedCustomer && (
        <div className="customer-detail">
          <h2>Chi tiết khách hàng</h2>
          <p><strong>Username:</strong> {selectedCustomer.username}</p>
          <p><strong>Email:</strong> {selectedCustomer.email}</p>
          <p><strong>SĐT:</strong> {selectedCustomer.phone}</p>
          <p><strong>Địa chỉ:</strong> {selectedCustomer.address}</p>
          <p><strong>Trạng thái:</strong> {selectedCustomer.status}</p>
          <h3>Lịch sử mua hàng</h3>
          <table>
            <thead>
              <tr>
                <th>Mã đơn</th>
                <th>Ngày đặt</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {selectedCustomer.orders.length > 0 ? (
                selectedCustomer.orders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.date}</td>
                    <td>{order.total.toLocaleString()} VND</td>
                    <td>{order.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>Không có đơn hàng nào</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrderCollect;
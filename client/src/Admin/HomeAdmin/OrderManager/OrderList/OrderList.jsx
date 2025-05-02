import React, { useState } from "react";
import "./OrderList.scss";

const OrderList = ({ onView }) => {
    const [orders, setOrders] = useState([
        { id: 1001, customer: "Nguyễn Huỳnh Đức", date: "27/02/2025", address: "272 Trần Hưng Đạo", email: "nhdstktchannel@gmail.com", phonenumber: "0377790164", total: "2.000.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1002, customer: "Lê Hồng Mi", date: "12/08/2025", address: "60 Nguyễn Hương", email: "yeuanhducvailon@gmail.com", phonenumber: "", total: "2.500.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1003, customer: "Trần Văn A", date: "10/01/2025", total: "1.000.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1004, customer: "Phạm Thị B", date: "05/06/2025", total: "3.500.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1005, customer: "Lý Hoàng C", date: "18/09/2025", total: "500.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1006, customer: "Nguyễn Thanh D", date: "22/11/2025", total: "4.000.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1007, customer: "Nguyễn Hoàng E", date: "03/03/2025", total: "1.200.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1008, customer: "Trần Văn F", date: "15/07/2025", total: "900.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1009, customer: "Hoàng Minh G", date: "26/05/2025", total: "2.100.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1010, customer: "Lê Phương H", date: "05/10/2025", total: "800.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1011, customer: "Nguyễn Hữu I", date: "09/12/2025", total: "1.700.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1012, customer: "Bùi Anh J", date: "14/04/2025", total: "3.000.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1013, customer: "Đặng Quốc K", date: "20/09/2025", total: "2.200.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1014, customer: "Phan Văn L", date: "25/11/2025", total: "1.500.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1015, customer: "Dương Thị M", date: "02/06/2025", total: "3.700.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1016, customer: "Nguyễn Văn N", date: "12/07/2025", total: "900.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1017, customer: "Trương Minh O", date: "30/03/2025", total: "1.800.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1018, customer: "Tô Hữu P", date: "17/08/2025", total: "2.500.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1019, customer: "Võ Ngọc Q", date: "07/10/2025", total: "3.100.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1020, customer: "Trần Quốc R", date: "23/05/2025", total: "1.400.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1021, customer: "Mai Hoàng S", date: "05/12/2025", total: "2.600.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1022, customer: "Ngô Hải T", date: "11/02/2025", total: "3.300.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1023, customer: "Đoàn Nhật U", date: "28/06/2025", total: "2.000.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1024, customer: "Châu Thành V", date: "14/07/2025", total: "2.900.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1025, customer: "Lý Phương W", date: "22/11/2025", total: "3.800.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1026, customer: "Hồ Văn X", date: "06/09/2025", total: "1.100.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1027, customer: "Trịnh Công Y", date: "10/05/2025", total: "4.500.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1028, customer: "Vũ Thanh Z", date: "19/08/2025", total: "1.700.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1029, customer: "Lê Văn A1", date: "02/03/2025", total: "2.800.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1030, customer: "Phạm Hồng B1", date: "15/06/2025", total: "1.900.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1031, customer: "Nguyễn Quốc C1", date: "09/10/2025", total: "3.400.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" },
        { id: 1032, customer: "Tạ Hoàng D1", date: "24/12/2025", total: "2.200.000.000", status: "Chờ xác nhận", editing: false, tempStatus: "Chờ xác nhận" },
        { id: 1033, customer: "Bùi Hữu E1", date: "04/04/2025", total: "1.300.000.000", status: "Đã xác nhận", editing: false, tempStatus: "Đã xác nhận" },
        { id: 1034, customer: "Đặng Minh F1", date: "11/07/2025", total: "4.000.000.000", status: "Đang giao hàng", editing: false, tempStatus: "Đang giao hàng" },
        { id: 1035, customer: "Hoàng Nhật G1", date: "20/11/2025", total: "1.600.000.000", status: "Đã giao hàng", editing: false, tempStatus: "Đã giao hàng" },
        { id: 1036, customer: "Đỗ Văn H1", date: "28/09/2025", total: "3.900.000.000", status: "Đã hủy", editing: false, tempStatus: "Đã hủy" }
    ]);

    const [searchTerm, setSearchTerm] = useState("");
    const statuses = ["Chờ xác nhận", "Đã xác nhận", "Đang giao hàng", "Đã giao hàng", "Đã hủy"];
    const [currentPage, setCurrentPage] = useState(1);
    const [searchInput, setSearchInput] = useState("");
    const itemsPerPage = 12;

    const handleSearchInput = (e) => {
        setSearchInput(e.target.value);
    };

    const handleSearchClick = () => {
        setSearchTerm(searchInput);
        setCurrentPage(1);
    };


    const filteredOrders = orders.filter(order =>
        order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleEdit = (id) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, editing: !order.editing, tempStatus: order.status } : order
        ));
    };

    const handleStatusChange = (id, newStatus) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, tempStatus: newStatus } : order
        ));
    };

    const saveStatus = (id) => {
        setOrders(orders.map(order =>
            order.id === id ? { ...order, status: order.tempStatus, editing: false } : order
        ));
    };

    const handleView = (order) => {
        onView(order);
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentOrders = filteredOrders.slice(indexOfFirstItem, indexOfLastItem);

    const totalPages = Math.ceil(orders.length / itemsPerPage);
    const nextPage = () => setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
    const prevPage = () => setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));

    return (
        <div className="OrderListDiv">
            <div className="SearchDiv">
                <input
                    type="text"
                    placeholder="Tìm kiếm theo tên khách hàng..."
                    value={searchInput}
                    onChange={handleSearchInput}
                    className="SearchInput"
                />
                <button className="SearchButton" onClick={handleSearchClick}>Tìm kiếm</button>
            </div>
            <table border="1" width="80%">
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
                    {currentOrders.map((order) => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{order.customer}</td>
                            <td>{order.date}</td>
                            <td>{order.total}</td>
                            <td>
                                {order.editing ? (
                                    <select
                                        value={order.tempStatus}
                                        onChange={(e) => handleStatusChange(order.id, e.target.value)}
                                    >
                                        {statuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                ) : (
                                    order.status
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleView(order)}>Xem</button>
                                {order.editing ? (
                                    <button onClick={() => saveStatus(order.id)}>Lưu</button>
                                ) : (
                                    <button onClick={() => toggleEdit(order.id)}>Cập nhật</button>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button onClick={prevPage} disabled={currentPage === 1}>Trang trước</button>
                <span>Trang {currentPage} / {totalPages}</span>
                <button onClick={nextPage} disabled={currentPage === totalPages}>Trang sau</button>
            </div>
        </div>
    );
};

export default OrderList;

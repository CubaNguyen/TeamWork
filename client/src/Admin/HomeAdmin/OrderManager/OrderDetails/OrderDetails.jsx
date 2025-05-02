import React from "react";
import "./OrderDetails.scss";

const OrderDetails = ({ order, onBack }) => {

    return (
        <div className="OrderDetailsDiv">
            <div className="OrderInfoDiv">
                <div className="OrderDetailsHead">
                    <p style={
                        { paddingLeft: "5px" }
                    }>Thông tin đơn hàng</p>
                    <button onClick={onBack}> Trở về </button>
                </div>
                <div className="OrderDetailsBody">
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Mã đơn:</span></strong> {order?.id}</p>
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Khách hàng:</span></strong> {order?.customer}</p>
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Địa chỉ giao hàng:</span></strong> {order?.address}</p>
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Ngày đặt:</span></strong> {order?.date}</p>
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Trạng thái:</span></strong> {order?.status}</p>
                    <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Tổng tiền:</span></strong> {order?.total}</p>
                </div>
                <div className="OrderDetailsProductsList">
                    <p style={{ paddingLeft: "5px" }}>Danh sách sản phẩm trong đơn </p>
                    <table width="100%" border="1px white solid">
                        <thead>
                            <tr>
                                <td>Sản phẩm</td>
                                <td>Số lượng</td>
                                <td>Đơn giá</td>
                                <td>Thành tiền</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Áo thun đen</td>
                                <td>2</td>
                                <td>250,000</td>
                                <td>500,000</td>
                            </tr>
                            <tr>
                                <td>Giày Sneaker</td>
                                <td>1</td>
                                <td>1,000,000</td>
                                <td>1,000,000</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="CustomerDetailsHead">
                        <p style={{ paddingLeft: "5px" }}>Thông tin khách hàng </p>
                    </div>
                    <div className="CustomerDetailsBody">
                        <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Tên:</span></strong> {order?.customer}</p>
                        <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Email:</span></strong> {order?.email}</p>
                        <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>SĐT:</span></strong> {order?.phonenumber}</p>
                        <p style={{ paddingLeft: "10px" }}><strong>&#8226; <span style={{ paddingLeft: "10px" }}>Địa chỉ:</span></strong> {order?.address}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderDetails;

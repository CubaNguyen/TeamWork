import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout_style.scss";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";
import { getOrderUser, statusAfterPayment } from "../../services/orderService";
import { CartContext } from "../../context/CartContext";

const Checkout = () => {
  const [selectedMethod, setSelectedMethod] = useState("zalo");
  const { cart, order } = useContext(CartContext);
  console.log("🚀 ~ Checkout ~ cart:", cart);
  const user = useContext(UserContext);
  console.log("🚀 ~ Checkout ~ user:", user.user);

  const navigate = useNavigate();
  const methods = [
    {
      id: "zalo",
      label: "Thanh toán online qua cổng thanh toán ZaloPay",
      description:
        "Sau khi nhấp vào 'Thanh toán ngay', bạn sẽ được chuyển hướng đến Thanh toán online qua cổng thanh toán ZaloPay để hoàn tất việc mua hàng một cách an toàn.",
    },
    {
      id: "cod",
      label: "Thanh toán khi nhận hàng (COD)",
    },
    {
      id: "bank",
      label: "Tiền gửi ngân hàng",
    },
  ];
  const updateStatus = async (id) => {
    try {
      const res = await statusAfterPayment(id);
      console.log("🚀 ~ updateStatus ~ res:", res);
      if (res.data.code === 201) {
      }
    } catch (error) {
      console.log("🚀 ~ updateStatus ~ error:", error);
    }
  };

  const handlePayment = () => {
    updateStatus(order?.id);

    navigate("/checkout/success");
  };

  return (
    <div className="checkout-container">
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Liên hệ</h2>
          <input
            type="text"
            placeholder="Email hoặc số điện thoại di động"
            value={user?.user?.email}
          />

          <h2>Giao hàng</h2>
          <select>
            <option>Việt Nam</option>
          </select>
          <div className="name-fields">
            <input
              className="last-name"
              type="text"
              placeholder="Tên"
              value={user?.user?.username}
            />
            {/* <input className="first-name" type="text" placeholder="Họ" /> */}
          </div>
          <div className="address">
            <input type="text" placeholder="Địa chỉ" />
          </div>
          <div className="city-fields">
            <input type="text" placeholder="Thành phố" />
            <input type="text" placeholder="Mã bưu chính (không bắt buộc)" />
          </div>
          <input type="text" placeholder="Điện thoại" />

          <div className="payment-methods">
            <h2>Phương thức thanh toán</h2>
            <p className="security-note">
              Toàn bộ các giao dịch được bảo mật và mã hóa.
            </p>
            <div className="methods-list">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className={`method-item ${
                    selectedMethod === method.id ? "selected" : ""
                  }`}
                  onClick={() => setSelectedMethod(method.id)}
                >
                  <div className="radio-btn">
                    <input
                      type="radio"
                      checked={selectedMethod === method.id}
                      onChange={() => setSelectedMethod(method.id)}
                    />
                  </div>
                  <div className="method-content">
                    <div className="method-label">{method.label}</div>
                    {/* {method.icons && (
                      <div className="icons">
                        {method.icons.map((icon) => (
                          <img key={icon} src={`/${icon}.svg`} alt={icon} />
                        ))}
                      </div>
                    )} */}
                    {selectedMethod === method.id && method.description && (
                      <div className="method-description">
                        {/* <img
                          className="browser-icon"
                          src="/browser.svg"
                          alt="browser"
                        /> */}
                        <p>{method.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button className="pay-button" onClick={handlePayment}>
            Thanh toán ngay
          </button>
        </div>

        <div className="checkout-summary">
          {cart?.map((item) => (
            <div className="summary-item" key={item.id}>
              <img src={item.image} alt={item.name} />
              <div>
                <p>
                  {item.name} (x{item.OrderDetail.quantity})
                </p>{" "}
                {/* Hiển thị số lượng nếu muốn */}
              </div>
              <p className="price">
                {item.OrderDetail.price.toLocaleString("vi-VN")} đ
              </p>
            </div>
          ))}

          <input type="text" placeholder="Mã giảm giá hoặc thẻ quà tặng" />
          <button>Áp dụng</button>
          <div className="summary">
            <div className="tong-phu">
              <p className="text1">Tổng phụ:</p>{" "}
              <p>{order?.total?.toLocaleString("vi-VN")} đ</p>
            </div>
            <div className="van-chuyen">
              <p className="text2">Vận chuyển:</p> <p>MIỄN PHÍ</p>
            </div>
            <div className="tong">
              <h3 className="text3">Tổng:</h3>{" "}
              <h3>{order?.total?.toLocaleString("vi-VN")} đ</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;

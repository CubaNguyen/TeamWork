import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./checkout.scss";

function Checkout() {
  const [selectedMethod, setSelectedMethod] = useState("zalo");
  const navigate = useNavigate(); // ✅ Hook điều hướng

  const methods = [
    {
      id: "zalo",
      label: "Thanh toán online qua cổng thanh toán ZaloPay",
      description:
        "Sau khi nhấp vào 'Thanh toán ngay', bạn sẽ được chuyển hướng đến Thanh toán online qua cổng thanh toán ZaloPay để hoàn tất việc mua hàng một cách an toàn.",
      icons: ["mastercard", "jcb", "visa", "zalopay"],
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

  const handlePayment = () => {
    alert(`Bạn đã chọn phương thức: ${selectedMethod.toUpperCase()}\nCảm ơn bạn đã mua hàng!`);
    navigate("/checkout/success"); // ✅ Điều hướng sau khi thanh toán
  };

  return (
    <div className="checkout-container">
      
      <div className="checkout-content">
        <div className="checkout-form">
          <h2>Liên hệ</h2>
          <input type="text" placeholder="Email hoặc số điện thoại di động" />

          <h2>Giao hàng</h2>
          <select>
            <option>Việt Nam</option>
          </select>
          <div className="name-fields">
            <input className="last-name" type="text" placeholder="Tên" />
            <input className="first-name" type="text" placeholder="Họ" />
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
            <p className="security-note">Toàn bộ các giao dịch được bảo mật và mã hóa.</p>
            <div className="methods-list">
              {methods.map((method) => (
                <div
                  key={method.id}
                  className={`method-item ${selectedMethod === method.id ? "selected" : ""}`}
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
                    {method.icons && (
                      <div className="icons">
                        {method.icons.map((icon) => (
                          <img key={icon} src={`/${icon}.svg`} alt={icon} />
                        ))}
                      </div>
                    )}
                    {selectedMethod === method.id && method.description && (
                      <div className="method-description">
                        <img className="browser-icon" src="/browser.svg" alt="browser" />
                        <p>{method.description}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ Nút thanh toán */}
          <button className="pay-button" onClick={handlePayment}>
            Thanh toán ngay
          </button>
        </div>

        <div className="checkout-summary">
          <div className="summary-item">
            <img src="/images/glasses.png" alt="Kính" />
            <div>
              <p>KÍNH RHODES - CHARM LOTUSGOT</p>
              <p>Black + Charm</p>
            </div>
            <p>4.400.000 đ</p>
          </div>
          <input type="text" placeholder="Mã giảm giá hoặc thẻ quà tặng" />
          <button>Áp dụng</button>
          <div className="summary">
            <div className="tong-phu">
              <p className="text1">Tổng phụ:</p> <p>4.400.000 đ</p>
            </div>
            <div className="van-chuyen">
              <p className="text2">Vận chuyển:</p> <p>MIỄN PHÍ</p>
            </div>
            <div className="tong">
              <h3 className="text3">Tổng:</h3> <h3>4.400.000 đ</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// giao dien thanh toan ne
/* Đây là một comment */
export default Checkout;

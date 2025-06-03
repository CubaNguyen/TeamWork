import React, { useContext, useEffect, useState } from "react";
import "./PopUpCart.scss";
import { Trash2, Tag } from "lucide-react";
import { CartContext } from "../../context/CartContext";
import { NavLink } from "react-router-dom";

const PopUpCart = ({ show, onClose }) => {
  const { cart, order, deleteCartContext, fetchCartContext } =
    useContext(CartContext);
  const deleteProduct = async (item) => {
    let data = {
      product_id: item.id,
      order_id: order.id,
    };
    let res = await deleteCartContext(data);
    if (res.data.code === 201) {
      fetchCartContext();
    }
  };

  // if (!show) return null;

  return (
    <>
      <div className="quick-add-overlayyy"></div>

      <div className="popUpCartContainer open ">
        <div className="quick-add-modal">
          <button className="close-btn" onClick={onClose}>
            ×
          </button>
          <div className="modal-content">
            <h2 className="cart-title">
              <span className="left">Shopping Cart</span>
              <span className="right">{cart?.length} sản phẩm</span>
            </h2>
            <hr style={{ width: "100%" }} />

            <div className="cart-items">
              {cart?.map((item) => (
                <div key={item?.id} className="cart-item">
                  <img
                    className="cart-item__image"
                    src={item?.image}
                    alt={item?.name}
                  />
                  <div className="cart-item__details">
                    <div className="cart-item__title">{item?.name}</div>
                    <div className="cart-item__size">{item?.size}</div>
                    <div className="cart-item__price">
                      {item?.price?.toLocaleString()} VND
                    </div>

                    <div className="cart-item__quantity">
                      <div>Số lượng : </div>
                      <span>{item?.OrderDetail?.quantity}</span>
                    </div>
                  </div>
                  <button
                    className="cart-item__delete"
                    onClick={() => deleteProduct(item)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
            <hr style={{ width: "100%" }} />
            <div className="summary">
              <div className="row">
                <span>Tổng phụ</span>
                <span>{order?.total?.toLocaleString()} VND</span>
              </div>
              <div className="row discount">
                <span>Giảm giá</span>
                <span>Mơ nhé không có đâu</span>
              </div>
              <div className="row total">
                <span>Tổng cộng</span>
                <span>{order?.total?.toLocaleString()} VND</span>
              </div>
              <NavLink
                className="checkout-btn"
                style={{ textDecoration: "none" }}
                to="/checkout"
                onClick={onClose}
              >
                Thanh toán
              </NavLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PopUpCart;

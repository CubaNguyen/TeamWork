import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./viewProduct.scss";

const ViewProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => console.error("Lỗi khi lấy sản phẩm:", error));
  }, [id]);
  
  if (!product) {
    return <div className="loading">Đang tải...</div>;
  }

  return (
    <div className="product-detail-container">
      <h1>Chi tiết sản phẩm</h1>
      <div className="product-card">
        <img src={product.image || "default-image.jpg"} alt={product.name} className="product-image" />
        <div className="product-info">
          <p><strong>ID:</strong> {product.id}</p>
          <p><strong>Tên:</strong> {product.name}</p>
          <p><strong>Giá:</strong> {product.price.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}</p>
          <p><strong>Số lượng tồn kho:</strong> {product.stock}</p>
          <p><strong>Trạng thái:</strong> <span className={product.status === "active" ? "status-active" : "status-inactive"}>{product.status}</span></p>
          <p><strong>Mô tả:</strong> {product.description}</p>
        </div>
      </div>
      <Link to="/homeAdmin/productManager" className="btn-back">Quay lại</Link>
    </div>
  );
};

export default ViewProduct;

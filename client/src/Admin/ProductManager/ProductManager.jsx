import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./productManager.scss";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Lấy danh sách sản phẩm & danh mục
  useEffect(() => {
    axios.get("http://localhost:3001/products")
      .then(response => setProducts(response.data))
      .catch(error => console.error("Lỗi khi tải sản phẩm:", error));

    axios.get("http://localhost:3001/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Lỗi khi tải danh mục:", error));
  }, []);

  // Xóa sản phẩm
  const handleDelete = (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      axios.delete(`http://localhost:3001/products/${id}`)
        .then(() => {
          setProducts(products.filter(product => product.id !== id));
        })
        .catch(error => console.error("Lỗi khi xóa sản phẩm:", error));
    }
  };

  return (
    <div className="home-container">
      <h1>Quản lý sản phẩm</h1>

      {/* Nút Danh mục & Thêm sản phẩm */}
      <div className="btn-group">
        <Link to="/homeAdmin/productManager/categoryProduct" className="btn btn-category">Danh mục</Link>
        <Link to="/homeAdmin/productManager/create" className="btn btn-add">Thêm sản phẩm</Link>
      </div>

      <div className="table-container">
        <table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Giá</th>
              <th>Danh mục</th>
              <th>Tồn kho</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {products.map(product => {
              // Tìm danh mục của sản phẩm
              const category = categories.find(cat => Number(cat.id) === product.category_id);
              
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VND</td>
                  <td>{category ? category.name : "Không xác định"}</td>
                  <td>{product.stock}</td>
                  <td className={product.status === "active" ? "status-active" : "status-inactive"}>
                    {product.status === "active" ? "Còn hàng" : "Hết hàng"}
                  </td>
                  <td className="action-buttons">
                    <Link to={`/homeAdmin/productManager/viewProduct/${product.id}`} className="btn btn-read">Xem</Link>
                    <Link to={`/homeAdmin/productManager/editProduct/${product.id}`} className="btn btn-edit">Sửa</Link>
                    <button onClick={() => handleDelete(product.id)} className="btn btn-delete">Xóa</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;

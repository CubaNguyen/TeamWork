import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./productManager.scss";
import { deleteProduct, getAllProduct } from "../../services/productService";

const ProductManager = () => {
  const [products, setProducts] = useState([]);
  console.log("🚀 ~ ProductManager ~ products:", products);

  // Lấy danh sách sản phẩm & danh mục

  const handleGetAllProduct = async () => {
    try {
      const res = await getAllProduct();

      if (res.data.code === 201) {
        setProducts(res.data.data);
      }
    } catch (error) {
      console.log("🚀 ~ handleGetAllProduct ~ handleGetAllProduct:", error);
    }
  };

  const deleteProductbyId = async (id) => {
    try {
      const res = await deleteProduct(id);

      if (res.data.code === 200) {
        await handleGetAllProduct();
      }
    } catch (error) {
      console.log("🚀 ~ deleteProductbyId ~ deleteProductbyId:", error);
    }
  };

  useEffect(() => {
    handleGetAllProduct();
  }, []);

  // Xóa sản phẩm
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?")) {
      await deleteProductbyId(id);
    }
  };

  return (
    <div className="home-container">
      <h1>Quản lý sản phẩm</h1>

      {/* Nút Danh mục & Thêm sản phẩm */}
      <div className="btn-group">
        <Link
          to="/homeAdmin/productManager/categoryProduct"
          className="btn btn-category"
        >
          Danh mục
        </Link>
        <Link to="/homeAdmin/productManager/create" className="btn btn-add">
          Thêm sản phẩm
        </Link>
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
            {products.map((product) => {
              return (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.price.toLocaleString()} VND</td>
                  <td>{product.Category.name}</td>
                  <td>{product.stock}</td>
                  <td
                    className={
                      product.status === "Active"
                        ? "status-active"
                        : "status-inactive"
                    }
                  >
                    {product.status === "Active" ? "Còn hàng" : "Hết hàng"}
                  </td>
                  <td className="action-buttons">
                    <Link
                      to={`/homeAdmin/productManager/viewProduct/${product.id}`}
                      className="btn btn-read"
                    >
                      Xem
                    </Link>
                    <Link
                      to={`/homeAdmin/productManager/editProduct/${product.id}`}
                      className="btn btn-edit"
                    >
                      Sửa
                    </Link>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="btn btn-delete"
                    >
                      Xóa
                    </button>
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

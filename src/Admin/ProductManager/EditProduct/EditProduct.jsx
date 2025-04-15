import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./editProduct.scss";

function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [categories, setCategories] = useState([]);
  const [preview, setPreview] = useState(null); // Xem trước ảnh mới

  useEffect(() => {
    axios.get(`http://localhost:3001/products/${id}`)
      .then(response => {
        setProduct(response.data);
        setPreview(response.data.image); // Load ảnh cũ
      })
      .catch(error => console.error("Lỗi khi tải sản phẩm:", error));

    axios.get("http://localhost:3001/categories")
      .then(response => setCategories(response.data))
      .catch(error => console.error("Lỗi khi tải danh mục:", error));
  }, [id]);

  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setProduct({ ...product, image: imageUrl });
    }
  };
  const handleCancel = () => {
    navigate("/homeAdmin/productManager");
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:3001/products/${id}`, product)
      .then(() => {
        alert("Cập nhật sản phẩm thành công!");
        navigate("/");
      })
      .catch((err) => console.error("Lỗi khi cập nhật:", err));
  };

  if (!product) {
    return <p>Đang tải dữ liệu...</p>;
  }

  return (
    <div className="edit-product-container">
      <h1>Chỉnh sửa sản phẩm</h1>
      <form onSubmit={handleSubmit} className="edit-product-form">
        <div>
          <label>Tên sản phẩm:</label>
          <input type="text" name="name" value={product.name} onChange={handleChange} required />
        </div>

        <div>
          <label>Giá:</label>
          <input type="number" name="price" value={product.price} onChange={handleChange} required />
          <p><strong>Giá hiển thị:</strong> {new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(product.price)}</p>
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div>
          <label>Danh mục:</label>
          <select name="category_id" value={product.category_id} onChange={handleChange} required>
            <option value="">Chọn danh mục</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label>Số lượng tồn kho:</label>
          <input type="number" name="stock" value={product.stock} onChange={handleChange} min="0" required />
        </div>

        <div>
          <label>Trạng thái:</label>
          <div className="radio-group">
            <label>
              <input type="radio" name="status" value="active" checked={product.status === "active"} onChange={handleChange} />
              Còn hàng
            </label>
            <label>
              <input type="radio" name="status" value="inactive" checked={product.status === "inactive"} onChange={handleChange} />
              Hết hàng
            </label>
          </div>
        </div>

        <button type="submit" className="btn-update">Cập nhật</button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>Huỷ</button>

      </form>
    </div>
  );
}

export default EditProduct;
  
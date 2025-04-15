import React, { useEffect, useState } from "react";
import axios from "axios";
import "./category.scss";
import { Link } from "react-router-dom";

function Category() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  // Lấy danh sách category từ API
  useEffect(() => {
    axios
      .get("http://localhost:3001/categories")
      .then((res) => {
        // Sắp xếp lại ID khi tải danh mục
        const sortedCategories = res.data.map((cat, index) => ({
          ...cat,
          id: index + 1, // Gán lại ID từ 1, 2, 3...
        }));
        setCategories(sortedCategories);
      })
      .catch((err) => console.error("Lỗi khi tải danh mục:", err));
  }, []);

  // Thêm danh mục mới
  const handleAddCategory = () => {
    if (!newCategory.trim()) {
      alert("Vui lòng nhập tên danh mục!");
      return;
    }

    const newId = categories.length > 0 ? categories[categories.length - 1].id + 1 : 1; // ID tự động tăng
    const newCat = { id: newId, name: newCategory };

    axios
      .post("http://localhost:3001/categories", newCat)
      .then(() => {
        setCategories([...categories, newCat]); // Cập nhật danh sách
        setNewCategory(""); // Xóa input
      })
      .catch((err) => console.error("Lỗi khi thêm danh mục:", err));
  };

  // Xóa danh mục
  const handleDeleteCategory = (id) => {
    if (window.confirm("Bạn có chắc muốn xóa danh mục này?")) {
      axios
        .delete(`http://localhost:3001/categories/${id}`)
        .then(() => {
          // Xóa trên giao diện & cập nhật ID
          const updatedCategories = categories
            .filter((cat) => cat.id !== id) // Xóa category có ID cần xóa
            .map((cat, index) => ({
              ...cat,
              id: index + 1, // Cập nhật lại ID mới
            }));

          setCategories(updatedCategories);
          alert("Đã xóa danh mục!");
        })
        .catch((err) => console.error("Lỗi khi xóa danh mục:", err));
    }
  };

  return (
    <div className="category-container">
      <h1>Quản lý danh mục</h1>
      <div className="add-category">
        <input
          type="text"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          placeholder="Nhập tên danh mục"
        />
        <button onClick={handleAddCategory} className="btn-add">
          Thêm
        </button>
      </div>
      <table className="custom-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên danh mục</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.id}</td>
              <td>{category.name}</td>
              <td>
                <button className="btn btn-delete" onClick={() => handleDeleteCategory(category.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/" className="btn-back">
        Quay lại
      </Link>
    </div>
  );
}

export default Category;

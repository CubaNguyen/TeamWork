import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./create.scss";

const Create = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    name: "",
    price: "",
    image: "",
    description: "",
    category_id: "",
    stock: "",
    status: "active",
  });

  const [preview, setPreview] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
      setValues({ ...values, image: imageUrl });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:3001/products", values);
      navigate("/");
    } catch (error) {
      console.error("Lỗi khi thêm sản phẩm:", error);
    }
  };

  const handleCancel = () => {
    navigate("/homeAdmin/productManager");
  };

  return (
    <div className="create-container">
      <h1>Thêm sản phẩm</h1>
      <form onSubmit={handleSubmit} className="form-container">
        <div>
          <label>Tên:</label>
          <input type="text" name="name" className="form-control" onChange={e => setValues({...values, name: e.target.value})} />
        </div>

        <div>
          <label>Giá:</label>
          <input type="number" name="price" className="form-control" onChange={e => setValues({...values, price: e.target.value})} />
        </div>

        <div>
          <label>Hình ảnh:</label>
          <input type="file" accept="image/*" className="form-control" onChange={handleImageChange} />
          {preview && <img src={preview} alt="Preview" className="image-preview" />}
        </div>

        <div>
          <label>Mô tả:</label>
          <textarea name="description" className="form-control" onChange={e => setValues({...values, description: e.target.value})} />
        </div>

        <div>
          <label>Số lượng:</label>
          <input type="number" name="stock" min="0" className="form-control" onChange={e => setValues({...values, stock: e.target.value})} />
        </div>

        <div>
          <label>Trạng thái:</label>
          <div>
            <label>
              <input
                type="radio"
                name="status"
                value="active"
                checked={values.status === "active"}
                onChange={e => setValues({...values, status: e.target.value})}
              />
              Còn hàng
            </label>
            <label>
              <input
                type="radio"
                name="status"
                value="inactive"
                checked={values.status === "inactive"}
                onChange={e => setValues({...values, status: e.target.value})}
              />
              Hết hàng
            </label>
          </div>
        </div>

        <button type="submit" className="btn-submit">Thêm</button>
        <button type="button" className="btn-cancel" onClick={handleCancel}>Hủy</button>
      </form>
    </div>
  );
};

export default Create;

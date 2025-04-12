import api from "../utils/axiosConfig";

const getAllProduct = () => api.get("/product/getAllProduct");
const getProductDetail = (id) => api.get(`/product/${id}`);
const editInforProduct = (id, productData) =>
  api.put(`/product/${id}`, productData);
const deleteProduct = (id) => api.delete(`/product/${id}`);
const addProduct = (data) => api.post(`/product/addProduct`, data);

export {
  getAllProduct,
  getProductDetail,
  editInforProduct,
  deleteProduct,
  addProduct,
};

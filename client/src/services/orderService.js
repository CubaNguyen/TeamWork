import api from "../utils/axiosConfig";

const getAllOrders = () => api.get("/order/getAllOrders");
const getDetailOrder = (id) => api.get(`/order/${id}`);
const getOrderUser = (id) => api.get(`/order/userCart/${id}`);
const updateOrderStatus = (id, data) => api.put(`/order/${id}/status`, data);
const addToCart = (product) => api.post("/order/add", product);
const deleteCart = (data) => api.delete("/order/delete", { data });

const getDetailOrderUser = (id) => api.get(`/order/user/${id}`);
const statusAfterPayment = (id) => api.put(`/order/${id}/statusAfterPayment`);

const getRevenue = () => api.get(`/order/reports/revenue`);

export {
  getAllOrders,
  getDetailOrder,
  updateOrderStatus,
  getOrderUser,
  addToCart,
  deleteCart,
  statusAfterPayment,
  getDetailOrderUser,
  getRevenue,
};

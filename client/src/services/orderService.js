import api from "../utils/axiosConfig";

const getAllOrders = () => api.get("/order/getAllOrders");
const getDetailOrder = (id) => api.get(`/order/${id}`);
const updateOrderStatus = (id, data) => api.put(`/order/${id}/status`, data);

export { getAllOrders, getDetailOrder, updateOrderStatus };

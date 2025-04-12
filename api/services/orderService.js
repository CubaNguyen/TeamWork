const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");

const getAllOrdersService = async () => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "phone", "address"], // Chỉ lấy thông tin cần thiết
        },
      ],
      order: [["order_date", "DESC"]], // Sắp xếp đơn hàng mới nhất trước
    });
    if (orders.length === 0) {
      return { code: 404, message: "Không có đơn hàng nào!", data: [] };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: orders,
    };
  } catch (err) {
    console.log("🚀 ~ getAllOrdersService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const getOrderDetailService = async (orderId) => {
  try {
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: User,
          attributes: ["id", "username", "email", "phone", "address"], // Lấy thông tin khách hàng
        },
        {
          model: Product,
          attributes: ["id", "name", "price"],
          through: {
            attributes: ["quantity", "price"], // từ OrderDetail
          },
        },
      ],
    });

    if (!order) {
      return { code: 404, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ getOrderDetailService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

const updateOrderStatusService = async (orderId, newStatus) => {
  try {
    const order = await Order.findByPk(orderId);

    if (!order) {
      return { code: 404, message: "Không tìm thấy đơn hàng!", data: "" };
    }
    const validStatuses = [
      "Chờ xác nhận",
      "Đã xác nhận",
      "Đang giao hàng",
      "Đã giao hàng",
      "Đã hủy",
    ];
    if (!validStatuses.includes(newStatus)) {
      return {
        code: 400,
        message: "Trạng thái đơn hàng không hợp lệ!",
        data: "",
      };
    }
    order.status = newStatus;
    await order.save();
    return {
      message: "Lấy danh sách đơn hàng thành công!",
      code: 201,
      data: order,
    };
  } catch (err) {
    console.log("🚀 ~ updateOrderStatusService ~ err:", err);
    return {
      message: "Lỗi từ hệ thống",
      code: 500,
      data: "",
    };
  }
};

module.exports = {
  getAllOrdersService,
  getOrderDetailService,
  updateOrderStatusService,
};

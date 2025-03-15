const router = require('express').Router()
const orderController = require('../controllers/orderController')

// // xem danh sách đơn hàng
router.get("/getAllOrders", orderController.getAllOrdersController);
// Xem chi tiết đơn hàng
router.get("/:id", orderController.getOrderDetailController);
// Cập nhật trạng thái đơn hàng
router.put("/:id/status", orderController.updateOrderStatusController);



module.exports = router
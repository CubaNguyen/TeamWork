const router = require("express").Router();
const productController = require("../controllers/productController");

// xem danh sách sản phẩm
router.get("/getAllProduct", productController.getAllProductsController);
// lấy chi tiết sản phẩm
router.get("/:productId", productController.getProductDetailController);

// thêm sản phẩm
router.post("/addProduct", productController.addProductController);
// sửa ttin sản phẩm
router.put("/:id", productController.editProductController);
// xóa sản phẩm
router.delete("/:id", productController.deleteProductController);

module.exports = router;

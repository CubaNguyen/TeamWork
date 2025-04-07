const User = require('../models/User')
const Product = require('../models/Product')



const getAllProductsService = async () => {
    try {
        const products = await Product.findAll();
        if (!products || products.length === 0) {
            return { code: 404, message: "Không có sản phẩm nào!", data: [] };
        }
        return { message: "Lấy danh sách đơn hàng thành công!", code: 201, data: products };
    }
    catch (err) {
        console.log("🚀 ~ getAllProductsService ~ err:", err)
        return {
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        }
    }
}

const addProductService = async (data) => {
    try {
        if (!data.name || !data.price || !data.image || data.stock) {
            return { code: 400, message: "Thiếu thông tin sản phẩm!", data: null };
        }

        const newProduct = await Product.create(data);

        return { message: "Thêm sản phẩm thành công!", code: 201, data: newProduct };
    }
    catch (err) {
        console.log("🚀 ~ addProductService ~ err:", err)
        return {
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        }
    }
}

const editProductService = async (id, data) => {
    try {
        const product = await Product.findByPk(id);

        if (!product) {
            return { code: 404, message: "Không tìm thấy sản phẩm!", data: null };
        }
        await product.update(data);

        return { message: "Cập nhật sản phẩm thành công!", code: 201, data: product };
    }
    catch (err) {
        console.log("🚀 ~ editProductService ~ err:", err)
        return {
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        }
    }
}

const deleteProductService = async (id) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) {
            return { code: 404, message: "Không tìm thấy sản phẩm!" };
        }
        await product.destroy();

        return { code: 200, message: "Xóa sản phẩm thành công!" };
    }
    catch (err) {
        console.log("🚀 ~ deleteProductService ~ err:", err)
        return {
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        }
    }
}

module.exports = {
    getAllProductsService, addProductService, editProductService, deleteProductService

}
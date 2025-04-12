const productService = require('../services/productService');




const getAllProductsController = async (req, res) => {
    try {
        let data = await orderService.getAllProductsService();
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ getAllProductsController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

const addProductController = async (req, res) => {
    try {
        let data = await orderService.addProductService(req.body);
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ addProductController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

const editProductController = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await orderService.editProductService(id, req.body);
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ editProductController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

const deleteProductController = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await orderService.deleteProductService(id);
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ deleteProductController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

module.exports = {
    getAllProductsController, addProductController, editProductController, deleteProductController
};
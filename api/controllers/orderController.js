const orderService = require('../services/orderService');




const getAllOrdersController = async (req, res) => {
    try {
        let data = await orderService.getAllOrdersService();
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ getAllOrdersController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

const getOrderDetailController = async (req, res) => {
    try {
        const { id } = req.params;
        let data = await orderService.getOrderDetailService(id);
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ getOrderDetailController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}

const updateOrderStatusController = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
        let data = await orderService.updateOrderStatusService(id, status);
        return res.status(data.code).json({
            message: data.message,
            code: data.code,
            data: data.data
        })


    } catch (err) {
        console.log("🚀 ~ updateOrderStatusController ~ err:", err)
        return res.status(500).json({
            message: 'Lỗi từ hệ thống',
            code: 500,
            data: ''
        })
    }
}


module.exports = {
    getAllOrdersController, getOrderDetailController, updateOrderStatusController
};
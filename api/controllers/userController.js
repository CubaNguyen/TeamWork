const userService = require('../services/userService');


const updateUserController = async (req, res) => {
    try {
        let userId = req.body.userId;
        let id = req.params.id;
        let password = req.body.password;
        let dataBody = req.body
        let isAdmin = req.body.isAdmin
        //&& !isAdmin
        if (userId !== id) {
            return res.status(403).json({
                mess: 'You can only update your account',
                code: 403,
                data: ''
            })

        }
        let data = await userService.updateUserService(password, dataBody);

        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: ''
        })


    } catch (err) {
        console.log("🚀 ~ updateUserController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
};
const deleteUserController = async (req, res) => {

    try {
        let userId = req.body.userId;
        let id = req.params.id;
        let isAdmin = req.body.isAdmin
        if (userId !== id && !isAdmin) {
            return res.status(403).json({
                mess: 'You can only delete your account',
                code: 403,
                data: ''
            })
        }
        let data = await userService.deleteUserService(id);
        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: ''
        })
    } catch (err) {
        console.log("🚀 ~ updateUserController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
}

const getUserController = async (req, res) => {
    try {
        let userId = req.query.userId;
        let username = req.query.username
        let data = await userService.getUserService(userId, username);
        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: data.data
        })
    }
    catch (err) {
        console.log("🚀 ~ updateUserController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
}

const followUserController = async (req, res) => {
    try {
        let userId = req.body.userId;
        let id = req.params.id;
        if (userId === id) {
            return res.status(403).json({
                mess: 'You cant follow yourself',
                code: 403,
                data: ''
            })
        }
        let data = await userService.followUserService(id, userId);
        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: ''
        })


    }
    catch (err) {
        console.log("🚀 ~ followUserController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
}

const unfollowUserController = async (req, res) => {
    try {
        let userId = req.body.userId;
        let id = req.params.id;
        if (userId === id) {
            return res.status(403).json({
                mess: 'You cant unfollow yourself',
                code: 403,
                data: ''
            })
        }
        let data = await userService.unfollowUserService(id, userId);
        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: ''
        })
    }
    catch (err) {
        console.log("🚀 ~ unfollowUserController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
}

const getFriendsController = async (req, res) => {
    try {
        let userId = req.params.userId;

        let data = await userService.getFriendsService(userId);
        return res.status(data.code).json({
            mess: data.mess,
            code: data.code,
            data: data.data
        })
    }
    catch (err) {
        console.log("🚀 ~ getFriendsController ~ err:", err)
        res.status(500).json(err);
        return res.status(500).json({
            mess: 'err from server',
            code: 500,
            data: ''
        })
    }
}

module.exports = {
    updateUserController, deleteUserController, getUserController, followUserController, unfollowUserController, getFriendsController

};
const User = require('../models/User')
const hashPass = require('./authService').hashPass;



const updateUserService = async (password, dataBody) => {
    try {
        // Nếu có password, hash mật khẩu và cập nhật cả password và các trường khác
        if (password) {
            password = await hashPass(password);
            let updatedUser = await User.findByIdAndUpdate(dataBody.userId, {
                $set: {
                    ...dataBody,
                    password: password
                }
            });
            if (updatedUser) {
                return {
                    mess: 'Account has been updated',
                    code: 200,
                    data: ''
                };
            }
        } else {
            // Nếu không có password mới, chỉ cập nhật các trường khác
            let updatedUser = await User.findByIdAndUpdate(dataBody.userId, {
                $set: dataBody
            });
            if (updatedUser) {
                return {
                    mess: 'Account has been updated',
                    code: 200,
                    data: ''
                };
            }
        }

        // Nếu không có user được cập nhật (trường hợp này hiếm khi xảy ra)
        return {
            mess: 'Failed to update account',
            code: 404,
            data: ''
        };
    } catch (e) {
        console.log("🚀 ~ updateUserService ~ e:", e);
        return {
            mess: 'Something went wrong in service',
            code: 501,
            data: ''
        };
    }
};

const deleteUserService = async (id) => {
    try {
        let user = await User.deleteOne({ _id: id })
        if (user) {
            return {
                mess: 'Account has been deleted',
                code: 200,
                data: ''
            };
        } else {
            return {
                mess: 'Failed to delete account',
                code: 404,
                data: ''
            };
        }
    } catch (e) {
        console.log("🚀 ~ deleteUserService ~ e:", e);
        return {
            mess: 'Something went wrong in service',
            code: 501,
            data: ''
        };
    }
}
const getUserService = async (userId, username) => {
    try {

        let user = userId ?
            await User.findById(userId).select('username email profilePicture coverPicture followers followins isAdmin createdAt')
            :
            await User.findOne({ username: username });
        if (user) {
            return {
                mess: 'Account has been got',
                code: 200,
                data: user
            };
        } else {
            return {
                mess: 'Failed to get account',
                code: 404,
                data: ''
            };
        }
    } catch (e) {
        console.log("🚀 ~ deleteUserService ~ e:", e);
        return {
            mess: 'Something went wrong in service',
            code: 501,
            data: ''
        };
    }
}

const followUserService = async (id, userId) => {
    try {
        let user = await User.findById(id)
        const currentUser = await User.findById(userId)
        if (!user.followers.includes(userId)) {
            await user.updateOne(
                { $push: { followers: userId } }
            )
            await currentUser.updateOne(
                { $push: { followings: id } }
            )
            return {
                mess: 'user has been followed',
                code: 200,
                data: ''
            };
        } else {
            return {
                mess: 'you already followed this user',
                code: 202,
                data: ''
            };
        }
    } catch (e) {
        console.log("🚀 ~ followUserService ~ e:", e);
        return {
            mess: 'Something went wrong in service',
            code: 501,
            data: ''
        };
    }
}

const unfollowUserService = async (id, userId) => {
    try {
        let user = await User.findById(id)
        const currentUser = await User.findById(userId)
        if (user.followers.includes(userId)) {
            await user.updateOne(
                { $pull: { followers: userId } }
            )
            await currentUser.updateOne(
                { $pull: { followings: id } }
            )
            return {
                mess: 'user has been unfollowed',
                code: 200,
                data: ''
            };
        } else {
            return {
                mess: 'you already not followed this user',
                code: 203,
                data: ''
            };
        }
    } catch (e) {
        console.log("🚀 ~ followUserService ~ e:", e);
        return {
            mess: 'Something went wrong in service',
            code: 501,
            data: ''
        };
    }
}
const getFriendsService = async (userId) => {
    try {
        let user = await User.findById(userId);
        let friends = await Promise.all(
            user.followings.map(friendId => {
                return User.findById(friendId)
            })
        )
        let listFriends = []
        friends.map(friend => {
            let { _id, username, profilePicture } = friend
            listFriends.push({ _id, username, profilePicture })
        })
        return {
            mess: 'get all friends success',
            code: 200,
            data: listFriends
        };
    } catch (e) {

    }
}

module.exports = {
    updateUserService, deleteUserService, getUserService, followUserService, unfollowUserService, getFriendsService
}
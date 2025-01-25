const router = require('express').Router()
const userController = require('../controllers/userController')


//update user
router.put('/:id', userController.updateUserController)
//delete user
router.delete('/:id', userController.deleteUserController)
// //get a user
router.get('/', userController.getUserController)
// //follow a user
router.put('/:id/follow', userController.followUserController)
// //unfollow a user
router.put('/:id/unfollow', userController.unfollowUserController)
// get friends
router.get('/friends/:userId', userController.getFriendsController)


module.exports = router
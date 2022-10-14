const router = require('express').Router()
const auth = require("../middleware/auth")
const userController = require("../controllers/userController")


router.get('/user', auth, userController.getUser)

router.patch('/user', auth, userController.updateUser)
router.patch('/user/avatar', auth, userController.updateAvatar)
router.patch('/password', auth, userController.changePassword)



module.exports = router
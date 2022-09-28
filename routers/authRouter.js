const authController = require("../controllers/authController");
const  authRouter = require('express').Router()

authRouter.post('/register', authController.register)

module.exports = authRouter
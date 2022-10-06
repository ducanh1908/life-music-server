const auth = require("../middleware/auth")
const cateRouter = require('express').Router()
const CateController = require("../controllers/cateController");

cateRouter.post('/cate', auth, CateController.creatNewCate);
cateRouter.get('/cate', auth, CateController.getAllCate);

module.exports = cateRouter;
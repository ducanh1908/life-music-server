const auth = require("../middleware/auth");
const singerRouter = require('express').Router();
const singerController = require("../controllers/singerController");

singerRouter.post('/singer', auth, singerController.addNewSinger);
singerRouter.delete('/singer/:id', auth, singerController.deleteSinger);

module.exports = singerRouter

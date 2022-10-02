const auth = require("../middleware/auth");
const singerRouter = require('express').Router();
const singerController = require("../controllers/singerController");

singerRouter.post('/singer', auth, singerController.addNewSinger);
// singerRouter.get('/songs', auth, singerController.getAllPublicSong);
// singerRouter.get('/song', auth, singerController.getSongByName);
// singerRouter.patch('/song/:id', auth, singerController.updateSong);
// singerRouter.delete('/song/:id', auth, singerController.deleteSong);
// singerRouter.get('/song/search/:key', auth, singerController.searchSong);

module.exports = singerRouter

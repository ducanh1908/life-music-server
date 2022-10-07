const auth = require("../middleware/auth")
const songRouter = require('express').Router()
const FileController = require("../controllers/FileController");

songRouter.post('/song', auth, FileController.addNewSong);
songRouter.get('/songs', auth, FileController.getAllPublicSong);
songRouter.get('/song', auth, FileController.getSongByName);
songRouter.patch('/song/:id', auth, FileController.updateSong);
songRouter.patch('/song/status/:id', auth, FileController.songPublicOrPrivate);
songRouter.delete('/song/:id', auth, FileController.deleteSong);
songRouter.get('/song/search/:key', auth, FileController.searchSong);
songRouter.get('/song/uploaded', auth, FileController.getUploadedSongs);
songRouter.get('/song/:id', auth, FileController.getSongById);
module.exports = songRouter

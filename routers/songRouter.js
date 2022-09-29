const auth = require("../middleware/auth")
const songRouter = require('express').Router()
const FileController = require("../controllers/FileController");

songRouter.post('/upload', auth, FileController.addNewSong);
songRouter.get('/songs', auth, FileController.getAllSong);
songRouter.get('/song', auth, FileController.getSongByName);
songRouter.patch('/song/update', auth, FileController.updateSong);
songRouter.delete('/song', auth, FileController.deleteSong);

module.exports = songRouter

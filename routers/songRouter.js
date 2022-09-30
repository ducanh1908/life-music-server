const auth = require("../middleware/auth")
const songRouter = require('express').Router()
const FileController = require("../controllers/FileController");

songRouter.post('/song', auth, FileController.addNewSong);
songRouter.get('/songs', auth, FileController.getAllSong);
songRouter.get('/song', auth, FileController.getSongByName);
songRouter.patch('/song/:id', auth, FileController.updateSong);
songRouter.delete('/song/:id', auth, FileController.deleteSong);

module.exports = songRouter

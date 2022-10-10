const auth = require("../middleware/auth")
const songRouter = require('express').Router()
const FileController = require("../controllers/FileController");
const SongAdminController = require("../controllers/SongAdminController");

songRouter.post('/song', auth, FileController.addNewSong);
songRouter.get('/song',auth,FileController.getUserSong)
songRouter.patch('/song/:id', auth, FileController.updateSong);
songRouter.patch('/song/status/:id', auth, FileController.songPublicOrPrivate);
songRouter.delete('/song/:id', auth, FileController.deleteSong);
songRouter.get('/song/uploaded', auth, FileController.getUploadedSongs);
songRouter.get('/song/:id', auth, FileController.getSongById);
songRouter.get('/song/search/:key', auth, FileController.searchSongUser);

songRouter.get('/songs', auth, SongAdminController.getAllPublicSong);
songRouter.get('/songs/search/:key', auth, SongAdminController.searchSong);

module.exports = songRouter

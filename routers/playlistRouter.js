const auth = require("../middleware/auth")
const playlistRouter = require('express').Router()
const playlistController = require("../controllers/playlistController");

playlistRouter.post('/playlist', auth, playlistController.addNewAlbum);
playlistRouter.get('/playlist', auth, playlistController.getAlbumByName);
// playlistRouter.get('/playlists', auth, playlistController.getAllAlbum);
// playlistRouter.patch('/album/update/:id', auth, playlistController.updateAlbum);
// playlistRouter.delete('/album', auth, playlistController.deleteAlbum);

module.exports = playlistRouter;
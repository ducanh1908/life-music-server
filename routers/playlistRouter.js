const auth = require("../middleware/auth")
const playlistRouter = require('express').Router()
const playlistController = require("../controllers/playlistController");
const playlistAdminController = require('../controllers/playlistAdminController')

playlistRouter.post('/playlist/:id', auth, playlistController.createNewPlaylist);
playlistRouter.post('/playlist/addsong/:id', auth, playlistController.addSongIntoPlaylist);
playlistRouter.get('/playlists/:id', auth, playlistController.getUserPlaylist);
playlistRouter.patch('/playlist/update/:id', auth, playlistController.updatePlaylist);
playlistRouter.delete('/playlist/:id', auth, playlistController.deletePlaylist);
playlistRouter.post('/playlist/remove/:id', auth, playlistController.removeSongFromPlaylist);
playlistRouter.get('/playlist/:id', auth, playlistController.getPlaylistById);
playlistRouter.get('/playlist/search/:key', auth, playlistController.searchPlaylistUser);
playlistRouter.get('/playlist', auth, playlistController.getAllUserPlaylist);

playlistRouter.get('/playlists', auth, playlistAdminController.getAllPublicPlaylist);
playlistRouter.get('/playlists/search/:key', auth, playlistAdminController.searchPlaylistAdmin);

module.exports = playlistRouter;
const auth = require("../middleware/auth")
const playlistRouter = require('express').Router()
const playlistController = require("../controllers/playlistController");

playlistRouter.post('/playlist/:id', auth, playlistController.createNewPlaylist);
playlistRouter.post('/playlist/addsong/:id', auth, playlistController.addSongIntoPlaylist);
playlistRouter.get('/playlists/:id', auth, playlistController.getAllUserPlaylist);
playlistRouter.get('/playlist/search/:key', auth, playlistController.searchPlaylist);
playlistRouter.patch('/playlist/update/:id', auth, playlistController.updatePlaylist);
playlistRouter.delete('/playlist/:id', auth, playlistController.deletePlaylist);
playlistRouter.post('/playlist/remove/:id', auth, playlistController.removeSongFromPlaylist);
playlistRouter.get('/playlist/:id', auth, playlistController.getPlaylistById);
playlistRouter.patch('/playlist/:id', auth, playlistController.updatePlaylistById);


playlistRouter.get('/playlists', auth, playlistController.getAllPublicPlaylist);
module.exports = playlistRouter;
const auth = require("../middleware/auth")
const albumRouter = require('express').Router()
const albumController = require("../controllers/albumController");

albumRouter.post('/album', auth, albumController.addNewAlbum);
albumRouter.patch('/album/update/:id', auth, albumController.updateAlbum);
albumRouter.get('/albums', auth, albumController.getAllAlbum);
albumRouter.get('/album', auth, albumController.getAlbumByName);
albumRouter.delete('/album', auth, albumController.deleteAlbum);

module.exports = albumRouter;
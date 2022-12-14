const auth = require("../middleware/auth")
const likeRouter = require('express').Router()
const likeController = require("../controllers/likeController");

likeRouter.post('/song/like/:id', auth, likeController.likeSong);
likeRouter.get('/song/likedlist/:id', auth, likeController.getAllLikedSongs);
likeRouter.get('/song/like/:id', auth, likeController.getLikeNumber);
// albumRouter.get('/album', auth, albumController.getAlbumByName);
// albumRouter.delete('/album/:id', auth, albumController.deleteAlbum);

module.exports = likeRouter;
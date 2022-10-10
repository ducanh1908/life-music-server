const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const mongoose = require("mongoose");
const PlaylistAdminController = {

    //playlist/:id, auth, playlistController.createNewPlaylist
    createNewPublicPlaylist: async (req, res) => {
        try {
            let name = req.body.name;
            let userId = req.params.id;
            let newPlaylist = new Playlist({
                name: name,
                user: mongoose.Types.ObjectId(userId),
                status: 2
            });
            let success = await newPlaylist.save();
            if (success) {
                res.json({
                    msg: "Tạo public playlist thành công",
                    success,
                });
            } else {
                res.json({
                    msg: "Tạo public playlist thất bại",
                });
            }
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //playlistRouter.get('/playlists', auth, playlistController.getAllPublicPlaylist);
    getAllPublicPlaylist: async (req, res) => {
        try {
            let playlists = await Playlist.find({status: 2});
            let data = [];
            for (let i = 0; i < playlists.length; i++) {
                data.push(await Song.find({ playlist: playlists[i] }));
            }
            // console.log("playlists", playlists);
            // console.log("data", data);
            for (let i = 0; i < playlists.length; i++) {
                playlists[i]._doc.songs = data[i];
            }
            res.json({ playlists });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    //playlistRouter.get('/playlists/search/:key', auth, playlistController.searchPlaylist);
    searchPlaylistAdmin: async (req, res) => {
        try {
            let playlists = await Playlist.find({
                $or: [
                    { name: { $regex: req.params.key, $options: 'ig' } },
                    // {song: { $regex: req.params.key } }
                    // {user: { $regex: req.params.key, $options: 'ig'  } }
                ],
            });
            // let data = [];
            // for (let i = 0; i < playlists.length; i++) {
            //   data.push(await Song.find({ playlist: playlists[i]._id }));
            // }
            // for (let i = 0; i < playlists.length; i++) {
            //   playlists[i]._doc.songs = data[i];
            // }
            res.json({ playlists });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },
}
module.exports = PlaylistAdminController
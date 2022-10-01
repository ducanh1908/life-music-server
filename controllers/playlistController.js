const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model")

const PlaylistController = {
    createNewPlaylist: async (req, res) => {
        try {
            let name = req.body.name;
            let userId = req.body._id;
            let newPlaylist = new Playlist({name : name, user: userId})
            let success = await newPlaylist.save();
            if(success) {
                res.json({
                    msg: "Tạo playlist thành công"
                });
            } else {
                res.json({
                    msg: "Tạo playlist thất bại"
                })
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    addSongIntoPlaylist: async (req, res) => {
        try {
           let songIds = req.body.songIds;
           let playlistId = req.body.playlistId;

           await Song.findByIdAndUpdate({_id : songId}, {playlist : playlistId})
           let songsInPlaylist = await Song.find({playlist : playlistId})
           res.status(200).json({msg : "Thêm bài hát thành công " , songsInPlaylist});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


    // getAllAlbum: async (req, res) => {
    //     try {
    //        let albums = await Album.find();
    //             res.json({albums})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message});
    //     }
    // },

    // getAlbumByName : async (req, res) => {
    //     try {
    //         let albumName = req.body.name
    //         let albums = await Album.find({name: albumName})
    //         res.json({albums})
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },

    // deleteAlbum: async (req, res) => {
    //     try {
    //         let id = req.params.id;
    //         let album = await Album.findById({_id:id})
    //         if(!album){
    //             res.status(500).json({msg:"Album không tồn tại"})
    //         }else {
    //             await Album.deleteOne({_id: id});
    //             res.json({
    //                 msg: "Xóa album thành công"
    //             })
    //         }
    //     } catch (err) {
    //         return res.status(500).json({msg: err.message})
    //     }
    // },
   
};

module.exports = PlaylistController;

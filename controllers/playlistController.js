const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const mongoose = require('mongoose');

const PlaylistController = {
    //playlist/:id, auth, playlistController.createNewPlaylist
    createNewPlaylist: async (req, res) => {
        try {
            let name = req.body.name;
            let userId = req.params.id;
            let newPlaylist = new Playlist({name : name, user: mongoose.Types.ObjectId(userId)})
            let success = await newPlaylist.save();
            if(success) {
                res.json({
                    msg: "Tạo playlist thành công", 
                    success
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

    // /playlist/addsong/:id, auth, playlistController.addSongIntoPlaylist
    addSongIntoPlaylist: async (req, res) => {
        try {
           let songId = req.params.id;
           let playlistId = req.body.playlistId;
           let existPlaylist = await Playlist.find({_id : playlistId});
           let existSong = await Song.find({_id : songId});
           if(songId && playlistId) {
               if(existPlaylist && existSong) {
                    await Song.findByIdAndUpdate({_id : songId}, {playlist : playlistId});
                    let songsInPlaylist = await Song.find({playlist : playlistId})
                    console.log('songsInPlaylist',songsInPlaylist);
                    res.status(200).json({msg : "Thêm bài hát thành công " , songsInPlaylist});
               } else {
                res.status(404).json({msg : 'Playlist does not exist'});
               }
           } else {
             res.status(404).json({msg : 'PlaylistId not found'});
           }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    
    // /playlist/remove/:id, auth, playlistController.removeSongFromPlaylist 
    removeSongFromPlaylist: async (req, res) => {
        try {
           let songId = req.body.songId;
           let playlistId = req.params.id;
           if(songId && playlistId) {
                await Song.findByIdAndUpdate({_id : songId}, {playlist : null})
           }
           let songsInPlaylist = await Song.find({playlist : playlistId})
           console.log('songsInPlaylist',songsInPlaylist);
           res.status(200).json({msg : "Thêm bài hát thành công " , songsInPlaylist});
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //playlistRouter.get('/playlists/:id', auth, playlistController.getAllUserPlaylist);
    getAllUserPlaylist: async (req, res) => {
        try {
           let userId = req.params.id;
           let playlists = await Playlist.find({user :userId});
           console.log('playlists', playlists)
                res.json({playlists});
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    //playlistRouter.patch('/playlist/update/:id', auth, playlistController.updatePlaylist);
    updatePlaylist : async (req, res) => {
        try {
            let name = req.body.name;
            let cateId = req.body.cateId;
            let playlistId = req.params.id;
            let songIds = req.body.songIds;
            let updatedPlaylist = await Playlist.findByIdAndUpdate({_id: playlistId}, {name : name, cate: cateId});
            if(songIds && playlistId && updatedPlaylist) {
                songIds.map(async (songId, index) => {
                    console.log('songId', songId, index)
                    await Song.findByIdAndUpdate({_id : songId}, {playlist : playlistId})
                })
            }
            let playlist = await Playlist.find({_id : playlistId})
            let songsInPlaylist = await Song.find({playlist : playlistId})
            console.log('songsInPlaylist',songsInPlaylist);
            res.status(200).json({msg : "Playlist updated successfully", playlist, songsInPlaylist});
        } catch (err) {
            return res.status(500).json({msg: err.message});
            
        }
    },

    //playlistRouter.get('/playlist', auth, playlistController.getPlaylistByName);
    getPlaylistByName : async (req, res) => {
        try {
            let Playlist = req.body.name
            let playlists = await Playlist.find({name: Playlist})
            res.json({playlists})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    //playlistRouter.delete('/playlist/:id', auth, playlistController.deletePlaylist);
    deletePlaylist: async (req, res) => {
        try {
            let id = req.params.id;
            let playlist = await Playlist.findById({_id:id})
            if(!playlist){
                res.status(500).json({msg:"Album không tồn tại"})
            }else {
                await Playlist.deleteOne({_id: id});
                res.json({
                    msg: "Xóa playlist thành công"
                })
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
};

module.exports = PlaylistController;

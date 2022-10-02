const Singer = require("../models/singer.model");

const SingerController = {
    //singerRouter.post('/singer', auth, singerController.addNewSinger);
    addNewSinger: async (req, res) => {
        try {
            let name = req.body.name;
            let description = req.body.description;
            let image = req.body.image;
            let userId = req.body.userId;
            let newSinger = new Singer({
                name: name,
                description: description,
                image: image,
                user: userId,
            });
            let success =  await newSinger.save();
            if(success) {
                res.json({
                    msg: "Đăng ký ca sĩ thành công", 
                    success
                });
            } else {
                res.json({
                    msg: "Đăng ký ca sĩ thất bại"
                })
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    ///playlist/addsong/:id, auth, playlistController.addSongIntoPlaylist
    addSongIntoPlaylist: async (req, res) => {
        try {
           let songIds = req.body.songIds;
           let playlistId = req.params.id;
           if(songIds && playlistId) {
               songIds.map(async (songId, index) => {
                   console.log('songId', songId, index)
                   await Song.findByIdAndUpdate({_id : songId}, {playlist : playlistId})
               })
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

module.exports = SingerController;

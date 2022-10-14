const Playlist = require("../models/playlist.model");
const Song = require("../models/song.model");
const mongoose = require("mongoose");

const PlaylistController = {
    //playlist/:id, auth, playlistController.createNewPlaylist
    createNewPlaylist: async (req, res) => {
        try {
            let name = req.body.name;
            let userId = req.params.id;
            let newPlaylist = new Playlist({name : name, user: mongoose.Types.ObjectId(userId), status : 1})
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

  // /playlist/addsong/:id, auth, playlistController.addSongIntoPlaylist
  addSongIntoPlaylist: async (req, res) => {
    try {
      let songId = req.params.id;
      let playlistId = req.body.playlistId;
      let existPlaylist = await Playlist.find({ _id: playlistId });
      //    console.log('existPlaylist', existPlaylist)
      let existSong = await Song.find({ _id: songId });
      if (songId && playlistId) {
        if (existPlaylist && existSong) {
          await Song.findByIdAndUpdate(
            { _id: songId },
            { playlist: playlistId }
          );
          let songsInPlaylist = await Song.find({ playlist: playlistId });
          songsInPlaylist.push({ playlistName: existPlaylist[0].name });
          // console.log('songsInPlaylist',songsInPlaylist);
          res.json({ msg: "Thêm bài hát thành công ", songsInPlaylist });
        } else {
          res.status(400).json({ msg: "Không tìm thấy playlist" });
        }
      } else {
        res.status(400).json({ msg: "PlaylistId không tồn tại" });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // /playlist/remove/:id, auth, playlistController.removeSongFromPlaylist
  removeSongFromPlaylist: async (req, res) => {
    try {
      let songId = req.body.songId;
      let playlistId = req.params.id;
      if (songId && playlistId) {
        await Song.findByIdAndUpdate({ _id: songId }, { playlist: null });
      }
      let songsInPlaylist = await Song.find({ playlist: playlistId });
      let song = Song.findById({ _id: songId });
      res
        .status(200)
        .json({
          msg: "Xóa bài hát khỏi playlist thành công ",
          // songsInPlaylist,
        });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //playlistRouter.get('/playlists/:id', auth, playlistController.getAllUserPlaylist);
  getAllUserPlaylist: async (req, res) => {
    try {
      let userId = req.params.id;
      let playlists = await Playlist.find({ user: userId });
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

  //playlistRouter.patch('/playlist/update/:id', auth, playlistController.updatePlaylist);
  updatePlaylist: async (req, res) => {
    try {
      let name = req.body.name;
      let cateId = req.body.cateId;
      let playlistId = req.params.id;
      let songIds = req.body.songIds;
      let updatedPlaylist = await Playlist.findByIdAndUpdate(
          { _id: playlistId },
          { name: name, cate: cateId }
      );
      if (songIds && playlistId && updatedPlaylist) {
        songIds.map(async (songId, index) => {
          // console.log("songId", songId, index);
          await Song.findByIdAndUpdate(
            { _id: songId },
            { playlist: playlistId }
          );
        });
      }
      let playlist = await Playlist.find({ _id: playlistId });
      let songsInPlaylist = await Song.find({ playlist: playlistId });
      res.status(200).json({
        msg: "Playlist updated successfully",
        playlist,
        songsInPlaylist,
      });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  //playlistRouter.get('/playlist/:id', auth, playlistController.getPlaylistById);
  // getPlaylistById: async (req, res) => {
  //   try {
  //     let PlaylistId = req.params.id;
  //     console.log(PlaylistId)
  //     let playlist = await Playlist.find({ _id: PlaylistId });
  //     let songs = await Song.find({ playlist: PlaylistId });
  //     playlist.push(songs);
  //     res.status(200).json({ playlist });
  //   } catch (err) {
  //     return res.status(500).json({ msg: err.message });
  //   }
  // },

  //playlistRouter.get('/playlist/search/:key', auth, playlistController.searchPlaylist);
  searchPlaylist: async (req, res,next) => {
    try {

      let playlists = await Playlist.find({ status: 2,
        $or: [
          { name: { $regex: req.params.key , $options: 'ig' } },
        ],
      });

      return res.json({ playlists });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
    getPlaylistById : async(req, res)=> {
      try{
        let id = req.params.id;
        let playlist = await Playlist.findById({_id:id});
        if(playlist) {
          return   res.status(200).json(playlist);
        }
        else {
          return res.status(400).json({msg: "Playlist không tồn tại"});
        }
      }catch (err){
        console.log(err)
      }

    },

  //playlistRouter.delete('/playlist/:id', auth, playlistController.deletePlaylist);
  deletePlaylist: async (req, res) => {
    try {
      let id = req.params.id;
      let playlist = await Playlist.findById({ _id: id });
      if (!playlist) {
        res.status(500).json({ msg: "Album không tồn tại" });
      } else {
        await Playlist.deleteOne({ _id: id });
        res.json({
          msg: "Xóa playlist thành công",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  updatePlaylistById: async (req, res) => {
    try {
      const {name,description,image}= req.body
      const playList = await Playlist.findById({_id:req.params.id})
      if(!playList) return res.status(400).json({msg:'playlist không tồn tại'})
      await Playlist.findOneAndUpdate({_id:req.params.id},
          {
            name,description,image
          })
      res.json({msg:"Cập nhật thành công!"})
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSongToPlaylist : async(req, res) => {
      try {
        let id = req.params.id;
        let playlist = await Playlist.findById({_id : id})
        if (!playlist) {
          return res.status(400).json({msg: "Playlist"});
        }
        let songs = await Song.find({playlist : playlist.id})
         res.status(200).send({ data: { playlist, songs } });

      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
  },
 getRandomPlaylist: async (req, res) => {  
    const playlists = await Playlist.aggregate(
      [ { $match : { status : 2 } } ,
      { $sample: { size: 3} }]) 
    res.status(200).json(playlists);
  }
};

module.exports = PlaylistController;

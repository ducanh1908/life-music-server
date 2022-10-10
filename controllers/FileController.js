const Song = require("../models/song.model");
const View = require("../models/view.model");
const mongoose = require('mongoose')

const FileController = {
  // songRouter.post('/song', auth, FileController.addNewSong);
  addNewSong: async (req, res) => {
    try {
      let newSong = new Song({
        name: req.body.name,
        file: req.body.file,
        duration: req.body.duration,
        user:  mongoose.Types.ObjectId(req.user._id),
      });
      let success = await newSong.save();
      let {name, image} = success;
      // console.log('success',success)
      // let songInfo = await Song.findOne().sort({ createdAt: -1 });
      let newView = new View({
        user: req.user._id,
        song: success._id,
      });
      let newLike = new Like({
        song: success._id
      })
      let createLikeSuccess = await newLike.save();
      let createViewSuccess = await newView.save();
      if (success && createViewSuccess && createLikeSuccess) {
        await Song.findByIdAndUpdate({_id : newSong._id}, {like : newLike._id})
        res.status(200).json({
          msg: "Đã tải bài hát thành công",
        });
      } else {
        res.status(403).json({
          msg: "Upload không thành công",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // songRouter.get('/songs', auth, FileController.getAllSong);
  getAllPublicSong: async (req, res) => {
    try {
      let songs = await Song.find({status : 2});
      res.json({ songs });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // songRouter.get('/song/uploaded', auth, FileController.getUploadedSongs);
  getUploadedSongs: async (req, res) => {
    try {
      let userId = req.user._id;
      let songs = await Song.find({user : mongoose.Types.ObjectId(userId)}).sort({"createAt": 1});
      res.json({ songs });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // songRouter.patch('/song/:id', auth, FileController.updateSong);
  updateSong: async (req, res) => {
    try {
      let { name, description, image, author, lyric, singerName, cate } = req.body;
      await Song.findOneAndUpdate(
        { _id: req.params.id },
        { name, description, image, author, lyric, singerName, cate }
      );
      let songUpdated = await Song.findById({ _id: req.params.id });
      res.json({ songUpdated });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // songRouter.patch('/song/status/:id', auth, FileController.songPublicOrPrivate);
  songPublicOrPrivate: async (req, res) => {
    try {
      let  status  = req.body.status;
      // console.log(req.params.id)
      // console.log('status', req.body)
      await Song.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(req.params.id) },
        { status }
      );
      res.json({ msg : 'update trạng thái thành công' });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },


  // songRouter.delete('/song/:id', auth, FileController.deleteSong);
  deleteSong: async (req, res) => {
    try {
      let id = req.params.id;
      let user = req.user._id;
      let song = await Song.find({user : mongoose.Types.ObjectId(user)}, { _id: mongoose.Types.ObjectId(id) });
      if (!song) {
        res.status(500).json({ msg: "Bài hát không tồn tại" });
      } else {
        await Song.deleteOne({ _id: mongoose.Types.ObjectId(id) });
        res.json({
          msg: "Bài hát đã được xoá",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // songRouter.get('/song/search/:key', auth, FileController.searchSong);
  searchSong: async (req, res) => {
    try {
      let data = await Song.find({
        $or: [
          { name: { $regex: req.params.key, $options: 'ig' } },
        ],
      });
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  getSongById: async (req, res) => {
    try {
      let id = req.params.id;
      let song = await Song.findById({_id: id});
      if (!song) {
        res.status(500).json({ msg: "Bài hát không tồn tại" });
      } else {
        res.status(200).json(song);
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  // songRouter.get('/song/search/:key', auth, FlieController.searchSong);
  searchSongUser: async (req, res) => {
    try {
      let data = await Song.find({ status: 1,
        $or: [
          { name: { $regex: req.params.key , $options: 'ig'} },
          // { author: { $regex: req.params.key ,$options: 'ig'} },
        ],
      });
      console.log(data)
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
}
module.exports = FileController;

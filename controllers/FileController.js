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
      // console.log('newView', newView);
      let createViewSuccess = await newView.save();
      if (success && createViewSuccess) {
        res.status(200).json({success,
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


  // songRouter.get('/songs', auth, FileController.getAllSong);
  getAllPublicSong: async (req, res) => {
    try {
      let songs = await Song.find({status : 1});
      res.json({ songs });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // songRouter.get('/song', auth, FileController.getSongByName);
  getSongByName: async (req, res) => {
    try {
      let songName = req.body.name;
      let songs = await Song.find({ name: songName });
      res.json({ songs });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // songRouter.patch('/song/:id', auth, FileController.updateSong);
  updateSong: async (req, res) => {
    try {
      let { name, description, image, author, lyric } = req.body;
      await Song.findOneAndUpdate(
        { _id: req.params.id },
        { name, description, image, author, lyric }
      );
      let songUpdated = await Song.findById({ _id: req.params.id });
      res.json({ songUpdated });
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
          { name: { $regex: req.params.key , $options: 'ig'} },
        ],
      });
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  getAllSongByPlaylistId:async (req, res) => {
    try {
      let id = req.params.id;
      console.log(id)
      let songs = await Song.find({playlist: id});
      res.json({ songs });
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
    } catch (error) {
      console.log(error)
    }
  },
  // getSongNew : async (req, res) => { 
  //   const date = new Date();
  //   const  lastMonth = new Date(date.getMonth.date.setDay(date.getDay() -1) );
  //   console.log(lastMonth)
  //   const  previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() -2));
  // }
  getSongRandom: async (req, res) => {  
    const playlists = await Song.aggregate(
      [ { $match : { status : 1 } } ,
      { $sample: { size: 9} }]) 
    res.status(200).json(playlists);
  }
}
module.exports = FileController;

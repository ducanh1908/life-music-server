const Singer = require("../models/singer.model");
const mongoose = require("mongoose");

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
        user: mongoose.Types.ObjectId(userId),
      });
      let success = await newSinger.save();
      if (success) {
        res.json({
          msg: "Đăng ký ca sĩ thành công",
          success,
        });
      } else {
        res.json({
          msg: "Đăng ký ca sĩ thất bại",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // singerRouter.get('/singer', auth, singerController.getSingerList);
  getSingerList: async (req, res) => {
    try {
      let singerList = await Singer.find();
      res.json({ singerList });
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // singerRouter.get('/singer/search/:key', auth, singerController.searchSinger);
  searchSinger: async (req, res) => {
    try {
      let data = await Singer.find({
        $or: [{ name: { $regex: req.params.key } }],
      });
      res.json(data);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
  //singerRouter.delete('/singer/:id', auth, singerController.deleteSinger);
  deleteSinger: async (req, res) => {
    try {
      let id = req.params.id;
      let singer = await Singer.findById({ _id: id });
      if (!singer) {
        res.status(500).json({ msg: "Ca sĩ không tồn tại" });
      } else {
        await Playlist.deleteOne({ _id: id });
        res.json({
          msg: "Xóa ca sĩ thành công",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },
};

module.exports = SingerController;

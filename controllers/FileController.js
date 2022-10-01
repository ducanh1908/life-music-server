const Song = require("../models/song.model");
const View = require("../models/view.model");

const FileController = {
    addNewSong: async (req, res) => {
        try {
            let newSong = new Song({
                name: req.body.name,
                file: req.body.file,
                user: req.body._id,
                
            });
            let success = await newSong.save();
            let songInfo = await Song.findOne().sort({createdAt: -1});
            // console.log('songInfo', songInfo);
            let newView = new View({
                user: req.body._id,
                song: songInfo._id
            })
            // console.log('newView', newView);
            let createViewSuccess = await newView.save();
            if(success && createViewSuccess) {
                res.status(200).json({
                    msg: "Đã tải bài hát thành công", songInfo
                });
            } else {
                res.status(403).json({
                    msg: "Upload không thành công"
                })
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getAllSong: async (req, res) => {
        try {
            let songs = await Song.find();
            res.json({songs})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getSongByName : async (req, res) => {
        try {
            let songName = req.body.name
            let songs = await Song.find({name: songName})
            res.json({songs})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateSong: async (req, res) => {
        try {
            let { name, description, image, author} = req.body
            await Song.findOneAndUpdate({_id : req.params.id}, { name, description, image, author});
            let songUpdated = await Song.findById({_id:req.params.id})
                res.json({songUpdated})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteSong: async (req, res) => {
        try {
            let id = req.params.id;
            let song = await Song.findById({_id:id})
            if(!song){
                res.status(500).json({msg:"Bài hát không tồn tại"})
            }else {
                await Song.deleteOne({_id: id});
                res.json({
                    msg: "Bài hát đã được xoá"
                })
            }

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    searchSong: async (req, res) => {
        try {
            let data = await Song.find(
                {
                    "$or": [
                        {name: {$regex: req.params.key}},
                        {author: {$regex: req.params.key}},
                    ]
                }
            )
                res.json(data);
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};

module.exports = FileController;

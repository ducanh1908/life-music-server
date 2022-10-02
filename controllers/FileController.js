const Song = require("../models/song.model");

const FileController = {
    addNewSong: async (req, res) => {
        try {
            let name = req.body.name;
            let file = req.body.file;
            let newSong = new Song({
                name: name,
                file: file
            });
            let success = await newSong.save();
            if(success) {
                res.json({
                    msg: "Bài hát đã được tải lên"
                });
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

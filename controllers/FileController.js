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
                    msg: "File upload successful"
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
            let songUpdated = await Song.findOneAndUpdate({_id : req.body._id}, { name, description, image, author});
            res.json({songUpdated})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    deleteSong: async (req, res) => {
        try {
            let id = req.body._id;
            await Song.deleteOne({id: id});
            res.json({
                msg: "Song deleted"
            })
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
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    getNewSong: async (req, res) => {
        try {
            let songs = await Song.find();
            songs.sort((a,b) => b.createdAt - a.createdAt);
            res.json(songs);
        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
};

module.exports = FileController;

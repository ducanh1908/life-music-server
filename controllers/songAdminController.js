const Song = require("../models/song.model");
const View = require("../models/view.model");
const mongoose = require('mongoose') ;
const SongAdminController = {
    // songRouter.get('/songs', auth, songAdminController.getAllSong);
    getAllPublicSong: async (req, res) => {
        try {
            let songs = await Song.find({status : 2});
            res.json({ songs });
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    },

    // songRouter.get('/songs/search/:key', auth, songAdminController.searchSong);
    searchSong: async (req, res) => {
        try {
            let data = await Song.find({
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
module.exports =SongAdminController
const Like = require("../models/like.model");
const Song = require("../models/song.model");
const mongoose = require('mongoose');

const LikeController = {
    //likeRouter.post('/song/like/:id', auth, likeController.likeOrNotLike)
    likeOrNotLike : async (req, res) => {
        try {
            let userId = req.body.userId;
            let songId = req.params.id;
            let like = req.body.like;
            let likeDoc = Like.find({song: mongoose.Types.ObjectId(songId)});
            console.log(likeDoc)
            // let listUsers = likeDoc._doc.user;
            // console.log('listUsers', listUsers)
            if(like && userId) {
                let index = listUsers.indexOf(userId);

                if(index) {
                    let updateLike = Like.findByIdAndUpdate({_id : mongoose.Types.ObjectId(likeDoc._id)}, {})
                }
            }
            res.json({msg: "da vao"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
       
    },

    //likeRouter.get('/song/like', auth, likeController.getAllLikedSongs);
    getAllLikedSongs: async (req, res) => {
        try {
           let userId = req.body.userId;
           let data = await Like.find({user :userId, like: true});
           let songs = [];
           if(data) {
             if(isArray(data)){
                data.forEach(async (item) => {
                    songs.push(await Song.findOne({_id: item.song}))
                })
                res.json({songs})
             } else {
               let song = await Song.findOne({_id: data.song});
                res.json({song})
             }
           } else {
                res.json({msg : "empty"});
           }
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    //likeRouter.get('/song/like/:id', auth, likeController.getLikeNumber);
    getLikeNumber : async (req, res) => {
        try {
           let songId = req.body.songId;
           let amount = Like.countDocuments({song : songId});
           res.status(200).json({likeAmount : amount})
        } catch (err) {
            return res.status(500).json({msg: err.message});
            
        }
    },
};

module.exports = LikeController;

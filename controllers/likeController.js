const Like = require("../models/like.model");
const Song = require("../models/song.model")

const LikeController = {
    //likeRouter.post('/song/like', auth, likeController.likeOrNotLike)
    likeOrNotLike : async (req, res) => {
        try {
            let userId = req.body.userId;
            let songId = req.body.songId;
            let like = req.body.like;
            let isLikeDocCreated = Like.findOne({user : userId, song: songId});
            if(like) {
                if(isLikeDocCreated){
                    await Like.findByIdAndUpdate({_id: isLikeDocCreated._id}, {like : true})
                } else {
                    let newLike = new Like({user : userId, song: songId, like: true})
                    let success = await newLike.save();
                    if(success) {
                        res.json({
                            msg: "Liked", 
                            success
                        });
                    } else {
                        res.json({
                            msg: "Like false"
                        })
                    }
                }
            } else {
                await Like.findByIdAndUpdate({_id: isLikeDocCreated._id}, {like : false})
                res.json({
                    msg: "Not like"
                })
            }
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

    //likeRouter.get('/song/like/amount', auth, likeController.getLikeAmount);
    getLikeAmount : async (req, res) => {
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

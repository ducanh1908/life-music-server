const Like = require("../models/like.model");
const Song = require("../models/song.model");
const User = require("../models/user");
const mongoose = require('mongoose');

const LikeController = {
    //likeRouter.post('/song/like/:id', auth, likeController.likeOrNotLike)
    likeSong : async (req, res) => {
        try {
            let likeId = req.body.likeId;
            let userId = req.body.userId;
            let like = req.body.like;
            let songId = req.params.id;
            let likeDoc = await Like.findById(likeId).exec();
            let userDoc = await User.findById(userId).exec();
            let songIndex = userDoc.likeSongs.indexOf(songId);
            let index = likeDoc.user.indexOf(userId);
            if(like) {
                if(index === -1) {
                    if(songIndex === -1) {
                        await User.findByIdAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {$push: {likeSongs : songId}}, { upsert: true, new: true});
                    }
                    let success = await Like.findByIdAndUpdate({_id: mongoose.Types.ObjectId(likeId)}, {$push: {user : userId}}, { upsert: true, new: true});
                    let likeNumber = success.user.length;
                    res.status(200).json({msg: 'like bài hát thành công', likeNumber, like});
                } else if (index !== -1) {
                    res.status(200).json({msg: "bài hát đã được like"});
                }
            } else {
                    if(index !== -1) {
                        await User.findByIdAndUpdate({_id: mongoose.Types.ObjectId(userId)}, {$pull: {likeSongs : songId}}, { upsert: true, new: true});
                        let success = await Like.findByIdAndUpdate({_id: mongoose.Types.ObjectId(likeId)},{ $pullAll: { user: [userId] } }, { upsert: true, new: true});
                        let likeNumber = success.user.length;
                        like = false;
                        res.status(200).json({msg: 'unlike thành công', likeNumber, like});
                    } else if (index === -1) {
                        res.status(200).json({msg: 'đã unlike rồi'});
                    }
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

   //likeRouter.get('/song/likedlist/:id', auth, likeController.getAllLikedSongs);
   getAllLikedSongs: async (req, res) => {
    try {
       let userId = req.params.id;
       let userDoc = await User.findById(userId).populate('likeSongs');
       userDoc = userDoc.toObject();
       delete userDoc.password;
       delete userDoc.role;
       delete userDoc.accountType;
       delete userDoc.createdAt;
       delete userDoc.updatedAt;
       delete userDoc.email;
       delete userDoc.phone;
        res.status(201).json({userDoc});
    } catch (err) {
        return res.status(500).json({msg: err.message});
    }
},

//likeRouter.get('/song/like/:id', auth, likeController.getLikeNumber);
getLikeNumber : async (req, res) => {
    try {
       let songId = req.params.id;
       let song = Song.findById(songId);
       let like = Like.findById(song.like);
       let amount = like.user.length;
       res.status(200).json({amount})
    } catch (err) {
        return res.status(500).json({msg: err.message});
        
    }
},
};

module.exports = LikeController;

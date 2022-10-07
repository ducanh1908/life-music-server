// Tên bài hát
// - Mô tả bài hát
// - File mp3
// - Ảnh đại diện
// - Tác giả
// - Ca sĩ
// - Người đăng
// - Dòng nhạc
// - Album

const mongoose = require('mongoose');
const { Schema } = mongoose;


const SongSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please input song's name"],        
        },
        file: {
            type: String,
            required: [true, 'please upload file'],
        },
        image: {
            type: String,
            default: "https://play-lh.googleusercontent.com/olj6n0kCUo_x3lNfgvzdGR5k_NEsz2D9PuC8evI0hYCHLSQHBhKY-cQwZ4EtWnac28o=w240-h480-rw"
        },
        singerName: {
            type: String,
        },
        lyric: {
            type: String,
        },
        cate: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        playlist: {
            type: Schema.Types.ObjectId,
            ref: "Playlist",
        },
        singer: {
            type: Schema.Types.ObjectId,
            ref: "Singer",
        },
        album: {
            type: Schema.Types.ObjectId,
            ref: "Album",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        like: {
            type: Schema.Types.ObjectId,
            ref: "Like",
           
        },
        status: {
            type: Number,
            default : 1,
        },
        guestViews: {
            type: Number,
            default : 0,
        },
        duration: {
            type: Number,
            default : 0
        }
    },  
    { timestamps : true}
)

module.exports = mongoose.model("Song", SongSchema);
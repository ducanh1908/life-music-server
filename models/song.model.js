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

const SongSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please input song's name"],        
        },
        file: {
            type: String,
            require: [true, 'please upload file'],
        },
        image: {
            type: String,
            default: "https://play-lh.googleusercontent.com/olj6n0kCUo_x3lNfgvzdGR5k_NEsz2D9PuC8evI0hYCHLSQHBhKY-cQwZ4EtWnac28o=w240-h480-rw"
        },
        author: {
            type: String,
        },
        singer: {
            type: Schema.Types.Objects,
            ref: "Singer"
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category",
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        views: {
            type: Number,
            default : 0,
        }
       
    },
    { timestamps : true}
)

module.exports = mongoose.model("Song", SongSchema);
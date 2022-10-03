const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const AlbumSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please input album's name"],        
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "https://play-lh.googleusercontent.com/olj6n0kCUo_x3lNfgvzdGR5k_NEsz2D9PuC8evI0hYCHLSQHBhKY-cQwZ4EtWnac28o=w240-h480-rw"
        },
        author: {
            type: String,
        },
        cate: {
            type: Schema.Types.ObjectId,
            ref: "Category",
            require: true,
        },
        singer: {
            type: Schema.Types.ObjectId,
            ref: "Singer"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Album", AlbumSchema);
const mongoose = require('mongoose');
const { Schema } = mongoose;


const CommentSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
        playlist: {
            type: Schema.Types.ObjectId,
            ref: "Playlist",
        },
        album : {
            type: Schema.Types.ObjectId,
            ref: "Album",
        },
        comment: {
            type: String,
            default: null,
        },
    },
    { timestamps : true}
)

module.exports = mongoose.model("Comment", CommentSchema);
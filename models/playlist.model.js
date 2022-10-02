const mongoose = require('mongoose');
const { Schema } = mongoose;


const PlaylistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please input playlist's name"],        
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        cate: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Playlist", PlaylistSchema);
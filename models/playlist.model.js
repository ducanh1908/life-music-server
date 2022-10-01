const mongoose = require('mongoose');
const { Schema } = mongoose;


const PlaylistSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please input playlist's name"],        
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Playlist", PlaylistSchema);
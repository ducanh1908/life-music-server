const mongoose = require('mongoose');
const { Schema } = mongoose;

//status 1 : public , status 2 : private
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
        },
        status: {
            type: Number,
            default: 1
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Playlist", PlaylistSchema);
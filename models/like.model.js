const mongoose = require('mongoose');
const { Schema } = mongoose;


const LikeSchema = new mongoose.Schema(
    {
        like: {
            type: Boolean,
            default: false,        
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
        },
    },
    { timestamps : true}
)

module.exports = mongoose.model("Like", LikeSchema);
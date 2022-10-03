const mongoose = require('mongoose');
const { Schema } = mongoose;


const LikeSchema = new mongoose.Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
            required: true,
        },
        like: {
            type: Boolean,
            default: false
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Like", LikeSchema);
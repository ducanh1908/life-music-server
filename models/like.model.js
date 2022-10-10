const mongoose = require('mongoose');
const { Schema } = mongoose;


const LikeSchema = new mongoose.Schema(
    {
        user: [{
            type: Schema.Types.ObjectId,
            ref: "User",
            default: [],
        }],
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Like", LikeSchema);
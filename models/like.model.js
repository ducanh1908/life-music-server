const mongoose = require('mongoose');
const { Schema } = mongoose;


const LikeSchema = new mongoose.Schema(
    {
        user: [{
            type: Schema.Types.ObjectId,
            ref: "User",
        }],
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
            required: true,
        },
    },
    { timestamps : true}
)

module.exports = mongoose.model("Like", LikeSchema);
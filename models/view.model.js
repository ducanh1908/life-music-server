const mongoose = require('mongoose');
const { Schema } = mongoose;


const ViewSchema = new mongoose.Schema(
    {
        view: {
            type: Number,
            default: 0,
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            require: true,
        },
        song: {
            type: Schema.Types.ObjectId,
            ref: "Song",
            require: true,
        },
    },
    { timestamps : true}
)

module.exports = mongoose.model("View", ViewSchema);
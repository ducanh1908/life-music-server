const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const SingerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "please input singer's name"],        
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("Singer", SingerSchema);
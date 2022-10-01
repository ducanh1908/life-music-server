const mongoose = require('mongoose');


const SingerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please input singer's name"],        
        },
        description: {
            type: String,
        },
        image: {
            type: String,
            default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png"
        },
    },
    { timestamps : true}
)

module.exports = mongoose.model("Singer", SingerSchema);
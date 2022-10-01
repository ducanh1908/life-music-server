const mongoose = require('mongoose');
const { Schema } = mongoose;


const miniCateSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            require: [true, "please input miniCate's name"],        
        },
        image: {
            type: String,
            default: "https://play-lh.googleusercontent.com/olj6n0kCUo_x3lNfgvzdGR5k_NEsz2D9PuC8evI0hYCHLSQHBhKY-cQwZ4EtWnac28o=w240-h480-rw"
        },
        description: {
            type: String,
        },
        category: {
            type: Schema.Types.ObjectId,
            ref: "Category"
        }
    },
    { timestamps : true}
)

module.exports = mongoose.model("miniCate", miniCateSchema);
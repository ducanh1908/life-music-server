const mongoose = require('mongoose');
const { Schema } = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "please input username"],
            unique: true,
        },
       
        password: {
            type: String,
            required: [true, "Please input password"],
        },
        email: {
            type: String,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please input a valid email",
            ],
            unique: true,
            required: [true, "Please input email"]
        },
        phone: {
            type: String,
            match: [
                /^[0-9\-\+]{9,15}$/,
                "Please input a valid phone number",
            ],
            required: true,
            unique: true,
        },
        profileImage: {
            type: String,
            default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
        },
        address: {
            type: String,
        },
        fullname:{
            type:String
        },
        singer: {
            type: Schema.Types.ObjectId,
            ref: "Singer"
        },
        accountType: {
            type: [String],
            default: ["local"],
        },
        role:{
            type:Number,
            default: 1
        },
        likeSongs: [{
            type: Schema.Types.ObjectId,
            ref: "Song",
            default: [],
        }],
    },
    { timestamps : true}
);
module.exports = mongoose.model("User", UserSchema);
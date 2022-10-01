const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            require: [true, "please input username"],
            unique: true,
        },
        password: {
            type: String,
            require: [true, "Please input password"],
        },
        email: {
            type: String,
            match: [
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                "Please input a valid email",
            ],
            unique: true,
            require: [true, "Please input password"]
        },
        phone: {
            type: String,
            match: [
                /^[0-9\-\+]{9,15}$/,
                "Please input a valid phone number",
            ],
            unique: true,
        },
        profileImage: {
            type: String,
            default: "https://www.kindpng.com/picc/m/21-214439_free-high-quality-person-icon-default-profile-picture.png",
        },
        address: {
            type: String,
        },
        accountType: {
            type: [String],
            default: ["local"],
            require: true,
        },
        fullname:{
            type:String
        },
    },
    { timestamps : true}
);

module.exports = mongoose.model("User", UserSchema);
const Users = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const authController = {
    register: async (req, res) => {
        try {
            const {username,password,phone,email} = req.body
            let newUserName = username.toLowerCase().replace(/ /g, '')

            const user_name = await Users.findOne({username: newUserName})
            if(user_name) return res.status(400).json({msg: "This user name already exists."})
            const user_email = await Users.findOne({email})
            if(user_email) return res.status(400).json({msg: "This email already exists."})
            if(phone.length < 9)
                return res.status(400).json({msg: "Invalid Phone number"})

            const passwordHash = await bcrypt.hash(password, 12)

            const newUser = new Users({
                username: newUserName, password: passwordHash,phone,email
            })
            await newUser.save()
            res.json({
                msg: 'Register Success!',
                user: {
                    ...newUser._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body
            const user = await Users.findOne({username})

            if(!user) return res.status(400).json({msg: "This username does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch) return res.status(400).json({msg: "Password is incorrect."})

            const access_token = createAccessToken({id: user._id})

            res.json({
                msg: 'Login Success!',
                access_token,
                user: {
                    ...user._doc,
                    password: ''
                }
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },


}
const createAccessToken = (payload) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1d'})
}
module.exports = authController
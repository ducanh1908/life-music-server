const Users = require('../models/user');
const bcrypt = require("bcrypt");


const userController={
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user._id).select('-password')
            if(!user) return res.status(400).json({msg: "User does not exist."})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {
            const { profileImage, fullname, phone, address} = req.body
            if(!fullname) return res.status(400).json({msg: "Please add your full name."})
            if(phone.length < 9)
                return res.status(400).json({msg: "Invalid Phone number"})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                profileImage, fullname, phone, address
            })

            res.json({msg: "Update Success!"})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    changePassword:async (req,res)=>{
        try{
            const user = await Users.findOne({id:req.user._id})
            if(!user) return res.status(400).json({msg: "please login"})
            const {oldpassword,newpassword}= req.body
            const isMatch = await bcrypt.compare(oldpassword, user.password)
            if(isMatch){
                const passwordHash = await bcrypt.hash(newpassword, 12)
                await Users.findOneAndUpdate({_id: req.user._id}, {
                     password:passwordHash
                })
                res.json({
                    msg: 'change password Success!',
                    user: {
                        ...user._doc,
                        password: ''
                    }
                })

            }else {
                return res.status(400).json({msg: "Password is incorrect."})
            }

        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}
module.exports=userController
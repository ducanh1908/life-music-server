const Users = require('../models/user');
const bcrypt = require("bcrypt");


const userController={
    getUser: async (req, res) => {
        try {
            const user = await Users.findById(req.user._id).select('-password')
            if(!user) return res.status(400).json({msg: "Người dùng không tồn tại"})
            res.json({user})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateUser: async (req, res) => {
        try {

            const {  fullname, phone, address} = req.body
            if(!fullname) return res.status(400).json({msg: "Vui lòng nhập họ tên"})
            if(phone.length < 9)
                return res.status(400).json({msg: "Vui lòng nhập đúng số điện thoại ; 9 chữ số"})

            await Users.findOneAndUpdate({_id: req.user._id}, {
                 fullname, phone, address
            })
            const user = await Users.findById({_id: req.user._id})

            res.json({
                msg: "Cập nhật thành công!",
                user: {
                    ...user._doc,
                    password: ''
                }})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    updateAvatar: async (req, res) => {
        try {
            const {profileImage} = req.body
            console.log(profileImage)
            await Users.findOneAndUpdate({_id: req.user._id}, {
                profileImage
            })
            const user = await Users.findById({_id: req.user._id})
            res.json({
                msg: "Cập nhật thành công!",
                user: {
                    ...user._doc,
                    password: ''
                }})

        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    changePassword:async (req,res)=>{
        try{
            const user = await Users.findById({_id:req.user._id})
            if(!user) return res.status(400).json({msg: "Vui lòng đăng nhập"})
            const {oldpassword,newpassword}= req.body
            const isMatch = await bcrypt.compare(oldpassword, user.password)
            if(!isMatch) return res.status(400).json({
                msg: "Mật khẩu cũ không đúng",
                user: {
                    ...user._doc,
                    password: ''
                }
            })

                const passwordHash = await bcrypt.hash(newpassword, 12)
                await Users.findOneAndUpdate({_id:req.user._id}, {
                    password:passwordHash
                })
                const newuser = await Users.findById({_id:req.user._id})
                res.json({
                    msg: 'Thay đổi mật khẩu thành công!',
                    user: {
                        ...newuser._doc,
                        password: ''
                    }
                })

        }catch (err) {
            return res.status(500).json({msg: err.message})
        }
        // finally {
        //     const user2 = await Users.findById({_id:req.user._id})
        //     res.json({
        //         user: {
        //             ...user2._doc,
        //             password: ''
        //         }
        //     })
        // }
    }

}
module.exports=userController
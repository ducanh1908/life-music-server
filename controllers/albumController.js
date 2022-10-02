const Album = require("../models/album.model");

const AlbumController = {
    // albumRouter.post('/album', auth, albumController.addNewAlbum);
    addNewAlbum: async (req, res) => {
        try {
            let name = req.body.name;
            let newAlbum = new Album({
                name: name
            });
            let success = await newAlbum.save();
            if(success) {
                res.json({
                    msg: "Album đã được tạo"
                });
            }
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    // albumRouter.patch('/album/update/:id', auth, albumController.updateAlbum);
    updateAlbum: async (req, res) => {
        try {
            let { name, description, image, author} = req.body
            await Album.findOneAndUpdate({_id : req.params.id}, { name, description, image, author});
            let albumUpdated = await Album.findById({_id:req.params.id})
                res.json({albumUpdated})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    // albumRouter.get('/albums', auth, albumController.getAllAlbum);
    getAllAlbum: async (req, res) => {
        try {
           let albums = await Album.find();
                res.json({albums})
        } catch (err) {
            return res.status(500).json({msg: err.message});
        }
    },

    // albumRouter.get('/album', auth, albumController.getAlbumByName);
    getAlbumByName : async (req, res) => {
        try {
            let albumName = req.body.name
            let albums = await Album.find({name: albumName})
            res.json({albums})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    // albumRouter.delete('/album/:id', auth, albumController.deleteAlbum);
    deleteAlbum: async (req, res) => {
        try {
            let id = req.params.id;
            let album = await Album.findById({_id:id})
            if(!album){
                res.status(500).json({msg:"Album không tồn tại"})
            }else {
                await Album.deleteOne({_id: id});
                res.json({
                    msg: "Xóa album thành công"
                })
            }
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
   
};

module.exports = AlbumController;

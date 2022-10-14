const Category = require("../models/category.model");

const CateController = {
//   cateRouter.post('/cate', auth, CateController.creatNewCate);
  creatNewCate: async (req, res) => {
    try {
      let newCate = new Category({
        name: req.body.name,
        image: req.body.image
      });
      let success = await newCate.save();
      
      if (success ) {
        res.status(200).json({
          msg: "Tạo Cate thành công",
          newCate,
        });
      } else {
        res.status(403).json({
          msg: "Tạo Cate không thành công",
        });
      }
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  },

  // cateRouter.get('/cate', auth, CateController.getAllCate);
  getAllCate : async (req, res) => {
    try {
      let categories = await Category.find();
      res.status(200).json(categories);
    } catch (err) {
      return res.status(500).json({ msg: err.message });
    }
  }
};

module.exports = CateController;

const Category = require("../models/category.model");

const CateController = {
  creatNewCate: async (req, res) => {
    try {
      let newCate = new Category({
        name: req.body.name,
        image: req.body.image
      });
      let success = await newCate.save();
      let Cate = await Category.findOne().sort({ createdAt: -1 });
      
      if (success && Cate) {
        res.status(200).json({
          msg: "Tạo Cate thành công",
          Cate,
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
};

module.exports = CateController;

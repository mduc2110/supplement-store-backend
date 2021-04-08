const Category = require('../models/categoryModels');
const {urlConvert} = require('../utils/urlConvert');
module.exports = {
    create : async (req, res) => {
        const {cateName, description} = req.body;
        try {
            const category = new Category({
                cateName,
                description,
                urlParam: urlConvert(cateName)
            });
            const savedCategory = await category.save();
            res.status(201).json(savedCategory);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getAll : async (req, res) => {
        try {
            const categories = await Category.find();
            res.status(200).json(categories);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getOne : async (req, res) => {
        try {
            const {urlParam} = req.params;
            const category = await Category.findOne({
                urlParam
            });
            res.status(200).json(category);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    update : async (req, res) => {
        const {_id, cateName, description} = req.body;
        try {
            const updatedCategory = await Category.updateOne(
                {_id},
                {
                    $set: {
                        cateName, 
                        description,
                        urlParam: urlConvert(cateName)
                    }
                }
            );
            res.status(200).json(updatedCategory);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
        // res.json("update")
    },
    remove : async (req, res) => {
        try {
            const {urlParam} = req.params;
            const removedCategory = await Category.remove({urlParam});
            if(removedCategory.deletedCount == 0){
                res.status(400).json({message: "no category is removed"});    
            }else{
                res.status(200).json(removedCategory);
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

}
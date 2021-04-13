const Product = require('../models/productModels');
const {urlConvert} = require('../utils/urlConvert');
const fs = require('fs');
module.exports = {
    create : async (req, res) => {
        const imgPath = [...req.files].map(item => item.path);
        const {
            productName,
            description,
            importPrice,
            price,
            discount,
            weight,
            brand,
            options,
            categoryId
        } = req.body;
        const parsedOptions = options.map(item => JSON.parse(item));
        // res.status(200).json({
        //     parsedOptions
        // })
        try {
            const product = new Product(
                {
                    productName,
                    description,
                    importPrice,
                    price,
                    discount,
                    weight,
                    brand,
                    urlProduct: urlConvert(productName),
                    options: parsedOptions,
                    imgUrl: imgPath,
                    categories: categoryId
                }
            );
            await product.save();
            res.status(201).json(product);
                
        } catch (error) {
            imgPath.forEach(img => {
                fs.unlink(img, err => {
                    console.log({message: err});
                    return;
                });
            })
            console.log(error.message);
            res.status(500).json({message: error.message});
        }
    },
    getAll : async (req, res) => {
        try {
            const products = await Product.find().populate('categories').exec();
            res.status(200).json(products);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    getOne : async (req, res) => {
        try {
            const {urlProduct} = req.params;
            const product = await Product.findOne({
                urlProduct
            })
            .populate('categories')
            .exec();;
            res.status(200).json(product);
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    update : async (req, res) => {
        const {
            _id,
            productName,
            description,
            importPrice,
            price,
            discount,
            brand,
            options,
            imgUrl,
            categoryId
        } = req.body;
        try {
            const updatedProduct = await Product.updateOne(
                {_id},
                {
                    productName,
                    description,
                    importPrice,
                    price,
                    discount,
                    brand,
                    urlProduct: urlConvert(productName),
                    options,
                    imgUrl,
                    categoryId
                }
            );
            res.status(200).json(updatedProduct);
                
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    },
    remove : async (req, res) => {
        try {
            const {_id} = req.params;
            const removedProduct = await Product.remove({_id});
            if(removedProduct.deletedCount == 0){
                res.status(400).json({message: "no Product is removed"});    
            }else{
                res.status(200).json(removedProduct);
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    }

}
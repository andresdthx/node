const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const Product = require('../db/models/productModel');
const { success, errors } = require('../network/response');
const { updateProduct, getProduct } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.get(
    '/',
    expressAsyncHandler(async (req, res)=>{
        const products = await Product.find({});
        res.send(products);
    })
);

productRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res)=>{
        const createdProducts = await Product.insertMany(data.products);
        res.send({createdProducts});
    }),
);

productRouter.get(
    '/:id',
    expressAsyncHandler(async(req, res)=>{
        const product = await Product.findById(req.params.id);
        if (product) {
            res.send(product);
        } else {
            res.status(404).send({message: 'Product not found'});
        }
    })
);

productRouter.put('/update/:id', expressAsyncHandler(async(req, res) => {

    try {
        const id = req.params.id;
        const data = req.body.product;
        
        const product = await getProduct(id);

        res.send(product.countInStock);
        // if(data.qty){
        //     product.countInStock -= data.qty;
        // }

        const updatedProduct = await updateProduct(product, data);
        success(req, res, updatedProduct);

    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

module.exports = productRouter;
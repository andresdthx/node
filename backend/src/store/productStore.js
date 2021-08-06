const Product = require('../db/models/productModel');

const updateProduct = async (product, data) => {

    product.brand = data.brand;
    product.name = data.name;
    product.category = data.category;
    product.price = data.price;
    product.countInStock = data.countInStock;
    product.description = data.description;

    const updatedProduct = await product.save();
    return updatedProduct;
}

const getProduct = async (id) => {
    const product = await Product.findById(id);
    return product;
}

const getProducts = async (id) => {
    const products = await Product.find({});
    return products;
}

module.exports = {
    update: updateProduct,
    listOne: getProduct,
    list: getProducts 
}
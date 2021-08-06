const { update, listOne } = require("../store/productStore");

const updateProduct = async (product, data) => {
    const updatedProduct = await update(product, data);
    if (!updatedProduct) throw new ({message: 'Product not updated', status: 404});
    return updatedProduct;
}

const getProduct = async (id) => {
    const product = await listOne(id);
    if (!product) throw new ({message: 'Product not found', status: 401});

    return product;
}

module.exports = {
    getProduct,
    updateProduct
}
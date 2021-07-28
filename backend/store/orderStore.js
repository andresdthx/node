const Order = require('../db/models/orderModel');

const getOrders = async () => {
    const orders = await Order.find({});
    return orders;
}

const getOrdersByUser = async (id) => {
    const orders = await Order.find({user: id});
    return orders;
}

module.exports = {
    list: getOrders,
    listByUser: getOrdersByUser
}
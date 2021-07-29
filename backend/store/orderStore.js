const Order = require('../db/models/orderModel');

const createOrder = async (data, user) => {
    const order = new Order({
        orderItems: data.orderItems,
        shippingAddress: data.shippingAddress,
        paymentMethod: data.paymentMethod,
        itemsPrice: data.itemsPrice,
        shippingPrice: data.shippingPrice,
        taxPrice: data.taxPrice,
        totalPrice: data.totalPrice,
        user: user._id
    });
    const createdOrder = await order.save();

    return createdOrder;
}

const getOrders = async () => {
    const orders = await Order.find({});
    return orders;
}

const getOrder = async (id) => {
    const order = await Order.findById(id);
    return order;
}

const getOrdersByUser = async (id) => {
    const orders = await Order.find({user: id});
    return orders;
}

const updateOrder = async (order, data) => {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
        id: data.id,
        status: data.status,
        update_time: data.update_time,
        email_address: data.payer.email_address,
    }
    const updateOrder = await order.save();
    return updateOrder;
}

const deleteOrder = async (id) => {
    const order = await Order.deleteOne({ _id: id });
    return order
}

module.exports = {
    list: getOrders,
    listByUser: getOrdersByUser,
    listOne: getOrder,
    update: updateOrder,
    remove: deleteOrder,
    create: createOrder
}
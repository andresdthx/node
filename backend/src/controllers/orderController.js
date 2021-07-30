const { list, listByUser, listOne, update, remove, create } = require('../store/orderStore');

const getOrders = async () => {
    let orders = await list();
    return orders;

}

const getOrder = async (id) => {
    let order = await listOne(id);
    if(!order) throw new ({ message: 'Order not found', status: 404 });

    return order;
}

const getOrdersByUser = async (data) => {
    let orders =  await listByUser(data.id);
    if(!orders) throw new ({ message: 'Order not found', status: 404 });

    return orders;
}

const updateOrder = async (order, data) => {
    let orderUpdate = await update(order, data);
    if(!orderUpdate) throw new ({ message: 'Error updated order', status: 400 });

    return orderUpdate;
}

const createOrder = async (data, user) => {
    let order = await create(data, user);
    if(!order) throw new ({message: 'Error created order', status: 400 });

    return order;
}

const deleteOrder = async (id) => {
    let order = await remove(id);
    return order
}

module.exports = {
    getOrders,
    getOrdersByUser,
    getOrder,
    updateOrder,
    deleteOrder,
    createOrder
}
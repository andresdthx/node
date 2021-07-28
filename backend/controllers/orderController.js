const { list, listByUser } = require('../store/orderStore');

const getOrders = async (data) => {
    let orders = await list();
    return orders;

}

const getOrdersByUser = async (data) => {
    let orders =  await listByUser(data.id);
    return orders;
} 

module.exports = {
    getOrders,
    getOrdersByUser
}
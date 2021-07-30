const { getOrders,
        getOrdersByUser, 
        getOrder, 
        updateOrder, 
        deleteOrder,
        createOrder
} = require('../controllers/orderController');
const express = require('express');
const Order = require('../db/models/orderModel');
const { isAuth } = require('../middleware/user.middleware');
const { success, errors } = require('../network/response');
const expressAsyncHandler = require('express-async-handler');
const { validateAdmin, validateCart } = require('../middleware/order.middleware');

const orderRouter = express.Router();

orderRouter.post('/', isAuth, validateCart, expressAsyncHandler(async(req, res) => {
    try {
        const order = await createOrder(req.body, req.user);
        success(req, res, {message: 'new order created', order: order}, 201);
    } catch (err) {
        errors(req, res, err.message, err.status);
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) =>{
    try {
        const order = await getOrder(req.params.id);
        success(req, res, order);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) =>{
    try {
        const order = await getOrder(req.params.id);
        const orderUpdate = await updateOrder(order, req.body);

        success(req, res, orderUpdate);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

orderRouter.post('/list', isAuth, expressAsyncHandler(async(req, res)=>{
    try {
        const orders = await getOrdersByUser(req.body);
        success(req, res, orders);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

orderRouter.post('/list/all', validateAdmin, expressAsyncHandler( async(req, res) => {
    try {
        const orders = await getOrders();
        success(req, res, orders);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));
 
orderRouter.delete('/:id', isAuth, async(req, res) => {
    const order = await deleteOrder(req.params.id);
    success(req, res, order);
})

module.exports = orderRouter;
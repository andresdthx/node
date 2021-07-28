const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const { getOrders, getOrdersByUser } = require('../controllers/OrderController');
const { validateAdmin } = require('../middleware/order.middleware');
const Order = require('../db/models/orderModel');
const { isAuth } = require('../middleware/utils');

const orderRouter = express.Router();

orderRouter.post('/', isAuth, expressAsyncHandler(async(req, res) =>{
    if(req.body.orderItems.length === 0){
        res.status(400).send({message: 'Cart is empty'});
    } else {
        const order = new Order({
            orderItems: req.body.orderItems,
            shippingAddress: req.body.shippingAddress,
            paymentMethod: req.body.paymentMethod,
            itemsPrice: req.body.itemsPrice,
            shippingPrice: req.body.shippingPrice,
            taxPrice: req.body.taxPrice,
            totalPrice: req.body.totalPrice,
            user: req.user._id
        });
        const createdOrder = await order.save();
        res.status(201).send({message: 'new order created', order: createdOrder});
    }
}));

orderRouter.get('/:id', isAuth, expressAsyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        res.send(order);
    } else {
        res.status(404).send('Order Not Found');
    }
}));

orderRouter.put('/:id/pay', isAuth, expressAsyncHandler(async (req, res) =>{
    const order = await Order.findById(req.params.id);
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
        order.paymentResult = {
            id: req.body.id,
            status: req.body.status,
            update_time: req.body.update_time,
            email_address: req.body.payer.email_address,
        }
        const updateOrder = await order.save();
        res.send({message: 'Order paid', order: updateOrder})
    } else {
        res.status(404).send({message: 'Order not found'});
    }
}));

orderRouter.post('/list', expressAsyncHandler(async(req, res)=>{
    const orders = await getOrdersByUser(req.body);

    if(orders){
        res.send(orders);
    } else {
        res.status(404).send('Not Found');
    }
}));

orderRouter.post('/list/all', validateAdmin, expressAsyncHandler( async(req, res) => {
    const orders = await getOrders();
    if(orders) {
        res.send(orders);
    } else {
        res.status(404).send('Not Found');
    }
}))
 
orderRouter.delete('/:id', isAuth, async(req, res) => {
    const id = req.params.id;
    const order = await Order.deleteOne({ _id: id });
    res.send(order);
})

module.exports = orderRouter;
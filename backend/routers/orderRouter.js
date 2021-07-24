const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { isAuth } = require('../utils');

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

orderRouter.post('/history', expressAsyncHandler(async(req, res)=>{
    const ObjectId = require('mongodb').ObjectId; 
    const id = req.body.id;
    const orders = await Order.find({user: ObjectId(id)});
    if(orders){
        res.send(orders);
    } else {
        res.status(404).send('Not Fount');
    }
}))

module.exports = orderRouter;
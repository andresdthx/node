const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const data = require('../data');
const User = require('../models/userModel');

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res)=>{
        const createdUsers = await User.insertMany(data.users);
        res.send({createdUsers});
    }),
);

module.exports = userRouter;
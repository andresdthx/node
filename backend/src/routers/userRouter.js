const data = require('../data');
const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../db/models/userModel');
const { isAuth } = require('../middleware/user.middleware');
const expressAsyncHandler = require('express-async-handler');
const { generateToken } = require('../middleware/user.middleware');
const { getUsers, getUser, updateUser, updateProfile } = require('../controllers/userController');
const { success, errors } = require('../network/response');

const userRouter = express.Router();

userRouter.get(
    '/seed',
    expressAsyncHandler(async (req, res)=>{
        const createdUsers = await User.insertMany(data.users);
        res.send({createdUsers});
    }),
);

userRouter.post(
    '/signin',
    expressAsyncHandler( async (req, res)=>{
        const user = await User.findOne({email: req.body.email});
        if (user) {
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.send({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                    isAdmin: user.isAdmin,
                    token: generateToken(user)
                });
                return;
            }
        }
        res.status(401).send({message: 'Invalid user o password'});
    }),
);

userRouter.post('/register', expressAsyncHandler( async(req, res) =>{
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8),
    });

    const createdUser = await user.save();
    
    res.send({
        _id: createdUser._id,
        name: createdUser.name,
        email: createdUser.email,
        isAdmin: createdUser.isAdmin,
        token: generateToken(createdUser)
    });
}));

userRouter.put('/update/:id', isAuth, expressAsyncHandler(async (req, res) =>{
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await getUser(id);
        var userUpdated;
        // res.send(data);

        if(data.edit){
            userUpdated = await updateUser(user, data);
        } else {
            userUpdated = await updateProfile(user, data);
        }
        success(
            req,
            res,
            {
                message: 'update success',
                user: {
                    _id: userUpdated._id,
                    name: userUpdated.name,
                    email: userUpdated.email,
                    isAdmin: userUpdated.isAdmin
                }
            });
    } catch (error) {
        errors(req, res, error.message, error.status);
    }

    // const user = await User.findById(req.params.id);
    // if(user){
    //     user.name = req.body.name;
    //     user.email = req.body.email;
    //     user.password = bcrypt.hashSync(req.body.password, 8);
    //     const updateUser = await user.save();
    //     res.send({message: 'update success', user: {
    //         _id: updateUser._id,
    //         name: updateUser.name,
    //         email: updateUser.email,
    //         isAdmin: updateUser.isAdmin
    //     }});
    // } else {
    //     res.status(404).send('User not found');
    // }
}));

userRouter.get('/', isAuth, expressAsyncHandler( async (req, res) => {

    try {
        const users = await getUsers();
        success(req, res, users);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

userRouter.get('/:id', expressAsyncHandler(async (req, res) => {
    try {
        const id = req.params.id;
        const user = await getUser(id);
        success(req, res, user);
    } catch (error) {
        errors(req, res, error.message, error.status);
    }
}));

module.exports = userRouter;
const User = require('../db/models/userModel');
const bcrypt = require('bcryptjs');

const getUsers = async () => {
    const users = await User.find({});
    return users;
}

const getUser = async (id) => {
    const user = await User.findById(id);
    return user;
}

const updateUser = async (user, data) => {
    user.name = data.name;
    user.email = data.email;
    user.isAdmin = data.isAdmin;

    const userUpdated = await user.save();
    return userUpdated;
}

const updateProfile = async (user, data) => {
    user.name = data.name;
    user.email = data.email;
    user.password = bcrypt.hashSync(data.password, 8);

    const userUpdated = await user.save();
    return userUpdated;
}

module.exports = {
    list: getUsers,
    listOne: getUser,
    updatep: updateProfile,
    updateu: updateUser
}
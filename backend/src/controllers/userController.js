const { update } = require('../db/models/userModel');
const { list, listOne, updateu, updatep } = require('../store/userStore');

const getUsers = async () => {
    const users = await list();
    if(!users) throw new ({message: 'Users not found', error: 404});
    return users;
}

const getUser = async (id) => {
    const user = await listOne(id);
    if(!user) throw new ({ message: 'User not found', error: 404 });
    return user;
}

const updateUser = async (user, data) => {
    const userUpdated = await updateu(user, data);
    if(!userUpdated) throw new ({ message: 'User not updated', error: 404 });

    return userUpdated;
}

const updateProfile = async (user, data) => {
    const userUpdated = await updatep(user, data);
    if(!userUpdated) throw new ({ message: 'User not updated', error: 404 });

    return userUpdated;
}

module.exports = {
    getUsers,
    getUser,
    updateUser,
    updateProfile
}
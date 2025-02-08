
const user = require('../models/user');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');
dotenv.config();


async function registerUser(userInfo) {
    try {
        const encryptedPassword = userInfo.password;
        const _pass = await hashPassword(encryptedPassword);
        userInfo.password = _pass;
        const _adduser = await user.create(userInfo);
        return _adduser;
    }
    catch (err) {
        throw err;
    }
}
   


async function viewUsers() {
    try {
        const _usersList = await user.find();
        return _usersList;
    }
    catch (err) {
        throw err
    }
}


async function updateUserProfile(user_id, userupdateinfo) {
    try {
        const _updatedinfo = await user.findByIdAndUpdate({ _id: user_id }, { $set: userupdateinfo }, { new: true });
        return _updatedinfo;
    }
    catch (err) {
        throw err;
    }
}

async function getUser(id){
    try{
       const userDetails = await user.findOne({_id:id});
       return userDetails;
    }
    catch(err){
        throw err
    }
}
async function deleteUser(userId) {
    try {
        const unregestered_user = await user.findByIdAndDelete(userId);
        return unregestered_user;
    }
    catch (err) {
        throw err;
    }
}



async function hashPassword(password) {
    try {
        const encrpted = await bcrypt.hash(password, 10);
        return encrpted;
    }
    catch (err) {
        throw err
    }
}

async function userLogin(useremail, password) {
    try {
        const _validUser = await user.findOne({ email: useremail });
        if(_validUser){
        const pass = _validUser.password;
        const validatePassword = await bcrypt.compare(password, pass);
        if (validatePassword) {
             const email = _validUser.email;
             const role = _validUser.role
            const token = jwt.sign({email,role}, process.env.SECRET_KEY,{expiresIn:'900sec'});
            return token;
        }
    }
        else {
            return {
                message: cnsinfo.INVALID_CREDENTIALS,
                status: cnsinfo.FAIL_STATUS
            }
        }

    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    registerUser,
    updateUserProfile,
    deleteUser,
    viewUsers,
    userLogin,
    getUser
}
const userService = require('../services/userService');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');


async function signUpUser(req, res) {
    try {
        const userData = req.body;
        const newUser = await userService.registerUser(userData);
        if (newUser) {
            return res.status(cns.CREATED).json({ message: cnsinfo.USER_CREATED, status: cnsinfo.SUCESS_STATUS });
        }
        else {
            return res.status(cns.BAD_REQUEST).json({ message: cnsinfo.USER_REGES_FAIL, status: cnsinfo.FAIL_STATUS });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrorMessage: "User Regestration||" + " " + err.message });
    }
}


async function listUsers(req, res) {
    try {
        const Users = await userService.viewUsers();
        return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Users });
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: "Fetching Users" + " " + err.message });
    }
}

async function updateProfile(req, res) {
    try {
        const userId = req.params.userId;
        const updateinfo = req.body;
        const profileUpdate = await userService.updateUserProfile(userId, updateinfo);
        if (profileUpdate) {
            return res.status(cns.SUCCESS).json({ message: cnsinfo.USER_PROFILE_UPDATE, status: cnsinfo.SUCESS_STATUS, lastUpdate: profileUpdate.updatedAt });
        }
        else {
            return res.status(cns.NOT_FOUND).json({ message: cnsinfo.INVALID_USER, status: cnsinfo.FAIL_STATUS });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cns.ERROR_STATUS, ErrMessage: "User Profile Update Error||" + " " + err.message });
    }
}

async function UnregisterUser(req, res) {

    try {
        const userid = req.params.userid;
        const unlinkUser = await userService.deleteUser(userid);
        if (unlinkUser) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, message: cnsinfo.UNLINK_USER, lastActiveTime: unlinkUser.updatedAt });
        }
        else {
            return res.status(cns.NOT_FOUND).json({ status: cnsinfo.FAIL_STATUS, message: cnsinfo.INVALID_USER });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cns.ERROR_STATUS, ErrMessage: "User Account Deletion Failed" + " " + err.message });
    }

}


async function signIn(req, res) {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const token = await userService.userLogin(email, password);
        if (token.status) {
            return res.status(cns.BAD_REQUEST).json({ status: cnsinfo.FAIL_STATUS, message: token.message })

        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, token });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: "User Login Failed" + " " + err.message });
    }
}
module.exports = {
    signUpUser,
    listUsers,
    updateProfile,
    UnregisterUser,
    signIn

}
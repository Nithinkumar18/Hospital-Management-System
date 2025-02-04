
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
    {

    username: {
        type: String,
        required: true
    },

    password: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: ["Admin", "Doctor", "Staff"]
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    contactNumber: {
        type: String,

    },

},{timestamps:true})

module.exports = mongoose.model("User",userSchema);
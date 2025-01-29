const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const docterSchema = new Schema({

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    specialization: {
        type: String,
        required: true
    },

    patients: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient"
    }],

    createdAt: {
        type: Date,
        default: Date.now
    },

    updatedAt: {
        type: Date,
        default: Date.now
    }


})

module.exports = mongoose.model( "Doctor",docterSchema);
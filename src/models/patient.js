
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({

    name: {
        type: String,
        required: true
    },

    age: {
        type: Number,
        required: true
    },


    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true
    },

    address: {
        type: String
    },

    contactNumber: {
        type: String
    },

    medicalHistory: {
        type: []
    },

    isActive: {
        type: Boolean,
        Default: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },


    updatedAt: {
        type: Date,
        default: Date.now
    }


});


module.exports = mongoose.model( "Patient",patientSchema);
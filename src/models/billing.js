

const mongoose = require('mongoose');
const appointment = require("./appointment");
const Schema = mongoose.Schema;

const billingSchema = new Schema({

    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Patient",
        required: true
    },

    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Appointment",
        required: true
    },

    amount: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ["Paid", "Unpaid"],
        required: true
    },
  
},{timestamps:true})

module.exports = mongoose.model("Billing",billingSchema);
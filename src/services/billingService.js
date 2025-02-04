const billing = require('../models/billing');
const appointment = require('../models/appointment');
const cnsinfo = require('../constants/statusInfo');


async function generateBill(billinfo) {
    try {
        const appointmentId = billinfo.appointment;
        const checkAppointment = await appointment.findOne({ _id: appointmentId });
        const appointmentStatus = checkAppointment.status;
        if (checkAppointment && appointmentStatus === cnsinfo.APPOINTMENT_STATUS) {
            const billGenerated = await billing.create(billinfo);
            return billGenerated;
        }
        else {
            const statusApp = cnsinfo.APPOINMENT_DUE;
            return statusApp;
        }
    }
    catch (err) {
        throw err;
    }
}


async function viewBills() {
    try {
        const _bills = await billing.find();
        return _bills;
    }
    catch (err) {
        throw err;
    }
}

async function updateBill(bill_id, billdata) {
    try {
        const updated_bill = await billing.findByIdAndUpdate({ _id: bill_id }, { $set: billdata }, { new: true });
        return updated_bill;
    }
    catch (err) {
        throw err;
    }
}


async function deleteBill(billId) {
    try {
        const billToDelete = await billing.findByIdAndDelete(billId);
        return billToDelete;
    }
    catch (err) {
        throw err;
    }
}

async function patientBills(patient_id) {
    try {
        const myBills = await billing.find({ patient: patient_id });
        return myBills;
    }
    catch (err) {
        throw err;
    }
}

async function generatedRevenueOverTimeRange(fromDate, toDate) {
    let Revenue = 0;
    try {
        let fdate = new Date(fromDate + "T00:00:00Z");
        let edate = new Date(toDate + "T23:59:59.999Z");
        const allbills = await billing.find({ createdAt: { $gte: fdate, $lte: edate }, status: "Paid" });
        const totalRevenue = allbills.map((bill) => { return Revenue += bill.amount });
        const revenuetobereturned = totalRevenue[totalRevenue.length - 1];
        return revenuetobereturned;


    }
    catch (err) {
        console.log(err);
        throw err;
    }
}

async function totalRevenue() {
    let revenue = 0;
    try {
        const _bills = await billing.find({ status: "Paid" });
        const generated_revenue = _bills.map((bill) => { return revenue += bill.amount });
        const revenuetobereturned = generated_revenue[generated_revenue.length - 1];
        return revenuetobereturned;
    }
    catch (err) {
        throw err;
    }
}

module.exports = {
    generateBill,
    viewBills,
    updateBill,
    deleteBill,
    patientBills,
    generatedRevenueOverTimeRange,
    totalRevenue
}


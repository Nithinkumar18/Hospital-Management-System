const appointment = require('../models/appointment');


async function scheduleAppointment(appointmentinfo) {
    try {
        let exists = false;
        const appointmentD = appointmentinfo.date;
        const doctorsId = appointmentinfo.doctor;
        const appointmentT = appointmentinfo.time;
        const checkIfSlotExists = await appointment.findOne({$and:[{doctor:doctorsId},{date:appointmentD},{time:appointmentT}]});
        if(checkIfSlotExists){
          exists = true;
          return exists;
        }
        else{
            const initializeAppointment = await appointment.create(appointmentinfo);
            return initializeAppointment;
        }
        
    }
    catch (err) {
        throw err;
    }
}


async function udpateAppointment(appointmentid, updateinfo) {
    try {
        const updatedAppointment = await appointment.findByIdAndUpdate({ _id: appointmentid }, { $set: updateinfo }, { new: true });
        return updatedAppointment;
    }
    catch (err) {
        throw err;
    }
}

async function viewAllAppointments() {
    try {
        const appointmentsInfo = await appointment.find();
        return appointmentsInfo;
    }
    catch (err) {
        throw err;
    }
}

async function viewAllAppointmentsByStatus(stage) {
    try {
        const appointmentsByStatus = await appointment.find({ status: stage });
        return appointmentsByStatus;
    }
    catch (err) {
        throw err;
    }
}

async function patientAppointments(pid) {
    try {
        const patientsAppointmentsInfo = await appointment.find({ patient: pid });
        return patientsAppointmentsInfo;
    }
    catch (err) {
        throw err;
    }
}


async function doctorAppointments(doctorId) {
    try {

        const doctorAppointmentsInfo = await appointment.find({ doctor: doctorId });
        return doctorAppointmentsInfo;
    }
    catch (err) {
        throw err;
    }
}


async function deleteAppointment(appid) {
    try {
        const deletedInfo = await appointment.findByIdAndDelete( appid);
        return deletedInfo;
    }
    catch (err) {
        throw err;
    }
}


module.exports = {
    scheduleAppointment,
    udpateAppointment,
    viewAllAppointments,
    viewAllAppointmentsByStatus,
    patientAppointments,
    doctorAppointments,
    deleteAppointment
}
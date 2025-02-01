const appointmentService = require('../services/appiontmentService');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');


async function scheduleAnAppointment(req, res) {
    try {
        const appdata = req.body;
        const appointmentInfo = await appointmentService.scheduleAppointment(appdata);
        if (appointmentInfo === true) {
            return res.status(cns.SUCCESS).json({status:cnsinfo.FAIL_STATUS,Acknowledgement:cnsinfo.APPOINTMENT_EXISTS});
           

        }
        else if(appointmentInfo){
            
            const Appointment_Id = appointmentInfo._id;
            const Appointment_Date = appointmentInfo.date;
            const Appointment_Time = appointmentInfo.time;
            const Appointment_Visit_Reason = appointmentInfo.visitReason;
            const current_status = appointmentInfo.status;
            const Appointment_CreatedTime = appointmentInfo.createdAt;
            const appointmentDetails = { Appointment_Id, Appointment_Date, Appointment_Time, Appointment_Visit_Reason, current_status, Appointment_CreatedTime };
            return res.status(cns.CREATED).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_SUCCESS, appointmentDetails });
        }
        else {
            return res.status(cns.BAD_REQUEST).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_FAIL });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_FAIL, ErrMessage: err.message });
    }
};


async function updateAppointmentInfo(req, res) {
    try {
        const appointment_id = req.params.appid;
        const updateinfo = req.body;
        const updateInfoDetails = await appointmentService.udpateAppointment(appointment_id, updateinfo);
        if (updateInfoDetails) {
            const Appointment_Id = updateInfoDetails._id;
            const current_status = updateInfoDetails.status;
            const lastUpdatedAt = updateInfoDetails.updatedAt;
            const Appointment_Details = { Appointment_Id, current_status, lastUpdatedAt };
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_UPDATE_SUCCESS, Appointment_Details });

        }
        else {
            return res.status(cns.BAD_REQUEST).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_UPDATE_FAIL });
        }

    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_UPDATE_FAIL, ErrMessage: err.message });
    }
}


async function allAppointments(req, res) {
    try {
        const allAppointmentsInfo = await appointmentService.viewAllAppointments();
        return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, allAppointmentsInfo });
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
    }
}

async function viewDoctorAppointments(req, res) {
    try {
        const doctor_id = req.params.doctorId;
        const myAppointments = await appointmentService.doctorAppointments(doctor_id);
        if (myAppointments.length > 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, myAppointments });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.NO_APPOINTMENTS_SCHEDULED });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
    }
}


async function viewPatientAppointments(req, res) {
    try {
        const patient_id = req.params.patientId;
        const patientAppointmentsInfo = await appointmentService.patientAppointments(patient_id);
        if (patientAppointmentsInfo.length > 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, patientAppointmentsInfo });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.NO_APPOINTMENTS_SCHEDULED });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
    }
}


async function viewAllAppointmentsByCategory(req, res) {
    try {
        const category = req.params.status;
        const appointmentList = await appointmentService.viewAllAppointmentsByStatus(category);
        if (appointmentList.length > 0) {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, appointmentList });
        }
        else {
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.STATUS_CATEGORY, OptedCategory: category });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
    }
}


async function deleteAnAppointment(req, res) {
    try {
        const appointment_id = req.params.appointmentId;
        const removedAppointment = await appointmentService.deleteAppointment(appointment_id);
        if (removedAppointment) {
            const appointment_Id = appointment_id;
            const deletedAt = removedAppointment.updatedAt;
            const appointmentData = { appointment_Id, deletedAt };
            return res.status(cns.SUCCESS).json({ status: cnsinfo.SUCESS_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_DELETED, appointmentData });
        }
        else {
            return res.status(cns.BAD_REQUEST).json({ status: cnsinfo.FAIL_STATUS, Acknowledgement: cnsinfo.APPOINTMENT_DELETION_FAIL });
        }
    }
    catch (err) {
        return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
    }
}


module.exports = {
    scheduleAnAppointment,
    updateAppointmentInfo,
    allAppointments,
    viewDoctorAppointments,
    viewPatientAppointments,
    viewAllAppointmentsByCategory,
    deleteAnAppointment


}
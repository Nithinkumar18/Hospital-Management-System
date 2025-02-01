

const statusInfo = {
    SUCESS_STATUS: "success",
    FAIL_STATUS: "fail",
    ERROR_STATUS: "error",
    USER_CREATED: "User Regestration Success!",
    USER_REGES_FAIL: "User Regestration Failed",
    INVALID_CREDENTIALS: "Login Failed! Invalid Credentials(Email or Password).Please Try Again",
    TOKEN_VOID:"Your request is missing a necessary authorization token. Please log in to obtain a valid token and try again",
    INVALID_TOKENFORMAT: "Invalid Token Format: No Token Found / Incorrect Token Format",
    TOKEN_EXPIRED: "Token Expired.Please Login Again To Resume Your Activity",
    USER_PROFILE_UPDATE: "User Profile Update Sucess!!",
    INVALID_USER: "The requested user profile does not exist. Please check the ID and try again ",
    UNLINK_USER: "user account has been deleted successfully",
    UNAUTHORISED_ROLE: "You are not authorized to perform this action. Please verify your permissions or contact the appropriate individual for assistance.",
    PATIENT_REGESTRATION: "Patient Regestration Success!",
    PATIENT_REGESTRATION_FAIL: "Patient Regestration Failed",
    PATIENT_NOT_FOUND: "The requested patient profile does not exist. Please check the ID and try again",
    PATIENT_PROFILE_UPDATE: "Patient profile has been updated successfully",
    DEACTIVATE_PATIENT_PROFILE: "Patient profile has been deactivated",
    REGISTER_DOCTOR: "Doctor has been added successfully",
    REGISTER_DOCTOR_FAIL: "Unable to add doctor. Please verify all information is correctly entered",
    CONSULTATION_SUCCESS: "Your consultation request is processed successfully",
    CONSULTATION_ERROR: "Your consultation request was failed, Please Try Again",
    APPOINTMENT_SUCCESS: "Your appointment has been scheduled successfully.Please refer following details",
    APPOINTMENT_FAIL: "We regret to inform you that we are unable to schedule your appointment.We apologize for any inconvenience this may cause.",
    APPOINTMENT_UPDATE_SUCCESS: "Appointment Details Updated Successfully.",
    APPOINTMENT_UPDATE_FAIL: "We regret to inform you that we were unable to update your appointment details as no appointment found with given data",
    NO_APPOINTMENTS_SCHEDULED: "We wish to inform you that no appointments have been scheduled for you at this time.Please try again some time",
    STATUS_CATEGORY: `We would like to inform you that no appointments were found under the status. If you require further assistance, please contact us.`,
    APPOINTMENT_DELETED: "We would like to inform you that your appointment has been successfully deleted",
    APPOINTMENT_DELETION_FAIL: "We regret to inform you that we were unable to delete your appointment  as no appointment found with given data",
    APPOINTMENT_EXISTS: "We were unable to schedule this appointment,As doctor is already booked for this slot.Please check for another slot "
}

module.exports = statusInfo
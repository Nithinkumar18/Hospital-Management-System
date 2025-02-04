
const patient = require('../models/patient');



async function registerPatient(patientInfo){
    try{
      const createPatientRecord = await patient.create(patientInfo);
      return createPatientRecord;
    }
    catch(err){
        throw err;
    }
}

async function viewPatientInfo(patientid){
    try{
      const patient_data = await patient.findOne({_id:patientid});
      return patient_data;
    }
    catch(err){
      throw err;
    }
}

async function viewPatientsList(){
    try{
     const _allPatients = await patient.find();
     return _allPatients;
    }
    catch(err){
        throw err;
    }
}
async function updatePatientDetails(patient_id,pdata){
    try{
      const updatedres = await patient.findByIdAndUpdate({_id:patient_id},{$set:pdata},{new:true});
      return updatedres;
    }
    catch(err){
        throw err;
    }
}

async function deletePatientRecord(patientId,active){
    try{
      const inactiveUser = await patient.findByIdAndUpdate({_id:patientId},{$set:active},{new:true});
      return inactiveUser;
    }
    catch(err){
        throw err;
    }
}
module.exports = {
    registerPatient,
    viewPatientInfo,
    updatePatientDetails,
    deletePatientRecord,
    viewPatientsList
}
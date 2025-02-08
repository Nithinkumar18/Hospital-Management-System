
const patientService = require('../services/patientService');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');

async function addNewPatient(req,res){
    try{
     const pdata = req.body;
     const newPatient = await patientService.registerPatient(pdata);
     if(newPatient){
        const id = newPatient._id;
        return res.status(cns.CREATED).json({status:cnsinfo.SUCESS_STATUS,message:cnsinfo.PATIENT_REGESTRATION,PatientId:id});
     }
     else{
        return res.status(cns.BAD_REQUEST).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.PATIENT_REGESTRATION_FAIL});
     }
    }
    catch(err){
       return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Patient Registration ||" +" "+err.message});
    }
}


async function viewAllPatients(req,res){
    try{
      const patient_records = await patientService.viewPatientsList();
      return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,patients:patient_records});
    }
    catch(err){
      return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage: err.message});
    }
}
async function viewPatient(req,res){
    try{
      const pid = req.params.id;
      const patientProfile = await patientService.viewPatientInfo(pid);
      if(patientProfile){
        return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,patientProfile});
      }
      else{
        return res.status(cns.NOT_FOUND).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.PATIENT_NOT_FOUND});
      }
    }
    catch(err){
       return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"View Patients Details Error"+" "+err.message});
    }
}

async function updateProfile(req,res){
    try{
      const id = req.params.id;
      const pdata = req.body;
      const _updateprofile = await patientService.updatePatientDetails(id,pdata);
      if(_updateprofile){
        return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,message:cnsinfo.PATIENT_PROFILE_UPDATE,lastUpdate:_updateprofile.updatedAt});
      }
      else{
        return res.status(cns.NOT_FOUND).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.PATIENT_NOT_FOUND});
      }
    }
    catch(err){
       return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Patient Profile Update|"+" "+err.message});
    }
}

async function deletePatientRecord(req,res){
    try{
        const pid = req.params.id;
        const data = req.body;
        const deactivateProfile = await patientService.deletePatientRecord(pid,data);
        if(deactivateProfile){
            return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,message:cnsinfo.DEACTIVATE_PATIENT_PROFILE,deactivatedAt:deactivateProfile.updatedAt});
        }
        else{
            return res.status(cns.NOT_FOUND).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.PATIENT_NOT_FOUND});
        }
    }
    catch(err){
         return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Patient Profile Deactivation"+" "+err.message});
    }
}


async function patientRecords(req,res){
  try{
    const records = await patientService.NoOfPatients();
    return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,TotalPatients:records});
  }
  catch(err){
    return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrorMessage:err.message});
  }
}

module.exports = {
    addNewPatient,
    viewPatient,
    updateProfile,
    deletePatientRecord,
    viewAllPatients,
    patientRecords

}
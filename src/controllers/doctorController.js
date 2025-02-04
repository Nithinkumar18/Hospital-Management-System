const docterService = require('../services/doctorService');
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');


async function assignDept(req,res){
    try{
      const docterDept = req.body;
      const newDoctor = await docterService.allocateDept(docterDept);
      if(newDoctor){
        return res.status(cns.CREATED).json({status:cnsinfo.SUCESS_STATUS,message:cnsinfo.REGISTER_DOCTOR,DoctorId:newDoctor.user._id});
      }
      else{
        return res.status(cns.BAD_REQUEST).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.REGISTER_DOCTOR_FAIL});
      }
    }
    catch(err){
      return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Adding Doctor Failed |"+" "+err.message});
    }
}

async function viewAllDoctors(req,res){
  try{
    const docters = await docterService.viewDoctors();
    return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,docters});
  }
  catch(err){
    return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Doctors List |"+" "+err.message});
  }
}

async function assignDoctorToPatient(req,res){
    try{
       const doctor_id = req.params.d_id;
       const patient_id = req.body.pid;
       const initializeAssign = await docterService.assignPatient(doctor_id,patient_id);
       if(initializeAssign){
          return res.status(cns.SUCCESS).json({status:cnsinfo.SUCESS_STATUS,message:cnsinfo.CONSULTATION_SUCCESS})
       }
       else{
        return res.status(cns.BAD_REQUEST).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.CONSULTATION_ERROR});
       }
    }
    catch(err){
         return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,ErrMessage:"Consultation Failed|"+" "+err.message});
    }
}

module.exports = {
    assignDept,
    viewAllDoctors,
    assignDoctorToPatient
}
const doctor = require('../models/docter');


async function allocateDept(doctorData){
    try{
       const newDoctor = await doctor.create(doctorData);
       return newDoctor;
    }
    catch(err){
        throw err;
    }
}

async function viewDoctors(){
    try{
     
        const _doctorsList = await doctor.find();
        return _doctorsList;
    }
    catch(err){
        throw err;
    }
}

async function assignPatient(dctid,pid){
    try{
        
      const _assignedPatient = await doctor.findOneAndUpdate({user:dctid},{$push:{patients:pid}},{new:true});
      return _assignedPatient;
    }
    catch(err){
      throw err;
    }
}

module.exports = {
    allocateDept,
    viewDoctors,
    assignPatient
}
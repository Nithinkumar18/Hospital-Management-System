
const cns = require('../constants/statusConstants');
const cnsinfo = require('../constants/statusInfo');



const validateRole = (allowedRoles) => {
    return (req,res,next) => {
        try{
           const currentRole = req.role;
           const validRole = allowedRoles.includes(currentRole);
           if(validRole){
            next();
           }
           else{
            return res.status(cns.UNAUTHORISED).json({ status: cnsinfo.FAIL_STATUS, message: cnsinfo.UNAUTHORISED_ROLE,ActiveRole:currentRole });
           }
        }
        catch(err){
            return res.status(cns.INTERNALSERVERERROR).json({ status: cnsinfo.ERROR_STATUS, ErrMessage: err.message });
        }
    }
}
module.exports = validateRole;


const jwt = require('jsonwebtoken');
const cnsinfo = require('../constants/statusInfo');
const cns = require('../constants/statusConstants');
const dotenv = require('dotenv');
dotenv.config();

async function validateRequest(req,res,next){

    try{
    
      const token = req.headers['authorization'];
      if(!token){
        return res.status(cns.BAD_REQUEST).json({status:cnsinfo.FAIL_STATUS,message:cnsinfo.TOKEN_VOID});
      }
      const token_format = token.split(' ')
      if(token_format[0] != 'Bearer' || token_format.length !== 2){
        return res.status(cns.BAD_REQUEST).json({message: cnsinfo.INVALID_TOKENFORMAT,status:cnsinfo.FAIL_STATUS});
        }  
        const tokenPart = token_format[1];
        const isValidToken = jwt.verify(tokenPart,process.env.SECRET_KEY);
        req.role = isValidToken.role;
        next();
        
    }
    catch(err){
        if (err.name === 'TokenExpiredError') {
            return res.status(cns.UNAUTHORISED).json({message:cnsinfo.TOKEN_EXPIRED,status:cnsinfo.FAIL_STATUS});
        }
         return res.status(cns.INTERNALSERVERERROR).json({status:cnsinfo.ERROR_STATUS,errMessage:err.message});
    }
}
module.exports = validateRequest;
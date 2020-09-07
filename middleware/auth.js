const jwt=require('jsonwebtoken');
const jwtSecret = require("../config/keys.js").jwtSecret;

module.exports=function(req,res,next){
  let token=req.header('x-auth-token');
  if(!token)
  {
    return res.status(401).json({msg:'No token, authorisation falied'});
  }
  try{
    let decoded=jwt.verify(token,jwtSecret);
    req.user=decoded.user;
    next();
  }catch(e){
    res.status(401).json({msg:'Token not valid'});
  }
}

const express=require('express');
const auth=require('../../middleware/auth');
const User=require('../../models/User');
const router=express.Router();
const {check,validationResult}=require('express-validator');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const jwtSecret = require("../../config/keys.js").jwtSecret;

router.get('/',auth,async(req,res) =>{
  try{
    let user=await User.findById(req.user.id).select('-password');
    res.send(user);
  }catch(e){
    res.status(500).send('Server Error');
  }
})

//@access Public
//@route Post api/auth
//@desc Login user
router.post('/',[
  check('email','Enter a valid email address').isEmail(),
  check('password','Password is required').not().isEmpty(),
],async(req,res)=>{
  let errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors: errors.array()});
  }
  const {email,password}=req.body;
  try{
    let user= await User.findOne({email});
    if(!user)
    {
      return res.status(400).json({errors:[{msg:'Invalid Credentials', param:"email"}]});
    }
    const isMatch=await bcrypt.compare(password,user.password);
    if(!isMatch)
    {
      return res.status(400).json({errors:[{msg:'Invalid Credentials', param:"password"}]});
    }
    const payload={user:{id:user.id, avatar: user.avatar, name: user.name}}
    jwt.sign(payload,jwtSecret,{expiresIn:3600000},(err,token)=>{
      if(err) throw err;
      res.json({token});
    })

  }catch(e){
    res.status(500).send('Server Error')
  }
})

module.exports=router;

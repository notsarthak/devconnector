const express=require('express');
const router=express.Router();
const {check,validationResult}=require('express-validator');        //Instead of 'require('express-validator/check') we use this to remove the deprecation warning from the console'
const gravatar=require('gravatar');
const bcrypt=require('bcryptjs');

const User=require('./../../models/User');
//@route Post api/users
//@desc Register user
//@access Public
router.post('/',[
  check('name','Name is required').not().isEmpty(),
  check('email','Enter a valid email address').isEmail(),
  check('password','Minimum length of the password must be 6').isLength({min:6}),
  check('password2','You must re-enter your password to verify that you entered it correctly the first time!').isLength({min:6})
],async(req,res)=>{
  let errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  const {name,email,password,password2}=req.body;
  if(password!==password2)
    return res.status(400).json({errors:[{msg:'Passwords do not match!', param:'password2'}]});
  try{
    let user= await User.findOne({email});
    if(user)
    {
      return res.status(400).json({errors:[{msg:'User already exists', param:'email'}]});
    }
    let avatar=gravatar.url(email,{s:'200',r:'pg',d:'mm'});
    user=new User({name,email,password,avatar});
    let salt=await bcrypt.genSalt(10);
    user.password=await bcrypt.hash(password,salt);
    await user.save();
    res.json(user);
  }catch(e){
    res.status(500).send('Server Error')
  }
})

module.exports=router;

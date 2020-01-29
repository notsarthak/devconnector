const express=require('express');
const {check,validationResult}=require('express-validator');
const auth=require('./../../middleware/auth');
const User=require('./../../models/User');
const Post=require('./../../models/Post');

const router=express.Router();

//@route  Post /api/posts
//@access Private
//@desc   Create a post
router.post('/',[auth,[
  check('text','Text is required').not().isEmpty()
  ]],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  try{
  const user=await User.findById(req.user.id).select('-password');
  const newPost=new Post({
    text:req.body.text,
    name:user.name,
    avatar:user.avatar,
    user:user._id
  })
  await newPost.save();
  res.json(newPost);
  }catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
})

//@access Private
//@route  Get /api/posts
//@desc   Retrieve all posts
router.get('/',auth,async(req,res)=>{
  try{
    const posts=await Post.find().sort({date:-1});
    res.json(posts);
  }catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
})

//@access Private
//@desc  Get posts by id
//@route Get /api/posts/:id
router.get('/:id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
      return res.status(404).json({msg:'No post found'});
    }
    res.json(post);
  }catch(err){
    console.error(err);
    if(err.kind==='ObjectId')
    {
      return res.status(404).json({msg:'No post found'});
    }
    res.status(500).send('Server Error');
  }
})

//@access Private
//@desc Delete post using its id
//@@route Delete /api/posts/:id
router.delete('/:id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    if(!post)
    {
      return res.status(404).json({msg:'No post found'});
    }
    if(post.user.toString()!==req.user.id)
    {
      return res.status(401).json({msg:'User not authorised'});
    }
    await post.remove();
    res.json({msg:'The post has been removed'});
  }catch(err){
    console.error(err);
    if(err.kind==='ObjectId')
    {
      return res.status(404).json({msg:'No post found'});
    }
    res.status(500).send('Server Error');
  }
})

module.exports=router;

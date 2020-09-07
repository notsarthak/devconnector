const express=require('express');
const {check,validationResult}=require('express-validator');
const auth=require('./../../middleware/auth');
const Post=require('./../../models/Post');
const Profile = require("../../models/Profile");

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
  const userProfile=await Profile.findOne({user: req.user.id}).populate({ path: "user", select: "name avatar" });
  const newPost=new Post({
    text:req.body.text,
    name:userProfile.user.name,
    avatar:userProfile.user.avatar,
    user:userProfile.user._id,
    userHandle:userProfile.handle,
    date: new Date()
  });
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
      return res.status(404).json({errors: [{msg:'No post found'}]});
    }
    if(post.user.toString()!==req.user.id)
    {
      return res.status(401).json({errors: [{msg:'User not authorised'}]});
    }
    await post.remove();
    res.json({msg:'The post has been removed'});
  }catch(err){
    console.error(err);
    if(err.kind==='ObjectId')
    {
      return res.status(404).json({errors: [{msg:'No post found'}]});
    }
    res.status(500).send('Server Error');
  }
})

//@access Private
//@route  PUT /api/posts/like/:id
//@desc   Like a post
router.put('/like/:id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length>0)
    {
      return res.status(500).json({errors: [{msg:'Post already liked'}]});
    }
    post.likes.unshift({user:req.user.id});
    await post.save();
    res.json(post.likes);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//@route   Put /api/posts/unlike/:id
//@access  Private
//@desc    Unlike a post
router.put('/unlike/:id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    if(post.likes.filter(like=>like.user.toString()===req.user.id).length===0)
    {
      return res.status(400).json({errors: [{msg:'The post has not been liked yet'}]})
    }
    const removeIndex=post.likes.map(like=>like.user).indexOf(req.user.id);
    post.likes.splice(removeIndex,1);
    await post.save();
    res.json(post.likes);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//@desc   Comment on a post
//@access Private
//@route  Put /api/posts/comment/:id
router.put('/comment/:id',[auth,[check('text','Text is required').not().isEmpty()]],async(req,res)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty())
  {
    return res.status(400).json({errors:errors.array()});
  }
  try{
     const userProfile=await Profile.findOne({user:req.user.id}).populate({path: "user", select: "avatar name"});
     const post=await Post.findById(req.params.id);
     const newComment={
       text:req.body.text,
       name:userProfile.user.name,
       avatar:userProfile.user.avatar,
       user:req.user.id,
       userHandle: userProfile.handle
     };
     post.comments.unshift(newComment);
     await post.save();
     res.json(post.comments);
  }catch(err){
    console.error(err.message);
    res.status(500).send('Server Error');
  }
})

//@desc     Delete comment
//@route    Delete /api/posts/comment/:id/:comment_id
//@access   Private
router.delete('/comment/:id/:comment_id',auth,async(req,res)=>{
  try{
    const post=await Post.findById(req.params.id);
    const comment=post.comments.find(comment=>comment.id.toString()===req.params.comment_id);
    if(comment.user.toString()!==req.user.id)
    {
      return res.status(401).json({errors: [{msg:'User not authorised'}]});
    }
    const removeIndex=post.comments.map(comment=>comment.id).indexOf(req.params.comment_id);
    post.comments.splice(removeIndex,1);
    await post.save();
    res.json(post.comments);
  }catch(err){
    console.error(err);
    res.status(500).send('Server Error');
  }
})

module.exports=router;

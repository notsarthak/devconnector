const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const PostSchema=new Schema({
  user:{
    type:Schema.Types.ObjectId,
    ref:'users'
  },
  userHandle: {
    type: String,
  },
  name:{
    type:String,
  },
  text:{
    type:String,
    required:true,
  },
  avatar:{
    type:String
  },
  likes:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    }
  }],
  comments:[{
    user:{
      type:Schema.Types.ObjectId,
      ref:'users'
    },
    text:{
      type:String,
      required:true
    },
    name:{
      type:String
    },
    avatar:{
      type:String
    },
    date:{
      type:Date,
      default:Date.now()
    },
    userHandle: String
  }],
  date:{
    type:Date
  }
})

const Post=mongoose.model('post',PostSchema);

module.exports=Post;

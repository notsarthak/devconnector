const mongoose=require('mongoose');
const config=require('config');
const db=config.get('mongoURI');

let connectDB=async()=>{
  try{
    await mongoose.connect(db,{
      useNewUrlParser:true,
      useUnifiedTopology:true               //to remove the deprecation warning on the console
    });
    console.log('Connected to mongoDB');
  }catch(err){
    console.log(err);
  }
}

module.exports=connectDB;

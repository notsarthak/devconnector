const express=require('express');
const connectDB=require('./config/db');
const mongoose=require('mongoose')
let app=express();

//to fix deprecation warning
mongoose.set('useCreateIndex', true);

//Middleware to access body of request on req object
app.use(express.json({extended:false}));

//Connect to database
connectDB();

//initialization of routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));
app.use('/api/posts',require('./routes/api/posts'));


let PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Started on port ${PORT}`));

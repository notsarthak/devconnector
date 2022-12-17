const express=require('express');
const connectDB=require('./config/db');
const mongoose=require('mongoose')
const path = require("path");
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

//serve static assets if in production
if(process.env.NODE_ENV === "production"){
    //set static folder
    app.use(express.static("client/build")); //Create a new middleware function to serve files from within a given root directory. The file to serve will be determined by combining req.url with the provided root directory. When a file is not found, instead of sending a 404 response, this module will instead call next() to move on to the next middleware, allowing for stacking and fall-backs.

    app.get('*', (req, res)=>{
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

let PORT=process.env.PORT || 5000;

app.listen(PORT,()=>console.log(`Started on port ${PORT}`));


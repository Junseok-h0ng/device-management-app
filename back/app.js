const express = require('express');
const app = express();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const config = require('./config/key');
const passport = require('passport');
const passportConfig = require('./passport');
const port = 8080;

const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
mongoose.connect(config.mongoURI
        ,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>console.log('MongoDB connected'));
        

app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave:false,
    saveUninitialized:true
}));
app.use(passport.initialize());
app.use(passport.session());
passportConfig();



app.get('/',(req,res)=>{
    res.send("hello World");
});
app.use('/user',require('./routes/user'));

app.listen(port,()=>{
    console.log('express server is running at 8080');
})
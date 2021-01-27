const express = require('express');
const app = express();
const config = require('./config/key');
const mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
mongoose.connect(config.mongoURI
        ,{useNewUrlParser: true, useUnifiedTopology: true})
        .then(()=>console.log('MongoDB connected'));
        

const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended:true}));


app.get('/',(req,res)=>{
    res.send('hello world');
});
app.use('/user',require('./routes/user'));

app.listen(port,()=>{
    console.log('express server is running at 8080');
})
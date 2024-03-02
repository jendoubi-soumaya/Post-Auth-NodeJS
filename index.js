const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./Routes/home');
const bodyParser = require('body-parser');
const app = express()
const port = 3000

//connecting to mongo
mongoose.connect('mongodb+srv://soumaya:24052000@cluster0.62phsy6.mongodb.net/Post_crud');
const db = mongoose.connection;
db.on('error', ()=>console.log("something went wrong to connect to database"));
db.once('open', ()=>{
  console.log("DB connection has been made successfully");
});


//view engine setup
app.set('view engine','ejs');

//static folder setup
app.use(express.static('public'))

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json 
app.use(bodyParser.json())

app.use('/', homeRoute)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
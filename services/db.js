//connection code of Node and mongodb
//1 import mongoose library
const mongoose = require('mongoose')

//2 connection string 
mongoose.connect('mongodb://localhost:27017/EMPLOYEEMENT')


// *********************************************************
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// ************************************************************

//model creation
const employee = mongoose.model('workers',{
    id:String,
    name:String,
    age:String,
    designation:String,
    salary:String
})

module.exports={
    employee
}
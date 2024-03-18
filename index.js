//1 import express
const express = require('express')

//2 import cors
const cors = require('cors')

//import logics
const logic = require('./services/logics')


//3 create a backend application using  express
const emsServer = express()

//4 connecting the frontend application using cors
emsServer.use(cors({
    origin:'http://localhost:3000'
}))

//5 convert the json data to js to json using json() function
emsServer.use(express.json())

//6 define the port number
emsServer.listen(8000,()=>{
    console.log('Ems Server listening on port 8000');
})

//API call for get all employees details
emsServer.get('/get-all-employees',(req,res)=>{
    logic.getAllEmployees().then((response)=>{
        res.status(response.statusCode).json(response);
    })
})

//API call for add an employee
emsServer.post('/add-an-employee',(req,res)=>{
    logic.addEmployee(req.body.id,req.body.name,req.body.age,req.body.designation,req.body.salary).then((response)=>{
        res.status(response.statusCode).json(response);
    })
})


//API call for remove an employee
emsServer.delete('/delete-an-employee/:id',(req,res)=>{
    logic.deleteEmployee(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response)
    })
})


//API call for get an employee
emsServer.get('/get-an-employee/:id',(req,res)=>{
    logic.getAnEmployee(req.params.id).then((response)=>{
        res.status(response.statusCode).json(response);
    })
})

//API call for update an employee
emsServer.post('/update-an-employee/:id',(req,res)=>{
    logic.updateAnEmployee(req.params.id,req.body.name,req.body.age,req.body.designation,req.body.salary).then((response)=>{
        res.status(response.statusCode).json(response);
    })
})


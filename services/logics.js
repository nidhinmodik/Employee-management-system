//Backend logics

//import db.js file
const db = require('../services/db')

// /////////////////////////////////////////////////////////////////
// //get all the employee details from the database
// const getAllEmployees =()=>{
//     return db.employee.find()
//     .then((result)=>{//details of employees
//         if(result){
//             return{//send to frontend
//                 statusCode:200,
//                 employees:result
//             }
//         }
//         else{
//             return{
//                 statusCode:404,
//                 message:'cant find employee'
//             }
//         }
//     })
// }
// //////////////////////////////////////////////////////////////////

const getAllEmployees = () => {
    return db.employee.find().then((result) => {
      if (result.length > 0) {
        return {
          statusCode: 200,
          employees: result,
        };
      } else {
        return {
          statusCode: 404,
          message: 'No employees found',
        };
      }
    }).catch((error) => {
      console.error(error);
      return {
        statusCode: 500,
        message: 'Internal Server Error',
      };
    });
  };


  //Add a bew employee details into the database
  const addEmployee=(id,name,age,designation,salary)=>{
    return db.employee.findOne({id}).then((result)=>{
      if(result){//if the id is already in the database
        return{
          statusCode:404,
          message:"Employee already exists"
        }
      }
      else{//The id is not in the database then it save to the database
        const newEmployee = new db.employee({id,name,age,designation,salary})
        //to save to the database
        newEmployee.save()
        return{
          statusCode:200,
          message:"Employee Added Successfully"
        }
      }
    })
  }

  const deleteEmployee=(id)=>{
    return db.employee.deleteOne({id}).then((result)=>{
      return{
        statusCode:200,
        message:"Employee deleted successfully"
      }
    })
    .catch((error)=>{
      return{
        statusCode:200,
        message:"could't found user"
      }
    })
  }

  //Get a particular employee from the database
const getAnEmployee=(id)=>{
    return db.employee.findOne({id})
    .then((result)=>{//details of employees
        if(result){
            return{//send to frontend
                statusCode:200,
                employees:result
            }
        }
        else{
            return{
                statusCode:404,
                message:'cant find employee'
            }
        }
    })
}



//update an employee details
const updateAnEmployee=(id,name,age,designation,salary)=>{//updated data
  return db.employee.findOne({id})
    .then((result)=>{//result - details of employees
        if(result){
          result.id = id;
          result.name = name;
          result.age = age;
          result.designation = designation;
          result.salary = salary;

          //save updated details into db
          result.save()

            return{//send to frontend
                statusCode:200,
                message:'Employee data updated successfully'
            }
        }
        else{
            return{
                statusCode:404,
                message:'cant find employee'
            }
        }
    })
}
  

module.exports = {
    getAllEmployees,
    addEmployee,
    deleteEmployee,
    getAnEmployee,
    updateAnEmployee
}
// Task1: initiate app and run server at 3000
const express=require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const app = new express();
const path=require('path');

dotenv.config();
app.use(express.static(path.join(__dirname+'/dist/FrontEnd')));
const PORT = process.env.PORT || 3004;
app.listen(PORT,()=>{
    console.log(`server running on https://localhost:${PORT}`);
})
// Task2: create mongoDB connection 
const db = require('./DB/connectionString');
//employee data accessing
const EmployeeData = require('./src/model/employeeData');
const { log } = require("console");
//Task 2 : write api with error handling and appropriate api mentioned in the TODO below
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));





//TODO: get data from db  using api '/api/employeelist'
app.get('/api/employeelist', async(req,res)=>{
    try {
        const data = await EmployeeData.find();
        res.status(201).send(data);
    } catch (error) {
        res.json({err:error})
    }
})


//TODO: get single data from db  using api '/api/employeelist/:id'
app.get('/api/employeelist/:id', async(req,res)=>{
    try {
        const employee = await EmployeeData.findOne({_id:req.params.id});
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.status(200).json(employee);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching the employee data' });
    }
})




//TODO: send data from db using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}

app.post('/api/employeelist',async (req,res)=>{
        var lastEmployee = await  EmployeeData.findOne({}).sort({ id: -1 });
        //id autoincrementation
        var newId = lastEmployee.id+1;
        try {
             const addData =  new EmployeeData({
                //js ternary operation like if block in one line
                id:req.body.id!=null?req.body.id:newId,
                name:req.body.name,
                location:req.body.location,
                position:req.body.position,
                salary:req.body.salary
             })
          const savedData = await addData.save();
           res.status(201).json({success:"data added successfully"})
        } catch (error) {
            if (error.code === 11000 && error.keyPattern && error.keyPattern.id) {
                // Duplicate key error
                res.status(400).json({ error: "Duplicate key error: id already exists" });
            } else {
                // Other errors
                console.error(error);
                res.status(500).json({ error: "An error occurred while saving data" });
            }
}})




//TODO: delete a employee data from db by using api '/api/employeelist/:id'

app.delete('/api/employeelist/:id', async (req, res) => {
    try {
        const deletedData = await EmployeeData.deleteOne({ _id: req.params.id });
        if (deletedData.deletedCount === 1) {
            res.json({ success: "Data deleted successfully" });
        } else {
            res.status(404).json({ error: "Data not found" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while deleting data" });
    }
});




//TODO: Update  a employee data from db by using api '/api/employeelist'
//Request body format:{name:'',location:'',position:'',salary:''}
// app.put('/api/employeelist', async (req, res) => {
//     const {name,location,position,salary} = req.body;
//     try {
//     //    var editingdata = await EmployeeData.find({_id:req.params.id})
//        vareditingdata = await new EmployeeData({
//             name:name,
//             location:location,
//             position:position,
//             salary:salary
//         });
//         console.log(editingdata);
//         const editedData = editingdata.save();
//         res.json({ success: "Data edited successfully" })
//     } catch (error) {
//         res.json({err:error})
//     }
// });
app.put('/api/employeelist', async (req, res) => {
    const { _id, name, location, position, salary } = req.body;
    console.log(req.body) // Assuming _id is provided in req.body

    try {
        const editingdata = await EmployeeData.findOneAndUpdate(
            { _id: _id },
            { name: name, location: location, position: position, salary: salary },
            { new: true }
        );

        if (!editingdata) {
            return res.status(404).json({ error: "Data not found" });
        }

        res.json({ success: "Data edited successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while editing data" });
    }
});



//! dont delete this code. it connects the front end file.
app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/Frontend/index.html'));
});




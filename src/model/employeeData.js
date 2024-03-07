// const mongoose = require("mongoose");

// const EmployeeDataSchema = new mongoose.Schema({
//     id:{type:Number,  unique: true},
//     name:String,
//     location:String,
//     position:String,
//     salary:Number
// },{versionKey:false});

// const EmployeeData = mongoose.model("employee",EmployeeDataSchema);
// module.exports = EmployeeData;


const mongoose = require("mongoose");

const EmployeeDataSchema = new mongoose.Schema({
    id: { type: Number, unique: true, required: true},
    name: String,
    location: String,
    position: String,
    salary: Number
}, { versionKey: false });

const EmployeeData = mongoose.model("employee", EmployeeDataSchema);

module.exports = EmployeeData;

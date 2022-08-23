mongoose = require('mongoose')

const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true,
        default:'student',
        enum:['student']
    },
    course:{
        type:String,
        // required:true,
        // default:undefined
    },
    batch:{
        type:String,
        // required:true,
        // default:undefined
    },
    photo:{
        type:String,
        required:true,
        default:'user.jpg'
    },
    idStatus:{
        type:String,
        required:true,
        default:'not applied',
        enum:['not applied','applied','issued','rejected']
    }

})

const Student = mongoose.model('Student',studentSchema)

module.exports = Student;
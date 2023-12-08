const mongoose=require('mongoose')

const registerSchema=new mongoose.Schema({
    name:{
        required:true,
        type:String
    },
    email:{
        required:true,
        type:String,
        unique:true
    },
    password:{
        required:true,
        type:String
    }
})

const Register=mongoose.model('airbnb',registerSchema)

module.exports=Register
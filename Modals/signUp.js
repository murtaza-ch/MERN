const mongoose=require('mongoose');
const Schema =mongoose.Schema;

//Create Schema

const signUpSchema=new Schema({
        name:{
            type:String,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
});

module.exports=signUp=mongoose.model('signUp',signUpSchema);
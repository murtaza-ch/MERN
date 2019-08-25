const mongoose=require('mongoose');
const Schema =mongoose.Schema;

//Create Schema

const dataSchema=new Schema({
        name:{
            type:String,
            required:true
        },
        cnic:{
            type:String,
            required:true
        },
        city:{
            type:String,
            required:true
        },
        phone:{
            type:Number,
            required:true
        },
        email:{
            type:String,
            required:true
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
});

module.exports=data=mongoose.model('data',dataSchema);
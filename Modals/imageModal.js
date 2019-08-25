const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const imageSchema=new Schema({
    imagName:{
        type:String,
        default:"none",
        required:true
    },
    imageData:{ 
        type:String,
        required:true
    }

})

module.exports=Image=mongoose.model('Image',imageSchema);
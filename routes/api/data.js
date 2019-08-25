const express=require('express');
const router=express.Router();
const auth=require('../../middleware/auth');
//signup modal
const data=require('../../Modals/dataModal');

router.get('/data',(req,res)=>{   
    data.find()
    .sort({createdAt:-1})
    .then(data=>res.json(data))
});


router.post('/data',auth,(req,res)=>{
    const newUser=new data({
        name:req.body.name,
        cnic:req.body.cnic,
        city:req.body.city,
        phone:req.body.phone,
        email:req.body.email
    })
    newUser.save().then(user=>res.json(user));
})


router.delete('/data/:id',auth,(req,res)=>{
    data.findById(req.params.id)
    .then(item=>item.remove().then(()=>res.json({success:true})))
    .catch((err)=>res.status(404).json({success:false})); 
  });


router.put('/data/:id',auth,(req,res)=>{
    
    data.findById(req.params.id,(err,newData)=>{
        newData.name=req.body.name,
        newData.cnic=req.body.cnic,
        newData.city=req.body.city,
        newData.phone=req.body.phone,
        newData.email=req.body.email
        newData.save()
        res.json(newData)

        })
})



module.exports= router;
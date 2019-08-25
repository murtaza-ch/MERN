const express=require('express');
const router=express.Router();
const multer=require('multer');

const Image=require('../../Modals/imageModal');

const storage=multer.diskStorage({
    destination:(req,file,cb)=> {
        cb(null,'./uploads');
    },
    fileName:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname);
    }


});

const fileFilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true);
    }
    else{
        cb(null,true);
    }

}

const upload=multer({
    storage:storage,
    limits:{
        fileSize:1024 * 1024 * 5
    },
    fileFilter:fileFilter

})

router.post('/image',upload.single('imageData'),(req,res,next)=>{
      
    console.log(req.body);
    const newImage=new Image({
        imageName:req.body.imageName,
        imageData:req.file.path
    });
    newImage.save()
    .then((result)=>{
        console.log(result);
        res.status(200).json({
            success:true,
            document:result
        })
    })
    .catch((err)=>next(err));
});

module.exports= router;
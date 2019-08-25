const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');

const auth=require('../../middleware/auth');    
//signup modal
const signUp=require('../../Modals/signUp');

router.post('/login',(req,res)=>{
    const {email,password}=req.body;
    
    if( !email || !password){
        res.status(400).json({msg:'Please Enter all the fields'});
    }

    // Check for Existing User
    signUp.findOne({email})
    .then((user)=>{
        if(!user) return res.status(400).json({msg:'User Does not exist'});

        // Validating Password
        bcrypt.compare(password,user.password)
        .then((isMatch)=>{
            if(!isMatch) return res.status(400).json({msg:'Invalid Credentials'});

            jwt.sign(
                {id:user.id}, 
                config.get('jwtSecret'),
                {expiresIn:3600 }, //expires token after 1 hour
                (err,token)=>{
                  if(err) throw err;
                  res.json({
                    token,
                    user:{
                        id:user.id,
                        name:user.name,
                        email:user.email
                    }
                })
                }
            )

        })
    })
})


module.exports= router;

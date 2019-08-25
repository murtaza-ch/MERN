const express=require('express');
const router=express.Router();
const bcrypt=require('bcryptjs');
const config=require('config');
const jwt=require('jsonwebtoken');
//signup modal
const signUp=require('../../Modals/signUp');

router.post('/signup',(req,res)=>{
    const {name,email,password}=req.body;
    
    if(!name || !email || !password){
        res.status(400).json({msg:'Please Enter all the fields'});
    }

    // Check for Existing User
    signUp.findOne({email})
    .then((user)=>{
        if(user) return res.status(400).json({msg:'User Alredy exists'});

        const newUser=new signUp({
        name,
        email,
        password
        })

        // Create Salt and Hash
        bcrypt.genSalt(10,(err,salt)=>{
            bcrypt.hash(newUser.password,salt,(err,hash)=>{
                if(err) throw err;
                newUser.password=hash;
                newUser.save()
                .then((user)=>{

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


    })

})



module.exports= router;

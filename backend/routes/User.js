const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/User');
const config = require('config');
const jwt = require('jsonwebtoken');
const jwtSecret = config.get("JWT_SECRET");

const router = express.Router();
router.use(express.json());
// @ POST /api/user
// @ DEC api to create a user
//@ ACCESS public
router.post('/',(req,res)=>{

  const {name,email,password} = {...req.body};
  
  
  User.findOne({email})
  .then(user=>{
      if(user){
          res.status(400).json({"msg":"Email Id already exist"});
      }
      else{
        const newUser = User({
            name,
            email,
            password
        });
        bcrypt.hash(password, 10, function(err, hash) {
            // Store hash in your password DB.
            if(err)
                throw err;
            else{
                newUser.password = hash;
                newUser.save()
                .then(user=>{
                    jwt.sign({
                        id:user._id
                    },jwtSecret,{expiresIn:3600},
                    (err,token)=>{
                        if(err)
                            throw err;
                    res.status(200).json({"msg":"User created Successfully.Login now",token})})
                        
                    })
                .catch(err=>console.log(err));
                    
                    
                 
        
            }
        });
      }
  }).catch(err=>res.status(400).json({"msg":"Some error occured"}));
 
  


});

router.post('/login',(req,res)=>{

  const {email,password} = {...req.body};
  User.findOne({email:email})
  .then(user=>{
      if(!user){
          return res.status(400).json({"msg":"Email id is not registered"});
      }
      else{
          bcrypt.compare(password,user.password)
          .then(isMatch=>{
              if(isMatch){
                jwt.sign({
                    id:user._id
                },jwtSecret,{expiresIn:3600},
                (err,token)=>{
                    if(err)
                        throw err;
                    else{
                        return res.status(200).json({"msg":"Login Successfull",token});
                    }
                
                })
                  
              }
              else{

                  return res.status(400).json({"msg":"Invalid Credentials"});
              }
          })
          .catch(err=>console.log(err));
      }
  })
  .catch(err=>console.log(err));
})
module.exports = router;
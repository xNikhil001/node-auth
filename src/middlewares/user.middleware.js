const { check,validationResult } = require('express-validator');
const User = require("../models/User.js");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

class UserMiddleware{
  validation(){
    return [
      check('name').trim().not().isEmpty().withMessage("Name cannot be empty!").escape(),
      check('email').trim().not().isEmpty().withMessage('Email cannot be empty!').isEmail().withMessage("Invalid Email!").custom(async(value)=>{
        try {
          const result = await User.find({email:value})
          if(result.length > 0){
            return Promise.reject("Email already exists!")
          }
        } catch (err) {
          console.log(err)
        }
      }).normalizeEmail(),
      check('password').trim().not().isEmpty().withMessage('Password cannot be empty!').isLength({min:6}).withMessage('Password must be minimum 6 characters long!'),
    ]
  }
  
  loginValidation(){
    return [
      check('email').trim().not().isEmpty().withMessage('Email cannot be empty!').isEmail().withMessage("Invalid Email!").custom(async(value)=>{
        try {
          const result = await User.find({email:value})
          if(result.length <= 0){
            return Promise.reject("User does not exist!")
          }
        } catch (err) {
          console.log(err)
        }
      }).normalizeEmail(),
      check('password').trim().not().isEmpty().withMessage('Password cannot be empty!').isLength({min:6}).withMessage('Password must be minimum 6 characters long!'),
    ]
  }
  
  async checkSignupUser(req,res,next){
    const {name,email,password} = req.body;
    const fields = {
      name,email,password
    }
    const errors = validationResult(req).mapped()
    
    if(Object.keys(errors).length > 0){
      return res.render('pages/signup.ejs',{
        errors,fields
      })
    }
    next()
  }
  async checkLoginUser(req,res,next){
    const {email,password} = req.body;
    const fields = {
      email,password
    }

    const errors = validationResult(req).mapped()
    
    if(Object.keys(errors).length > 0){
      return res.render('pages/login.ejs',{
        errors,fields
      })
    }
    next()
  }
  
  async auth(req,res,next){
    const token = req.cookies.access_token
    //console.log(token);
    if(!token) return res.redirect('/login')
    
    try {
      const data = jwt.verify(token,process.env.SECRET);
      const result = await User.findById(data.id);
      //console.log(result)
      req.userEmail = result.email;
      next()
    } catch (e) {
      console.log(e);
      res.redirect('/login')
    }
  }
}

const userMiddleware = new UserMiddleware();

module.exports = userMiddleware;
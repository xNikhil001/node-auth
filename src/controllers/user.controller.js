const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const bcrypt = require("bcryptjs");

class UserController{
  async getSignUp(req,res){
    res.render("signup",{
      errors: {},fields:{}
    })
  }
  
  async postSignUp(req,res){
    const {name,email,password} = req.body;
  
    const userData = new User({name,email, password})
    const result = await userData.save();
  
    res.redirect("/login");
  }
  
  async getLogin(req,res){
    res.render("login")
  }
  
  async postLogin(req,res){
    const {email,password} = req.body;
    const fields = {
      email,password
    }
    
    try {
      const result = await User.findOne({email});
      //console.log(result)
      const check = await bcrypt.compare(password,result.password);
      //console.log(check)
      if(!check){
        return res.render("login",{
          errors: {
            password: {msg:"Password is incorrect!"}
          },fields
        })
      }
      const token = jwt.sign({id:result._id,email:result.email}, process.env.SECRET, { expiresIn: '24h' });
      //console.log(token);
      
      req.session.access_token = token;
      //console.log(req.session)
      res.redirect("/");
    } catch (e) {
      console.log(e)
    }
  }
  
  async getSecret(req,res){
    if(!req.userEmail) return res.redirect("/login")
    res.render("secret");
  }
  
  async getLogout(req,res){
    res.send('hello')
  }
}

const userController = new UserController();

module.exports = userController;
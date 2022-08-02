const express = require('express');
const router = express.Router();
const userMiddleware = require("../middlewares/user.middleware.js");
const {
  validation,checkSignupUser,
  loginValidation,checkLoginUser,
  auth
} = userMiddleware;

const userController = require("../controllers/user.controller.js");
const {
  getSignUp,postSignUp,
  getLogin,postLogin,
  getSecret,getLogout
} = userController;

router.get("/", async(req,res)=>{
  //console.log(req.session)
  res.render('index');
});

router.get("/signup", getSignUp);

router.post("/signup",validation(),checkSignupUser,postSignUp);

router.get("/login",getLogin);

router.post("/login",loginValidation(),checkLoginUser,postLogin);

router.get("/secret",auth,getSecret);

router.get("/logout",auth,getLogout);

module.exports = router;
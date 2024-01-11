var express = require('express');
var router = express.Router();

var User = require("../models/UserModel");
var bcrypt=require('bcrypt')
var jwt=require("jsonwebtoken")
var sendCookie= require("../features/cookie")
var isAuthenticated=require("../middleware/auth")


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/signIn',async(req, res, next)=>{
  const { name, email, password ,dob} = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(404).json({ status: false, message: "user already exist" });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({ name, email, password: hashedPassword,dob });
    const token = jwt.sign({ _id: user._id }, "fefesfeergergewfew");
    res
      .status(201)
      .cookie("token", token, { httpOnly: true, maxAge: 15 * 60 * 1000 })
      .json({ status: true, message: "Added succesfully" });
  }
})

router.post("/login",async(req,res)=>{
   const {email,password}=req.body
   const user = await User.findOne({ email }).select("+password");

   if(user){
         const isMatch= await bcrypt.compare(password,user.password);
         if(isMatch){
            sendCookie(user,res,`Welcome back, ${user.name}`,200)
           
         }
         else{
          res.set('Access-Control-Allow-Origin', '*');
          res.status(404).json({status:false,message:"Wrong Password"})
         }

   }
   else{
      res.status(404).json({status:false,message:"User Do not exist"})
   }
})

router.get('/check',isAuthenticated,function(req,res){
  res.status(200).json({
    success: true,
    user: req.user,
  });
})



module.exports = router;

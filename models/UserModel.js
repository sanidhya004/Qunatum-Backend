const mongoose=require('mongoose')

const Schema= mongoose.Schema


const UserSchema= new Schema({
   name:String,
   email:{
     type:String,
     unique:true,
     required:true
   },
   password:{
     type:String,
     select:false,
     required:true
   },
   createdAt: {
     type:Date,
     default:Date.now()
   },
   dob:{
    type:Date,
   
   }

})


module.exports=mongoose.model("Users",UserSchema)
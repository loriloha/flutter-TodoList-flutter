const db =require('../config/db');
const bcrypt= require("bcrypt");
const mongoose= require('mongoose');


const {Schema}= mongoose;


const userSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        required: [true,"user name can't be empty"],
        //@ts-ignore
        match: [
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, //user.name@sub.domain.co.uk
            "userName format is not correct"
        ],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password is required"],
    },
}, {timestamps:true});

userSchema.pre("save", async function(){
      var user = this;
      if(!user.isModified("password")){
        return
      }


      try{

        const salt = await bcrypt.genSalt(10);

        const hash= await bcrypt.hash(user.password, salt);

        user.password = hash;

      }catch(err){
        throw err; 
      }
});

const UserModel= db.model('user', userSchema);

module.exports = UserModel;



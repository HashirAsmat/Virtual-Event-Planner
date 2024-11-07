const mongoose = require ("mongoose");
const {Schema} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    // lastLogin:{
    //     type:Date,
    //     default:Date.now
    // },
    // isVerified:{  
    //     type:Boolean,
    //     default:false
    // },
    // resetPasswordToken:String,
    // resetPasswordExpiresAt:Date,
    // verificationToken:String,
    // verificationTokenExpiresAt:Date,
}, {timestamps:true})

module.exports = mongoose.model("User", userSchema, "users"); //first argument is the model name , second argument is the userSchema and the third argument is the users collection in the database.

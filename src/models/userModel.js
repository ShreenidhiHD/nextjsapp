import mongoose from "mongoose";        

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required:[true, "Please provide a username"],
        unique: true,

    },
    email:{
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    
    },
    password:{
        type: String,
        required: [true, "Please provide a password"],
        minlength: [6, "Password must be at least 6 characters"]
    },
    isverifed: {
        type: Boolean,
        default: true
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpiration: Date,
    verifyToken: String,
    verifyTokenExpiration: Date,
})


const User = mongoose.models.users || mongoose.model("users", userSchema);

export default User;
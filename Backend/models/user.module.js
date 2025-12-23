import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    lastName:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase: true
    },
    password:{
        type:String,
        required:true
    },
    aboutMe:{
        type:String,
        default:null
    },
    ratings:[{
        rating:Number,
        comment:String,
    }],
    schedule:[{
        startTime:{
            type:String,
            required:true
        },
        endTime:{
            type:String,
            required:true
        }
    }]
},{timestamps:true});

export default mongoose.model('User', userSchema);
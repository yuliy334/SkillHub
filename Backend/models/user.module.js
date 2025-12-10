import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
    },
    Lastname:{
        type:String,
        required:true,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    password:{
        type:String,
        required:true
    },
    aboutMe:{
        type:String
    },
    ratings:[{
        rating:Number,
        coment:String,
    }],
    sceduale:[{
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
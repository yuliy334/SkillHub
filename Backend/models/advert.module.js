import mongoose from "mongoose";
import { string } from "zod";
import { required } from "zod/mini";


const advertSchema = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    userWanted:{
        type:[String]
    },
    userOffers:{
        type:[String]
    },
    deals:[{
        requesterId:{
            type:String,
            required:true
        },
        requestorWanted:{
            type:[String],
            required:true
        },    
        requestorOffers:{
            type:[String],
            required:true
        },
        status:{
            type:String
        },
            

    },{timestamps:true}]


})

export default mongoose.model('Advert', advertSchema);
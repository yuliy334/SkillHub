import mongoose from "mongoose";
import { object, string } from "zod";
import { required } from "zod/mini";

const tag = object.freeze({
    since: 'since',
    language: 'language',
    art: 'art',
    music:'music',
    sport:'sport',
    DIY:'DIY',
    lifestyle:'lifestyle',
    gaming:'gaming',
    technologies:'technologies',
    social:'social'
})

const skillSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type:tag,
        required:false
    }
})

export default mongoose.model('Skill', skillSchema);
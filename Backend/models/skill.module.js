import mongoose from "mongoose";
import { object, string } from "zod";
import { required } from "zod/mini";

const TAGS = [
  'since',
  'language',
  'art',
  'music',
  'sport',
  'DIY',
  'lifestyle',
  'gaming',
  'technologies',
  'social'
];


const skillSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    category:{
        type: String,
        enum: TAGS,
        required: false
    }
})

export default mongoose.model('Skill', skillSchema);